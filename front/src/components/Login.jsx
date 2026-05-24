import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const Login = ({
  open,
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     RESET À CHAQUE OUVERTURE
  ========================= */
  useEffect(() => {
    if (open) {
      setFormData({
        identifier: "",
        password: "",
      });

      setError("");
      setShowPassword(false);
    }
  }, [open]);

  /* =========================
     INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     SUBMIT LOGIN
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      /* =========================
         LOGIN REQUEST
      ========================= */
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.identifier.trim(),
            password: formData.password,
          }),
        }
      );

      /* =========================
         RESPONSE JSON
      ========================= */
      const data = await response.json();

      console.log("LOGIN RESPONSE :", data);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Erreur de connexion"
        );
      }

      /* =========================
         TOKEN
      ========================= */
      const token =
        data.token ||
        data.accessToken ||
        data.jwt;

      if (!token) {
        throw new Error("Token manquant");
      }

      /* =========================
         SAVE TOKEN
      ========================= */
      localStorage.setItem("token", token);

      /* =========================
         GET CURRENT USER
      ========================= */
      const meResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const meData = await meResponse.json();

      console.log("ME RESPONSE :", meData);

      if (!meResponse.ok) {
        throw new Error(
          meData?.error ||
            "Impossible de récupérer l'utilisateur"
        );
      }

      /* =========================
         SAVE USER
      ========================= */
      localStorage.setItem(
        "me",
        JSON.stringify(meData)
      );

      /* =========================
         SYNC REACT
      ========================= */
      window.dispatchEvent(new Event("storage"));

      /* =========================
         CALLBACKS
      ========================= */
      onLoginSuccess?.(meData);

      onClose?.();

      navigate("/memberPage");
    } catch (err) {
      console.error("LOGIN ERROR :", err);

      setError(
        err.message || "Erreur de connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-[#FFFBEF] p-8 rounded-[30px] shadow-2xl max-w-sm w-full mx-4 relative font-fredoka">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-[#3E2723] text-center mb-6">
          Connexion
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* IDENTIFIER */}
          <div>
            <label className="block text-sm font-bold text-[#5D4037] mb-1 ml-1">
              Nom d'utilisateur / E-mail
            </label>

            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#FCF8F2] border rounded-xl focus:border-[#E8650A] focus:ring-1 focus:ring-[#E8650A]"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-bold text-[#5D4037] mb-1 ml-1">
              Mot de passe
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#FCF8F2] border rounded-xl focus:border-[#E8650A] focus:ring-1 focus:ring-[#E8650A]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <PiEyeSlash size={20} />
                ) : (
                  <PiEye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8650A] text-white font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading
              ? "Connexion..."
              : "Connexion"}
          </button>
        </form>

        {/* REGISTER */}
        <div className="mt-6 text-center text-sm text-[#5D4037]">
          <p>
            Pas de compte ?{" "}
            <button
              onClick={() => {
                onClose?.();
                onSwitchToRegister?.();
              }}
              className="text-[#E8650A] font-bold hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;