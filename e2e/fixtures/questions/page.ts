import {E2E_TIMEOUT_MS} from '../../helpers/timeouts'
import {question} from '../types'

export const PageTitleContains = (text: string) =>
  question(`Does page title contain "${text}"?`, async ({page}) => {
    await page.waitForLoadState('load', {timeout: E2E_TIMEOUT_MS.long})
    return (await page.title()).includes(text)
  })

export const PageHeadingVisible = (text: string) =>
  question(`Is heading "${text}" visible?`, async ({page}) => {
    const heading = page.getByRole('heading', {name: text})
    try {
      await heading.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.long})
      return true
    } catch {
      return false
    }
  })

export const ElementByTestIdVisible = (testId: string) =>
  question(`Is [data-testid="${testId}"] visible?`, async ({page}) => {
    const el = page.getByTestId(testId)
    try {
      await el.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.long})
      return true
    } catch {
      return false
    }
  })

export const TextVisible = (text: string) =>
  question(`Is text "${text}" visible on the page?`, async ({page}) => {
    const el = page.getByText(text)
    try {
      await el.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.long})
      return true
    } catch {
      return false
    }
  })
