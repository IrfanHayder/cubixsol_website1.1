import { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  Bell,
  Search,
  Plus,
  Calendar,
  TrendingUp,
  MessageSquare,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminStats from '../../components/Admin/AdminStats';
import AdminTable from '../../components/Admin/AdminTable';
import AdminForm from '../../components/Admin/AdminForm';
import { useServices } from '../../context/ServicesContext';

const API_BASE = '/api';

/* -------------------- Toast Notification -------------------- */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-medium animate-in slide-in-from-right duration-300 ${
        type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
      }`}
    >
      {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

/* -------------------- Confirm Dialog -------------------- */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold text-ink mb-2">Confirm Delete</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-ink/70 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Status Badge -------------------- */
function StatusBadge({ status }) {
  const styles = {
    Published: 'bg-emerald-50 text-emerald-700',
    Active: 'bg-emerald-50 text-emerald-700',
    Open: 'bg-emerald-50 text-emerald-700',
    Draft: 'bg-amber-50 text-amber-700',
    Unread: 'bg-rose-50 text-rose-700',
    Read: 'bg-gray-100 text-gray-600',
    Completed: 'bg-blue-50 text-blue-700',
    'In Progress': 'bg-violet-50 text-violet-700',
    Closed: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

/* ================== SECTION CONFIGS ================== */
const SECTION_CONFIGS = {
  blogs: {
    label: 'Blog Posts',
    endpoint: 'blogs',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'tag', label: 'Tag' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Post Title', required: true, fullWidth: true },
      { name: 'slug', label: 'Slug (e.g. my-blog-post)', required: true },
      { name: 'category', label: 'Category', type: 'select', optionsFrom: 'categories' },
      { name: 'tag', label: 'Tag', type: 'select', optionsFrom: 'tags' },
      { name: 'author', label: 'Author', type: 'select', optionsFrom: 'authors' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
      ]},
      { name: 'date', label: 'Publish Date (e.g. Jul 12, 2026)' },
      { name: 'coverImage', label: 'Cover Image URL', fullWidth: true },
      { name: 'color', label: 'Gradient (e.g. from-primary-700 to-indigo-900)' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'content', label: 'Full Content', type: 'textarea', fullWidth: true, rows: 8 },
      // ── SEO Fields (prefixed seo. → nested object in DB) ──
      { name: 'seo.metaTitle', label: 'Meta Title', fullWidth: true, hint: 'Ideal: 50-60 characters. Default: post title.' },
      { name: 'seo.metaDescription', label: 'Meta Description', type: 'textarea', rows: 2, fullWidth: true, hint: 'Ideal: 150-160 characters. Shown in Google results.' },
      { name: 'seo.keywords', label: 'Keywords (comma separated)', fullWidth: true, hint: 'e.g. web design, React, Pakistan' },
      { name: 'seo.ogTitle', label: 'OG Title (Social Share Title)', fullWidth: true, hint: 'Shown on Facebook, WhatsApp, LinkedIn previews.' },
      { name: 'seo.ogDescription', label: 'OG Description (Social Share Desc)', type: 'textarea', rows: 2, fullWidth: true },
      { name: 'seo.ogImage', label: 'OG Image URL (Social Share Image)', fullWidth: true, hint: 'Recommended: 1200x630px image URL.' },
      { name: 'seo.canonicalUrl', label: 'Canonical URL', fullWidth: true, hint: 'Optional. Leave blank to auto-use page URL.' },
    ],
  },
  categories: {
    label: 'Categories',
    endpoint: 'categories',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'name', label: 'Category Name', required: true },
      { name: 'slug', label: 'Slug (e.g. technology)', required: true },
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, rows: 3 },
    ],
  },
  tags: {
    label: 'Tags',
    endpoint: 'tags',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
    ],
    fields: [
      { name: 'name', label: 'Tag Name', required: true },
      { name: 'slug', label: 'Slug (e.g. react)', required: true },
    ],
  },
  authors: {
    label: 'Authors',
    endpoint: 'authors',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    fields: [
      { name: 'name', label: 'Author Name', required: true },
      { name: 'email', label: 'Email' },
      { name: 'role', label: 'Role (e.g. Editor, Writer)' },
      { name: 'avatar', label: 'Avatar URL', fullWidth: true },
      { name: 'bio', label: 'Bio', type: 'textarea', fullWidth: true, rows: 3 },
    ],
  },
  services: {
    label: 'Services',
    endpoint: 'services',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'desc', label: 'Description' },
      { key: 'icon', label: 'Icon' },
    ],
    fields: [
      { name: 'title', label: 'Service Title', required: true, fullWidth: true },
      { name: 'slug', label: 'Slug (e.g. web-development)', required: true },
      { name: 'icon', label: 'Lucide Icon Name (e.g. Globe, Code2)', required: true },
      { name: 'color', label: 'Color Class (e.g. bg-blue-50 text-blue-600)' },
      { name: 'gradient', label: 'Gradient Classes (e.g. from-blue-500 to-cyan-600)' },
      { name: 'heroImage', label: 'Hero Image URL', fullWidth: true },
      { name: 'desc', label: 'Short Description', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'longDesc', label: 'Long Description', type: 'textarea', fullWidth: true, rows: 5 },
      { name: 'features', label: 'Features (one per line)', type: 'textarea', fullWidth: true, rows: 4, isArray: true },
      { name: 'tech', label: 'Tech Stack (one per line)', type: 'textarea', fullWidth: true, rows: 3, isArray: true },
      { name: 'outcomes', label: 'Outcomes (one per line)', type: 'textarea', fullWidth: true, rows: 3, isArray: true },
    ],
  },
  products: {
    label: 'Products',
    endpoint: 'products',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'category', label: 'Category' },
    ],
    fields: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'slug', label: 'Slug (e.g. my-product)', required: true },
      { name: 'title', label: 'Hero Title', fullWidth: true },
      { name: 'tagline', label: 'Tagline', fullWidth: true },
      { name: 'category', label: 'Category' },
      { name: 'accent', label: 'Accent (Tailwind gradient e.g. from-blue-500 to-cyan-400)' },
      { name: 'image', label: 'Image URL', fullWidth: true },
      { name: 'externalUrl', label: 'External URL' },
      { name: 'desc', label: 'Description', type: 'textarea', fullWidth: true, rows: 4 },
    ],
  },
  industries: {
    label: 'Industries',
    endpoint: 'industries',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'icon', label: 'Icon' },
      { key: 'short', label: 'Short Description' },
    ],
    fields: [
      { name: 'title', label: 'Industry Name', required: true },
      { name: 'slug', label: 'Slug (e.g. healthcare)', required: true },
      { name: 'icon', label: 'Lucide Icon Name (e.g. HeartPulse, GraduationCap)' },
      { name: 'short', label: 'Short Description', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'desc', label: 'Full Description', type: 'textarea', fullWidth: true, rows: 5 },
      { name: 'points', label: 'Key Points (one per line)', type: 'textarea', fullWidth: true, rows: 4, isArray: true },
      { name: 'servicesWeOffer', label: 'Services We Offer (one per line)', type: 'textarea', fullWidth: true, rows: 3, isArray: true },
    ],
  },
  solutions: {
    label: 'Solutions',
    endpoint: 'solutions',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'category', label: 'Category' },
    ],
    fields: [
      { name: 'title', label: 'Solution Title', required: true, fullWidth: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'category', label: 'Category', required: true },
      { name: 'desc', label: 'Description', type: 'textarea', fullWidth: true, rows: 5 },
    ],
  },
  projects: {
    label: 'Projects',
    endpoint: 'projects',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'client', label: 'Client' },
      { key: 'industry', label: 'Industry' },
      { key: 'year', label: 'Year' },
    ],
    fields: [
      { name: 'title', label: 'Project Title', required: true, fullWidth: true },
      { name: 'client', label: 'Client Name', required: true },
      { name: 'industry', label: 'Industry', required: true },
      { name: 'year', label: 'Year' },
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, rows: 5 },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    endpoint: 'testimonials',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'company', label: 'Company' },
      { key: 'quote', label: 'Quote' },
    ],
    fields: [
      { name: 'name', label: 'Client Name', required: true },
      { name: 'role', label: 'Role / Title' },
      { name: 'company', label: 'Company' },
      { name: 'avatar', label: 'Avatar URL', fullWidth: true },
      { name: 'quote', label: 'Testimonial Quote', type: 'textarea', fullWidth: true, rows: 4, required: true },
    ],
  },
  messages: {
    label: 'Contact Messages',
    endpoint: 'messages',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Subject' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'subject', label: 'Subject' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'Unread', label: 'Unread' },
        { value: 'Read', label: 'Read' },
      ]},
      { name: 'message', label: 'Message', type: 'textarea', fullWidth: true, rows: 5, required: true },
    ],
  },
  careers: {
    label: 'Careers',
    endpoint: 'careers',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'department', label: 'Department' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Job Title', required: true, fullWidth: true },
      { name: 'department', label: 'Department' },
      { name: 'location', label: 'Location' },
      { name: 'type', label: 'Type', type: 'select', options: [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Remote', label: 'Remote' },
      ]},
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'Open', label: 'Open' },
        { value: 'Closed', label: 'Closed' },
      ]},
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, rows: 5 },
      { name: 'requirements', label: 'Requirements (one per line)', type: 'textarea', fullWidth: true, rows: 4, isArray: true },
    ],
  },
  media: {
    label: 'Media',
    endpoint: 'media',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'url', label: 'URL' },
    ],
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'type', label: 'Type', type: 'select', options: [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
        { value: 'file', label: 'File' },
      ]},
      { name: 'url', label: 'URL', required: true, fullWidth: true },
      { name: 'alt', label: 'Alt Text', fullWidth: true },
    ],
  },
  seo: {
    label: 'SEO Settings',
    endpoint: 'seo',
    columns: [
      { key: 'page', label: 'Page' },
      { key: 'title', label: 'Meta Title' },
      { key: 'description', label: 'Meta Description' },
    ],
    fields: [
      { name: 'page', label: 'Page Path (e.g. /about, /services)', required: true },
      { name: 'title', label: 'Meta Title', fullWidth: true },
      { name: 'description', label: 'Meta Description', type: 'textarea', fullWidth: true, rows: 3 },
      { name: 'keywords', label: 'Keywords (comma separated)', fullWidth: true },
      { name: 'ogImage', label: 'OG Image URL', fullWidth: true },
    ],
  },
};

/* ================== DB SECTION COMPONENT ================== */
function DbSection({ sectionKey, showToast }) {
  const config = SECTION_CONFIGS[sectionKey];
  const { refreshServices } = useServices();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formMode, setFormMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [relatedOptions, setRelatedOptions] = useState({});

  // Convert array fields to/from newline format
  const parseArrayFields = (values) => {
    const parsed = { ...values };
    config.fields.forEach(f => {
      if (f.isArray && typeof parsed[f.name] === 'string') {
        parsed[f.name] = parsed[f.name].split('\n').map(s => s.trim()).filter(Boolean);
      }
    });
    return parsed;
  };

  const stringifyArrayFields = (item) => {
    const stringified = { ...item };
    config.fields.forEach(f => {
      if (f.isArray && Array.isArray(stringified[f.name])) {
        stringified[f.name] = stringified[f.name].join('\n');
      }
    });
    return stringified;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${config.endpoint}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Load dropdown options for blogs (categories, tags, authors)
  useEffect(() => {
    const needs = (config.fields || [])
      .filter((f) => f.optionsFrom)
      .map((f) => f.optionsFrom);
    if (needs.length === 0) return;
    let cancelled = false;
    Promise.all(
      needs.map(async (endpoint) => {
        try {
          const res = await fetch(`${API_BASE}/${endpoint}`);
          const json = await res.json();
          return [endpoint, Array.isArray(json) ? json : []];
        } catch {
          return [endpoint, []];
        }
      })
    ).then((pairs) => {
      if (cancelled) return;
      const map = {};
      pairs.forEach(([key, list]) => {
        map[key] = list.map((item) => ({
          value: item.name || item.title || item.slug || '',
          label: item.name || item.title || item.slug || '',
        })).filter((o) => o.value);
      });
      setRelatedOptions(map);
    });
    return () => {
      cancelled = true;
    };
  }, [config.fields, sectionKey]);

  // Build fields with dynamic select options
  const formFields = (config.fields || []).map((f) => {
    if (f.optionsFrom && relatedOptions[f.optionsFrom]) {
      return { ...f, type: 'select', options: relatedOptions[f.optionsFrom] };
    }
    return f;
  });

  const openAddForm = () => {
    setFormValues({});
    setFormMode('add');
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (row) => {
    setFormValues(stringifyArrayFields(row));
    setFormMode('edit');
    setEditingId(row._id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormValues({});
    setEditingId(null);
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = parseArrayFields(values);
      let res;
      if (formMode === 'add') {
        res = await fetch(`${API_BASE}/${config.endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/${config.endpoint}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save');
      }

      showToast(
        formMode === 'add'
          ? `✅ ${config.label.slice(0, -1)} added successfully! Now showing on website.`
          : `✅ ${config.label.slice(0, -1)} updated successfully!`,
        'success'
      );
      closeForm();
      fetchData();
      if (sectionKey === 'services') {
        refreshServices();
      }
    } catch (err) {
      showToast(err.message || 'Error saving. Check required fields.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (row) => {
    setConfirmDelete(row);
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;
    try {
      const res = await fetch(`${API_BASE}/${config.endpoint}/${confirmDelete._id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      showToast(`${config.label.slice(0, -1)} deleted successfully.`, 'success');
      fetchData();
      if (sectionKey === 'services') {
        refreshServices();
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting item.', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      {confirmDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${confirmDelete.title || confirmDelete.name}"? This will remove it from the website.`}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink">{config.label}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Changes here appear on the website instantly.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition-opacity"
          >
            <Plus size={16} />
            Add New {config.label.slice(0, -1)}
          </button>
        )}
      </div>

      {showForm ? (
        <AdminForm
          title={formMode === 'add' ? `Add New ${config.label.slice(0, -1)}` : `Edit ${config.label.slice(0, -1)}`}
          fields={formFields}
          values={formValues}
          onChange={(name, value) => setFormValues(prev => ({ ...prev, [name]: value }))}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitLabel={saving ? 'Saving...' : formMode === 'add' ? 'Save & Publish' : 'Update'}
          disabled={saving}
        />
      ) : (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin" />
              Loading {config.label.toLowerCase()}...
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-card">
              <p className="text-gray-400 text-sm">No {config.label.toLowerCase()} yet.</p>
              <button
                onClick={openAddForm}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold"
              >
                <Plus size={16} /> Add First {config.label.slice(0, -1)}
              </button>
            </div>
          ) : (
            <AdminTable
              columns={config.columns}
              data={data}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}

/* ================== DASHBOARD OVERVIEW ================== */
const messages = [
  { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', subject: 'Project Inquiry - Mobile App', date: '21 Aug 2026', status: 'Unread' },
  { id: 2, name: 'Lisa Wong', email: 'lisa@techcorp.com', subject: 'Partnership Proposal', date: '20 Aug 2026', status: 'Read' },
  { id: 3, name: 'Omar Farooq', email: 'omar@startup.io', subject: 'AI Solution Quote', date: '19 Aug 2026', status: 'Unread' },
];

function DashboardOverview({ showToast }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {/* Live DB stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Services', value: stats.servicesCount, color: 'text-brand-cyan' },
            { label: 'Products', value: stats.productsCount, color: 'text-brand-purple' },
            { label: 'Industries', value: stats.industriesCount, color: 'text-emerald-600' },
            { label: 'Solutions', value: stats.solutionsCount, color: 'text-amber-600' },
            { label: 'Projects', value: stats.projectsCount, color: 'text-rose-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">in database</p>
            </div>
          ))}
        </div>
      )}

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-ink flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-cyan" />
              Engagement Overview
            </h3>
            <span className="text-xs text-ink/50">Last 6 months</span>
          </div>
          <div className="h-52 flex items-end gap-3 px-2">
            {[30, 45, 70, 95, 60, 40].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand-purple to-brand-cyan opacity-80"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-ink/40">{['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-brand-purple" />
            Recent Messages
          </h3>
          <div className="space-y-3">
            {messages.map(m => (
              <div key={m.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-brand-purple flex items-center justify-center text-xs font-bold shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink truncate">{m.name}</p>
                  <p className="text-xs text-ink/50 truncate">{m.subject}</p>
                </div>
                {m.status === 'Unread' && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-bold text-ink mb-4">Quick Actions — Manage Website Content</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(SECTION_CONFIGS).map(([key, cfg]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-primary-50 hover:border-primary-100 transition cursor-pointer text-center"
            >
              <span className="text-2xl font-extrabold text-primary-600">+</span>
              <span className="text-xs font-semibold text-ink">Add {cfg.label.slice(0, -1)}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          💡 Tip: When you add or edit items here, they instantly appear on the live website from the database.
        </p>
      </div>
    </div>
  );
}

/* ================== MAIN DASHBOARD ================== */
export default function AdminDashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const dbSections = Object.keys(SECTION_CONFIGS);

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AdminSidebar
        active={active}
        setActive={(id) => {
          setActive(id);
        }}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-ink/70"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-ink capitalize">
                  {active === 'dashboard' ? 'Dashboard Overview' : active.replace('-', ' ')}
                </h1>
                <p className="text-xs text-ink/50 hidden sm:block">
                  {dbSections.includes(active)
                    ? '🔴 Live — changes save directly to database & appear on website'
                    : 'Welcome back, Admin 👋'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 w-64">
                <Search size={16} className="text-ink/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none flex-1 text-ink placeholder:text-ink/40"
                />
              </div>
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-ink/60">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs text-ink/50 bg-gray-50 px-3 py-2 rounded-xl">
                <Calendar size={14} />
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {active === 'dashboard' ? (
            <DashboardOverview showToast={showToast} />
          ) : dbSections.includes(active) ? (
            <DbSection key={active} sectionKey={active} showToast={showToast} />
          ) : (
            <div className="text-center py-20 text-gray-400">Section coming soon...</div>
          )}
        </main>
      </div>
    </div>
  );
}
