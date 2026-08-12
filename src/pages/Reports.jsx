function Reports({
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

        <button
  className="notification-btn"
  onClick={() => setPage("notifications")}
>
  🔔
</button>

      </header>

      {/* ======================================
          REPORTS CONTENT
      ====================================== */}

      <main className="reports-content">

        <p className="reports-label">
          📋 Your Reports
        </p>

        <h1 className="reports-page-title">
          Recent Reports
        </h1>

        <p className="reports-subtitle">
          Track the problems you have reported on campus.
        </p>

        {recentReports.length === 0 ? (

          <div className="empty-reports reports-empty-box">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No reports yet
            </h3>

            <p>
              Your recent campus reports
              will appear here.
            </p>

            <button
              className="empty-report-button"
              onClick={() =>
                setPage("report")
              }
            >
              📸 Report an Issue
            </button>

          </div>

        ) : (

          <div className="reports-list">

            {recentReports.map(
              (report) => (

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

              )
            )}

          </div>

        )}

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
          className="nav-item active"
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
          className="nav-item"
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

export default Reports;