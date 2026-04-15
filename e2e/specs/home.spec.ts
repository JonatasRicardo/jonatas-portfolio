import {expect, test} from '../fixtures'
import {PageTitleContains} from '../fixtures/questions'
import {NavigateToHome} from '../fixtures/tasks'

test.describe('Home page', () => {
  test('has title', async ({actor}) => {
    await actor.attemptsTo(NavigateToHome())
    expect(await actor.asks(PageTitleContains('Jonatas Ricardo Santos - Fullstack Software Engineer'))).toBe(true)
  })
})
