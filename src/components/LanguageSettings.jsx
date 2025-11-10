import { useState } from "react";
import styles from "../styles/LanguageSettings.module.css";

export default function LanguageSettings({ onBack }) {
  const [selectedLang, setSelectedLang] = useState("english");

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>Language settings</h2>
      </div>

      <div className={styles.content}>
        <p className={styles.label}>Select your preferred language</p>

        <div
          className={`${styles.option} ${
            selectedLang === "english" ? styles.active : ""
          }`}
          onClick={() => setSelectedLang("english")}>
          <span>English</span>
          <span className={styles.radio}>
            {selectedLang === "english" ? "●" : "○"}
          </span>
        </div>

        <div
          className={`${styles.option} ${
            selectedLang === "danish" ? styles.active : ""
          }`}
          onClick={() => setSelectedLang("danish")}>
          <span>Danish</span>
          <span className={styles.radio}>
            {selectedLang === "danish" ? "●" : "○"}
          </span>
        </div>
      </div>
    </div>
  );
}
