import styles from "../styles/Navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useHome } from "../context/HomeContext";

// 🖼 Import PNG icons
import homeIcon from "../assets/icons/home.png";
import postIcon from "../assets/icons/post.png";
import storskraldIcon from "../assets/icons/storskrald.png";
import inboxIcon from "../assets/icons/inbox.png";
import profileIcon from "../assets/icons/profile.png";

export default function Navbar() {
  const { activeSection, setActiveSection } = useHome();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (section) => {
    setActiveSection(section);

    if (section === "home") {
      navigate("/home");
    } else if (section === "storskrald") {
      navigate("/home");
    } else if (section === "posttype" || section === "post") {
      navigate("/posttype"); // ✅ New PostType route
    } else {
      navigate(`/${section}`);
    }
  };

  const isActive = (section) => {
    if (location.pathname !== "/home" && section !== "home") {
      return location.pathname.includes(section);
    }
    return activeSection === section;
  };

  return (
    <nav className={styles.navbar}>
      <div
        className={`${styles.navItem} ${isActive("home") ? styles.active : ""}`}
        onClick={() => handleClick("home")}>
        <img src={homeIcon} alt="Home" className={styles.icon} />
      </div>

      <div
        className={`${styles.navItem} ${
          isActive("posttype") ? styles.active : ""
        }`}
        onClick={() => handleClick("posttype")}>
        <img src={postIcon} alt="Post" className={styles.icon} />
      </div>

      <div
        className={`${styles.navItem} ${styles.centerItem} ${
          isActive("storskrald") ? styles.active : ""
        }`}
        onClick={() => handleClick("storskrald")}>
        <img
          src={storskraldIcon}
          alt="Storskrald"
          className={styles.centerIcon}
        />
      </div>

      <div
        className={`${styles.navItem} ${
          isActive("inbox") ? styles.active : ""
        }`}
        onClick={() => handleClick("inbox")}>
        <img src={inboxIcon} alt="Inbox" className={styles.icon} />
      </div>

      <div
        className={`${styles.navItem} ${
          isActive("profile") ? styles.active : ""
        }`}
        onClick={() => handleClick("profile")}>
        <img src={profileIcon} alt="Profile" className={styles.icon} />
      </div>
    </nav>
  );
}
