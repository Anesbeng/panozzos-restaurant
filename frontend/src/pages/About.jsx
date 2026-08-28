import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import home from "../assets/home.jpg";
import { Pizza, Clock, MapPin, Heart } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="relative bg-brand-black text-white font-heading p-6 md:p-12 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />
        <Reveal className="relative">
          <h5 className="text-brand-red text-lg mb-2">NOTRE HISTOIRE</h5>
          <h1 className="font-bold text-4xl md:text-5xl mb-2">À PROPOS</h1>
          <p className="text-gray-300">
            Le plaisir se trouve dans nos assiettes, depuis toujours.
          </p>
        </Reveal>
      </div>

      <div className="bg-brand-cream font-body p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <Reveal className="relative">
            <div className="absolute -inset-4 bg-brand-red/5 rounded-3xl -rotate-2 hidden md:block" />
            <img
              src={home}
              alt="Panozzo's"
              loading="lazy"
              decoding="async"
              className="relative w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-5 -right-5 bg-brand-red text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <Heart size={18} fill="white" />
              <span className="font-heading text-sm uppercase">
                Fait avec passion
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="text-brand-red text-xs font-body uppercase tracking-wider">
              Depuis nos débuts
            </span>
            <h2 className="font-heading text-3xl text-brand-black font-bold mb-4 mt-1">
              NOTRE STORY
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Panozzo's est né à Tlemcen avec une idée simple : proposer une
              street food généreuse et savoureuse, préparée avec des ingrédients
              frais, dans une ambiance conviviale.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Aujourd'hui, avec deux adresses à Tlemcen et une communauté de
              plus de 29 000 fans, Panozzo's continue de partager sa passion
              pour la pizza, les tacos et la crêpe, 7j/7.
            </p>
          </Reveal>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
          {[
            { icon: MapPin, value: "2", label: "Adresses à Tlemcen" },
            { icon: Heart, value: "29K+", label: "Fans sur Instagram" },
            { icon: Clock, value: "7/7", label: "Jours par semaine" },
          ].map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 100}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon size={22} className="text-brand-red" />
              </div>
              <h3 className="font-heading text-3xl text-brand-black font-bold mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 uppercase text-xs tracking-wide">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Values row */}
        <div className="max-w-5xl mx-auto mt-20 text-center">
          <Reveal>
            <span className="text-brand-red text-xs font-body uppercase tracking-wider">
              Ce qui nous anime
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-brand-black font-bold mt-1 mb-10">
              Nos engagements
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: Pizza,
                title: "Ingrédients frais",
                text: "Préparés chaque jour avec des produits de qualité.",
              },
              {
                icon: Clock,
                title: "Toujours ouverts",
                text: "7j/7, de 11h30 à minuit, pour toutes vos envies.",
              },
              {
                icon: Heart,
                title: "Fait avec passion",
                text: "Chaque plat est préparé avec soin, comme à la maison.",
              },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="text-left">
                <v.icon size={24} className="text-brand-red mb-3" />
                <h3 className="font-heading text-lg text-brand-black font-bold mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
