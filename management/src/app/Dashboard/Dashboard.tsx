import React from "react";
import styles from "./Dashboard.module.css";
import Image from "next/image";
import Link from "next/link";


export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <h2>AMS</h2>
        <ul>
          <li>
        <Link href="/Dashboard">🏠 Home</Link></li>
          <li>
            <Link href="/Flight">✈️ Flights</Link></li>
          <li>
            <Link href="/Bookings">🎟️ Bookings</Link></li>
          <li>
            <Link href="/Profile">👤 Profile</Link></li>
            <li>
              <Link href="/">🚪 Logout</Link>
            </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay}>
            <h1>Welcome to the Airplane Management System</h1>
            <p>Book flights, manage schedules, and explore the skies with ease.</p>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.img}>
              <Image src="/booking.png" width={100} height={100} alt="Flight Icon" />
            </div>
            <h2>Easy Booking</h2>
            <p>Seamless ticket booking experience with real-time flight availability.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.img}>
              <Image src="/schedule.png" width={100} height={100} alt="Flight Icon" />
            </div>
            <h2>Flight Scheduling</h2>
            <p>View and manage upcoming flights with detailed schedules.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.img}>
              <Image src="/support.png" width={100} height={100} alt="Flight Icon" />
            </div>
            <h2>24/7 Support</h2>
            <p>Dedicated support for all your travel-related queries.</p>
          </div>
        </section>

        {/* 🔹 New: Latest News & Updates Section */}
        <section className={styles.news}>
          <h2>Latest News & Updates</h2>
          <div className={styles.newsContainer}>
            <div className={styles.newsItem}>
              <h3>✈️ New Routes Announced</h3>
              <p>We are expanding our network with new flight routes starting next month.</p>
            </div>

            <div className={styles.newsItem}>
              <h3>🔥 Special Offers</h3>
              <p>Get up to 30% off on early flight bookings. Limited time offer!</p>
            </div>

            <div className={styles.newsItem}>
              <h3>🛬 Flight Delays Update</h3>
              <p>Check the latest updates on rescheduled and delayed flights.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
