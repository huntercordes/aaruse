import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/StorskraldStepWaste.module.css";

export default function StorskraldStepWaste({
  onContinue,
  formData,
  setFormData,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleQuantityChange = (category, item, value) => {
    setQuantities((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value,
      },
    }));
  };

  // Categories
  const categories = {
    Furniture: [
      "Mattress / Top Mattress",
      "Picture frames",
      "Room divider / Bookshelf",
      "Cupboard",
      "Dresser",
      "Piano",
      "Table",
      "Chair",
      "Sofa",
      "Bed frame",
    ],
    "Big textiles": [
      "Curtains",
      "Carpet / Rug",
      "Mattress cover",
      "Blankets",
      "Large cushions",
      "Duvets",
      "Fabric rolls",
      "Cloth sofa covers",
      "Towels (bulk)",
      "Sheets",
    ],
    "Hazardous waste": [
      "Paint cans",
      "Chemicals",
      "Aerosol cans",
      "Glue / adhesive containers",
      "Oil containers",
      "Batteries",
      "Fluorescent tubes",
      "Spray paint",
      "Cleaning products",
      "Garden pesticides",
    ],
    Electronics: [
      "TV",
      "Computer monitor",
      "Laptop",
      "Microwave oven",
      "Toaster",
      "Hair dryer",
      "Vacuum cleaner",
      "Printer",
      "Stereo system",
      "Game console",
    ],
    "Hard white products": [
      "Refrigerator",
      "Freezer",
      "Washing machine",
      "Dishwasher",
      "Oven",
      "Stove top",
      "Dryer",
      "Extractor hood",
      "Water heater",
      "Air conditioner unit",
    ],
    Paper: [
      "Cardboard boxes",
      "Newspapers",
      "Magazines",
      "Catalogs",
      "Office paper",
      "Cardboard tubes",
      "Gift wrapping paper",
      "Paper bags",
      "Shredded paper",
      "Old books",
    ],
  };

  // Convert selected quantities into summary
  const summaryItems = Object.entries(quantities).flatMap(([category, items]) =>
    Object.entries(items)
      .filter(([_, qty]) => Number(qty) > 0)
      .map(([item, qty]) => ({ category, item, qty }))
  );

  // Save summary in formData
  useEffect(() => {
    const summaryText = summaryItems
      .map((item) => `${item.qty}x ${item.item} (${item.category})`)
      .join(", ");
    setFormData((prev) => ({ ...prev, summary: summaryText }));
  }, [quantities]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>What do you need to get rid of?</h2>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <Icon icon="proicons:search" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>

      {/* Category list */}
      <div className={styles.categoryList}>
        {Object.keys(categories).map((category) => (
          <div key={category} className={styles.categorySection}>
            <button
              className={styles.categoryButton}
              onClick={() => toggleCategory(category)}>
              {category}
              <Icon
                icon={
                  expandedCategory === category
                    ? "mdi:chevron-up"
                    : "mdi:chevron-right"
                }
              />
            </button>

            {expandedCategory === category && (
              <div className={styles.itemsList}>
                {categories[category].map((item) => (
                  <div key={item} className={styles.itemRow}>
                    <select
                      value={quantities[category]?.[item] || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          category,
                          item,
                          parseInt(e.target.value)
                        )
                      }
                      className={styles.dropdown}>
                      {[0, 1, 2].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <span className={styles.itemLabel}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary dropdown */}
      {summaryItems.length > 0 && (
        <div className={styles.summaryBox}>
          <button
            className={styles.summaryHeader}
            onClick={() =>
              setExpandedCategory(
                expandedCategory === "Summary" ? null : "Summary"
              )
            }>
            Summary
            <Icon
              icon={
                expandedCategory === "Summary"
                  ? "mdi:chevron-up"
                  : "mdi:chevron-down"
              }
            />
          </button>
          {expandedCategory === "Summary" && (
            <div className={styles.summaryContent}>
              {summaryItems.map((item, index) => (
                <p key={index}>
                  {item.qty}x {item.item} ({item.category})
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <button className={styles.continue} onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
