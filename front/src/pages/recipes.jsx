import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { api } from "../services/api.service";

/* =========================
   CONFIG
========================= */
const RECIPE_CATEGORIES = [
  { value: "", label: "Toutes les catégories" },
  { value: "entree", label: "Entrée" },
  { value: "plat", label: "Plat" },
  { value: "dessert", label: "Dessert" },
  { value: "boisson", label: "Boisson" },
  { value: "accompagnement", label: "Accompagnement" },
];

const ITEMS_PER_PAGE = 12;

const normalize = (v) =>
  v?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* =========================
   COMPONENT
========================= */
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UX
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    let mounted = true;

    const fetchRecipes = async () => {
      try {
        const data = await api.getAllRecipes();
        if (!Array.isArray(data)) {
          throw new Error("Les recettes ne sont pas un tableau");
        }
        if (mounted) setRecipes(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Impossible de charger les recettes.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRecipes();
    return () => (mounted = false);
  }, []);

  /* =========================
     FILTER + SORT (CORRIGÉ)
  ========================= */
  const filteredRecipes = useMemo(() => {
    let list = [...recipes];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) =>
        r.title?.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter(
        (r) => normalize(r.category) === normalize(category)
      );
    }

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

    return list;
  }, [recipes, search, category, sort]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);

  const paginatedRecipes = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredRecipes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecipes, page]);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  /* =========================
     STATES
  ========================= */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFBEF] flex items-center justify-center">
        <p className="font-bold text-[#E8650A]">
          Chargement des recettes…
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
          🍽️ Recettes
        </h1>

        {/* FILTER BAR */}
        <div className="bg-white rounded-2xl shadow p-4 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">

            <input
              type="text"
              placeholder="Rechercher une recette…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="md:w-56 px-4 py-3 rounded-full border bg-gray-50 font-semibold"
            >
              {RECIPE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="md:w-40 px-4 py-3 rounded-full border bg-gray-50 font-semibold"
            >
              <option value="recent">Nouveautés</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>

        {paginatedRecipes.length === 0 ? (
          <p className="italic text-gray-500">
            Aucune recette ne correspond à votre recherche.
          </p>
        ) : (
          <Card items={paginatedRecipes} type="recipes" />
        )}

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
