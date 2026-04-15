import {E2E_TIMEOUT_MS} from '../../helpers/timeouts'
import {waitForPageReady} from '../../helpers/waits'
import {task} from '../types'

export const NavigateToHome = () =>
  task('Navigate to home page', async ({page}) => {
    await page.goto('/', {timeout: E2E_TIMEOUT_MS.superLong})
    await waitForPageReady(page)
  })

export const NavigateToBlog = () =>
  task('Navigate to /blog', async ({page}) => {
    await page.goto('/blog', {timeout: E2E_TIMEOUT_MS.superLong})
    await waitForPageReady(page)
  })

export const NavigateTo = (path: string) =>
  task(`Navigate to ${path}`, async ({page}) => {
    await page.goto(path, {timeout: E2E_TIMEOUT_MS.superLong})
    await waitForPageReady(page)
  })
