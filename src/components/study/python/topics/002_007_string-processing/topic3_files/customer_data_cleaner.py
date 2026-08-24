# topic3_files/customer_data_cleaner.py
# Module: 002_007_string-processing
# Topic: Essential String Methods (upper, lower, title, strip, split, join, replace)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 3 - File 4: Real-World Customer Record Sanitization & Normalization Pipeline
Demonstrates:
  1. Cleaning noisy, unformatted customer intake data
  2. Normalizing names (title casing, extra whitespace collapse)
  3. Email validation and domain extraction using partition() and lower()
  4. Phone number digits extraction using replace()
  5. Address standardizing for Barrackpore & Kolkata clients
  6. Generating clean formatted CSV output using delimiter.join()
"""

from typing import List, Dict, Any

# Raw, unformatted customer registration dump
RAW_CUSTOMER_RECORDS = [
    "  101 |   sUSMITA    mUKHERJEE   |  SUSMITA.STUDENT@GMAIL.COM  |  +91 (700) 375-6860  |  25 shibtala rd, BARRACKPORE, WB - 700120 ",
    "102 |  rahul  roy  chowdhury | RAHUL.ROY@YAHOO.CO.IN | 9830012345 | 14/B S.P. Mukherjee road, kolkata, wb - 700025",
    "  103|ANIRBAN  BANERJEE|anirban.b@codernaccotax.co.in|+91-9433-221100| 88 Ghoshpara Road, palta, 24 Pgs (N) - 743122 ",
    " 104 |  pRIYA   DAS   | priya.das@outlook.com | (033) 2592-1144 | 5 Riverside Road, Barrackpore Cantonment, WB - 700120",
    "105|   DEBOJYOTI  SEN   GUPTA |  debo.sen@techcorp.io | +91 7003 112 233 | flat 4A, Green View Apt, sodepur, kolkata - 700110 "
]

class CustomerDataSanitizer:
    """Production data pipeline to standardize dirty string inputs."""

    @staticmethod
    def clean_name(raw_name: str) -> str:
        """Collapses multiple internal spaces and applies proper title casing."""
        # split() without args collapses all multiple spaces/tabs
        words = raw_name.split()
        return " ".join(words).title()

    @staticmethod
    def clean_email(raw_email: str) -> str:
        """Strips whitespace and converts email to canonical lowercase."""
        return raw_email.strip().lower()

    @staticmethod
    def clean_phone(raw_phone: str) -> str:
        """Removes all non-digit formatting characters."""
        cleaned = raw_phone.strip()
        for char in ["+91", "(", ")", "-", " "]:
            cleaned = cleaned.replace(char, "")
        # Keep standard 10-digit format if it starts with 0
        if cleaned.startswith("0") and len(cleaned) == 11:
            cleaned = cleaned[1:]
        return cleaned

    @staticmethod
    def clean_address(raw_address: str) -> str:
        """Standardizes street address components and pin code."""
        # Split by comma to clean each address part
        parts = [p.strip().title() for p in raw_address.split(",") if p.strip()]
        return ", ".join(parts)

    @classmethod
    def sanitize_record(cls, raw_line: str) -> Dict[str, Any]:
        """Parses and sanitizes a single pipe-delimited raw line."""
        fields = [f.strip() for f in raw_line.split("|")]
        
        cust_id = fields[0]
        full_name = cls.clean_name(fields[1])
        email = cls.clean_email(fields[2])
        phone = cls.clean_phone(fields[3])
        address = cls.clean_address(fields[4])

        # Extract email domain using partition()
        _, _, domain = email.partition("@")

        return {
            "id": cust_id,
            "name": full_name,
            "email": email,
            "domain": domain,
            "phone": phone,
            "address": address
        }


def run_pipeline():
    print("=" * 80)
    print("CODER & ACCOTAX - CUSTOMER DATA SANITIZATION PIPELINE")
    print("=" * 80)
    print(f"Processing {len(RAW_CUSTOMER_RECORDS)} dirty intake records...\n")

    cleaned_records = [CustomerDataSanitizer.sanitize_record(line) for line in RAW_CUSTOMER_RECORDS]

    # Display Clean Output Table
    header = f"{'ID':<5} | {'FULL NAME':<24} | {'PHONE':<12} | {'EMAIL':<30} | {'DOMAIN'}"
    print(header)
    print("-" * len(header))

    for rec in cleaned_records:
        print(f"{rec['id']:<5} | {rec['name']:<24} | {rec['phone']:<12} | {rec['email']:<30} | {rec['domain']}")

    print("-" * len(header))
    print("\n=== GENERATING CLEAN EXPORT CSV ===")
    csv_header = "ID,Name,Phone,Email,Domain,Address"
    csv_rows = [csv_header]

    for r in cleaned_records:
        # Wrap address in quotes to protect embedded commas
        row_str = f"{r['id']},{r['name']},{r['phone']},{r['email']},{r['domain']},\"{r['address']}\""
        csv_rows.append(row_str)

    clean_csv_output = "\n".join(csv_rows)
    print(clean_csv_output)


if __name__ == "__main__":
    run_pipeline()
