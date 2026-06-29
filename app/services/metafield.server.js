export async function ensureMetafieldDefinition(admin) {
  const mutation = `
    mutation metafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition {
          id
          name
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  try {
    const response = await admin.graphql(mutation, {
      variables: {
        definition: {
          name: "Announcement Banner Text",
          namespace: "my_app",
          key: "announcement",
          type: "single_line_text_field",
          ownerType: "SHOP",
          access: {
            storefront: "PUBLIC_READ"
          }
        }
      }
    });

    const responseJson = await response.json();
    const userErrors = responseJson.data?.metafieldDefinitionCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      const alreadyExists = userErrors.some(
        (e) => e.code === "TAKEN" || e.message.includes("taken") || e.message.includes("already exists")
      );
      if (!alreadyExists) {
        console.warn("Metafield definition creation notice:", JSON.stringify(userErrors));
      }
    }
  } catch (error) {
    console.error("Error creating metafield definition:", error);
  }
}

export async function updateAnnouncementMetafield(
  admin,
  shopId,
  announcement,
) {
  // Ensure the storefront metafield definition is registered
  await ensureMetafieldDefinition(admin);

  const mutation = `
    mutation metafieldsSet($metafields:[MetafieldsSetInput!]!) {
      metafieldsSet(metafields:$metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await admin.graphql(mutation, {
    variables: {
      metafields: [
        {
          ownerId: shopId,
          namespace: "my_app",
          key: "announcement",
          type: "single_line_text_field",
          value: announcement,
        },
      ],
    },
  });

  const responseJson = await response.json();

  if (responseJson.errors && responseJson.errors.length > 0) {
    const errorMsg = responseJson.errors.map((e) => e.message).join(", ");
    throw new Error(`GraphQL Error: ${errorMsg}`);
  }

  const { metafieldsSet } = responseJson.data || {};
  if (metafieldsSet && metafieldsSet.userErrors && metafieldsSet.userErrors.length > 0) {
    const userErrorMsg = metafieldsSet.userErrors
      .map((e) => `${e.field ? e.field.join(".") : "unknown"}: ${e.message}`)
      .join(", ");
    throw new Error(`Metafield set error: ${userErrorMsg}`);
  }

  return metafieldsSet?.metafields?.[0];
}