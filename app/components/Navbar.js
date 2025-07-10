import styles from "./Navbar.module.css";

const NAVBAR_ITEMS = ["About", "Store", "Gmail", "Images"];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {NAVBAR_ITEMS.map((item) => (
        <span key={item} className={styles.item}>{item}</span>
      ))}
    </nav>
  );
} 