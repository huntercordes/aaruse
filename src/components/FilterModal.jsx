import { useState } from "react";
import { Icon } from "@iconify/react";
import SortByModal from "./SortByModal";
import ConditionModal from "./ConditionalModal";
import styles from "../styles/FilterModal.module.css";

export default function FilterModal({ onClose, onApply }) {
  const [activeSubModal, setActiveSubModal] = useState(null);

  // Handlers for navigation
  const openSort = () => setActiveSubModal("sort");
  const openCondition = () => setActiveSubModal("condition");
  const goBack = () => setActiveSubModal(null);

  // Sub-modals
  if (activeSubModal === "sort")
    return <SortByModal onBack={goBack} onApply={onApply} />;
  if (activeSubModal === "condition")
    return <ConditionModal onBack={goBack} onApply={onApply} />;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.handle}></div>

        {/* Header */}
        <div className={styles.header}>
          <Icon
            icon="proicons:close"
            className={styles.closeIcon}
            onClick={onClose}
          />
          <h2 className={styles.title}>Filters</h2>
          <button className={styles.clear}>Clear</button>
        </div>

        {/* Search */}
        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <Icon icon="proicons:search" className={styles.searchIcon} />
        </div>

        {/* Filter list */}
        <div className={styles.options}>
          <div className={styles.optionRow} onClick={openSort}>
            <span>Sort by</span>
            <Icon icon="proicons:chevron-right" />
          </div>
          <div className={styles.optionRow}>
            <span>Categories</span>
            <Icon icon="proicons:chevron-right" />
          </div>
          <div className={styles.optionRow}>
            <span>Location</span>
            <Icon icon="proicons:chevron-right" />
          </div>
          <div className={styles.optionRow}>
            <span>Price</span>
            <Icon icon="proicons:chevron-right" />
          </div>
          <div className={styles.optionRow} onClick={openCondition}>
            <span>Condition</span>
            <Icon icon="proicons:chevron-down" />
          </div>
        </div>

        {/* Bottom button */}
        <button className={styles.showResults} onClick={onApply}>
          Show results
        </button>
      </div>
    </div>
  );
}
