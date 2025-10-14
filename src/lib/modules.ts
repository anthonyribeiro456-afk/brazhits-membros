import type { Module } from '@/lib/types';

export const modules: Module[] = [
  {
    id: 'music-pack-mp3',
    title: 'PACK +1000 Músicas MP3 (Atualizado Out/25)',
    description: 'Acesso a um pacote com mais de 1000 músicas em MP3.',
    category: 'Música',
    imageId: 'pack-musicas-mp3',
    isNew: true,
  },
  {
    id: 'video-pack-mp4',
    title: 'PACK +200 Clipes MP4 (Atualizado Out/25)',
    description: 'Acesso a um pacote com mais de 200 clipes em MP4.',
    category: 'Vídeo',
    imageId: 'pack-clipes-mp4',
    isNew: true,
  },
  {
    id: 'video-pack-1',
    title: 'Video Clips Pack Vol. 1',
    description: 'A curated collection of over 50 high-quality video clips for your projects.',
    category: 'Video',
    imageId: 'video-editing',
  },
  {
    id: 'video-pack-2',
    title: 'Video Clips Pack Vol. 2',
    description: 'Another 50+ clips, focusing on abstract and animated visuals.',
    category: 'Video',
    imageId: 'abstract-animation',
  },
  {
    id: 'music-pack-1',
    title: 'Royalty-Free Music Vol. 1',
    description: 'Over 200 tracks spanning multiple genres, ready for commercial use.',
    category: 'Music',
    imageId: 'sound-waves',
  },
  {
    id: 'music-pack-2',
    title: 'Royalty-Free Music Vol. 2',
    description: 'A fresh batch of 200+ audio tracks, from cinematic to lo-fi.',
    category: 'Music',
    imageId: 'music-studio',
  },
  {
    id: 'ultimate-bundle',
    title: 'The Ultimate Bundle',
    description: 'Get instant access to all video clips and music tracks in one single pack.',
    category: 'Bundle',
    imageId: 'digital-creator',
  },
];
