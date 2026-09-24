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
 * Supports multiple call formats:
 * 1. useSEO(seoObject, fallbackObject)
 * 2. useSEO({ title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, schema })
 * 3. useSEO({ metaTitle, metaDescription, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, schema })
 * 4. useSEO(titleString, descriptionString, keywordsString, imageString)
 * 5. useSEO(itemObject) where item has .seo or (.title and .desc)
 */
export function useSEO(arg1, arg2, arg3, arg4) {
  let title = '';
  let description = '';
  let keywords = '';
  let ogTitle = '';
  let ogDesc = '';
  let ogImage = '';
  let canonical = '';
  let rawSchema = '';

  if (typeof arg1 === 'string') {
    // Positional arguments format: useSEO(title, description, keywords, image)
    title = arg1 || '';
    description = typeof arg2 === 'string' ? arg2 : (arg2?.description || arg2?.desc || '');
    keywords = typeof arg3 === 'string' ? arg3 : (typeof arg2 === 'object' ? arg2?.keywords || '' : '');
    ogImage = typeof arg4 === 'string' ? arg4 : (typeof arg2 === 'object' ? arg2?.ogImage || arg2?.image || arg2?.heroImage || '/assets/logo.svg' : '/assets/logo.svg');
    ogTitle = title;
    ogDesc = description;
    canonical = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
    rawSchema = typeof arg2 === 'object' ? arg2?.schema || arg2?.schemaMarkup || '' : '';
  } else {
    // Object format
    const seoObj = arg1 && typeof arg1 === 'object'
      ? (arg1.seo && typeof arg1.seo === 'object' ? { ...arg1, ...arg1.seo } : arg1)
      : {};
    const fbObj = arg2 && typeof arg2 === 'object'
      ? (arg2.seo && typeof arg2.seo === 'object' ? { ...arg2, ...arg2.seo } : arg2)
      : {};

    title =
      seoObj.metaTitle ||
      seoObj.title ||
      fbObj.metaTitle ||
      fbObj.title ||
      (fbObj.name ? `${fbObj.name} | Cubixsol` : '') ||
      'Cubixsol — Digital Engineering & Custom Software';

    description =
      seoObj.metaDescription ||
      seoObj.description ||
      seoObj.desc ||
      seoObj.longDesc ||
      seoObj.excerpt ||
      fbObj.metaDescription ||
      fbObj.description ||
      fbObj.desc ||
      fbObj.longDesc ||
      fbObj.excerpt ||
      '';

    keywords =
      seoObj.keywords ||
      fbObj.keywords ||
      '';

    ogTitle =
      seoObj.ogTitle ||
      fbObj.ogTitle ||
      title;

    ogDesc =
      seoObj.ogDescription ||
      seoObj.ogDesc ||
      fbObj.ogDescription ||
      fbObj.ogDesc ||
      description;

    ogImage =
      seoObj.ogImage ||
      fbObj.ogImage ||
      fbObj.image ||
      fbObj.heroImage ||
      fbObj.coverImage ||
      '/assets/logo.svg';

    canonical =
      seoObj.canonicalUrl ||
      fbObj.canonicalUrl ||
      (typeof window !== 'undefined' ? window.location.href.split('?')[0] : '');

    rawSchema =
      seoObj.schema ||
      seoObj.schemaMarkup ||
      fbObj.schema ||
      fbObj.schemaMarkup ||
      '';
  }

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (nameAttr, nameVal, content) => {
      if (content === undefined || content === null) return;
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', String(content));
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
    if (canonical) {
      let linkEl = document.querySelector('link[rel="canonical"]');
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', canonical);
    }

    // =========================================================================
    // JSON-LD SCHEMA MARKUP INJECTION
    // =========================================================================
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
            // If not strict single JSON (e.g. multiple root schemas or custom block), inject cleaned string directly
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
  }, [title, description, keywords, ogTitle, ogDesc, ogImage, canonical, rawSchema]);
}

