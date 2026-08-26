"""
Web Application Firewall (WAF) Layer 7 Anomaly Scoring Engine
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 10)
"""

import re
import urllib.parse
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

@dataclass
class HttpRequest:
    method: str
    uri_path: str
    query_params: Dict[str, str]
    headers: Dict[str, str]
    body: str

class WafAnomalyScoringEngine:
    def __init__(self, blocking_threshold: int = 5):
        self.blocking_threshold = blocking_threshold

        # OWASP CRS Rule Signatures with Severity Scores (Critical=5, Error=4, Warning=3)
        self.rules = [
            # SQL Injection Signatures
            ("942100", "SQLi: Detected classic SQL union select or tautology", 5,
             re.compile(r"(\b(select|union|insert|delete|drop|update)\b.*\b(from|into|where|table)\b|'\s*(or|and)\s*'\w+'='\w+|--|\bexec\s*\(|\bwaitfor\s+delay\b)", re.IGNORECASE)),

            # Cross-Site Scripting (XSS) Signatures
            ("941100", "XSS: Detected script tag or Javascript event handler", 5,
             re.compile(r"(<script\b[^>]*>|javascript:[^\n]*|on(load|click|error|mouseover)\s*=|<svg\b[^>]*\bonload\b)", re.IGNORECASE)),

            # OS Command Injection / RCE Signatures
            ("932100", "RCE: Detected shell command chaining or binary execution", 5,
             re.compile(r"(;\s*(cat|ls|id|whoami|sh|bash|curl|wget)\b|\|\s*(cat|sh|bash)\b|\bcmd\.exe\b|sample_log4j_jndi_probe)", re.IGNORECASE)),

            # Server-Side Request Forgery (SSRF)
            ("934100", "SSRF: Detected cloud metadata or private IP lookup URI", 5,
             re.compile(r"http(s)?://(169\.254\.169\.254|127\.0\.0\.1|localhost|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)", re.IGNORECASE)),

            # Path Traversal
            ("930100", "Path Traversal: Detected directory climbing dots", 4,
             re.compile(r"(\.\./\.\./|%2e%2e%2f|/etc/passwd|/boot\.ini)", re.IGNORECASE))
        ]

    def inspect_request(self, req: HttpRequest) -> Dict[str, any]:
        """Evaluates HTTP request against OWASP CRS Collaborative Anomaly Scoring."""
        total_anomaly_score = 0
        matched_rules = []

        # Collect all inspectable targets (URI, Query parameters, Headers, Body)
        payloads_to_scan = [req.uri_path, req.body]
        for k, v in req.query_params.items():
            payloads_to_scan.append(f"{k}={v}")
        for k, v in req.headers.items():
            if k.lower() in ["user-agent", "referer", "cookie", "x-forwarded-for"]:
                payloads_to_scan.append(f"{k}: {v}")

        # Execute regex rules across all decoded payloads
        for payload in payloads_to_scan:
            decoded_payload = urllib.parse.unquote(payload)
            for rule_id, rule_desc, severity_score, pattern in self.rules:
                if pattern.search(decoded_payload):
                    if rule_id not in [m["rule_id"] for m in matched_rules]:
                        total_anomaly_score += severity_score
                        matched_rules.append({
                            "rule_id": rule_id,
                            "description": rule_desc,
                            "score_added": severity_score,
                            "matched_snippet": pattern.search(decoded_payload).group(0)
                        })

        is_blocked = total_anomaly_score >= self.blocking_threshold
        http_status = 403 if is_blocked else 200

        return {
            "http_status": http_status,
            "action": "BLOCKED (HTTP 403 Forbidden)" if is_blocked else "PASSED (HTTP 200 OK)",
            "total_anomaly_score": total_anomaly_score,
            "blocking_threshold": self.blocking_threshold,
            "matched_rules_count": len(matched_rules),
            "matched_rules": matched_rules,
            "verdict_reason": f"WAF Anomaly Score {total_anomaly_score} >= Threshold {self.blocking_threshold}" if is_blocked else "Clean request"
        }

# Execution Test Harness
if __name__ == "__main__":
    waf = WafAnomalyScoringEngine(blocking_threshold=5)
    print("=== Web Application Firewall (WAF) Anomaly Scoring Engine ===")

    test_requests = [
        # Request 1: Normal Legitimate Web Query
        HttpRequest("GET", "/api/v1/products", {"category": "electronics", "page": "1"}, {"User-Agent": "Mozilla/5.0"}, ""),

        # Request 2: SQL Injection Attack in Query Param
        HttpRequest("GET", "/api/v1/users", {"id": "1' UNION SELECT username, password FROM admin--"}, {"User-Agent": "Mozilla/5.0"}, ""),

        # Request 3: Cross-Site Scripting (XSS) in Form Body
        HttpRequest("POST", "/comments", {}, {"Content-Type": "application/x-www-form-urlencoded"}, "comment=<script>alert(document.cookie)</script>"),

        # Request 4: SSRF targeting AWS Cloud Metadata
        HttpRequest("GET", "/fetch_avatar", {"url": "http://169.254.169.254/latest/meta-data/iam/security-credentials"}, {"User-Agent": "curl/7.68.0"}, ""),

        # Request 5: Diagnostic Command Injection in User-Agent Header
        HttpRequest("GET", "/login", {}, {"User-Agent": "sample_log4j_jndi_probe"}, "")
    ]

    for i, req in enumerate(test_requests, 1):
        res = waf.inspect_request(req)
        print(f"[{res['action']}] Req #{i} ({req.method} {req.uri_path}) -> Score: {res['total_anomaly_score']} | {res['verdict_reason']}")
        for m in res['matched_rules']:
            print(f"   ↳ [Rule {m['rule_id']}] {m['description']} (Matched: '{m['matched_snippet']}')")
