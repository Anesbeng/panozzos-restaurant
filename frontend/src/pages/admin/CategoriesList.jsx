import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/AdminLayout";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { API_BASE } from "../../config";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();

  const loadCategories = () => {
    fetch(`${API_BASE}/admin/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await fetch(`${API_BASE}/admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    loadCategories();
  };

  return (
    <AdminLayout title="Catégories">
      <div className="flex justify-end mb-6">
        <Link
          to="/admin/categories/new"
          className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-lg uppercase text-sm font-body hover:bg-brand-black transition"
        >
          <Plus size={16} /> Nouvelle catégorie
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto max-w-2xl">
        <table className="w-full text-sm min-w-[420px]">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="p-4 font-medium">Nom</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={2} className="p-6 text-center text-gray-400">
                  Aucune catégorie.
                </td>
              </tr>
            )}
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-brand-black">{cat.name}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-4">
                    <Link
                      to={`/admin/categories/${cat.id}`}
                      className="flex items-center gap-1 text-brand-red hover:underline text-sm"
                    >
                      <Pencil size={14} /> Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-red-600 text-sm"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default CategoriesList;
