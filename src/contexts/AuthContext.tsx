
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AuthState, UserData } from '@/types/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextProps {
  authState: AuthState;
  signUp: (email: string, password: string, name: string, role?: string) => Promise<{ error?: any }>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: any }>;
  updatePassword: (password: string) => Promise<{ error?: any }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prevState => ({
        ...prevState,
        session,
        user: session?.user ? mapUserData(session.user) : null,
        loading: false,
      }));
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState(prevState => ({
          ...prevState,
          session,
          user: session?.user ? mapUserData(session.user) : null,
          loading: false,
        }));

        if (event === 'SIGNED_IN') {
          // Buscar dados adicionais do usuário se necessário
          if (session?.user) {
            const { data, error } = await supabase
              .from('users')
              .select('name, role')
              .eq('id', session.user.id)
              .single();

            if (data && !error) {
              setAuthState(prevState => ({
                ...prevState,
                user: {
                  ...prevState.user!,
                  name: data.name,
                  role: data.role,
                },
              }));
            }
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Mapear dados do usuário
  const mapUserData = (user: User): UserData => ({
    id: user.id,
    email: user.email || '',
  });

  // Registrar um novo usuário
  const signUp = async (email: string, password: string, name: string, role: string = 'cliente') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role },
        },
      });

      if (error) throw error;

      // Criar entrada na tabela de usuários
      if (data.user) {
        const { error: userError } = await supabase.from('users').insert({
          id: data.user.id,
          email,
          name,
          role: role as 'admin' | 'lojista' | 'cliente',
        });

        if (userError) throw userError;
      }

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Verifique seu e-mail para confirmar o cadastro.',
      });

      return { data };
    } catch (error: any) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  // Login
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: 'Login realizado com sucesso!',
        description: `Bem-vindo de volta!`,
      });

      return { data };
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  // Logout
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logout realizado',
        description: 'Você saiu da sua conta com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer logout',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Recuperação de senha
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: 'E-mail de recuperação enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      });

      return {};
    } catch (error: any) {
      toast({
        title: 'Erro ao enviar e-mail de recuperação',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  // Atualizar senha
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      toast({
        title: 'Senha atualizada com sucesso',
        description: 'Sua senha foi redefinida com sucesso.',
      });

      return {};
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar senha',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
