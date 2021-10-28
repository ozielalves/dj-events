import Link from "next/link";

import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events {new Date().getFullYear()}</p>
      <p>
        <Link href="/about">About this project</Link>
      </p>
    </footer>
  );
}
