import { useState } from "react";
import { Icon } from "@iconify/react";
import StorskraldInfoPopup from "./StorskraldInfoPopup";
import styles from "../styles/StorskraldStepAddress.module.css";

export default function StorskraldStepAddress({ subStep, onContinue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    "Lollandsgade 31A, 8000 Aarhus C"
  );

  const resetAddress = () => setSelectedAddress("");

  return (
    <div className={styles.container}>
      {subStep === "address" ? (
        <>
          <h3>Enter the address where you place your bulky waste.</h3>

          <div className={styles.infoRow}>
            <p>
              Bulky waste collection is only for citizens of Aarhus – not
              businesses.
            </p>
          </div>

          <div className={styles.addressBox}>
            <input
              type="text"
              placeholder="Search for pickup address"
              className={styles.input}
            />
            <Icon
              icon="mdi:information-outline"
              onClick={() => setShowPopup(true)}
              className={styles.infoIcon}
            />
          </div>

          <button className={styles.continue} onClick={onContinue}>
            Continue
          </button>
        </>
      ) : (
        <>
          {/* Address summary */}
          {selectedAddress && (
            <div className={styles.addressSummary}>
              <p className={styles.addressText}>{selectedAddress}</p>
              <button className={styles.resetButton} onClick={resetAddress}>
                Reset selection
              </button>
            </div>
          )}

          <h3>Selected pickup date</h3>
          <button className={styles.dropdown}>Select pickup date</button>

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
                  <li>Public area (e.g. a parking space)</li>
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

          {/* Your information fields now below DO/DON’T */}
          <div className={styles.formGroup}>
            <h4>Your information</h4>
            <input type="text" placeholder="Name*" className={styles.input} />
            <input type="email" placeholder="Email*" className={styles.input} />
            <input
              type="tel"
              placeholder="Phone number*"
              className={styles.input}
            />
          </div>

          <button className={styles.continue} onClick={onContinue}>
            Continue
          </button>
        </>
      )}

      {/* Center info popup */}
      {showPopup && (
        <StorskraldInfoPopup
          message="Only write your own address if you place the bulky waste in front of your home."
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
