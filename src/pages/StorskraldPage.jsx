import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/StorskraldPage.module.css";
import StorskraldPopup from "../components/StorskraldPopup.jsx";

export default function StorskraldPage() {
  const [showPopup, setShowPopup] = useState(true); // ✅ Show immediately on page load

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>AARUSE</h1>
        <Icon
          icon="mdi:information-outline"
          className={styles.infoIcon}
          onClick={() => setShowPopup(true)} // reopen popup
        />
      </header>

      {/* Content */}
      <div className={styles.content}>
        <h2 className={styles.title}>Storskrald</h2>
        <p className={styles.subtitle}>Get your bulky waste picked up</p>
        <p className={styles.text}>It’s easy and free</p>

        <div className={styles.buttons}>
          <button className={styles.primaryButton}>Order pickup</button>
          <button className={styles.secondaryButton}>
            Cancel or correct order
          </button>
        </div>

        <button className={styles.learnMore} onClick={() => setShowPopup(true)}>
          Learn more
        </button>
      </div>

      {/* Bottom popup */}
      {showPopup && <StorskraldPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
