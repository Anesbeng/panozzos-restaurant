import React from "react";
import { Link } from "react-router-dom";
import { resolveUrl } from "../utils/resolveUrl";
const DishCard = ({
  id,
  name,
  description,
  image_url,
  model_3d_url,
  prices,
  categoryName,
}) => {
  return (
    <Link to={`/dish/${id}`}>
      <div className="bg-brand-cream rounded-lg overflow-hidden shadow-md max-w-xs mx-auto hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <div className="relative">
          <img
            src={resolveUrl(image_url)}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-40 object-cover hover:scale-105 transition duration-300"
          />

          <span className="absolute top-3 left-3 bg-brand-black text-white text-xs uppercase px-3 py-1 rounded">
            {categoryName}
          </span>

          {model_3d_url && (
            <span className="absolute top-3 right-3 bg-brand-red text-white text-xs uppercase px-3 py-1 rounded">
              3D
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading uppercase text-brand-black text-lg">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 mb-3">{description}</p>

          <div className="flex gap-2">
            {prices.map((p) => (
              <div
                key={p.label}
                className="text-sm bg-white border border-gray-200 rounded px-3 py-1"
              >
                <span className="text-gray-500">{p.label}</span>{" "}
                <span className="text-brand-red font-semibold">
                  {p.price} DA
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
