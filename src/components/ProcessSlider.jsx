import { useState } from 'react';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const processSteps = [
  { step: '01', title: 'Discover', desc: 'We clarify your users, business goals, product requirements, technical challenges, budget, and measures of success.' },
  { step: '02', title: 'Plan', desc: 'Our team defines the feature scope, suitable technology, project roadmap, responsibilities, milestones, and delivery schedule.' },
  { step: '03', title: 'Design and Develop', desc: 'Designers create the user experience while developers build the product through structured, reviewable development cycles.' },
  { step: '04', title: 'Test and Launch', desc: 'We test functionality, usability, compatibility, security, and performance before preparing the product for release.' },
  { step: '05', title: 'Support and Grow', desc: 'After launch, we monitor the product, resolve issues, study feedback, and help you plan valuable new features.' },
];

export default function ProcessSlider() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <p className="eyebrow mb-3">HOW WE WORK</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-3">
          Our Proven Development Process
        </h2>
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
          A clear, collaborative path from idea to launch — and beyond.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5" staggerDelay={0.08}>
        {processSteps.map((item, index) => {
          const isActive = index === activeStep;
          return (
            <StaggerItem key={item.step}>
              <div
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer rounded-[1.25rem] p-6 transition-all duration-300 flex flex-col justify-between h-full ${isActive
                    ? 'bg-[linear-gradient(135deg,#009de3_0%,#1f62dd_50%,#5740cd_100%)] text-white shadow-[0_15px_35px_-5px_rgba(31,98,221,0.35)] -translate-y-1.5'
                    : 'bg-white border border-gray-100 hover:border-sky-200 text-ink shadow-sm hover:shadow-md hover:-translate-y-0.5'
                  }`}
              >
                <div>
                  <span
                    className={`block text-2xl lg:text-3xl font-extrabold mb-3 tracking-tight ${isActive ? 'text-white' : 'text-[#a0dbfc]'
                      }`}
                  >
                    {item.step}
                  </span>
                  <h3
                    className={`font-extrabold text-base lg:text-lg mb-2 ${isActive ? 'text-white' : 'text-ink'
                      }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${isActive ? 'text-white/95 font-normal' : 'text-gray-400'
                      }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
