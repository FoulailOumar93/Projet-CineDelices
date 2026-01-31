import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EditMedia from "../components/editMedia";
import { api } from "../services/api.service";

/* =========================
   UI CONFIG
========================= */
const CATEGORY_UI = {
  film: { label: "Film", icon: "🎬", badge: "bg-red-600 text-white" },
  serie: { label: "Série", icon: "📺", badge: "bg-blue-600 text-white" },
  manga: { label: "Manga", icon: "📖", badge: "bg-purple-600 text-white" },
  animation: {
    label: "Animation",
    icon: "🎨",
    badge: "bg-gradient-to-r from-teal-500 to-emerald-500 text-white",
  },
};

/* =========================
   HELPERS
========================= */
const normalize = (v) =>
  v?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const formatDateFR = (date) =>
  date ? new Date(date).toLocaleDateString("fr-FR") : null;

const formatDuration = (minutes) => {
  if (!minutes || isNaN(minutes)) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${m} min`;
};

/* =========================
   EMOJI MAPS
========================= */
const COUNTRY_FLAGS = {
  France: "🇫🇷",
  Allemagne: "🇩🇪",
  Italie: "🇮🇹",
  Espagne: "🇪🇸",
  Portugal: "🇵🇹",
  "Royaume-Uni": "🇬🇧",
  "États-Unis": "🇺🇸",
  Inde: "🇮🇳",
  Japon: "🇯🇵",
  Chine: "🇨🇳",
  "Corée du Sud": "🇰🇷",
  Égypte: "🇪🇬",
  Maroc: "🇲🇦",
  "Arabie Saoudite": "🇸🇦",
  Turquie: "🇹🇷",
  Australie: "🇦🇺",
  "Nouvelle-Zélande": "🇳🇿",
  Mexique: "🇲🇽",
};

const LANGUAGE_EMOJI = {
  Français: "🗣️",
  Anglais: "🗣️",
  Espagnol: "🗣️",
  Portugais: "🗣️",
  Allemand: "🗣️",
  Italien: "🗣️",
  Tamil: "🗣️",
  Hindi: "🗣️",
  Telugu: "🗣️",
  Malayalam: "🗣️",
  Kannada: "🗣️",
  Marathi: "🗣️",
  Arabe: "🌍",
  Turc: "🕌",
  Japonais: "🗾",
  Chinois: "🀄",
  Coréen: "🎎",
};

/* =========================
   COMPONENT
========================= */
export default function Media() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [allMedias, setAllMedias] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = JSON.parse(localStorage.getItem("me"));




  /* =========================
     FETCH
  ========================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [mediaData, mediasList] = await Promise.all([
        api.getMediaById(id),
        api.getAllMedias(),
      ]);

      setMedia(mediaData);
      setRecipes(mediaData?.seen_in_recipes || []);
      setAllMedias(mediasList || []);

      setCurrentIndex(
        mediasList.findIndex((m) => String(m.id) === String(id))
      );
    } catch (err) {
      console.error(err);
      setError("Œuvre introuvable");
    } finally {
      setLoading(false);
    }
  };
const canEdit = Boolean(user && media);


  useEffect(() => {
    fetchData();
  }, [id]);

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    try {
      await api.deleteMedia(id);
      navigate("/medias");
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement…</p>;
  if (error || !media)
    return <p className="text-center text-red-600">{error}</p>;

  const categoryKey = normalize(media.category);
  const ui = CATEGORY_UI[categoryKey];

  const imageUrl = media.img_url
    ? `${BASE_URL}/img/${media.img_url}`
    : null;

  /* =========================
     NAV
  ========================= */
  const goPrevious = () => {
    if (currentIndex > 0) {
      navigate(`/medias/${allMedias[currentIndex - 1].id}`);
    }
  };

  const goNext = () => {
    if (currentIndex < allMedias.length - 1) {
      navigate(`/medias/${allMedias[currentIndex + 1].id}`);
    }
  };
console.log("=== DEBUG MEDIA PAGE ===");
console.log("USER:", user);
console.log("MEDIA ID:", media?.id);
console.log("MEDIA CREATED_BY:", media?.created_by);
console.log("CAN EDIT:", canEdit);

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="bg-[#FFFBEF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">

{/* IMAGE */}
{imageUrl && (
  <div className="mb-6 max-w-md mx-auto">
    <div className="relative aspect-square rounded-3xl overflow-hidden shadow">
      <img
        key={imageUrl}
        src={`${imageUrl}?t=${Date.now()}`}
        alt={media.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>
)}

        {/* NAV */}
        <div className="flex justify-between mb-6">
          <button
            onClick={goPrevious}
            disabled={currentIndex <= 0}
            className="px-4 py-2 rounded-full bg-gray-100 disabled:opacity-40"
          >
            ⬅️ Précédent
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex >= allMedias.length - 1}
            className="px-4 py-2 rounded-full bg-gray-100 disabled:opacity-40"
          >
            Suivant ➡️
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-[#E8650A] mb-4 text-center">
          {media.title}
        </h1>
{/* ACTIONS ADMIN / CRÉATEUR */}
{canEdit && (
  <div className="flex justify-center gap-4 mt-4 mb-6">
    <button
      onClick={() => setIsEditing(true)}
      className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#E8650A] text-white font-bold shadow hover:scale-105 transition"
    >
      ✏️ Modifier
    </button>

    <button
      onClick={() => setShowDelete(true)}
      className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-100 text-red-700 font-bold shadow hover:scale-105 transition"
    >
      🗑 Supprimer
    </button>
  </div>
)}

        {/* BADGES */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {ui && (
            <span className={`px-4 py-1 rounded-full font-bold ${ui.badge}`}>
              {ui.icon} {ui.label}
            </span>
          )}

          {media.country &&
            media.country.split(",").map((c) => (
              <span
                key={c}
                className="px-4 py-1 rounded-full bg-green-600 text-white font-bold"
              >
                {COUNTRY_FLAGS[c.trim()] || "🌍"} {c.trim()}
              </span>
            ))}

          {media.original_language &&
            media.original_language.split(",").map((l) => (
              <span
                key={l}
                className="px-4 py-1 rounded-full bg-yellow-400 text-black font-bold"
              >
                {LANGUAGE_EMOJI[l.trim()] || "🗣️"} {l.trim()}
              </span>
            ))}

          {media.release_date && (
            <span className="px-4 py-1 rounded-full bg-gray-200 font-bold">
              📅 {formatDateFR(media.release_date)}
            </span>
          )}

          {(categoryKey === "serie" || categoryKey === "manga") && media.seasons && (
            <span className="px-4 py-1 rounded-full bg-indigo-600 text-white font-bold">
              📦 {media.seasons} saison{media.seasons > 1 ? "s" : ""}
            </span>
          )}

          {(categoryKey === "serie" || categoryKey === "manga") &&
            (media.end_date ? (
              <span className="px-4 py-1 rounded-full bg-gray-800 text-white font-bold">
                🏁 Fin : {formatDateFR(media.end_date)}
              </span>
            ) : (
              <span className="px-4 py-1 rounded-full bg-emerald-600 text-white font-bold">
                🔄 En cours
              </span>
            ))}

          {media.duration && (
            <span className="px-4 py-1 rounded-full bg-black text-white font-bold">
              ⏱ {formatDuration(media.duration)}
            </span>
          )}
        </div>

        {/* SYNOPSIS */}
        <section className="bg-white rounded-xl p-6 shadow mb-10">
          <h2 className="text-xl font-bold text-[#E8650A] mb-3">
            📜 Synopsis
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {media.description || "Aucun synopsis disponible."}
          </p>
        </section>

        {/* RECIPES */}
        <section>
          <h2 className="text-2xl font-bold text-[#E8650A] mb-4">
            🍽️ Recettes associées
          </h2>

          {recipes.length === 0 ? (
            <p className="italic text-gray-500">Aucune recette associée.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
                >
                  {recipe.img_url && (
                    <img
                      src={`${BASE_URL}/img/${recipe.img_url}`}
                      className="aspect-square object-cover w-full"
                    />
                  )}
                  <div className="p-4 font-bold text-[#E8650A]">
                    {recipe.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* MODAL */}
      <EditMedia
        open={isEditing}
        mediaId={id}
        onClose={() => setIsEditing(false)}
        onSaved={fetchData}
      />

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="mb-4 font-bold">Supprimer cette œuvre ?</p>
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