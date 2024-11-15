import React, { createContext, useContext, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

interface LocomotiveScrollContextValue {
  scroll: LocomotiveScroll | null;
}

interface LocomotiveScrollProviderProps {
  children: React.ReactNode;
  options: any;
  containerRef: React.RefObject<HTMLDivElement>;
  watch: any[];
  onScroll?: (scroll: any) => void;
}

const LocomotiveScrollContext = createContext<LocomotiveScrollContextValue>({
  scroll: null,
});

export function useLocomotiveScroll() {
  return useContext(LocomotiveScrollContext);
}

export function LocomotiveScrollProvider({
  children,
  options,
  containerRef,
  watch,
  onScroll,
}: LocomotiveScrollProviderProps) {
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
      ...options,
    });

    if (onScroll && scrollRef.current) {
      scrollRef.current.on('scroll', onScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
    };
  }, [containerRef, options, onScroll]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.update();
    }
  }, [watch]);

  return (
    <LocomotiveScrollContext.Provider value={{ scroll: scrollRef.current }}>
      {children}
    </LocomotiveScrollContext.Provider>
  );
}