import { useState } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  FolderOpen,
  Link as LinkIcon,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';

import MediaPickerModal from './MediaPickerModal';
import { uploadMediaFile } from '../../utils/media';

export default function ImagePickerField({
  value = '',
  onChange,
  label = 'Image',
  name,
  placeholder = '/uploads/... or https://...',
  hint,
  required = false,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleDirectUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const result = await uploadMediaFile(file);
      if (result && result.url) {
        onChange(result.url);
      }
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyUrl = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVideo = value?.endsWith('.mp4') || value?.endsWith('.webm');

  return (
    <div className="space-y-2">
      <MediaPickerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentValue={value}
        onSelect={(url) => onChange(url)}
      />

      {/* Field Header / Actions */}
      {value ? (
        /* Image Preview Box */
        <div className="border border-gray-200 bg-gray-50/60 rounded-2xl p-3.5 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 bg-white shrink-0 shadow-xs flex items-center justify-center">
              {isVideo ? (
                <video src={value} className="w-full h-full object-cover" muted autoPlay loop />
              ) : (
                <img
                  src={value}
                  alt={label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/200x200?text=No+Image';
                  }}
                />
              )}
            </div>

            {/* Info & URL */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-violet-100 text-brand-purple">
                  {isVideo ? 'Video' : 'Image'}
                </span>
                <p className="text-xs font-semibold text-ink truncate max-w-xs">{value.split('/').pop()}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  name={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  className="w-full px-2.5 py-1 text-xs text-ink/70 bg-white rounded-lg border border-gray-200 outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition"
                />
                <button
                  type="button"
                  onClick={copyUrl}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 text-ink/50 hover:text-brand-purple hover:border-brand-purple transition shrink-0"
                  title="Copy URL"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-purple/80 bg-violet-50 hover:bg-violet-100 px-2.5 py-1 rounded-lg transition"
                >
                  <FolderOpen size={13} />
                  Change from Library
                </button>

                <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-ink/70 hover:text-ink bg-white border border-gray-200 hover:bg-gray-50 px-2.5 py-1 rounded-lg transition">
                  {uploading ? <Loader2 size={13} className="animate-spin text-brand-purple" /> : <UploadCloud size={13} />}
                  <span>{uploading ? 'Uploading...' : 'Replace File'}</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={handleDirectUpload}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg transition ml-auto"
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State / Picker Card */
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 sm:p-5 bg-gray-50/40 hover:bg-gray-50/80 transition-all text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center">
              <ImageIcon size={22} />
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-ink">No image selected</p>
              <p className="text-[11px] text-ink/40">Choose an image from your library or upload a new one from your computer</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-gradient text-white text-xs font-semibold shadow-soft hover:opacity-95 transition"
              >
                <FolderOpen size={14} />
                Choose from Media Library
              </button>

              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-ink hover:bg-gray-50 shadow-xs transition">
                {uploading ? <Loader2 size={14} className="animate-spin text-brand-purple" /> : <UploadCloud size={14} />}
                <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleDirectUpload}
                />
              </label>

              <button
                type="button"
                onClick={() => setShowUrlInput((s) => !s)}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-medium text-ink/60 hover:text-ink hover:bg-gray-200/50 transition"
              >
                <LinkIcon size={13} />
                {showUrlInput ? 'Hide URL' : 'Paste URL'}
              </button>
            </div>

            {showUrlInput && (
              <div className="w-full max-w-md pt-2">
                <input
                  type="text"
                  name={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  className="w-full px-3 py-2 text-xs text-ink bg-white rounded-xl border border-gray-200 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {uploadError && <p className="text-xs text-rose-500 font-medium">{uploadError}</p>}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
