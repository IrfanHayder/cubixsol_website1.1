import { Edit2, Trash2, Eye } from 'lucide-react';


export default function AdminTable({ columns, data, onEdit, onDelete, onView }) {
  const renderCell = (col, row) => {
    if (col.render) return col.render(row);
    const val = row[col.key];
    if (val === null || val === undefined || val === '') return <span className="text-ink/30">—</span>;

    const isImageKey = ['image', 'heroImage', 'avatar', 'coverImage', 'whyChooseImage', 'thumbnail'].includes(col.key);
    const isMediaUrl = typeof val === 'string' && (val.startsWith('/uploads/') || (val.startsWith('http') && val.match(/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/i)));

    if (isImageKey || isMediaUrl) {
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src={val}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://placehold.co/100x100?text=Img';
              }}
            />
          </div>
          <span className="text-xs text-ink/70 font-mono truncate max-w-[140px]" title={val}>
            {val.split('/').pop()}
          </span>
        </div>
      );
    }

    return val;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-5 py-3.5 font-semibold text-ink/70 text-xs uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="text-right px-5 py-3.5 font-semibold text-ink/70 text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, idx) => (
              <tr key={row.id || row._id || idx} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 text-ink/90">
                    {renderCell(col, row)}
                  </td>
                ))}

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="p-2 rounded-lg text-ink/50 hover:text-brand-cyan hover:bg-cyan-50 transition-colors"
                        title="View"
                      >
                        <Eye size={15} />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 rounded-lg text-ink/50 hover:text-brand-purple hover:bg-violet-50 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 rounded-lg text-ink/50 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="py-16 text-center text-ink/40 text-sm">No records found</div>
      )}
    </div>
  );
}
