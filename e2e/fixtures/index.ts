import {test as base} from '@playwright/test'
import {createActor} from './types'
import type {Actor} from './types'

type Fixtures = {
  actor: Actor
}

export const test = base.extend<Fixtures>({
  actor: async ({page}, use) => {
    await use(createActor(page))
  },
})

export {expect} from '@playwright/test'
