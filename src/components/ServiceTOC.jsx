import { useEffect, useState } from 'react';

/**
 * Table of contents — sticky while its parent column is in view.
 * Parent must end before form/footer so sticky releases naturally (Arbisoft-style).
 */
export default function ServiceTOC({ items }) {
  const [active, setActive] = useState(items[0]?.id || '');

  useEffect(() => {
    const sectionEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);

    const onScroll = () => {
      const offset = 150;
      let current = items[0]?.id || '';
      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= offset) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Mobile: horizontal chips under hero */}
      <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 w-max pb-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                active === item.id
                  ? 'bg-primary-gradient text-white border-transparent shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: pure CSS sticky — parent height controls when it unlocks */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 pb-2 border-b border-gray-200">
            Table of Content
          </p>
          <nav className="flex flex-col">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={go(item.id)}
                className={`py-2.5 text-sm border-b border-gray-100 transition ${
                  active === item.id
                    ? 'text-primary-700 font-semibold border-primary-300'
                    : 'text-gray-500 hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
