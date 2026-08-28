import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/AdminLayout";

const CategoryForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [name, setName] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setName(data.data?.name || ""))
      .catch((err) => console.error("Error fetching category:", err));
  }, [id, isEdit, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEdit
      ? `http://127.0.0.1:8000/api/admin/categories/${id}`
      : "http://127.0.0.1:8000/api/admin/categories";

    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      alert("Erreur lors de l'enregistrement.");
      return;
    }
    navigate("/admin/categories/all");
  };

  return (
    <AdminLayout
      title={isEdit ? "Modifier la catégorie" : "Nouvelle catégorie"}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-8 max-w-md"
      >
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Nom de la catégorie
        </label>
        <input
          placeholder="ex. Tacos"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-6 focus:outline-none focus:border-brand-red"
          required
        />
        <button className="w-full bg-brand-red text-white uppercase text-sm font-semibold py-3 rounded-lg hover:bg-brand-black transition">
          Enregistrer
        </button>
      </form>
    </AdminLayout>
  );
};

export default CategoryForm;
