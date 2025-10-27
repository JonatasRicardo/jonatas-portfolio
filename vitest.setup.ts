import "@testing-library/jest-dom"
import * as React from "react"
import { act as domAct } from "react-dom/test-utils"

// React 19: ensure React.act is available for @testing-library/react internals
// This mirrors the legacy act from react-dom/test-utils until upstreams fully align
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(React as any).act) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(React as any).act = domAct
}

// Polyfill: matchMedia (used by hooks/components relying on media queries)
if (typeof window !== "undefined" && !window.matchMedia) {
  // @ts-expect-error jsdom typings
  window.matchMedia = (query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  }
}

// Polyfill: ResizeObserver (used by Radix UI components)
if (typeof (globalThis as any).ResizeObserver === "undefined") {
  ;(globalThis as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

// Polyfill: PointerEvent for pointer-based interactions in tests
if (typeof (globalThis as any).PointerEvent === "undefined") {
  ;(globalThis as any).PointerEvent = class extends Event {
    constructor(type: string, params?: EventInit) {
      super(type, params)
    }
  }
}

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});