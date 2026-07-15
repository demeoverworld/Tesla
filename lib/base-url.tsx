export default function getBaseURL() {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.RAILWAY) return process.env.RAILWAY;
  if (process.env.DOMAIN_URL) return `https://${process.env.DOMAIN_URL}`;
  return "http://localhost:3000";
}