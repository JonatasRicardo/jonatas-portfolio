export const E2E_TIMEOUT_MS = {
  /** Brief UI / idle gaps */
  short: 500,
  /** Default locator and assertion windows */
  long: 2000,
  /** Navigation, hard refresh, whole-page readiness */
  superLong: 5000,
  /** Slow or flaky network-dependent assertions */
  unreliable: 15000,
} as const
