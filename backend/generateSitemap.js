/**
 * AUTOMATED SITEMAP GENERATOR FOR CUBIXSOL
 * Reads all live/seed data and generates a 100% complete, SEO-optimized public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const seedJsonPath = path.join(__dirname, 'seedData.json');
  if (!fs.existsSync(seedJsonPath)) {
    console.error('seedData.json not found!');
    process.exit(1);
  }

  const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://cubixsol.com';

  const urls = [];

  const addUrl = (loc, priority = '0.8', changefreq = 'weekly', lastmod = today) => {
    // Avoid duplicates
    if (!urls.some((u) => u.loc === loc)) {
      urls.push({ loc, priority, changefreq, lastmod });
    }
  };

  // 1. Core Canonical Pages (Excluding redirected aliases like /services, /privacy-policy, etc.)
  addUrl(`${baseUrl}/`, '1.0', 'daily');
  addUrl(`${baseUrl}/about`, '0.8', 'monthly');
  addUrl(`${baseUrl}/all-services`, '0.9', 'weekly');
  addUrl(`${baseUrl}/solutions`, '0.8', 'weekly');
  addUrl(`${baseUrl}/industries`, '0.8', 'weekly');
  addUrl(`${baseUrl}/products`, '0.8', 'weekly');
  addUrl(`${baseUrl}/projects`, '0.8', 'weekly');
  addUrl(`${baseUrl}/blog`, '0.8', 'daily');
  addUrl(`${baseUrl}/careers`, '0.7', 'monthly');
  addUrl(`${baseUrl}/contact`, '0.8', 'monthly');
  addUrl(`${baseUrl}/privacy`, '0.3', 'yearly');
  addUrl(`${baseUrl}/terms`, '0.3', 'yearly');
  addUrl(`${baseUrl}/tools/ai-seo-auditor`, '0.8', 'weekly');

  // Slugs that must NEVER be in the sitemap because they are 301 redirects to canonicals
  const EXCLUDED_SLUGS = new Set([
    'services',
    'ai-document-intelligence',
    'android-app-development',
    'api-development-and-integration',
    'data-migration',
    'devops',
    'ecommerce-marketplace-redesign',
    'ecommerce-retail',
    'ui-ux-designing',
  ]);

  // 2. Services (Canonical URLs)
  const services = seedData.initialServices || [];
  services.forEach((s) => {
    if (s.slug && !EXCLUDED_SLUGS.has(s.slug)) {
      addUrl(`${baseUrl}/${s.slug}`, '0.9', 'weekly');
    }
  });

  // 3. Industries
  const industries = seedData.initialIndustries || [];
  industries.forEach((ind) => {
    if (ind.slug) {
      addUrl(`${baseUrl}/industries/${ind.slug}`, '0.8', 'weekly');
    }
  });

  // 4. Solutions
  const solutions = seedData.initialSolutions || [];
  solutions.forEach((sol) => {
    if (sol.slug) {
      addUrl(`${baseUrl}/solutions/${sol.slug}`, '0.8', 'weekly');
    }
  });

  // 5. Products
  const products = seedData.initialProducts || [];
  products.forEach((prod) => {
    if (prod.slug) {
      addUrl(`${baseUrl}/products/${prod.slug}`, '0.8', 'weekly');
    }
  });

  // 6. Blog Posts
  const blogs = seedData.initialBlogs || [];
  blogs.forEach((blog) => {
    if (blog.slug) {
      const blogDate = blog.date ? new Date(blog.date).toISOString().split('T')[0] : today;
      addUrl(`${baseUrl}/blog/${blog.slug}`, '0.8', 'monthly', blogDate);
    }
  });

  // Build XML string
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  urls.forEach((u) => {
    xml += '  <url>\n';
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  const sitemapPublicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPublicPath, xml, 'utf-8');

  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  }

  console.log(`✅ Successfully generated sitemap with ${urls.length} canonical URLs at ${sitemapPublicPath}`);
}

generateSitemap();
