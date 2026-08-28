import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/AdminLayout";
import { Plus, Pencil, Trash2 } from "lucide-react";

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();

  const loadData = () => {
    fetch("http://127.0.0.1:8000/api/admin/dishes", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDishes(data.data || []));

    fetch("http://127.0.0.1:8000/api/admin/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || "—";

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce plat ?")) return;
    await fetch(`http://127.0.0.1:8000/api/admin/dishes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadData();
  };

  return (
    <AdminLayout title="Plats">
      <div className="flex justify-end mb-6">
        <Link
          to="/admin/dishes"
          className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-lg uppercase text-sm font-body hover:bg-brand-black transition"
        >
          <Plus size={16} /> Nouveau plat
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="p-4 font-medium">Nom</th>
              <th className="p-4 font-medium">Catégorie</th>
              <th className="p-4 font-medium">3D</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  Aucun plat pour le moment.
                </td>
              </tr>
            )}
            {dishes.map((dish) => (
              <tr
                key={dish.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-brand-black">
                  {dish.name}
                </td>
                <td className="p-4">
                  <span className="bg-brand-cream text-brand-black text-xs px-2 py-1 rounded-full">
                    {categoryName(dish.category_id)}
                  </span>
                </td>
                <td className="p-4">
                  {dish.model_3d_url ? (
                    <span className="text-brand-red text-xs font-semibold">
                      ✓ Oui
                    </span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-4">
                    <Link
                      to={`/admin/dishes/${dish.id}`}
                      className="flex items-center gap-1 text-brand-red hover:underline text-sm"
                    >
                      <Pencil size={14} /> Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(dish.id)}
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

export default Dashboard;
