import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/FilterModal.module.css";

export default function SortByModal({ onBack, onApply }) {
  const [selected, setSelected] = useState(null);
  const options = [
    "Relevance",
    "Price: high to low",
    "Price: low to high",
    "Newest first",
  ];

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
          <h2 className={styles.title}>Sort by</h2>
          <button className={styles.clear}>Clear</button>
        </div>

        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <Icon icon="proicons:search" className={styles.searchIcon} />
        </div>

        <div className={styles.sortOptions}>
          {options.map((opt) => (
            <label key={opt} className={styles.optionRow}>
              <span>{opt}</span>
              <input
                type="radio"
                name="sort"
                checked={selected === opt}
                onChange={() => setSelected(opt)}
              />
            </label>
          ))}
        </div>

        <button
          className={styles.showResults}
          onClick={() => onApply(selected)}>
          Show results
        </button>
      </div>
    </div>
  );
}
