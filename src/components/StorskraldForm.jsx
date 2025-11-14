import { useState } from "react";
import styles from "../styles/StorskraldForm.module.css";
import StorskraldStepAddress from "../components/StorskraldStepAddress";
import StorskraldStepWaste from "../components/StorskraldStepWaste";
import StorskraldStepOverview from "../components/StorskraldStepOverview";
import StorskraldStepReceipt from "../components/StorskraldStepReceipt";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function StorskraldForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("address");
  const [subStep, setSubStep] = useState("address");
  const [formData, setFormData] = useState({
    name: "Felix Andresson",
    email: "felixandresson@icloud.com",
    phone: "+45 68924368",
    address: "Lollandsgade 31A",
    pickupDate: "Wednesday d.12.11.25",
    summary: "1x Bookshelf",
  });

  const handleContinue = () => {
    if (currentStep === "address" && subStep === "address") {
      setSubStep("date");
    } else if (currentStep === "address" && subStep === "date") {
      setCurrentStep("waste");
      setSubStep("address");
    } else if (currentStep === "waste") {
      setCurrentStep("overview");
    } else if (currentStep === "overview") {
      setCurrentStep("receipt");
    }
  };

  const handleBackHome = () => {
    navigate("/home");
  };
  const handleBack = () => {
    // Step 1.2 → Step 1.1
    if (currentStep === "address" && subStep === "date") {
      setSubStep("address");
      return;
    }

    // Step 2 → Step 1.2
    if (currentStep === "address" && subStep === "address") {
      navigate("/"); // from first screen → home
      return;
    }

    // Step 2 → Step 1
    if (currentStep === "waste") {
      setCurrentStep("address");
      setSubStep("date");
      return;
    }

    // Step 3 → Step 2
    if (currentStep === "overview") {
      setCurrentStep("waste");
      return;
    }

    // Step 4 → Step 3
    if (currentStep === "receipt") {
      setCurrentStep("overview");
      return;
    }
  };
  const getStepTitle = () => {
    if (currentStep === "address") return "Pickup information";
    if (currentStep === "waste") return "Storskrald";
    if (currentStep === "overview") return "Order overview";
    if (currentStep === "receipt") return "Order receipt";

    return "";
  };

  return (
    <div className={styles.formWrapper}>
      {/* Back button */}
      <div className={styles.headerRow}>
        <Icon
          className={styles.backButton}
          onClick={handleBack}
          icon={"mdi:chevron-left"}
        />
        <h2 className={styles.stepTitle}>{getStepTitle()}</h2>
      </div>

      {/* Progress bar */}
      <div className={styles.progressContainer}>
        {["1", "2", "3", "4"].map((num, i) => (
          <div key={num} className={styles.stepWrapper}>
            <div
              className={`${styles.circle} ${
                (i === 0 && currentStep === "address") ||
                (i === 1 && currentStep === "waste") ||
                (i === 2 && currentStep === "overview") ||
                (i === 3 && currentStep === "receipt")
                  ? styles.active
                  : ""
              }`}>
              {num}
            </div>
            <p className={styles.stepLabel}>
              {i === 0
                ? "Choose location"
                : i === 1
                ? "Select the waste"
                : i === 2
                ? "Order Overview"
                : "Order Receipt"}
            </p>
          </div>
        ))}
      </div>

      {/* Dynamic step content */}
      <div className={styles.stepContent}>
        {currentStep === "address" && (
          <StorskraldStepAddress
            subStep={subStep}
            formData={formData}
            setFormData={setFormData}
            onContinue={handleContinue}
          />
        )}

        {currentStep === "waste" && (
          <StorskraldStepWaste
            onContinue={handleContinue}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === "overview" && (
          <StorskraldStepOverview
            formData={formData}
            onContinue={handleContinue}
          />
        )}
        {currentStep === "receipt" && (
          <StorskraldStepReceipt
            formData={formData}
            onBackHome={handleBackHome}
          />
        )}
      </div>
    </div>
  );
}
