import { useParams, Link } from 'react-router-dom';
import { useSupabaseQuery } from '@/hooks/useSupabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface Store {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  category: string;
  distance?: string;
  email?: string;
  password?: string;
}

const sampleStores: Record<string, Store[]> = {
  restaurantes: [
    {
      id: "1",
      name: "Sabor da Serra Restaurante",
      description: "Comida caseira tradicional com sabor único. Especialidades em feijoada, marmita fitness e prato executivo.",
      image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "restaurantes",
      distance: "1.2 km",
      email: "lojamodelorestaruante@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "12",
      name: "Cantinho Mineiro",
      description: "Comida tradicional mineira com toque especial. Especialidade em feijão tropeiro e frango com quiabo.",
      image_url: "https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "restaurantes",
      distance: "1.8 km"
    }
  ],
  farmacia: [
    {
      id: "2",
      name: "FarmaVida Completa",
      description: "Farmácia completa com medicamentos, produtos de higiene e beleza. Atendimento 24h.",
      image_url: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "farmacia",
      distance: "0.8 km",
      email: "lojamodelofarmacia@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "13",
      name: "Drogaria Saúde Total",
      description: "Medicamentos com preços acessíveis e manipulação própria. Entregamos em domicílio.",
      image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "farmacia",
      distance: "1.5 km"
    }
  ],
  mercado: [
    {
      id: "3",
      name: "Mercado Bom Preço Tradicional",
      description: "Supermercado completo com os melhores preços da região. Hortifruti frescos diariamente.",
      image_url: "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "mercado",
      distance: "1.0 km",
      email: "lojamodelomercado@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "14",
      name: "Supermercado Economia",
      description: "Produtos de qualidade com preços que cabem no seu bolso. Ofertas diárias.",
      image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "mercado",
      distance: "2.3 km"
    }
  ],
  pet: [
    {
      id: "4",
      name: "Pet Shop Amigo Fiel",
      description: "Tudo para seu pet com muito amor e carinho. Banho e tosa, rações premium e acessórios.",
      image_url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "pet",
      distance: "1.7 km",
      email: "lojamodelapet@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "15",
      name: "Mundo Animal",
      description: "Especializado em produtos para pets exóticos e tradicionais. Veterinário disponível.",
      image_url: "https://images.unsplash.com/photo-1583511655826-05700442976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "pet",
      distance: "2.2 km"
    }
  ],
  padaria: [
    {
      id: "5",
      name: "Padaria Sabor do Pão",
      description: "Pães fresquinhos e confeitaria artesanal. Especialidades em bolos decorados e pães especiais.",
      image_url: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "padaria",
      distance: "0.5 km",
      email: "lojamodelopadaria@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "16",
      name: "Delícias da Massa",
      description: "Pães artesanais, doces finos e confeitaria premium. Aceitamos encomendas para eventos.",
      image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "padaria",
      distance: "1.3 km"
    }
  ],
  bebidas: [
    {
      id: "6",
      name: "Adega do Vinho Premium",
      description: "As melhores bebidas nacionais e importadas. Especialidade em vinhos e destilados premium.",
      image_url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "bebidas",
      distance: "1.4 km",
      email: "lojamodelobebidas@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "17",
      name: "Empório das Cervejas",
      description: "Cervejas artesanais, nacionais e importadas. Kits de degustação e acessórios para apreciadores.",
      image_url: "https://images.unsplash.com/photo-1576873895592-c4ee1d0829cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "bebidas",
      distance: "1.8 km"
    }
  ],
  conveniencia: [
    {
      id: "7",
      name: "24h Conveniência Total",
      description: "Sua loja de conveniência 24 horas. Lanches rápidos, bebidas e itens essenciais.",
      image_url: "https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "conveniencia",
      distance: "0.3 km",
      email: "lojamodeloconveniencia@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "18",
      name: "Parada Rápida",
      description: "Conveniência completa para seu dia a dia. Refeições prontas, bebidas geladas e snacks.",
      image_url: "https://images.unsplash.com/photo-1532386246802-41a9df403417?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "conveniencia",
      distance: "0.9 km"
    }
  ],
  express: [
    {
      id: "8",
      name: "Express Delivery Rápido",
      description: "Entregas rápidas para toda cidade. Documentos, pequenos pacotes e encomendas.",
      image_url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "express",
      distance: "1.1 km",
      email: "lojamodeloexpress@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "19",
      name: "Entrega Já",
      description: "Serviço de entregas rápidas e eficientes. Coleta e entrega no mesmo dia.",
      image_url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "express",
      distance: "1.9 km"
    }
  ],
  roupas: [
    {
      id: "9",
      name: "Moda Elegante Premium",
      description: "As últimas tendências da moda. Roupas para todos os estilos e ocasiões.",
      image_url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "roupas",
      distance: "0.7 km",
      email: "lojamodeloroupas@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "20",
      name: "Estilo Urbano",
      description: "Moda streetwear e casual para quem gosta de conforto com personalidade.",
      image_url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "roupas",
      distance: "1.6 km"
    }
  ],
  eletronicos: [
    {
      id: "10",
      name: "TechStore Premium",
      description: "Os melhores produtos de tecnologia. Smartphones, notebooks, TVs e acessórios.",
      image_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "eletronicos",
      distance: "1.5 km",
      email: "lojamodeloeletronicos@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "21",
      name: "Mundo Digital",
      description: "Gadgets inovadores, periféricos para computadores e equipamentos de áudio high-end.",
      image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "eletronicos",
      distance: "2.0 km"
    }
  ],
  servicos: [
    {
      id: "11",
      name: "MultiServiços Profissionais",
      description: "Diversos serviços para sua comodidade. Assistência técnica, manutenção e reparos domésticos.",
      image_url: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "servicos",
      distance: "0.9 km",
      email: "lojamodeloservicos@aquitemarariboia.com",
      password: "102030"
    },
    {
      id: "22",
      name: "Conserta Tudo",
      description: "Serviços de manutenção residencial e comercial. Encanamento, elétrica e reformas.",
      image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "servicos",
      distance: "1.4 km"
    }
  ]
};

const StoreList = () => {
  const { category } = useParams<{ category: string }>();
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

  const stores = category ? sampleStores[category] || [] : [];
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-arariboia-brown mb-6">{categoryTitle}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores && stores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <CardHeader className="relative p-0">
              {store.image_url ? (
                <img 
                  src={store.image_url} 
                  alt={store.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-lg" />
              )}
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{store.name}</CardTitle>
              <p className="text-gray-600 mb-4">{store.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span>{store.distance || "1.2 km"}</span>
                </div>
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-arariboia-brown hover:bg-arariboia-brown/90"
                  onClick={() => {
                    if (store.id === "1" && store.category === "restaurantes") {
                      window.location.href = "/store/1";
                    } else {
                      window.location.href = `/store/${store.id}`;
                    }
                  }}
                >
                  <span>Ver loja</span>
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!stores || stores.length === 0) && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Nenhuma loja encontrada nesta categoria
          </h2>
          <p className="text-gray-600">
            Em breve novas lojas estarão disponíveis aqui.
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreList;
