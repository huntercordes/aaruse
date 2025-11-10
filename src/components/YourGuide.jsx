import { useState } from "react";
import styles from "../styles/YourGuide.module.css";

export default function YourGuide({ onBack }) {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const guides = [
    {
      title: "What can I give or sell?",
      content:
        "Anything you like, as long as it could possibly be useful for someone else and wouldn’t be considered trash. Just make sure you are clear on what issues there are with your item/items (if there are any) in the general description when you post your item.",
    },
    {
      title: "Item availability",
      content:
        "Sometimes free items placed in public spots may be taken by someone who isn’t using Aaruse. Don’t worry — as a seller you can mark the item as 'Taken' anytime to keep things updated.\n\nIf you are exploring items on the app, we recommend checking the posting date, checking if the item is marked in a public or private place, or messaging the giver first to make sure it’s still there so you don’t experience a wasted trip.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>Your guide to AARUSE</h2>
      </div>

      <div className={styles.content}>
        {guides.map((item, index) => (
          <div key={index} className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggle(index)}>
              <span>{item.title}</span>
              <span
                className={`${styles.arrow} ${
                  open === index ? styles.rotate : ""
                }`}>
                ▼
              </span>
            </button>

            <div
              className={`${styles.accordionContent} ${
                open === index ? styles.open : ""
              }`}>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
