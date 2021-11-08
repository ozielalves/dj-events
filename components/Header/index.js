import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import SearchBar from "../SearchBar";
import styles from "./styles.module.css";

export default function Header() {
  const { logout, user } = useAuth();

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
          <li>
            <Link href="/account/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={() => logout()}
                className="btn btn-secondary btn-icon"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  <FaSignInAlt /> Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
