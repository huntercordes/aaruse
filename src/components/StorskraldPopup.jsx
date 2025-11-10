import styles from "../styles/StorskraldPopup.module.css";

export default function StorskraldPopup({
  title,
  message,
  highlight,
  buttons = [],
  onClose,
}) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.popup}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className={styles.handle}></div>

        {title && (
          <h3 className={styles.title}>
            {title}{" "}
            {highlight && <span className={styles.highlight}>{highlight}</span>}
          </h3>
        )}

        {message && <p className={styles.text}>{message}</p>}

        {buttons.length > 0 ? (
          <div className={styles.buttonGroup}>
            {buttons.map((btn, index) => (
              <button
                key={index}
                className={`${styles.button} ${
                  btn.variant === "secondary" ? styles.secondary : ""
                }`}
                onClick={btn.onClick}>
                {btn.label}
              </button>
            ))}
          </div>
        ) : (
          <button className={styles.button} onClick={onClose}>
            Got it, thank you!
          </button>
        )}
      </div>
    </div>
  );
}
