import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />

      <div className="bg-brand-black text-white font-heading p-6 md:p-12">
        <Reveal>
          <h5 className="text-brand-red text-lg mb-2">ON VOUS ÉCOUTE</h5>
          <h1 className="font-bold text-4xl md:text-5xl mb-2">CONTACT</h1>
          <p className="text-gray-300">
            Une question, une réservation, une remarque ? Écrivez-nous.
          </p>
        </Reveal>
      </div>

      <div className="bg-brand-cream font-body p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-2xl text-brand-black font-bold mb-6">
              ENVOYEZ-NOUS UN MESSAGE
            </h2>

            {submitted ? (
              <p className="text-brand-red font-semibold">
                Merci ! Votre message a bien été envoyé.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-red"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-red"
                />
                <textarea
                  name="message"
                  placeholder="Votre message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-red"
                />
                <button
                  type="submit"
                  className="bg-brand-red text-white font-body uppercase text-sm px-5 py-3 rounded hover:bg-brand-black transition duration-300"
                >
                  Envoyer
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-heading text-2xl text-brand-black font-bold mb-6">
              NOS COORDONNÉES
            </h2>

            <div className="mb-6">
              <h3 className="font-heading text-lg text-brand-red mb-2">
                PANOZZO IMAMA
              </h3>
              <p className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-brand-red" /> Imama,
                Mansourah, Tlemcen
              </p>
              <p className="flex items-center gap-2 mb-1">
                <Phone size={16} className="text-brand-red" /> 0795 00 32 39
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-brand-red" /> 7j/7 · 11h30 –
                00h00
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-heading text-lg text-brand-red mb-2">
                PANOZZO KIFFEN
              </h3>
              <p className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-brand-red" /> Kiffen, Tlemcen
              </p>
              <p className="flex items-center gap-2 mb-1">
                <Phone size={16} className="text-brand-red" /> 0558 88 50 39
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-brand-red" /> 7j/7 · 11h30 –
                00h00
              </p>
            </div>

            <iframe
              title="Panozzo's location"
              src="https://www.google.com/maps?q=Panozzo's+Tlemcen&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
