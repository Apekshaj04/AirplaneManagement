"use client";
import React, { useState } from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  memberSince: string;
  memberStatus: string;
  points: number;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "security">("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Apeksha ",
    email: "apekshajamjar@example.com",
    phone: "+1 (555) 123-4567",
    address: "Nagpur",
    dateOfBirth: "2005-07-04",
    memberSince: "2022-06-10",
    memberStatus: "Gold",
    points: 5280
  });

  const [editableProfile, setEditableProfile] = useState<UserProfile>({...userProfile});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = () => {
    setUserProfile(editableProfile);
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setEditableProfile({...userProfile});
    setIsEditing(false);
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
        <div className={styles.profileHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarContainer}>
              <Image src="/avatar-placeholder.png" alt="User Avatar" width={100} height={100} className={styles.avatar} />
              {isEditing && (
                <button className={styles.changeAvatarBtn}>
                  <span>📷</span>
                </button>
              )}
            </div>
            <div>
              <h1 className={styles.userName}>{userProfile.name}</h1>
              <div className={styles.membershipInfo}>
                <span className={`${styles.memberBadge} ${styles[userProfile.memberStatus.toLowerCase()]}`}>
                  {userProfile.memberStatus} Member
                </span>
                <span className={styles.memberSince}>
                  Member since {new Date(userProfile.memberSince).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.pointsContainer}>
              <span className={styles.pointsIcon}>✈️</span>
              <div>
                <h3 className={styles.pointsLabel}>Miles Points</h3>
                <p className={styles.pointsValue}>{userProfile.points.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === "profile" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Personal Info
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "preferences" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "security" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>

          <div className={styles.profileContent}>
            {activeTab === "profile" && (
              <div className={styles.personalInfo}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Personal Information</h2>
                  {!isEditing ? (
                    <button 
                      className={styles.editButton}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  ) : (
                    <div className={styles.editActions}>
                      <button 
                        className={styles.saveButton}
                        onClick={saveChanges}
                      >
                        Save
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={cancelChanges}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        className={styles.editInput}
                        value={editableProfile.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className={styles.infoValue}>{userProfile.name}</p>
                    )}
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        className={styles.editInput}
                        value={editableProfile.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className={styles.infoValue}>{userProfile.email}</p>
                    )}
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        className={styles.editInput}
                        value={editableProfile.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className={styles.infoValue}>{userProfile.phone}</p>
                    )}
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        className={styles.editInput}
                        value={editableProfile.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className={styles.infoValue}>{new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        className={styles.editInput}
                        value={editableProfile.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className={styles.infoValue}>{userProfile.address}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className={styles.preferences}>
                <h2 className={styles.sectionTitle}>Travel Preferences</h2>
                
                <div className={styles.preferencesGrid}>
                  <div className={styles.preferenceCard}>
                    <h3>Seat Preference</h3>
                    <div className={styles.preferenceOptions}>
                      <label className={styles.radioOption}>
                        <input type="radio" name="seat" value="window" defaultChecked />
                        <span className={styles.radioLabel}>Window</span>
                      </label>
                      <label className={styles.radioOption}>
                        <input type="radio" name="seat" value="aisle" />
                        <span className={styles.radioLabel}>Aisle</span>
                      </label>
                      <label className={styles.radioOption}>
                        <input type="radio" name="seat" value="no-preference" />
                        <span className={styles.radioLabel}>No Preference</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className={styles.preferenceCard}>
                    <h3>Meal Preference</h3>
                    <div className={styles.preferenceOptions}>
                      <label className={styles.radioOption}>
                        <input type="radio" name="meal" value="regular" defaultChecked />
                        <span className={styles.radioLabel}>Regular</span>
                      </label>
                      <label className={styles.radioOption}>
                        <input type="radio" name="meal" value="vegetarian" />
                        <span className={styles.radioLabel}>Vegetarian</span>
                      </label>
                      <label className={styles.radioOption}>
                        <input type="radio" name="meal" value="vegan" />
                        <span className={styles.radioLabel}>Vegan</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className={styles.preferenceCard}>
                    <h3>Communication Preferences</h3>
                    <div className={styles.checkboxOptions}>
                      <label className={styles.checkOption}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.checkLabel}>Email Notifications</span>
                      </label>
                      <label className={styles.checkOption}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.checkLabel}>SMS Alerts</span>
                      </label>
                      <label className={styles.checkOption}>
                        <input type="checkbox" />
                        <span className={styles.checkLabel}>Promotional Offers</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <button className={styles.savePrefsButton}>Save Preferences</button>
              </div>
            )}

            {activeTab === "security" && (
              <div className={styles.security}>
                <h2 className={styles.sectionTitle}>Security Settings</h2>
                
                <div className={styles.passwordSection}>
                  <h3>Change Password</h3>
                  <form className={styles.passwordForm}>
                    <div className={styles.formGroup}>
                      <label>Current Password</label>
                      <input type="password" placeholder="Enter current password" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>New Password</label>
                      <input type="password" placeholder="Enter new password" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" />
                    </div>
                    <button type="submit" className={styles.updatePasswordBtn}>Update Password</button>
                  </form>
                </div>
                
                <div className={styles.twoFactorSection}>
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account by enabling two-factor authentication.</p>
                  <button className={styles.enableTwoFactorBtn}>Enable Two-Factor Authentication</button>
                </div>
                
                <div className={styles.sessionSection}>
                  <h3>Active Sessions</h3>
                  <div className={styles.sessionCard}>
                    <div className={styles.sessionInfo}>
                      <span className={styles.deviceIcon}>💻</span>
                      <div>
                        <h4>Windows PC - Chrome</h4>
                        <p>New York, USA • Active Now</p>
                      </div>
                    </div>
                    <div className={styles.sessionActions}>
                      <span className={styles.currentDevice}>Current Device</span>
                    </div>
                  </div>
                  
                  <div className={styles.sessionCard}>
                    <div className={styles.sessionInfo}>
                      <span className={styles.deviceIcon}>📱</span>
                      <div>
                        <h4>iPhone - Safari</h4>
                        <p>New York, USA • Last active 2 days ago</p>
                      </div>
                    </div>
                    <div className={styles.sessionActions}>
                      <button className={styles.logoutBtn}>Log Out</button>
                    </div>
                  </div>
                  
                  <button className={styles.logoutAllBtn}>Log Out of All Devices</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}