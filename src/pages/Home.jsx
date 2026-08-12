function Home({
  user,
  setPage,
  recentReports,
}) {
  return (
    <div className="phone-app">

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
          HEADER
      ====================================== */}

      <header className="app-header">

        <div>

          <div className="app-name">
            🛠️ LocalFix
          </div>

          <div className="campus-name">
            SRM University AP
          </div>

        </div>


        {/* NOTIFICATIONS */}

        <button
          className="notification-btn"
          onClick={() => setPage("notifications")}
          aria-label="Notifications"
        >
          🔔
        </button>

      </header>


      {/* ======================================
          HOME CONTENT
      ====================================== */}

      <main className="home-content">

        <section className="welcome-section">

          <p className="hello">
            Hello 👋
          </p>

          <h1>
            Welcome to LocalFix
          </h1>

          <p className="user-name">
            {user?.displayName ||
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
              {user?.email}
            </span>

          </div>

        </div>


        {/* ====================================
            REPORT BUTTON
        ==================================== */}

        <button
          className="report-issue-card"
          onClick={() => setPage("report")}
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
                {recentReports.length}
              </strong>

              <span>
                Total Reports
              </span>

            </div>


            <div className="activity-card">

              <strong>
                {
                  recentReports.filter(
                    (report) =>
                      report.status ===
                      "In Progress"
                  ).length
                }
              </strong>

              <span>
                In Progress
              </span>

            </div>


            <div className="activity-card">

              <strong>
                {
                  recentReports.filter(
                    (report) =>
                      report.status ===
                      "Resolved"
                  ).length
                }
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
              onClick={() => setPage("reports")}
            >
              View all
            </button>

          </div>


          {recentReports.length === 0 ? (

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

          ) : (

            <div className="reports-list">

              {recentReports
                .slice(0, 3)
                .map((report) => (

                  <div
                    className="report-card"
                    key={report.id}
                  >

                    {report.photo ? (

                      <img
                        src={report.photo}
                        alt="Reported issue"
                        className="report-card-image"
                      />

                    ) : (

                      <div className="report-card-image no-photo">
                        📷
                      </div>

                    )}


                    <div className="report-card-content">

                      <div className="report-card-top">

                        <span className="report-category">
                          {report.category}
                        </span>

                        <span className="report-status">
                          {report.status}
                        </span>

                      </div>


                      <h3>
                        {report.description}
                      </h3>


                      <p>
                        📍 {report.location}
                      </p>


                      <small>
                        {report.date}
                      </small>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

      </main>


      {/* ======================================
          BOTTOM NAVIGATION
      ====================================== */}

      <nav className="bottom-nav">

        {/* HOME */}

        <button
          className="nav-item active"
          onClick={() => setPage("home")}
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
          onClick={() => setPage("reports")}
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
          onClick={() => setPage("report")}
        >
          +
        </button>


        {/* PROFILE */}

        <button
          className="nav-item"
          onClick={() => setPage("profile")}
        >

          {user?.photoURL ? (

            <img
              src={user.photoURL}
              alt="Profile"
              className="nav-profile-image"
            />

          ) : (

            <span className="nav-profile-letter">
              {(user?.displayName ||
                user?.email ||
                "U")
                .charAt(0)
                .toUpperCase()}
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

export default Home;