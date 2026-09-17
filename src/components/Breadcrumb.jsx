import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumb({ current, items = [], dark = false }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <nav className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? 'text-slate-400' : 'text-gray-400'}`}>
        <Link to="/" className={`flex items-center gap-1 ${dark ? 'hover:text-[#00a4d8]' : 'hover:text-primary-600'} transition`}>
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        {items.map((item) => (
          <span key={item.to} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={item.to} className={`${dark ? 'hover:text-[#00a4d8]' : 'hover:text-primary-600'} transition`}>
              {item.label}
            </Link>
          </span>
        ))}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className={`${dark ? 'text-white' : 'text-ink'} font-medium`}>{current}</span>
      </nav>
    </div>
  );
}
