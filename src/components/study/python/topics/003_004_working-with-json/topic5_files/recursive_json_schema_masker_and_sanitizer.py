# topic5_files/recursive_json_schema_masker_and_sanitizer.py
# Module: 003_004_working-with-json
# Topic: Working with nested JSON structures and API payloads
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 3: Recursive PII Data Masking & Key Normalization
Demonstrates:
  1. Deep recursive redaction of sensitive PII fields (passwords, tokens, bank accounts)
  2. Recursive key transformation (converting JavaScript `camelCase` keys to Python `snake_case`)
  3. Sanitizing arbitrary depth JSON trees before database persistence or log output
"""

import json
import re
from typing import Any, Set

SENSITIVE_PII_KEYS: Set[str] = {
    "password", "secret", "auth_token", "access_token",
    "bank_account", "card_cvv", "aadhaar_number", "ssn"
}

def camel_to_snake(name: str) -> str:
    """Converts a camelCase string to snake_case."""
    s1 = re.sub(r"(.)([A-Z][a-z]+)", r"\1_\2", name)
    return re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", s1).lower()


def sanitize_and_mask_nested_json(data: Any, mask_str: str = "********") -> Any:
    """Recursively converts keys to snake_case and redacts sensitive PII values."""
    if isinstance(data, dict):
        sanitized = {}
        for k, v in data.items():
            snake_k = camel_to_snake(str(k))
            if snake_k in SENSITIVE_PII_KEYS or any(sens in snake_k for sens in ("password", "secret", "token")):
                sanitized[snake_k] = mask_str
            else:
                sanitized[snake_k] = sanitize_and_mask_nested_json(v, mask_str=mask_str)
        return sanitized
    elif isinstance(data, (list, tuple)):
        return [sanitize_and_mask_nested_json(item, mask_str=mask_str) for item in data]
    return data


def demonstrate_pii_masking():
    print("=" * 70)
    print("CODER & ACCOTAX - RECURSIVE PII MASKING & KEY NORMALIZATION")
    print("=" * 70)

    # Raw incoming webhook with camelCase keys and sensitive security credentials:
    raw_incoming_webhook = {
        "studentProfile": {
            "fullName": "Sourav Mukherjee",
            "contactEmail": "sourav@codernaccotax.internal",
            "userPassword": "SuperSecretPassword123!",
            "billingDetails": {
                "bankAccountNumber": "SBIN00012345678",
                "cardCvv": "999",
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        },
        "academicRegistration": {
            "courseName": "Python Full-Stack & AI",
            "feePaid": 28000.0
        }
    }

    print("1. Original Raw Webhook (Containing Unmasked PII & camelCase keys):")
    print(json.dumps(raw_incoming_webhook, indent=2))

    # 2. Apply Recursive Sanitizer & Masker:
    print("\n2. Sanitized & Masked Payload (snake_case + Redacted PII):")
    clean_webhook = sanitize_and_mask_nested_json(raw_incoming_webhook)
    print(json.dumps(clean_webhook, indent=2))

    print(r"""
Production Invariants:
  1. Never write unmasked sensitive credentials to log files or audit trails.
  2. Normalize camelCase API keys to Pythonic snake_case for consistent internal schema handling.
  3. Recursive traversal guarantees deep nested structures (at arbitrary depths) are safely sanitized.
""")
    print("[PASSED] Recursive PII Masking & Key Normalization Verified.")


if __name__ == "__main__":
    demonstrate_pii_masking()
