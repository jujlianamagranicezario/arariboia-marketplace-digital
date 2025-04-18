
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-arariboia-green">
              AquiTem<span className="text-arariboia-brown">Arariboia</span>
            </h1>
          </Link>

          {/* Location selector - visible on desktop */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            <MapPin size={16} className="text-arariboia-green" />
            <span className="text-gray-600">Entregar em:</span>
            <span className="font-medium text-arariboia-dark">Arariboia, 123</span>
          </div>

          {/* Search - visible on desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Buscar produtos ou lojas..." 
                className="w-full pr-10 border-gray-300 focus:border-arariboia-green focus:ring-arariboia-green"
              />
              <Search 
                size={18} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
            </div>
          </div>

          {/* Right navigation */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex gap-1 text-arariboia-dark hover:text-arariboia-green">
              <User size={20} />
              <span className="hidden lg:inline">Entrar</span>
            </Button>

            <Button variant="ghost" className="relative text-arariboia-dark hover:text-arariboia-green">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-arariboia-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-arariboia-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden py-2">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Buscar produtos ou lojas..." 
              className="w-full pr-10 border-gray-300"
            />
            <Search 
              size={18} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>

        {/* Mobile location */}
        <div className="md:hidden pb-2 flex items-center gap-1 text-sm">
          <MapPin size={16} className="text-arariboia-green" />
          <span className="text-gray-600">Entregar em:</span>
          <span className="font-medium text-arariboia-dark">Arariboia, 123</span>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t">
            <nav className="flex flex-col">
              <Link to="/entrar" className="py-2 px-4 hover:bg-gray-100">Entrar ou cadastrar</Link>
              <Link to="/pedidos" className="py-2 px-4 hover:bg-gray-100">Meus pedidos</Link>
              <Link to="/favoritos" className="py-2 px-4 hover:bg-gray-100">Favoritos</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
