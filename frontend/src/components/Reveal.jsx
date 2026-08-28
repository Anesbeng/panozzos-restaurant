import React, { useEffect, useRef, useState } from "react";

/**
 * Wraps children and fades/slides them in the first time they scroll
 * into view. Uses IntersectionObserver (native, no dependency) and
 * disconnects after the first reveal so it costs nothing on repeat
 * scrolling.
 *
 * Usage:
 *   <Reveal><h1>Title</h1></Reveal>
 *   <Reveal delay={120}><DishCard ... /></Reveal>   // stagger items
 */
const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver isn't available for some reason, just show it.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
