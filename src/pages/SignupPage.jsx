import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/aaruselogo.png";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // 🔹 Create account in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const user = data.user;
      if (user) {
        // 🔹 Create matching profile row
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            email: user.email,
          },
        ]);
        if (profileError) throw profileError;
      }

      setMessage("✅ Account created! Check your email for verification.");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="AARUSE Logo" className={styles.logo} />
      <h1 className={styles.title}>Create Account</h1>

      <form className={styles.form} onSubmit={handleSignup}>
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
          Sign Up
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.message}>{message}</p>}
      </form>

      <p className={styles.signupText}>
        Already have an account?{" "}
        <span className={styles.signupLink} onClick={() => navigate("/")}>
          Log in
        </span>
      </p>
    </div>
  );
}
