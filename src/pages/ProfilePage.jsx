import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/ProfilePage.module.css";
import EditProfileModal from "../components/EditProfileModal";
import AccountSettings from "../components/AccountSettings"; // ✅ add this

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // ✅ new state

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>YOU</h1>

        {/* ✅ Hide profile content when settings is active */}
        {!showSettings && (
          <div className={styles.profileCard}>
            <div className={styles.imagePlaceholder}></div>

            <h2 className={styles.name}>{profile?.username || "Your Name"}</h2>

            <p className={styles.info}>
              since {new Date(profile?.created_at).toLocaleDateString("da-DK")}{" "}
              {profile?.postal_code || "Postal Code"}
            </p>

            <p className={styles.reviews}>Member reviews</p>

            <div className={styles.stars}>
              {Array(5)
                .fill("★")
                .map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
            </div>

            <button
              className={styles.button}
              onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
            <button
              className={styles.button}
              onClick={() => setShowSettings(true)} // ✅ opens settings
            >
              Account Settings
            </button>
          </div>
        )}

        {/* ✅ Settings overlay */}
        {showSettings && (
          <AccountSettings onBack={() => setShowSettings(false)} />
        )}
      </div>

      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        profile={profile}
        onSave={(updatedData) => setProfile({ ...profile, ...updatedData })}
      />
    </>
  );
}
