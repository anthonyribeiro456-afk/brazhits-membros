'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Module } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { toggleModuleCompletion } from './actions';
import { useAuth } from '@/contexts/auth-context';
import { useTransition, useState } from 'react';
import { Loader2, CheckCircle, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type ModuleCardProps = {
  module: Module;
  image: ImagePlaceholder;
  isCompleted: boolean;
};

export default function ModuleCard({ module, image, isCompleted }: ModuleCardProps) {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useState(isCompleted);
  const { toast } = useToast();

  const handleToggle = () => {
    if (!user) return;

    const newCompletedStatus = !optimisticCompleted;
    setOptimisticCompleted(newCompletedStatus);

    startTransition(async () => {
      const result = await toggleModuleCompletion(user.uid, module.id, newCompletedStatus);
      if (result.error) {
        setOptimisticCompleted(!newCompletedStatus); // Revert on error
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card className="flex h-full transform-gpu flex-col overflow-hidden border-2 border-transparent bg-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <CardHeader className="relative p-0">
        <Image
          src={image.imageUrl}
          alt={image.description}
          width={600}
          height={400}
          className="aspect-video w-full object-cover"
          data-ai-hint={image.imageHint}
        />
        {optimisticCompleted && (
          <Badge variant="default" className="absolute right-3 top-3 border border-primary-foreground/20 bg-primary text-primary-foreground">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <Badge variant="secondary" className="mb-2">{module.category}</Badge>
        <CardTitle className="mb-2 font-headline">{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={handleToggle} disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : optimisticCompleted ? (
            <Circle className="mr-2 h-4 w-4" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          {isPending
            ? 'Updating...'
            : optimisticCompleted
            ? 'Mark as Incomplete'
            : 'Mark as Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
}
