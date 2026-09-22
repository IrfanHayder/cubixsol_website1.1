import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Code,
  Eye,
  Edit3,
  PlusCircle,
  HelpCircle,
  Tag,
  Eraser,
  Pilcrow,
  Quote,
  Minus,
  Table as TableIcon,
  Image as ImageIcon,
  FolderOpen,
  X,
} from 'lucide-react';
import { FormatRichText, cleanImageUrl } from '../../utils/formatText';
import MediaPickerModal from './MediaPickerModal';

export default function RichTextareaField({
  name,
  value = '',
  onChange,
  label,
  placeholder,
  rows = 4,
  required = false,
  hint,
  field = {},
}) {
  const [isPreview, setIsPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef(null);

  // Link Modal state
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });

  // Image Modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [directMediaPickerOpen, setDirectMediaPickerOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCursorPos, setImageCursorPos] = useState(0);

  // Helper to format or toggle heading level (# H1, ## H2, ### H3, #### H4)
  const applyHeading = (level) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const prefix = '#'.repeat(level) + ' ';

    // Find start of first line and end of last line in selection
    let lineStart = currentVal.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = currentVal.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = currentVal.length;

    const selectedChunk = currentVal.substring(lineStart, lineEnd);
    const lines = selectedChunk.split('\n');

    const transformed = lines.map((l) => {
      const headingMatch = l.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const existingLevel = headingMatch[1].length;
        const content = headingMatch[2];
        if (existingLevel === level) {
          // Toggle off -> return plain text
          return content;
        }
        // Switch to new heading level
        return `${prefix}${content}`;
      }
      // If not a heading, add heading prefix (strip list bullet if any)
      const cleanLine = l.replace(/^[-*•\d+.)\s]+/, '').trim();
      if (!cleanLine) {
        return `${prefix}Heading ${level}`;
      }
      return `${prefix}${cleanLine}`;
    }).join('\n');

    const updated = currentVal.substring(0, lineStart) + transformed + currentVal.substring(lineEnd);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(lineStart, lineStart + transformed.length);
      }
    }, 0);
  };

  // Helper to insert or toggle blockquote '> '
  const applyBlockquote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';

    let lineStart = currentVal.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = currentVal.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = currentVal.length;

    const selectedChunk = currentVal.substring(lineStart, lineEnd);
    const lines = selectedChunk.split('\n');

    const transformed = lines.map((l) => {
      if (l.startsWith('> ')) {
        return l.substring(2);
      }
      return `> ${l || 'Important quote or takeaway'}`;
    }).join('\n');

    const updated = currentVal.substring(0, lineStart) + transformed + currentVal.substring(lineEnd);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(lineStart, lineStart + transformed.length);
      }
    }, 0);
  };

  // Helper to insert a horizontal divider '---'
  const insertDivider = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const insertion = (start > 0 && !currentVal.substring(0, start).endsWith('\n') ? '\n\n' : '') + '---\n\n';
    const updated = currentVal.substring(0, start) + insertion + currentVal.substring(end);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + insertion.length, start + insertion.length);
      }
    }, 0);
  };

  // Helper to insert or convert selection into a Comparison Table
  const insertTable = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const selectedText = currentVal.substring(start, end).trim();

    let tableContent = '';
    if (selectedText) {
      const lines = selectedText.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length > 0) {
        const rows = lines.map((line) => {
          if (line.includes('|')) {
            let clean = line.trim();
            if (clean.startsWith('|')) clean = clean.substring(1);
            if (clean.endsWith('|')) clean = clean.slice(0, -1);
            return clean.split('|').map((c) => c.trim());
          } else if (line.includes('\t')) {
            return line.split('\t').map((c) => c.trim());
          } else {
            return line.split(/\s{2,}|\s*:\s*/).map((c) => c.trim());
          }
        });
        const colCount = Math.max(...rows.map((r) => r.length), 2);
        const formattedRows = rows.map((r) => {
          const padded = [...r];
          while (padded.length < colCount) padded.push('');
          return `| ${padded.join(' | ')} |`;
        });
        const separator = `| ${Array(colCount).fill('---').join(' | ')} |`;
        tableContent = [formattedRows[0], separator, ...formattedRows.slice(1)].join('\n');
      }
    }

    if (!tableContent) {
      tableContent = `| Feature | SaaS Software | Custom Software |\n| --- | --- | --- |\n| Deployment | Fast | Takes time |\n| Customization | Limited | Fully customizable |\n| Upfront Cost | Low | Higher |\n| Long-Term Cost | Subscription-based | One-time + maintenance |\n| Compliance | Generic | Tailored to regulations |\n| Security | Vendor-controlled | Business-controlled |`;
    }

    const prefix = (start > 0 && !currentVal.substring(0, start).endsWith('\n') ? '\n\n' : '');
    const suffix = '\n\n';
    const insertion = prefix + tableContent + suffix;
    const updated = currentVal.substring(0, start) + insertion + currentVal.substring(end);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length + tableContent.length);
      }
    }, 0);
  };

  // Helper to insert a paragraph break \n\n at current cursor position
  const insertParagraphBreak = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const insertion = '\n\n';
    const updated = currentVal.substring(0, start) + insertion + currentVal.substring(end);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + insertion.length, start + insertion.length);
      }
    }, 0);
  };

  // Helper to wrap or insert text at current cursor / selection
  const applyFormatting = (before, after = '', defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const selectedText = currentVal.substring(start, end);

    let insertion = '';
    let newCursorPos = 0;

    if (selectedText) {
      insertion = `${before}${selectedText}${after}`;
      newCursorPos = start + insertion.length;
    } else {
      insertion = `${before}${defaultText}${after}`;
      newCursorPos = start + before.length + defaultText.length;
    }

    const updated = currentVal.substring(0, start) + insertion + currentVal.substring(end);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          selectedText ? start : start + before.length,
          selectedText ? newCursorPos : newCursorPos
        );
      }
    }, 0);
  };

  // Open Link Modal with prefilled selection
  const openLinkModal = () => {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? 0;
    const end = textarea?.selectionEnd ?? 0;
    const currentVal = value || '';
    const selectedText = currentVal.substring(start, end);

    setSelectionRange({ start, end });
    setLinkText(selectedText || '');
    setLinkUrl('');
    setLinkModalOpen(true);
  };

  // Confirm inserting Link
  const handleInsertLink = (e) => {
    e?.preventDefault();
    if (!linkUrl.trim()) return;

    const currentVal = value || '';
    const textToDisplay = linkText.trim() || linkUrl.trim();
    const markdownLink = `[${textToDisplay}](${linkUrl.trim()})`;

    const updated =
      currentVal.substring(0, selectionRange.start) +
      markdownLink +
      currentVal.substring(selectionRange.end);

    onChange?.(updated);
    setLinkModalOpen(false);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = selectionRange.start + markdownLink.length;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  // Open Image Modal
  const openImageModal = () => {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? (value ? value.length : 0);
    const end = textarea?.selectionEnd ?? start;
    const currentVal = value || '';
    const selectedText = currentVal.substring(start, end);

    setImageCursorPos(start);
    setSelectionRange({ start, end });
    setImageUrl('');
    setImageAlt(selectedText || '');
    setImageModalOpen(true);
  };

  // Open Direct Media Picker from toolbar to insert/replace raw URL
  const openDirectMediaPicker = () => {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? (value ? value.length : 0);
    const end = textarea?.selectionEnd ?? start;
    setSelectionRange({ start, end });
    setDirectMediaPickerOpen(true);
  };

  // Direct selection from Media Picker (inserts or replaces with clean URL)
  const handleDirectMediaSelect = (url) => {
    if (!url) return;
    const currentVal = value || '';
    const cleanUrl = cleanImageUrl(url);

    const updated =
      currentVal.substring(0, selectionRange.start) +
      cleanUrl +
      currentVal.substring(selectionRange.end);

    onChange?.(updated);
    setDirectMediaPickerOpen(false);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = selectionRange.start + cleanUrl.length;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  // Confirm inserting raw Image URL only (for pipe-separated rows or plain links)
  const handleInsertRawUrl = (e) => {
    e?.preventDefault();
    if (!imageUrl.trim()) return;

    const currentVal = value || '';
    const cleanUrl = cleanImageUrl(imageUrl);

    const start = selectionRange.start !== undefined ? selectionRange.start : imageCursorPos;
    const end = selectionRange.end !== undefined ? selectionRange.end : imageCursorPos;

    const updated = currentVal.substring(0, start) + cleanUrl + currentVal.substring(end);
    onChange?.(updated);
    setImageModalOpen(false);
    setImageUrl('');
    setImageAlt('');

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = start + cleanUrl.length;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  // Confirm inserting Image as markdown
  const handleInsertImage = (e) => {
    e?.preventDefault();
    if (!imageUrl.trim()) return;

    const currentVal = value || '';
    const alt = imageAlt.trim() || 'Visual Illustration';
    const url = cleanImageUrl(imageUrl);

    // Smart newline formatting around image block
    const beforeText = currentVal.substring(0, imageCursorPos);
    const afterText = currentVal.substring(selectionRange.end !== undefined && selectionRange.end > imageCursorPos ? selectionRange.end : imageCursorPos);

    const prefix = beforeText.length > 0 && !beforeText.endsWith('\n\n')
      ? (beforeText.endsWith('\n') ? '\n' : '\n\n')
      : '';
    const suffix = afterText.length > 0 && !afterText.startsWith('\n\n')
      ? (afterText.startsWith('\n') ? '\n' : '\n\n')
      : '\n\n';

    const imageMarkdown = `${prefix}![${alt}](${url})${suffix}`;
    const updated = beforeText + imageMarkdown + afterText;

    onChange?.(updated);
    setImageModalOpen(false);
    setImageUrl('');
    setImageAlt('');

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = imageCursorPos + imageMarkdown.length;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  // Format entire selected lines with prefix (e.g. for bullet list '- ' or numbered '1. ')
  const applyLinePrefix = (prefixType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const selectedText = currentVal.substring(start, end);

    if (!selectedText) {
      if (prefixType === 'bullet') {
        const insertion = (currentVal && !currentVal.endsWith('\n') ? '\n' : '') + '- List item\n- Another point';
        onChange?.(currentVal + insertion);
      } else if (prefixType === 'numbered') {
        const insertion = (currentVal && !currentVal.endsWith('\n') ? '\n' : '') + '1. First item\n2. Second item';
        onChange?.(currentVal + insertion);
      } else if (prefixType === 'keyval') {
        const insertion = (currentVal && !currentVal.endsWith('\n') ? '\n' : '') + '**Capability:** Description of feature';
        onChange?.(currentVal + insertion);
      }
      return;
    }

    const lines = selectedText.split('\n');
    let transformed = '';

    if (prefixType === 'bullet') {
      transformed = lines.map((l) => (l.startsWith('- ') ? l : `- ${l}`)).join('\n');
    } else if (prefixType === 'numbered') {
      transformed = lines.map((l, i) => (l.match(/^\d+\.\s/) ? l : `${i + 1}. ${l}`)).join('\n');
    } else if (prefixType === 'keyval') {
      transformed = lines.map((l) => (l.includes(':') && !l.startsWith('**') ? `**${l.split(':')[0]}:**${l.substring(l.indexOf(':') + 1)}` : `**${l}:** `)).join('\n');
    }

    const updated = currentVal.substring(0, start) + transformed + currentVal.substring(end);
    onChange?.(updated);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, start + transformed.length);
      }
    }, 0);
  };

  // Clear markdown formatting from selection
  const clearFormatting = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || '';
    const selectedText = currentVal.substring(start, end);

    if (!selectedText) return;

    const cleaned = selectedText
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^>\s+/gm, '')
      .replace(/!\[([^\]]*?)\]\([^)]+?\)/g, '$1')
      .replace(/\[([^\]]+?)\]\([^)]+?\)/g, '$1')
      .replace(/\*\*([^*]+?)\*\*/g, '$1')
      .replace(/\*([^*]+?)\*/g, '$1')
      .replace(/_([^_]+?)_/g, '$1')
      .replace(/`([^`]+?)`/g, '$1')
      .replace(/^[-*•+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '');

    const updated = currentVal.substring(0, start) + cleaned + currentVal.substring(end);
    onChange?.(updated);
  };

  // Special template inserter for custom array fields
  const insertTemplate = () => {
    const currentVal = value || '';
    const newline = currentVal && !currentVal.endsWith('\n') ? '\n' : '';
    let template = '';

    if (field.isCustomArray === 'subServicesItems' || name === 'subServicesText') {
      template = 'Custom Feature Title | Detailed description of what this specialized sub-service provides.';
    } else if (field.isCustomArray === 'whyChooseItems' || name === 'whyChooseText') {
      template = 'High Performance & Quality | We deliver rock-solid, production-grade applications with 99.9% uptime.';
    } else if (field.isCustomArray === 'serviceProcessSteps' || name === 'serviceProcessText') {
      template = '01 | Strategic Discovery | We define requirements, architecture roadmap, and delivery milestones. | https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80 | Requirement Analysis; Tech Stack Finalization; Architecture Blueprints';
    } else if (field.isCustomArray === 'businessTypesItems' || name === 'businessTypesText') {
      template = 'Enterprise Corporations | Tailored high-scale enterprise platforms with robust compliance and SSO.';
    } else if (field.isCustomArray === 'faqs' || name === 'faqsText') {
      template = 'What is your standard development process? | We follow agile methodology with weekly sprint reviews and dedicated project managers.';
    } else if (field.isArray || name === 'features' || name === 'tech' || name === 'outcomes') {
      template = 'New High-Value Capability Item';
    } else {
      template = '## Sub-heading Section\n\nDetailed explanation with high performance metrics.';
    }

    onChange?.(currentVal + newline + template);
  };

  const isCustomArrayField = !!field.isCustomArray || !!field.isArray;

  return (
    <div className="w-full space-y-1.5 relative">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 bg-gray-100/90 border border-gray-200 rounded-t-xl text-xs text-ink/80">
        <div className="flex flex-wrap items-center gap-1">
          {/* Heading Buttons Group */}
          <div className="flex items-center bg-white/80 border border-gray-200/80 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => applyHeading(1)}
              title="Heading 1 (# Heading)"
              className="px-2 py-1 rounded hover:bg-[#00a4d8] hover:text-white font-extrabold text-[11px] transition-colors"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => applyHeading(2)}
              title="Heading 2 (## Heading)"
              className="px-2 py-1 rounded hover:bg-[#00a4d8] hover:text-white font-bold text-[11px] transition-colors"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => applyHeading(3)}
              title="Heading 3 (### Heading)"
              className="px-2 py-1 rounded hover:bg-[#00a4d8] hover:text-white font-bold text-[11px] transition-colors"
            >
              H3
            </button>
            <button
              type="button"
              onClick={() => applyHeading(4)}
              title="Heading 4 (#### Heading)"
              className="px-2 py-1 rounded hover:bg-[#00a4d8] hover:text-white font-semibold text-[11px] transition-colors hidden sm:inline-block"
            >
              H4
            </button>
          </div>

          <span className="w-px h-4 bg-gray-300 mx-0.5" />

          {/* Bold Button */}
          <button
            type="button"
            onClick={() => applyFormatting('**', '**', 'Bold Text')}
            title="Bold (**text**)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1 font-bold"
          >
            <Bold size={13} strokeWidth={2.5} />
            <span className="hidden sm:inline">Bold</span>
          </button>

          {/* Italic Button */}
          <button
            type="button"
            onClick={() => applyFormatting('*', '*', 'Italic Text')}
            title="Italic (*text*)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1 italic"
          >
            <Italic size={13} />
            <span className="hidden sm:inline">Italic</span>
          </button>

          <span className="w-px h-4 bg-gray-300 mx-0.5" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => applyLinePrefix('bullet')}
            title="Bullet List (- item)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1"
          >
            <List size={13} />
            <span className="hidden md:inline">Bullet</span>
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => applyLinePrefix('numbered')}
            title="Numbered List (1. item)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1"
          >
            <ListOrdered size={13} />
            <span className="hidden md:inline">1. 2. 3.</span>
          </button>

          {/* Quote Button */}
          <button
            type="button"
            onClick={applyBlockquote}
            title="Blockquote (> Quote)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1"
          >
            <Quote size={13} />
            <span className="hidden lg:inline">Quote</span>
          </button>

          {/* Key-Value Tag Button */}
          <button
            type="button"
            onClick={() => applyLinePrefix('keyval')}
            title="Key-Value highlight (**Key:** Value)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1"
          >
            <Tag size={13} />
            <span className="hidden lg:inline">**Key:**</span>
          </button>

          {/* Code Button */}
          <button
            type="button"
            onClick={() => applyFormatting('`', '`', 'code')}
            title="Inline Code (`code`)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors"
          >
            <Code size={13} />
          </button>

          <span className="w-px h-4 bg-gray-300 mx-0.5" />

          {/* Link Button */}
          <button
            type="button"
            onClick={openLinkModal}
            title="Add Link to Word/Text ([Text](url))"
            className="px-2 py-1 rounded-lg bg-sky-50 text-[#00a4d8] hover:bg-[#00a4d8] hover:text-white border border-sky-200/80 font-bold transition-all flex items-center gap-1 shadow-xs"
          >
            <Link2 size={13} />
            <span>Link</span>
          </button>

          {/* Image Button */}
          <button
            type="button"
            onClick={openImageModal}
            title="Insert Image anywhere between lines/paragraphs (![Alt](url))"
            className="px-2 py-1 rounded-lg bg-violet-50 text-brand-purple hover:bg-brand-purple hover:text-white border border-violet-200/80 font-bold transition-all flex items-center gap-1 shadow-xs"
          >
            <ImageIcon size={13} />
            <span>Image</span>
          </button>

          {/* Direct Media Library Button */}
          <button
            type="button"
            onClick={openDirectMediaPicker}
            title="Pick an image from Media Library and insert or replace the URL directly"
            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200/80 font-bold transition-all flex items-center gap-1 shadow-xs"
          >
            <FolderOpen size={13} />
            <span>Media Library</span>
          </button>

          <span className="w-px h-4 bg-gray-300 mx-0.5" />

          {/* Table Button */}
          <button
            type="button"
            onClick={insertTable}
            title="Insert Comparison Table"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1 font-semibold"
          >
            <TableIcon size={13} />
            <span className="hidden sm:inline">Table</span>
          </button>

          {/* Divider Line Button */}
          <button
            type="button"
            onClick={insertDivider}
            title="Horizontal Divider (---)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors"
          >
            <Minus size={13} />
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={clearFormatting}
            title="Clear Formatting from selection"
            className="p-1.5 rounded-lg hover:bg-white hover:text-red-500 hover:shadow-xs transition-colors"
          >
            <Eraser size={13} />
          </button>

          {/* Paragraph Break Button */}
          <button
            type="button"
            onClick={insertParagraphBreak}
            title="Insert Paragraph Break (\n\n)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1 font-semibold"
          >
            <Pilcrow size={13} />
            <span className="hidden lg:inline">Paragraph</span>
          </button>

          {/* Special Template Inserter */}
          {isCustomArrayField && (
            <button
              type="button"
              onClick={insertTemplate}
              title="Add sample template row"
              className="px-2 py-1 rounded-lg bg-sky-100/80 text-[#00a4d8] hover:bg-[#00a4d8] hover:text-white font-semibold transition-colors flex items-center gap-1 ml-1"
            >
              <PlusCircle size={12} />
              <span>+ Add Row</span>
            </button>
          )}
        </div>

        {/* Right side: Preview toggle & Help */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowHelp((h) => !h)}
            className="p-1.5 rounded-lg hover:bg-white hover:text-ink transition-colors"
            title="Formatting Guide & Shortcuts"
          >
            <HelpCircle size={13} />
          </button>

          <button
            type="button"
            onClick={() => setIsPreview((p) => !p)}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
              isPreview
                ? 'bg-[#00a4d8] text-white shadow-xs'
                : 'bg-white text-ink/80 hover:text-[#00a4d8] border border-gray-200'
            }`}
          >
            {isPreview ? (
              <>
                <Edit3 size={12} />
                <span>Edit</span>
              </>
            ) : (
              <>
                <Eye size={12} />
                <span>Live Preview</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Help Hint Banner */}
      {showHelp && (
        <div className="px-4 py-3.5 bg-sky-50/95 border border-sky-200 rounded-xl text-xs text-sky-950 space-y-2.5 shadow-sm">
          <p className="font-bold flex items-center gap-1.5 text-[#00a4d8]">
            <span>💡 Complete Formatting, Links & Images Guide:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-gray-800">
            <div>• <code className="text-[#00a4d8] font-bold">[Link Text](url)</code> &rarr; <strong>Clickable Link</strong></div>
            <div>• <code className="text-brand-purple font-bold">![Caption](img_url)</code> &rarr; <strong>Embedded Image</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold"># Main Heading</code> &rarr; <strong>H1 Title</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold">## Section Title</code> &rarr; <strong>H2 Heading</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold">### Sub-section</code> &rarr; <strong>H3 Heading</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold">| Col 1 | Col 2 |</code> &rarr; <strong>Comparison Table</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold">**Bold Text**</code> &rarr; <strong>Bold Text</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold">*Italic Text*</code> &rarr; <em>Italic Text</em></div>
            <div>• <code className="text-[#00a4d8] font-bold">&gt; Blockquote text</code> &rarr; Callout quote</div>
          </div>
          <div className="pt-2 border-t border-sky-200/80 text-[11px] text-gray-700 space-y-1">
            <p className="font-semibold text-[#00a4d8]">🔗 How to add links to words:</p>
            <p>
              Select any word or phrase in your text and click the <strong className="text-[#00a4d8]">Link</strong> button. Enter the URL (e.g. <code className="text-[#00a4d8]">/services/digital-marketing</code> or <code className="text-[#00a4d8]">https://google.com</code>) and click Insert.
            </p>
            <p className="font-semibold text-brand-purple pt-1">🖼️ How to add images between paragraphs:</p>
            <p>
              Place your cursor on a new line where you want the image and click the <strong className="text-brand-purple">Image</strong> button. You can select an image from your Media Library, upload a new image from your computer, or paste an image URL!
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area: Edit Textarea or Live Preview */}
      {isPreview ? (
        <div
          className="w-full px-4 py-3 rounded-b-xl border border-gray-200 bg-white min-h-[100px] text-sm text-ink/80 overflow-y-auto max-h-96"
          style={{ minHeight: `${rows * 26}px` }}
        >
          {value && value.trim() ? (
            <div className="prose prose-sm max-w-none">
              <FormatRichText text={value} />
            </div>
          ) : (
            <p className="text-gray-400 italic text-xs">Nothing to preview yet. Switch to Edit tab to type content.</p>
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          rows={rows}
          placeholder={placeholder || 'Type description or content here... Use **bold**, [links](url), or ![images](url) for styling.'}
          required={required}
          className="w-full px-4 py-2.5 rounded-b-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#00a4d8] focus:ring-2 focus:ring-[#00a4d8]/20 outline-none transition-all text-sm resize-y font-mono leading-relaxed"
        />
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
        <span>{hint || 'Supports markdown bold (**text**), [links](url), ![images](url), tables, and live preview.'}</span>
        <span>{value ? `${value.length} chars` : '0 chars'}</span>
      </div>

      {/* ========================================================================= */}
      {/* 🔗 LINK INSERTION MODAL */}
      {/* ========================================================================= */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-ink">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#00a4d8] flex items-center justify-center">
                  <Link2 size={16} />
                </div>
                <h3 className="font-bold text-sm">Insert Link</h3>
              </div>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInsertLink} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Text to Display (Word or Phrase)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. SEO Reporting Services"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#00a4d8] focus:ring-1 focus:ring-[#00a4d8] outline-none text-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Link Destination URL (Web link or internal path)
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g. /services/digital-marketing or https://example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#00a4d8] focus:ring-1 focus:ring-[#00a4d8] outline-none text-sm"
                  required
                />
              </div>

              {/* Quick Suggestions */}
              <div className="pt-1">
                <span className="text-[10px] text-gray-400 font-medium block mb-1">Quick internal links:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Home', url: '/' },
                    { label: 'Services', url: '/services' },
                    { label: 'Digital Marketing', url: '/services/digital-marketing' },
                    { label: 'Contact', url: '/contact' },
                    { label: 'Blog', url: '/blog' },
                  ].map((sug) => (
                    <button
                      key={sug.url}
                      type="button"
                      onClick={() => setLinkUrl(sug.url)}
                      className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-sky-100 hover:text-[#00a4d8] text-[10px] text-gray-600 transition-colors"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!linkUrl.trim()}
                  className="px-4 py-1.5 rounded-xl bg-[#00a4d8] hover:bg-[#0284c7] text-white font-bold transition disabled:opacity-40"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🖼️ IMAGE INSERTION MODAL */}
      {/* ========================================================================= */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-ink">
                <div className="w-7 h-7 rounded-lg bg-violet-100 text-brand-purple flex items-center justify-center">
                  <ImageIcon size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Insert Image into Content</h3>
                  <p className="text-[10px] text-gray-500">Insert image between paragraphs or anywhere in the text</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInsertImage} className="space-y-3.5 text-xs">
              {/* Media Library / Upload Trigger Button */}
              <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-left">
                  <p className="font-bold text-brand-purple text-xs">Choose from Media Library or Upload</p>
                  <p className="text-[11px] text-gray-500">Pick from existing website assets or upload a file directly</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-primary-gradient text-white text-xs font-bold shadow-soft hover:opacity-95 transition flex items-center gap-1.5 shrink-0"
                >
                  <FolderOpen size={14} />
                  <span>Select / Upload</span>
                </button>
              </div>

              {/* Direct Image URL input */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Image URL or Path
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="e.g. /uploads/seo-graph.jpg or https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-sm"
                  required
                />
              </div>

              {/* Alt Text / Caption */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Caption / Alt Description (Recommended for SEO)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. SEO reporting analytics dashboard and insights"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-sm"
                />
              </div>

              {/* Image Preview */}
              {imageUrl && (
                <div className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-3">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://placehold.co/100x100?text=Invalid+Image';
                    }}
                  />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-gray-800 truncate">{imageAlt || 'Selected image'}</p>
                    <p className="text-[10px] text-gray-400 truncate">{imageUrl}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                      ✓ Ready to insert
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setImageModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!imageUrl.trim()}
                  onClick={handleInsertRawUrl}
                  title="Insert only the URL string (best for Process Steps or pipe-separated lists)"
                  className="px-3.5 py-1.5 rounded-xl bg-sky-50 text-[#00a4d8] border border-sky-300 hover:bg-sky-100 font-bold transition text-xs disabled:opacity-40"
                >
                  Insert URL Only
                </button>
                <button
                  type="submit"
                  disabled={!imageUrl.trim()}
                  title="Insert as embedded markdown image ![Alt](url)"
                  className="px-4 py-1.5 rounded-xl bg-primary-gradient text-white font-bold transition shadow-soft text-xs disabled:opacity-40"
                >
                  Insert as Markdown Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal for selecting/uploading media inside Image Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        currentValue={imageUrl}
        onSelect={(url, item) => {
          setImageUrl(url);
          if (item?.title && !imageAlt) {
            setImageAlt(item.title);
          }
          setMediaPickerOpen(false);
        }}
      />

      {/* Direct Media Picker Modal for inserting URL directly into text/selection */}
      <MediaPickerModal
        isOpen={directMediaPickerOpen}
        onClose={() => setDirectMediaPickerOpen(false)}
        currentValue=""
        onSelect={(url) => {
          handleDirectMediaSelect(url);
        }}
      />
    </div>
  );
}
