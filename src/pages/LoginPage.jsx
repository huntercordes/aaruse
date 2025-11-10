import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/aaruselogo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("✅ Logged in as:", data.user.email);
      navigate("/home"); // redirect after successful login
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="AARUSE Logo" className={styles.logo} />
      <h1 className={styles.title}>AARUSE Login</h1>

      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.signupText}>
        Don’t have an account?{" "}
        <span className={styles.signupLink} onClick={() => navigate("/signup")}>
          Sign up here
        </span>
      </p>
    </div>
  );
}
