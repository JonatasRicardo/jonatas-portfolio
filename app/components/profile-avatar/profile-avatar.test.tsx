// @ts-nocheck
import { screen, cleanup } from '@testing-library/react'

// Portable stories helpers for Next.js + Vite
import { composeStories } from '@storybook/nextjs-vite'

// Importa os stories do ProfileAvatar
import * as stories from './profile-avatar.stories'

const { Small, Medium, Large } = composeStories(stories)

async function testSmall() {
  await Small.run()
  const img = screen.getByAltText('Profile Avatar') as HTMLImageElement
  if (!img) throw new Error('Small: imagem não encontrada')

  const container = img.parentElement as HTMLElement
  if (!container) throw new Error('Small: container não encontrado')
  const className = container.className
  if (!className.includes('w-12')) throw new Error("Small: classe 'w-12' ausente")
  if (!className.includes('h-12')) throw new Error("Small: classe 'h-12' ausente")
  if (!className.includes('ring-2')) throw new Error("Small: classe 'ring-2' ausente")
}

async function testMedium() {
  await Medium.run()
  const img = screen.getByAltText('Profile Avatar') as HTMLImageElement
  if (!img) throw new Error('Medium: imagem não encontrada')
  const container = img.parentElement as HTMLElement
  if (!container) throw new Error('Medium: container não encontrado')
  const className = container.className
  if (!className.includes('w-32')) throw new Error("Medium: classe 'w-32' ausente")
  if (!className.includes('h-32')) throw new Error("Medium: classe 'h-32' ausente")
  if (!className.includes('ring-3')) throw new Error("Medium: classe 'ring-3' ausente")
}

async function testLarge() {
  await Large.run()
  const img = screen.getByAltText('Profile Avatar') as HTMLImageElement
  if (!img) throw new Error('Large: imagem não encontrada')
  const container = img.parentElement as HTMLElement
  if (!container) throw new Error('Large: container não encontrado')
  const className = container.className
  if (!className.includes('w-64')) throw new Error("Large: classe 'w-64' ausente")
  if (!className.includes('h-64')) throw new Error("Large: classe 'h-64' ausente")
  if (!className.includes('ring-4')) throw new Error("Large: classe 'ring-4' ausente")
}

;(async () => {
  await testSmall()
  cleanup()
  await testMedium()
  cleanup()
  await testLarge()
  cleanup()
})()


