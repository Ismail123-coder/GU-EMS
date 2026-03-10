import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Login.css"; // reuse same styles

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // 🔥 REQUIRED (fixes your issue)

    console.log("Register clicked"); // ✅ for testing

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully. Wait for admin approval.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Register</h2>

        {/* ✅ FORM START */}
        <form onSubmit={handleRegister}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ✅ FIXED BUTTON */}
          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
