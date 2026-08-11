import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let redirectChecked = false;
    let authStateChecked = false;

    function checkUser(currentUser) {
      if (!currentUser) {
        return;
      }

      const email =
        currentUser.email?.toLowerCase() || "";

      console.log("LocalFix email:", email);

      // Only allow SRM University AP accounts
      if (!email.endsWith("@srmap.edu.in")) {
        setError(
          "Access denied. Please use your @srmap.edu.in account."
        );

        signOut(auth);
        setUser(null);

        return;
      }

      console.log(
        "SRM AP account accepted:",
        email
      );

      setUser(currentUser);
      setError("");
    }

    // Firebase authentication state
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "Auth state changed:",
          currentUser?.email || "No user"
        );

        authStateChecked = true;

        if (currentUser) {
          checkUser(currentUser);
        }

        if (redirectChecked) {
          setLoading(false);
        }
      }
    );

    // Google redirect result
    getRedirectResult(auth)
      .then((result) => {
        console.log(
          "Redirect result:",
          result
        );

        redirectChecked = true;

        if (result?.user) {
          console.log(
            "Google login successful:",
            result.user.email
          );

          checkUser(result.user);
        }

        if (authStateChecked) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(
          "Redirect error:",
          error
        );

        redirectChecked = true;

        setError(error.message);

        if (authStateChecked) {
          setLoading(false);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // =========================
  // GOOGLE LOGIN
  // =========================

  async function login() {
    setError("");

    const provider =
      new GoogleAuthProvider();

    provider.setCustomParameters({
      hd: "srmap.edu.in",
    });

    try {
      console.log(
        "Starting Google login..."
      );

      await signInWithRedirect(
        auth,
        provider
      );
    } catch (error) {
      console.error(
        "Google login error:",
        error
      );

      setError(error.message);
      setLoading(false);
    }
  }

  // =========================
  // LOGOUT
  // =========================

  async function logout() {
    try {
      await signOut(auth);

      setUser(null);
      setError("");

    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  }

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div className="login-screen">

        <div className="login-card">

          <div className="login-logo">
            🛠️
          </div>

          <h1>
            LocalFix
          </h1>

          <p className="campus">
            SRM University AP
          </p>

          <p className="login-description">
            Checking your Google account...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // LOGIN SCREEN
  // =========================

  if (!user) {
    return (
      <div className="login-screen">

        <div className="login-card">

          <div className="login-logo">
            🛠️
          </div>

          <h1>
            LocalFix
          </h1>

          <p className="campus">
            SRM University AP
          </p>

          <p className="login-description">
            See a problem.
            <br />
            Report it. Track it. Fix it.
          </p>

          <button
            className="google-login"
            onClick={login}
          >
            <span className="google-g">
              G
            </span>

            Continue with Google
          </button>

          <p className="login-note">
            Only{" "}
            <strong>
              @srmap.edu.in
            </strong>{" "}
            accounts are allowed.
          </p>

          {error && (
            <div className="login-error">
              ❌ {error}
            </div>
          )}

        </div>

      </div>
    );
  }

  // =========================
  // HOME SCREEN
  // =========================

  return (
    <div className="phone-app">

      <div className="srm-brand">
        <img
          src="/SRMAP.png"
          alt="SRM University AP"
        />
      </div>

      {/* HEADER */}

      <header className="app-header">

        <div>

          <div className="app-name">
            🛠️ LocalFix
          </div>

          <div className="campus-name">
            SRM University AP
          </div>

        </div>

        <button
          className="notification-btn"
          onClick={() =>
            alert(
              "Notifications coming soon!"
            )
          }
        >
          🔔
        </button>

      </header>


      {/* HOME CONTENT */}

      <main className="home-content">

        {/* WELCOME */}

        <section className="welcome-section">

          <p className="hello">
            Hello 👋
          </p>

          <h1>
            Welcome to LocalFix
          </h1>

          {/* GOOGLE ACCOUNT NAME */}

          <p className="user-name">
            {user.displayName ||
              "SRM University AP Student"}
          </p>

          <p className="home-subtitle">
            See a problem? Report it. Track it. Fix it.
          </p>

        </section>


        {/* VERIFIED ACCOUNT */}

        <div className="verified-card">

          <div className="verified-icon">
            ✓
          </div>

          <div className="verified-content">

            <strong>
              SRM University AP Account Verified
            </strong>

            <span>
              {user.email}
            </span>

          </div>

        </div>


        {/* REPORT ISSUE */}

        <button
          className="report-issue-card"
          onClick={() =>
            alert(
              "Report Issue screen is coming next!"
            )
          }
        >

          <div className="report-icon">
            📸
          </div>

          <div className="report-text">

            <strong>
              Report an Issue
            </strong>

            <span>
              Take a photo and report a campus problem
            </span>

          </div>

          <div className="arrow">
            ›
          </div>

        </button>


        {/* ACTIVITY */}

        <section className="activity-section">

          <div className="section-heading">

            <h2>
              Your Activity
            </h2>

          </div>

          <div className="activity-grid">

            <div className="activity-card">

              <strong>
                0
              </strong>

              <span>
                Total Reports
              </span>

            </div>

            <div className="activity-card">

              <strong>
                0
              </strong>

              <span>
                In Progress
              </span>

            </div>

            <div className="activity-card">

              <strong>
                0
              </strong>

              <span>
                Resolved
              </span>

            </div>

          </div>

        </section>


        {/* RECENT REPORTS */}

        <section className="recent-section">

          <div className="section-heading">

            <h2>
              Recent Reports
            </h2>

            <button
              onClick={() =>
                alert(
                  "Reports screen is coming next!"
                )
              }
            >
              View all
            </button>

          </div>

          <div className="empty-reports">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No reports yet
            </h3>

            <p>
              Your reported campus issues
              will appear here.
            </p>

          </div>

        </section>

      </main>


      {/* BOTTOM NAVIGATION */}

      <nav className="bottom-nav">

        <button className="nav-item active">

          <span>
            🏠
          </span>

          <small>
            Home
          </small>

        </button>


        <button
          className="nav-item"
          onClick={() =>
            alert(
              "My Reports is coming next!"
            )
          }
        >

          <span>
            📋
          </span>

          <small>
            Reports
          </small>

        </button>


        <button
          className="add-report-button"
          onClick={() =>
            alert(
              "Report Issue screen is coming next!"
            )
          }
        >
          +
        </button>


        <button
          className="nav-item"
          onClick={logout}
        >

          <span>
            👤
          </span>

          <small>
            Sign Out
          </small>

        </button>

      </nav>

    </div>
  );
}

export default App;