import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Search, Loader2, CheckCircle2, AlertTriangle,
  XCircle, Info, Globe, FileText, Smartphone, Link2, BarChart3,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';

function normalizeUrl(input) {
  let u = (input || '').trim();
  if (!u) return '';
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  try {
    const parsed = new URL(u);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    return parsed.href;
  } catch {
    return '';
  }
}

function scoreFromIssues(issues) {
  let score = 100;
  for (const i of issues) {
    if (i.level === 'critical') score -= 12;
    else if (i.level === 'warn') score -= 6;
    else score -= 2;
  }
  return Math.max(0, Math.min(100, score));
}

function grade(score) {
  if (score >= 90) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  if (score >= 75) return { label: 'Good', color: 'text-sky-600', bg: 'bg-sky-50' };
  if (score >= 55) return { label: 'Needs work', color: 'text-amber-600', bg: 'bg-amber-50' };
  return { label: 'Poor', color: 'text-rose-600', bg: 'bg-rose-50' };
}

function analyzeHtml(html, pageUrl) {
  const issues = [];
  const checks = [];
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const title = (doc.querySelector('title')?.textContent || '').trim();
  const metaDesc = (
    doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="Description"]')?.getAttribute('content') ||
    ''
  ).trim();
  const metaKeywords = (doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '').trim();
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
  const charset = doc.querySelector('meta[charset]')?.getAttribute('charset')
    || doc.querySelector('meta[http-equiv="Content-Type"]')?.getAttribute('content')
    || '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const ogType = doc.querySelector('meta[property="og:type"]')?.getAttribute('content') || '';
  const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const twCard = doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || '';
  const twTitle = doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const favicon = doc.querySelector('link[rel="icon"], link[rel="shortcut icon"]')?.getAttribute('href') || '';
  const h1s = [...doc.querySelectorAll('h1')].map((h) => h.textContent.trim()).filter(Boolean);
  const h2s = [...doc.querySelectorAll('h2')].map((h) => h.textContent.trim()).filter(Boolean);
  const h3Count = doc.querySelectorAll('h3').length;
  const headingCounts = {
    h1: h1s.length,
    h2: h2s.length,
    h3: h3Count,
    h4: doc.querySelectorAll('h4').length,
    h5: doc.querySelectorAll('h5').length,
    h6: doc.querySelectorAll('h6').length,
  };
  const images = [...doc.querySelectorAll('img')];
  const missingAltList = images.filter((img) => !(img.getAttribute('alt') || '').trim());
  const imgsMissingAlt = missingAltList.length;
  const missingAltUrls = missingAltList
    .map((img) => img.getAttribute('src') || img.getAttribute('data-src') || '')
    .filter(Boolean)
    .slice(0, 40);
  const imgsMissingSize = images.filter((img) => !img.getAttribute('width') && !img.getAttribute('height')).length;
  const htmlBytes = new Blob([html]).size;
  const htmlKb = Math.round((htmlBytes / 1024) * 10) / 10;
  const scriptSrcs = [...doc.querySelectorAll('script[src]')].map((s) => s.getAttribute('src') || '');
  const cssHrefs = [...doc.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute('href') || '');
  const jsMinified = scriptSrcs.length
    ? scriptSrcs.filter((s) => /\.min\.js(\?|$)/i.test(s) || s.includes('.min.')).length
    : 0;
  const cssMinified = cssHrefs.length
    ? cssHrefs.filter((s) => /\.min\.css(\?|$)/i.test(s) || s.includes('.min.')).length
    : 0;
  const links = [...doc.querySelectorAll('a[href]')];
  let host = '';
  try {
    host = new URL(pageUrl).hostname.replace(/^www\./, '');
  } catch {
    host = '';
  }
  let internalLinks = 0;
  let externalLinks = 0;
  let nofollowLinks = 0;
  const externalSamples = [];
  for (const a of links) {
    const href = a.getAttribute('href') || '';
    const rel = (a.getAttribute('rel') || '').toLowerCase();
    if (rel.includes('nofollow')) nofollowLinks += 1;
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    try {
      const abs = new URL(href, pageUrl);
      if (abs.hostname.replace(/^www\./, '') === host) internalLinks += 1;
      else {
        externalLinks += 1;
        if (externalSamples.length < 8) externalSamples.push(abs.href);
      }
    } catch {
      /* skip */
    }
  }
  const lang = doc.documentElement.getAttribute('lang') || '';
  const textContent = (doc.body?.textContent || '').replace(/\s+/g, ' ').trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;
  const jsonLd = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => s.textContent.trim())
    .filter(Boolean);
  let schemaTypes = [];
  for (const raw of jsonLd) {
    try {
      const data = JSON.parse(raw);
      const nodes = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data];
      for (const n of nodes) {
        if (n && n['@type']) {
          const ty = Array.isArray(n['@type']) ? n['@type'] : [n['@type']];
          schemaTypes.push(...ty);
        }
      }
    } catch {
      issues.push({ level: 'warn', area: 'Technical', text: 'Invalid JSON-LD structured data block detected.' });
    }
  }
  schemaTypes = [...new Set(schemaTypes)];

  const scripts = doc.querySelectorAll('script[src]').length;
  const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]').length;
  const hasHreflang = doc.querySelectorAll('link[rel="alternate"][hreflang]').length;

  // ——— Title ———
  if (!title) {
    issues.push({ level: 'critical', area: 'On-page', text: 'Missing <title> tag.' });
    checks.push({ ok: false, label: 'Title tag', detail: 'Not found' });
  } else if (title.length < 30) {
    issues.push({ level: 'warn', area: 'On-page', text: `Title is short (${title.length} chars). Aim for ~50–60.` });
    checks.push({ ok: false, label: 'Title tag', detail: `"${title.slice(0, 60)}" (${title.length} chars)` });
  } else if (title.length > 65) {
    issues.push({ level: 'warn', area: 'On-page', text: `Title may be truncated in SERPs (${title.length} chars).` });
    checks.push({ ok: true, label: 'Title tag', detail: `${title.length} chars — consider shortening` });
  } else {
    checks.push({ ok: true, label: 'Title tag', detail: `"${title.slice(0, 55)}${title.length > 55 ? '…' : ''}"` });
  }

  // ——— Meta description ———
  if (!metaDesc) {
    issues.push({ level: 'critical', area: 'On-page', text: 'Missing meta description.' });
    checks.push({ ok: false, label: 'Meta description', detail: 'Not found' });
  } else if (metaDesc.length < 70) {
    issues.push({ level: 'warn', area: 'On-page', text: `Meta description is short (${metaDesc.length} chars).` });
    checks.push({ ok: false, label: 'Meta description', detail: `${metaDesc.length} chars` });
  } else if (metaDesc.length > 165) {
    issues.push({ level: 'info', area: 'On-page', text: `Meta description is long (${metaDesc.length} chars) — may truncate.` });
    checks.push({ ok: true, label: 'Meta description', detail: `${metaDesc.length} chars` });
  } else {
    checks.push({ ok: true, label: 'Meta description', detail: `${metaDesc.length} chars` });
  }

  // ——— H1 / headings ———
  if (h1s.length === 0) {
    issues.push({ level: 'critical', area: 'Content', text: 'No H1 heading found.' });
    checks.push({ ok: false, label: 'H1 heading', detail: 'None' });
  } else if (h1s.length > 1) {
    issues.push({ level: 'warn', area: 'Content', text: `Multiple H1 tags (${h1s.length}). Prefer a single primary H1.` });
    checks.push({ ok: false, label: 'H1 heading', detail: `${h1s.length} found` });
  } else {
    checks.push({ ok: true, label: 'H1 heading', detail: h1s[0].slice(0, 80) });
  }

  if (headingCounts.h2 === 0 && wordCount > 300) {
    issues.push({ level: 'info', area: 'Content', text: 'No H2 subheadings — structure long content with H2s.' });
  }
  checks.push({
    ok: headingCounts.h2 > 0 || wordCount < 300,
    label: 'Heading structure',
    detail: `H1:${headingCounts.h1} H2:${headingCounts.h2} H3:${headingCounts.h3}`,
  });

  // ——— Canonical / robots ———
  if (!canonical) {
    issues.push({ level: 'info', area: 'Technical', text: 'No canonical link — useful for duplicate URL control.' });
    checks.push({ ok: false, label: 'Canonical', detail: 'Missing' });
  } else {
    checks.push({ ok: true, label: 'Canonical', detail: canonical.slice(0, 70) });
  }

  if (/noindex/i.test(robots)) {
    issues.push({ level: 'critical', area: 'Technical', text: 'robots meta contains noindex — page may not rank.' });
    checks.push({ ok: false, label: 'Robots meta', detail: robots });
  } else {
    checks.push({ ok: true, label: 'Robots meta', detail: robots || 'Not blocking index' });
  }

  // ——— Viewport / mobile ———
  if (!viewport) {
    issues.push({ level: 'critical', area: 'Mobile', text: 'Missing viewport meta — weak mobile rendering signal.' });
    checks.push({ ok: false, label: 'Viewport', detail: 'Missing' });
  } else {
    checks.push({ ok: true, label: 'Viewport', detail: 'Present' });
  }

  // ——— Open Graph / Twitter ———
  if (!ogTitle || !ogDesc) {
    issues.push({ level: 'warn', area: 'Social', text: 'Incomplete Open Graph tags (og:title / og:description).' });
    checks.push({ ok: false, label: 'Open Graph', detail: 'Incomplete' });
  } else {
    checks.push({ ok: true, label: 'Open Graph', detail: ogImage ? 'title, desc, image' : 'title & desc' });
  }
  if (!ogImage) {
    issues.push({ level: 'info', area: 'Social', text: 'No og:image — social shares may look plain.' });
  }
  if (!twCard) {
    issues.push({ level: 'info', area: 'Social', text: 'No twitter:card meta — Twitter/X previews may be limited.' });
    checks.push({ ok: false, label: 'Twitter card', detail: 'Missing' });
  } else {
    checks.push({ ok: true, label: 'Twitter card', detail: twCard });
  }

  // ——— Images ———
  if (images.length && imgsMissingAlt > 0) {
    const ratio = Math.round((imgsMissingAlt / images.length) * 100);
    issues.push({
      level: imgsMissingAlt > 3 ? 'warn' : 'info',
      area: 'Accessibility',
      text: `${imgsMissingAlt}/${images.length} images missing alt text (${ratio}%).`,
    });
    checks.push({ ok: false, label: 'Image alt text', detail: `${imgsMissingAlt} missing of ${images.length}` });
  } else if (images.length) {
    checks.push({ ok: true, label: 'Image alt text', detail: `All ${images.length} images have alt` });
  } else {
    checks.push({ ok: true, label: 'Image alt text', detail: 'No images found' });
  }
  if (images.length > 5 && imgsMissingSize > images.length * 0.5) {
    issues.push({
      level: 'info',
      area: 'Performance',
      text: 'Many images lack width/height attributes — can contribute to layout shift (CLS).',
    });
  }

  // ——— Lang / charset ———
  if (!lang) {
    issues.push({ level: 'warn', area: 'Technical', text: 'html lang attribute missing.' });
    checks.push({ ok: false, label: 'Language', detail: 'Missing lang' });
  } else {
    checks.push({ ok: true, label: 'Language', detail: lang });
  }
  checks.push({ ok: Boolean(charset), label: 'Charset', detail: charset || 'Not detected in head' });

  // ——— Content ———
  if (wordCount < 150) {
    issues.push({ level: 'warn', area: 'Content', text: `Thin content (~${wordCount} words). Aim for substantive copy on key pages.` });
    checks.push({ ok: false, label: 'Content depth', detail: `~${wordCount} words` });
  } else {
    checks.push({ ok: true, label: 'Content depth', detail: `~${wordCount} words` });
  }

  // ——— Links ———
  checks.push({
    ok: internalLinks > 0 || links.length === 0,
    label: 'Internal links',
    detail: `${internalLinks} internal · ${externalLinks} external`,
  });
  if (links.length > 0 && internalLinks === 0) {
    issues.push({ level: 'warn', area: 'Content', text: 'No internal links detected — internal linking helps crawl paths and relevance.' });
  }
  if (externalLinks > 50) {
    issues.push({ level: 'info', area: 'Content', text: `High external link count (${externalLinks}). Review relevance and nofollow where needed.` });
  }

  // ——— Structured data ———
  if (schemaTypes.length === 0) {
    issues.push({ level: 'info', area: 'Technical', text: 'No JSON-LD schema detected (Organization, WebPage, FAQ, etc.).' });
    checks.push({ ok: false, label: 'Structured data', detail: 'None detected' });
  } else {
    checks.push({ ok: true, label: 'Structured data', detail: schemaTypes.slice(0, 6).join(', ') });
  }

  // ——— Favicon ———
  if (!favicon) {
    issues.push({ level: 'info', area: 'Technical', text: 'No favicon link found in head.' });
    checks.push({ ok: false, label: 'Favicon', detail: 'Missing' });
  } else {
    checks.push({ ok: true, label: 'Favicon', detail: favicon.slice(0, 50) });
  }

  // ——— Performance hints ———
  if (htmlKb > 50) {
    issues.push({
      level: 'warn',
      area: 'Performance',
      text: `HTML document is ${htmlKb} KB (recommendation: under ~50 KB).`,
    });
    checks.push({ ok: false, label: 'HTML size', detail: `${htmlKb} KB` });
  } else {
    checks.push({ ok: true, label: 'HTML size', detail: `${htmlKb} KB` });
  }
  const totalRequestsHint = images.length + scriptSrcs.length + cssHrefs.length;
  if (totalRequestsHint > 50) {
    issues.push({
      level: 'warn',
      area: 'Performance',
      text: `High resource count on page (~${totalRequestsHint}: ${images.length} images, ${scriptSrcs.length} scripts, ${cssHrefs.length} CSS).`,
    });
  }
  checks.push({
    ok: totalRequestsHint <= 50,
    label: 'Resource count',
    detail: `~${totalRequestsHint} (img ${images.length} · js ${scriptSrcs.length} · css ${cssHrefs.length})`,
  });
  if (scriptSrcs.length) {
    const ratio = Math.round((jsMinified / scriptSrcs.length) * 100);
    checks.push({
      ok: ratio >= 50 || scriptSrcs.length < 3,
      label: 'JS minified (hint)',
      detail: `${jsMinified}/${scriptSrcs.length} look minified by filename`,
    });
  }
  if (cssHrefs.length) {
    const ratio = Math.round((cssMinified / cssHrefs.length) * 100);
    checks.push({
      ok: ratio >= 50 || cssHrefs.length < 3,
      label: 'CSS minified (hint)',
      detail: `${cssMinified}/${cssHrefs.length} look minified by filename`,
    });
  }

  // ——— HTTPS ———
  try {
    const u = new URL(pageUrl);
    if (u.protocol !== 'https:') {
      issues.push({ level: 'critical', area: 'Technical', text: 'Page is not on HTTPS.' });
      checks.push({ ok: false, label: 'HTTPS', detail: u.protocol });
    } else {
      checks.push({ ok: true, label: 'HTTPS', detail: 'Secure' });
    }
  } catch {
    /* ignore */
  }

  // ——— Resources hint ———
  checks.push({
    ok: true,
    label: 'Head resources',
    detail: `${scripts} scripts · ${stylesheets} stylesheets · hreflang:${hasHreflang}`,
  });

  // Recommendations
  const recommendations = [];
  if (!title || title.length < 40) {
    recommendations.push('Rewrite the title to include the primary keyword near the front and stay under ~60 characters.');
  }
  if (!metaDesc || metaDesc.length < 100) {
    recommendations.push('Write a compelling meta description (120–155 chars) that matches search intent and includes a soft CTA.');
  }
  if (h1s.length !== 1) {
    recommendations.push('Use exactly one clear H1 that mirrors the main topic of the page.');
  }
  if (headingCounts.h2 === 0 && wordCount > 200) {
    recommendations.push('Add descriptive H2 sections so users and crawlers can scan the page structure.');
  }
  if (imgsMissingAlt > 0) {
    recommendations.push('Add descriptive alt text to images for accessibility and image search visibility.');
  }
  if (!ogImage) {
    recommendations.push('Add an og:image (1200×630 recommended) so shares look intentional on social and chat previews.');
  }
  if (!twCard) {
    recommendations.push('Add twitter:card (and title/description) for richer previews on X.');
  }
  if (wordCount < 300) {
    recommendations.push('Expand body content with useful sections, FAQs, or proof points to better match informational queries.');
  }
  if (schemaTypes.length === 0) {
    recommendations.push('Add relevant JSON-LD (WebPage, Organization, FAQPage, or Product) to clarify entities for search engines.');
  }
  if (internalLinks === 0 && links.length > 0) {
    recommendations.push('Add contextual internal links to related pages to strengthen topical clusters.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Fundamentals look solid — next focus on Core Web Vitals, internal linking depth, and unique content at scale.');
  }

  const score = scoreFromIssues(issues);
  return {
    title,
    metaDesc,
    metaKeywords,
    canonical,
    robots,
    viewport,
    lang,
    charset,
    ogTitle,
    ogDesc,
    ogImage,
    ogType,
    ogUrl,
    twCard,
    twTitle,
    favicon,
    h1s,
    h2s: h2s.slice(0, 20),
    headingCounts,
    wordCount,
    imageCount: images.length,
    imgsMissingAlt,
    missingAltUrls,
    htmlKb,
    linkCount: links.length,
    internalLinks,
    externalLinks,
    nofollowLinks,
    externalSamples,
    schemaTypes,
    scripts,
    stylesheets,
    scriptSrcs: scriptSrcs.slice(0, 30),
    cssHrefs: cssHrefs.slice(0, 20),
    jsMinified,
    cssMinified,
    hasHreflang,
    issues,
    checks,
    recommendations,
    score,
    grade: grade(score),
  };
}

function analyzeUrlOnly(pageUrl) {
  const issues = [];
  const checks = [];
  try {
    const u = new URL(pageUrl);
    if (u.protocol === 'https:') {
      checks.push({ ok: true, label: 'HTTPS', detail: 'Secure URL' });
    } else {
      issues.push({ level: 'critical', area: 'Technical', text: 'URL is not HTTPS.' });
      checks.push({ ok: false, label: 'HTTPS', detail: u.protocol });
    }
    if (u.hostname.startsWith('www.')) {
      checks.push({ ok: true, label: 'Host', detail: u.hostname });
    } else {
      checks.push({ ok: true, label: 'Host', detail: u.hostname });
    }
    if (pageUrl.length > 100) {
      issues.push({ level: 'info', area: 'Technical', text: 'URL is long — shorter paths are easier to share and often cleaner.' });
    }
    if (/[A-Z]/.test(u.pathname) && u.pathname !== u.pathname.toLowerCase()) {
      issues.push({ level: 'info', area: 'Technical', text: 'URL path contains uppercase characters — prefer lowercase slugs.' });
    }
    if (u.search.length > 1) {
      issues.push({ level: 'info', area: 'Technical', text: 'URL has query parameters — ensure canonical tags avoid duplicate indexation.' });
    }
  } catch {
    issues.push({ level: 'critical', area: 'Technical', text: 'Invalid URL.' });
  }
  return { issues, checks };
}

async function fetchHtml(pageUrl) {
  const proxies = [
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  ];
  let lastErr = null;
  for (const make of proxies) {
    try {
      const res = await fetch(make(pageUrl), { signal: AbortSignal.timeout(18000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (!text || text.length < 40) throw new Error('Empty response');
      return text;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Fetch failed');
}

const LevelIcon = ({ level }) => {
  if (level === 'critical') return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
  if (level === 'warn') return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
  return <Info className="w-4 h-4 text-sky-500 shrink-0" />;
};


function buildReportText(result, pageUrl) {
  const lines = [];
  const ts = new Date().toISOString();
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('  CUBIXSOL AI SEO AUDITOR — FULL REPORT');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push(`Generated: ${ts}`);
  lines.push(`URL: ${pageUrl}`);
  lines.push(`Source: ${result.source || 'audit'}`);
  lines.push(`Score: ${result.score}/100 (${result.grade?.label || ''})`);
  lines.push('');
  lines.push('── SNAPSHOT ──────────────────────────────────────────────');
  lines.push(`Title: ${result.title || '—'}`);
  lines.push(`Meta description: ${result.metaDesc || '—'}`);
  lines.push(`Canonical: ${result.canonical || '—'}`);
  lines.push(`Robots: ${result.robots || '—'}`);
  lines.push(`Language: ${result.lang || '—'}`);
  lines.push(`Viewport: ${result.viewport || '—'}`);
  lines.push(`Word count: ~${result.wordCount ?? '—'}`);
  lines.push(`Images: ${result.imageCount ?? 0} (missing alt: ${result.imgsMissingAlt ?? 0})`);
  lines.push(`Links: ${result.linkCount ?? 0} (internal ${result.internalLinks ?? 0} · external ${result.externalLinks ?? 0} · nofollow ${result.nofollowLinks ?? 0})`);
  lines.push(`Headings: H1=${result.headingCounts?.h1 ?? 0} H2=${result.headingCounts?.h2 ?? 0} H3=${result.headingCounts?.h3 ?? 0}`);
  lines.push(`H1 text: ${(result.h1s || []).join(' | ') || '—'}`);
  if (result.h2s?.length) {
    lines.push('H2s:');
    result.h2s.forEach((h, i) => lines.push(`  ${i + 1}. ${h}`));
  }
  lines.push(`Open Graph: title=${result.ogTitle ? 'yes' : 'no'}, desc=${result.ogDesc ? 'yes' : 'no'}, image=${result.ogImage ? 'yes' : 'no'}`);
  lines.push(`Twitter card: ${result.twCard || '—'}`);
  lines.push(`Structured data types: ${(result.schemaTypes || []).join(', ') || 'none'}`);
  lines.push(`Favicon: ${result.favicon || '—'}`);
  lines.push(`Scripts/stylesheets: ${result.scripts ?? 0} / ${result.stylesheets ?? 0}`);
  lines.push('');
  lines.push('── CHECKLIST ─────────────────────────────────────────────');
  (result.checks || []).forEach((c) => {
    lines.push(`${c.ok ? '[PASS]' : '[FAIL]'} ${c.label}: ${c.detail}`);
  });
  lines.push('');
  lines.push('── ISSUES ────────────────────────────────────────────────');
  if (!(result.issues || []).length) lines.push('None flagged.');
  (result.issues || []).forEach((iss, i) => {
    lines.push(`${i + 1}. [${(iss.level || '').toUpperCase()}] (${iss.area}) ${iss.text}`);
  });
  lines.push('');
  lines.push('── AI RECOMMENDATIONS ────────────────────────────────────');
  (result.recommendations || []).forEach((r, i) => {
    lines.push(`${i + 1}. ${r}`);
  });
  if (result.externalSamples?.length) {
    lines.push('');
    lines.push('── SAMPLE EXTERNAL LINKS ─────────────────────────────────');
    result.externalSamples.forEach((u) => lines.push(`- ${u}`));
  }
  lines.push('');
  lines.push('── DISCLAIMER ────────────────────────────────────────────');
  lines.push('This report is generated by Cubixsol AI SEO Auditor (client-side analysis).');
  lines.push('It does not replace crawl-based tools (Search Console, full site crawlers) or lab performance tests.');
  lines.push('https://cubixsol.com');
  lines.push('═══════════════════════════════════════════════════════════');
  return lines.join('\n');
}

function buildReportHtml(result, pageUrl) {
  const esc = (s) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const critical = (result.issues || []).filter((i) => i.level === 'critical');
  const recommended = (result.issues || []).filter((i) => i.level === 'warn' || i.level === 'info');
  const good = (result.checks || []).filter((c) => c.ok);
  const totalItems = (result.checks || []).length + (result.issues || []).length;
  const score = result.score ?? 0;
  const gradeLabel = result.grade?.label || '';
  const scoreColor = score >= 75 ? '#16a34a' : score >= 55 ? '#d97706' : '#e11d48';
  const generated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statusRow = (ok, title, body, box) => `
    <div class="check">
      <div class="check-head">
        <span class="icon ${ok ? 'ok' : 'bad'}">${ok ? '✓' : '✕'}</span>
        <strong>${esc(title)}</strong>
      </div>
      ${box ? `<div class="box">${box}</div>` : ''}
      ${body ? `<p class="help">${body}</p>` : ''}
    </div>`;

  const titleOk = Boolean(result.title) && (result.title || '').length >= 30 && (result.title || '').length <= 65;
  const metaOk = Boolean(result.metaDesc) && (result.metaDesc || '').length >= 70;
  const h1Ok = (result.h1s || []).length === 1;
  const h2Ok = (result.headingCounts?.h2 || 0) > 0;
  const altOk = !result.imgsMissingAlt;
  const linksOk = (result.internalLinks || 0) > 0 || (result.linkCount || 0) === 0;
  const canonOk = Boolean(result.canonical);
  const noindexBad = /noindex/i.test(result.robots || '');
  const httpsOk = /^https:/i.test(pageUrl);
  const ogOk = Boolean(result.ogTitle && result.ogDesc);
  const schemaOk = (result.schemaTypes || []).length > 0;
  const robotsTxtOk = Boolean(result.robotsTxt);
  const htmlSizeOk = (result.htmlKb || 0) <= 50;

  const missingAltBox = (result.missingAltUrls || [])
    .slice(0, 25)
    .map((u) => esc(u))
    .join('<br/>');

  const h2List = (result.h2s || []).map((h) => `<li>${esc(h)}</li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>SEO Analysis Report — ${esc(pageUrl)}</title>
<style>
  :root { --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; --brand:#1d4ed8; --ok:#16a34a; --bad:#e11d48; --warn:#d97706; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:var(--ink); line-height:1.55; background:#fff; }
  .page { max-width: 820px; margin: 0 auto; padding: 48px 28px; }
  .cover { min-height: 100vh; display:flex; flex-direction:column; justify-content:space-between; page-break-after: always; }
  .cover h1 { font-size: 2.6rem; color: var(--brand); margin: 0 0 12px; letter-spacing: -0.02em; }
  .cover .url { font-size: 1.05rem; color: var(--ink); margin-bottom: 16px; }
  .badge { display:inline-block; background:#e2e8f0; color:#334155; font-size: .85rem; padding: 6px 12px; border-radius: 8px; }
  .cover-foot { margin-top: 80px; background: linear-gradient(135deg, #dbeafe, #eff6ff); border-radius: 0 0 0 0; padding: 80px 28px 40px; margin-left:-28px; margin-right:-28px; margin-bottom:-48px; position:relative; overflow:hidden; }
  .cover-foot:after { content:''; position:absolute; right:-40px; bottom:-60px; width:220px; height:220px; border-radius:50%; background:#3b82f6; }
  .cover-foot:before { content:''; position:absolute; right:40px; bottom:-20px; width:280px; height:280px; border-radius:50%; border:24px solid #bfdbfe; }
  .brand { font-weight: 800; font-size: 1.4rem; color: var(--ink); position:relative; z-index:1; }
  .brand span { color: var(--brand); }
  h2.sec { font-size: 1.45rem; margin: 0 0 20px; padding-left: 12px; border-left: 4px solid var(--brand); }
  .toc a { color: var(--ink); text-decoration:none; display:flex; justify-content:space-between; padding: 10px 0; border-bottom: 1px dotted #cbd5e1; }
  .overview-card { background:#f8fafc; border-radius: 16px; padding: 28px; margin-bottom: 24px; }
  .score-wrap { display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
  .score-ring { width:140px; height:140px; border-radius:50%; background: conic-gradient(${scoreColor} ${score * 3.6}deg, #e2e8f0 0); display:grid; place-items:center; }
  .score-ring > div { width:108px; height:108px; border-radius:50%; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .score-ring strong { font-size: 2rem; line-height:1; color:${scoreColor}; }
  .score-ring small { color: ${scoreColor}; font-weight:700; }
  .stats { display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; margin-top: 20px; }
  .stat { background:#fff; border:1px solid var(--line); border-radius:10px; padding:12px; text-align:center; }
  .stat b { display:block; font-size:1.25rem; }
  .stat span { font-size:.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; }
  .serp { border:1px solid var(--line); border-radius:12px; padding:16px 18px; background:#fff; }
  .serp .u { color:#202124; font-size:.8rem; margin-bottom:4px; }
  .serp .t { color:#1a0dab; font-size:1.15rem; font-weight:500; margin-bottom:4px; }
  .serp .d { color:#4d5156; font-size:.9rem; }
  .check { border-bottom:1px solid var(--line); padding: 18px 0; }
  .check-head { display:flex; gap:10px; align-items:flex-start; margin-bottom:8px; }
  .icon { width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:#fff; flex-shrink:0; }
  .icon.ok { background: var(--ok); }
  .icon.bad { background: var(--bad); }
  .box { background:#f1f5f9; border-radius:10px; padding:12px 14px; font-size:.9rem; margin: 8px 0 10px; word-break:break-word; }
  .help { color: var(--muted); font-size:.9rem; margin:0; }
  .footer { margin-top: 40px; padding-top: 16px; border-top:1px solid var(--line); font-size:.78rem; color:var(--muted); display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  @media print {
    .page { padding: 24px; }
    .cover { min-height: auto; }
    .cover-foot { margin: 40px 0 0; padding: 40px 24px; }
  }
</style>
</head>
<body>
  <!-- COVER -->
  <div class="page cover">
    <div>
      <h1>SEO Analysis Report</h1>
      <p class="url">${esc(pageUrl)}</p>
      <span class="badge">Generated on ${esc(generated)}</span>
    </div>
    <div class="cover-foot">
      <div class="brand">Cubixsol <span>AI SEO Auditor</span></div>
    </div>
  </div>

  <!-- TOC -->
  <div class="page">
    <h2 class="sec">Table of Contents</h2>
    <div class="toc">
      <a href="#overview"><span>Overview</span><span>3</span></a>
      <a href="#basic"><span>Basic SEO</span><span>4</span></a>
      <a href="#advanced"><span>Advanced SEO</span><span>5</span></a>
      <a href="#performance"><span>Performance</span><span>6</span></a>
      <a href="#security"><span>Security</span><span>7</span></a>
      <a href="#recommendations"><span>Recommendations</span><span>8</span></a>
    </div>
    <div class="footer"><span>Generated for ${esc(pageUrl)} on ${esc(generated)}</span><span>Cubixsol</span></div>
  </div>

  <!-- OVERVIEW -->
  <div class="page" id="overview">
    <div class="overview-card">
      <div class="score-wrap">
        <div>
          <h2 style="margin:0 0 8px;border:0;padding:0;font-size:1.25rem">Overall Site Score</h2>
          <p class="help" style="max-width:320px">A solid score is 60–80. For best results, aim for 70 and above. This audit covers on-page, technical, performance hints, and security signals.</p>
        </div>
        <div class="score-ring"><div><strong>${esc(score)}</strong><small>/ 100</small><small style="margin-top:4px">${esc(gradeLabel)}</small></div></div>
      </div>
      <div class="stats">
        <div class="stat"><b>${esc(totalItems)}</b><span>All items</span></div>
        <div class="stat"><b style="color:var(--bad)">${esc(critical.length)}</b><span>Critical</span></div>
        <div class="stat"><b style="color:var(--warn)">${esc(recommended.length)}</b><span>Recommended</span></div>
        <div class="stat"><b style="color:var(--ok)">${esc(good.length)}</b><span>Good results</span></div>
      </div>
    </div>

    <h2 class="sec">Search Preview</h2>
    <p class="help">Here is how the page may appear in search results:</p>
    <div class="serp">
      <div class="u">${esc(pageUrl)}</div>
      <div class="t">${esc(result.title || 'Untitled page')}</div>
      <div class="d">${esc(result.metaDesc || 'No meta description set.')}</div>
    </div>
    <div class="footer"><span>Generated for ${esc(pageUrl)} on ${esc(generated)}</span><span>Cubixsol AI SEO Auditor</span></div>
  </div>

  <!-- BASIC SEO -->
  <div class="page" id="basic">
    <h2 class="sec">Basic SEO</h2>
    ${statusRow(
      titleOk,
      result.title
        ? `The SEO title is set and is ${(result.title || '').length} characters long.`
        : 'The SEO title is missing.',
      'Ensure your page title includes target keywords and encourages clicks. Aim for roughly 50–60 characters.',
      result.title ? esc(result.title) : ''
    )}
    ${statusRow(
      metaOk,
      result.metaDesc
        ? `The meta description is set and is ${(result.metaDesc || '').length} characters long.`
        : 'The meta description is missing.',
      'Write a meta description that summarizes the page and stimulates interest. Aim for about 120–155 characters.',
      result.metaDesc ? esc(result.metaDesc) : ''
    )}
    ${statusRow(
      h1Ok,
      h1Ok ? 'One H1 tag was found on the page.' : `H1 heading issue (${(result.h1s || []).length} found).`,
      'Use a single clear H1 that reflects the main topic of the page.',
      (result.h1s || []).map((h) => `• ${esc(h)}`).join('<br/>')
    )}
    ${statusRow(
      h2Ok,
      h2Ok ? 'H2 tags were found on the page.' : 'No H2 tags were found on the page.',
      'Break content into logical sections with H2 headings. Include related terminology naturally.',
      h2List ? `<ul>${h2List}</ul>` : ''
    )}
    ${statusRow(
      altOk,
      altOk
        ? 'All images appear to include alt attributes.'
        : `Some images on the page have no alt attribute. (${result.imgsMissingAlt || 0})`,
      'Make sure every image has useful alt text. Describe the image and include keywords only when natural.',
      missingAltBox
    )}
    ${statusRow(
      linksOk,
      `The page has ${result.internalLinks || 0} internal and ${result.externalLinks || 0} external links.`,
      'Link to high-quality, relevant resources. Internal links help users and crawlers discover related content.',
      `Internal: ${esc(result.internalLinks || 0)}<br/>External: ${esc(result.externalLinks || 0)}<br/>Nofollow: ${esc(result.nofollowLinks || 0)}`
    )}
    <div class="footer"><span>Generated for ${esc(pageUrl)} on ${esc(generated)}</span><span>Basic SEO</span></div>
  </div>

  <!-- ADVANCED -->
  <div class="page" id="advanced">
    <h2 class="sec">Advanced SEO</h2>
    ${statusRow(
      canonOk,
      canonOk ? 'The page is using the canonical link tag.' : 'The page is missing a canonical link tag.',
      'Every important page should declare its preferred URL with rel="canonical" in the head.',
      result.canonical ? esc(result.canonical) : ''
    )}
    ${statusRow(
      !noindexBad,
      noindexBad
        ? 'The page contains a noindex directive.'
        : 'The page does not contain any noindex header or meta tag.',
      'Only use noindex on pages you intentionally want excluded from search results.',
      result.robots ? esc(result.robots) : 'No blocking robots directive detected'
    )}
    ${statusRow(
      robotsTxtOk,
      robotsTxtOk ? 'The site has a robots.txt file.' : 'A robots.txt file was not detected.',
      'Use robots.txt to guide crawlers. Only disallow paths you truly want blocked from crawling.',
      robotsTxtOk ? `<pre style="white-space:pre-wrap;margin:0;font-size:.8rem">${esc((result.robotsTxt || '').slice(0, 1200))}</pre>` : ''
    )}
    ${statusRow(
      ogOk,
      ogOk ? 'Open Graph tags are present.' : 'Some Open Graph meta tags are missing or incomplete.',
      'Add og:title, og:description, og:image, og:type, and og:url for better social previews.',
      `og:title: ${result.ogTitle ? 'yes' : 'no'} · og:description: ${result.ogDesc ? 'yes' : 'no'} · og:image: ${result.ogImage ? 'yes' : 'no'} · og:type: ${result.ogType ? 'yes' : 'no'} · og:url: ${result.ogUrl ? 'yes' : 'no'} · twitter:card: ${result.twCard || 'no'}`
    )}
    ${statusRow(
      schemaOk,
      schemaOk ? 'We found Schema.org data on the page.' : 'No Schema.org (JSON-LD) data was detected.',
      'Structured data helps search engines understand entities (Organization, WebPage, FAQ, Product, etc.).',
      schemaOk ? esc((result.schemaTypes || []).join(', ')) : ''
    )}
    ${statusRow(
      Boolean(result.lang),
      result.lang ? `HTML language is set to "${esc(result.lang)}".` : 'HTML lang attribute is missing.',
      'Declare the primary language of the page on the <html> element.',
      ''
    )}
    <div class="footer"><span>Generated for ${esc(pageUrl)} on ${esc(generated)}</span><span>Advanced SEO</span></div>
  </div>

  <!-- PERFORMANCE -->
  <div class="page" id="performance">
    <h2 class="sec">Performance</h2>
    ${statusRow(
      htmlSizeOk,
      htmlSizeOk
        ? `The size of the HTML document is ${esc(result.htmlKb || 0)} KB.`
        : `The size of the HTML document is ${esc(result.htmlKb || 0)} KB. This is over our recommendation of 50 KB.`,
      'Reduce unnecessary markup, comments, and inline CSS. Prefer external stylesheets and lean templates.',
      ''
    )}
    ${statusRow(
      (result.scripts || 0) + (result.stylesheets || 0) + (result.imageCount || 0) <= 50,
      `The page references about ${(result.imageCount || 0) + (result.scripts || 0) + (result.stylesheets || 0)} resources.`,
      'Too many requests can slow loading. Consider lazy-loading images, bundling, and removing unused scripts.',
      `Images: ${esc(result.imageCount || 0)}<br/>JavaScript: ${esc(result.scripts || 0)}<br/>CSS: ${esc(result.stylesheets || 0)}`
    )}
    ${statusRow(
      !result.scripts || (result.jsMinified || 0) >= Math.ceil((result.scripts || 1) * 0.4),
      'JavaScript minification (filename heuristic).',
      'Serve minified JS in production. Filename checks are a hint only — verify in your build pipeline.',
      `${esc(result.jsMinified || 0)} of ${esc(result.scripts || 0)} script srcs look minified`
    )}
    ${statusRow(
      !result.stylesheets || (result.cssMinified || 0) >= Math.ceil((result.stylesheets || 1) * 0.4),
      'CSS minification (filename heuristic).',
      'Serve minified CSS in production where possible.',
      `${esc(result.cssMinified || 0)} of ${esc(result.stylesheets || 0)} stylesheets look minified`
    )}
    ${statusRow(
      (result.wordCount || 0) >= 150,
      `Visible text content is approximately ${esc(result.wordCount || 0)} words.`,
      'Thin pages often underperform for informational queries. Expand with useful, unique content where appropriate.',
      ''
    )}
    <div class="footer"><span>Generated for ${esc(pageUrl)} on ${esc(generated)}</span><span>Performance</span></div>
  </div>

  <!-- SECURITY -->
  <div class="page" id="security">
    <h2 class="sec">Security</h2>
    ${statusRow(
      httpsOk,
      httpsOk
        ? 'The site is using a secure transfer protocol (HTTPS).'
        : 'The site is not using HTTPS.',
      'SSL/TLS is expected by users and search engines. Install a valid certificate and redirect HTTP to HTTPS.',
      ''
    )}
    ${statusRow(
      true,
      'Client-side audit cannot fully verify directory listing or Safe Browsing status.',
      'Confirm directory listing is disabled on the server and review Google Search Console / Safe Browsing for security issues.',
      ''
    )}
    ${statusRow(
      !noindexBad && httpsOk,
      'Indexation and transport basics look consistent with a public marketing page.' ,
      'Re-check staging sites, auth walls, and headers (X-Robots-Tag) on the server for production readiness.',
      ''
    )}
    <div class="footer"><span>Generated for ${esc(pageUrl)} on ${esc(generated)}</span><span>Security</span></div>
  </div>

  <!-- RECOMMENDATIONS -->
  <div class="page" id="recommendations">
    <h2 class="sec">AI Recommendations</h2>
    <ol>
      ${(result.recommendations || []).map((r) => `<li style="margin-bottom:10px">${esc(r)}</li>`).join('') || '<li>No major recommendations.</li>'}
    </ol>
    <h2 class="sec" style="margin-top:36px">All flagged issues</h2>
    <ul>
      ${(result.issues || []).map((i) => `<li style="margin-bottom:8px"><strong>[${esc(i.level)}] ${esc(i.area)}:</strong> ${esc(i.text)}</li>`).join('') || '<li>None.</li>'}
    </ul>
    <div class="footer">
      <span>Generated by Cubixsol AI SEO Auditor · Client-side analysis. Pair with Search Console and crawl tools for full-site coverage.</span>
      <span>${esc(generated)}</span>
    </div>
  </div>
</body>
</html>`;
}


function downloadBlob(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadReport(result, pageUrl, format) {
  const host = (() => {
    try {
      return new URL(pageUrl).hostname.replace(/\./g, '-');
    } catch {
      return 'seo-audit';
    }
  })();
  const stamp = new Date().toISOString().slice(0, 10);
  if (format === 'html') {
    downloadBlob(`cubixsol-seo-audit-${host}-${stamp}.html`, buildReportHtml(result, pageUrl), 'text/html;charset=utf-8');
  } else {
    downloadBlob(`cubixsol-seo-audit-${host}-${stamp}.txt`, buildReportText(result, pageUrl), 'text/plain;charset=utf-8');
  }
}


export default function AiSeoAuditor() {
  const [url, setUrl] = useState('');
  const [htmlPaste, setHtmlPaste] = useState('');
  const [mode, setMode] = useState('url'); // url | html
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [fetchedUrl, setFetchedUrl] = useState('');

  const runAudit = async (e) => {
    e?.preventDefault();
    setError('');
    setResult(null);

    if (mode === 'html') {
      if (!htmlPaste.trim() || htmlPaste.trim().length < 20) {
        setError('Paste a full HTML page (or at least the <head> and main content).');
        return;
      }
      setLoading(true);
      try {
        const pageUrl = normalizeUrl(url) || 'https://example.com/';
        const base = analyzeUrlOnly(pageUrl);
        const htmlResult = analyzeHtml(htmlPaste, pageUrl);
        htmlResult.issues = [...base.issues, ...htmlResult.issues];
        htmlResult.checks = [...base.checks, ...htmlResult.checks];
        htmlResult.score = scoreFromIssues(htmlResult.issues);
        htmlResult.grade = grade(htmlResult.score);
        htmlResult.source = 'html';
        setResult(htmlResult);
        setFetchedUrl(pageUrl);
      } finally {
        setLoading(false);
      }
      return;
    }

    const pageUrl = normalizeUrl(url);
    if (!pageUrl) {
      setError('Enter a valid URL (e.g. example.com or https://example.com).');
      return;
    }

    setLoading(true);
    try {
      const html = await fetchHtml(pageUrl);
      const base = analyzeUrlOnly(pageUrl);
      const htmlResult = analyzeHtml(html, pageUrl);
      htmlResult.issues = [...base.issues, ...htmlResult.issues];
      htmlResult.checks = [...base.checks.filter((c) => !htmlResult.checks.some((h) => h.label === c.label)), ...htmlResult.checks];
      // robots.txt probe
      try {
        const origin = new URL(pageUrl).origin;
        const robotsText = await fetchHtml(`${origin}/robots.txt`);
        if (robotsText && !robotsText.trim().startsWith('<!') && robotsText.length < 100000) {
          htmlResult.robotsTxt = robotsText.slice(0, 2500);
          htmlResult.checks.push({ ok: true, label: 'robots.txt', detail: 'Found' });
        } else {
          htmlResult.robotsTxt = '';
          htmlResult.checks.push({ ok: false, label: 'robots.txt', detail: 'Not found or not plain text' });
          htmlResult.issues.push({ level: 'info', area: 'Technical', text: 'robots.txt not detected at site root.' });
        }
      } catch {
        htmlResult.robotsTxt = '';
        htmlResult.checks.push({ ok: false, label: 'robots.txt', detail: 'Could not fetch' });
      }
      htmlResult.score = scoreFromIssues(htmlResult.issues);
      htmlResult.grade = grade(htmlResult.score);
      htmlResult.source = 'live';
      setResult(htmlResult);
      setFetchedUrl(pageUrl);
    } catch {
      // Fallback: URL-only heuristics + invite HTML paste
      const base = analyzeUrlOnly(pageUrl);
      const issues = [
        ...base.issues,
        {
          level: 'warn',
          area: 'Fetch',
          text: 'Could not load page HTML (CORS or network). URL checks only — paste HTML below for a full audit.',
        },
      ];
      setResult({
        title: '',
        metaDesc: '',
        h1s: [],
        h2s: [],
        headingCounts: { h1: 0, h2: 0, h3: 0 },
        wordCount: 0,
        imageCount: 0,
        imgsMissingAlt: 0,
        missingAltUrls: [],
        htmlKb: 0,
        linkCount: 0,
        internalLinks: 0,
        externalLinks: 0,
        nofollowLinks: 0,
        schemaTypes: [],
        scripts: 0,
        stylesheets: 0,
        jsMinified: 0,
        cssMinified: 0,
        robotsTxt: '',
        issues,
        checks: base.checks,
        recommendations: [
          'Switch to “Paste HTML” mode: View Source on the page, copy, and paste here for title, meta, H1, and image checks.',
          'Confirm the site is publicly reachable over HTTPS.',
        ],
        score: scoreFromIssues(issues),
        grade: grade(scoreFromIssues(issues)),
        source: 'url-only',
      });
      setFetchedUrl(pageUrl);
      setMode('html');
    } finally {
      setLoading(false);
    }
  };

  const criticalCount = useMemo(
    () => result?.issues.filter((i) => i.level === 'critical').length || 0,
    [result]
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1f4a] text-white">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/40 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Reveal scale>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white mb-5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> All products
            </Link>
            <p className="text-primary-300 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Accessibility Tools · Free
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl">
              AI SEO Auditor
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              Paste a URL or page HTML — get a prioritised SEO health score covering title, meta,
              headings, mobile signals, and accessibility basics.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-3xl rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-4 sm:p-6">
              <div className="flex gap-2 mb-4">
                {[
                  ['url', 'Audit URL'],
                  ['html', 'Paste HTML'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMode(id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                      mode === id
                        ? 'bg-primary-gradient text-white shadow'
                        : 'bg-white/10 text-white/80 hover:bg-white/15'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <form onSubmit={runAudit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-white/50 mb-1.5">
                    Page URL {mode === 'html' && '(optional)'}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/page"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-ink text-sm font-medium border-0 focus:ring-2 focus:ring-primary-400 outline-none"
                      />
                    </div>
                    {mode === 'url' && (
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary justify-center min-w-[140px] disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Scanning…
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4" /> Run audit
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {mode === 'html' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-white/50 mb-1.5">
                        HTML source
                      </label>
                      <textarea
                        value={htmlPaste}
                        onChange={(e) => setHtmlPaste(e.target.value)}
                        rows={8}
                        placeholder="Paste page HTML here (View Source → copy)…"
                        className="w-full px-4 py-3 rounded-xl bg-white text-ink text-sm font-mono border-0 focus:ring-2 focus:ring-primary-400 outline-none resize-y min-h-[160px]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Analyzing…
                        </>
                      ) : (
                        <>
                          <BarChart3 className="w-4 h-4" /> Analyze HTML
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>

              {error && (
                <p className="mt-3 text-sm text-rose-300 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {error}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.section
            key={fetchedUrl + result.score}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <p className="eyebrow mb-1">Audit results</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {fetchedUrl.replace(/^https?:\/\//, '')}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Source: {result.source === 'live' ? 'Live page fetch' : result.source === 'html' ? 'Pasted HTML' : 'URL checks only'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className={`inline-flex items-center gap-3 rounded-2xl px-5 py-3 ${result.grade.bg}`}>
                  <div className="text-center">
                    <p className={`text-3xl font-extrabold ${result.grade.color}`}>{result.score}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Score</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200" />
                  <div>
                    <p className={`font-extrabold ${result.grade.color}`}>{result.grade.label}</p>
                    <p className="text-xs text-gray-500">{criticalCount} critical issue{criticalCount === 1 ? '' : 's'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadReport(result, fetchedUrl, 'html')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink text-white text-sm font-bold hover:bg-ink/90 transition"
                >
                  Download report
                </button>
              </div>
            </div>

            {/* SERP preview */}
            <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Search preview</p>
              <p className="text-xs text-gray-500 mb-1 truncate">{fetchedUrl}</p>
              <p className="text-lg text-[#1a0dab] font-medium mb-1 leading-snug">
                {result.title || 'Untitled page'}
              </p>
              <p className="text-sm text-[#4d5156] leading-relaxed">
                {result.metaDesc || 'No meta description set.'}
              </p>
            </div>

            {/* Snapshot */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {[
                [FileText, 'Title', result.title ? result.title.slice(0, 40) + (result.title.length > 40 ? '…' : '') : '—'],
                [Search, 'Words', result.wordCount ? `~${result.wordCount}` : '—'],
                [Smartphone, 'Images', result.imageCount ?? '—'],
                [Link2, 'Links', result.linkCount ?? '—'],
              ].map(([Icon, label, val]) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center gap-2 text-primary-600 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">{label}</span>
                  </div>
                  <p className="text-sm font-semibold text-ink truncate">{val}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Checks */}
              <div>
                <h3 className="text-lg font-extrabold text-ink mb-4">Checklist</h3>
                <ul className="space-y-2">
                  {result.checks.map((c) => (
                    <li
                      key={c.label + c.detail}
                      className="flex gap-3 items-start rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm"
                    >
                      {c.ok ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">{c.label}</p>
                        <p className="text-xs text-gray-500 truncate">{c.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Issues + recommendations */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-extrabold text-ink mb-4">Issues</h3>
                  {result.issues.length === 0 ? (
                    <p className="text-sm text-gray-500">No major issues flagged.</p>
                  ) : (
                    <ul className="space-y-2">
                      {result.issues.map((iss, i) => (
                        <li
                          key={i}
                          className="flex gap-3 items-start rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm"
                        >
                          <LevelIcon level={iss.level} />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">
                              {iss.area} · {iss.level}
                            </p>
                            <p className="text-sm text-ink font-medium leading-snug">{iss.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-2xl bg-primary-50/60 border border-primary-100 p-5">
                  <h3 className="text-lg font-extrabold text-ink mb-3">AI recommendations</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {result.recommendations.map((r) => (
                      <li key={r} className="text-sm text-gray-600 leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => downloadReport(result, fetchedUrl, 'html')}
                className="btn-primary"
              >
                Download full report (HTML)
              </button>
              <button
                type="button"
                onClick={() => downloadReport(result, fetchedUrl, 'txt')}
                className="btn-outline"
              >
                Download report (TXT)
              </button>
              <Link to="/contact" className="btn-outline">
                SEO engagement <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setError('');
                }}
                className="btn-outline"
              >
                New audit
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {!result && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ['Technical signals', 'HTTPS, canonical, robots, language, viewport'],
              ['On-page SEO', 'Title, meta description, H1 structure, content depth'],
              ['Accessibility & social', 'Image alt text, Open Graph previews'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-gray-100 p-5 shadow-card">
                <h3 className="font-bold text-ink mb-1">{t}</h3>
                <p className="text-sm text-gray-500">{d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  );
}
