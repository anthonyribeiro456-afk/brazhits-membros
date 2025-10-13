import type { ReactNode } from 'react';
import { Rocket } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-sm flex-col items-center justify-center">
        <div className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
          <Rocket className="h-7 w-7" />
          <h1 className="text-2xl font-bold">VEO3 ACADEMY</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
