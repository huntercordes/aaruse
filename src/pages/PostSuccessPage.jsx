import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useHome } from "../context/HomeContext";
import styles from "../styles/PostSuccessPage.module.css";
import logo from "../assets/aaruselogo.png";

export default function PostSuccessPage() {
  const { type } = useParams(); // "give" or "sell"
  const navigate = useNavigate();
  const { setActiveSection } = useHome();
  const location = useLocation();

  // Optional data passed from PostPage navigate()
  const { title, image, postId } = location.state || {};

  const handleSeeListing = () => {
    if (postId) {
      navigate(`/post/${postId}`);
    } else {
      // fallback: just go to home if ID is missing
      setActiveSection("home");
      navigate("/home");
    }
  };

  const handleBackHome = () => {
    setActiveSection("home");
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="AARUSE" className={styles.logo} />

      <h2 className={styles.title}>ALL SET!</h2>
      <p>
        {type === "sell"
          ? "Great! We’ll notify you when someone’s interested."
          : "Somebody will love this and hopefully give it a new home."}
      </p>

      {image && <img src={image} alt={title} className={styles.itemImage} />}
      {title && <h3 className={styles.itemName}>{title}</h3>}

      <button className={styles.primaryBtn} onClick={handleSeeListing}>
        See your listing
      </button>

      <button className={styles.secondaryBtn} onClick={handleBackHome}>
        Back to home
      </button>
    </div>
  );
}
