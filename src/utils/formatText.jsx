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
    linkClass = 'text-[#00a4d8] underline hover:text-[#0284c7] transition-colors',
  } = options;

  // Regex tokens:
  // 1. Markdown Links: \[([^\]]+)\]\(([^)]+)\)
  // 2. Bold: \*\*([^*]+?)\*\*
  // 3. Inline code: `([^`]+?)`
  // 4. Italic: \*([^*]+?)\* or _([^_]+?)_
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+?\*\*|`[^`]+?`|\*[^*]+?\*|_[^_]+?_)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

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
          {linkText}
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
            {trimmed}
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
          {inner}
        </em>
      );
    }

    return part;
  });
}

// Backward-compatible alias
export const formatText = formatInline;

/**
 * Parses full multiline rich text blocks, including:
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

  // Group lines into blocks: 'p', 'ul', 'ol'
  const blocks = [];
  let currentList = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      return;
    }

    // Bullet item (- item, * item, • item, + item)
    // Note: Do NOT treat `**bold**` as bullet `*`
    const bulletMatch = /^([-•+]|\*(?!\*))\s+(.*)$/.exec(trimmed);
    // Numbered item (1. item, 2. item)
    const numberedMatch = /^(\d+)\.\s+(.*)$/.exec(trimmed);

    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        if (currentList) blocks.push(currentList);
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[2]);
    } else if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        if (currentList) blocks.push(currentList);
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberedMatch[2]);
    } else {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({ type: 'p', text: trimmed });
    }
  });

  if (currentList) {
    blocks.push(currentList);
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'ul') {
          return (
            <ul key={bIdx} className="space-y-2.5 my-2.5">
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
            <ol key={bIdx} className="space-y-2.5 my-2.5 list-none">
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
          <p key={bIdx} className={`leading-relaxed ${itemClassName}`}>
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
 * Parses process steps from string or array
 */
export function parseProcessSteps(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    if (input.length > 0 && typeof input[0] === 'object' && input[0] !== null) {
      const valid = input.filter((item) => item.title && String(item.title).trim());
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

    if (trimmed.includes('|')) {
      if (current && current.title) items.push(current);
      const parts = trimmed.split('|').map((s) => s.trim());
      const idx = items.length;
      if (parts.length >= 5) {
        const points = parts[4].split(';').map((p) => p.trim()).filter(Boolean);
        current = {
          stepNumber: parts[0] || `0${idx + 1}`,
          title: parts[1],
          desc: parts[2],
          image: parts[3],
          points,
        };
      } else if (parts.length === 4) {
        const isImg = parts[3].startsWith('http') || parts[3].startsWith('/uploads') || parts[3].includes('/');
        current = {
          stepNumber: parts[0] || `0${idx + 1}`,
          title: parts[1],
          desc: parts[2],
          image: isImg ? parts[3] : '',
          points: !isImg ? parts[3].split(';').map((p) => p.trim()).filter(Boolean) : [],
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
