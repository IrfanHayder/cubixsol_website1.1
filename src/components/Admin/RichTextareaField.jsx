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
} from 'lucide-react';
import { FormatRichText } from '../../utils/formatText';

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

    // Refocus and restore cursor
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
      template = '**Key Advantage:** Detailed explanation with high performance metrics.';
    }

    onChange?.(currentVal + newline + template);
  };

  const isCustomArrayField = !!field.isCustomArray || !!field.isArray;

  return (
    <div className="w-full space-y-1.5">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 bg-gray-100/80 border border-gray-200 rounded-t-xl text-xs text-ink/70">
        <div className="flex flex-wrap items-center gap-1">
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
            <span className="hidden sm:inline">Bullet List</span>
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => applyLinePrefix('numbered')}
            title="Numbered List (1. item)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1"
          >
            <ListOrdered size={13} />
            <span className="hidden sm:inline">Numbered</span>
          </button>

          {/* Key-Value Tag Button */}
          <button
            type="button"
            onClick={() => applyLinePrefix('keyval')}
            title="Key-Value highlight (**Key:** Value)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors flex items-center gap-1"
          >
            <Tag size={13} />
            <span className="hidden md:inline">**Key:** Value</span>
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

          {/* Link Button */}
          <button
            type="button"
            onClick={() => applyFormatting('[', '](https://example.com)', 'Link Text')}
            title="Insert Link [Text](url)"
            className="p-1.5 rounded-lg hover:bg-white hover:text-[#00a4d8] hover:shadow-xs transition-colors"
          >
            <Link2 size={13} />
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
              <span>+ Add Row Template</span>
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
        <div className="px-4 py-3 bg-sky-50/90 border border-sky-100 rounded-xl text-xs text-sky-900 space-y-2">
          <p className="font-bold flex items-center gap-1 text-[#00a4d8]">
            <span>💡 Rich Formatting Guide & Multi-Paragraph Support:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-gray-700">
            <div>• <code className="text-[#00a4d8] font-bold">**Flutter:**</code> &rarr; <strong>Flutter:</strong></div>
            <div>• <code className="text-[#00a4d8] font-bold">- Bullet item</code> &rarr; Clean bullet point</div>
            <div>• <code className="text-[#00a4d8] font-bold">*Italic*</code> &rarr; <em>Italic</em></div>
            <div>• <code className="text-[#00a4d8] font-bold">1. Step one</code> &rarr; Numbered list</div>
          </div>
          <div className="pt-1 border-t border-sky-200/60 text-[11px] text-gray-700">
            <p className="font-semibold text-[#00a4d8] mb-0.5">📄 Multiple Paragraphs inside Sub-Services / Items:</p>
            <p className="text-gray-600">
              Press Enter twice (<code className="text-[#00a4d8]">Enter + Enter</code>) or click <strong>Paragraph</strong> to separate paragraphs under the same item. A new item only starts when you write a new line with <code className="text-[#00a4d8]">Title | ...</code>.
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area: Edit Textarea or Live Preview */}
      {isPreview ? (
        <div
          className="w-full px-4 py-3 rounded-b-xl border border-gray-200 bg-white min-h-[100px] text-sm text-ink/80 overflow-y-auto max-h-72"
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
          placeholder={placeholder || 'Type description or content here... Use **bold** or - bullets for styling.'}
          required={required}
          className="w-full px-4 py-2.5 rounded-b-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none transition-all text-sm resize-y font-mono leading-relaxed"
        />
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
        <span>{hint || 'Supports markdown bold (**text**), lists (- item), and live preview.'}</span>
        <span>{value ? `${value.length} chars` : '0 chars'}</span>
      </div>
    </div>
  );
}
