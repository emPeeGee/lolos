import { useEffect, useRef } from 'react';

import type { RefObject } from 'react';

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
  eventName: KW | KH,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | SVGElementEventMap[KH] | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) return;

    const listener: typeof handler = (event) => {
      savedHandler.current(event);
    };

    targetElement.addEventListener(eventName, listener, options);

    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

export { useEventListener };
