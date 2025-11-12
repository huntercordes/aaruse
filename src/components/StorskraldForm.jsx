import { useState } from "react";
import styles from "../styles/StorskraldForm.module.css";
import StorskraldStepAddress from "../components/StorskraldStepAddress";
import StorskraldStepWaste from "../components/StorskraldStepWaste";
import StorskraldStepOverview from "../components/StorskraldStepOverview";
import StorskraldStepReceipt from "../components/StorskraldStepReceipt";
import { useNavigate } from "react-router-dom";

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
    navigate("/");
  };

  return (
    <div className={styles.formWrapper}>
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
