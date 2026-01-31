import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api.service";

const Results = ({ query, sort }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     FETCH + FILTER + SORT
  ========================= */
  useEffect(() => {
    const fetchResults = async () => {
      if (!query || !query.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [recipes, medias] = await Promise.all([
          api.getAllRecipes(),
          api.getAllMedias(),
        ]);

        // 🔍 NORMALISATION
        const normalized = [
          ...recipes.map((r) => ({
            ...r,
            type: "recipe",
          })),
          ...medias.map((m) => ({
            ...m,
            type: "media",
          })),
        ];

        // 🔎 FILTRE RECHERCHE
        const filtered = normalized.filter((item) =>
          item.title?.toLowerCase().includes(query.toLowerCase())
        );

        // 🔃 TRI
        const sorted = [...filtered].sort((a, b) => {
          if (sort === "alpha") {
            return a.title.localeCompare(b.title);
          }

          if (sort === "popular") {
            return (b.views || 0) - (a.views || 0);
          }

          // recent (par défaut)
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setItems(sorted);
      } catch (err) {
        console.error(err);
        setError("Erreur Lors De La Recherche");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, sort]);

  /* =========================
     UI
  ========================= */
  if (loading) {
    return (
      <p className="text-center py-10 text-[#E8650A] font-bold">
        Chargement…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-600 font-bold">
        {error}
      </p>
    );
  }

  if (!items.length) {
    return (
      <p className="text-center py-10 text-gray-500">
        Aucun Résultat Pour « {query} »
      </p>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#E8650A] mb-6">
        Résultats De Recherche
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            to={`/${item.type === "recipe" ? "recipes" : "medias"}/${item.id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            {item.img_url && (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/img/${item.img_url}`}
                alt={item.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />
            )}

            <div className="p-4">
              <span className="text-sm text-gray-500">
                {item.type === "recipe" ? "🍽️ Recette" : "🎬 Œuvre"}
              </span>
              <h3 className="font-bold text-lg text-[#E8650A] mt-1">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Results;