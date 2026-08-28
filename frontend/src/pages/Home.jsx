import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import home from "../assets/home.jpg";
import burger from "../assets/burgers.jpg";
import tacos from "../assets/tacos.jpg";
import crepes from "../assets/crepe.jpg";
import DishCard from "../components/DishCard";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import restaurantBg from "../assets/home.jpg";
import { useEffect, useState } from "react";
import { API_BASE } from "../config";
import heroVideo from "../assets/hero.mp4";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((res) => res.json())
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    fetch(`${API_BASE}/api/dishes`)
      .then((res) => res.json())
      .then((response) => setDishes(response.data))
      .catch((error) => console.error("Error fetching dishes:", error));
  }, []);
  return (
    <>
      <Navbar />
      <div className="relative min-h-[85vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-black/60" />
        {/* Dark gradient overlay so text stays readable over any photo */}

        <div className="relative w-full px-6 md:px-12 py-24">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md w-fit mx-auto px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-body uppercase tracking-wider text-white">
                Ouvert maintenant · 2 adresses à Tlemcen
              </span>
            </div>

            <h5 className="font-heading text-6xl md:text-8xl text-white uppercase mb-4 leading-[0.9] tracking-tight">
              Panozzo<span className="text-brand-red">'S</span>
            </h5>
            <h1 className="text-xl md:text-2xl mb-8 text-brand-red text-spaced-letters">
              PIZZA & CRÊPE
            </h1>
            <p className="text-gray-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Pizza au feu, tacos généreux, burgers, panozzo croustillants et
              crêpes gourmandes. Le meilleur de la street food à Tlemcen, 7j/7.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                to="/menu"
                className="bg-brand-red text-white border-2 border-brand-red font-body uppercase text-sm px-8 py-4 rounded-full hover:shadow-[0_0_40px_rgba(227,36,36,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                voir le menu <span> →</span>
              </Link>
              <button className="bg-white/10 backdrop-blur border-2 border-white/30 text-white text-sm font-body uppercase px-8 py-4 rounded-full hover:bg-white hover:text-brand-black hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                commander
              </button>
            </div>
          </Reveal>

          {/* Floating category pills, replaces a separate "categories" block */}
          <Reveal
            as="div"
            delay={200}
            className="flex justify-center flex-wrap gap-3"
          >
            {["Pizzas", "Tacos", "Burgers", "Crêpes", "Panozzo"].map((cat) => (
              <span
                key={cat}
                className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-body uppercase px-4 py-2 rounded-full hover:bg-brand-red hover:border-brand-red transition-all duration-300 cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </Reveal>
        </div>

        {/* Scroll-down cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
      <div className="bg-brand-cream text-brand-black font-body p-6 md:p-12">
        <h5 className="text-brand-black text-lg font-body font-bold uppercase mb-2 text-center">
          NOS CATEGORIES
        </h5>
        <div className="flex gap-4 justify-center flex-wrap">
          {[
            { img: tacos, label: "Tacos" },
            { img: home, label: "Pizzas" },
            { img: burger, label: "Burgers" },
            { img: home, label: "Panozzo" },
            { img: crepes, label: "Crêpes" },
          ].map((cat, index) => (
            <Reveal
              key={cat.label}
              delay={index * 80}
              className="text-white p-6 flex flex-col items-center"
            >
              <img
                src={cat.img}
                alt={cat.label}
                loading="lazy"
                decoding="async"
                className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full shadow-md mb-4 hover:scale-105 transition duration-300 hover:border-2 hover:border-brand-red"
              />
              <h3 className="font-heading text-lg text-brand-black text-center hover:text-brand-red transition-colors duration-200">
                {cat.label}
              </h3>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="bg-brand-cream text-brand-black font-body p-6 md:p-12">
        <Reveal>
          <h5 className="text-brand-red text-lg font-body uppercase mb-4">
            LES INCONTOURNABLES
          </h5>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
            <h5 className="text-brand-black font-bold text-2xl md:text-4xl font-heading">
              NOS BEST-SELLERS
            </h5>
            <Link
              to="/menu"
              className=" text-brand-red  font-body font-bold pt-2 uppercase text-sm size-lg hover:text-brand-black transition-colors duration-300"
            >
              voir le menu <span> →</span>
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {dishes.map((dish, index) => (
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
      </div>

      <div
        className=" text-white font-body py-16 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurantBg})` }}
      >
        <div className="absolute inset-0 bg-brand-black/80"></div>

        <div className="relative z-10">
          <Reveal>
            <h2 className="text-lg mb-2 text-center text-brand-red uppercase">
              Deux adresses à Tlemcen
            </h2>

            <h2 className="font-heading text-3xl text-center mb-12 font-bold uppercase">
              Retrouvez-nous
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">
            <Reveal className="bg-white text-brand-black rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <h2 className="font-heading text-2xl font-bold mb-4">
                PANOZZO IMAMA
              </h2>

              <p className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-brand-red" /> Imama,
                Mansourah, Tlemcen
              </p>

              <p className="flex items-center gap-2 mb-1">
                <Phone size={16} className="text-brand-red" /> 0795 00 32 39
              </p>

              <p className="flex items-center gap-2 mb-2 ml-6">0670 22 76 84</p>

              <p className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-brand-red" /> 7j/7 · 11h30 –
                00h00
              </p>

              <a
                className="bg-transparent border-2 border-brand-red text-brand-red font-body uppercase text-sm px-5 py-2 rounded hover:bg-brand-red hover:text-white transition duration-300"
                href="https://maps.app.goo.gl/GQSbJGJvLhuGFvCs7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur la carte <span>→</span>
              </a>
            </Reveal>

            <Reveal
              delay={100}
              className="bg-white text-brand-black rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="font-heading text-2xl font-bold mb-4">
                PANOZZO KIFFEN
              </h2>

              <p className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-brand-red" /> Kiffen, Tlemcen
              </p>

              <p className="flex items-center gap-2 mb-4">
                <Phone size={16} className="text-brand-red" /> 0558 88 50 39
              </p>

              <p className="flex items-center gap-2 mb-6">
                <Clock size={16} className="text-brand-red" /> 7j/7 · 11h30 –
                00h00
              </p>

              <a
                className="bg-transparent border-2 border-brand-red text-brand-red font-body uppercase text-sm px-5 py-2 rounded hover:bg-brand-red hover:text-white transition duration-300"
                href="https://maps.app.goo.gl/mPHZ5xGqZs3tCZSK9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur la carte <span>→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
