import Script from "next/script";

/**
 * Kikai's own chat widget, served by the CRM (`public/widget.js` there), so the
 * site's chat is a live demo of the product. Rendered only when both settings
 * are present; see .env.example.
 */
export function ChatWidget() {
  const origin = process.env.NEXT_PUBLIC_KIKAI_CRM_ORIGIN;
  const siteId = process.env.NEXT_PUBLIC_KIKAI_WIDGET_SITE_ID;
  if (!origin || !siteId) return null;
  return <Script src={`${origin}/widget.js`} data-site-id={siteId} strategy="lazyOnload" />;
}
