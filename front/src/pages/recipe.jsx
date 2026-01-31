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

/* =========================
   UI CONFIG — ŒUVRES
========================= */
const MEDIA_BADGE_UI = {
  film: { label: "Film", color: "bg-red-600 text-white" },
  serie: { label: "Série", color: "bg-blue-600 text-white" },
  animation: { label: "Animation", color: "bg-teal-600 text-white" },
  manga: { label: "Manga", color: "bg-purple-600 text-white" },
};

const normalize = (v) =>
  v?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* =========================
   FRACTIONS PROPRES
========================= */
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

  /* =========================
     FETCH DATA
  ========================= */
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

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    await api.deleteRecipe(id);
    navigate("/recipes");
  };

  /* =========================
     NAVIGATION
  ========================= */
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

        {/* IMAGE (OPTIONNELLE) */}
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

        {/* ACTIONS — TOUJOURS VISIBLES SI CONNECTÉ */}
        {token && (
          <div className="flex justify-center gap-3 mb-6">
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
        <h1 className="text-3xl font-bold text-center text-[#E8650A] mb-4">
          {recipe.title}
        </h1>

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

        {/* ŒUVRES ASSOCIÉES */}
        <section>
          <h2 className="text-2xl font-bold text-[#E8650A] mb-4">
            🎬 Œuvres associées
          </h2>

          {medias.length === 0 ? (
            <p className="italic text-gray-500">
              Aucune œuvre associée à cette recette.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {medias.map((media) => {
                const mediaImg = media.img_url
                  ? media.img_url.startsWith("/img")
                    ? `${BASE_URL}${media.img_url}`
                    : `${BASE_URL}/img/${media.img_url}`
                  : null;

                const badge = MEDIA_BADGE_UI[normalize(media.category)];

                return (
                  <Link
                    key={media.id}
                    to={`/medias/${media.id}`}
                    className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
                  >
                    <div className="relative aspect-square">
  {mediaImg && (
    <img
      src={mediaImg}
      alt={media.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}

                      {badge && (
                        <span
                          className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      )}
                    </div>

                    <div className="p-4 font-bold text-[#E8650A]">
                      {media.title}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* MODALES */}
      <EditRecipe
        open={isEditing}
        recipe={recipe}
        onClose={() => setIsEditing(false)}
        onSaved={fetchData}
      />

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="mb-4 font-bold">Supprimer cette recette ?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowDelete(false)}>Annuler</button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
