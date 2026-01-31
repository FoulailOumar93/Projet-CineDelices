import { Link } from "react-router-dom";

/* ======================================================
   CONFIG
====================================================== */
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = RAW_BASE_URL?.endsWith("/api")
  ? RAW_BASE_URL.replace("/api", "")
  : RAW_BASE_URL;

/* ======================================================
   UI MAPS
====================================================== */

// 🎬 ŒUVRES
const MEDIA_CATEGORY_UI = {
  film: {
    label: "🎬 Film",
    color: "bg-orange-100 text-orange-800",
  },
  serie: {
    label: "📺 Série",
    color: "bg-blue-100 text-blue-800",
  },
  manga: {
    label: "📘 Manga",
    color: "bg-purple-100 text-purple-800",
  },
  animation: {
    label: "🎨 Animation",
    color: "bg-gradient-to-r from-teal-400 to-emerald-500 text-white",
  },
};

// 🍽️ RECETTES
const RECIPE_CATEGORY_UI = {
  entree: { label: "Entrée", color: "bg-green-100 text-green-700" },
  plat: { label: "Plat", color: "bg-red-100 text-red-700" },
  dessert: { label: "Dessert", color: "bg-pink-100 text-pink-700" },
  boisson: { label: "Boisson", color: "bg-blue-100 text-blue-700" },
  accompagnement: {
    label: "Accompagnement",
    color: "bg-yellow-100 text-yellow-700",
  },
};

/* ======================================================
   HELPERS
====================================================== */
const normalize = (v) =>
  v?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* récupération robuste de la catégorie média */
const getMediaCategory = (item) =>
  item.category ||
  item.media_category ||
  item.type ||
  item.Media?.category ||
  null;

/* mapping strict et volontaire */
const mapMediaCategory = (raw) => {
  const c = normalize(raw);

  if (
    c === "animation" ||
    c === "dessin anime" ||
    c === "dessinanime" ||
    c === "animated"
  ) {
    return "animation";
  }

  if (c === "serie" || c === "series" || c === "tv") {
    return "serie";
  }

  if (c === "manga") {
    return "manga";
  }

  if (c === "film") {
    return "film";
  }

  return null;
};

/* ======================================================
   SINGLE CARD
====================================================== */
function SingleCard({ item, type }) {
  if (!item || !item.id) return null;

  const isRecipe = type === "recipes";
  const isMedia = type === "medias";

  const link = isRecipe
    ? `/recipes/${item.id}`
    : `/medias/${item.id}`;

  /* ================= IMAGE ================= */
  let imageUrl = null;

  if (item.img_url) {
    imageUrl = item.img_url.startsWith("/img")
      ? `${BASE_URL}${item.img_url}`
      : `${BASE_URL}/img/${item.img_url}`;
  }

  /* ================= CATEGORY ================= */
  let categoryUI = null;
  let mediaKey = null;

  if (isRecipe) {
    const key = normalize(item.category);
    categoryUI = RECIPE_CATEGORY_UI[key];
  }

  if (isMedia) {
    const rawCategory = getMediaCategory(item);
    mediaKey = mapMediaCategory(rawCategory);
    categoryUI = MEDIA_CATEGORY_UI[mediaKey];
  }

  return (
    <Link
      to={link}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      {/* IMAGE */}
      <div className="relative h-44 sm:h-52 lg:h-56 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Pas d’image
          </div>
        )}

        <span className="absolute top-3 left-3 bg-white/90 text-xs font-bold px-3 py-1 rounded-full">
          {isRecipe ? "Recette" : "Œuvre"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-[#E8650A] line-clamp-2">
          {item.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {/* BADGE CATÉGORIE */}
          {categoryUI && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryUI.color}`}
            >
              {categoryUI.label}
            </span>
          )}

          {/* BADGE SAISONS (SÉRIE / MANGA UNIQUEMENT) */}
          {isMedia &&
            (mediaKey === "serie" || mediaKey === "manga") &&
            item.seasons && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                📦 {item.seasons} Saison{item.seasons > 1 ? "s" : ""}
              </span>
            )}
        </div>
      </div>
    </Link>
  );
}

/* ======================================================
   CARD LIST
====================================================== */
export default function Card({ item, items, type }) {
  if (Array.isArray(items)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((el) => (
          <SingleCard key={el.id} item={el} type={type} />
        ))}
      </div>
    );
  }

  if (item) return <SingleCard item={item} type={type} />;

  return null;
}
