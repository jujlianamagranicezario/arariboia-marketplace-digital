
import React from "react";
import { StarIcon, MapPin, Clock, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dados mock da loja e produtos
const loja = {
  id: 1,
  nome: "Sabor da Serra Restaurante",
  descricao: "Comida caseira tradicional com sabor único, ambiente acolhedor e entrega rápida!",
  imagem:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
  banner:
    "https://images.unsplash.com/photo-1519864600265-abb22523096f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  categoria: "Restaurante",
  avaliacao: 4.8,
  tempoEntrega: "30-45 min",
  taxaEntrega: "R$ 5,99",
  status: "Aberto",
  endereco: "Rua das Flores, 123, Centro, Niterói - RJ",
  telefone: "(21) 99999-1234",
  email: "lojamodelorestaruante@aquitemarariboia.com",
};

const produtos = [
  {
    id: 1,
    nome: "Feijoada Caseira",
    preco: 29.9,
    imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    descricao: "Saborosa feijoada tradicional, acompanha arroz, farofa e couve refogada.",
    destaque: true,
  },
  {
    id: 2,
    nome: "Marmita Fitness Frango",
    preco: 25.0,
    imagem: "https://images.unsplash.com/photo-1519864600265-abb22523096f?auto=format&fit=crop&w=400&q=80",
    descricao: "Arroz integral, peito de frango grelhado, legumes e salada fresca.",
    destaque: false,
  },
  {
    id: 3,
    nome: "Strogonoff de Carne Completo",
    preco: 27.9,
    imagem: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    descricao: "Strogonoff de carne, batata palha e arroz soltinho.",
    destaque: false,
  },
  {
    id: 4,
    nome: "Prato Executivo do Dia",
    preco: 22.5,
    imagem: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    descricao: "Escolha do chef: proteínas variadas, guarnições e salada.",
    destaque: true,
  },
  {
    id: 5,
    nome: "Salada Refrescante da Serra",
    preco: 19.0,
    imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    descricao: "Mix de folhas, tomate, cenoura, ovo cozido e molho especial.",
    destaque: false,
  },
  {
    id: 6,
    nome: "Bife Acebolado com Purê",
    preco: 24.9,
    imagem: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
    descricao: "Bife suculento acebolado com purê cremoso de batata.",
    destaque: false,
  },
  {
    id: 7,
    nome: "Macarrão Integral ao Pesto",
    preco: 23.0,
    imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    descricao: "Delicioso macarrão integral com pesto de manjericão e queijo.",
    destaque: false,
  },
  {
    id: 8,
    nome: "Moqueca de Peixe",
    preco: 36.0,
    imagem: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=format&fit=crop&w=400&q=80",
    descricao: "Receita tradicional capixaba com peixe fresco, pimentões e coentro.",
    destaque: true,
  },
  {
    id: 9,
    nome: "Sobremesa - Pudim de Leite",
    preco: 8.9,
    imagem: "https://images.unsplash.com/photo-1519864600265-abb22523096f?auto=format&fit=crop&w=400&q=80",
    descricao: "Clássico pudim de leite condensado, calda caramelizada.",
    destaque: false,
  },
  {
    id: 10,
    nome: "Suco Natural da Serra",
    preco: 6.0,
    imagem: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    descricao: "Suco de frutas frescas, sabores variados de acordo com a estação.",
    destaque: false,
  },
];

const SaborDaSerraRestaurante = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="w-full h-60 md:h-80 relative mb-4">
        <img
          src={loja.banner}
          alt={loja.nome}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 py-4 flex items-end gap-4">
          <img
            src={loja.imagem}
            alt={loja.nome}
            className="w-24 h-24 rounded-lg shadow-lg object-cover border-4 border-white"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{loja.nome}</h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="bg-arariboia-green text-xs text-white rounded px-2 py-1">{loja.categoria}</span>
              <div className="flex items-center gap-1 text-yellow-300">
                <StarIcon size={18} className="fill-yellow-400 stroke-yellow-400" />
                <span className="font-semibold text-base">{loja.avaliacao}</span>
              </div>
              <span className="text-xs text-white ml-2">({loja.status})</span>
            </div>
            <p className="text-white mt-1">{loja.descricao}</p>
          </div>
        </div>
      </div>

      {/* Info da loja */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-6 bg-white p-4 rounded-lg shadow-sm items-center">
          <div className="flex items-center gap-2 text-arariboia-green">
            <MapPin size={18} /> <span className="text-gray-700 text-sm">{loja.endereco}</span>
          </div>
          <div className="flex items-center gap-2 text-arariboia-green">
            <Clock size={18} /> <span className="text-gray-700 text-sm">{loja.tempoEntrega} entrega</span>
          </div>
          <div className="flex items-center gap-2 text-arariboia-green">
            <Phone size={18} /> <span className="text-gray-700 text-sm">{loja.telefone}</span>
          </div>
          <div className="flex items-center gap-2 text-arariboia-green">
            <Mail size={18} /> <span className="text-gray-700 text-sm">{loja.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-arariboia-green text-white">{loja.taxaEntrega} entrega</Badge>
          </div>
        </div>
      </div>

      {/* Catálogo de produtos */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-arariboia-brown mb-4">Cardápio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <Card key={produto.id} className="h-full">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {produto.destaque && (
                  <Badge className="absolute top-2 right-2 bg-arariboia-green">
                    Destaque
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-arariboia-dark truncate">{produto.nome}</h3>
                <p className="text-sm text-gray-500">{produto.descricao}</p>
                <div className="mt-2 text-arariboia-green font-bold text-lg">
                  R$ {produto.preco.toFixed(2)}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-arariboia-green hover:bg-arariboia-green/90 text-white">
                  Adicionar ao pedido
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaborDaSerraRestaurante;
