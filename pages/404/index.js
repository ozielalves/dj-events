import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

import Layout from "@/components/Layout";

import styles from "./styles.module.css";

export default function NotFoundPage() {
  return (
    <Layout title="Not Found">
      <div className={styles.error}>
        <FaExclamationTriangle size="40" color="grey"/>
        <h1>404</h1>
        <h4>Sorry, there is nothing here.</h4>
        <Link href="/">Go back Home</Link>
      </div>
    </Layout>
  );
}
