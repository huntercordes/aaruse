import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/EditProfileModal.module.css";

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    postal_code: profile?.postal_code || "",
    description: profile?.description || "",
    pickup_private: profile?.pickup_private || false,
    pickup_public: profile?.pickup_public || false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({
        username: formData.username,
        postal_code: formData.postal_code,
        description: formData.description,
        pickup_private: formData.pickup_private,
        pickup_public: formData.pickup_public,
      })
      .eq("id", profile.id);

    if (!error) {
      onSave(formData);
      onClose();
    } else {
      console.error("Error updating profile:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className={styles.header}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <h2 className={styles.title}>YOU</h2>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.imagePlaceholder}></div>
          <h3 className={styles.name}>{formData.username || "Your Name"}</h3>

          <p className={styles.sectionTitle}>Basic Info</p>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="postal_code"
            placeholder="Postal code"
            value={formData.postal_code}
            onChange={handleChange}
            className={styles.input}
          />

          <p className={styles.sectionTitle}>General description</p>
          <textarea
            name="description"
            placeholder="Write short description here"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
          />

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              name="pickup_private"
              checked={formData.pickup_private}
              onChange={handleChange}
            />
            Pick up at private location
          </label>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              name="pickup_public"
              checked={formData.pickup_public}
              onChange={handleChange}
            />
            Pick up at public location
          </label>

          <p className={styles.infoNote}>
            You can change your email, password & preferences in Account
            settings.
          </p>
        </div>
      </div>
    </div>
  );
}
