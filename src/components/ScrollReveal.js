import { useEffect, useRef } from 'react';

/**
 * ScrollReveal – wraps children in a div that fades + slides up
 * when it enters the viewport.
 *
 * Props:
 *  delay  – CSS transition-delay in ms (default 0)
 *  className – extra classes forwarded to the wrapper div
 */
const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;

