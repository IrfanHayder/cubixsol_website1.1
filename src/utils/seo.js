import { useEffect } from 'react';

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
    const canonical = seo?.canonicalUrl || window.location.href.split('?')[0];

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

    let linkEl = document.querySelector('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonical);
  }, [seo, fallback]);
}
