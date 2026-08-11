import { signOut } from "firebase/auth";

import { auth } from "../firebase";

function Reports({
  setPage,
  recentReports,
}) {

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  }

  return (
    <div className="phone-app">

      {/* SRM BANNER */}

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

      {/* CONTENT */}

      <main className="home-content">

        <section className="welcome-section">

          <p className="hello">
            📋 Your Reports
          </p>

          <h1>
            Recent Reports
          </h1>

          <p className="home-subtitle">
            Track the problems you have
            reported on campus.
          </p>

        </section>

        {recentReports.length === 0 ? (

          <div className="empty-reports">

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
              className="primary-action"
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

      {/* BOTTOM NAV */}

      <nav className="bottom-nav">

        <button
          className="nav-item"
          onClick={() =>
            setPage("home")
          }
        >

          <span>
            🏠
          </span>

          <small>
            Home
          </small>

        </button>

        <button
          className="nav-item active"
          onClick={() =>
            setPage("reports")
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
            setPage("report")
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

export default Reports;