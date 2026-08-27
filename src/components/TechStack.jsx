import Reveal from './Reveal';

/* Official-style logos via Devicon CDN */
const logos = [
  {
    name: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'WordPress',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg',
  },
  {
    name: 'C#',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  {
    name: 'ASP.NET',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  },
  {
    name: 'Laravel',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  },
  {
    name: 'Bootstrap',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  },
  {
    name: 'iOS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
  },
  {
    name: 'Android',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
  },
  {
    name: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Flutter',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  },
  {
    name: 'TypeScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'AWS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    name: 'Docker',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'MongoDB',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'Figma',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
];

export default function TechStack() {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            We are working on these <span className="text-primary-600">Technologies</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl bg-gray-50 border border-gray-100 p-4 sm:p-6 overflow-hidden">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className="flex items-center gap-4 w-max animate-marquee"
                style={{ animationDuration: '36s' }}
              >
                {doubled.map((logo, i) => (
                  <div
                    key={`${logo.name}-${i}`}
                    className="shrink-0 w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] rounded-2xl bg-white shadow-card border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-elev hover:-translate-y-1 transition-all duration-300"
                    title={logo.name}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0.35';
                      }}
                    />
                    <span className="text-[10px] font-semibold text-gray-500 truncate max-w-[80px] text-center">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
