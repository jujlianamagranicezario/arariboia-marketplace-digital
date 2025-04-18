
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProdutosPage from "./pages/dashboard/ProdutosPage";
import PedidosPage from "./pages/dashboard/PedidosPage";
import LojasPage from "./pages/dashboard/LojasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard e suas páginas internas */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="produtos" element={<ProdutosPage />} />
            <Route path="pedidos" element={<PedidosPage />} />
            <Route path="lojas" element={<LojasPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
