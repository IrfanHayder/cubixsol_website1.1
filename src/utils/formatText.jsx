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

export default FormatRichText;
