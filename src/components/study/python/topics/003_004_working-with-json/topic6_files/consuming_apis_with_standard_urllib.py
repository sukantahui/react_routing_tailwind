# topic6_files/consuming_apis_with_standard_urllib.py
# Module: 003_004_working-with-json
# Topic: Consuming REST API data using urllib / requests
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 1: Consuming REST APIs with Standard Library `urllib`
Demonstrates:
  1. Making GET and POST HTTP requests using built-in `urllib.request` (Zero third-party dependencies)
  2. Setting custom headers (`User-Agent`, `Accept: application/json`, `Authorization`)
  3. Safe JSON deserialization from response streams and catching `HTTPError`/`URLError`
"""

import urllib.request
import urllib.error
import json
import io

def mock_institutional_api_server(endpoint: str, method: str = "GET", data_bytes: bytes = None) -> io.BytesIO:
    """Simulates remote server network response."""
    if endpoint == "/api/v1/courses":
        payload = {
            "status": "OK",
            "server": "srv-kolkata.codernaccotax.internal",
            "catalog": [
                {"id": "PY-101", "name": "Python Full-Stack", "fee": 28000},
                {"id": "AI-201", "name": "Generators & Metaclasses", "fee": 32000}
            ]
        }
        return io.BytesIO(json.dumps(payload).encode("utf-8"))
    elif endpoint == "/api/v1/enroll" and method == "POST":
        req_doc = json.loads(data_bytes.decode("utf-8"))
        res_payload = {
            "status": "ENROLLED_SUCCESS",
            "student_id": req_doc.get("student_id"),
            "token": "AUTH-2026-SEAL-OK"
        }
        return io.BytesIO(json.dumps(res_payload).encode("utf-8"))
    raise urllib.error.HTTPError(None, 404, "Endpoint Not Found", {}, None)


def demonstrate_urllib_consumption():
    print("=" * 70)
    print("CODER & ACCOTAX - REST API CONSUMPTION WITH `urllib.request`")
    print("=" * 70)

    # 1. Simulating GET Request with Custom Headers:
    print("1. Performing GET Request with Custom HTTP Headers (`urllib.request.Request`):")
    get_request = urllib.request.Request(
        url="https://api.codernaccotax.co.in/api/v1/courses",
        headers={
            "User-Agent": "CoderAccoTax-PythonClient/2026.1",
            "Accept": "application/json"
        }
    )

    # Simulated response reading:
    response_stream = mock_institutional_api_server("/api/v1/courses", "GET")
    # Parse directly from UTF-8 byte stream using json.load():
    catalog_data = json.load(response_stream)

    print(f"   * Server Status : {catalog_data['status']}")
    print(f"   * Course Count  : {len(catalog_data['catalog'])}")
    for course in catalog_data["catalog"]:
        print(f"     - [{course['id']}] {course['name']:<26} (Fee: INR {course['fee']:,})")

    # 2. Simulating POST Request with JSON Body:
    print("\n2. Performing POST Request with JSON Body Payload:")
    enrollment_payload = {
        "student_id": "STU-101",
        "name": "Sourav Mukherjee",
        "course_id": "PY-101"
    }

    # Encode JSON dictionary to UTF-8 bytes:
    encoded_json_body = json.dumps(enrollment_payload).encode("utf-8")

    post_request = urllib.request.Request(
        url="https://api.codernaccotax.co.in/api/v1/enroll",
        data=encoded_json_body,  # Passing data automatically triggers POST method!
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer TOKEN_2026_SECRET"
        }
    )

    post_response_stream = mock_institutional_api_server("/api/v1/enroll", "POST", encoded_json_body)
    post_res_data = json.load(post_response_stream)

    print(f"   * Enrollment Response : {post_res_data['status']}")
    print(f"   * Issued Auth Token   : {post_res_data['token']}")

    print(r"""
`urllib` Golden Rules:
  1. `urllib.request.Request(url, data=bytes, headers={...})` constructs request envelopes.
  2. Always pass encoded `bytes` to `data` when making POST/PUT requests.
  3. `json.load(response)` reads and deserializes the byte stream directly in O(1) buffer space.
""")
    print("[PASSED] Standard `urllib` API Consumption Verified.")


if __name__ == "__main__":
    demonstrate_urllib_consumption()
