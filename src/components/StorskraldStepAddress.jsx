import { useState } from "react";
import { Icon } from "@iconify/react";
import StorskraldInfoPopup from "./StorskraldInfoPopup";
import styles from "../styles/StorskraldStepAddress.module.css";

export default function StorskraldStepAddress({
  subStep,
  formData,
  setFormData,
  onContinue,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAddress = () => {
    setFormData((prev) => ({ ...prev, address: "" }));
  };
  const availableDates = [
    "Monday d.10.11.25",
    "Tuesday d.11.11.25",
    "Wednesday d.12.11.25",
    "Thursday d.13.11.25",
    "Friday d.14.11.25",
    "Monday d.17.11.25",
  ];

  return (
    <div className={styles.container}>
      {subStep === "address" ? (
        <>
          <h3>
            Enter the address where you place your bulky waste.
            <Icon
              icon="mdi:information-outline"
              onClick={() => setShowPopup(true)}
              className={styles.infoIcon}
            />
          </h3>

          <div className={styles.infoRow}>
            <p>
              Bulky waste collection is only for citizens of Aarhus – not
              businesses.
            </p>
          </div>

          <div className={styles.addressBox}>
            <input
              type="text"
              name="address"
              placeholder="Search for pickup address"
              value={formData.address || ""}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <button className={styles.continue} onClick={onContinue}>
            Continue
          </button>
        </>
      ) : (
        <>
          {/* ✅ Address summary */}
          {formData.address && (
            <div className={styles.addressSummary}>
              <p className={styles.addressText}>{formData.address}</p>
              <button className={styles.resetButton} onClick={resetAddress}>
                Reset selection
              </button>
            </div>
          )}

          <div className={styles.divider}></div>

          {/*  Pickup date dropdown */}
          <h3>Selected pickup date</h3>
          <div
            className={styles.dropdown}
            onClick={() => setShowDateDropdown(!showDateDropdown)}>
            {formData.pickupDate || "Select pickup date"}
            <Icon
              icon={showDateDropdown ? "mdi:chevron-up" : "mdi:chevron-down"}
              style={{
                position: "absolute",
                right: "20px",
                fontSize: "20px",
                color: "#666",
              }}
            />
          </div>

          {showDateDropdown && (
            <div
              style={{
                border: "1.5px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
                marginTop: "4px",
                maxHeight: "160px",
                overflowY: "auto",
                fontFamily: "var(--font-primary)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}>
              {availableDates.map((date, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 14px",
                    borderBottom:
                      i !== availableDates.length - 1
                        ? "1px solid #eee"
                        : "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      pickupDate: date,
                    }));
                    setShowDateDropdown(false);
                  }}>
                  {date}
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className={styles.divider}></div>

          <div className={styles.infoBox}>
            <h4>Tell us where you put your bulky waste</h4>
            <p className={styles.infoHint}>
              Make sure it's easy to access and safe to collect.
            </p>

            <div className={styles.doDontWrapper}>
              <div className={styles.doBox}>
                <h4>DO</h4>
                <ul>
                  <li>Pavement</li>
                  <li>Public area (e.g. parking space)</li>
                  <li>At the intersection with the nearest access road</li>
                </ul>
              </div>

              <div className={styles.dontBox}>
                <h4>DON’T</h4>
                <ul>
                  <li>Underground waste containers</li>
                  <li>Traffic light</li>
                  <li>Roads with no stopping</li>
                  <li>Private land</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ✅ User info */}
          <div className={styles.formGroup}>
            <h4>Your information</h4>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name || ""}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email || ""}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number*"
              value={formData.phone || ""}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <button className={styles.continue} onClick={onContinue}>
            Continue
          </button>
        </>
      )}

      {/* ℹ️ Info popup */}
      {showPopup && (
        <StorskraldInfoPopup
          message="Only write your own address if you place the bulky waste in front of your home."
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
