
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureBanner = () => {
  return (
    <div className="bg-gradient-to-r from-arariboia-green to-green-600 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-6 md:mb-0 md:max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Venda seus produtos online de forma fácil!
            </h2>
            <p className="text-white/90 mb-4">
              Crie sua loja virtual gratuita e comece a vender hoje mesmo.
              Gestão simples, pagamentos integrados e marketing digital.
            </p>
            <Button className="bg-white text-arariboia-green hover:bg-white/90 hover:text-arariboia-green/90">
              Começar agora
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4 md:p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Vantagens para lojistas</h3>
              <ul className="text-left text-sm md:text-base space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Vitrine digital personalizada
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Dashboard de vendas
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Múltiplas formas de pagamento
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Integração com WhatsApp
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBanner;
