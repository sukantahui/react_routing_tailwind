# topic4_files/form_validator_and_security_scanner.py
# Module: 002_007_string-processing
# Topic: Searching & Validation (find, rfind, count, startswith, endswith, isdigit, isalpha)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 4 - File 4: Production Form Validator & Security Threat Scanner
Demonstrates:
  1. Validating Indian Financial & Personal IDs (PAN, PIN Code, Mobile)
  2. Password complexity validation using isupper(), islower(), isdigit(), count()
  3. Security scanning for SQL Injection & Cross-Site Scripting (XSS) patterns
  4. Comprehensive audit and validation reporting
"""

from typing import List, Dict, Tuple

class FormValidator:
    """Production validation engine using Python core string validation methods."""

    @staticmethod
    def validate_pan(pan: str) -> Tuple[bool, str]:
        """
        Validates Indian Permanent Account Number (PAN):
        Format: 5 Uppercase Letters + 4 Digits + 1 Uppercase Letter (e.g. ABCDE1234F)
        """
        pan = pan.strip().upper()
        if len(pan) != 10:
            return False, "PAN must be exactly 10 characters long"
        
        prefix = pan[:5]
        digits = pan[5:9]
        suffix = pan[9]

        if not prefix.isalpha():
            return False, "First 5 characters must be alphabetic letters"
        if not digits.isdigit():
            return False, "Characters 6 through 9 must be digits"
        if not suffix.isalpha():
            return False, "Last character must be an alphabetic letter"
        
        return True, "Valid PAN Number"

    @staticmethod
    def validate_pin_code(pin: str) -> Tuple[bool, str]:
        """
        Validates Indian Postal PIN code (e.g. 700120 for Barrackpore).
        Must be 6 digits and cannot start with '0'.
        """
        pin = pin.strip()
        if len(pin) != 6:
            return False, "PIN code must be exactly 6 digits"
        if not pin.isdigit():
            return False, "PIN code must contain only numeric digits"
        if pin.startswith("0"):
            return False, "PIN code cannot start with '0'"
        
        return True, "Valid PIN Code"

    @staticmethod
    def validate_indian_mobile(phone: str) -> Tuple[bool, str]:
        """
        Validates Indian 10-digit mobile number.
        Must start with 6, 7, 8, or 9 and be all digits.
        """
        phone = phone.strip()
        if phone.startswith("+91"):
            phone = phone[3:].strip()
        elif phone.startswith("0"):
            phone = phone[1:].strip()

        if len(phone) != 10 or not phone.isdigit():
            return False, "Mobile number must be exactly 10 digits"
        if not phone.startswith(("6", "7", "8", "9")):
            return False, "Indian mobile number must start with 6, 7, 8, or 9"

        return True, "Valid Mobile Number"

    @staticmethod
    def validate_password_strength(pwd: str) -> Tuple[bool, List[str]]:
        """Checks password length, upper, lower, digits, and special characters."""
        issues = []
        if len(pwd) < 8:
            issues.append("Must be at least 8 characters long")
        if not any(c.isupper() for c in pwd):
            issues.append("Must contain at least 1 uppercase letter")
        if not any(c.islower() for c in pwd):
            issues.append("Must contain at least 1 lowercase letter")
        if not any(c.isdigit() for c in pwd):
            issues.append("Must contain at least 1 numeric digit")
        if not any(c in "!@#$%^&*()-_+=" for c in pwd):
            issues.append("Must contain at least 1 special symbol (!@#$%^&*)")

        return len(issues) == 0, issues


class SecurityThreatScanner:
    """Detects malicious input payloads using string search methods."""

    FORBIDDEN_SQL_KEYWORDS = ("SELECT ", "DROP TABLE", "INSERT INTO", "UNION SELECT", "OR '1'='1'")
    FORBIDDEN_XSS_PATTERNS = ("<script>", "</script>", "javascript:", "onload=", "onerror=")

    @classmethod
    def scan_input(cls, payload: str) -> List[str]:
        """Returns detected security vulnerabilities in user input."""
        threats = []
        normalized = payload.lower()

        # Check SQL Injection triggers
        for pattern in cls.FORBIDDEN_SQL_KEYWORDS:
            if pattern.lower() in normalized:
                threats.append(f"SQL Injection Threat: Detected '{pattern}'")

        # Check XSS triggers
        for pattern in cls.FORBIDDEN_XSS_PATTERNS:
            if pattern in normalized:
                threats.append(f"XSS Threat: Detected '{pattern}'")

        return threats


def run_validation_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - PRODUCTION FORM & SECURITY AUDIT SYSTEM")
    print("=" * 75)

    # 1. PAN Test
    pan_samples = ["ABCDE1234F", "abcde1234f", "12345ABCDE", "ABCDE12345"]
    print("--- 1. PAN Number Verification ---")
    for p in pan_samples:
        valid, msg = FormValidator.validate_pan(p)
        status = "[VALID]" if valid else "[INVALID]"
        print(f"PAN: '{p:<12}' -> {status:<9} | {msg}")

    # 2. PIN Code Test
    pin_samples = ["700120", "001203", "70012A", "700025"]
    print("\n--- 2. PIN Code Verification ---")
    for pin in pin_samples:
        valid, msg = FormValidator.validate_pin_code(pin)
        status = "[VALID]" if valid else "[INVALID]"
        print(f"PIN: '{pin:<8}' -> {status:<9} | {msg}")

    # 3. Security Threat Scanning
    test_inputs = [
        "Susmita Mukherjee, Barrackpore",
        "admin' OR '1'='1' --",
        "Hello <script>alert('hack')</script>",
        "standard_query_report_2026.pdf"
    ]
    print("\n--- 3. Input Security Threat Scan ---")
    for inp in test_inputs:
        threats = SecurityThreatScanner.scan_input(inp)
        status = "[FLAGGED THREAT]" if threats else "[CLEAN INPUT]"
        print(f"Input : '{inp}'")
        print(f"Status: {status}")
        if threats:
            for t in threats:
                print(f"  * {t}")
        print()


if __name__ == "__main__":
    run_validation_demo()
