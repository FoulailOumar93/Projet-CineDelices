import { useEffect, useState } from "react";
import { api } from "../services/api.service";

export default function AdminValidation() {
  const [medias, setMedias] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH ALL PENDING
  ========================= */
  const loadPending = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        pendingMedias,
        pendingRecipes,
        pendingIngredients,
      ] = await Promise.all([
        api.getPendingMedias(),
        api.getPendingRecipes(),
        api.getPendingIngredients(),
      ]);

      setMedias(Array.isArray(pendingMedias) ? pendingMedias : []);
      setRecipes(Array.isArray(pendingRecipes) ? pendingRecipes : []);
      setIngredients(
        Array.isArray(pendingIngredients) ? pendingIngredients : []
      );
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des validations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  /* =========================
     ACTIONS
  ========================= */
  const validateMedia = async (id) => {
    await api.validateMedia(id);
    setMedias((prev) => prev.filter((m) => m.id !== id));
  };

  const rejectMedia = async (id) => {
    await api.deleteMedia(id);
    setMedias((prev) => prev.filter((m) => m.id !== id));
  };

  const validateRecipe = async (id) => {
    await api.validateRecipe(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const rejectRecipe = async (id) => {
    await api.deleteRecipe(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const validateIngredient = async (id) => {
    await api.validateIngredient(id);
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const rejectIngredient = async (id) => {
    await api.deleteIngredient(id);
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  /* =========================
     UI STATES
  ========================= */
  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-[#E8650A]">
        Chargement des validations…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 font-bold text-red-600">
        {error}
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 space-y-14">

      {/* ================= ŒUVRES ================= */}
      <Block
        title="🎬 Validation des œuvres"
        empty="Aucune œuvre en attente."
        items={medias}
        onValidate={validateMedia}
        onReject={rejectMedia}
        render={(m) => (
          <>
            <p className="font-bold">{m.title}</p>
            <p className="text-sm text-gray-500">{m.category}</p>
          </>
        )}
      />

      {/* ================= RECETTES ================= */}
      <Block
        title="🍽️ Validation des recettes"
        empty="Aucune recette en attente."
        items={recipes}
        onValidate={validateRecipe}
        onReject={rejectRecipe}
        render={(r) => (
          <>
            <p className="font-bold">{r.title}</p>
            <p className="text-sm text-gray-500">{r.category}</p>
          </>
        )}
      />

      {/* ================= INGRÉDIENTS ================= */}
      <Block
        title="🧂 Validation des ingrédients"
        empty="Aucun ingrédient en attente."
        items={ingredients}
        onValidate={validateIngredient}
        onReject={rejectIngredient}
        render={(i) => (
          <>
            <p className="font-bold">{i.name}</p>
            <p className="text-sm text-gray-500">
              Profil : {i.culinary_profile || "—"}
            </p>
          </>
        )}
      />
    </section>
  );
}

/* =========================
   GENERIC BLOCK
========================= */
function Block({
  title,
  empty,
  items,
  onValidate,
  onReject,
  render,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 italic">{empty}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border rounded-xl p-4"
            >
              <div>{render(item)}</div>

              <div className="flex gap-3">
                <button
                  onClick={() => onValidate(item.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-full font-bold"
                >
                  Valider
                </button>
                <button
                  onClick={() => onReject(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full font-bold"
                >
                  Refuser
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}