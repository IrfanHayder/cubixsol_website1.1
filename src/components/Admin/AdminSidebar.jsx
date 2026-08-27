import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tags,
  Users,
  Briefcase,
  Layers,
  Building2,
  Package,
  FolderKanban,
  Star,
  Mail,
  BriefcaseBusiness,
  Search,
  Image,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'blogs', label: 'Blog Posts', icon: FileText, live: true },
  { id: 'categories', label: 'Categories', icon: FolderOpen, live: true },
  { id: 'tags', label: 'Tags', icon: Tags, live: true },
  { id: 'authors', label: 'Authors', icon: Users, live: true },
  { id: 'services', label: 'Services', icon: Briefcase, live: true },
  { id: 'solutions', label: 'Solutions', icon: Layers, live: true },
  { id: 'industries', label: 'Industries', icon: Building2, live: true },
  { id: 'products', label: 'Products', icon: Package, live: true },
  { id: 'projects', label: 'Projects', icon: FolderKanban, live: true },
  { id: 'testimonials', label: 'Testimonials', icon: Star, live: true },
  { id: 'messages', label: 'Contact Messages', icon: Mail, live: true },
  { id: 'careers', label: 'Careers', icon: BriefcaseBusiness, live: true },
  { id: 'media', label: 'Media Library', icon: Image, live: true },
  { id: 'seo', label: 'SEO Settings', icon: Search, live: true },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ active, setActive, isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0f0e1a] text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-gradient flex items-center justify-center text-sm font-bold">
              CS
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">Cubixsol</p>
              <p className="text-[11px] text-white/50">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-gradient text-white shadow-soft'
                    : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.live && (
                  <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">LIVE</span>
                )}
                {isActive && <ChevronRight size={14} className="opacity-70" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-brand-purple/30 flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-white/50 truncate">{user?.email || 'admin@cubixsol.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-300/90 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
