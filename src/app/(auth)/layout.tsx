import type { ReactNode } from 'react';
import { Film } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]">
         <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#00e4ff33,transparent)]"></div>
      </div>
      
      <div className="mb-8 flex flex-col items-center gap-2 text-2xl font-bold text-primary">
        <div className="rounded-full bg-primary/20 p-4">
            <Film className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold text-white">MotionSound Pro</h1>
      </div>
      {children}
    </div>
  );
}
