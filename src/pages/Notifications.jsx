import React from "react";
import "./Notifications.css";

function Notifications({ setPage }) {
  return (
    <div className="notification-panel">

      {/* Header */}
      <div className="notification-header">
        <div>
          <h2>🔔 Notifications</h2>
          <p>Stay updated with your LocalFix reports.</p>
        </div>

        <button
          className="notification-close"
          onClick={() => setPage("home")}
        >
          ✕
        </button>
      </div>

      {/* Notification 1 */}
      <div className="notification-item">
        <div className="notification-icon">📋</div>

        <div className="notification-content">
          <h3>Report Submitted</h3>
          <p>
            Your campus issue has been successfully submitted.
          </p>
          <span>Just now</span>
        </div>
      </div>

      {/* Notification 2 */}
      <div className="notification-item">
        <div className="notification-icon">🔧</div>

        <div className="notification-content">
          <h3>Issue Under Review</h3>
          <p>
            Your reported issue is being reviewed by the concerned department.
          </p>
          <span>Recently</span>
        </div>
      </div>

      {/* Empty / future notification area */}
      <div className="notification-footer">
        <button onClick={() => setPage("reports")}>
          📋 View My Reports
        </button>
      </div>

    </div>
  );
}

export default Notifications;