"""
Application-Level Gateway (Proxy Firewall) & L7 Sanitization Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 5)
"""

import re
import urllib.parse
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class HttpRequest:
    method: str
    uri: str
    headers: Dict[str, str]
    body: str
    client_ip: str

class ApplicationLevelGatewayProxy:
    def __init__(self):
        # Permitted HTTP Verbs (Block dangerous TRACE, CONNECT, DELETE on public endpoints)
        self.allowed_methods = {"GET", "POST", "HEAD"}

        # Blocked SQLi and XSS Regex Attack Signatures
        self.sqli_patterns = [
            re.compile(r"(\bUNION\b.*\bSELECT\b)", re.IGNORECASE),
            re.compile(r"(\bOR\b\s+['\d]+\s*=\s*['\d]+)", re.IGNORECASE),
            re.compile(r"(--|#|/\*|\*/|;)", re.IGNORECASE)
        ]
        self.xss_patterns = [
            re.compile(r"(<script\b[^>]*>.*?</script>)", re.IGNORECASE),
            re.compile(r"(javascript:\s*|onload\s*=|onerror\s*=)", re.IGNORECASE)
        ]

        # Blocked dangerous MIME types
        self.forbidden_mimes = {"application/x-msdownload", "application/x-sh", "application/x-executable"}

    def inspect_and_sanitize(self, req: HttpRequest) -> Dict[str, any]:
        """Deep Layer 7 Inspection and Request Reconstruction."""
        # 1. Method Validation
        if req.method.upper() not in self.allowed_methods:
            return {
                "verdict": "BLOCKED",
                "status_code": 405,
                "reason": f"HTTP Method '{req.method}' forbidden by Application Proxy policy.",
                "sanitized_request": None
            }

        # 2. URI Decoding & Path Normalization
        decoded_uri = urllib.parse.unquote(req.uri)

        # 3. SQL Injection Inspection on Decoded URI & Body
        for pattern in self.sqli_patterns:
            if pattern.search(decoded_uri) or pattern.search(req.body):
                return {
                    "verdict": "BLOCKED",
                    "status_code": 403,
                    "reason": "Layer 7 SQL Injection Signature Detected in URI/Body.",
                    "sanitized_request": None
                }

        # 4. XSS Inspection
        for pattern in self.xss_patterns:
            if pattern.search(decoded_uri) or pattern.search(req.body):
                return {
                    "verdict": "BLOCKED",
                    "status_code": 403,
                    "reason": "Layer 7 Cross-Site Scripting (XSS) Pattern Detected.",
                    "sanitized_request": None
                }

        # 5. Content-Type / MIME Validation
        content_type = req.headers.get("Content-Type", "").lower()
        if any(bad_mime in content_type for bad_mime in self.forbidden_mimes):
            return {
                "verdict": "BLOCKED",
                "status_code": 415,
                "reason": f"Unsupported/Malicious Content-Type '{content_type}' blocked.",
                "sanitized_request": None
            }

        # 6. Request Sanitization & Header Reconstruction (Strip internal headers)
        sanitized_headers = {k: v for k, v in req.headers.items() if k.lower() not in ["x-forwarded-host", "x-real-ip-internal"]}
        sanitized_headers["X-Forwarded-For"] = req.client_ip
        sanitized_headers["X-Proxy-Inspected-By"] = "CoderAccoTax-ALG-v5.0"

        sanitized_req = HttpRequest(
            method=req.method.upper(),
            uri=decoded_uri,
            headers=sanitized_headers,
            body=req.body,
            client_ip=req.client_ip
        )

        return {
            "verdict": "PERMITTED",
            "status_code": 200,
            "reason": "Layer 7 Inspection Passed: Clean HTTP Syntax & Verified Payload",
            "sanitized_request": sanitized_req
        }

# Execution Test Harness
if __name__ == "__main__":
    alg = ApplicationLevelGatewayProxy()
    print("=== Application-Level Gateway (Proxy Firewall) L7 Inspector ===")

    test_requests = [
        HttpRequest("GET", "/catalog?item=books", {"Host": "barrackpore.gov.in"}, "", "10.10.1.50"),
        HttpRequest("GET", "/search?q=admin%27%20UNION%20SELECT%20password%20FROM%20users--", {"Host": "barrackpore.gov.in"}, "", "198.51.100.25"),
        HttpRequest("POST", "/comment", {"Host": "barrackpore.gov.in", "Content-Type": "application/json"}, '{"msg": "<script>alert(document.cookie)</script>"}', "198.51.100.40"),
        HttpRequest("TRACE", "/debug", {"Host": "barrackpore.gov.in"}, "", "198.51.100.55"),
        HttpRequest("POST", "/upload", {"Host": "barrackpore.gov.in", "Content-Type": "application/x-msdownload"}, "MALICIOUS_EXE_BINARY_DATA", "198.51.100.80")
    ]

    for req in test_requests:
        res = alg.inspect_and_sanitize(req)
        status_icon = "✔" if res['verdict'] == "PERMITTED" else "❌"
        print(f"[{status_icon} {res['verdict']}] HTTP {res['status_code']} | {req.method} {req.uri} -> {res['reason']}")
