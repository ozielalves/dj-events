import Link from "next/link";

import SearchBar from "../SearchBar";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <SearchBar />

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href="/events/add">
              <a>Add Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
