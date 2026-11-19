"""
=============================================================================
TOPIC 7: DATA CLEANING & RECTIFICATION PIPELINE
Module: Data Types and Preprocessing (Slug: 001_002_data-types-and-preprocessing)
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B - MAKAUT Aligned)
=============================================================================

This simulation demonstrates:
1. Systematic Data Cleaning & Sanitization Engine:
   - Hidden Sentinel Null Detection (-999, 9999, 'N/A', '?', '#NULL!')
   - Exact & Fuzzy Near-Duplicate Entity Resolution (Levenshtein / SequenceMatcher)
   - Text Normalization & Canonical String Mapping (Address & City standardization)
   - Domain Constraint & Logical Integrity Verification (e.g. Age vs Experience)
2. Quantitative Cleanliness Auditing:
   - Dirty-to-Clean Data Quality Scoring (Completeness, Validity, Uniqueness)
   - Lineage Tracking & Modification Logging
3. Tested on realistic West Bengal Municipal & Public Sector Records:
   - Kolkata Municipal Corporation (KMC) Property Tax & Civic Registry
   - North 24 Parganas District Healthcare Patient Roster
=============================================================================
"""

import re
import difflib
from typing import List, Dict, Any, Tuple, Optional, Set

# =============================================================================
# 1. REALISTIC CORRUPTED CITIZEN & PROPERTY DATASET
# =============================================================================

def get_raw_kmc_citizen_dataset() -> List[Dict[str, Any]]:
    """
    Returns an enterprise dataset containing realistic real-world defects:
    - Sentinel values (-999, 9999, 'N/A', '?')
    - Inconsistent casing and whitespace ('  Kolkata ', 'BARRACKPORE', 'calcutta')
    - Near-duplicate records (Fuzzy matches in citizen name and street address)
    - Logical contradictions (Age=8 with 12 years of employment; Negative tax dues)
    - Inconsistent date formats ('1990-05-12' vs '12/05/1990')
    """
    return [
        {
            "record_id": "KMC-2024-001",
            "citizen_name": "Sukanta Hui",
            "ward_number": 12,
            "locality": "  Barrackpore  ",
            "age": 42,
            "years_employed": 18,
            "annual_property_tax_inr": 14500.0,
            "tax_payment_status": "Paid",
            "phone_contact": "+91-9432456083"
        },
        {
            "record_id": "KMC-2024-002",
            "citizen_name": "S. Hui",                  # FUZZY NEAR-DUPLICATE of Record 001
            "ward_number": 12,
            "locality": "barrackpore",                # INCONSISTENT CASING
            "age": 42,
            "years_employed": 18,
            "annual_property_tax_inr": 14500.0,
            "tax_payment_status": "PAID",
            "phone_contact": "9432456083"             # MISSING COUNTRY CODE
        },
        {
            "record_id": "KMC-2024-003",
            "citizen_name": "Anirban Banerjee",
            "ward_number": "WARD-08",                 # NON-STANDARD TYPE (STRING)
            "locality": "Salt Lake Sector V",
            "age": -999,                              # HIDDEN SENTINEL VALUE FOR MISSING
            "years_employed": 7,
            "annual_property_tax_inr": 28400.0,
            "tax_payment_status": "Pending",
            "phone_contact": "9830112233"
        },
        {
            "record_id": "KMC-2024-004",
            "citizen_name": "Debjani Chakraborty",
            "ward_number": 45,
            "locality": "Calcutta",                   # ARCHAIC CITY VARIANT
            "age": 9,                                 # LOGICAL ANOMALY: AGE 9
            "years_employed": 15,                     # WITH 15 YEARS EXPERIENCE!
            "annual_property_tax_inr": -500.0,        # IMPOSSIBLE NEGATIVE TAX
            "tax_payment_status": "N/A",              # TEXT SENTINEL FOR MISSING
            "phone_contact": "Unknown"
        },
        {
            "record_id": "KMC-2024-005",
            "citizen_name": "Anirban Banerjee",       # EXACT DUPLICATE OF 003
            "ward_number": 8,
            "locality": "Salt Lake Sector V",
            "age": 34,
            "years_employed": 7,
            "annual_property_tax_inr": 28400.0,
            "tax_payment_status": "Pending",
            "phone_contact": "9830112233"
        },
        {
            "record_id": "KMC-2024-006",
            "citizen_name": "Subhasis Roy",
            "ward_number": 62,
            "locality": "Howrah",
            "age": 55,
            "years_employed": 25,
            "annual_property_tax_inr": 999999.0,      # EXTREME SENSOR / INPUT GLITCH
            "tax_payment_status": "Overdue",
            "phone_contact": "+91-9874561230"
        },
        {
            "record_id": "KMC-2024-007",
            "citizen_name": "Priyanka Sen",
            "ward_number": 19,
            "locality": "Bidhannagar",
            "age": 29,
            "years_employed": 4,
            "annual_property_tax_inr": 12000.0,
            "tax_payment_status": "Paid",
            "phone_contact": "+91-9123456789"
        }
    ]


# =============================================================================
# 2. STAGE 1: SENTINEL DETECTION & NULL STANDARDIZATION
# =============================================================================

class SentinelSanitizer:
    """
    Detects and replaces hidden sentinel values (e.g. -999, 9999, 'N/A', '?', 'null')
    with standard Python None, allowing downstream imputers to function accurately.
    """
    NUMERIC_SENTINELS = {-999, -9999, 9999, 99999, 999999, -1}
    STRING_SENTINELS = {
        "n/a", "na", "null", "none", "?", "-", "--", "unknown", "missing", "undefined", "#null!"
    }

    def __init__(self):
        self.total_sentinels_cleaned = 0

    def clean_record(self, record: Dict[str, Any]) -> Dict[str, Any]:
        cleaned = {}
        for key, val in record.items():
            if val is None:
                cleaned[key] = None
                continue

            # Check numeric sentinels
            if isinstance(val, (int, float)) and val in self.NUMERIC_SENTINELS:
                cleaned[key] = None
                self.total_sentinels_cleaned += 1
                continue

            # Check string sentinels
            if isinstance(val, str):
                s_strip = val.strip().lower()
                if s_strip in self.STRING_SENTINELS or s_strip == "":
                    cleaned[key] = None
                    self.total_sentinels_cleaned += 1
                    continue

            cleaned[key] = val
        return cleaned


# =============================================================================
# 3. STAGE 2: TEXT CANONICALIZER & NORMALIZER
# =============================================================================

class TextCanonicalizer:
    """
    Standardizes inconsistent formatting, resolves archaic regional synonyms
    (e.g., 'Calcutta' -> 'Kolkata'), strips irregular whitespace, and normalizes phone numbers.
    """
    SYNONYM_DICTIONARY = {
        "calcutta": "Kolkata",
        "kol": "Kolkata",
        "barrackpore": "Barrackpore",
        "bkp": "Barrackpore",
        "bidhannagar": "Bidhannagar",
        "salt lake": "Salt Lake Sector V",
        "saltlake": "Salt Lake Sector V",
        "howrah": "Howrah",
        "hwh": "Howrah"
    }

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        # Remove superfluous interior whitespace and trim edges
        cleaned = re.sub(r"\s+", " ", str(text).strip())
        return cleaned

    def canonicalize_locality(self, locality: Optional[str]) -> str:
        if not locality:
            return "Unknown Locality"
        cleaned = self.clean_text(locality)
        lower = cleaned.lower()
        for pattern, replacement in self.SYNONYM_DICTIONARY.items():
            if pattern in lower:
                return replacement
        return cleaned.title()

    def standardize_phone(self, phone: Optional[str]) -> Optional[str]:
        if not phone:
            return None
        # Extract digits only
        digits = re.sub(r"\D", "", str(phone))
        if len(digits) == 10:
            return f"+91-{digits}"
        elif len(digits) == 12 and digits.startswith("91"):
            return f"+91-{digits[2:]}"
        return phone.strip()


# =============================================================================
# 4. STAGE 3: LOGICAL CONSTRAINT & DOMAIN INTEGRITY CHECKER
# =============================================================================

class ConstraintValidator:
    """
    Enforces business domain rules and cross-field logic:
    1. Age Constraint: 18 <= Age <= 100
    2. Tax Amount Constraint: Annual Tax >= 0
    3. Cross-Field Logic: Years Employed <= (Age - 16)
    """
    def __init__(self):
        self.validation_errors: List[Dict[str, Any]] = []

    def validate_and_correct(self, record: Dict[str, Any]) -> Dict[str, Any]:
        corrected = dict(record)
        rec_id = record.get("record_id", "Unknown")

        # 1. Clean Ward Number
        ward_raw = record.get("ward_number")
        if isinstance(ward_raw, str):
            digits = re.findall(r"\d+", ward_raw)
            corrected["ward_number"] = int(digits[0]) if digits else 1

        # 2. Check Age & Experience
        age = corrected.get("age")
        exp = corrected.get("years_employed")

        if age is not None:
            if age < 18 or age > 110:
                self.validation_errors.append({
                    "record_id": rec_id,
                    "field": "age",
                    "reason": f"Age {age} violates biological range [18, 110]."
                })
                corrected["age"] = None  # Flag for imputation

        if age is not None and exp is not None:
            if exp > (age - 16):
                self.validation_errors.append({
                    "record_id": rec_id,
                    "field": "years_employed",
                    "reason": f"Experience {exp} exceeds logical maximum for Age {age}."
                })
                # Auto-rectify: cap experience to (age - 18) if plausible, else mark None
                corrected["years_employed"] = max(0, age - 18)

        # 3. Check Tax Amount
        tax = corrected.get("annual_property_tax_inr")
        if tax is not None:
            if tax < 0:
                self.validation_errors.append({
                    "record_id": rec_id,
                    "field": "annual_property_tax_inr",
                    "reason": f"Tax amount {tax} cannot be negative."
                })
                corrected["annual_property_tax_inr"] = abs(tax)  # Assume sign slip
            elif tax > 200000.0:
                self.validation_errors.append({
                    "record_id": rec_id,
                    "field": "annual_property_tax_inr",
                    "reason": f"Tax amount {tax} exceeds municipal cap (outlier glitch)."
                })
                corrected["annual_property_tax_inr"] = 28400.0  # Cap or impute

        return corrected


# =============================================================================
# 5. STAGE 4: EXACT & FUZZY DEDUPLICATOR
# =============================================================================

class FuzzyDeduplicator:
    """
    Detects both exact primary duplicates and fuzzy near-duplicates based on
    string similarity of (Name, Locality, Phone) using Levenshtein ratio.
    """
    def __init__(self, similarity_threshold: float = 0.82):
        self.threshold = similarity_threshold
        self.purged_duplicates: List[Tuple[str, str, float]] = []

    def string_similarity(self, s1: str, s2: str) -> float:
        return difflib.SequenceMatcher(None, s1.lower(), s2.lower()).ratio()

    def deduplicate(self, records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        unique_records = []
        seen_phones = set()

        for current in records:
            phone = current.get("phone_contact")
            name = current.get("citizen_name", "")
            loc = current.get("locality", "")

            # Exact phone collision check
            if phone and phone in seen_phones:
                self.purged_duplicates.append((current["record_id"], "Phone Collision", 1.0))
                continue

            # Fuzzy name & locality check against accepted records
            is_fuzzy_duplicate = False
            for accepted in unique_records:
                sim_name = self.string_similarity(name, accepted.get("citizen_name", ""))
                sim_loc = self.string_similarity(loc, accepted.get("locality", ""))
                composite_sim = 0.7 * sim_name + 0.3 * sim_loc

                if composite_sim >= self.threshold:
                    self.purged_duplicates.append(
                        (current["record_id"], f"Fuzzy match with {accepted['record_id']}", round(composite_sim, 2))
                    )
                    is_fuzzy_duplicate = True
                    break

            if not is_fuzzy_duplicate:
                unique_records.append(current)
                if phone:
                    seen_phones.add(phone)

        return unique_records


# =============================================================================
# 6. STAGE 5: COMPOSITE CLEANING PIPELINE & AUDIT ENGINE
# =============================================================================

class EndToEndDataCleaningPipeline:
    """
    Chains all data cleaning components and generates a quantitative Data Quality Audit.
    """
    def __init__(self):
        self.sentinel_sanitizer = SentinelSanitizer()
        self.text_canonicalizer = TextCanonicalizer()
        self.constraint_validator = ConstraintValidator()
        self.fuzzy_deduplicator = FuzzyDeduplicator(similarity_threshold=0.80)

    def execute_pipeline(self, raw_data: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
        initial_count = len(raw_data)
        
        # Step 1: Sentinel Sanitization
        sanitized_records = [self.sentinel_sanitizer.clean_record(r) for r in raw_data]

        # Step 2: Text Canonicalization
        canonical_records = []
        for r in sanitized_records:
            row = dict(r)
            row["citizen_name"] = self.text_canonicalizer.clean_text(row.get("citizen_name", ""))
            row["locality"] = self.text_canonicalizer.canonicalize_locality(row.get("locality"))
            row["phone_contact"] = self.text_canonicalizer.standardize_phone(row.get("phone_contact"))
            row["tax_payment_status"] = str(row.get("tax_payment_status") or "Pending").title()
            canonical_records.append(row)

        # Step 3: Domain Constraint & Cross-Field Validation
        validated_records = [self.constraint_validator.validate_and_correct(r) for r in canonical_records]

        # Step 4: Fuzzy & Exact Deduplication
        cleaned_records = self.fuzzy_deduplicator.deduplicate(validated_records)

        # Compute Cleanliness Metrics
        final_count = len(cleaned_records)
        duplicates_removed = len(self.fuzzy_deduplicator.purged_duplicates)
        rule_violations = len(self.constraint_validator.validation_errors)
        sentinels_fixed = self.sentinel_sanitizer.total_sentinels_cleaned

        # Health score: 100 - penalties
        penalty = (duplicates_removed * 15) + (rule_violations * 10) + (sentinels_fixed * 5)
        cleanliness_score = max(20, min(100, 100 - penalty))

        audit_report = {
            "initial_records": initial_count,
            "final_clean_records": final_count,
            "duplicates_purged": duplicates_removed,
            "rule_violations_fixed": rule_violations,
            "sentinels_standardized": sentinels_fixed,
            "cleanliness_score": cleanliness_score,
            "purged_details": self.fuzzy_deduplicator.purged_duplicates,
            "violation_details": self.constraint_validator.validation_errors
        }

        return cleaned_records, audit_report


# =============================================================================
# 7. DEMONSTRATION & VERIFICATION DRIVER
# =============================================================================

def run_topic7_data_cleaning_lab():
    print("=" * 80)
    print("TOPIC 7: DATA CLEANING & RECTIFICATION PIPELINE - LABORATORY SIMULATION")
    print("Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal")
    print("Course: BCAC701B - Introduction to Machine Learning")
    print("=" * 80)

    # 1. Ingest Raw Dataset
    raw_records = get_raw_kmc_citizen_dataset()
    print(f"\n[STEP 1] Ingested Raw Dataset: {len(raw_records)} records with realistic defects.")
    print("\nSample Dirty Records:")
    print(f"  Record 001: {raw_records[0]}")
    print(f"  Record 002: {raw_records[1]} (Fuzzy near-duplicate of 001)")
    print(f"  Record 004: {raw_records[3]} (Age 9 with 15 yrs experience & negative tax!)")

    # 2. Execute Data Cleaning Pipeline
    pipeline = EndToEndDataCleaningPipeline()
    clean_records, audit = pipeline.execute_pipeline(raw_records)

    # 3. Present Audit Report
    print("\n" + "=" * 80)
    print("DATA QUALITY AUDIT & RECTIFICATION REPORT")
    print("=" * 80)
    print(f"  Initial Records Ingested:    {audit['initial_records']}")
    print(f"  Final Clean Records:         {audit['final_clean_records']}")
    print(f"  Duplicates Purged:           {audit['duplicates_purged']}")
    print(f"  Logical Violations Fixed:    {audit['rule_violations_fixed']}")
    print(f"  Hidden Sentinels Replaced:   {audit['sentinels_standardized']}")
    print(f"  Overall Cleanliness Score:   {audit['cleanliness_score']} / 100")

    print("\n[PURGED DUPLICATES LOG]")
    for rec_id, reason, sim in audit["purged_details"]:
        print(f"  • {rec_id:15s}: {reason} (Confidence: {sim})")

    print("\n[LOGICAL RECTIFICATION LOG]")
    for err in audit["violation_details"]:
        print(f"  • {err['record_id']} [{err['field']}]: {err['reason']}")

    # 4. Display Final Clean Dataset
    print("\n" + "=" * 80)
    print("FINAL SANITIZED & CANONICAL DATASET")
    print("=" * 80)
    for idx, r in enumerate(clean_records):
        tax_str = f"Rs {r['annual_property_tax_inr']:8.1f}" if r.get('annual_property_tax_inr') is not None else "Rs      N/A"
        phone_str = r.get('phone_contact') or "No Phone Provided"
        print(f"  [{idx+1}] {r['citizen_name']:22s} | Ward {r['ward_number']:2d} | Loc: {r['locality']:22s} | Age: {str(r['age']):4s} | Exp: {str(r['years_employed']):2s} yrs | Tax: {tax_str} | Phone: {phone_str}")

    print("\n" + "=" * 80)
    print("DATA CLEANING SIMULATION COMPLETED CLEANLY WITH ZERO RUNTIME ERRORS")
    print("=" * 80)

if __name__ == "__main__":
    run_topic7_data_cleaning_lab()
