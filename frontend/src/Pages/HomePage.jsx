import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/HomePage.css";

const features = [
  {
    title: 'Easy Reporting',
    description: 'Submit complaints with just a few clicks. No more paper forms.'
  },
  {
    title: 'Track Progress',
    description: 'Monitor the status of your complaints in real-time.'
  },
  {
    title: 'Analytics',
    description: 'Admins get insights into complaint trends and resolution times.'
  }
];

const userTypes = [
  {
    title: 'Students',
    description: 'Submit complaints about campus facilities, academics, hostel, and more.'
  },
  {
    title: 'Teachers',
    description: 'Monitor complaints and escalate urgent issues to administration.'
  },
  {
    title: 'Administrators',
    description: 'Review, manage, and resolve complaints efficiently.'
  }
];

export default function HomePage() {
  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="nav-logo">CampusCom</div>
        <div className="nav-buttons">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <header className="hero-section">
        <h1>Campus Issues, <span className="highlight">Solved Faster</span></h1>
        <p>A streamlined platform for students, teachers, and administrators to report and resolve campus complaints efficiently.</p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary-large">Start Reporting</Link>
          <Link to="/login" className="btn-outline-large">Sign In</Link>
        </div>
      </header>

      <section className="features-grid">
        <h2>Why Use Campus Com?</h2>
        <div className="grid-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="roles-section">
        <h2>For Everyone on Campus</h2>
        <div className="grid-container">
          {userTypes.map((type, index) => (
            <div key={index} className="role-box">
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <p> Smart Campus Complaint System</p>
      </footer>
    </div>
  );
}