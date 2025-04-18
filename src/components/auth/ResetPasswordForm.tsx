
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const resetSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPasswordForm = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ResetFormValues) => {
    const { error } = await resetPassword(values.email);
    if (!error) {
      setIsEmailSent(true);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arariboia-brown">Recuperar senha</CardTitle>
        <CardDescription>
          {isEmailSent 
            ? 'Email enviado! Verifique sua caixa de entrada.'
            : 'Digite seu email para recuperar sua senha'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEmailSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-arariboia-brown hover:bg-arariboia-brown/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center py-4">
            <p className="mb-4 text-muted-foreground">
              Enviamos um email com instruções para recuperar sua senha.
              Verifique sua caixa de entrada e spam.
            </p>
            <Button 
              onClick={() => setIsEmailSent(false)}
              variant="outline"
              className="mr-2"
            >
              Tentar novamente
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground w-full text-center">
          <Button 
            variant="link" 
            className="p-0 text-arariboia-green"
            onClick={() => navigate('/login')}
          >
            Voltar para o login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
