import { FileText, Briefcase, FolderKanban, Mail, MessageSquare, Eye, Users, Layers } from 'lucide-react';

const stats = [
  {
    label: 'Blog Posts',
    value: '48',
    sub: '12 published this month',
    icon: FileText,
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
  },
  {
    label: 'Services',
    value: '18',
    sub: 'All active',
    icon: Briefcase,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
  },
  {
    label: 'Solutions',
    value: '24',
    sub: '4 featured',
    icon: Layers,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
  },
  {
    label: 'Projects',
    value: '36',
    sub: '8 case studies',
    icon: FolderKanban,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
  {
    label: 'Contact Messages',
    value: '127',
    sub: '9 unread',
    icon: Mail,
    color: 'from-rose-500 to-red-600',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
  },
  {
    label: 'Total Views',
    value: '18.4k',
    sub: 'Last 30 days',
    icon: Eye,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
];

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {stats.map((s) => {
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
