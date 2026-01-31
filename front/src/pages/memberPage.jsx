import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import AddRecipe from "../components/addRecipe";
import AddMedia from "../components/addMedia";
import AdminValidation from "../pages/AdminValidation";
import AlertModal from "../components/alertModal";

// services
import { api } from "../services/api.service";

const MemberPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  /* ===========================
     AUTH + FETCH USER
  =========================== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await api.getMe();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("Session invalide", err);
        localStorage.clear();
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  /* ===========================
     LOGOUT
  =========================== */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* ===========================
     DELETE ACCOUNT
  =========================== */
  const handleConfirmDelete = async () => {
    try {
      setLoadingDelete(true);
      await api.deleteMe();
      handleLogout();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(false);
      setShowDeleteConfirm(false);
    }
  };

  /* ===========================
     LOADING
  =========================== */
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen font-bold text-[#E8650A]">
        Chargement…
      </div>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("fr-FR")
    : "—";

  /* ===========================
     UI
  =========================== */
  return (
    <>
      <main className="bg-[#FFFBEF] min-h-screen pb-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">

          {/* ===== TITLE ===== */}
          <h1 className="text-4xl font-bold text-[#E8650A] mb-6 font-fredoka">
            Mon Espace CinéDélices
          </h1>

          {/* ===== ROLE BADGE ===== */}
          <div className="mb-8">
            {user.role === "admin" ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold">
                🛡️ Administrateur
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-bold">
                👤 Membre
              </span>
            )}
          </div>

          {/* ===== USER INFO ===== */}
          <section className="bg-white rounded-2xl shadow p-8 mb-12">
            <p className="text-lg mb-2">
              👋 Bonjour <strong>{user.username}</strong>
            </p>

            <p className="mb-2">
              <strong>Email :</strong> {user.email}
            </p>

            <p className="mb-2">
              <strong>Rôle :</strong>{" "}
              <span className="font-bold">
                {user.role === "admin" ? "Administrateur" : "Membre"}
              </span>
            </p>

            <p className="mb-6">
              <strong>Membre depuis :</strong> {memberSince}
            </p>

            <button
              onClick={handleLogout}
              className="text-red-600 font-bold"
            >
              Se déconnecter
            </button>
          </section>

          {/* ===== ACTIONS ===== */}
          <section className="space-y-4 mb-16">
            <button
              onClick={() => setShowAddRecipe(true)}
              className="w-full bg-[#E8650A] text-white py-4 rounded-full font-bold"
            >
              ➕ Ajouter une recette
            </button>

            <button
              onClick={() => setShowAddMedia(true)}
              className="w-full bg-[#E8650A] text-white py-4 rounded-full font-bold"
            >
              ➕ Ajouter une œuvre
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full text-red-600 font-bold pt-4"
            >
              Supprimer mon compte
            </button>
          </section>

          {/* ===== ADMIN SPACE (UNE SEULE FOIS) ===== */}
          {user.role === "admin" && (
            <section className="bg-white rounded-3xl shadow-lg p-8 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                🛠️ Espace Admin
              </h2>

              <p className="text-gray-600 mb-6">
                Validation des ingrédients, recettes et œuvres proposées par les membres.
              </p>

              <AdminValidation />
            </section>
          )}
        </div>
      </main>

      {/* ===== MODALES ===== */}
      <AddRecipe
        open={showAddRecipe}
        onClose={() => setShowAddRecipe(false)}
      />

      <AddMedia
        open={showAddMedia}
        onClose={() => setShowAddMedia(false)}
      />

      {showDeleteConfirm && (
        <AlertModal
          open={showDeleteConfirm}
          text_alert="Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          loading={loadingDelete}
        />
      )}
    </>
  );
};

export default MemberPage;