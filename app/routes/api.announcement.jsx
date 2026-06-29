import { authenticate } from "../shopify.server";
import { connectDB } from "../config/db.server";
import Announcement from "../models/Announcement";
import { updateAnnouncementMetafield } from "../services/metafield.server";

export async function action({ request }) {
  try {
    await connectDB();

    const { admin } = await authenticate.admin(request);

    const { text } = await request.json();

    if (!text) {
      return Response.json({ success: false }, { status: 400 });
    }

    await Announcement.create({ text });

    const response = await admin.graphql(`
      query {
        shop {
          id
        }
      }
    `);

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      const errorMsg = data.errors.map((e) => e.message).join(", ");
      throw new Error(`Shop query failed: ${errorMsg}`);
    }

    const shopId = data.data?.shop?.id;
    if (!shopId) {
      throw new Error("Shop ID could not be found");
    }

    await updateAnnouncementMetafield(admin, shopId, text);

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error("Error in api/announcement action:", err);

    return Response.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
