import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/homePage";
import Recipes from "./pages/recipes";
import RecipeDetails from "./pages/recipe";
import Medias from "./pages/medias";
import MediaDetails from "./pages/media";
import About from "./pages/about";
import MemberPage from "./pages/memberPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     HYDRATATION USER
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("me");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* RECETTES */}
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails user={user} />} />
        {/* ŒUVRES */}
        <Route path="/medias" element={<Medias />} />
        <Route path="/medias/:id" element={<MediaDetails />} />

        {/* À PROPOS */}
        <Route path="/about" element={<About />} />

        {/* ESPACE MEMBRE */}
        <Route path="/memberPage" element={<MemberPage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
