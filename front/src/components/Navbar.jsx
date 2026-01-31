import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Navbar = ({ user, setUser }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("me");
    setUser(null);
    navigate("/");
  };

  const handleLoginSuccess = (me) => {
    setUser(me);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <>
      <header className="bg-[#FFC854] sticky top-0 z-50 shadow-sm font-fredoka">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-[#E8650A]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            <Link to="/" className="flex items-center">
              <img
                src="/images/cine-delices.png"
                alt="CinéDélices"
                className="w-20 sm:w-24 md:w-28 h-auto"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8 text-[#E8650A]">
            <Link className="font-bold text-lg" to="/">Accueil</Link>
            <Link className="font-bold text-lg" to="/recipes">Recettes</Link>
            <Link className="font-bold text-lg" to="/medias">Œuvres</Link>
            <Link className="font-bold text-lg" to="/about">À Propos</Link>
            {user && (
              <Link className="font-bold text-lg" to="/memberPage">
                Mon Espace CinéDélices
              </Link>
            )}
          </nav>

          {/* AUTH */}
          <div className="hidden lg:flex gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-[#E8650A] text-white px-4 py-2 rounded-full font-bold"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowRegister(true)}
                  className="bg-white text-[#E8650A] px-4 py-2 rounded-full font-bold"
                >
                  Inscription
                </button>
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-[#E8650A] text-white px-4 py-2 rounded-full font-bold"
                >
                  Connexion
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <Login
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <Register
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onRegisterSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
