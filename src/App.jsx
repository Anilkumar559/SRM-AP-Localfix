import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import ReportIssue from "./pages/ReportIssue";
import Notifications from "./pages/Notifications";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState("home");

  // TEST ONLY
  // Reports are temporarily stored in React state.
  const [recentReports, setRecentReports] = useState([]);

  // ==========================================
  // FIREBASE AUTH STATE
  // ==========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "Auth state:",
          currentUser?.email || "No user"
        );

        if (!currentUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const email =
          currentUser.email?.toLowerCase() || "";

        // Only SRM AP accounts
        if (!email.endsWith("@srmap.edu.in")) {
          signOut(auth);
          setUser(null);
          setLoading(false);
          return;
        }

        console.log(
          "SRM AP account accepted:",
          email
        );

        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  async function logout() {
    try {
      await signOut(auth);

      setUser(null);
      setPage("home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // ==========================================
  // LOADING
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
  // LOGIN
  // ==========================================

  if (!user) {
    return (
      <Login
        onLogin={setUser}
      />
    );
  }

  // ==========================================
  // REPORT ISSUE
  // ==========================================

  if (page === "report") {
    return (
      <ReportIssue
        user={user}
        setPage={setPage}
        setRecentReports={setRecentReports}
      />
    );
  }

  // ==========================================
  // REPORTS
  // ==========================================

  if (page === "reports") {
    return (
      <Reports
        user={user}
        setPage={setPage}
        recentReports={recentReports}
      />
    );
  }

  // ==========================================
  // PROFILE
  // ==========================================

  if (page === "profile") {
    return (
      <Profile
        user={user}
        setPage={setPage}
        logout={logout}
      />
    );
  }

// ==========================================
// NOTIFICATIONS
// ==========================================

  if (page === "notifications") {
    return (
      <Notifications
        setPage={setPage}
      />
    );
  }

  // ==========================================
  // HOME
  // ==========================================

  return (
    <Home
      user={user}
      setPage={setPage}
      recentReports={recentReports}
    />
  );
}

export default App;