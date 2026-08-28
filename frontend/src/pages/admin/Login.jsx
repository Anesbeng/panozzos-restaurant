import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="font-heading text-2xl mb-6 text-brand-black">
          Admin Login
        </h1>
        {error && <p className="text-brand-red text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-6"
          required
        />
        <button className="w-full bg-brand-red text-white uppercase text-sm py-3 rounded hover:bg-brand-black transition">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
