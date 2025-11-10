import { useState } from "react";
import styles from "../styles/ChangePassword.module.css";

export default function ChangePassword({ onBack }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    // Future: use supabase.auth.updateUser({ password })
    setMessage("Password updated successfully (placeholder)");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>Change password</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.helper}>
          How to create a <span className={styles.link}>strong password</span>
        </p>

        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}>
            👁
          </button>
        </div>

        <div className={styles.inputWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowConfirm(!showConfirm)}>
            👁
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          Change password
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
