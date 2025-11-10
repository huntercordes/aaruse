import { useState } from "react";
import styles from "../styles/Notifications.module.css";

export default function Notifications({ onBack }) {
  const [enabled, setEnabled] = useState(false);

  const toggleNotifications = () => {
    setEnabled(!enabled);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>Notifications</h2>
      </div>

      <div className={styles.content}>
        <label className={styles.toggleRow}>
          <span>Enable push notifications</span>
          <div
            className={`${styles.toggle} ${enabled ? styles.active : ""}`}
            onClick={toggleNotifications}>
            <div className={styles.circle}></div>
          </div>
        </label>
      </div>
    </div>
  );
}
