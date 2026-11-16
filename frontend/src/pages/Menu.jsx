import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DishCard from "../components/DishCard";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { API_BASE } from "../config";
import { Search, UtensilsCrossed } from "lucide-react";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((response) => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setActiveCategory(response.data[0].id);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    fetch(`${API_BASE}/dishes`)
      .then((res) => res.json())
      .then((response) => setDishes(response.data))
      .catch((error) => console.error("Error fetching dishes:", error));
  }, []);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.category_id === activeCategory &&
      dish.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative bg-brand-black text-white font-heading p-6 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />
        <Reveal className="relative">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-4">
            <UtensilsCrossed size={14} className="text-brand-red" />
            <span className="text-xs font-body uppercase tracking-wider text-gray-300">
              {dishes.length} plats disponibles
            </span>
          </div>
          <h5 className="text-brand-red text-lg mb-2">NOTRE CARTE</h5>
          <h1 className="font-bold text-4xl md:text-5xl mb-2">le Menu</h1>
          <p className="text-gray-300 max-w-lg">
            Choisissez une catégorie et laissez-vous tenter. Certains plats sont
            disponibles en vue 3D / AR.
          </p>
        </Reveal>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[68px] md:top-[88px] z-30 bg-brand-cream/95 backdrop-blur border-b border-black/5 py-4 px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 md:flex-wrap md:overflow-visible scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 font-bold uppercase text-sm px-5 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-brand-red text-white border-brand-red"
                    : "bg-white text-brand-black border-transparent hover:text-brand-red hover:border-brand-red hover:-translate-y-0.5"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative shrink-0 w-full md:w-56">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat..."
              className="w-full bg-white border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand-red"
            />
          </div>
        </div>
      </div>

      {/* Dishes grid */}
      <div className="bg-brand-cream font-body p-6 md:p-12 pt-8 min-h-[40vh]">
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <UtensilsCrossed size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-body">
              Aucun plat ne correspond pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {filteredDishes.map((dish, index) => (
              <Reveal key={dish.id} delay={(index % 4) * 80}>
                <DishCard
                  {...dish}
                  categoryName={
                    categories.find((c) => c.id === dish.category_id)?.name
                  }
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Menu;
