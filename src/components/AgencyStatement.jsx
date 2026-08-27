import Reveal from './Reveal';

export default function AgencyStatement() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="eyebrow mb-6">What we do</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.15] tracking-tight">
            Websites, apps and digital experiences, crafted with{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">
              brilliance, precision and style
            </span>
          </h2>
          <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Cubixsol partners with ambitious teams to design, build and scale products that people love —
            from first sketch to production launch.
          </p>
          <div className="mt-10 flex flex-col items-center gap-1">
            <p className="font-bold text-ink">Fahad Nadeem</p>
            <p className="text-sm text-gray-400">CEO &amp; Founder</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
