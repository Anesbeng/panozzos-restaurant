import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/AdminLayout";
import { X } from "lucide-react";
import { API_BASE } from "../../config";

const DishForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const { token } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: "",
    is_featured: false,
  });
  const [prices, setPrices] = useState([{ label: "", price: "" }]);
  const [image, setImage] = useState(null);
  const [model3d, setModel3d] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch((err) => console.error("Error fetching categories:", err));

    if (isEdit) {
      fetch(`${API_BASE}/admin/dishes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setForm({
              name: data.data.name || "",
              description: data.data.description || "",
              category_id: data.data.category_id || "",
              is_featured: !!data.data.is_featured,
            });
            setPrices(
              data.data.prices?.length > 0
                ? data.data.prices
                : [{ label: "", price: "" }],
            );
          }
        })
        .catch((err) => console.error("Error fetching dish:", err));
    }
  }, [id, isEdit, token]);

  const handlePriceChange = (index, field, value) => {
    const updated = [...prices];
    updated[index][field] = value;
    setPrices(updated);
  };

  const addPriceRow = () => setPrices([...prices, { label: "", price: "" }]);
  const removePriceRow = (index) => {
    if (prices.length > 1) setPrices(prices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(
        key,
        key === "is_featured" ? (value ? "1" : "0") : (value ?? ""),
      );
    });

    prices.forEach((p, i) => {
      formData.append(`prices[${i}][label]`, p.label);
      formData.append(`prices[${i}][price]`, p.price);
    });

    if (image) formData.append("image", image);
    if (model3d) formData.append("model_3d", model3d);
    if (isEdit) formData.append("_method", "PUT");

    const url = isEdit
      ? `${API_BASE}/admin/dishes/${id}`
      : `${API_BASE}/admin/dishes`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 422) {
          const err = await res.json();
          const messages = Object.entries(err.errors || {})
            .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
            .join("\n");
          alert(`Validation échouée:\n\n${messages || err.message}`);
        } else if (res.status === 401) {
          alert("Session expirée, merci de vous reconnecter.");
        } else {
          alert(`Erreur serveur (${res.status}).`);
        }
        return;
      }

      navigate("/admin/dashboard");
    } catch (networkError) {
      console.error("Network error:", networkError);
      alert("Impossible de contacter le serveur.");
    }
  };

  return (
    <AdminLayout title={isEdit ? "Modifier le plat" : "Nouveau plat"}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-5 md:p-8 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nom
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-red"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Catégorie
            </label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-red"
              required
            >
              <option value="">Choisir…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-600 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-6 focus:outline-none focus:border-brand-red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-cream file:text-brand-black file:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Modèle 3D (.glb, optionnel)
            </label>
            <input
              type="file"
              accept=".glb,.gltf"
              onChange={(e) => setModel3d(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-cream file:text-brand-black file:text-sm"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 mb-8 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) =>
              setForm({ ...form, is_featured: e.target.checked })
            }
            className="accent-brand-red"
          />
          <span className="text-sm text-gray-600">
            Mettre en avant (best-seller)
          </span>
        </label>

        <h3 className="text-sm font-semibold text-brand-black mb-3">Prix</h3>
        <div className="flex flex-col gap-3 mb-2">
          {prices.map((p, i) => (
            <div key={i} className="flex gap-2 sm:gap-3 items-center">
              <input
                placeholder="Label (M, XL...)"
                value={p.label}
                onChange={(e) => handlePriceChange(i, "label", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-1/2 focus:outline-none focus:border-brand-red"
                required
              />
              <input
                placeholder="Prix"
                type="number"
                value={p.price}
                onChange={(e) => handlePriceChange(i, "price", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-1/2 focus:outline-none focus:border-brand-red"
                required
              />
              {prices.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePriceRow(i)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPriceRow}
          className="text-brand-red text-sm mb-8 hover:underline"
        >
          + Ajouter un prix
        </button>

        <button
          type="submit"
          className="w-full bg-brand-red text-white uppercase text-sm font-semibold py-3 rounded-lg hover:bg-brand-black transition"
        >
          Enregistrer
        </button>
      </form>
    </AdminLayout>
  );
};

export default DishForm;
