"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./Signup.module.css";

export default function Signup() {
  const router = useRouter(); // ✅ Correctly calling useRouter at the top level

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (role === "user") {
      router.push("/Dashboard");
    } else {
      router.push("/Admin");
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>AMS</h2>
        <ul>
          <li>Your own flight manager </li>
        </ul>
      </aside>

      {/* Login Box */}
      <main className={styles.loginBox}>
        <h2>Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>Login as:</label>
          <select
            className={styles.roleSelect}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.button} type="submit">
            Login
          </button>
        </form>

        {/* Display API Response Message */}
        {message && <p className={styles.message}>{message}</p>}
      </main>
    </div>
  );
}
