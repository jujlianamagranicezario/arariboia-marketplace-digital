
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "all", name: "Todos", path: "/" },
  { id: "restaurants", name: "Restaurantes", path: "/restaurantes" },
  { id: "grocery", name: "Mercado", path: "/mercado" },
  { id: "pharmacy", name: "Farmácia", path: "/farmacia" },
  { id: "petshop", name: "Pet", path: "/pet" },
  { id: "bakery", name: "Padaria", path: "/padaria" },
  { id: "drinks", name: "Bebidas", path: "/bebidas" },
  { id: "convenience", name: "Conveniência", path: "/conveniencia" },
  { id: "express", name: "Express", path: "/express" },
  { id: "clothing", name: "Roupas", path: "/roupas" },
  { id: "electronics", name: "Eletrônicos", path: "/eletronicos" },
  { id: "services", name: "Serviços", path: "/servicos" },
];

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string, path: string) => {
    setActiveCategory(categoryId);
    navigate(path);
  };

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
                onClick={() => handleCategoryClick(category.id, category.path)}
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
