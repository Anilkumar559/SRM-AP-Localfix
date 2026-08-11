import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // CHECK FIREBASE AUTH STATE
  // ==========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "Firebase auth state:",
          currentUser?.email || "No user"
        );

        if (!currentUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const email =
          currentUser.email?.toLowerCase() || "";

        console.log(
          "Checking email:",
          email
        );

        // Only SRM AP accounts are allowed
        if (!email.endsWith("@srmap.edu.in")) {
          console.log(
            "Access denied:",
            email
          );

          signOut(auth);

          setUser(null);

          setError(
            "Access denied. Please use your @srmap.edu.in account."
          );

          setLoading(false);

          return;
        }

        // Valid SRM AP account
        console.log(
          "SRM AP account accepted:",
          email
        );

        setUser(currentUser);
        setError("");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  async function login() {
    setError("");
    setLoginLoading(true);

    try {
      console.log(
        "Starting Google login..."
      );

      const provider =
        new GoogleAuthProvider();

      // Tell Google we want SRM AP accounts
      provider.setCustomParameters({
        hd: "srmap.edu.in",
      });

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      console.log(
        "Google login successful:",
        result.user.email
      );

      const email =
        result.user.email?.toLowerCase() || "";

      // Extra security check
      if (!email.endsWith("@srmap.edu.in")) {
        await signOut(auth);

        setUser(null);

        setError(
          "Access denied. Please use your SRM University AP Google account."
        );

        return;
      }

      // Login successful
      setUser(result.user);
      setError("");

      console.log(
        "LocalFix login complete."
      );

    } catch (error) {
      console.error(
        "Google login error:",
        error
      );

      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Google sign-in was cancelled."
        );
      } else if (
        error.code ===
        "auth/popup-blocked"
      ) {
        setError(
          "Google sign-in popup was blocked. Please allow popups for localhost."
        );
      } else if (
        error.code ===
        "auth/cancelled-popup-request"
      ) {
        setError(
          "Another Google sign-in request is already running."
        );
      } else {
        setError(
          error.message ||
            "Google sign-in failed. Please try again."
        );
      }
    } finally {
      setLoginLoading(false);
    }
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  async function logout() {
    try {
      await signOut(auth);

      setUser(null);
      setError("");

      console.log(
        "User signed out."
      );

    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      setError(
        "Unable to sign out. Please try again."
      );
    }
  }

  // ==========================================
  // LOADING SCREEN
  // ==========================================

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

  // ==========================================
  // LOGIN SCREEN
  // ==========================================

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
            disabled={loginLoading}
          >
            <span className="google-g">
              G
            </span>

            {loginLoading
              ? "Signing in..."
              : "Continue with Google"}
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

  // ==========================================
  // HOME SCREEN
  // ==========================================

  return (
    <div className="phone-app">

      {/* ====================================
          PINNED SRM BANNER
      ==================================== */}

      <div className="srm-brand">

        <img
          src="/SRMAP.png"
          alt="SRM University AP"
        />

      </div>


      {/* ====================================
          HEADER
      ==================================== */}

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


      {/* ====================================
          HOME CONTENT
      ==================================== */}

      <main className="home-content">

        {/* WELCOME */}

        <section className="welcome-section">

          <p className="hello">
            Hello 👋
          </p>

          <h1>
            Welcome to LocalFix
          </h1>

          {/* GOOGLE PROFILE NAME */}

          <p className="user-name">
            {user.displayName ||
              "SRM University AP Student"}
          </p>

          <p className="home-subtitle">
            See a problem? Report it. Track it. Fix it.
          </p>

        </section>


        {/* ====================================
            VERIFIED ACCOUNT
        ==================================== */}

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


        {/* ====================================
            REPORT ISSUE
        ==================================== */}

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


        {/* ====================================
            ACTIVITY
        ==================================== */}

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


        {/* ====================================
            RECENT REPORTS
        ==================================== */}

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


      {/* ====================================
          BOTTOM NAVIGATION
      ==================================== */}

      <nav className="bottom-nav">

        <button
          className="nav-item active"
        >

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