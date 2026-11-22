import { navigation, footerLinks } from '../config/navigation';
import { products } from '../config/products';
import { site } from '../config/site';
export function GET() {
  const paths = [
    ...navigation.map(({ href }) => href),
    ...footerLinks.map(({ href }) => href),
    ...products.flatMap(({ href }) => (href ? [href] : [])),
  ];
  const urls = paths
    .map((href) => `<url><loc>${new URL(href, site.url).href}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
