import { useRef, useState } from "react";

function ReportIssue({
  setPage,
  setRecentReports,
}) {
  const [step, setStep] = useState(1);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [error, setError] =
    useState("");

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const cameraInputRef =
    useRef(null);

  const galleryInputRef =
    useRef(null);

  // ==========================================
  // PHOTO
  // ==========================================

  function handlePhotoChange(event) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image."
      );

      return;
    }

    setError("");

    setPhoto(file);

    // Convert image to Base64.
    // This makes the test report image
    // visible in Recent Reports.
    const reader =
      new FileReader();

    reader.onload = () => {
      setPhotoPreview(
        reader.result
      );
    };

    reader.onerror = () => {
      setError(
        "Unable to read the selected image."
      );
    };

    reader.readAsDataURL(file);
  }

  // ==========================================
  // REMOVE PHOTO
  // ==========================================

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview("");

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  }

  // ==========================================
  // LOCATION
  // ==========================================

  function getLocation() {
    if (!navigator.geolocation) {
      setError(
        "Location is not supported on this device."
      );

      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const lat =
          position.coords.latitude.toFixed(6);

        const lng =
          position.coords.longitude.toFixed(6);

        setLocation(
          `Campus location detected (${lat}, ${lng})`
        );

        setLocationLoading(false);
      },

      () => {

        setError(
          "Unable to get your location. Please enter it manually."
        );

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  // ==========================================
  // STEP 1
  // ==========================================

  function continueToDetails() {
    if (!photo) {
      setError(
        "Please upload a photo of the problem first."
      );

      return;
    }

    setError("");
    setStep(2);
  }

  // ==========================================
  // STEP 2
  // ==========================================

  function continueToReview() {
    if (!category) {
      setError(
        "Please select the problem type."
      );

      return;
    }

    if (description.trim().length < 10) {
      setError(
        "Please describe the problem in at least 10 characters."
      );

      return;
    }

    if (!location.trim()) {
      setError(
        "Please provide the problem location."
      );

      return;
    }

    setError("");
    setStep(3);
  }

  // ==========================================
  // SUBMIT
  // ==========================================

  function submitReport() {

    const newReport = {

      id: Date.now(),

      photo: photoPreview,

      category: category,

      description:
        description.trim(),

      location:
        location.trim(),

      status: "Submitted",

      date:
        new Date().toLocaleString(),
    };

    // TEST ONLY
    setRecentReports(
      (previousReports) => [
        newReport,
        ...previousReports,
      ]
    );

    setSubmitted(true);
  }

  // ==========================================
  // SUCCESS
  // ==========================================

  if (submitted) {
    return (
      <div className="phone-app">

        <div className="report-success">

          <div className="success-circle">
            ✓
          </div>

          <h1>
            Report Submitted
          </h1>

          <p>
            Thank you for helping improve
            the SRM University AP campus.
          </p>

          <div className="success-id">

            <span>
              Report Status
            </span>

            <strong>
              Submitted
            </strong>

          </div>

          <button
            className="primary-action"
            onClick={() =>
              setPage("home")
            }
          >
            Back to Home
          </button>

        </div>

      </div>
    );
  }

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
          REPORT HEADER
      ====================================== */}

      <header className="report-header">

        <button
          className="back-button"
          onClick={() =>
            setPage("home")
          }
        >
          ‹
        </button>

        <div>

          <h1>
            Report an Issue
          </h1>

          <p>
            Help us improve your campus
          </p>

        </div>

      </header>

      {/* ======================================
          PROGRESS
      ====================================== */}

      <div className="report-progress">

        <div className="progress-top">

          <span>
            Step {step} of 3
          </span>

          <span>
            {step === 1
              ? "Photo"
              : step === 2
              ? "Details"
              : "Review"}
          </span>

        </div>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width:
                `${step * 33.33}%`,
            }}
          />

        </div>

      </div>

      <main className="report-content">

        {/* ====================================
            STEP 1
        ==================================== */}

        {step === 1 && (

          <section>

            <div className="report-title">

              <span className="step-icon">
                📸
              </span>

              <div>

                <h2>
                  Add a photo
                </h2>

                <p>
                  Show us exactly what needs
                  to be fixed.
                </p>

              </div>

            </div>

            {!photo ? (

              <>

                <div className="upload-box">

                  <div className="upload-symbol">
                    📷
                  </div>

                  <h3>
                    Upload a photo
                  </h3>

                  <p>
                    Take a clear photo of the
                    campus issue.
                  </p>

                  <div className="upload-buttons">

                    <button
                      className="camera-button"
                      onClick={() =>
                        cameraInputRef.current?.click()
                      }
                    >
                      📷 Take Photo
                    </button>

                    <button
                      className="gallery-button"
                      onClick={() =>
                        galleryInputRef.current?.click()
                      }
                    >
                      🖼️ Gallery
                    </button>

                  </div>

                  <small>
                    JPG, PNG or HEIC
                  </small>

                </div>

                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={
                    handlePhotoChange
                  }
                />

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    handlePhotoChange
                  }
                />

              </>

            ) : (

              <div className="photo-preview-card">

                <div className="photo-preview">

                  <img
                    src={photoPreview}
                    alt="Selected issue"
                  />

                  <button
                    className="remove-photo"
                    onClick={
                      removePhoto
                    }
                  >
                    ×
                  </button>

                </div>

                <div className="photo-info">

                  <strong>
                    Photo added
                  </strong>

                  <span>
                    {photo.name}
                  </span>

                </div>

                <button
                  className="change-photo"
                  onClick={() =>
                    galleryInputRef.current?.click()
                  }
                >
                  Change photo
                </button>

              </div>

            )}

            {error && (
              <div className="form-error">
                ❌ {error}
              </div>
            )}

            <button
              className="primary-action"
              onClick={
                continueToDetails
              }
            >
              Continue
              <span>
                →
              </span>
            </button>

          </section>
        )}

        {/* ====================================
            STEP 2
        ==================================== */}

        {step === 2 && (

          <section>

            <div className="report-title">

              <span className="step-icon">
                📝
              </span>

              <div>

                <h2>
                  Describe the problem
                </h2>

                <p>
                  Give us enough information
                  to understand the issue.
                </p>

              </div>

            </div>

            {photoPreview && (

              <div className="mini-photo">

                <img
                  src={photoPreview}
                  alt="Issue"
                />

                <div>

                  <strong>
                    Photo attached
                  </strong>

                  <span>
                    Your photo will be included
                    with this report.
                  </span>

                </div>

              </div>

            )}

            <label className="form-label">
              Problem type
            </label>

            <div className="category-grid">

              {[
                ["🪑", "Furniture"],
                ["💡", "Electrical"],
                ["🚰", "Water"],
                ["🧹", "Cleanliness"],
                ["🚽", "Restroom"],
                ["🏢", "Building"],
              ].map(
                ([icon, name]) => (

                  <button
                    key={name}
                    className={
                      `category-button ${
                        category === name
                          ? "selected"
                          : ""
                      }`
                    }
                    onClick={() =>
                      setCategory(name)
                    }
                  >

                    <span>
                      {icon}
                    </span>

                    {name}

                  </button>

                )
              )}

            </div>

            <label className="form-label">
              What's wrong?
            </label>

            <textarea
              className="problem-textarea"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Example: The ceiling fan in Room 204 is not working..."
              maxLength={500}
            />

            <div className="character-count">
              {description.length}/500
            </div>

            <label className="form-label">
              Where is the problem?
            </label>

            <div className="location-input">

              <span>
                📍
              </span>

              <input
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(
                    event.target.value
                  )
                }
                placeholder="Building, block, room or area"
              />

            </div>

            <button
              className="detect-location"
              onClick={getLocation}
              disabled={locationLoading}
            >
              📍{" "}
              {locationLoading
                ? "Detecting location..."
                : "Use my current location"}
            </button>

            {error && (
              <div className="form-error">
                ❌ {error}
              </div>
            )}

            <div className="form-actions">

              <button
                className="secondary-action"
                onClick={() => {
                  setError("");
                  setStep(1);
                }}
              >
                ← Back
              </button>

              <button
                className="primary-action compact"
                onClick={
                  continueToReview
                }
              >
                Review
                <span>
                  →
                </span>
              </button>

            </div>

          </section>
        )}

        {/* ====================================
            STEP 3
        ==================================== */}

        {step === 3 && (

          <section>

            <div className="report-title">

              <span className="step-icon">
                🔍
              </span>

              <div>

                <h2>
                  Review your report
                </h2>

                <p>
                  Make sure everything looks
                  correct before submitting.
                </p>

              </div>

            </div>

            <div className="review-photo">

              <img
                src={photoPreview}
                alt="Problem"
              />

            </div>

            <div className="review-card">

              <div className="review-row">

                <span>
                  Problem type
                </span>

                <strong>
                  {category}
                </strong>

              </div>

              <div className="review-divider" />

              <div className="review-row vertical">

                <span>
                  Description
                </span>

                <p>
                  {description}
                </p>

              </div>

              <div className="review-divider" />

              <div className="review-row">

                <span>
                  Location
                </span>

                <strong>
                  📍 {location}
                </strong>

              </div>

            </div>

            <div className="form-actions">

              <button
                className="secondary-action"
                onClick={() => {
                  setError("");
                  setStep(2);
                }}
              >
                ← Edit
              </button>

              <button
                className="primary-action compact"
                onClick={
                  submitReport
                }
              >
                Submit Report
                <span>
                  ✓
                </span>
              </button>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default ReportIssue;