import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../services/api.service.js";

/* ======================================================
   EDIT RECIPE – MODAL (FULL UX VERSION)
====================================================== */
export default function EditRecipe({ open, recipe, onClose, onSaved }) {
  if (!open) return null;

  /* =====================
     BASIC FIELDS
  ===================== */
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("plat");

  /* =====================
     INGREDIENTS
  ===================== */
  const [allIngredients, setAllIngredients] = useState([]);
  const [ingredientRows, setIngredientRows] = useState([]);

  // ➕ ingrédient manquant
  const [newIngredientName, setNewIngredientName] = useState("");
  const [addingIngredient, setAddingIngredient] = useState(false);

  /* =====================
     MEDIAS (ŒUVRES)
  ===================== */
  const [allMedias, setAllMedias] = useState([]);
  const [selectedMedias, setSelectedMedias] = useState([]);

  /* =====================
     IMAGE
  ===================== */
  const [newImageFile, setNewImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!newImageFile) return null;
    return URL.createObjectURL(newImageFile);
  }, [newImageFile]);

  /* =====================
     UI STATES
  ===================== */
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  /* =====================
     CLEANUP
  ===================== */
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /* =====================
     INIT FORM
  ===================== */
  useEffect(() => {
    if (!recipe) return;

    setTitle(recipe.title ?? "");
    setInstructions(recipe.instructions ?? "");
    setTime(recipe.time != null ? String(recipe.time) : "");
    setDifficulty(recipe.difficulty != null ? String(recipe.difficulty) : "");
    setCategory(recipe.category ?? "plat");
    setNewImageFile(null);
    setError(null);

    const normalizedIngredients = (recipe.ingredients || []).map((ing) => {
      const through =
        ing.RecipeHasIngredient || ing.recipe_has_ingredient || {};
      return {
        ingredient_id: ing.id,
        quantity: through.quantity ?? 1,
        unit: through.unit ?? "",
      };
    });

    setIngredientRows(normalizedIngredients);
    setSelectedMedias((recipe.seen_in_medias || []).map((m) => m.id));
  }, [recipe]);

  /* =====================
     LOAD INGREDIENTS + MEDIAS
  ===================== */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [ings, medias] = await Promise.all([
          api.getAllIngredients(),
          api.getAllMedias(),
        ]);

        setAllIngredients(Array.isArray(ings) ? ings : []);
        setAllMedias(Array.isArray(medias) ? medias : []);
      } catch (err) {
        console.error(err);
        setError("Erreur de chargement.");
      }
    };

    loadData();
  }, []);

  /* =====================
     INGREDIENT HELPERS
  ===================== */
  const addIngredientRow = () => {
    setIngredientRows((prev) => [
      ...prev,
      {
        ingredient_id: allIngredients[0]?.id ?? "",
        quantity: 1,
        unit: "",
      },
    ]);
  };

  const removeIngredientRow = (index) => {
    setIngredientRows((prev) => prev.filter((_, i) => i !== index));
  };

  const updateIngredientRow = (index, patch) => {
    setIngredientRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  };

  const handleCreateIngredient = async () => {
    if (!newIngredientName.trim()) return;

    try {
      setAddingIngredient(true);
      const created = await api.createIngredient({
        name: newIngredientName.trim(),
      });

      setAllIngredients((prev) => [...prev, created]);
      setIngredientRows((prev) => [
        ...prev,
        { ingredient_id: created.id, quantity: 1, unit: "" },
      ]);

      setNewIngredientName("");
    } catch (err) {
      console.error(err);
      setError("Impossible d’ajouter l’ingrédient.");
    } finally {
      setAddingIngredient(false);
    }
  };

  /* =====================
     IMAGE HANDLERS
  ===================== */
  const validateAndSetImage = (file) => {
    if (!file) return;

    const maxMb = 5;
    if (file.size > maxMb * 1024 * 1024) {
      setError(`Image trop lourde (max ${maxMb}MB).`);
      return;
    }

    setError(null);
    setNewImageFile(file);
  };

  /* =====================
     MEDIAS
  ===================== */
  const toggleMedia = (id) => {
    setSelectedMedias((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipe?.id) return;

    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("instructions", instructions);
      formData.append("time", time);
      formData.append("difficulty", difficulty);
      formData.append("category", category);
      formData.append("ingredients", JSON.stringify(ingredientRows));
      formData.append("medias_ids", JSON.stringify(selectedMedias));

      if (newImageFile) {
        formData.append("image", newImageFile);
      }

      await api.updateRecipe(recipe.id, formData);

      onSaved?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================
     RENDER
  ===================== */
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#E8650A]">
            ✏️ Modifier la recette
          </h2>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-4 mb-4 rounded-xl bg-red-50 text-red-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* INFORMATIONS */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-[#E8650A]">
              📝 Informations générales
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="Titre"
                required
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-xl px-3 py-2"
              >
                <option value="entree">Entrée</option>
                <option value="plat">Plat</option>
                <option value="dessert">Dessert</option>
                <option value="boisson">Boisson</option>
                <option value="accompagnement">Accompagnement</option>
              </select>

              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="Temps (min)"
              />

              <input
                type="number"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border rounded-xl px-3 py-2"
                placeholder="Difficulté (0–5)"
              />
            </div>
          </section>

          {/* IMAGE */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#E8650A]">
              🖼️ Image
            </h3>

            <div
              className="
                border-2 border-dashed rounded-2xl p-6
                bg-gray-50 text-center cursor-pointer
                hover:border-[#E8650A] transition
              "
              onClick={() => fileInputRef.current.click()}
              onDrop={(e) => {
                e.preventDefault();
                validateAndSetImage(e.dataTransfer.files?.[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    className="mx-auto max-h-56 rounded-xl shadow"
                  />
                  <p className="mt-2 text-sm text-[#E8650A] font-semibold">
                    Nouvelle image sélectionnée
                  </p>
                </>
              ) : recipe?.img_url ? (
                <>
                  <img
                    src={recipe.img_url}
                    className="mx-auto max-h-56 rounded-xl shadow"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Image actuelle — cliquez ou glissez pour la remplacer
                  </p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-2">📷</div>
                  <p className="font-semibold">
                    Glissez une image ici
                  </p>
                  <p className="text-sm text-gray-500">
                    ou cliquez pour parcourir
                  </p>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  validateAndSetImage(e.target.files?.[0])
                }
              />
            </div>
          </section>

          {/* INSTRUCTIONS */}
          <section>
            <h3 className="text-xl font-bold text-[#E8650A]">
              📖 Instructions
            </h3>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 min-h-[150px]"
            />
          </section>

          {/* INGREDIENTS */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-[#E8650A]">
              🧂 Ingrédients
            </h3>

            {ingredientRows.map((row, idx) => (
              <div key={idx} className="grid md:grid-cols-5 gap-2">
                <select
                  value={row.ingredient_id}
                  onChange={(e) =>
                    updateIngredientRow(idx, {
                      ingredient_id: Number(e.target.value),
                    })
                  }
                  className="border rounded-xl px-2 py-1 md:col-span-2"
                >
                  {allIngredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    updateIngredientRow(idx, { quantity: e.target.value })
                  }
                  className="border rounded-xl px-2 py-1"
                />

                <input
                  value={row.unit}
                  onChange={(e) =>
                    updateIngredientRow(idx, { unit: e.target.value })
                  }
                  className="border rounded-xl px-2 py-1"
                  placeholder="g, ml…"
                />

                <button
                  type="button"
                  onClick={() => removeIngredientRow(idx)}
                  className="bg-red-100 text-red-700 rounded-xl px-3"
                >
                  Supprimer
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addIngredientRow}
              className="px-4 py-1 rounded-full bg-gray-200"
            >
              + Ajouter un ingrédient
            </button>

            <div className="flex gap-2">
              <input
                value={newIngredientName}
                onChange={(e) => setNewIngredientName(e.target.value)}
                placeholder="Ingrédient manquant ?"
                className="border rounded-xl px-3 py-2 flex-1"
              />
              <button
                type="button"
                onClick={handleCreateIngredient}
                disabled={addingIngredient}
                className="px-4 py-2 rounded-full bg-[#E8650A] text-white font-bold"
              >
                ➕ Ajouter
              </button>
            </div>
          </section>

          {/* ŒUVRES ASSOCIÉES */}
          <section>
            <h3 className="text-xl font-bold text-[#E8650A]">
              🎬 Œuvres associées
            </h3>

            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {allMedias.map((m) => (
                <label
                  key={m.id}
                  className="flex gap-2 items-center border rounded-xl px-3 py-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedMedias.includes(m.id)}
                    onChange={() => toggleMedia(m.id)}
                  />
                  {m.title}
                </label>
              ))}
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-gray-200"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-full bg-orange-600 text-white font-bold"
            >
              {saving ? "Sauvegarde…" : "Sauvegarder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
