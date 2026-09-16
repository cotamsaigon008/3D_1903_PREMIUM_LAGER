import { useEffect, useRef, type ReactNode, type ElementType } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'left' | 'right';
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
  threshold?: number;
  as?: ElementType;
}

const variantClass = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
};

const delayClass: Record<number, string> = {
  0: '',
  100: 'reveal-delay-100',
  200: 'reveal-delay-200',
  300: 'reveal-delay-300',
  400: 'reveal-delay-400',
  500: 'reveal-delay-500',
  600: 'reveal-delay-600',
  700: 'reveal-delay-700',
};

export const Reveal = ({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.12,
  as: Tag = 'div',
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const baseClass = [variantClass[variant], delayClass[delay], className]
    .filter(Boolean)
    .join(' ');

  // @ts-ignore - dynamic tag with proper ElementType typing
  return <Tag ref={ref} className={baseClass}>{children}</Tag>;
};
