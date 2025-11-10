import { useState } from "react";
import { Icon } from "@iconify/react";
import StorskraldPopup from "./StorskraldPopup";
import StorskraldForm from "./StorskraldForm";
import styles from "../styles/StorskraldContent.module.css";
import { useNavigate } from "react-router-dom";

export default function StorskraldContent() {
  const [showIntroPopup, setShowIntroPopup] = useState(true);
  const [showDecisionPopup, setShowDecisionPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // If form is active, show it instead
  if (showForm) return <StorskraldForm onBack={() => setShowForm(false)} />;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Storskrald</h2>
        <Icon
          icon="mdi:information-outline"
          className={styles.infoIcon}
          onClick={() => setShowIntroPopup(true)}
        />
      </div>

      <p className={styles.subtitle}>Get your bulky waste picked up</p>
      <p className={styles.text}>It’s easy and free</p>

      <div className={styles.buttonGroup}>
        <button
          className={styles.primary}
          onClick={() => setShowDecisionPopup(true)}>
          Order pickup
        </button>
        <button className={styles.secondary}>Cancel or correct order</button>
      </div>

      <button
        className={styles.learnMore}
        onClick={() => setShowIntroPopup(true)}>
        Learn more
      </button>

      {/* First intro popup */}
      {showIntroPopup && (
        <StorskraldPopup
          title="Book your pickup directly from"
          highlight="Kredsløb"
          message="If your item is still usable and your pickup is at least two days away, you can still post it on the feed. If someone claims it, mark it as taken — the pickup will then cancel automatically."
          onClose={() => setShowIntroPopup(false)}
        />
      )}

      {/* Second decision popup */}
      {showDecisionPopup && (
        <StorskraldPopup
          title="Ready to schedule your pickup?"
          message="You can go ahead as planned, or post your item on AARUSE too. Maybe it’s just what someone’s been looking for."
          buttons={[
            {
              label: "Schedule pickup only",
              onClick: () => {
                setShowDecisionPopup(false);
                setShowForm(true);
              },
            },
            {
              label: "Post first, schedule later",
              variant: "secondary",
              onClick: () => {
                setShowDecisionPopup(false);
                navigate("/post");
              },
            },
          ]}
          onClose={() => setShowDecisionPopup(false)}
        />
      )}
    </div>
  );
}
