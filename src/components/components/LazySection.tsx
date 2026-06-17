import { useEffect, useRef, useState, type ReactNode } from "react";

export default function LazySection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {loaded ? (
        children
      ) : (
        <div className="h-40 flex items-center justify-center">Loading...</div>
      )}
    </div>
  );
}