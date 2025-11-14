import { useNavigate } from "react-router-dom";
import styles from "../styles/PostTypePage.module.css";
import aaruselogo from "../assets/aaruselogo.png";
export default function PostTypePage() {
  const navigate = useNavigate();

  const handleGiving = () => {
    navigate("/post/give");
  };

  const handleSelling = () => {
    navigate("/post/sell");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Post</h2>
      </div>

      <div className={styles.iconWrapper}>
        <img src={aaruselogo} alt="AARUSE logo" className={styles.logo} />
      </div>

      <p className={styles.intro}>Share your items through AARUSE!</p>

      <p className={styles.description}>
        Choose how you’d like to pass your item on — give it away or sell it to
        someone nearby.
        <br />
        <br />
        Every action helps reduce waste and keep things in use.
      </p>

      <div className={styles.buttons}>
        <button className={styles.giveBtn} onClick={handleGiving}>
          I’m giving
        </button>
        <button className={styles.sellBtn} onClick={handleSelling}>
          I’m selling
        </button>
      </div>
    </div>
  );
}
