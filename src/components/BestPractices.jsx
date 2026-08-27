import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  Navigation,
  Layers,
  Zap,
  Expand,
  Shield,
  ChevronDown,
} from 'lucide-react';
import Reveal from './Reveal';

const practices = [
  {
    icon: Accessibility,
    title: 'Accessibility at the Core',
    body: 'We believe that technology should be accessible to everybody. Our team is dedicated to developing mobile apps that are both inclusive and user-friendly. Our expert mobile engineers ensure that your software is accessible to the broadest potential audience. We follow stringent accessibility requirements and make informed design decisions at every turn.',
  },
  {
    icon: Navigation,
    title: 'Intuitive Navigation',
    body: 'A well-designed mobile app should seamlessly lead users through its features. Our designers prioritize building easy-to-navigate flows that make it simple for people to identify what they need. Understanding user behavior and preferences allows us to create applications that are both efficient and enjoyable to use.',
  },
  {
    icon: Layers,
    title: 'Consistent Look and Feel',
    body: "To maintain a uniform and familiar user experience, we follow design principles closely. We design applications that look and feel like they belong on the device by following Apple's Human Interface Guidelines for iOS and Google's Material Design for Android.",
  },
  {
    icon: Zap,
    title: 'Performance',
    body: 'We make an effort to design mobile apps that are lightweight and efficient. This also reduces resource use while maintaining functionality. The result is smoother user experience, better performance, and a longer battery life.',
  },
  {
    icon: Expand,
    title: 'Scalable',
    body: "We build mobile apps with scalability in mind. Our engineers plan for future development and increased user demand at every stage. Building a flexible design allows us to quickly adapt to new features and handle growing traffic. This practice guarantees your app's long-term success.",
  },
  {
    icon: Shield,
    title: 'Security',
    body: 'We take security very seriously. We utilize strong security methods to secure your app and user data. This includes data encryption, multi-factor authentication, and regular security assessments.',
  },
];

export default function BestPractices() {
  // multiple can be open — default first open like reference
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="py-14 lg:py-20 bg-[#f0f6fc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            <span className="text-primary-500">Best</span> Practices in Mobile App Development
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Whether it&apos;s an app suited to just one team or a company-wide ERP system, our mobile
            app development team has the skill set to turn a basic idea into a complete solution
            that will help your organization improve its outcomes. Our professionals are well-versed
            in iOS, Android, and cross-platform app development.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-sky-100/80 shadow-sm overflow-hidden">
            {practices.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openSet.has(i);
              const isLast = i === practices.length - 1;
              return (
                <div
                  key={item.title}
                  className={!isLast ? 'border-b border-sky-100' : ''}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-sky-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 font-bold text-ink text-sm sm:text-base">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 sm:px-6 pb-5 pl-[3.75rem] sm:pl-[4.5rem] text-sm text-gray-500 leading-relaxed -mt-1">
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
