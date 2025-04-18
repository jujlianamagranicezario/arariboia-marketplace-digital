
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, authState } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      
      if (!result.error) {
        // Redirecionar baseado na role do usuário
        const { user } = authState;
        
        if (user?.role === 'admin') {
          navigate('/admin');
        } else if (user?.role === 'lojista') {
          navigate('/dashboard'); // Lojista usa o dashboard original
        } else {
          navigate('/user'); // Cliente usa o dashboard de usuário
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="seu@email.com" 
                  {...field} 
                  disabled={loading}
                />
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
                <Input 
                  type="password" 
                  placeholder="******" 
                  {...field} 
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center mt-2">
          <Link 
            to="/reset-password" 
            className="text-sm text-arariboia-green hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-arariboia-brown hover:bg-arariboia-brown/90"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link 
              to="/signup" 
              className="text-arariboia-green hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
