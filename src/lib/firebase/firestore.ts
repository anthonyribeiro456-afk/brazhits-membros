import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';
import type { UserProgress } from '@/lib/types';

export async function getUserProgress(userId: string): Promise<UserProgress> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return (docSnap.data().progress as UserProgress) || {};
  } else {
    await setDoc(docRef, { progress: {} });
    return {};
  }
}

export async function updateUserProgress(userId: string, moduleId: string, completed: boolean) {
  const userDocRef = doc(db, 'users', userId);

  try {
    await updateDoc(userDocRef, {
      [`progress.${moduleId}`]: completed
    });
  } catch (error: any) {
    if (error.code === 'not-found') {
      await setDoc(userDocRef, { progress: { [moduleId]: completed } });
    } else {
      console.error("Error updating user progress: ", error);
      throw error;
    }
  }
}
