import type {Page} from '@playwright/test'

export interface ActorAbilities {
  page: Page
}

export type Actor = {
  page: Page
  attemptsTo: (...tasks: Task[]) => Promise<void>
  asks: <T>(question: Question<T>) => Promise<T>
}

export type Task = {
  description: string
  performAs: (actor: Actor) => Promise<void>
}

export type Question<T> = {
  description: string
  answeredBy: (actor: Actor) => Promise<T>
}

export function task(description: string, performAs: (actor: Actor) => Promise<void>): Task {
  return {description, performAs}
}

export function question<T>(
  description: string,
  answeredBy: (actor: Actor) => Promise<T>,
): Question<T> {
  return {description, answeredBy}
}

export function createActor(page: Page): Actor {
  const actor: Actor = {
    page,
    attemptsTo: async (...tasks: Task[]) => {
      for (const t of tasks) {
        await t.performAs(actor)
      }
    },
    asks: async <T>(q: Question<T>): Promise<T> => {
      return q.answeredBy(actor)
    },
  }
  return actor
}
