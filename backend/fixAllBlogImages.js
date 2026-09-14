async function fixAllBlogImages() {
  try {
    const res = await fetch('http://localhost:5000/api/blogs');
    const blogs = await res.json();

    for (const blog of blogs) {
      let updatedContent = blog.content || '';
      let updatedCover = blog.coverImage || '';
      let shouldUpdate = false;

      // 1. Future of SaaS
      if (blog.slug === 'the-future-of-saas-trends-every-business-should-watch-in-2025') {
        updatedCover = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';
        
        // Remove duplicate image at the very top of content
        updatedContent = updatedContent.replace(/^!\[.*?\]\(.*?\)\s*/, '');

        // Place a distinct SaaS analytics dashboard image before "Top SaaS Trends 2025 to Watch" if not already there
        const distinctImg = '![SaaS Cloud Analytics & AI Automation Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)';
        if (!updatedContent.includes('photo-1551288049-bebda4e38f71')) {
          updatedContent = updatedContent.replace(
            '## Top SaaS Trends 2025 to Watch',
            `${distinctImg}\n\n## Top SaaS Trends 2025 to Watch`
          );
        }
        shouldUpdate = true;
      }

      // 2. Dedicated Development Team
      if (blog.slug === 'dedicated-development-team-vs-project-based-model') {
        updatedCover = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
        
        // Remove duplicate top image in content
        updatedContent = updatedContent.replace(/^!\[.*?\]\(.*?\)\s*/, '');
        shouldUpdate = true;
      }

      // 3. Website Maintenance
      if (blog.slug === 'small-business-website-maintenance-easy-guide') {
        updatedCover = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
        
        // Update in-content image to be distinct
        updatedContent = updatedContent.replace(
          /!\[.*?\]\(https:\/\/images\.unsplash\.com\/photo-1460925895917-afdab827c52f.*?\)/g,
          '![Website Security & Performance Optimization](https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80)'
        );
        shouldUpdate = true;
      }

      // 4. Data Migration
      if (blog.slug === 'data-migration-types-technology') {
        updatedCover = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';
        shouldUpdate = true;
      }

      // 5. SEO Reporting
      if (blog.slug === 'seo-reporting-what-it-is-tools-and-automated-solutions') {
        updatedCover = 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80';
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        const updateRes = await fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...blog,
            coverImage: updatedCover,
            content: updatedContent
          })
        });
        const updatedData = await updateRes.json();
        console.log(`[UPDATED] ${updatedData.title} -> Cover: ${updatedCover}`);
      }
    }

    console.log('All blogs checked and fixed for unique, non-duplicating images!');
  } catch (err) {
    console.error('Error fixing blog images:', err);
  }
}

fixAllBlogImages();
