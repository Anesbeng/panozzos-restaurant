import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import tacos from "../assets/tacos.jpg";
import food from "../assets/food.jpg";
import burgers from "../assets/burgers.jpg";
import home from "../assets/home.jpg";

const galleryImages = [
  tacos,
  food,
  burgers,
  home,
  tacos,
  food,
  burgers,
  home,
  tacos,
  food,
  burgers,
  home,
];

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Navbar />
      <div className="bg-brand-black text-white font-heading p-6 md:p-12">
        <Reveal>
          <h5 className="text-brand-red text-lg mb-2"> EN IMAGES</h5>
          <h1 className="font-bold text-4xl md:text-5xl mb-2">GALERIE</h1>
          <p className="text-gray-300">
            Un aperçu de nos plats, de notre ambiance et de la team Panozzo's.
          </p>
        </Reveal>
      </div>

      <div className="bg-brand-cream font-body p-6 md:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
          {galleryImages.map((img, index) => (
            <Reveal key={index} delay={(index % 6) * 60}>
              <div
                onClick={() => setSelectedImage(img)}
                className="cursor-pointer"
              >
                <img
                  src={img}
                  alt="Panozzo's Pizza & Crêpe"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300 hover:border-2 hover:border-brand-red"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-full rounded-lg animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Galerie;
