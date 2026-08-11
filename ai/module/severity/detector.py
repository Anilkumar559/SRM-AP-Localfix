class SeverityDetector:

    HIGH_KEYWORDS = [
        "fire", "smoke", "spark", "electric shock",
        "exposed wire", "gas leak", "flood",
        "danger", "emergency", "collapse"
    ]

    MEDIUM_KEYWORDS = [
        "leak", "leakage", "broken fan", "broken ac",
        "not working", "damaged", "blocked drain",
        "broken door", "broken light"
    ]

    LOW_KEYWORDS = [
        "dirty", "dust", "garbage", "waste",
        "minor", "small"
    ]

    def detect(self, text):
        text = text.lower()

        for keyword in self.HIGH_KEYWORDS:
            if keyword in text:
                return {
                    "severity": "High",
                    "score": 3,
                    "reason": keyword
                }

        for keyword in self.MEDIUM_KEYWORDS:
            if keyword in text:
                return {
                    "severity": "Medium",
                    "score": 2,
                    "reason": keyword
                }

        for keyword in self.LOW_KEYWORDS:
            if keyword in text:
                return {
                    "severity": "Low",
                    "score": 1,
                    "reason": keyword
                }

        return {
            "severity": "Medium",
            "score": 2,
            "reason": "Default severity"
        }


severity_detector = SeverityDetector()