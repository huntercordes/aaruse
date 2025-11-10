import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import MyPickups from "./MyPickups";
import YourGuide from "./YourGuide";
import Privacy from "./Privacy";

import Notifications from "./Notifications";
import LanguageSettings from "./LanguageSettings";
import ChangePassword from "./ChangePassword";

import styles from "../styles/AccountSettings.module.css";

export default function AccountSettings({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState("main");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }
    navigate("/"); // redirect to login page
  };

  // 🔹 Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("User not found or not logged in.");
        return;
      }

      // 1️⃣ Delete user profile record from 'profiles'
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 2️⃣ Delete posts belonging to that user
      const { error: postsError } = await supabase
        .from("posts")
        .delete()
        .eq("user_id", user.id);

      if (postsError) throw postsError;

      // 3️⃣ Sign the user out
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      alert("Your account has been deleted.");
      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Error deleting account:", error.message);
      alert("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Subpages
  if (activeSubPage === "pickups") {
    return <MyPickups onBack={() => setActiveSubPage("main")} />;
  }
  if (activeSubPage === "language") {
    return <LanguageSettings onBack={() => setActiveSubPage("main")} />;
  }
  if (activeSubPage === "password") {
    return <ChangePassword onBack={() => setActiveSubPage("main")} />;
  }
  if (activeSubPage === "notifications") {
    return <Notifications onBack={() => setActiveSubPage("main")} />;
  }
  if (activeSubPage === "guide") {
    return <YourGuide onBack={() => setActiveSubPage("main")} />;
  }
  if (activeSubPage === "privacy") {
    return <Privacy onBack={() => setActiveSubPage("main")} />;
  }

  // 🔹 Main account settings screen
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>Account settings</h2>
      </div>

      <div className={styles.options}>
        <button
          className={styles.option}
          onClick={() => setActiveSubPage("password")}>
          Change password →
        </button>
        <button
          className={styles.option}
          onClick={() => setActiveSubPage("pickups")}>
          My pickups →
        </button>
        <button className={styles.option}>Personalisation →</button>
        <button
          className={styles.option}
          onClick={() => setActiveSubPage("language")}>
          Language settings →
        </button>
        <button
          className={styles.option}
          onClick={() => setActiveSubPage("notifications")}>
          Notifications →
        </button>
        <button
          className={styles.option}
          onClick={() => setActiveSubPage("guide")}>
          Your guide to AARUSE →
        </button>
        <button
          className={styles.option}
          onClick={() => setActiveSubPage("privacy")}>
          Privacy →
        </button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.logout}
          onClick={handleLogout}
          disabled={loading}>
          {loading ? "Logging out..." : "Log out"}
        </button>

        <button
          className={styles.delete}
          onClick={handleDeleteAccount}
          disabled={loading}>
          {loading ? "Deleting..." : "Delete account"}
        </button>
      </div>
    </div>
  );
}
