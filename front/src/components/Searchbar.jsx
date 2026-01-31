import { useEffect, useState } from "react";

const Searchbar = ({ onSearch, onSort, placeholder }) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch?.(query.trim());
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    onSort?.(value);
  };

  return (
    <div className="w-full mb-10 px-4">
      <form className="mx-auto max-w-5xl flex flex-col sm:flex-row gap-3 items-stretch">
        
        {/* SEARCH */}
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || "Rechercher…"}
            className="w-full pl-12 pr-28 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-[#E8650A] outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          {/* SORT intégré */}
          <select
            value={sort}
            onChange={handleSortChange}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent font-semibold text-gray-600 focus:outline-none cursor-pointer"
          >
            <option value="recent">Récent</option>
            <option value="alpha">A–Z</option>
            <option value="year">Année</option>
          </select>
        </div>

        {/* BOUTON */}
        <button
          type="button"
          className="bg-[#E8650A] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition sm:w-auto w-full"
        >
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
