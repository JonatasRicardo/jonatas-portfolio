declare module '@storybook/nextjs-vite' {
  export const setProjectAnnotations: (...args: any[]) => void
  export const composeStories: (...args: any[]) => any
  export const composeStory: (...args: any[]) => any
  export type Preview = any
}



