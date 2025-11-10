import styles from "../styles/StorskraldStepReceipt.module.css";

export default function StorskraldStepReceipt({ formData, onBackHome }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Order receipt</h3>

      <div className={styles.receiptBox}>
        <p className={styles.address}>
          {formData.address || "Address not set"}, 8000 Aarhus C
        </p>

        <div className={styles.row}>
          <p className={styles.label}>Name</p>
          <p className={styles.value}>{formData.name || "—"}</p>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>Date</p>
          <p className={styles.value}>{formData.pickupDate || "—"}</p>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>Time</p>
          <p className={styles.value}>3–17:30 PM</p>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>Summary</p>
          <p className={styles.value}>{formData.summary || "1x Bookshelf"}</p>
        </div>
      </div>

      <button className={styles.backButton} onClick={onBackHome}>
        Back to home
      </button>
    </div>
  );
}
