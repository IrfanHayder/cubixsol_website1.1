import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ImagePickerField from './ImagePickerField';
import RichTextareaField from './RichTextareaField';

// Get nested value by dot path: "seo.metaTitle" => values.seo?.metaTitle
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
}

export default function AdminForm({ title, fields, values, onChange, onSubmit, onCancel, submitLabel = 'Save', disabled = false }) {
  const [seoOpen, setSeoOpen] = useState(false);

  const mainFields = fields.filter(f => !f.name?.startsWith('seo.'));
  const seoFields  = fields.filter(f => f.name?.startsWith('seo.'));
  const hasSeo     = seoFields.length > 0;

  const renderField = (field) => {
    const value = field.name?.includes('.')
      ? getNestedValue(values, field.name)
      : (values[field.name] ?? '');

    const handleChange = (val) => {
      if (field.name?.includes('.')) {
        const [parent, child] = field.name.split('.');
        onChange(parent, { ...(values[parent] || {}), [child]: val });
      } else {
        onChange(field.name, val);
      }
    };

    const isImageField =
      field.type === 'image' ||
      ['heroImage', 'image', 'coverImage', 'avatar', 'whyChooseImage', 'ogImage', 'seo.ogImage'].includes(field.name);

    if (isImageField) {
      return (
        <ImagePickerField
          name={field.name}
          value={value}
          onChange={handleChange}
          label={field.label}
          placeholder={field.placeholder}
          hint={field.hint}
          required={field.required}
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <RichTextareaField
          name={field.name}
          value={value}
          onChange={handleChange}
          label={field.label}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          required={field.required}
          hint={field.hint}
          field={field}
        />
      );
    }
    if (field.type === 'select') {
      return (
        <select
          name={field.name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={field.required}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none transition-all text-sm"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    }
    if (field.type === 'checkbox') {
      return (
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => handleChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple"
          />
          <span className="text-sm text-ink/70">{field.checkboxLabel || field.label}</span>
        </label>
      );
    }
    return (
      <input
        type={field.type || 'text'}
        name={field.name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none transition-all text-sm"
      />
    );
  };


  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        {onCancel && (
          <button onClick={onCancel} className="p-2 rounded-lg text-ink/40 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(values); }} className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mainFields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-ink/80 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
              {renderField(field)}
              {field.hint && <p className="text-xs text-gray-400 mt-1">{field.hint}</p>}
            </div>
          ))}
        </div>

        {hasSeo && (
          <div className="border border-violet-100 rounded-2xl overflow-hidden mt-2">
            <button
              type="button"
              onClick={() => setSeoOpen(o => !o)}
              className="w-full flex items-center justify-between px-5 py-4 bg-violet-50 hover:bg-violet-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">??</span>
                <div className="text-left">
                  <p className="text-sm font-bold text-brand-purple">SEO Settings</p>
                  <p className="text-xs text-violet-400">Meta title, description, Open Graph tags...</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-brand-purple">
                {seoOpen ? 'Hide' : 'Show'}
                {seoOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </button>

            {seoOpen && (
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white border-t border-violet-50">
                {seoFields.map((field) => (
                  <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-ink/80 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                    {renderField(field)}
                    {field.hint && <p className="text-xs text-gray-400 mt-1">{field.hint}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={disabled}
            className="px-6 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitLabel}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-ink/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
