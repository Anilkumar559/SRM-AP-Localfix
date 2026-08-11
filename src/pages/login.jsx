import { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setError("");
    setLoading(true);

    try {
      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        hd: "srmap.edu.in",
      });

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const email =
        result.user.email?.toLowerCase() || "";

      // ONLY SRM AP ACCOUNTS
      if (!email.endsWith("@srmap.edu.in")) {
        setError(
          "Access denied. Please use your @srmap.edu.in account."
        );

        return;
      }

      console.log(
        "SRM AP login successful:",
        email
      );

      onLogin(result.user);

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
          "Google sign-in popup was blocked. Please allow popups."
        );
      } else {
        setError(
          error.message ||
            "Google sign-in failed."
        );
      }

    } finally {
      setLoading(false);
    }
  }

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
          disabled={loading}
        >

          <span className="google-g">
            G
          </span>

          {loading
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

export default Login;