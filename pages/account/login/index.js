import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

import { useToaster } from "@/hooks/useToaster";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import styles from "./styles.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth();
  const toast = useToaster();

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don&apos;t have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
