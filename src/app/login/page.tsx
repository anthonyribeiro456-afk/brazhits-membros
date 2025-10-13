'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// ✅ Validação com Zod
const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, { message: 'Senha é obrigatória.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // ✅ Função de login
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: 'Falha no Login',
        description: 'Credenciais inválidas. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-background pt-16">

          <img
            src="/imgs/logo_braz.png"
            alt="Logo"
            className="w-44 h-auto"
          />


      <Card className="w-full max-w-md border-border bg-card shadow-lg rounded-xl mt-4">
        <CardHeader className="p-[30px] pb-4">
          <CardTitle className="text-2xl font-bold text-white">Bem-vindo de volta!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Faça login para acessar a VEO3 ACADEMY.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-[30px] pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo de E-mail */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-white">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        {...field}
                        className="bg-background text-white border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-white">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="bg-background text-white border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botão de Login */}
              <Button
                type="submit"
                className="w-full text-base font-bold bg-primary text-primary-foreground hover:opacity-90 transition"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>
            </form>
          </Form>

          {/* Links de ajuda */}
          <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
            <p>
              <Link href="/reset-password" prefetch={false} className="text-primary hover:underline">
                Esqueceu sua senha?
              </Link>
            </p>
            <p>
              Não tem uma conta?{' '}
              <Link href="/signup" prefetch={false} className="text-primary hover:underline">
                Crie uma agora
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
