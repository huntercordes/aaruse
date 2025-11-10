import styles from "../styles/StorskraldInfoPopup.module.css";

export default function StorskraldInfoPopup({ message, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
