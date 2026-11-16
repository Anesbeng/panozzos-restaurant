import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { API_BASE } from "../config";
import { resolveUrl } from "../utils/resolveUrl";
import DishCard from "../components/DishCard";
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react";

const DishDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [category, setCategory] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [modelViewerReady, setModelViewerReady] = useState(false);

  // Only load the <model-viewer> custom element (WebGL-capable, not tiny)
  // on the one page that actually needs it — and only once.
  useEffect(() => {
    import("@google/model-viewer").then(() => setModelViewerReady(true));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/dishes/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setDish(response.data);
        setShow3D(false); // reset to photo view whenever we load a new dish
      })
      .catch((error) => console.error("Error fetching dish:", error));
  }, [id]);

  useEffect(() => {
    if (!dish) return;
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((response) => {
        const found = response.data.find((c) => c.id === dish.category_id);
        setCategory(found);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [dish]);

  if (!dish) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="bg-brand-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-6 md:pt-8 pb-2">
          <Link
            to="/menu"
            className="text-brand-black hover:text-brand-red flex items-center gap-2 text-sm font-body w-fit transition-colors duration-200"
          >
            <ArrowLeft size={16} /> Retour au menu
          </Link>
        </div>
      </div>

      <div className="bg-brand-cream">
        <div className="flex flex-col-reverse md:flex-row gap-8 text-brand-black font-heading p-6 md:p-12 pt-2 max-w-5xl mx-auto">
          <Reveal as="div" className="w-full md:w-1/2">
            {dish.model_3d_url && show3D && modelViewerReady ? (
              <model-viewer
                src={resolveUrl(dish.model_3d_url)}
                camera-controls
                auto-rotate
                ar
                ar-modes="webxr scene-viewer quick-look"
                style={{ width: "100%", height: "400px" }}
                className="rounded-lg shadow-md mb-4"
              ></model-viewer>
            ) : dish.model_3d_url && show3D ? (
              <div
                style={{ height: "400px" }}
                className="rounded-lg shadow-md mb-4 bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              >
                Chargement du modèle 3D...
              </div>
            ) : (
              <img
                src={resolveUrl(dish.image_url)}
                alt={dish.name}
                loading="eager"
                decoding="async"
                className="w-full h-96 md:h-125 object-cover rounded-lg shadow-md mb-4"
              />
            )}

            {/* Only show the toggle when this dish actually has a 3D model */}
            {dish.model_3d_url && (
              <button
                type="button"
                onClick={() => setShow3D((prev) => !prev)}
                className="bg-brand-red text-white font-body uppercase text-sm px-5 py-2 rounded w-full hover:bg-brand-black hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                {show3D ? "voir la photo" : "voir en 3D"}
              </button>
            )}
          </Reveal>

          <Reveal
            as="div"
            delay={120}
            className="w-full md:w-1/2 pl-0 md:pl-8 pt-0 md:pt-12"
          >
            <span className="bg-brand-red text-white text-xs font-body uppercase px-3 py-1 rounded-full inline-block mb-4">
              {category?.name}
            </span>
            <h3 className="font-heading uppercase text-brand-black font-bold text-3xl mb-6">
              {dish.name}
            </h3>
            <h4 className="font-bold uppercase text-brand-black text-lg mb-2">
              ingredients :
            </h4>
            <p className="text-sm text-gray-600 mt-1 mb-8">
              {dish.description}
            </p>
            <div className="flex gap-4 mb-2 flex-wrap">
              {dish.prices.map((price) => (
                <div
                  key={price.label}
                  className="text-lg bg-white border border-gray-200 rounded px-3 py-1"
                >
                  <p className="text-gray-500">{price.label}</p>
                  <p className="text-brand-red font-semibold">
                    {price.price} DA
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DishDetail;
