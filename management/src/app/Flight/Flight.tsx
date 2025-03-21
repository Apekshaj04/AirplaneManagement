"use client";
import React, { useState } from "react";
import styles from "./Flight.module.css";
import Link from "next/link";

export default function Flight() {
  const [flights] = useState([]);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
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
            <h1>Find Your Perfect Flight</h1>
            <p>Search and book flights with ease.</p>
          </div>
        </section>

        {/* Search Form */}
        <div className={styles.searchContainer}>
          <h3>Search Flights</h3>
          <form className={styles.searchForm}>
            <input type="text" placeholder="From (City)" />
            <input type="text" placeholder="To (City)" />
            <input type="date" />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Flight Listings */}
        <div className={styles.flightList}>
          <h3>Available Flights</h3>
          {flights.map((flight, index) => (
            <div key={index} className={styles.flightCard}>
              <h4>{flight.airline}</h4>
              <p>{flight.from} → {flight.to}</p>
              <p>Time: {flight.time}</p>
              <p>Price: {flight.price}</p>
            </div>
          ))}
        </div>
       
      </main>
    </div>
  );
}
