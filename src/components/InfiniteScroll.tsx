"use client";

import { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
  threshold?: number;
}

export default function InfiniteScroll({ onLoadMore, hasMore, loading, children, threshold = 200 }: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, loading]
  );

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [handleObserver, threshold]);

  return (
    <>
      {children}
      <div ref={observerRef} className="h-4 w-full" />
    </>
  );
}
