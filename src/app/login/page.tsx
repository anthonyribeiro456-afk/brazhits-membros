
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
import { Loader2, Eye, EyeOff } from 'lucide-react';

// ✅ Validação com Zod
const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, { message: 'Senha é obrigatória.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="flex flex-col items-center justify-center min-h-screen bg-background -translate-y-6">

          <img
            src="/imgs/logo_braz.png"
            alt="Logo"
            className="w-44 h-auto -mb-5 -mt-5"
          />


      <Card className="w-full max-w-md border-border bg-card shadow-lg rounded-xl">
        <CardHeader className="p-[30px] pb-4">
          <CardTitle className="text-2xl font-bold text-white">Bem-vindo de volta!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Faça login para acessar seus PACKS!
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
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          className="bg-background text-white border-border focus:ring-2 focus:ring-primary pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
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
              Ainda não adquiriu seu Pack?{' '}
              <a href="https://brazhits.com.br/packs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Clique aqui e garanta o seu agora!
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
