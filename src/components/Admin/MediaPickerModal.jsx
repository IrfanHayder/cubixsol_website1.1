import { useState, useEffect, useCallback } from 'react';
import {
  X,
  Search,
  UploadCloud,
  Check,
  Image as ImageIcon,
  Film,
  FileText,
  Loader2,
  Copy,
} from 'lucide-react';

import { fetchMediaList, uploadMediaFile, formatFileSize } from '../../utils/media';

export default function MediaPickerModal({ isOpen, onClose, onSelect, currentValue = '' }) {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'upload'
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'image' | 'video' | 'file'
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchMediaList();
      setMediaList(Array.isArray(list) ? list : []);
      if (currentValue && Array.isArray(list)) {
        const found = list.find((item) => item.url === currentValue);
        if (found) setSelectedItem(found);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load media items');
    } finally {
      setLoading(false);
    }
  }, [currentValue]);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setActiveTab('library');
      setSearch('');
      setError(null);
    }
  }, [isOpen, loadMedia]);

  if (!isOpen) return null;

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const file = files[0];
      const result = await uploadMediaFile(file);
      await loadMedia();
      if (result && result.url) {
        const mediaObj = result.media || {
          url: result.url,
          title: result.originalName || file.name,
          type: file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : 'file',
          size: file.size,
        };
        setSelectedItem(mediaObj);
        setActiveTab('library');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const filteredList = mediaList.filter((item) => {
    const matchesSearch =
      (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.url || '').toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleConfirmSelect = () => {
    if (selectedItem) {
      onSelect(selectedItem.url, selectedItem);
      onClose();
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
          <div>
            <h3 className="text-lg font-bold text-ink">Media Library</h3>
            <p className="text-xs text-ink/50">Select an existing image or upload a new one</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink/40 hover:text-ink hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 border-b border-gray-100 flex items-center gap-6">
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'library'
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-ink/50 hover:text-ink'
            }`}
          >
            Choose from Library ({mediaList.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-ink/50 hover:text-ink'
            }`}
          >
            <UploadCloud size={16} />
            Upload New
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {activeTab === 'library' ? (
            <>
              {/* Media Browser Grid */}
              <div className="flex-1 flex flex-col p-5 overflow-hidden border-r border-gray-100">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200/80 focus-within:border-brand-purple focus-within:bg-white transition-all">
                    <Search size={16} className="text-ink/40 shrink-0" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search media by title or path..."
                      className="bg-transparent text-sm outline-none w-full text-ink placeholder:text-ink/40"
                    />
                    {search && (
                      <button onClick={() => setSearch('')} className="text-xs text-ink/40 hover:text-ink">
                        ✕
                      </button>
                    )}
                  </div>
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

                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-1">
                  {loading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-2 text-ink/40">
                      <Loader2 size={24} className="animate-spin text-brand-purple" />
                      <span className="text-xs">Loading media library...</span>
                    </div>
                  ) : filteredList.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-ink/30 mb-3">
                        <ImageIcon size={26} />
                      </div>
                      <p className="text-sm font-semibold text-ink/70">No media found</p>
                      <p className="text-xs text-ink/40 mt-1 max-w-xs">
                        {search
                          ? 'Try adjusting your search query or filter.'
                          : 'No files uploaded yet. Switch to the "Upload New" tab to add your first file.'}
                      </p>
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="mt-4 px-4 py-2 rounded-xl bg-primary-gradient text-white text-xs font-semibold shadow-soft"
                      >
                        Upload a file
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {filteredList.map((item) => {
                        const isSelected = selectedItem?.url === item.url;
                        const isImage = item.type === 'image' || (!item.type && !item.url?.endsWith('.mp4'));
                        return (
                          <div
                            key={item._id || item.url}
                            onClick={() => setSelectedItem(item)}
                            onDoubleClick={() => {
                              setSelectedItem(item);
                              onSelect(item.url, item);
                              onClose();
                            }}
                            className={`group relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all bg-gray-100 ${
                              isSelected
                                ? 'border-brand-purple ring-4 ring-brand-purple/20 shadow-md'
                                : 'border-gray-200/80 hover:border-brand-purple/50'
                            }`}
                          >
                            {isImage ? (
                              <img
                                src={item.url}
                                alt={item.title || item.alt || 'Media'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : item.type === 'video' ? (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-2 text-center">
                                <Film size={24} className="text-brand-cyan mb-1" />
                                <span className="text-[10px] line-clamp-1 font-medium">{item.title}</span>
                              </div>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-ink/70 p-2 text-center">
                                <FileText size={24} className="text-brand-purple mb-1" />
                                <span className="text-[10px] line-clamp-1 font-medium">{item.title}</span>
                              </div>
                            )}

                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-md">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                              <p className="text-[11px] font-semibold truncate leading-tight">{item.title || 'Untitled'}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Detail / Selection Preview Sidebar */}
              <div className="w-full md:w-72 bg-gray-50/50 p-5 flex flex-col justify-between border-t md:border-t-0">
                {selectedItem ? (
                  <div className="space-y-4 overflow-y-auto">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Selected Media</h4>
                    <div className="aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-xs">
                      {selectedItem.type === 'video' ? (
                        <video src={selectedItem.url} controls className="w-full h-full object-contain" />
                      ) : (
                        <img
                          src={selectedItem.url}
                          alt={selectedItem.title}
                          className="w-full h-full object-contain bg-checkered"
                        />
                      )}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-ink/40 font-medium">Title:</span>
                        <p className="font-semibold text-ink break-words">{selectedItem.title || '—'}</p>
                      </div>
                      {selectedItem.size && (
                        <div>
                          <span className="text-ink/40 font-medium">File Size:</span>
                          <p className="font-medium text-ink/80">{formatFileSize(selectedItem.size)}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-ink/40 font-medium">URL Path:</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            type="text"
                            readOnly
                            value={selectedItem.url}
                            className="bg-white border border-gray-200 px-2 py-1 rounded text-[11px] text-ink/70 w-full truncate select-all"
                          />
                          <button
                            type="button"
                            onClick={() => copyUrl(selectedItem.url)}
                            className="p-1.5 rounded bg-white border border-gray-200 text-ink/60 hover:text-brand-purple hover:border-brand-purple shrink-0 transition"
                            title="Copy URL"
                          >
                            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-ink/40 text-xs">
                    <ImageIcon size={32} className="opacity-40 mb-2" />
                    Click an item from the library to preview and select it.
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200/80 flex flex-col gap-2 mt-auto">
                  <button
                    type="button"
                    disabled={!selectedItem}
                    onClick={handleConfirmSelect}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <Check size={16} />
                    Use Selected Media
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 px-4 rounded-xl border border-gray-200 text-ink/70 text-xs font-semibold hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Upload New Tab */
            <div className="flex-1 p-8 flex flex-col items-center justify-center">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                className={`w-full max-w-xl border-2 border-dashed rounded-3xl p-10 text-center transition-all bg-gray-50/50 hover:bg-violet-50/30 hover:border-brand-purple flex flex-col items-center justify-center ${
                  uploading ? 'border-brand-purple bg-violet-50/20' : 'border-gray-200'
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 size={36} className="animate-spin text-brand-purple" />
                    <p className="text-sm font-bold text-ink">Uploading file...</p>
                    <p className="text-xs text-ink/50">Saving to server and updating Media Library...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-4">
                      <UploadCloud size={32} />
                    </div>
                    <h4 className="text-base font-bold text-ink mb-1">Drag and drop your file here</h4>
                    <p className="text-xs text-ink/50 mb-5 max-w-sm">
                      Supports images (PNG, JPG, WEBP, SVG, GIF) and videos (MP4). Files will automatically appear in your Media Library.
                    </p>

                    <label className="cursor-pointer px-6 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition">
                      Browse Files
                      <input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </label>
                  </>
                )}

                {error && <p className="text-xs text-red-500 font-medium mt-4">{error}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
