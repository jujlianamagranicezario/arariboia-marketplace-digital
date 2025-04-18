
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = [
  { id: "all", name: "Todos" },
  { id: "restaurants", name: "Restaurantes" },
  { id: "grocery", name: "Mercado" },
  { id: "pharmacy", name: "Farmácia" },
  { id: "petshop", name: "Pet" },
  { id: "bakery", name: "Padaria" },
  { id: "drinks", name: "Bebidas" },
  { id: "convenience", name: "Conveniência" },
  { id: "express", name: "Express" },
  { id: "clothing", name: "Roupas" },
  { id: "electronics", name: "Eletrônicos" },
  { id: "services", name: "Serviços" },
];

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap py-3">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryBar;
