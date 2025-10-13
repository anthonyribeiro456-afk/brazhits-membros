'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { modules } from '@/lib/modules';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { UserProgress } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { getUserProgress } from '@/lib/firebase/firestore';
import ModuleCard from './module-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({});
  const [loading, setLoading] = useState(true);

  const images = useMemo(() => PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>), []);
  
  useEffect(() => {
    async function fetchProgress() {
      if (user) {
        setLoading(true);
        const userProgress = await getUserProgress(user.uid);
        setProgress(userProgress);
        setLoading(false);
      }
    }
    fetchProgress();
  }, [user]);

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl font-headline">Your Modules</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(loading ? Array.from({ length: 5 }) : modules).map((module, i) =>
          loading || !module ? (
            <Skeleton key={i} className="h-[420px] w-full rounded-xl" />
          ) : (
            <ModuleCard
              key={module.id}
              module={module}
              image={images[module.imageId]}
              isCompleted={progress[module.id] ?? false}
            />
          )
        )}
      </div>
    </div>
  );
}
