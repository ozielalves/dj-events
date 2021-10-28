import Link from "next/link";

import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
