import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MenuItem, MenuCategory } from "@shared/schema";

const menuCategories = [
  { id: "appetizers", name: "Appetizers" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    categoryId: "appetizers",
    name: "Truffle Arancini",
    description: "Crispy risotto balls filled with wild mushrooms and black truffle, served with saffron aioli",
    price: "18.00",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    isAvailable: true,
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    categoryId: "appetizers",
    name: "Fresh Oysters",
    description: "Half dozen fresh oysters served with classic mignonette and lemon",
    price: "24.00",
    imageUrl: "https://pixabay.com/get/gafc27cc0e8d8522ccce53f60280801490f88b5257e1d4b5d50d828ca22126091f2883a48ac2551a5f2fd850322f5ba565815e1d66818d03e7721624fe8cd2123_1280.jpg",
    isAvailable: true,
    displayOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    categoryId: "mains",
    name: "Grilled Beef Tenderloin",
    description: "8oz premium beef tenderloin with roasted seasonal vegetables and red wine reduction",
    price: "45.00",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true,
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    categoryId: "desserts",
    name: "Chocolate Soufflé",
    description: "Warm dark chocolate soufflé with vanilla bean ice cream and gold leaf",
    price: "16.00",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isAvailable: true,
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("appetizers");

  // In a real app, this would fetch from the API
  const { data: menuItems = mockMenuItems, isLoading } = useQuery({
    queryKey: ["/api/menu/items"],
    enabled: false, // Disable for now since we're using mock data
  });

  const filteredItems = menuItems.filter(item => item.categoryId === activeCategory);

  return (
    <section id="menu" className="py-20 bg-moccasin/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-brown mb-4">Our Menu</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Carefully crafted dishes using the finest seasonal ingredients</p>
        </div>

        {/* Menu Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-200 font-medium ${
                activeCategory === category.id
                  ? "bg-warm-brown text-white"
                  : "bg-white text-dark-brown hover:bg-warm-brown hover:text-white"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-64" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1546833999-b9f581a1996d"} 
                  alt={item.name} 
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-playfair font-semibold text-dark-brown mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-playfair font-bold text-warm-brown">${item.price}</span>
                    <Button className="bg-gold text-dark-brown px-4 py-2 rounded-lg hover:bg-gold/90 transition-all duration-200 font-medium text-sm">
                      Add to Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items available in this category at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
