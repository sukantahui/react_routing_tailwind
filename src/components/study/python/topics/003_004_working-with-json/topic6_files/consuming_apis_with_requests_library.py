# topic6_files/consuming_apis_with_requests_library.py
# Module: 003_004_working-with-json
# Topic: Consuming REST API data using urllib / requests
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 2: Modern REST API Consumption with `requests`
Demonstrates:
  1. High-level HTTP operations with `requests.get()` and `requests.post()`
  2. Automatic JSON payload serialization via `json={...}` parameter
  3. Deserializing responses with `response.json()` and error gating via `raise_for_status()`
"""

import json

class MockRequestsResponse:
    """Mock simulating a requests.Response object."""
    def __init__(self, status_code: int, json_data: dict, headers: dict = None):
        self.status_code = status_code
        self._json_data = json_data
        self.headers = headers or {"Content-Type": "application/json"}
        self.text = json.dumps(json_data)

    def json(self):
        """Native requests.Response.json() deserializer."""
        return self._json_data

    def raise_for_status(self):
        """Raises HTTPError for 4xx or 5xx status codes."""
        if self.status_code >= 400:
            raise RuntimeError(f"HTTP Error {self.status_code}: Request Failed")


def demonstrate_requests_idioms():
    print("=" * 70)
    print("CODER & ACCOTAX - MODERN REST API CONSUMPTION WITH `requests`")
    print("=" * 70)

    # 1. Simulating GET Request with Query Parameters and Headers:
    print("1. GET Request with `params` and `response.json()`:")
    simulated_get_response = MockRequestsResponse(
        status_code=200,
        json_data={
            "campus": "Barrackpore Main Campus",
            "enrolled_count": 450,
            "top_course": "Python Full-Stack & AI"
        }
    )

    # Check status and parse JSON:
    simulated_get_response.raise_for_status()
    data = simulated_get_response.json()

    print(f"   * Status Code   : {simulated_get_response.status_code} OK")
    print(f"   * Campus Center : {data['campus']}")
    print(f"   * Total Enrolled: {data['enrolled_count']} Students\n")

    # 2. Simulating POST Request with `json={...}`:
    print("2. POST Request with Automatic `json={...}` Payload Serialization:")
    simulated_post_response = MockRequestsResponse(
        status_code=201,
        json_data={
            "status": "CREATED",
            "student_id": "STU-101",
            "admission_receipt_no": "REC-2026-001",
            "verified": True
        }
    )

    simulated_post_response.raise_for_status()
    post_data = simulated_post_response.json()

    print(f"   * Status Code : {simulated_post_response.status_code} CREATED")
    print(f"   * Receipt No  : {post_data['admission_receipt_no']}")
    print(f"   * Verified    : {post_data['verified']}\n")

    # 3. Demonstrating `raise_for_status()` on 403 Forbidden:
    print("3. Demonstrating Exception Handling with `raise_for_status()`:")
    error_response = MockRequestsResponse(
        status_code=403,
        json_data={"error": "Access Denied: Invalid Authentication Token"}
    )

    try:
        error_response.raise_for_status()
    except RuntimeError as exc:
        print(f"   * [EXCEPTION CAUGHT SAFELY] : {exc}")

    print(r"""
`requests` Golden Rules:
  1. Pass dictionaries directly to `json=payload` (Automatic JSON serialization and Content-Type header).
  2. Use `response.json()` to parse responses directly into Python dictionaries.
  3. ALWAYS invoke `response.raise_for_status()` to prevent silent 4xx/5xx failure handling.
""")
    print("[PASSED] Modern `requests` API Consumption Verified.")


if __name__ == "__main__":
    demonstrate_requests_idioms()
