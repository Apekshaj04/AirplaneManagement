"use client";
import React, { useState } from "react";
import styles from "./FlightSchedule.module.css";

interface Flight {
  id: number;
  airline: string;
  departure: string;
  destination: string;
  time: string;
  status: "On Time" | "Delayed" | "Cancelled";
}

export default function FlightSchedule() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [newFlight, setNewFlight] = useState<Flight>({
    id: Date.now(),
    airline: "",
    departure: "",
    destination: "",
    time: "",
    status: "On Time",
  });
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFlight((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as "On Time" | "Delayed" | "Cancelled") : value,
    }));
  };

  // Add a new flight
  const addFlight = () => {
    setFlights([...flights, { ...newFlight, id: Date.now() }]);
    setNewFlight({ id: Date.now(), airline: "", departure: "", destination: "", time: "", status: "On Time" });
  };

  // Delete a flight
  const deleteFlight = (id: number) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  // Set flight for editing
  const startEditing = (flight: Flight) => {
    setEditingFlight(flight);
  };

  // Update a flight
  const updateFlight = () => {
    if (editingFlight) {
      setFlights(flights.map((flight) => (flight.id === editingFlight.id ? editingFlight : flight)));
      setEditingFlight(null);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>Flight Management System</h1>
          <p>Admin Dashboard for managing flight schedules</p>
        </div>
      </section>

      {/* Flight Management Section */}
      <section className={styles.flightManagement}>
        <h2>{editingFlight ? "Edit Flight" : "Add a New Flight"}</h2>
        <div className={styles.form}>
          <input
            type="text"
            name="airline"
            placeholder="Airline Name"
            value={editingFlight ? editingFlight.airline : newFlight.airline}
            onChange={editingFlight ? (e) => setEditingFlight({ ...editingFlight, airline: e.target.value }) : handleInputChange}
          />
          <input
            type="text"
            name="departure"
            placeholder="Departure City"
            value={editingFlight ? editingFlight.departure : newFlight.departure}
            onChange={editingFlight ? (e) => setEditingFlight({ ...editingFlight, departure: e.target.value }) : handleInputChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination City"
            value={editingFlight ? editingFlight.destination : newFlight.destination}
            onChange={editingFlight ? (e) => setEditingFlight({ ...editingFlight, destination: e.target.value }) : handleInputChange}
          />
          <input
            type="time"
            name="time"
            value={editingFlight ? editingFlight.time : newFlight.time}
            onChange={editingFlight ? (e) => setEditingFlight({ ...editingFlight, time: e.target.value }) : handleInputChange}
          />
          <select
            name="status"
            value={editingFlight ? editingFlight.status : newFlight.status}
            onChange={editingFlight ? (e) => setEditingFlight({ ...editingFlight, status: e.target.value as "On Time" | "Delayed" | "Cancelled" }) : handleInputChange}
          >
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {editingFlight ? (
            <button className={styles.updateBtn} onClick={updateFlight}>Update Flight</button>
          ) : (
            <button className={styles.addBtn} onClick={addFlight}>Add Flight</button>
          )}
        </div>
      </section>

      {/* Flight List */}
      <section className={styles.flightList}>
        <h2>Flight Schedules</h2>
        <table>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.airline}</td>
                <td>{flight.departure}</td>
                <td>{flight.destination}</td>
                <td>{flight.time}</td>
                <td className={styles[flight.status.toLowerCase().replace(" ", "")]}>{flight.status}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => startEditing(flight)}>✏️ Edit</button>
                  &nbsp;&nbsp;
                  <button className={styles.deleteBtn} onClick={() => deleteFlight(flight.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
