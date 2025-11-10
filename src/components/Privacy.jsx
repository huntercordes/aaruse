import { useState } from "react";
import styles from "../styles/Privacy.module.css";

export default function Privacy({ onBack }) {
  const [toggles, setToggles] = useState({
    showcase: false,
    notify: false,
    tracking: false,
    personalized: false,
    recentlyViewed: false,
  });

  const toggleSwitch = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>Privacy</h2>
      </div>

      <div className={styles.content}>
        {/* Showcase toggle */}
        <div className={styles.toggleRow}>
          <span>
            Allow AARUSE to showcase my items on social media and other websites
          </span>
          <div
            className={`${styles.toggle} ${
              toggles.showcase ? styles.active : ""
            }`}
            onClick={() => toggleSwitch("showcase")}>
            <div className={styles.circle}></div>
          </div>
        </div>

        {/* Notify sellers toggle */}
        <div className={styles.toggleRow}>
          <span>Notify sellers/givers when I favourite their items</span>
          <div
            className={`${styles.toggle} ${
              toggles.notify ? styles.active : ""
            }`}
            onClick={() => toggleSwitch("notify")}>
            <div className={styles.circle}></div>
          </div>
        </div>

        {/* Third-party tracking toggle */}
        <div className={styles.toggleRow}>
          <div className={styles.labelGroup}>
            <span>Third-party tracking</span>
            <a href="#" className={styles.link}>
              Learn more
            </a>
          </div>
          <div
            className={`${styles.toggle} ${
              toggles.tracking ? styles.active : ""
            }`}
            onClick={() => toggleSwitch("tracking")}>
            <div className={styles.circle}></div>
          </div>
        </div>

        {/* Personalized content toggle */}
        <div className={styles.toggleRow}>
          <div className={styles.labelGroup}>
            <span>Personalised content</span>
            <a href="#" className={styles.link}>
              Learn more
            </a>
          </div>
          <div
            className={`${styles.toggle} ${
              toggles.personalized ? styles.active : ""
            }`}
            onClick={() => toggleSwitch("personalized")}>
            <div className={styles.circle}></div>
          </div>
        </div>

        {/* Recently viewed toggle */}
        <div className={styles.toggleRow}>
          <span>
            Allow AARUSE to display my recently viewed items on my Homepage
          </span>
          <div
            className={`${styles.toggle} ${
              toggles.recentlyViewed ? styles.active : ""
            }`}
            onClick={() => toggleSwitch("recentlyViewed")}>
            <div className={styles.circle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
