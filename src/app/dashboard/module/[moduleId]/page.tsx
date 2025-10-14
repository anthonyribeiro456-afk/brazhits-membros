'use client';

import { modules } from '@/lib/modules';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId);

  if (!module) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Dashboard
          </Link>
        </Button>
      </div>

      <Card className="bg-card/80">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{module.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {module.id === 'music-pack-mp3' && (
             <div className="aspect-video w-full">
              <iframe 
                src="https://drive.google.com/file/d/11PPXWi_K5ZRK8ejXc3peldgZryG0xdzY/preview"
                className="h-full w-full"
                allow="autoplay"
                title={`PDF for ${module.title}`}>
              </iframe>
            </div>
          )}
           {module.id === 'video-pack-mp4' && (
            <div className="aspect-video w-full">
              <iframe
                src="https://drive.google.com/file/d/1TsFzlOM6CT0s22pXplInxw4ZRB-efNMP/preview"
                className="h-full w-full"
                allow="autoplay"
                title={`PDF for ${module.title}`}
              ></iframe>
            </div>
          )}
           {!['music-pack-mp3', 'video-pack-mp4'].includes(module.id) && (
            <p>Conteúdo do módulo em construção.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
