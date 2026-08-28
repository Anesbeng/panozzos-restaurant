import React from "react";

const Footer = () => {
  return (
    <div className="bg-brand-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 md:p-12">
      <div className="text-white font-body text-sm">
        <div className="font-heading text-2xl text-white uppercase">
          Panozzo's <span className="text-brand-red">Pizza & Crêpe</span>
        </div>
        <p className="mt-4">
          Pizzeria · Restaurant · Cafétéria à Tlemcen. Le plaisir se trouve dans
          nos assiettes.
        </p>
      </div>
      <div className="text-white font-body text-sm">
        <h2 className="font-heading text-xl text-brand-red uppercase mb-4">
          HORAIRES
        </h2>
        <p className="mb-2 font-semibold ">7j/7 · 11h30 – 00h00</p>
      </div>
      <div className="text-white font-body text-sm">
        <h2 className="font-heading text-xl text-brand-red uppercase mb-4">
          PANOZZO IMAMA
        </h2>
        <p className="mb-2  font-body">Imama, Mansourah, Tlemcen</p>
        <p className="mb-2  font-body">Téléphone : +213 670 22 76 84</p>
        <p className="mb-2  font-body">Téléphone : +213 795 00 32 39</p>
      </div>
      <div className="text-white font-body text-sm">
        <h2 className="font-heading text-xl text-brand-red uppercase mb-4">
          PANOZZO KIFFEN
        </h2>
        <p className="mb-2 font-semibold ">Imama, Mansourah, Tlemcen</p>
        <p className="mb-2 font-semibold ">Téléphone : +213 558 88 50 39</p>
      </div>
    </div>
  );
};

export default Footer;
