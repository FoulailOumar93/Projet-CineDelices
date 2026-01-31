import { useEffect, useRef, useState } from "react";
import { api } from "../services/api.service";

/* =====================
   CONSTANTES
===================== */
const UNITS = [
  // Poids
  "g",
  "kg",

  // Volume
  "ml",
  "cl",
  "dl",
  "l",

  // Mesures cuisine
  "cuillère à café",
  "cuillère à soupe",
  "verre",
  "tasse",

  // Portions / pièces
  "pièce",
  "tranche",
  "filet",
  "gousse",
  "branche",

  // Usage courant
  "pincée",
  "poignée",
  "bouquet",
  "sachet",
  "boîte",
  "bol",
];


const CATEGORIES = [
  { value: "entree", label: "Entrée" },
  { value: "plat", label: "Plat" },
  { value: "dessert", label: "Dessert" },
  { value: "boisson", label: "Boisson" },
  { value: "accompagnement", label: "Accompagnement" },
];

const emptyIngredient = {
  id: "",
  quantity: "",
  unit: "",
  is_new: false,
  name: "",
};

export default function AddRecipe({ open, onClose, onRecipeAdded }) {
  if (!open) return null;

  /* =====================
     STATES
  ===================== */
  const [ingredientsList, setIngredientsList] = useState([]);
  const [mediasList, setMediasList] = useState([]);

  const [selectedMedias, setSelectedMedias] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* IMAGE */
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  /* FORM */
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    time: "",
    difficulty: 3,
    instructions: "",
    ingredients: [{ ...emptyIngredient }],
  });

  /* =====================
     FETCH DATA
  ===================== */
  useEffect(() => {
    if (!open) return;

    const fetchAll = async () => {
      try {
        const [ings, medias] = await Promise.all([
          api.getAllIngredients(),
          api.getAllMedias(),
        ]);

        setIngredientsList(Array.isArray(ings) ? ings : []);
        setMediasList(Array.isArray(medias) ? medias : []);
      } catch {
        setError("Erreur lors du chargement des données");
      }
    };

    fetchAll();
  }, [open]);

  /* =====================
     HANDLERS FORM
  ===================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredients];

    if (field === "id") {
      updated[index] =
        value === "new"
          ? { ...emptyIngredient, is_new: true }
          : { ...updated[index], id: Number(value), is_new: false };
    } else {
      updated[index][field] = value;
    }

    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ...emptyIngredient }],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  /* =====================
     IMAGE HANDLERS
  ===================== */
  const handleFile = (file) => {
    if (!file) return;

    const maxMb = 5;
    if (file.size > maxMb * 1024 * 1024) {
      setError(`Image trop lourde (max ${maxMb}MB)`);
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
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
    setError("");
    setLoading(true);

    try {
      const preparedIngredients = [];

      for (const ing of formData.ingredients) {
        if (!ing.quantity || !ing.unit) continue;

        if (ing.is_new) {
          const created = await api.createIngredient({ name: ing.name });
          preparedIngredients.push({
            ingredient_id: created.id,
            quantity: Number(ing.quantity),
            unit: ing.unit,
          });
        } else {
          preparedIngredients.push({
            ingredient_id: ing.id,
            quantity: Number(ing.quantity),
            unit: ing.unit,
          });
        }
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("time", formData.time);
      data.append("difficulty", formData.difficulty);
      data.append("instructions", formData.instructions);
      data.append("ingredients", JSON.stringify(preparedIngredients));
      data.append("medias_ids", JSON.stringify(selectedMedias));

      if (imageFile) {
        data.append("image", imageFile);
      }

      const recipe = await api.createRecipe(data);
      onRecipeAdded?.(recipe);
      onClose(true);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l’ajout de la recette");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     UI
  ===================== */
  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-[#E8650A]">
              🍳 Nouvelle recette
            </h2>
            <p className="text-sm text-gray-500">
              Décris ta recette étape par étape
            </p>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-2xl font-bold text-gray-400 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-10">

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl font-bold text-sm">
              {error}
            </div>
          )}

          {/* INFORMATIONS */}
          <section className="space-y-4">
            <input
              name="title"
              placeholder="Titre de la recette"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="p-3 border rounded-xl"
              >
                <option value="">Catégorie</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="time"
                placeholder="Temps (min)"
                value={formData.time}
                onChange={handleChange}
                min={1}
                required
                className="p-3 border rounded-xl"
              />

              <input
                type="number"
                name="difficulty"
                min={0}
                max={5}
                value={formData.difficulty}
                onChange={handleChange}
                className="p-3 border rounded-xl"
                placeholder="Difficulté (0–5)"
              />
            </div>
          </section>

          {/* IMAGE UX PREMIUM */}
          <section className="space-y-2">
            <label className="font-bold">Image</label>

            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`
                relative cursor-pointer rounded-2xl border-2 border-dashed
                h-48 flex items-center justify-center text-center transition
                ${isDragging ? "border-[#E8650A] bg-orange-50" : "border-gray-300"}
              `}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-white gap-2">
                    <span className="font-bold">Changer l’image</span>
                    <span className="text-sm opacity-80">
                      Clique ou glisse une autre image
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-3xl">🖼️</span>
                  <p className="font-semibold">
                    Clique ou glisse une image ici
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, WebP — max 5MB
                  </p>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="text-sm text-red-600 font-bold"
              >
                Supprimer l’image
              </button>
            )}
          </section>

          {/* INSTRUCTIONS */}
          <section>
            <label className="font-bold mb-2 block">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={6}
              required
              className="w-full p-3 border rounded-xl resize-none"
            />
          </section>

          {/* INGREDIENTS */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#E8650A]">🧂 Ingrédients</h3>
              <button
                type="button"
                onClick={addIngredient}
                className="font-bold text-sm text-[#E8650A]"
              >
                + Ajouter
              </button>
            </div>

            {formData.ingredients.map((ing, index) => (
              <div key={index} className="border rounded-2xl p-4 space-y-3">
                <select
                  value={ing.is_new ? "new" : ing.id}
                  onChange={(e) =>
                    handleIngredientChange(index, "id", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Choisir un ingrédient</option>
                  {ingredientsList.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                  <option value="new">+ Créer un ingrédient</option>
                </select>

                {ing.is_new && (
                  <input
                    placeholder="Nom de l’ingrédient"
                    value={ing.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                )}

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Quantité"
                    value={ing.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                    required
                    className="w-1/2 p-2 border rounded-lg"
                  />

                  <select
                    value={ing.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    required
                    className="w-1/2 p-2 border rounded-lg"
                  >
                    <option value="">Unité</option>
                    {UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-600 text-sm font-bold"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
          </section>

          {/* OEUVRES ASSOCIEES */}
          <section className="space-y-3">
            <h3 className="font-bold text-[#E8650A]">🎬 Œuvres associées</h3>

            <div className="grid sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {mediasList.map((m) => (
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
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-5 py-2 border rounded-full"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#E8650A] text-white font-bold rounded-full"
            >
              {loading ? "Ajout…" : "Ajouter la recette"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
