import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  triggerOnce?: boolean;
  delay?: number;
}

export function useIntersectionObserver(
  options: IntersectionOptions = {}
): [(element: HTMLElement | null) => void, boolean] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    triggerOnce = false,
    delay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const frozen = useRef(false);
  const timeoutId = useRef<NodeJS.Timeout>();

  const handleIntersect = ([entry]: IntersectionObserverEntry[]) => {
    const isCurrentlyVisible = entry.isIntersecting;
    
    if (frozen.current && freezeOnceVisible) return;
    
    if (delay > 0) {
      if (isCurrentlyVisible) {
        timeoutId.current = setTimeout(() => {
          setIsVisible(true);
          if (triggerOnce) frozen.current = true;
        }, delay);
      } else {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      }
    } else {
      setIsVisible(isCurrentlyVisible);
      if (isCurrentlyVisible && triggerOnce) {
        frozen.current = true;
      }
    }
  };

  const setElement = (element: HTMLElement | null) => {
    elementRef.current = element;
  };

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(handleIntersect, observerParams);

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, triggerOnce, delay]);

  return [setElement, isVisible];
}

// Usage example for SEO image loading:
export function useLazyImage(src: string, options?: IntersectionOptions): [(element: HTMLElement | null) => void, string] {
  const [setRef, isVisible] = useIntersectionObserver({
    triggerOnce: true,
    ...options,
  });

  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
      };
    }
  }, [isVisible, src]);

  return [setRef, currentSrc || ''];
}