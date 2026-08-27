import { motion, useReducedMotion } from 'framer-motion';

const directions = {
  up: { y: 24, x: 0 },
  down: { y: -16, x: 0 },
  left: { y: 0, x: 24 },
  right: { y: 0, x: -24 },
  none: { y: 0, x: 0 },
};

const ease = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered reveal. Safe defaults so content never stays invisible.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  amount = 0.1,
  scale = false,
  as: Component = motion.div,
}) {
  const reduce = useReducedMotion();
  const offset = directions[direction] || directions.up;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        ...(scale ? { scale: 0.98 } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once, amount, margin: '0px 0px -20px 0px' }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  children,
  className = '',
  staggerDelay = 0.08,
  once = true,
  amount = 0.08,
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once, amount, margin: '0px 0px -20px 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.02 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up', hover = false }) {
  const reduce = useReducedMotion();
  const offset = directions[direction] || directions.up;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.45, ease },
        },
      }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
