"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const [isObserving, setIsObserving] = useState(false);

  const observer = useRef(new IntersectionObserver(callback, options));

  useEffect(() => {
    if (!isObserving) {
      observer.current.observe(targetRef.current);
      setIsObserving(true);
    }
  }, [targetRef, callback, options, isObserving]);

  return observer.current;
};
