'use server';

import { revalidatePath } from 'next/cache';
import { updateUserProgress } from '@/lib/firebase/firestore';

export async function toggleModuleCompletion(
  userId: string,
  moduleId: string,
  isCompleted: boolean
) {
  if (!userId) {
    return { success: false, error: 'User not authenticated.' };
  }

  try {
    await updateUserProgress(userId, moduleId, isCompleted);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating module progress:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to update progress: ${errorMessage}` };
  }
}
