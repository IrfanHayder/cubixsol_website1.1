const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Blog = require('./models/Blog');

const newBlog = {
  title: 'How to Choose a Web Development Company: 12-Point Checklist',
  slug: 'how-to-choose-a-web-development-company-12-point-checklist',
  category: 'Web Development',
  tag: 'Web Development',
  author: 'Irfan Haider',
  date: 'September 26, 2026',
  color: 'from-teal-700 to-indigo-950',
  coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  status: 'Published',
  excerpt: `There are hundreds of freelancers and agencies provide web development services. Their prices can range from £300 to £30,000 for what appears to be the same project. However, the real challenge is identifying the right developer who can meet your project requirements and deliver long-term value.`,
  content: `There are hundreds of freelancers and agencies provide web development services. Their prices can range from £300 to £30,000 for what appears to be the same project. However, the real challenge is identifying the right developer who can meet your project requirements and deliver long-term value.

## Twelve key Criteria:

### Client reviews
Don't just rely on the testimonials on their own website. Instead, check client reviews on Google, Facebook, and LinkedIn as well.

### Technical expertise
Check if the developers also have knowledge of React, SEO, WordPress, web performance, and modern technologies.

### Live website portfolio
Are the projects they built, especially from the past twelve months, still live and working smoothly?

### Design and UX
Are the websites they create modern, attractive, and user-friendly?

### Mobile optimisation
Check if their portfolio websites work properly on a mobile phone.

### Maintenance and support
What happens after the website is launched? Will they provide updates, fix issues, and offer support in the future?

### Pricing structure
Is the price clear from the start? Do they charge a fixed price or work on an hourly rate?

### Legal matters
Is there a contract in place? Do they comply with GDPR regulations? Will you have ownership of the website and data?

### Location
A local developer may understand the UK market, customers, and business needs better.

### Pricing structure
fixed price vs hourly rate, transparency.

### Loading speed
PageSpeed Insights score should be above 80%.

### SEO practices
Check Meta tags, semantic HTML, sitemaps.

## Warning Signs

1. Promising to do everything for a very low price.
2. Not showing a portfolio. Number three,
3. Not mentioning maintenance or support.Number four,
4. using pirated themes or plugins.
5. Not giving admin access.
6. Promising to complete a complex website in less than two weeks.

## Questions to ask the web developer

- Will I be able to update the website content myself?
- What happens if the site goes down?
- How quickly will critical issues be resolved?
- Do you provide SEO optimisation?
- Do you take backups?

## Conclusion

Choosing a web developer is not just about completing a project, but rather a long-term relationship. Generally, you may need to work with the same partner for three to five years. Take your time to find the right developer. Be sure to check their experience, support, quality, and trustworthiness. Contact Cubixsol for a free review of your project,`,
  seo: {
    metaTitle: 'How to Choose a Web Development Company: 12-Point Checklist | Cubixsol',
    metaDescription: 'Learn how to choose the right web development company with our 12-point checklist. Essential criteria, warning signs, and key questions to ask before hiring.',
    keywords: 'how to choose a web development company, hiring web developers, web development checklist, web agency selection, UK web developers',
    ogTitle: 'How to Choose a Web Development Company: 12-Point Checklist',
    ogDescription: 'Discover key criteria, red flags, and critical questions to ask before choosing a web development partner.',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://cubixsol.com/blog/how-to-choose-a-web-development-company-12-point-checklist',
  },
};

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    const result = await Blog.findOneAndUpdate(
      { slug: newBlog.slug },
      { $set: newBlog },
      { upsert: true, returnDocument: 'after', runValidators: false }
    );
    console.log('Blog saved successfully to MongoDB:', result.title);

    // Also update seedData.json so it is permanently tracked
    const seedFilePath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedFilePath)) {
      const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));
      if (Array.isArray(seedData.initialBlogs)) {
        const existingIdx = seedData.initialBlogs.findIndex((b) => b.slug === newBlog.slug);
        if (existingIdx >= 0) {
          seedData.initialBlogs[existingIdx] = newBlog;
        } else {
          seedData.initialBlogs.unshift(newBlog);
        }
        fs.writeFileSync(seedFilePath, JSON.stringify(seedData, null, 2), 'utf8');
        console.log('Updated seedData.json with the new blog');
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error adding blog:', err);
    process.exit(1);
  }
}

run();
