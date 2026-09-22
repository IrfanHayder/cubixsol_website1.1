import React from 'react';

/**
 * Parses inline formatting:
 * - **bold** (handles cases like `**Flutter:**`, `** React Native:**`, `** Firebase: **`, `**Swift:**`)
 * - `code`
 * - *italic* or _italic_
 * - [Link](url)
 */
export function formatInline(text, options = {}) {
  if (!text || typeof text !== 'string') return text;

  const {
    strongClass = 'font-bold text-ink',
    emClass = 'italic text-ink/90',
    codeClass = 'px-1.5 py-0.5 rounded bg-gray-100/90 border border-gray-200 text-[#00a4d8] font-mono text-[0.88em]',
    linkClass = 'text-[#00a4d8] underline hover:text-[#0284c7] font-semibold transition-colors',
  } = options;

  // Regex tokens:
  // 1. Markdown Images: !\[([^\]]*)\]\(([^)]+)\)
  // 2. Bold Links: \*\*\[([^\]]+)\]\(([^)]+)\)\*\*
  // 3. Markdown Links: \[([^\]]+)\]\(([^)]+)\)
  // 4. Bold: \*\*([^*]+?)\*\*
  // 5. Inline code: `([^`]+?)`
  // 6. Italic: \*([^*]+?)\* or _([^_]+?)_
  const tokenRegex = /(!\[[^\]]*\]\([^)]+\)|\*\*\[[^\]]+\]\([^)]+\)\*\*|\[[^\]]+\]\([^)]+\)|\*\*[^*]+?\*\*|`[^`]+?`|\*[^*]+?\*|_[^_]+?_)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Image: ![alt](url)
    const imgMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(part);
    if (imgMatch) {
      const altText = imgMatch[1];
      const imgUrl = imgMatch[2];
      return (
        <span key={index} className="inline-block my-2 max-w-full">
          <img
            src={imgUrl}
            alt={altText || 'Image'}
            className="rounded-xl shadow-sm border border-gray-100 max-h-96 object-cover inline-block max-w-full"
            loading="lazy"
          />
          {altText && (
            <span className="block text-center text-xs text-gray-500 italic mt-1">{altText}</span>
          )}
        </span>
      );
    }

    // Bold Link: **[title](url)**
    const boldLinkMatch = /^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/.exec(part);
    if (boldLinkMatch) {
      const linkText = boldLinkMatch[1];
      const linkUrl = boldLinkMatch[2];
      const isExternal = /^https?:\/\//i.test(linkUrl);
      return (
        <strong key={index} className={strongClass}>
          <a
            href={linkUrl}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={linkClass}
          >
            {linkText}
          </a>
        </strong>
      );
    }

    // Link: [title](url)
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      const isExternal = /^https?:\/\//i.test(linkUrl);
      return (
        <a
          key={index}
          href={linkUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={linkClass}
        >
          {formatInline(linkText, options)}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const rawInner = part.slice(2, -2);
      const trimmed = rawInner.trim();
      const hasLeadingSpace = rawInner.startsWith(' ');
      const hasTrailingSpace = rawInner.endsWith(' ');
      return (
        <React.Fragment key={index}>
          {hasLeadingSpace ? ' ' : ''}
          <strong className={strongClass}>
            {formatInline(trimmed, options)}
          </strong>
          {hasTrailingSpace ? ' ' : ''}
        </React.Fragment>
      );
    }

    // Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code key={index} className={codeClass}>
          {inner}
        </code>
      );
    }

    // Italic: *italic* or _italic_
    if (
      ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) &&
      part.length >= 2
    ) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className={emClass}>
          {formatInline(inner, options)}
        </em>
      );
    }

    return part;
  });
}

// Backward-compatible alias
export const formatText = formatInline;

/**
 * Helper to parse a line into table cells (supports markdown pipe, tab-separated, or multi-space columns)
 */
function parseTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^[#>]\s+/.test(trimmed)) return null;

  // 1. Pipe-separated: | Col 1 | Col 2 | or Col 1 | Col 2
  if (trimmed.includes('|')) {
    let clean = trimmed;
    if (clean.startsWith('|')) clean = clean.substring(1);
    if (clean.endsWith('|')) clean = clean.slice(0, -1);
    const cells = clean.split('|').map((c) => c.trim());
    if (cells.length >= 2) {
      const isSep = cells.every((c) => /^:?-+:?$/.test(c));
      return { type: isSep ? 'sep' : 'row', cells };
    }
  }

  // 2. Tab-separated: Col 1\tCol 2\tCol 3
  if (trimmed.includes('\t')) {
    const cells = trimmed.split('\t').map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      return { type: 'row', cells };
    }
  }

  // 3. Multi-space separated columns: Col 1    Col 2    Col 3
  const multiSpaceCells = trimmed.split(/\s{2,}/).map((c) => c.trim()).filter(Boolean);
  if (multiSpaceCells.length >= 2) {
    return { type: 'row', cells: multiSpaceCells };
  }

  return null;
}

/**
 * Parses full multiline rich text blocks, including:
 * - Headings (# H1, ## H2, ### H3, #### H4, ##### H5, ###### H6)
 * - Tables (Markdown pipe tables, tab-separated, or multi-space comparison tables)
 * - Blockquotes (> Quote)
 * - Horizontal rules (---)
 * - Bullet lists (- item, * item, • item, + item)
 * - Numbered lists (1. item, 2. item)
 * - Key-Value formatted lines (e.g. `**Flutter:** Description...`)
 * - Paragraphs separated by newlines
 */
export function FormatRichText({
  text,
  className = '',
  itemClassName = '',
  strongClass = 'font-bold text-ink',
  bulletColor = 'bg-[#00a4d8]',
}) {
  if (!text || typeof text !== 'string') return null;

  // Normalize HTML line breaks into real newlines
  const normalized = text.replace(/<br\s*\/?>/gi, '\n');
  const lines = normalized.split(/\r?\n/);

  // Group lines into blocks: 'h1'-'h6', 'table', 'blockquote', 'hr', 'p', 'ul', 'ol'
  const blocks = [];
  let currentList = null;
  let currentTable = null;

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  const flushTable = () => {
    if (currentTable) {
      if (currentTable.rows.length >= 2 || (currentTable.rows.length >= 1 && currentTable.hasSep)) {
        blocks.push(currentTable);
      } else {
        // Not enough rows to form a table, fallback to normal paragraphs
        currentTable.rows.forEach((r) => {
          blocks.push({ type: 'p', text: r.join(' | ') });
        });
      }
      currentTable = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      flushTable();
      return;
    }

    // Check table row first
    const tableRow = parseTableRow(line);
    if (tableRow) {
      flushList();
      if (!currentTable) {
        currentTable = { type: 'table', rows: [], hasSep: false };
      }
      if (tableRow.type === 'sep') {
        currentTable.hasSep = true;
      } else {
        currentTable.rows.push(tableRow.cells);
      }
      return;
    }

    // Not a table line, flush active table
    flushTable();

    // Heading matches: # H1, ## H2, ### H3, #### H4, ##### H5, ###### H6
    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    // Block image: ![alt](url)
    const imgBlockMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(trimmed);
    // Blockquote: > text
    const quoteMatch = /^>\s+(.*)$/.exec(trimmed);
    // Horizontal divider: --- or *** or ___
    const hrMatch = /^(?:---|\*\*\*|___)$/.exec(trimmed);
    // Bullet item (- item, * item, • item, + item) - do NOT match **bold**
    const bulletMatch = /^([-•+]|\*(?!\*))\s+(.*)$/.exec(trimmed);
    // Numbered item (1. item, 2. item)
    const numberedMatch = /^(\d+)\.\s+(.*)$/.exec(trimmed);

    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      blocks.push({ type: `h${level}`, text: headingMatch[2] });
    } else if (imgBlockMatch) {
      flushList();
      blocks.push({ type: 'img', alt: imgBlockMatch[1], url: imgBlockMatch[2] });
    } else if (quoteMatch) {
      flushList();
      blocks.push({ type: 'blockquote', text: quoteMatch[1] });
    } else if (hrMatch) {
      flushList();
      blocks.push({ type: 'hr' });
    } else if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[2]);
    } else if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberedMatch[2]);
    } else {
      flushList();
      blocks.push({ type: 'p', text: trimmed });
    }
  });

  flushList();
  flushTable();

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'img') {
          return (
            <figure key={bIdx} className="my-6 sm:my-8 text-center">
              <img
                src={block.url}
                alt={block.alt || 'Content visual'}
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-md border border-gray-100 object-cover max-h-[550px]"
                loading="lazy"
              />
              {block.alt && block.alt.trim() && (
                <figcaption className="mt-2.5 text-xs sm:text-sm text-gray-500 italic">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === 'table') {
          if (!block.rows || block.rows.length === 0) return null;
          const headerRow = block.rows[0] || [];
          const bodyRows = block.rows.slice(1);

          return (
            <div
              key={bIdx}
              className="overflow-x-auto my-6 sm:my-8 rounded-2xl border border-gray-200/90 shadow-sm bg-white"
            >
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 via-sky-50/60 to-indigo-50/40 border-b border-gray-200 text-ink">
                    {headerRow.map((cell, cIdx) => (
                      <th
                        key={cIdx}
                        className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-extrabold text-ink uppercase tracking-wider first:rounded-tl-2xl last:rounded-tr-2xl"
                      >
                        {formatInline(cell, { strongClass })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm sm:text-base text-gray-700">
                  {bodyRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="odd:bg-white even:bg-slate-50/50 hover:bg-sky-50/40 transition-colors"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 sm:px-6 py-3.5 leading-relaxed ${
                            cIdx === 0 ? 'font-bold text-ink' : 'text-gray-700'
                          }`}
                        >
                          {formatInline(cell, { strongClass })}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'h1') {
          return (
            <h1 key={bIdx} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mt-8 mb-4 first:mt-0 leading-tight">
              {formatInline(block.text, { strongClass })}
            </h1>
          );
        }

        if (block.type === 'h2') {
          return (
            <h2 key={bIdx} className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink tracking-tight mt-7 mb-3.5 first:mt-0 leading-tight">
              {formatInline(block.text, { strongClass })}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3 key={bIdx} className="text-lg sm:text-xl lg:text-2xl font-bold text-ink tracking-tight mt-6 mb-3 first:mt-0 leading-snug">
              {formatInline(block.text, { strongClass })}
            </h3>
          );
        }

        if (block.type === 'h4') {
          return (
            <h4 key={bIdx} className="text-base sm:text-lg font-bold text-ink tracking-tight mt-5 mb-2.5 first:mt-0 leading-snug">
              {formatInline(block.text, { strongClass })}
            </h4>
          );
        }

        if (block.type === 'h5' || block.type === 'h6') {
          return (
            <h5 key={bIdx} className="text-sm sm:text-base font-bold text-ink tracking-tight mt-4 mb-2 first:mt-0 uppercase tracking-wide">
              {formatInline(block.text, { strongClass })}
            </h5>
          );
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote key={bIdx} className="border-l-4 border-[#00a4d8] bg-sky-50/70 p-4 sm:p-5 rounded-r-2xl italic text-gray-700 my-5 text-base sm:text-lg leading-relaxed shadow-xs">
              {formatInline(block.text, { strongClass })}
            </blockquote>
          );
        }

        if (block.type === 'hr') {
          return <hr key={bIdx} className="my-8 border-gray-200" />;
        }

        if (block.type === 'ul') {
          return (
            <ul key={bIdx} className="space-y-2.5 my-3">
              {block.items.map((item, iIdx) => (
                <li
                  key={iIdx}
                  className={`flex items-start gap-2.5 text-sm sm:text-base leading-relaxed ${itemClassName}`}
                >
                  <span className={`w-2 h-2 rounded-full ${bulletColor} mt-2 shrink-0 shadow-sm`} />
                  <span className="flex-1">{formatInline(item, { strongClass })}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={bIdx} className="space-y-2.5 my-3 list-none">
              {block.items.map((item, iIdx) => (
                <li
                  key={iIdx}
                  className={`flex items-start gap-3 text-sm sm:text-base leading-relaxed ${itemClassName}`}
                >
                  <span className="w-5 h-5 rounded-full bg-sky-50 border border-cyan-100 text-[#00a4d8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {iIdx + 1}
                  </span>
                  <span className="flex-1">{formatInline(item, { strongClass })}</span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={bIdx} className={`text-base sm:text-lg leading-relaxed text-gray-700 ${itemClassName}`}>
            {formatInline(block.text, { strongClass })}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Flexibly parses multiline custom list items from strings or arrays.
 * Supports:
 * - "Title | Description"
 * - "- Title: Description"
 * - "Title: Description"
 * - "- **Title**: Description" / "- **Title:** Description"
 * - "1. Title: Description" / "1. Title | Description"
 * - Multiline continuations
 */
export function parseCustomListItems(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    if (input.length > 0 && typeof input[0] === 'object' && input[0] !== null) {
      const valid = input.filter((item) => (item.title && String(item.title).trim()) || (item.desc && String(item.desc).trim()) || (item.q && String(item.q).trim()));
      if (valid.length > 0) return valid;
    }
    input = input.join('\n');
  }
  if (typeof input !== 'string') return [];

  const rawLines = input.split(/\r?\n/);
  const items = [];
  let current = null;

  rawLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let matchedTitle = null;
    let matchedDesc = null;

    if (trimmed.includes('|')) {
      const parts = trimmed.split('|');
      matchedTitle = parts[0];
      matchedDesc = parts.slice(1).join('|');
    } else {
      // Look for bullet / number prefix + optional bold + separator (: or - or – or —) + desc
      const colonMatch = trimmed.match(/^[-*•\d+.)\s]*(?:\*\*(.*?)\*\*[:]?|(.*?))(?:\s*[:–—]\s+|\s+-\s+)(.*)$/);
      if (colonMatch) {
        matchedTitle = (colonMatch[1] || colonMatch[2] || '').trim();
        matchedDesc = (colonMatch[3] || '').trim();
      }
    }

    if (matchedTitle !== null && matchedTitle.trim()) {
      if (current && (current.title || current.q || current.desc)) {
        items.push(current);
      }
      const cleanTitle = matchedTitle
        .replace(/^[-*•\d+.)\s]+/, '')
        .replace(/^\*\*|\*\*$/g, '')
        .trim();
      current = {
        title: cleanTitle,
        desc: matchedDesc ? matchedDesc.trim() : '',
        q: cleanTitle,
        a: matchedDesc ? matchedDesc.trim() : '',
      };
    } else if (current) {
      current.desc = current.desc ? `${current.desc}\n\n${trimmed}` : trimmed;
      current.a = current.a ? `${current.a}\n\n${trimmed}` : trimmed;
    } else {
      const cleanLine = trimmed.replace(/^[-*•\d+.)\s]+/, '').trim();
      current = { title: cleanLine, desc: '', q: cleanLine, a: '' };
    }
  });

  if (current && (current.title || current.q || current.desc)) {
    items.push(current);
  }

  return items;
}

/**
 * Normalizes and cleans image URLs:
 * - Trims whitespace
 * - Strips accidental trailing slashes (e.g. /uploads/image.png/ -> /uploads/image.png)
 */
export function cleanImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.replace(/\/+$/, '');
  }
  return cleaned;
}

/**
 * Parses process steps from string or array
 */
export function parseProcessSteps(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    if (input.length > 0 && typeof input[0] === 'object' && input[0] !== null) {
      const valid = input.filter((item) => item && item.title && String(item.title).trim());
      if (valid.length > 0) {
        return valid.map((item) => ({
          ...item,
          image: cleanImageUrl(item.image),
        }));
      }
    }
    input = input.join('\n');
  }
  if (typeof input !== 'string') return [];

  const rawLines = input.split(/\r?\n/);
  const items = [];
  let current = null;

  rawLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.includes('|')) {
      if (current && current.title) items.push(current);

      let cleanLine = trimmed;
      if (cleanLine.startsWith('|')) cleanLine = cleanLine.substring(1);
      let parts = cleanLine.split('|').map((s) => s.trim());
      while (parts.length > 3 && parts[parts.length - 1] === '') {
        parts.pop();
      }

      const idx = items.length;
      if (parts.length >= 5) {
        const points = parts.slice(4).join(';').split(';').map((p) => p.trim()).filter(Boolean);
        current = {
          stepNumber: parts[0] || `0${idx + 1}`,
          title: parts[1] || '',
          desc: parts[2] || '',
          image: cleanImageUrl(parts[3]),
          points,
        };
      } else if (parts.length === 4) {
        const part4 = parts[3];
        const isImg =
          /^(https?:\/\/|\/uploads\/|\/|\.\/|data:image\/|blob:)/i.test(part4) ||
          /\.(png|jpg|jpeg|webp|svg|gif|avif)(\?.*)?$/i.test(part4.replace(/\/+$/, ''));
        current = {
          stepNumber: parts[0] || `0${idx + 1}`,
          title: parts[1] || '',
          desc: parts[2] || '',
          image: isImg ? cleanImageUrl(part4) : '',
          points: !isImg ? part4.split(';').map((p) => p.trim()).filter(Boolean) : [],
        };
      } else if (parts.length === 3) {
        current = { stepNumber: parts[0] || `0${idx + 1}`, title: parts[1], desc: parts[2], image: '', points: [] };
      } else if (parts.length === 2) {
        current = { stepNumber: `0${idx + 1}`, title: parts[0], desc: parts[1], image: '', points: [] };
      } else {
        current = { stepNumber: `0${idx + 1}`, title: parts[0], desc: '', image: '', points: [] };
      }
    } else {
      const match = trimmed.match(/^[-*•\d+.)\s]*(\d+)?[\s.)\-–—]*(?:\*\*(.*?)\*\*[:]?|(.*?))(?:\s*[:–—]\s+|\s+-\s+)(.*)$/);
      if (match) {
        if (current && current.title) items.push(current);
        const idx = items.length;
        const stepNum = match[1] ? (match[1].length === 1 ? `0${match[1]}` : match[1]) : `0${idx + 1}`;
        const title = (match[2] || match[3] || '').replace(/^\*\*|\*\*$/g, '').trim();
        const desc = (match[4] || '').trim();
        current = { stepNumber: stepNum, title, desc, image: '', points: [] };
      } else if (current) {
        current.desc = current.desc ? `${current.desc}\n\n${trimmed}` : trimmed;
      } else {
        const clean = trimmed.replace(/^[-*•\d+.)\s]+/, '').trim();
        const idx = items.length;
        current = { stepNumber: `0${idx + 1}`, title: clean, desc: '', image: '', points: [] };
      }
    }
  });

  if (current && current.title) items.push(current);
  return items;
}

export default FormatRichText;
