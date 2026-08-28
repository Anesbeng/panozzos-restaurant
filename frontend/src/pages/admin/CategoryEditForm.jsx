import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const CategoryEditForm = () => {
  const [name, setName] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const loadcategory = () =>
    fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setName(data.data.name || "");
        }
      })
      .catch((err) => console.error("Error fetching dish details:", err));

  useEffect(() => {
    loadcategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://127.0.0.1:8000/api/admin/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      },
    );

    if (!res.ok) {
      console.error("Update failed:", await res.text());
      alert("Erreur lors de la mise à jour.");
      return;
    }

    navigate("/admin/categories/all");
  };

  return (
    <div className="min-h-screen bg-brand-cream p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 max-w-md mx-auto"
      >
        <h1 className="font-heading text-2xl mb-6">Edit Category</h1>
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-6"
          required
        />
        <button className="w-full bg-brand-red text-white uppercase text-sm py-3 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoryEditForm;
