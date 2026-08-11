from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from module.severity.detector import severity_detector
from module.routing.router import department_router


app = FastAPI(
    title="SRM AP LocalFix AI",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "SRM AP LocalFix AI is running",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/test-ai")
def test_ai():

    description = "The classroom fan is not working"

    severity = severity_detector.detect(description)

    department = department_router.route("Electrical")

    return {
        "description": description,
        "severity": severity,
        "department": department
    }