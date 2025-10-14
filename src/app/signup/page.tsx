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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Endereço de e-mail inválido.' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem.',
    path: ['confirmPassword'],
  });

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Conta Criada!',
        description: 'Sua conta foi criada com sucesso! Redirecionando...',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Falha no cadastro:', error);
      toast({
        title: 'Falha no Cadastro',
        description: error.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full border-0 bg-card/60 shadow-xl shadow-black/20 backdrop-blur-lg">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl">Criar Conta</CardTitle>
        <CardDescription>
          Insira suas informações para criar uma conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Criar conta
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" prefetch={false} className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
