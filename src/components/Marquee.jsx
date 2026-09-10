export default function Marquee({ items, speed = 28 }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex items-center gap-x-14 w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="text-gray-400 font-serif text-lg font-semibold opacity-80 whitespace-nowrap hover:text-primary-600 hover:opacity-100 transition-colors"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
