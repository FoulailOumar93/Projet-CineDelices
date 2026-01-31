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

const INITIAL_STATE = {
  title: "",
  description: "",
  category: "",
  release_date: "",
  end_date: "",
  seasons: "",
  duration: "",
  countries: [],     // 👈 tableau
  languages: [],     // 👈 tableau
  recipes: [],       // 👈 tableau d’IDs
  is_ongoing: false,
};



/* =====================
   COMPONENT
===================== */
export default function EditMedia({ open, mediaId, onClose, onSaved }) {
  const [formData, setFormData] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const isSerieOrManga =
    formData?.category === "serie" || formData?.category === "manga";
const addToArray = (key, value) => {
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
     LOAD MEDIA
  ===================== */
  useEffect(() => {
    if (!open || !mediaId) return;

    const load = async () => {
      try {
        const [media, recipes] = await Promise.all([
          api.getMediaById(mediaId),
          api.getAllRecipes(),
        ]);

      setFormData({
  ...INITIAL_STATE,
  title: media.title ?? "",
  description: media.description ?? "",
  category: media.category === "série" ? "serie" : media.category,
  release_date: media.release_date?.slice(0, 10) ?? "",
  end_date: media.end_date?.slice(0, 10) ?? "",
  seasons: media.seasons ?? "",
  duration: media.duration ?? "",
  countries: media.country ? media.country.split(",") : [],
  languages: media.original_language
    ? media.original_language.split(",")
    : [],
  recipes: media.recipes?.map((r) => r.id) ?? [],
  is_ongoing: !media.end_date,
});
console.log("RECIPES FROM API →", media.recipes);


        setCurrentImage(
          media.img_url ? `${API_BASE}/img/${media.img_url}` : null
        );

        setAllRecipes(Array.isArray(recipes) ? recipes : []);
        setNewImageFile(null);
        setImagePreview(null);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger l’œuvre.");
      }
    };

    load();
  }, [open, mediaId]);

  if (!open || !formData) return null;

  /* =====================
     IMAGE
  ===================== */
  const handleImageFile = (file) => {
    if (!file) return;
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setError("Format image non supporté");
      return;
    }
    setNewImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* =====================
     SUBMIT
  ===================== */
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const fd = new FormData();

    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("category", CATEGORY_DB_MAP[formData.category]);

    // 📅 Date de sortie
    if (formData.release_date) {
      fd.append("release_date", formData.release_date);
    }

    // 🎬 Film / 🎨 Animation
    if (
      (formData.category === "film" ||
        formData.category === "animation") &&
      formData.duration
    ) {
      fd.append("duration", formData.duration);
    }

    // 📺 Série / 📖 Manga
  // SÉRIE / MANGA
if (isSerieOrManga) {
  if (formData.seasons) {
    fd.append("seasons", formData.seasons);
  }

  if (!formData.is_ongoing && formData.end_date) {
    fd.append("end_date", formData.end_date);
  }

  // 🔥 SI EN COURS → on force NULL
  if (formData.is_ongoing) {
    fd.append("end_date", "");
  }
}


    // 🌍 Pays (MULTI)
    if (formData.countries.length > 0) {
      fd.append("country", formData.countries.join(","));
    }

    // 🗣️ Langues (MULTI)
    if (formData.languages.length > 0) {
      fd.append("original_language", formData.languages.join(","));
    }

  // 🍽️ Recettes associées (OBLIGATOIRE)
if (formData.recipes.length > 0) {
  fd.append(
    "recipes",
    JSON.stringify(formData.recipes)
  );
}

    // 🖼️ Image
    if (newImageFile) {
      fd.append("image", newImageFile);
    }
console.log("RECIPES SENT →", formData.recipes);
    await api.updateMedia(mediaId, fd);
    onSaved?.();
    onClose();
  } catch (err) {
    console.error(err);
    setError("Erreur lors de la sauvegarde.");
  } finally {
    setLoading(false);
  }
};


  /* =====================
     UI
  ===================== */
  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#E8650A]">
            ✏️ Modifier l’œuvre
          </h2>
          <button onClick={onClose} className="text-2xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl font-bold">
              {error}
            </div>
          )}

          {/* HORIZONTAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* IMAGE */}
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer"
            >
              {imagePreview ? (
                <img src={imagePreview} className="aspect-square object-cover rounded-xl mx-auto" />
              ) : currentImage ? (
                <img src={currentImage} className="aspect-square object-cover rounded-xl mx-auto" />
              ) : (
                <p>🖼️ Cliquer pour changer l’image</p>
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

  {/* TITRE */}
  <input
    value={formData.title}
    onChange={(e) =>
      setFormData({ ...formData, title: e.target.value })
    }
    className="w-full p-3 border rounded-xl"
    placeholder="Titre"
  />

  {/* SYNOPSIS */}
  <textarea
    value={formData.description}
    onChange={(e) =>
      setFormData({ ...formData, description: e.target.value })
    }
    rows="4"
    className="w-full p-3 border rounded-xl"
    placeholder="Synopsis"
  />

  {/* CATÉGORIE */}
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

  {/* DATE DE SORTIE — UNE SEULE FOIS */}
  {formData.category && (
    <div>
      <label className="block text-sm font-bold mb-1">
        📅 Date de sortie
      </label>
      <input
        type="date"
        value={formData.release_date}
        onChange={(e) =>
          setFormData({
            ...formData,
            release_date: e.target.value,
          })
        }
        className="w-full p-3 border rounded-xl"
      />
    </div>
  )}

  {/* DURÉE — FILM + ANIMATION */}
  {(formData.category === "film" ||
    formData.category === "animation") && (
    <div>
      <label className="block text-sm font-bold mb-1">
        ⏱ Durée (minutes)
      </label>
      <input
        type="number"
        min="1"
        value={formData.duration}
        onChange={(e) =>
          setFormData({
            ...formData,
            duration: e.target.value,
          })
        }
        className="w-full p-3 border rounded-xl"
      />
    </div>
  )}

  {/* SÉRIE / MANGA */}
{isSerieOrManga && (
  <>
    {/* SAISONS */}
    <div>
      <label className="block text-sm font-bold mb-1">
        📦 Nombre de saisons
      </label>
      <input
        type="number"
        min="1"
        value={formData.seasons}
        onChange={(e) =>
          setFormData({ ...formData, seasons: e.target.value })
        }
        className="w-full p-3 border rounded-xl"
      />
    </div>

    {/* DATE DE FIN */}
    <div>
      <label className="block text-sm font-bold mb-1">
        🏁 Date de fin
      </label>
      <input
        type="date"
        value={formData.end_date}
        disabled={formData.is_ongoing}
        onChange={(e) =>
          setFormData({ ...formData, end_date: e.target.value })
        }
        className={`w-full p-3 border rounded-xl ${
          formData.is_ongoing ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />

      {/* EN COURS */}
      <label className="flex items-center gap-2 mt-2 text-sm font-bold">
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
        🔄 Série en cours
      </label>
    </div>
  </>
)}

{/* ================= MULTI SELECT (RECETTES / LANGUES / PAYS) ================= */}
<div className="space-y-6">

  {/* ========= RECETTES ========= */}
  <div>
    <label className="block text-sm font-bold mb-1">🍽️ Recettes associées</label>

    <select
      onChange={(e) => addToArray("recipes", Number(e.target.value))}
      className="w-full p-3 border rounded-xl bg-gray-50"
    >
      <option value="">Ajouter une recette</option>
      {allRecipes.map((r) => (
        <option key={r.id} value={r.id}>
          {r.title}
        </option>
      ))}
    </select>

    <div className="flex flex-wrap gap-2 mt-2">
      {formData.recipes.map((id) => {
        const recipe = allRecipes.find((r) => r.id === id);
        return (
          <span
            key={id}
            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {recipe?.title}
            <button
              type="button"
              onClick={() => removeFromArray("recipes", id)}
            >
              ✕
            </button>
          </span>
        );
      })}
    </div>
  </div>

  {/* ========= LANGUES ========= */}
  <div>
    <label className="block text-sm font-bold mb-1">🗣️ Langues</label>

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

    <div className="flex flex-wrap gap-2 mt-2">
      {formData.languages.map((l) => (
        <span
          key={l}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          {l}
          <button
            type="button"
            onClick={() => removeFromArray("languages", l)}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  </div>

  {/* ========= PAYS ========= */}
  <div>
    <label className="block text-sm font-bold mb-1">🌍 Pays de production</label>

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

    <div className="flex flex-wrap gap-2 mt-2">
      {formData.countries.map((c) => (
        <span
          key={c}
          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          {c}
          <button
            type="button"
            onClick={() => removeFromArray("countries", c)}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  </div>

</div>
          </div>
          </div>
          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 border rounded-full">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-[#E8650A] text-white font-bold rounded-full">
              {loading ? "Sauvegarde…" : "Sauvegarder"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
