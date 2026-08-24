# topic7_files/token_and_pattern_validator.py
# Module: 002_007_string-processing
# Topic: Basic Regular Expressions Concept with re Module
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 7 - File 4: Enterprise Indian ID, GST & Contact Validation Engine
Demonstrates:
  1. Compiling robust regex patterns with re.VERBOSE and re.IGNORECASE
  2. PAN Card, GSTIN, PIN Code, Mobile & Email validators
  3. Production input sanitization and verification reporting
"""

import re
from typing import Dict, Tuple

class EnterprisePatternValidator:
    """Pre-compiled regex validation suite for Indian business and student portals."""

    # 1. Indian PAN: 5 Letters + 4 Digits + 1 Letter
    PAN_PATTERN = re.compile(
        r"""
        ^                   # Start of string
        [A-Z]{5}            # 5 Alphabetic uppercase characters
        [0-9]{4}            # 4 Numeric digits
        [A-Z]               # 1 Alphabetic checksum character
        $                   # End of string
        """,
        re.VERBOSE | re.IGNORECASE
    )

    # 2. Indian 15-Digit GSTIN: State Code (2 digits) + PAN (10 chars) + Entity (1) + 'Z' + Checksum (1)
    GSTIN_PATTERN = re.compile(
        r"""
        ^                   # Start of string
        [0-9]{2}            # 2 Digit State Code (e.g. 19 for West Bengal)
        [A-Z]{5}[0-9]{4}[A-Z] # 10 Character PAN
        [1-9A-Z]{1}         # Entity number (1-9 or A-Z)
        Z                   # Default 'Z' character
        [0-9A-Z]{1}         # 1 Alphanumeric checksum
        $                   # End of string
        """,
        re.VERBOSE | re.IGNORECASE
    )

    # 3. Indian Postal PIN Code: 6 Digits, never starting with '0'
    PIN_PATTERN = re.compile(r"^[1-9][0-9]{5}$")

    # 4. Indian Mobile: 10 Digits starting with 6,7,8,9, optional +91 or 0 prefix
    MOBILE_PATTERN = re.compile(
        r"""
        ^                   # Start of string
        (?:                 # Non-capturing group for prefix
            \+91[\-\s]?     # +91 with optional hyphen or space
            |
            0               # Or leading 0
        )?                  # Prefix is optional
        [6-9][0-9]{9}       # 10 Digits starting with 6-9
        $                   # End of string
        """,
        re.VERBOSE
    )

    # 5. Email Validator (RFC compliant basic regex)
    EMAIL_PATTERN = re.compile(
        r"""
        ^
        [a-zA-Z0-9_.+-]+    # Username characters
        @                   # At-rate separator
        [a-zA-Z0-9-]+       # Domain name
        (?:\.[a-zA-Z0-9-]+)+# One or more domain extensions (.co.in, .com)
        $
        """,
        re.VERBOSE
    )

    @classmethod
    def validate_student_record(cls, record: Dict[str, str]) -> Dict[str, Tuple[bool, str]]:
        results = {}
        
        # PAN
        pan = record.get("pan", "").strip()
        results["pan"] = (bool(cls.PAN_PATTERN.match(pan)), pan)

        # GSTIN
        gstin = record.get("gstin", "").strip()
        results["gstin"] = (bool(cls.GSTIN_PATTERN.match(gstin)), gstin)

        # PIN
        pin = record.get("pin", "").strip()
        results["pin"] = (bool(cls.PIN_PATTERN.match(pin)), pin)

        # Mobile
        mobile = record.get("mobile", "").strip()
        results["mobile"] = (bool(cls.MOBILE_PATTERN.match(mobile)), mobile)

        # Email
        email = record.get("email", "").strip()
        results["email"] = (bool(cls.EMAIL_PATTERN.match(email)), email)

        return results


def run_validator_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - ENTERPRISE REGEX VALIDATION AUDIT")
    print("=" * 75)

    sample_applicant = {
        "pan": "ABCDE1234F",
        "gstin": "19ABCDE1234F1Z5",
        "pin": "700120",
        "mobile": "+91 7003756860",
        "email": "susmita.student@codernaccotax.co.in"
    }

    audit_results = EnterprisePatternValidator.validate_student_record(sample_applicant)

    for field, (valid, val) in audit_results.items():
        status = "[PASSED VALIDATION]" if valid else "[FAILED VALIDATION]"
        print(f"Field: {field.upper():<8} | Value: '{val:<35}' -> {status}")


if __name__ == "__main__":
    run_validator_demo()
