'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { modules } from '@/lib/modules';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import ModuleCard from './module-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const images = useMemo(() => PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>), []);
  
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const newModules = modules.filter(m => m.isNew);
  const oldModules = modules.filter(m => !m.isNew);

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl font-headline">Seus Packs</h1>
      
      {loading ? (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Skeleton key="new-1" className="h-[450px] w-full rounded-xl" />
            <Skeleton key="new-2" className="h-[450px] w-full rounded-xl" />
        </div>
      ) : newModules.length > 0 && (
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {newModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              image={images[module.imageId]}
            />
          ))}
        </div>
      )}

      {oldModules.length > 0 && (
        <>
          <h2 className="mb-8 mt-12 border-t border-border pt-8 text-2xl font-bold tracking-tight text-white sm:text-3xl font-headline">Outros Módulos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(loading ? Array.from({ length: 5 }) : oldModules).map((module, i) =>
              loading || !module ? (
                <Skeleton key={i} className="h-[420px] w-full rounded-xl" />
              ) : (
                <ModuleCard
                  key={module.id}
                  module={module}
                  image={images[module.imageId]}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
