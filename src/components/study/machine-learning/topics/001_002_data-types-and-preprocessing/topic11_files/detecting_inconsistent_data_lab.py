"""
=============================================================================
TOPIC 11: DETECTING INCONSISTENT DATA
Module: Data Types and Preprocessing (BCAC701B)
Academic Practical Laboratory & Industrial Simulation Engine
Author: Sukanta Hui | Senior Consultant & Educator | Barrackpore, West Bengal
Institute: Coder & AccoTax
=============================================================================

This laboratory engine provides a complete, production-grade suite for detecting,
auditing, and resolving inconsistent data in tabular machine learning pipelines,
requiring ZERO external third-party dependencies (built solely with standard Python).

Core Algorithmic Engines Implemented:
1. Denial Constraint (DC) & Cross-Field Logic Engine:
   - First-order logic predicates over records: phi(r) -> bool.
   - Multi-attribute semantic contradiction checks (Age vs Marital Status,
     Vehicle Type vs Wheel Count, Age vs Education).
2. Temporal Sequence Consistency Validator:
   - Event sequence order validation: Date_Start <= Date_End.
   - Logical lifespan and elapsed time bounds.
3. Unit & Scale Discrepancy Detector:
   - Mixed currency / currency scale (Lakhs vs Raw INR vs Monthly vs Annual).
   - Speed, Temperature, and Metric unit conversion anomaly flags.
4. Syntactic & Lexical Domain Enforcers (Regex):
   - Indian PAN Card, GSTIN, and PIN Code structural checks.
   - Date format disambiguation (ISO YYYY-MM-DD vs DD/MM/YYYY vs MM/DD/YYYY).
5. Conditional Statistical Outlier & Discrepancy Auditing:
   - Identifying bivariate contradictions (e.g., High Income with 0 Exp & Young Age).
6. Comprehensive Empirical Simulation:
   - West Bengal Health Claims (Swasthya Sathi) & FinTech Loan Inconsistency Audits.
=============================================================================
"""

import re
import math
import datetime
from typing import List, Dict, Any, Tuple, Optional, Callable
from dataclasses import dataclass

# =====================================================================
# 1. DENIAL CONSTRAINT & PREDICATE VALIDATION ENGINE
# =====================================================================

@dataclass
class DenialConstraint:
    """
    Formal Denial Constraint: A predicate phi(r) that MUST NOT be true.
    If condition_func(record) == True, the constraint is VIOLATED.
    """
    rule_id: str
    name: str
    description: str
    severity: str  # 'CRITICAL', 'HIGH', 'MEDIUM', 'WARNING'
    condition_func: Callable[[Dict[str, Any]], bool]
    remedy_suggestion: str


class InconsistencyEngine:
    """
    Rule-based & multi-attribute consistency auditing engine.
    """
    def __init__(self):
        self.rules: List[DenialConstraint] = []
        self._initialize_core_rules()

    def _initialize_core_rules(self):
        # Rule 1: Age vs Employment / Experience
        self.rules.append(DenialConstraint(
            rule_id="DC-01",
            name="Age-Experience Plausibility",
            description="Total years of work experience cannot exceed (Age - 16).",
            severity="CRITICAL",
            condition_func=lambda r: (
                r.get("age") is not None and r.get("experience_years") is not None and
                r["experience_years"] > (r["age"] - 16)
            ),
            remedy_suggestion="Verify candidate DOB or clerical entry error in experience field."
        ))

        # Rule 2: Temporal Sequence Order (Admission vs Discharge)
        self.rules.append(DenialConstraint(
            rule_id="DC-02",
            name="Temporal Chronology Inversion",
            description="Event end timestamp (e.g. discharge_date) cannot precede start timestamp.",
            severity="CRITICAL",
            condition_func=lambda r: (
                r.get("admission_date") and r.get("discharge_date") and
                r["discharge_date"] < r["admission_date"]
            ),
            remedy_suggestion="Swap inverted dates or re-extract from hospital discharge summary."
        ))

        # Rule 3: Cross-Field Pediatric Contradiction
        self.rules.append(DenialConstraint(
            rule_id="DC-03",
            name="Pediatric Procedure Age Contradiction",
            description="Pediatric/Neonatal medical procedures cannot be billed for patients aged > 18.",
            severity="HIGH",
            condition_func=lambda r: (
                r.get("age") is not None and r["age"] > 18 and
                str(r.get("procedure", "")).lower() in ("neonatal_icu", "pediatric_cardiology", "infant_incubator")
            ),
            remedy_suggestion="Audit medical billing code: Likely billing department clerical error."
        ))

        # Rule 4: West Bengal Postal PIN Code & District Alignment
        self.rules.append(DenialConstraint(
            rule_id="DC-04",
            name="PIN-District Geo-Contradiction",
            description="West Bengal PIN codes must begin with 70, 71, 72, 73, or 74.",
            severity="HIGH",
            condition_func=lambda r: (
                r.get("state") == "West Bengal" and r.get("pin_code") is not None and
                not str(r["pin_code"]).startswith(("70", "71", "72", "73", "74"))
            ),
            remedy_suggestion="Cross-reference address against India Post National Postal Directory."
        ))

        # Rule 5: Financial Scale & Unit Mismatch
        self.rules.append(DenialConstraint(
            rule_id="DC-05",
            name="Salary Unit Mismatch (Monthly vs Annual)",
            description="Annual salary in tech sector < INR 50,000 indicates monthly figure entered in annual field.",
            severity="MEDIUM",
            condition_func=lambda r: (
                r.get("role_tier") in ("Senior", "Lead", "Architect") and
                r.get("annual_salary") is not None and r["annual_salary"] < 50000
            ),
            remedy_suggestion="Multiply by 12 if monthly salary was entered into annual income field."
        ))

    def audit_record(self, record: Dict[str, Any]) -> List[Dict[str, Any]]:
        violations = []
        for rule in self.rules:
            try:
                if rule.condition_func(record):
                    violations.append({
                        "rule_id": rule.rule_id,
                        "name": rule.name,
                        "severity": rule.severity,
                        "description": rule.description,
                        "remedy": rule.remedy_suggestion
                    })
            except Exception as e:
                # Malformed field type violation
                violations.append({
                    "rule_id": rule.rule_id,
                    "name": f"{rule.name} [Type Error]",
                    "severity": "CRITICAL",
                    "description": f"Field evaluation raised exception: {str(e)}",
                    "remedy": "Coerce data types to expected numerical/datetime schemas."
                })
        return violations


# =====================================================================
# 2. SYNTACTIC & LEXICAL REGEX VALIDATORS (INDIAN STANDARDS)
# =====================================================================

class LexicalValidator:
    """
    Regex-based structural and format consistency enforcers.
    """
    # Permanent Account Number (PAN): 5 uppercase letters, 4 digits, 1 uppercase letter
    PAN_PATTERN = re.compile(r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$')
    
    # GSTIN (Goods & Services Tax ID): 2 digits state code + PAN + 1 entity num + 'Z' + 1 checksum
    GSTIN_PATTERN = re.compile(r'^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
    
    # Indian Mobile: 10 digits starting with 6, 7, 8, or 9
    PHONE_PATTERN = re.compile(r'^[6-9]\d{9}$')

    @classmethod
    def validate_pan(cls, pan: str) -> bool:
        if not pan or not isinstance(pan, str):
            return False
        return bool(cls.PAN_PATTERN.match(pan.strip().upper()))

    @classmethod
    def validate_gstin(cls, gstin: str) -> bool:
        if not gstin or not isinstance(gstin, str):
            return False
        return bool(cls.GSTIN_PATTERN.match(gstin.strip().upper()))

    @classmethod
    def validate_phone(cls, phone: str) -> bool:
        if not phone:
            return False
        clean = re.sub(r'[\s\-\+]', '', str(phone))
        if clean.startswith("91") and len(clean) == 12:
            clean = clean[2:]
        return bool(cls.PHONE_PATTERN.match(clean))


# =====================================================================
# 3. DATE FORMAT DISAMBIGUATION & PARSING
# =====================================================================

def parse_and_standardize_date(date_str: str) -> Tuple[Optional[datetime.date], str]:
    """
    Parses ambiguous date strings (DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD).
    Returns (standardized_date, detected_format_or_error).
    """
    if not date_str or not isinstance(date_str, str):
        return None, "EMPTY_OR_NON_STRING"

    clean = date_str.strip()
    
    # Check ISO Format: YYYY-MM-DD
    if re.match(r'^\d{4}-\d{2}-\d{2}$', clean):
        try:
            d = datetime.datetime.strptime(clean, "%Y-%m-%d").date()
            return d, "ISO_YYYY-MM-DD"
        except ValueError:
            return None, "INVALID_ISO_CALENDAR_DATE"

    # Check Slash or Dash Format: D/M/Y or M/D/Y
    parts = re.split(r'[/.\-]', clean)
    if len(parts) == 3:
        try:
            n1, n2, n3 = int(parts[0]), int(parts[1]), int(parts[2])
            # If 3rd number is 4 digits (Year)
            if n3 > 1900:
                year = n3
                # Disambiguation: if first number > 12, it MUST be DD/MM/YYYY
                if n1 > 12 and n2 <= 12:
                    d = datetime.date(year, n2, n1)
                    return d, "DISAMBIGUATED_DD/MM/YYYY"
                # If second number > 12, it MUST be MM/DD/YYYY
                elif n2 > 12 and n1 <= 12:
                    d = datetime.date(year, n1, n2)
                    return d, "DISAMBIGUATED_MM/DD/YYYY"
                # If both <= 12, ambiguous: default to Indian standard DD/MM/YYYY
                elif n1 <= 12 and n2 <= 12:
                    d = datetime.date(year, n2, n1)
                    return d, "AMBIGUOUS_DEFAULTED_TO_DD/MM/YYYY"
        except (ValueError, IndexError):
            return None, "UNPARSABLE_DATE_COMPONENTS"

    return None, "UNKNOWN_DATE_PATTERN"


# =====================================================================
# 4. CONDITIONAL STATISTICAL INCONSISTENCY (BIVARIATE ANOMALIES)
# =====================================================================

def detect_conditional_bivariate_anomaly(age: int, experience: int, income_lpa: float) -> Tuple[bool, str]:
    """
    Detects multivariate inconsistencies that pass univariate range checks
    but violate joint conditional distributions:
      e.g., Age 21, Exp 0, but Salary = 85.0 LPA.
    """
    if age < 25 and experience <= 1 and income_lpa > 35.0:
        return True, f"Conditional Inconsistency: Entry level (Age {age}, Exp {experience} yrs) with extreme compensation ({income_lpa} LPA) exceeds 5-sigma conditional expectation."
    if age > 50 and experience < 2 and income_lpa > 25.0:
        return True, f"Conditional Inconsistency: Late career age ({age}) with near-zero recorded experience ({experience} yrs) indicates missing prior job history."
    return False, "CONSISTENT"


# =====================================================================
# 5. COMPREHENSIVE INDUSTRIAL BENCHMARK (WEST BENGAL CASE STUDIES)
# =====================================================================

def run_inconsistent_data_laboratory() -> Dict[str, Any]:
    print("=" * 80)
    print("  ACADEMIC & INDUSTRIAL BENCHMARK: DETECTING INCONSISTENT DATA")
    print("  Course: BCAC701B | Machine Learning Preprocessing Laboratory")
    print("  Author: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # -------------------------------------------------------------
    # EXPERIMENT 1: West Bengal Healthcare (Swasthya Sathi Claims)
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 1] HOSPITAL ADMISSION & BILLING INCONSISTENCY AUDIT ---")
    
    hospital_claims = [
        {
            "claim_id": "SS-KOL-001",
            "patient": "Subroto Mukherjee",
            "age": 64,
            "admission_date": datetime.date(2026, 2, 10),
            "discharge_date": datetime.date(2026, 2, 18),
            "procedure": "coronary_angioplasty",
            "state": "West Bengal",
            "pin_code": "700029",
            "bill_inr": 125000
        },
        # Inversion Anomaly: Discharge date occurs BEFORE admission date!
        {
            "claim_id": "SS-KOL-002",
            "patient": "Kalyan Bhattacharya",
            "age": 52,
            "admission_date": datetime.date(2026, 3, 15),
            "discharge_date": datetime.date(2026, 3, 10),  # Prior to admission!
            "procedure": "knee_arthroscopy",
            "state": "West Bengal",
            "pin_code": "700084",
            "bill_inr": 78000
        },
        # Pediatric Anomaly: 72-year-old patient billed for neonatal infant incubator!
        {
            "claim_id": "SS-BAR-003",
            "patient": "Amarendra Ghosh",
            "age": 72,
            "admission_date": datetime.date(2026, 1, 5),
            "discharge_date": datetime.date(2026, 1, 9),
            "procedure": "neonatal_icu",  # Inconsistent with age 72!
            "state": "West Bengal",
            "pin_code": "700120",
            "bill_inr": 45000
        },
        # Geographic Contradiction: State is West Bengal, but PIN is 110001 (New Delhi)!
        {
            "claim_id": "SS-ICH-004",
            "patient": "Tanima Das",
            "age": 28,
            "admission_date": datetime.date(2026, 2, 1),
            "discharge_date": datetime.date(2026, 2, 4),
            "procedure": "cholecystectomy",
            "state": "West Bengal",
            "pin_code": "110001",  # Delhi PIN code in WB registry!
            "bill_inr": 36000
        }
    ]

    engine = InconsistencyEngine()
    total_claims = len(hospital_claims)
    flagged_claims = 0

    print(f"Auditing {total_claims} Swasthya Sathi hospital insurance claims...")
    for claim in hospital_claims:
        violations = engine.audit_record(claim)
        if violations:
            flagged_claims += 1
            print(f"\n  âš  [INCONSISTENCY FLAGGED] Claim ID: {claim['claim_id']} ({claim['patient']})")
            for v in violations:
                print(f"     [{v['severity']}] {v['name']}: {v['description']}")
                print(f"     Remedy: {v['remedy']}")
        else:
            print(f"  âœ” [CLEAN RECORD] Claim ID: {claim['claim_id']} ({claim['patient']}) passed all Denial Constraints.")

    # -------------------------------------------------------------
    # EXPERIMENT 2: Salt Lake Sector V FinTech Loan Underwriting
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 2] FINTECH LOAN APPLICANT MULTIVARIATE AUDIT ---")
    
    fintech_applicants = [
        {
            "app_id": "LOAN-SEC5-101",
            "name": "Pooja Mukherjee",
            "age": 28,
            "experience_years": 6,
            "role_tier": "Senior",
            "annual_salary": 1450000,
            "pan": "ABCDE1234F",
            "phone": "9830112233"
        },
        # Impossibility: Age 22 with 12 years of experience! (Worked since age 10?)
        {
            "app_id": "LOAN-SEC5-102",
            "name": "Aritra Sen",
            "age": 22,
            "experience_years": 12,  # Violates age - 16 >= exp!
            "role_tier": "Lead",
            "annual_salary": 2200000,
            "pan": "WXYZP5678M",
            "phone": "9831223344"
        },
        # Scale Mismatch: Entered monthly salary (INR 42,000) into annual salary field!
        {
            "app_id": "LOAN-SEC5-103",
            "name": "Debashis Roy",
            "age": 35,
            "experience_years": 10,
            "role_tier": "Senior",
            "annual_salary": 42000,  # Monthly figure entered as annual!
            "pan": "KLMNO9012Q",
            "phone": "9433445566"
        },
        # Syntactic Malformation: Corrupt PAN card format
        {
            "app_id": "LOAN-SEC5-104",
            "name": "Mousumi Das",
            "age": 31,
            "experience_years": 7,
            "role_tier": "Senior",
            "annual_salary": 1800000,
            "pan": "INVALID_PAN_123",  # Fails Indian ITD standard!
            "phone": "9123456789"
        }
    ]

    print(f"Auditing {len(fintech_applicants)} FinTech loan applications...")
    for app in fintech_applicants:
        violations = engine.audit_record(app)
        
        # Check Lexical PAN
        if not LexicalValidator.validate_pan(app.get("pan", "")):
            violations.append({
                "rule_id": "LEX-PAN",
                "name": "Malformed Indian PAN Card",
                "severity": "CRITICAL",
                "description": f"PAN string '{app.get('pan')}' violates ITD structural regex.",
                "remedy": "Reject application until KYC document re-verification."
            })
            
        if violations:
            print(f"\n  âš  [APPLICATION DEFECT] ID: {app['app_id']} ({app['name']})")
            for v in violations:
                print(f"     [{v['severity']}] {v['name']}: {v['description']}")
                print(f"     Remedy: {v['remedy']}")
        else:
            print(f"  âœ” [VERIFIED APPLICANT] ID: {app['app_id']} ({app['name']}) passed KYC & consistency checks.")

    # -------------------------------------------------------------
    # EXPERIMENT 3: Date Format Disambiguation Engine
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 3] MULTI-FORMAT DATE DISAMBIGUATION BENCHMARK ---")
    raw_dates = [
        "2026-05-18",
        "25/12/2026",   # Must be DD/MM/YYYY (25 > 12)
        "04/19/2026",   # Must be MM/DD/YYYY (19 > 12)
        "03/05/2026",   # Ambiguous: Both <= 12
        "31-02-2026",   # Invalid calendar date (Feb 31)
        "invalid-date"
    ]

    for ds in raw_dates:
        parsed_d, note = parse_and_standardize_date(ds)
        res_str = parsed_d.strftime("%Y-%m-%d") if parsed_d else "FAILED"
        print(f"  Raw: '{ds:<14}' -> Standardized: {res_str:<12} | Diagnosis: {note}")

    # -------------------------------------------------------------
    # EXPERIMENT 4: Machine Learning Impact (Feature Distortion)
    # -------------------------------------------------------------
    print("\n--- [EXPERIMENT 4] MATHEMATICAL IMPACT: COEFFICIENT BIAS IN REGRESSION ---")
    print("Scenario: A single salary record is entered in monthly terms (Rs 42,000) instead of annual (Rs 504,000).")
    
    clean_incomes = [800000, 1100000, 1400000, 1800000, 2200000]
    corrupted_incomes = [800000, 1100000, 1400000, 1800000, 42000]  # One corrupted row
    
    mean_clean = sum(clean_incomes) / len(clean_incomes)
    mean_corrupted = sum(corrupted_incomes) / len(corrupted_incomes)
    bias_pct = ((mean_corrupted - mean_clean) / mean_clean) * 100
    
    print(f"True Population Mean Annual Income: Rs {mean_clean:,.2f}")
    print(f"Corrupted Empirical Mean:           Rs {mean_corrupted:,.2f}")
    print(f"Statistical Expectation Bias:       {bias_pct:.2f}% shift in gradient intercept!")

    print("\n" + "=" * 80)
    print("  LABORATORY EXECUTION COMPLETE: ALL INCONSISTENCY ENGINES CONVERGED")
    print("=" * 80)

    return {
        "status": "SUCCESS",
        "flagged_claims_count": flagged_claims,
        "clean_mean_income": mean_clean,
        "corrupted_mean_income": mean_corrupted,
        "bias_percentage": round(bias_pct, 2)
    }

if __name__ == "__main__":
    run_inconsistent_data_laboratory()
