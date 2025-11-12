import styles from "../styles/StorskraldStepOverview.module.css";

export default function StorskraldStepOverview({ formData, onContinue }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Overview</h3>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.label}>Name</p>
        <p className={styles.value}>{formData.name || "—"}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Email</p>
        <p className={styles.value}>{formData.email || "—"}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Telephone</p>
        <p className={styles.value}>{formData.phone || "—"}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Pickup address</p>
        <p className={styles.value}>{formData.address || "—"}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Pickup date</p>
        <p className={styles.value}>{formData.pickupDate || "—"}</p>
      </div>

      {formData.summary && (
        <div className={styles.section}>
          <p className={styles.label}>Selected items</p>
          <p className={styles.value}>{formData.summary}</p>
        </div>
      )}

      <button className={styles.continue} onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
