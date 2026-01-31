import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";

const MAX_ITEMS = 4;

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("recent");

  /* =========================
     FETCH DATA (SAFE)
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔒 Sécurisation des types (BUG FIX)
        const safeQuery =
          typeof searchQuery === "string" ? searchQuery.trim() : "";

        const safeSort =
          typeof sort === "string" ? sort : "recent";

        const data = await api.search(safeQuery, safeSort);

        setResults(
          Array.isArray(data?.results) ? data.results : []
        );
      } catch (err) {
        console.error("Erreur HomePage :", err);
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, sort]);

  /* =========================
     FILTER RESULTS
  ========================= */
  const recipes = results
    .filter((el) => el.type === "recipe")
    .slice(0, MAX_ITEMS);

  const medias = results
    .filter((el) => el.type === "media")
    .slice(0, MAX_ITEMS);

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="bg-[#FFFBEF] min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[#E8650A] mb-4 font-fredoka">
            CinéDélices
          </h1>
          <p className="text-gray-600">
            Découvrez des recettes et des œuvres inspirées du cinéma.
          </p>
        </header>

        {/* SEARCHBAR */}
        <Searchbar
          placeholder="Rechercher une recette ou une œuvre…"
          onSearch={(value) =>
            setSearchQuery(
              typeof value === "string" ? value : ""
            )
          }
          onSort={(value) =>
            setSort(
              typeof value === "string" ? value : "recent"
            )
          }
        />

        {/* LOADING */}
        {loading && (
          <p className="text-center text-[#E8650A] font-bold mt-10">
            Chargement…
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-600 font-bold mt-10">
            {error}
          </p>
        )}

        {/* CONTENT */}
        {!loading && !error && (
          <>
            {recipes.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-[#E8650A] mb-6">
                  🍽️ Recettes récentes
                </h2>
                <Card items={recipes} type="recipes" />
              </section>
            )}

            {medias.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#E8650A] mb-6">
                  🎬 Œuvres récentes
                </h2>
                <Card items={medias} type="medias" />
              </section>
            )}

            {recipes.length === 0 && medias.length === 0 && (
              <p className="text-center text-gray-500 mt-10 italic">
                Aucun résultat pour le moment.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;