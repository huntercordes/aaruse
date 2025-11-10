import styles from "../styles/MyPickups.module.css";

export default function MyPickups({ onBack }) {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
        <h2 className={styles.title}>My pickups</h2>
      </div>

      <div className={styles.tabBar}>
        <button className={styles.tab}>Given/Sold</button>
        <button className={styles.tab}>Received/Bought</button>
      </div>

      <div className={styles.filters}>
        <button className={styles.filter}>All</button>
        <button className={styles.filter}>Active</button>
        <button className={styles.filter}>Completed</button>
      </div>

      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.thumbnail}></div>
          <div className={styles.details}>
            <h3>Carhartt Jeans</h3>
            <p>400 DKK</p>
            <span>Marked as available 2 days ago</span>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.thumbnail}></div>
          <div className={styles.details}>
            <h3>Bookshelf</h3>
            <p>Free</p>
            <span>Marked as available just now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
