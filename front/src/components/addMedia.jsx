import { useEffect, useRef, useState } from "react";
import { api } from "../services/api.service";
import { COUNTRIES } from "../data/countries";
import { LANGUAGES } from "../data/languages";

/* =====================
   CONSTANTES
===================== */
const ACCEPTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Choisir une catégorie" },
  { value: "film", label: "🎬 Film" },
  { value: "serie", label: "📺 Série" },
  { value: "manga", label: "📖 Manga" },
  { value: "animation", label: "🎨 Animation" },
];

const CATEGORY_DB_MAP = {
  film: "film",
  serie: "série",
  manga: "manga",
  animation: "animation",
};

/* =====================
   STATE INITIAL
===================== */
const INITIAL_STATE = {
  title: "",
  description: "",
  category: "",
  release_date: "",
  end_date: "",
  seasons: "",
  duration: "",
  countries: [],
  languages: [],
  recipes: [],
  is_ongoing: false,
};

export default function AddMedia({ open, onClose, onMediaAdded }) {
  /* =====================
     STATES
  ===================== */
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [allRecipes, setAllRecipes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const isSerieOrManga =
    formData.category === "serie" || formData.category === "manga";

  /* =====================
     LOAD RECIPES
  ===================== */
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        const data = await api.getAllRecipes();
        setAllRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [open]);

  /* =====================
     RESET
  ===================== */
  useEffect(() => {
    if (!open) {
      setFormData(INITIAL_STATE);
      setImageFile(null);
      setImagePreview(null);
      setError("");
      setLoading(false);
    }
  }, [open]);

  /* =====================
     HELPERS MULTI
  ===================== */
  const addToArray = (key, value) => {
    if (!value) return;
    setFormData((prev) =>
      prev[key].includes(value)
        ? prev
        : { ...prev, [key]: [...prev[key], value] }
    );
  };

  const removeFromArray = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== value),
    }));
  };

  /* =====================
     IMAGE
  ===================== */
  const handleImageFile = (file) => {
    if (!file) return;

    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setError("Format image non supporté (JPG, PNG, WEBP)");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.category) {
      setError("Titre et catégorie obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("category", CATEGORY_DB_MAP[formData.category]);

      if (formData.release_date) {
        fd.append("release_date", formData.release_date);
      }

      // 🎬 Film / Animation
      if (
        (formData.category === "film" ||
          formData.category === "animation") &&
        formData.duration
      ) {
        fd.append("duration", formData.duration);
      }

      // 📺 Série / Manga
      if (isSerieOrManga) {
        if (formData.seasons) {
          fd.append("seasons", formData.seasons);
        }

        if (!formData.is_ongoing && formData.end_date) {
          fd.append("end_date", formData.end_date);
        }

        if (formData.is_ongoing) {
          fd.append("end_date", "");
        }
      }

      // 🌍 Pays
      if (formData.countries.length > 0) {
        fd.append("country", formData.countries.join(","));
      }

      // 🗣️ Langues
      if (formData.languages.length > 0) {
        fd.append("original_language", formData.languages.join(","));
      }

      // 🍽️ Recettes (CONTRAT API OK)
      if (formData.recipes.length > 0) {
        fd.append("recipes", JSON.stringify(formData.recipes));
      }

      // 🖼️ Image
      if (imageFile) {
        fd.append("image", imageFile);
      }

      const created = await api.createMedia(fd);
      onMediaAdded?.(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l’ajout de l’œuvre.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  /* =====================
     UI
  ===================== */
  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#E8650A]">
            ➕ Nouvelle œuvre
          </h2>
          <button onClick={onClose} className="text-2xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* IMAGE */}
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="aspect-square object-cover rounded-xl mx-auto"
                />
              ) : (
                <p>🖼️ Cliquer pour ajouter une image</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept={ACCEPTED_FORMATS.join(",")}
                onChange={(e) => handleImageFile(e.target.files?.[0])}
              />
            </div>

            {/* FORM */}
            <div className="space-y-4">

              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-3 border rounded-xl"
                placeholder="Titre"
              />

              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
                className="w-full p-3 border rounded-xl"
                placeholder="Synopsis"
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              {/* DATE DE SORTIE */}
              {formData.category && (
                <input
                  type="date"
                  value={formData.release_date}
                  onChange={(e) =>
                    setFormData({ ...formData, release_date: e.target.value })
                  }
                  className="w-full p-3 border rounded-xl"
                />
              )}

              {/* DURÉE */}
              {(formData.category === "film" ||
                formData.category === "animation") && (
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full p-3 border rounded-xl"
                  placeholder="Durée (minutes)"
                />
              )}

              {/* SÉRIE / MANGA */}
              {isSerieOrManga && (
                <>
                  <input
                    type="number"
                    min="1"
                    value={formData.seasons}
                    onChange={(e) =>
                      setFormData({ ...formData, seasons: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl"
                    placeholder="Nombre de saisons"
                  />

                  <input
                    type="date"
                    disabled={formData.is_ongoing}
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl"
                  />

                  <label className="flex gap-2 items-center font-bold">
                    <input
                      type="checkbox"
                      checked={formData.is_ongoing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_ongoing: e.target.checked,
                          end_date: e.target.checked ? "" : formData.end_date,
                        })
                      }
                    />
                    Série en cours
                  </label>
                </>
              )}

              {/* RECETTES */}
              <select
                onChange={(e) =>
                  addToArray("recipes", Number(e.target.value))
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
              >
                <option value="">Ajouter une recette</option>
                {allRecipes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {formData.recipes.map((id) => {
                  const recipe = allRecipes.find((r) => r.id === id);
                  return (
                    <span key={id} className="bg-orange-100 px-3 py-1 rounded-full">
                      {recipe?.title}
                      <button
                        type="button"
                        onClick={() => removeFromArray("recipes", id)}
                        className="ml-2"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>

              {/* LANGUES */}
              <select
                onChange={(e) => addToArray("languages", e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50"
              >
                <option value="">Ajouter une langue</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>

              {/* PAYS */}
              <select
                onChange={(e) => addToArray("countries", e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50"
              >
                <option value="">Ajouter un pays</option>
                {COUNTRIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 border rounded-full">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-[#E8650A] text-white font-bold rounded-full">
              {loading ? "Ajout…" : "Ajouter"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
