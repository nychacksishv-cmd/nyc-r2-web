'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { callBackend, jsonRequest } from '@/lib/api'
import type { Note } from '@/lib/types'

async function requireUserId() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Sign in required')
  }
  return userId
}

export async function createNoteAction(formData: FormData) {
  const userId = await requireUserId()
  const content = String(formData.get('content') ?? '').trim()

  if (!content) {
    return
  }

  await callBackend<Note>(
    `/api/users/${userId}/notes`,
    jsonRequest({ content }, { method: 'POST' }),
  )
  revalidatePath('/dashboard')
  revalidatePath('/create')
}

export async function deleteNoteAction(formData: FormData) {
  const userId = await requireUserId()
  const noteId = Number(formData.get('noteId'))

  if (!Number.isFinite(noteId)) {
    return
  }

  await callBackend<void>(`/api/users/${userId}/notes/${noteId}`, { method: 'DELETE' })
  revalidatePath('/dashboard')
}
