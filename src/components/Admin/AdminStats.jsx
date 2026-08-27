import { FileText, Briefcase, FolderKanban, Mail, Layers, Package } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminStats({ liveStats }) {
  const [stats, setStats] = useState(liveStats || null);

  useEffect(() => {
    if (liveStats) {
      setStats(liveStats);
      return;
    }
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Failed to fetch stats:', err));
  }, [liveStats]);

  const cards = [
    {
      label: 'Blog Posts',
      value: stats?.blogsCount ?? 0,
      sub: `${stats?.blogsCount ?? 0} in database`,
      icon: FileText,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      label: 'Services',
      value: stats?.servicesCount ?? 0,
      sub: `${stats?.servicesCount ?? 0} active`,
      icon: Briefcase,
      color: 'from-violet-500 to-purple-600',
    },
    {
      label: 'Products',
      value: stats?.productsCount ?? 0,
      sub: `${stats?.productsCount ?? 0} in database`,
      icon: Package,
      color: 'from-pink-500 to-rose-600',
    },
    {
      label: 'Solutions',
      value: stats?.solutionsCount ?? 0,
      sub: `${stats?.solutionsCount ?? 0} in database`,
      icon: Layers,
      color: 'from-indigo-500 to-blue-600',
    },
    {
      label: 'Projects',
      value: stats?.projectsCount ?? 0,
      sub: `${stats?.projectsCount ?? 0} in database`,
      icon: FolderKanban,
      color: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Contact Messages',
      value: stats?.messagesCount ?? 0,
      sub: `${stats?.messagesCount ?? 0} in database`,
      icon: Mail,
      color: 'from-rose-500 to-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {cards.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-elev transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-sm`}>
                <Icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-ink tracking-tight">{s.value}</p>
            <p className="text-sm font-medium text-ink/80 mt-0.5">{s.label}</p>
            <p className="text-xs text-ink/50 mt-1">{s.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
