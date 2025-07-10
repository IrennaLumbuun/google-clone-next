import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <form className={styles.form}>
     <div className={styles.logo}>
      <span className={styles.logoText}>Google</span>
    </div>
    <input
        type="text"
        placeholder="Search Google or type a URL"
        className={styles.input}
      />
    </form>
  );
} 