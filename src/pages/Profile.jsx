function Profile({
  user,
  setPage,
  logout,
}) {

  // ==========================================
  // USER NAME
  // ==========================================

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "SRM Student";

  // ==========================================
  // FALLBACK LETTER
  // ==========================================

  const firstLetter =
    userName
      .trim()
      .charAt(0)
      .toUpperCase() || "U";

  return (
    <div className="phone-app profile-app">

      {/* ======================================
          SRM BANNER
      ====================================== */}

      <div className="srm-brand">

        <img
          src="/SRMAP.png"
          alt="SRM University AP"
        />

      </div>

      {/* ======================================
          PROFILE CONTENT
      ====================================== */}

      <main className="profile-page">

        <div className="profile-center">

          {/* PROFILE PHOTO */}

          {user?.photoURL ? (

            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-main-photo"
            />

          ) : (

            <div className="profile-letter">
              {firstLetter}
            </div>

          )}

          {/* NAME */}

          <h1 className="profile-name">
            {userName}
          </h1>

          {/* EMAIL */}

          <p className="profile-email">
            {user?.email}
          </p>

          {/* VERIFIED */}

          <p className="profile-verified">
            ✓ SRM University AP Account Verified
          </p>

          {/* SIGN OUT */}

          <button
            className="profile-signout"
            onClick={logout}
          >
            Sign Out
          </button>

        </div>

      </main>

      {/* ======================================
          BOTTOM NAVIGATION
      ====================================== */}

      <nav className="bottom-nav">

        {/* HOME */}

        <button
          className="nav-item"
          onClick={() =>
            setPage("home")
          }
        >

          <span className="nav-icon">
            🏠
          </span>

          <small>
            Home
          </small>

        </button>

        {/* REPORTS */}

        <button
          className="nav-item"
          onClick={() =>
            setPage("reports")
          }
        >

          <span className="nav-icon">
            📋
          </span>

          <small>
            Reports
          </small>

        </button>

        {/* PLUS */}

        <button
          className="add-report-button"
          onClick={() =>
            setPage("report")
          }
        >
          +
        </button>

        {/* PROFILE */}

        <button
          className="nav-item active"
          onClick={() =>
            setPage("profile")
          }
        >

          {user?.photoURL ? (

            <img
              src={user.photoURL}
              alt="Profile"
              className="nav-profile-image"
            />

          ) : (

            <span className="nav-profile-letter">
              {firstLetter}
            </span>

          )}

          <small>
            Profile
          </small>

        </button>

      </nav>

    </div>
  );
}

export default Profile;