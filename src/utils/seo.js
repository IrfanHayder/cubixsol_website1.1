import { useEffect } from 'react';

/**
 * Strips any wrapping <script> and </script> tags if user pasted HTML tag
 */
function cleanSchemaString(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/<script\b[^>]*>/gi, '')
    .replace(/<\/script>/gi, '')
    .trim();
}

/**
 * Universal SEO & JSON-LD Schema Hook
 * Sets document title, Open Graph, Twitter Cards, Canonical links, and injects Schema.org JSON-LD
 */
export function useSEO(seo = {}, fallback = {}) {
  useEffect(() => {
    const title =
      seo?.metaTitle ||
      (fallback.title ? `${fallback.title} | Cubixsol` : 'Cubixsol — Digital Engineering & Custom Software');
    const description = seo?.metaDescription || fallback.description || fallback.desc || '';
    const keywords = seo?.keywords || fallback.keywords || '';
    const ogTitle = seo?.ogTitle || title;
    const ogDesc = seo?.ogDescription || description;
    const ogImage = seo?.ogImage || fallback.image || fallback.heroImage || '/assets/logo.svg';
    const canonical = seo?.canonicalUrl || fallback.canonicalUrl || window.location.href.split('?')[0];

    document.title = title;

    const setMeta = (nameAttr, nameVal, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:title', ogTitle);
    setMeta('property', 'og:description', ogDesc);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', ogTitle);
    setMeta('name', 'twitter:description', ogDesc);
    if (ogImage) setMeta('name', 'twitter:image', ogImage);

    // Canonical link
    let linkEl = document.querySelector('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonical);

    // =========================================================================
    // JSON-LD SCHEMA MARKUP INJECTION
    // =========================================================================
    const rawSchema = seo?.schema || seo?.schemaMarkup || fallback?.schema || fallback?.schemaMarkup;
    let schemaScript = document.querySelector('script#cubixsol-schema-jsonld');

    if (rawSchema) {
      let finalJsonLd = '';

      if (typeof rawSchema === 'object') {
        try {
          finalJsonLd = JSON.stringify(rawSchema, null, 2);
        } catch (e) {
          console.warn('Invalid JSON-LD schema object:', e);
        }
      } else if (typeof rawSchema === 'string') {
        const cleaned = cleanSchemaString(rawSchema);
        if (cleaned) {
          try {
            // Verify if valid JSON, format nicely
            const parsed = JSON.parse(cleaned);
            finalJsonLd = JSON.stringify(parsed, null, 2);
          } catch (_) {
            // If not strict JSON (e.g. multiple root schemas or custom block), inject cleaned string directly
            finalJsonLd = cleaned;
          }
        }
      }

      if (finalJsonLd) {
        if (!schemaScript) {
          schemaScript = document.createElement('script');
          schemaScript.setAttribute('type', 'application/ld+json');
          schemaScript.setAttribute('id', 'cubixsol-schema-jsonld');
          document.head.appendChild(schemaScript);
        }
        schemaScript.textContent = finalJsonLd;
      } else if (schemaScript) {
        schemaScript.remove();
      }
    } else {
      // Default Organization / WebSite fallback schema if no custom schema provided
      const defaultSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: canonical,
        publisher: {
          '@type': 'Organization',
          name: 'Cubixsol',
          url: 'https://cubixsol.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cubixsol.com/assets/logo.svg',
          },
        },
      };

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'cubixsol-schema-jsonld');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(defaultSchema, null, 2);
    }

    return () => {
      // Cleanup on route change or unmount
      const existingScript = document.querySelector('script#cubixsol-schema-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [seo, fallback]);
}
