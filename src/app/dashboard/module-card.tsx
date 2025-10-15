'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Module } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ModuleCardProps = {
  module: Module;
  image: ImagePlaceholder;
};

export default function ModuleCard({ module, image }: ModuleCardProps) {
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
        {module.isNew && (
          <Badge variant="default" className="absolute right-3 top-3 border border-primary-foreground/20 bg-primary text-primary-foreground">
            Novo
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <Badge variant="secondary" className="mb-2">{module.category}</Badge>
        <CardTitle className="mb-2 font-headline">{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/dashboard/module/${module.id}`}>
            Abrir Pack
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
