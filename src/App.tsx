import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import StoreList from "@/components/StoreList";

// Páginas
import Index from "./pages/Index";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProdutosPage from "./pages/dashboard/ProdutosPage";
import PedidosPage from "./pages/dashboard/PedidosPage";
import LojasPage from "./pages/dashboard/LojasPage";
import NotFound from "./pages/NotFound";

// Páginas de autenticação
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";

// Novas páginas para dashboard do usuário
import UserDashboardLayout from "./components/user/UserDashboardLayout";
import UserDashboardIndex from "./pages/user/UserDashboardIndex";
import UserPedidosPage from "./pages/user/UserPedidosPage";

// Novas páginas para dashboard do administrador
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import AdminDashboardIndex from "./pages/admin/AdminDashboardIndex";
import LojistasPage from "./pages/admin/LojistasPage";
import BannersPage from "./pages/admin/BannersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Rotas de autenticação */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Dashboard original (mantido para compatibilidade) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="produtos" element={<ProdutosPage />} />
              <Route path="pedidos" element={<PedidosPage />} />
              <Route path="lojas" element={<LojasPage />} />
            </Route>
            
            {/* Dashboard do Usuário (Cliente) */}
            <Route 
              path="/user" 
              element={
                <RoleBasedRoute allowedRoles={['cliente', 'admin']}>
                  <UserDashboardLayout />
                </RoleBasedRoute>
              }
            >
              <Route index element={<UserDashboardIndex />} />
              <Route path="pedidos" element={<UserPedidosPage />} />
              <Route path="chat" element={<div>Em breve: Chat</div>} />
              <Route path="cupons" element={<div>Em breve: Meus Cupons</div>} />
              <Route path="favoritos" element={<div>Em breve: Meus Favoritos</div>} />
              <Route path="pagamento" element={<div>Em breve: Pagamento</div>} />
              <Route path="fidelidade" element={<div>Em breve: Programa de Fidelidade</div>} />
              <Route path="ajuda" element={<div>Em breve: Ajuda</div>} />
              <Route path="meus-dados" element={<div>Em breve: Meus Dados</div>} />
              <Route path="seguranca" element={<div>Em breve: Segurança</div>} />
              <Route path="cartao" element={<div>Em breve: Cartão Arariboia</div>} />
              <Route path="whatsapp" element={<div>Em breve: Meu WhatsApp</div>} />
            </Route>
            
            {/* Dashboard do Administrador */}
            <Route 
              path="/admin" 
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminDashboardLayout />
                </RoleBasedRoute>
              }
            >
              <Route index element={<AdminDashboardIndex />} />
              <Route path="lojistas" element={<LojistasPage />} />
              <Route path="banners" element={<BannersPage />} />
              <Route path="pedidos" element={<div>Em breve: Gestão de Pedidos</div>} />
              <Route path="cupons" element={<div>Em breve: Gestão de Cupons</div>} />
              <Route path="produtos" element={<div>Em breve: Gestão de Produtos</div>} />
              <Route path="pagamentos" element={<div>Em breve: Gestão de Pagamentos</div>} />
              <Route path="notificacoes" element={<div>Em breve: Notificações</div>} />
              <Route path="whatsapp" element={<div>Em breve: Gestão de WhatsApp</div>} />
              <Route path="relatorios" element={<div>Em breve: Relatórios</div>} />
              <Route path="controles" element={<div>Em breve: Controles Master</div>} />
            </Route>
            
            {/* Redirecionamentos */}
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/user/dashboard" element={<Navigate to="/user" replace />} />
            
            {/* New category routes */}
            <Route path="/restaurantes" element={<StoreList />} />
            <Route path="/mercado" element={<StoreList />} />
            <Route path="/farmacia" element={<StoreList />} />
            <Route path="/pet" element={<StoreList />} />
            <Route path="/padaria" element={<StoreList />} />
            <Route path="/bebidas" element={<StoreList />} />
            <Route path="/conveniencia" element={<StoreList />} />
            <Route path="/express" element={<StoreList />} />
            <Route path="/roupas" element={<StoreList />} />
            <Route path="/eletronicos" element={<StoreList />} />
            <Route path="/servicos" element={<StoreList />} />

            {/* Página detalhada da loja modelo restaurantes */}
            <Route path="/store/1" element={<SaborDaSerraRestaurante />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
