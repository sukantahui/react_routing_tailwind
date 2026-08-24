# topic8_files/log_parser_and_pii_redactor.py
# Module: 002_007_string-processing
# Topic: Pattern Matching (search, match, findall, sub)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 4: Production Web Server Log Parser & PII Redactor
Demonstrates:
  1. Parsing multi-line Nginx/Apache web server logs with finditer()
  2. Named capture groups for structured record extraction
  3. Industrial PII (Personally Identifiable Information) data redactor
  4. Masking Indian Mobile numbers, PAN cards, and emails
"""

import re
from typing import List, Dict, Any

SAMPLE_WEB_LOGS = """
103.21.124.8 - - [24/Aug/2026:18:30:15 +0530] "GET /courses/python-pro HTTP/1.1" 200 4520 "https://codernaccotax.co.in"
182.74.15.92 - - [24/Aug/2026:18:31:02 +0530] "POST /api/register HTTP/1.1" 201 1024 "https://codernaccotax.co.in/register"
103.21.124.8 - - [24/Aug/2026:18:32:44 +0530] "GET /student/fees/invoice-9402 HTTP/1.1" 200 8920 "https://codernaccotax.co.in"
49.207.50.11 - - [24/Aug/2026:18:35:10 +0530] "GET /images/logo.png HTTP/1.1" 304 0 "https://codernaccotax.co.in"
"""

SAMPLE_SENSITIVE_TEXT = """
Student Enrollment Record:
- Name: Susmita Mukherjee
- Mobile: +91 7003756860
- Emergency Contact: 9830012345
- PAN Card: ABCDE1234F
- Email: susmita.mukherjee@codernaccotax.co.in
- Fee Paid: INR 14,337.00 for Barrackpore Batch 2026.
"""

class ProductionSecuritySuite:
    """Enterprise log parsing and privacy redaction engine."""

    # Combined Log Format Regex Pattern with Named Groups
    LOG_PATTERN = re.compile(
        r"""
        ^
        (?P<ip>\d{1,3}(?:\.\d{1,3}){3})         # Client IP Address
        \s+-\s+-\s+
        \[(?P<timestamp>[^\]]+)\]               # Date and time stamp
        \s+
        "(?P<method>[A-Z]+)\s+(?P<url>[^\s]+)\s+HTTP/[0-9.]+" # HTTP Request Line
        \s+
        (?P<status>\d{3})                       # HTTP Status Code
        \s+
        (?P<bytes>\d+)                          # Response Body Bytes
        """,
        re.VERBOSE | re.MULTILINE
    )

    # PII Patterns for Redaction
    MOBILE_PATTERN = re.compile(r"(?:\+91[\-\s]?)?[6-9]\d{9}")
    PAN_PATTERN = re.compile(r"\b[A-Z]{5}\d{4}[A-Z]\b", re.IGNORECASE)
    EMAIL_PATTERN = re.compile(r"\b(?P<user>[a-zA-Z0-9_.+-]+)@(?P<domain>[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)\b")

    @classmethod
    def parse_logs(cls, log_text: str) -> List[Dict[str, Any]]:
        """Parses raw server logs into structured dictionary records."""
        parsed_records = []
        for m in cls.LOG_PATTERN.finditer(log_text.strip()):
            rec = m.groupdict()
            rec["status"] = int(rec["status"])
            rec["bytes"] = int(rec["bytes"])
            parsed_records.append(rec)
        return parsed_records

    @classmethod
    def redact_pii(cls, text: str) -> str:
        """Redacts sensitive PII information from text before public logging."""
        
        # 1. Mask Mobile Numbers: +91 7003756860 -> +91 ******6860
        def mask_mobile(m: re.Match) -> str:
            full = m.group(0)
            digits_only = re.sub(r"\D", "", full)
            if len(digits_only) >= 10:
                last4 = digits_only[-4:]
                return f"+91 ******{last4}"
            return "[REDACTED PHONE]"

        text = cls.MOBILE_PATTERN.sub(mask_mobile, text)

        # 2. Mask PAN: ABCDE1234F -> AB*****4F
        def mask_pan(m: re.Match) -> str:
            pan = m.group(0).upper()
            return f"{pan[:2]}*****{pan[-2:]}"

        text = cls.PAN_PATTERN.sub(mask_pan, text)

        # 3. Mask Email: susmita.mukherjee@... -> s*****e@...
        def mask_email(m: re.Match) -> str:
            user = m.group("user")
            domain = m.group("domain")
            if len(user) > 2:
                masked = user[0] + ("*" * (len(user) - 2)) + user[-1]
            else:
                masked = user[0] + "*"
            return f"{masked}@{domain}"

        text = cls.EMAIL_PATTERN.sub(mask_email, text)

        return text


def run_pipeline_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - PRODUCTION LOG PARSER & PII REDACTOR")
    print("=" * 75)

    print("\n--- 1. PARSED WEB SERVER LOGS (via finditer) ---")
    records = ProductionSecuritySuite.parse_logs(SAMPLE_WEB_LOGS)
    print(f"Total Structured Records Extracted: {len(records)}\n")
    for r in records:
        print(f"IP: {r['ip']:<15} | Method: {r['method']:<4} | Status: {r['status']} | URL: {r['url']}")

    print("\n" + "=" * 75)
    print("--- 2. PRIVACY REDACTION OF SENSITIVE STUDENT DATA ---")
    print("=" * 75)
    print("ORIGINAL SENSITIVE TEXT:")
    print(SAMPLE_SENSITIVE_TEXT.strip())

    print("\nREDACTED AUDIT-SAFE OUTPUT:")
    redacted_output = ProductionSecuritySuite.redact_pii(SAMPLE_SENSITIVE_TEXT)
    print(redacted_output.strip())


if __name__ == "__main__":
    run_pipeline_demo()
