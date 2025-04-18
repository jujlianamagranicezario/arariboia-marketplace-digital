
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-arariboia-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-bold mb-4">AquiTemArariboia</h3>
            <p className="text-gray-300 text-sm mb-4">
              Conectando comerciantes locais e consumidores de todas as regiões do Brasil 
              através de uma plataforma digital inovadora.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Para Consumidores */}
          <div>
            <h4 className="font-bold mb-4">Para Consumidores</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="#" className="hover:text-white">Cadastre-se</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Encontrar Lojas</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Como Funciona</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Perguntas Frequentes</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Formas de Pagamento</Link>
              </li>
            </ul>
          </div>
          
          {/* Para Lojistas */}
          <div>
            <h4 className="font-bold mb-4">Para Lojistas</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="#" className="hover:text-white">Crie sua Loja</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Benefícios</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Planos e Preços</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Central de Ajuda</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Recursos para Lojistas</Link>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-arariboia-green" />
                <span>contato@aquitemarariboia.com.br</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-arariboia-green" />
                <span>(99) 1234-5678</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium text-sm mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="py-2 px-3 text-sm bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-arariboia-green text-white w-full"
                />
                <button className="bg-arariboia-green hover:bg-arariboia-green/90 py-2 px-3 rounded-r-md text-white text-sm">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 AquiTemArariboia - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
