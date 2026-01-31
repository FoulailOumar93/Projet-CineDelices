import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.service";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const Register = ({ open, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);

      await api.register({
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      // 👉 inscription OK → on bascule vers login
      onClose();
      if (onSwitchToLogin) onSwitchToLogin();

    } catch (err) {
      console.error("REGISTER ERROR :", err);

      // 👉 message précis venant du backend
      if (err.message.includes("existe")) {
        setError(err.message);
      } else {
        setError("Erreur serveur. Réessayez plus tard.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#FFFBEF] p-8 rounded-3xl shadow-xl max-w-sm w-full relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center text-[#E8650A] mb-6">
          Inscription
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Nom"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border"
          />

          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <PiEyeSlash size={20} /> : <PiEye size={20} />}
            </button>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmation"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8650A] text-white font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Déjà un compte ?{" "}
          <button
            onClick={() => {
              onClose();
              if (onSwitchToLogin) onSwitchToLogin();
            }}
            className="text-[#E8650A] font-bold"
          >
            Connexion
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
