import Reveal from './Reveal';

const items = [
  { value: '10+', label: 'Years building products' },
  { value: '200+', label: 'Projects delivered' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '4.9', label: 'Average rating' },
];

export default function TrustBar() {
  return (
    <section className="bg-primary-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {items.map((item) => (
              <div key={item.label}>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">{item.value}</p>
                <p className="text-sm text-white/75 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
