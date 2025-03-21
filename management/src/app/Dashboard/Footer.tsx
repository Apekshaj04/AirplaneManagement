import React from "react";
import styles from "./Footer.module.css"; // ✅ Correct import

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3 className={styles.heading}>About Us</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}><a href="#" className={styles.link}>Our Story</a></li>
            <li className={styles.listItem}><a href="#" className={styles.link}>Careers</a></li>
          </ul>
        </div>

        <div className={styles.middle}>
          <h3 className={styles.heading}>Services</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}><a href="#" className={styles.link}>Flight Booking</a></li>
            <li className={styles.listItem}><a href="#" className={styles.link}>Customer Support</a></li>
          </ul>
        </div>

        <div className={styles.right}>
          <h3 className={styles.heading}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>🔵</a>
            <a href="#" className={styles.socialIcon}>📷</a>
            <a href="#" className={styles.socialIcon}>🐦</a>
          </div>
        </div>
      </div>

      <p className={styles.copyright}>© 2025 Airplane Management. All rights reserved.</p>
    </footer>
  );
}
