import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.page}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.container}>
        {/* Header / Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Shopify Announcement App
        </div>

        {/* Hero heading */}
        <h1 className={styles.heading}>
          Capture Attention with
          <br />
          <span className={styles.headingGradient}>Smart Announcements</span>
        </h1>

        <p className={styles.subtext}>
          Display beautiful, customizable announcement banners on your Shopify
          store. Boost conversions with targeted messages that reach the right
          customers at the right time.
        </p>

        {/* Login Form */}
        {showForm && (
          <div className={styles.formCard}>
            <p className={styles.formLabel}>Enter your shop domain to get started</p>
            <Form className={styles.form} method="post" action="/auth/login">
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <input
                  className={styles.input}
                  type="text"
                  name="shop"
                  placeholder="your-store.myshopify.com"
                  defaultValue="https://mahe-9bsbykbn.myshopify.com/"
                />
              </div>
              <button className={styles.button} type="submit">
                <span>Log in to Shopify</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Form>
            <p className={styles.hint}>e.g: my-shop-domain.myshopify.com</p>
          </div>
        )}

        {/* Feature Cards */}
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📢</div>
            <h3 className={styles.featureTitle}>Live Announcements</h3>
            <p className={styles.featureText}>
              Publish banners instantly across your store without touching any
              theme code.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3 className={styles.featureTitle}>Full Customization</h3>
            <p className={styles.featureText}>
              Control colors, fonts, and animations to perfectly match your
              brand identity.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureText}>
              Powered by Shopify Metafields — zero performance impact on your
              store's load time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
