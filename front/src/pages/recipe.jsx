import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EditRecipe from "../components/editRecipe";
import { api } from "../services/api.service";

/* =========================
   UI CONFIG — RECETTES
========================= */
const CATEGORY_UI = {
  entree: { label: "Entrée", color: "bg-green-100 text-green-700" },
  plat: { label: "Plat", color: "bg-orange-100 text-orange-700" },
  dessert: { label: "Dessert", color: "bg-pink-100 text-pink-700" },
  boisson: { label: "Boisson", color: "bg-blue-100 text-blue-700" },
};

const MEDIA_BADGE_UI = {
  film: { label: "Film", color: "bg-red-600 text-white" },
  serie: { label: "Série", color: "bg-blue-600 text-white" },
  animation: { label: "Animation", color: "bg-teal-600 text-white" },
  manga: { label: "Manga", color: "bg-purple-600 text-white" },
};

const normalize = (v) =>
  v?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const formatQuantity = (value) => {
  if (value == null) return "";
  const map = {
    0.125: "⅛",
    0.25: "¼",
    0.333: "⅓",
    0.5: "½",
    0.75: "¾",
  };
  return map[value] || value;
};

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [recipeData, recipesList] = await Promise.all([
        api.getRecipeById(id),
        api.getAllRecipes(),
      ]);

      setRecipe(recipeData);
      setAllRecipes(recipesList || []);
      setCurrentIndex(
        recipesList.findIndex((r) => String(r.id) === String(id))
      );
    } catch (err) {
      console.error(err);
      setError("Recette introuvable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await api.deleteRecipe(id);
    navigate("/recipes");
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      navigate(`/recipes/${allRecipes[currentIndex - 1].id}`);
    }
  };

  const goNext = () => {
    if (currentIndex < allRecipes.length - 1) {
      navigate(`/recipes/${allRecipes[currentIndex + 1].id}`);
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement…</p>;
  if (error || !recipe)
    return <p className="text-center text-red-600">{error}</p>;

  const ui = CATEGORY_UI[normalize(recipe.category)];

  const recipeImg = recipe.img_url
    ? recipe.img_url.startsWith("/img")
      ? `${BASE_URL}${recipe.img_url}`
      : `${BASE_URL}/img/${recipe.img_url}`
    : null;

  const medias = recipe.seen_in_medias || [];

  return (
    <main className="bg-[#FFFBEF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* IMAGE */}
        {recipeImg && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow">
              <img
                src={recipeImg}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex justify-between mb-6">
          <button
            onClick={goPrev}
            disabled={currentIndex <= 0}
            className="px-4 py-2 rounded-full bg-gray-100 disabled:opacity-40"
          >
            ⬅️ Précédent
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex >= allRecipes.length - 1}
            className="px-4 py-2 rounded-full bg-gray-100 disabled:opacity-40"
          >
            Suivant ➡️
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-[#E8650A] mb-2">
          {recipe.title}
        </h1>

        {/* ACTIONS SOUS LE TITRE */}
        {token && (
          <div className="flex justify-center gap-3 mt-4 mb-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-full bg-[#E8650A] text-white font-bold"
            >
              ✏️ Modifier
            </button>

            <button
              onClick={() => setShowDelete(true)}
              className="px-5 py-2 rounded-full bg-red-100 text-red-700 font-bold"
            >
              🗑 Supprimer
            </button>
          </div>
        )}

        {/* META */}
        <div className="flex justify-center gap-3 mb-6 text-sm">
          {ui && (
            <span className={`px-3 py-1 rounded-full ${ui.color}`}>
              {ui.label}
            </span>
          )}
          {recipe.time && <span>⏱ {recipe.time} min</span>}
          {recipe.difficulty && (
            <span>🔥 Difficulté {recipe.difficulty}</span>
          )}
        </div>

        {/* INGREDIENTS */}
        <section className="bg-white rounded-xl p-4 shadow mb-6">
          <h2 className="font-bold mb-3">Ingrédients</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Ingrédient</th>
                <th>Quantité</th>
                <th>Unité</th>
              </tr>
            </thead>
            <tbody>
              {recipe.ingredients?.map((ing) => {
                const link = ing.RecipeHasIngredient || {};
                return (
                  <tr key={ing.id} className="border-b">
                    <td>{ing.name}</td>
                    <td>{formatQuantity(link.quantity)}</td>
                    <td>{link.unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* INSTRUCTIONS */}
        <section className="bg-white rounded-xl p-4 shadow mb-10">
          <h2 className="font-bold mb-3">Instructions</h2>
          <table className="w-full">
            <tbody>
              {recipe.instructions
                ?.split("\n")
                .filter(Boolean)
                .map((step, i) => (
                  <tr key={i} className="border-b">
                    <td className="font-bold pr-4">{i + 1}</td>
                    <td>{step}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

      </div>

      <EditRecipe
        open={isEditing}
        recipe={recipe}
        onClose={() => setIsEditing(false)}
        onSaved={fetchData}
      />
    </main>
  );
}
