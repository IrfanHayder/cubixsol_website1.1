import { useState, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  Search,
  Grid,
  List,
  Copy,
  Check,
  Trash2,
  Edit2,
  Eye,
  ExternalLink,
  Image as ImageIcon,
  Film,
  FileText,
  Loader2,
  Plus,
  X,
  Layers,
  HardDrive,
} from 'lucide-react';
import {
  fetchMediaList,
  uploadMultipleMediaFiles,
  deleteMediaItem,
  formatFileSize,
} from '../../utils/media';
import { API_BASE } from '../../utils/api';


export default function MediaManager({ showToast }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Modals
  const [previewItem, setPreviewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormValues, setEditFormValues] = useState({ title: '', alt: '', type: 'image' });
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMediaList();
      setMediaList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast?.('Failed to load media files', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      await uploadMultipleMediaFiles(files);
      showToast?.(`✅ ${files.length} file(s) uploaded successfully!`, 'success');
      loadMedia();
    } catch (err) {
      console.error(err);
      showToast?.(err.message || 'Error uploading files', 'error');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (item) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item._id || item.url);
    showToast?.('📋 URL copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditFormValues({
      title: item.title || '',
      alt: item.alt || '',
      type: item.type || 'image',
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`${API_BASE}/media/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormValues),
      });
      if (!res.ok) throw new Error('Failed to update media');
      showToast?.('Media details updated successfully!', 'success');
      setEditingItem(null);
      loadMedia();
    } catch (err) {
      console.error(err);
      showToast?.(err.message || 'Failed to update', 'error');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      await deleteMediaItem(deleteConfirm._id);
      showToast?.('Media deleted successfully.', 'success');
      if (previewItem?._id === deleteConfirm._id) setPreviewItem(null);
      setDeleteConfirm(null);
      loadMedia();
    } catch (err) {
      console.error(err);
      showToast?.(err.message || 'Error deleting media', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filtered Media
  const filteredMedia = mediaList.filter((item) => {
    const query = search.toLowerCase();
    const matchesSearch =
      (item.title || '').toLowerCase().includes(query) ||
      (item.url || '').toLowerCase().includes(query) ||
      (item.alt || '').toLowerCase().includes(query);
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Calculate stats
  const totalFiles = mediaList.length;
  const totalImages = mediaList.filter((m) => m.type === 'image' || (!m.type && !m.url?.endsWith('.mp4'))).length;
  const totalVideos = mediaList.filter((m) => m.type === 'video' || m.url?.endsWith('.mp4')).length;
  const totalBytes = mediaList.reduce((acc, m) => acc + (m.size || 0), 0);

  return (
    <div className="space-y-6">
      {/* Lightbox / Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="min-w-0 pr-4">
                <h3 className="font-bold text-ink truncate">{previewItem.title || 'Media Preview'}</h3>
                <p className="text-xs text-ink/50 truncate">{previewItem.url}</p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-2 rounded-xl text-ink/40 hover:text-ink hover:bg-gray-200/50 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 bg-black/95 flex items-center justify-center p-4 overflow-hidden">
              {previewItem.type === 'video' || previewItem.url?.endsWith('.mp4') ? (
                <video src={previewItem.url} controls className="max-h-[55vh] max-w-full rounded-lg" />
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.title || 'Preview'}
                  className="max-h-[55vh] max-w-full object-contain rounded-lg"
                />
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 text-xs text-ink/70">
                <p><span className="text-ink/40 font-medium">Type:</span> <span className="font-semibold uppercase">{previewItem.type || 'image'}</span></p>
                {previewItem.size && <p><span className="text-ink/40 font-medium">Size:</span> {formatFileSize(previewItem.size)}</p>}
                {previewItem.createdAt && (
                  <p><span className="text-ink/40 font-medium">Uploaded:</span> {new Date(previewItem.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => copyUrl(previewItem)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-violet-50 text-brand-purple hover:bg-violet-100 text-xs font-semibold transition"
                >
                  {copiedId === (previewItem._id || previewItem.url) ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  Copy URL
                </button>
                <a
                  href={previewItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-200 text-ink/60 hover:text-ink hover:bg-gray-50 transition"
                  title="Open in new tab"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  onClick={() => {
                    setDeleteConfirm(previewItem);
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-ink">Edit Media Details</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-ink/40 hover:text-ink hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink/80 mb-1">Title</label>
                <input
                  type="text"
                  value={editFormValues.title}
                  onChange={(e) => setEditFormValues((v) => ({ ...v, title: e.target.value }))}
                  required
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/80 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editFormValues.alt}
                  onChange={(e) => setEditFormValues((v) => ({ ...v, alt: e.target.value }))}
                  placeholder="Descriptive text for accessibility"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/80 mb-1">Type</label>
                <select
                  value={editFormValues.type}
                  onChange={(e) => setEditFormValues((v) => ({ ...v, type: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="file">Document / File</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-ink/70 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-primary-gradient text-white text-xs font-semibold shadow-soft hover:opacity-95 disabled:opacity-50"
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-gray-100">
            <h3 className="font-bold text-ink text-base mb-2">Delete Media</h3>
            <p className="text-xs text-ink/60 mb-5">
              Are you sure you want to delete <span className="font-semibold text-ink">"{deleteConfirm.title}"</span>? This will permanently remove the file from the database and server storage.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-ink/70 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-soft disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header & Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-brand-purple flex items-center justify-center shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <p className="text-lg font-black text-ink">{totalFiles}</p>
            <p className="text-[11px] font-medium text-ink/50">Total Assets</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-brand-cyan flex items-center justify-center shrink-0">
            <ImageIcon size={20} />
          </div>
          <div>
            <p className="text-lg font-black text-ink">{totalImages}</p>
            <p className="text-[11px] font-medium text-ink/50">Images</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Film size={20} />
          </div>
          <div>
            <p className="text-lg font-black text-ink">{totalVideos}</p>
            <p className="text-[11px] font-medium text-ink/50">Videos</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <HardDrive size={20} />
          </div>
          <div>
            <p className="text-lg font-black text-ink">{formatFileSize(totalBytes)}</p>
            <p className="text-[11px] font-medium text-ink/50">Storage Used</p>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Dropzone Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`bg-white rounded-3xl border-2 border-dashed p-6 sm:p-8 transition-all shadow-card text-center flex flex-col items-center justify-center ${
          dragOver
            ? 'border-brand-purple bg-violet-50/40 ring-4 ring-brand-purple/10'
            : 'border-gray-200/90 hover:border-brand-purple/60'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 size={36} className="animate-spin text-brand-purple" />
            <p className="text-sm font-bold text-ink">Uploading files to server...</p>
            <p className="text-xs text-ink/50">Saving files to Media Library and database</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-3">
              <UploadCloud size={28} />
            </div>
            <h3 className="text-base font-bold text-ink mb-1">Drag & Drop images or files here</h3>
            <p className="text-xs text-ink/50 mb-4 max-w-md">
              Upload multiple images (PNG, JPG, WEBP, SVG), videos (MP4), or files. Once uploaded, they are ready to use anywhere across the website.
            </p>

            <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-gradient text-white text-xs font-semibold shadow-soft hover:opacity-95 transition">
              <Plus size={16} />
              Browse & Upload Files
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search Box */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 focus-within:bg-white focus-within:border-brand-purple transition w-full sm:w-64">
            <Search size={15} className="text-ink/40 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media..."
              className="bg-transparent text-xs outline-none w-full text-ink placeholder:text-ink/40"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-xs text-ink/40 hover:text-ink">
                ✕
              </button>
            )}
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {['all', 'image', 'video', 'file'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  typeFilter === type
                    ? 'bg-white text-ink shadow-xs'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                {type === 'all' ? 'All' : type}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Switch */}
        <div className="flex items-center gap-1 self-end sm:self-auto bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-white text-brand-purple shadow-xs' : 'text-ink/50 hover:text-ink'
            }`}
            title="Grid View"
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'table' ? 'bg-white text-brand-purple shadow-xs' : 'text-ink/50 hover:text-ink'
            }`}
            title="Table View"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area: Grid or Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink/40">
          <Loader2 size={28} className="animate-spin text-brand-purple" />
          <span className="text-xs">Loading media assets...</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card py-16 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-ink/30 mx-auto mb-3">
            <ImageIcon size={30} />
          </div>
          <h4 className="text-sm font-bold text-ink">No media assets found</h4>
          <p className="text-xs text-ink/40 mt-1 max-w-sm mx-auto">
            {search
              ? 'No media matches your search query. Try clearing the filter.'
              : 'Your media library is empty. Upload your first images or videos using the dropzone above.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => {
            const isVideo = item.type === 'video' || item.url?.endsWith('.mp4');
            const isDoc = item.type === 'file';
            const isCopied = copiedId === (item._id || item.url);

            return (
              <div
                key={item._id || item.url}
                className="group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-elev overflow-hidden transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div
                  onClick={() => setPreviewItem(item)}
                  className="relative aspect-square bg-gray-100 cursor-pointer overflow-hidden flex items-center justify-center"
                >
                  {isVideo ? (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                      <Film size={32} className="text-brand-cyan" />
                    </div>
                  ) : isDoc ? (
                    <div className="w-full h-full bg-violet-50 flex items-center justify-center text-brand-purple">
                      <FileText size={32} />
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title || 'Media'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}

                  {/* Badge */}
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                    {item.type || 'image'}
                  </span>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewItem(item);
                      }}
                      className="p-2 rounded-xl bg-white/90 text-ink hover:bg-white transition"
                      title="Preview"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(item);
                      }}
                      className="p-2 rounded-xl bg-white/90 text-ink hover:bg-white transition"
                      title="Copy URL"
                    >
                      {isCopied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                    </button>
                  </div>
                </div>

                {/* Info & Footer */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-ink truncate" title={item.title}>
                      {item.title || 'Untitled Asset'}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-ink/40 mt-1">
                      <span>{item.size ? formatFileSize(item.size) : 'File'}</span>
                      <span className="truncate max-w-[80px] font-mono">{item.url.split('/').pop()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => copyUrl(item)}
                      className={`text-[11px] font-semibold flex items-center gap-1 transition ${
                        isCopied ? 'text-emerald-600' : 'text-brand-purple hover:text-brand-purple/80'
                      }`}
                    >
                      {isCopied ? <Check size={12} /> : <Copy size={12} />}
                      {isCopied ? 'Copied' : 'Copy URL'}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1 rounded-lg text-ink/40 hover:text-brand-purple hover:bg-violet-50 transition"
                        title="Edit Details"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(item)}
                        className="p-1 rounded-lg text-ink/40 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-left text-xs uppercase tracking-wider text-ink/70 font-semibold">
                  <th className="px-5 py-3.5">Asset Preview</th>
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">File URL</th>
                  <th className="px-5 py-3.5">Size</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredMedia.map((item) => {
                  const isCopied = copiedId === (item._id || item.url);
                  const isVideo = item.type === 'video' || item.url?.endsWith('.mp4');

                  return (
                    <tr key={item._id || item.url} className="hover:bg-gray-50/50 transition">
                      {/* Thumbnail */}
                      <td className="px-5 py-3">
                        <div
                          onClick={() => setPreviewItem(item)}
                          className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer shrink-0 flex items-center justify-center"
                        >
                          {isVideo ? (
                            <Film size={20} className="text-brand-cyan" />
                          ) : (
                            <img src={item.url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                      </td>

                      {/* Title & Alt */}
                      <td className="px-5 py-3 font-medium text-ink">
                        <p className="font-semibold text-xs">{item.title || 'Untitled'}</p>
                        {item.alt && <p className="text-[11px] text-ink/40 mt-0.5">Alt: {item.alt}</p>}
                      </td>

                      {/* Type Badge */}
                      <td className="px-5 py-3">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-violet-50 text-brand-purple">
                          {item.type || 'image'}
                        </span>
                      </td>

                      {/* URL & Copy Link */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5 max-w-xs">
                          <span className="font-mono text-xs text-ink/70 truncate">{item.url}</span>
                          <button
                            type="button"
                            onClick={() => copyUrl(item)}
                            className="p-1 rounded bg-gray-100 text-ink/60 hover:text-brand-purple hover:bg-violet-100 transition shrink-0"
                            title="Copy URL"
                          >
                            {isCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          </button>
                        </div>
                      </td>

                      {/* Size */}
                      <td className="px-5 py-3 text-xs text-ink/60 font-medium">
                        {item.size ? formatFileSize(item.size) : '—'}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="p-1.5 rounded-lg text-ink/40 hover:text-brand-cyan hover:bg-cyan-50 transition"
                            title="Preview"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg text-ink/40 hover:text-brand-purple hover:bg-violet-50 transition"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirm(item)}
                            className="p-1.5 rounded-lg text-ink/40 hover:text-rose-500 hover:bg-rose-50 transition"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
