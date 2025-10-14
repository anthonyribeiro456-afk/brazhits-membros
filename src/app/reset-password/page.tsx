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
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
});

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: 'E-mail de Redefinição Enviado',
        description: 'Por favor, verifique sua caixa de entrada para obter instruções.',
      });
      setIsSent(true);
    } catch (error: any) {
      console.error('Falha ao redefinir senha:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao enviar e-mail de redefinição. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full border-0 bg-card/60 shadow-xl shadow-black/20 backdrop-blur-lg">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl">Redefinir Senha</CardTitle>
        <CardDescription>
          Digite seu e-mail para receber um link de redefinição de senha.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        {isSent ? (
          <div className="text-center text-sm">
            <p>Um e-mail foi enviado para seu endereço com as instruções.</p>
            <Link href="/login" prefetch={false} className="mt-4 inline-block font-bold text-primary underline">
              Voltar para o Login
            </Link>
          </div>
        ) : (
          <>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar Link de Redefinição
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Lembrou sua senha?{' '}
              <Link href="/login" prefetch={false} className="underline">
                Entrar
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
