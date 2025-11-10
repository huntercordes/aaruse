import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/FilterModal.module.css";

export default function ConditionModal({ onBack, onApply }) {
  const [conditions, setConditions] = useState({
    "As new": false,
    Good: false,
  });

  const toggleCondition = (key) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyFilters = () => {
    const selected = Object.keys(conditions).filter((key) => conditions[key]);
    onApply(selected);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.handle}></div>

        <div className={styles.header}>
          <Icon
            icon="proicons:arrow-left"
            className={styles.closeIcon}
            onClick={onBack}
          />
          <h2 className={styles.title}>Condition</h2>
          <button className={styles.clear}>Clear</button>
        </div>

        <div className={styles.options}>
          {Object.keys(conditions).map((label) => (
            <label key={label} className={styles.optionRow}>
              <span>{label}</span>
              <input
                type="checkbox"
                checked={conditions[label]}
                onChange={() => toggleCondition(label)}
              />
            </label>
          ))}
        </div>

        <button className={styles.showResults} onClick={applyFilters}>
          Show results
        </button>
      </div>
    </div>
  );
}
