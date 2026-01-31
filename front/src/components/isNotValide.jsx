import { useEffect, useState } from "react";
import { api } from "../services/api.service";

const IsNotValide = () => {
  /* =========================
     STATES
  ========================= */
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  /* =========================
     FETCH ALL PENDING
  ========================= */
  const fetchData = async () => {
    try {
      const [ingredientsData, recipesData] = await Promise.all([
        api.getNotValidIngredients(),
        api.getPendingRecipes(),
      ]);

      setIngredients(ingredientsData || []);
      setRecipes(recipesData || []);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des validations");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================
     VALIDATE INGREDIENT
  ========================= */
  const handleValidateIngredient = async (id) => {
    try {
      await api.validateIngredient(id);
      setIngredients((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur validation ingrédient");
    }
  };

  /* =========================
     VALIDATE RECIPE
  ========================= */
  const handleValidateRecipe = async (id) => {
    try {
      await api.validateRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur validation recette");
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <section className="bg-white rounded-3xl p-8 shadow-lg space-y-10">

      <h2 className="text-2xl font-bold text-red-600">
        🛠️ Espace Admin – Validations
      </h2>

      {error && <p className="text-red-500 font-bold">{error}</p>}

      {/* ================= INGREDIENTS ================= */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-[#E8650A]">
          🧂 Ingrédients à valider
        </h3>

        {ingredients.length === 0 ? (
          <p className="text-gray-500">Aucun ingrédient en attente</p>
        ) : (
          <ul className="space-y-3">
            {ingredients.map((ing) => (
              <li
                key={ing.id}
                className="flex justify-between items-center border rounded-xl p-3"
              >
                <span className="font-semibold">
                  {ing.name}
                  {ing.culinary_profile && ` (${ing.culinary_profile})`}
                </span>

                <button
                  onClick={() => handleValidateIngredient(ing.id)}
                  className="bg-green-600 text-white px-4 py-1 rounded-full font-bold"
                >
                  Valider
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= RECIPES ================= */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-[#E8650A]">
          🍽️ Recettes à valider
        </h3>

        {recipes.length === 0 ? (
          <p className="text-gray-500">Aucune recette en attente</p>
        ) : (
          <ul className="space-y-3">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="flex justify-between items-center border rounded-xl p-3"
              >
                <div>
                  <p className="font-semibold">{recipe.title}</p>
                  <p className="text-sm text-gray-500">
                    Catégorie : {recipe.category || "—"}
                  </p>
                </div>

                <button
                  onClick={() => handleValidateRecipe(recipe.id)}
                  className="bg-green-600 text-white px-4 py-1 rounded-full font-bold"
                >
                  Valider
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </section>
  );
};

export default IsNotValide;