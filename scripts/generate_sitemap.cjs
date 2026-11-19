const fs = require('fs');
const code = fs.readFileSync('js/products-data-v2.js', 'utf8');
const sandbox = {};
eval(code.replace('const productsData', 'sandbox.productsData'));
const products = sandbox.productsData;
const today = new Date().toISOString().split('T')[0];

const corePages = [
  { url: 'https://www.pavnichemicals.com/', priority: '1.0', changefreq: 'daily' },
  { url: 'https://www.pavnichemicals.com/products', priority: '0.9', changefreq: 'daily' },
  { url: 'https://www.pavnichemicals.com/about', priority: '0.8', changefreq: 'monthly' },
  { url: 'https://www.pavnichemicals.com/industries', priority: '0.8', changefreq: 'monthly' },
  { url: 'https://www.pavnichemicals.com/contact', priority: '0.8', changefreq: 'monthly' },
  { url: 'https://www.pavnichemicals.com/product-detail-caustic-lye', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://www.pavnichemicals.com/product-detail-caustic-flakes', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://www.pavnichemicals.com/product-detail-hcl', priority: '0.9', changefreq: 'weekly' },
  { url: 'https://www.pavnichemicals.com/product-detail-h2o2', priority: '0.9', changefreq: 'weekly' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

corePages.forEach(p => {
  xml += `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>
`;
});

products.forEach(p => {
  xml += `  <url>
    <loc>https://www.pavnichemicals.com/product-detail?id=${p.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
});

xml += '</urlset>\n';

fs.writeFileSync('sitemap.xml', xml, 'utf8');
if (!fs.existsSync('public')) fs.mkdirSync('public');
fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`Sitemap generated with ${corePages.length + products.length} URLs.`);
