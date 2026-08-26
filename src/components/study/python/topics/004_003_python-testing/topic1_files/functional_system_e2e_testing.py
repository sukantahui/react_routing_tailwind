"""
# Module: 004_003_python-testing
# Topic 1: Types of testing: Unit testing, Integration testing, Functional testing
# File: functional_system_e2e_testing.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Level 3 of Testing Pyramid - Functional / End-to-End (E2E) testing
#              simulating complete black-box candidate admission journeys.
"""

import json

class AdmissionSystemApp:
    """Black-Box Application Entry Point."""
    def __init__(self):
        self.students = {}
        self.ledger = []

    def handle_request(self, request_json: str) -> str:
        """Simulates HTTP API endpoint: POST /api/v1/admit"""
        payload = json.loads(request_json)
        
        # Validation
        required = ["name", "campus", "course", "initial_payment"]
        for r in required:
            if r not in payload:
                return json.dumps({"status": "ERROR", "message": f"Missing field: {r}"})

        if payload["initial_payment"] < 5000.0:
            return json.dumps({"status": "REJECTED", "reason": "Minimum initial payment is Rs. 5,000"})

        # Process admission
        app_id = f"APP_{len(self.students) + 1:04d}"
        student_record = {
            "app_id": app_id,
            "name": payload["name"],
            "campus": payload["campus"],
            "course": payload["course"],
            "total_fee": 25000.0,
            "paid": payload["initial_payment"],
            "due": 25000.0 - payload["initial_payment"]
        }
        self.students[app_id] = student_record
        self.ledger.append({"app_id": app_id, "amount": payload["initial_payment"], "type": "ADMISSION_FEE"})

        return json.dumps({
            "status": "SUCCESS",
            "app_id": app_id,
            "student_name": payload["name"],
            "remaining_due": student_record["due"],
            "receipt_id": f"RCP_{len(self.ledger):04d}"
        })

# ------------------------------------------------------------------------------
# FUNCTIONAL / E2E TEST SUITE (Black-Box User Journey)
# ------------------------------------------------------------------------------
def test_e2e_successful_candidate_admission_journey():
    print("   [...] Running E2E Admission Journey for Mamata (Barrackpore)...")
    app = AdmissionSystemApp()

    # 1. User submits complete JSON admission form
    request_data = json.dumps({
        "name": "Mamata",
        "campus": "Barrackpore",
        "course": "Python Pro Mastery",
        "initial_payment": 8000.0
    })

    # 2. System handles entire workflow (Validation -> Business Logic -> Persistence -> Receipt)
    response_json = app.handle_request(request_data)
    response = json.loads(response_json)

    # 3. Assert End-to-End User Contract
    assert response["status"] == "SUCCESS"
    assert response["student_name"] == "Mamata"
    assert response["remaining_due"] == 17000.0
    assert response["app_id"] == "APP_0001"
    assert response["receipt_id"] == "RCP_0001"
    
    print(f"   [PASS] test_e2e_successful_candidate_admission_journey -> AppID: {response['app_id']}")

def test_e2e_underpaid_admission_rejected():
    app = AdmissionSystemApp()
    request_data = json.dumps({
        "name": "Debangshu",
        "campus": "Kolkata",
        "course": "Python Pro",
        "initial_payment": 2000.0 # Under minimum 5000
    })

    response = json.loads(app.handle_request(request_data))
    assert response["status"] == "REJECTED"
    assert "Minimum initial payment" in response["reason"]
    print("   [PASS] test_e2e_underpaid_admission_rejected")

def main():
    print("=" * 75)
    print("[FUNCTIONAL / E2E TESTING] Level 3: Complete Black-Box User Journey")
    print("=" * 75)

    test_e2e_successful_candidate_admission_journey()
    test_e2e_underpaid_admission_rejected()

    print("=" * 75)
    print("[TAKEAWAY] Functional E2E tests verify the entire system from the client's")
    print("           perspective, validating full business transactions.")
    print("=" * 75)

if __name__ == "__main__":
    main()
