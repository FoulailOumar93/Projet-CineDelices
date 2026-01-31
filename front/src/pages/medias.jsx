import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { api } from "../services/api.service";

/* =========================
   CONFIG
========================= */
const MEDIA_CATEGORIES = [
  { value: "", label: "Toutes les catégories" },
  { value: "film", label: "Film" },
  { value: "serie", label: "Série" },
  { value: "manga", label: "Manga" },
  { value: "animation", label: "Animation" },
];

const ITEMS_PER_PAGE = 12;

/* =========================
   HELPERS
========================= */
const normalize = (v) =>
  v?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const splitCSV = (value) =>
  value ? value.split(",").map((v) => v.trim()) : [];

/* =========================
   CATEGORY NORMALISATION
========================= */
const mapCategory = (media) => {
  const cat = normalize(media.category);

  if (["animation", "dessin anime", "dessinanime"].includes(cat))
    return "animation";

  if (["serie", "series", "tv"].includes(cat)) return "serie";

  if (["manga", "anime"].includes(cat)) return "manga";

  return "film";
};

/* =========================
   COMPONENT
========================= */
export default function Medias() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    let mounted = true;

    const fetchMedias = async () => {
      try {
        const data = await api.getAllMedias();
        if (!Array.isArray(data)) {
          throw new Error("Les œuvres ne sont pas un tableau");
        }
        if (mounted) setMedias(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Impossible de charger les œuvres.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMedias();
    return () => (mounted = false);
  }, []);

  /* =========================
     FILTER + SORT
  ========================= */
  const filteredMedias = useMemo(() => {
    let list = [...medias];

    /* 🔍 SEARCH */
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) =>
        m.title?.toLowerCase().includes(q)
      );
    }

    /* 🎬 CATEGORY */
    if (category) {
      list = list.filter(
        (m) => mapCategory(m) === category
      );
    }

    /* 🌍 COUNTRY */
    if (country) {
      list = list.filter((m) =>
        splitCSV(m.country).includes(country)
      );
    }

    /* 🗣️ LANGUAGE */
    if (language) {
      list = list.filter((m) =>
        splitCSV(m.original_language).includes(language)
      );
    }

    /* ↕️ SORT */
    if (sort === "az") {
      list.sort((a, b) =>
        a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
      );
    }

    if (sort === "recent") {
      list.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }

    if (sort === "duration") {
      list.sort(
        (a, b) => (b.duration || 0) - (a.duration || 0)
      );
    }

    return list;
  }, [medias, search, category, language, country, sort]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredMedias.length / ITEMS_PER_PAGE);

  const paginatedMedias = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredMedias.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMedias, page]);

  useEffect(() => {
    setPage(1);
  }, [search, category, language, country, sort]);

  /* =========================
     STATES
  ========================= */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <p className="font-bold text-[#E8650A]">
          Chargement des œuvres…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <p className="text-red-600 font-bold">{error}</p>
      </main>
    );
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="min-h-screen bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold text-[#E8650A] mb-6">
          🎬 Œuvres
        </h1>

        {/* FILTER BAR */}
        <div className="bg-white rounded-2xl shadow p-4 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Rechercher une œuvre…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border"
            />

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-full border bg-gray-50"
            >
              {MEDIA_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* LANGUAGE */}
            <input
              type="text"
              placeholder="Langue"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-3 rounded-full border"
            />

            {/* COUNTRY */}
            <input
              type="text"
              placeholder="Pays"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 rounded-full border"
            />

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-full border bg-gray-50"
            >
              <option value="recent">Nouveautés</option>
              <option value="az">A–Z</option>
              <option value="duration">Durée ⏱</option>
            </select>
          </div>
        </div>

        {paginatedMedias.length === 0 ? (
          <p className="italic text-gray-500">
            Aucune œuvre ne correspond aux filtres.
          </p>
        ) : (
          <Card items={paginatedMedias} type="medias" />
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-full font-bold ${
                    p === page
                      ? "bg-[#E8650A] text-white"
                      : "border"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}