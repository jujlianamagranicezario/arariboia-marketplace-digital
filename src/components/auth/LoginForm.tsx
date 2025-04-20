
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
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
    setConnectionError(false);
    
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
    } catch (err) {
      // Check for network/connection errors
      console.error('Login error:', err);
      if (err instanceof Error && (
        err.message.includes('fetch') || 
        err.message.includes('network') ||
        err.message.includes('connection')
      )) {
        setConnectionError(true);
        toast({
          title: "Erro de conexão",
          description: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo login for test users - only for Lovable preview environment
  const handleDemoLogin = (role: string) => {
    if (role === 'sabor') {
      form.setValue('email', 'sabor@daserrarestaurante.com');
      form.setValue('password', '102030');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {connectionError && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-destructive">
              Erro de conexão ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.
            </span>
          </div>
        )}
        
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
        
        {/* Demo login for Lovable preview - will be used if Supabase connection is not available */}
        <div className="text-center mt-2">
          <button 
            type="button"
            className="text-xs text-gray-500 hover:underline"
            onClick={() => handleDemoLogin('sabor')}
          >
            Demo: Sabor da Serra
          </button>
        </div>
        
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
