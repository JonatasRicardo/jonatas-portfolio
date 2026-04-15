import type {Locator, Page} from '@playwright/test'
import {E2E_TIMEOUT_MS} from './timeouts'

/** Wait for the page to reach networkidle — use for full-page navigations. */
export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle', {timeout: E2E_TIMEOUT_MS.superLong})
}

/** Wait for a locator to be visible and stable before interacting. */
export async function waitForInteractive(locator: Locator): Promise<void> {
  await locator.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.long})
}

/**
 * Wait for a network response matching a URL pattern.
 * Register **before** the action that triggers the request.
 *
 * @example
 * const responsePromise = waitForApiResponse(page, '/api/contact')
 * await actor.attemptsTo(SubmitContactForm({...}))
 * await responsePromise
 */
export function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
): Promise<void> {
  return page
    .waitForResponse(
      r => {
        const url = r.url()
        return typeof urlPattern === 'string'
          ? url.includes(urlPattern)
          : urlPattern.test(url)
      },
      {timeout: E2E_TIMEOUT_MS.unreliable},
    )
    .then(() => undefined)
}
