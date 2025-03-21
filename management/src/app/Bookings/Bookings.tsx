"use client";
import React, { useState } from "react";
import styles from "./Bookings.module.css";
import Link from "next/link";

interface Booking {
  id: string;
  flight: string;
  from: string;
  to: string;
  date: string;
  status: "confirmed" | "cancelled" | "pending";
  passengers: number;
  price: string;
}

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK-10234",
      flight: "AI-305",
      from: "Delhi",
      to: "Mumbai",
      date: "2025-04-15",
      status: "confirmed",
      passengers: 1,
      price: "$120"
    },
    {
      id: "BK-10235",
      flight: "IN-442",
      from: "Mumbai",
      to: "Bangalore",
      date: "2025-05-20",
      status: "confirmed",
      passengers: 2,
      price: "$240"
    },
    {
      id: "BK-10236",
      flight: "SJ-112",
      from: "Bangalore",
      to: "Hyderabad",
      date: "2025-02-10",
      status: "cancelled",
      passengers: 1,
      price: "$95"
    },
    {
      id: "BK-10237",
      flight: "AI-602",
      from: "Chennai",
      to: "Kolkata",
      date: "2024-12-20",
      status: "confirmed",
      passengers: 3,
      price: "$350"
    }
  ]);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    
    if (activeTab === "upcoming") {
      return bookingDate >= today && booking.status !== "cancelled";
    } else if (activeTab === "past") {
      return bookingDate < today && booking.status !== "cancelled";
    } else {
      return booking.status === "cancelled";
    }
  });

  const cancelBooking = (id: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? {...booking, status: "cancelled"} : booking
      )
    );
  };

  return (
    <div className={styles.container}>
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

      <main className={styles.content}>
        <h1 className={styles.title}>Your Bookings</h1>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === "upcoming" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "past" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "cancelled" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </button>
        </div>

        <div className={styles.bookingsList}>
          {filteredBookings.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <p>No {activeTab} bookings found.</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className={styles.bookingCard}>
                <div className={styles.bookingHeader}>
                  <h3>{booking.from} to {booking.to}</h3>
                  <span className={`${styles.status} ${styles[booking.status]}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className={styles.bookingDetails}>
                  <div className={styles.detail}>
                    <span className={styles.label}>Booking ID</span>
                    <span className={styles.value}>{booking.id}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Flight</span>
                    <span className={styles.value}>{booking.flight}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Date</span>
                    <span className={styles.value}>{new Date(booking.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Passengers</span>
                    <span className={styles.value}>{booking.passengers}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Total</span>
                    <span className={styles.value}>{booking.price}</span>
                  </div>
                </div>
                
                <div className={styles.bookingActions}>
                  <button className={styles.viewBtn}>View Details</button>
                  {booking.status !== "cancelled" && activeTab === "upcoming" && (
                    <button 
                      className={styles.cancelBtn}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}