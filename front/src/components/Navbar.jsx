import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Navbar = ({ user, setUser }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("me");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const handleLoginSuccess = (me) => {
    setUser(me);
    setShowLogin(false);
    setShowRegister(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="bg-[#FFC854] sticky top-0 z-50 shadow-sm font-fredoka">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              className="lg:hidden text-[#E8650A] text-3xl leading-none font-bold"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <img
                src="/images/cine-delices.png"
                alt="CinéDélices"
                className="w-20 sm:w-24 md:w-28 h-auto"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-[#E8650A]">
            <Link className="font-bold text-lg" to="/">
              Accueil
            </Link>
            <Link className="font-bold text-lg" to="/recipes">
              Recettes
            </Link>
            <Link className="font-bold text-lg" to="/medias">
              Œuvres
            </Link>
            <Link className="font-bold text-lg" to="/about">
              À Propos
            </Link>

            {user && (
              <Link className="font-bold text-lg" to="/memberPage">
                Mon Espace CinéDélices
              </Link>
            )}
          </nav>

          {/* DESKTOP AUTH */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="bg-[#E8650A] text-white px-4 py-2 rounded-full font-bold"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="bg-white text-[#E8650A] px-4 py-2 rounded-full font-bold"
                >
                  Inscription
                </button>

                <button
                  type="button"
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

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* MOBILE MENU */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[82%] max-w-[320px] bg-[#FFFBEF] shadow-2xl transform transition-transform duration-300 lg:hidden font-fredoka ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#FFC854] px-4 py-4">
          <Link to="/" onClick={closeMenu}>
            <img
              src="/images/cine-delices.png"
              alt="CinéDélices"
              className="w-24 h-auto"
            />
          </Link>

          <button
            type="button"
            aria-label="Fermer le menu"
            className="text-[#E8650A] text-3xl font-bold leading-none"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-5 py-6 text-[#E8650A]">
          <Link
            className="rounded-2xl px-4 py-3 text-lg font-bold hover:bg-[#FFE69D]"
            to="/"
            onClick={closeMenu}
          >
            Accueil
          </Link>

          <Link
            className="rounded-2xl px-4 py-3 text-lg font-bold hover:bg-[#FFE69D]"
            to="/recipes"
            onClick={closeMenu}
          >
            Recettes
          </Link>

          <Link
            className="rounded-2xl px-4 py-3 text-lg font-bold hover:bg-[#FFE69D]"
            to="/medias"
            onClick={closeMenu}
          >
            Œuvres
          </Link>

          <Link
            className="rounded-2xl px-4 py-3 text-lg font-bold hover:bg-[#FFE69D]"
            to="/about"
            onClick={closeMenu}
          >
            À Propos
          </Link>

          {user && (
            <Link
              className="rounded-2xl px-4 py-3 text-lg font-bold hover:bg-[#FFE69D]"
              to="/memberPage"
              onClick={closeMenu}
            >
              Mon Espace CinéDélices
            </Link>
          )}
        </nav>

        <div className="mt-auto px-5 pb-6">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-full bg-[#E8650A] px-4 py-3 font-bold text-white"
            >
              Déconnexion
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowRegister(true);
                  setMenuOpen(false);
                }}
                className="w-full rounded-full bg-white px-4 py-3 font-bold text-[#E8650A] shadow"
              >
                Inscription
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowLogin(true);
                  setMenuOpen(false);
                }}
                className="w-full rounded-full bg-[#E8650A] px-4 py-3 font-bold text-white"
              >
                Connexion
              </button>
            </div>
          )}
        </div>
      </aside>

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