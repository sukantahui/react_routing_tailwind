"""
File: age_validation_basic.py
Module: 003_002_basic-exception-handling (Topic 6)
Description: Demonstrates capturing and inspecting exception objects using 'as e',
             extracting error args, logging stack trace details, and validating student admissions.
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import sys
import logging

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

class StudentAdmissionError(ValueError):
    """Custom exception class for student admission validation failures."""
    def __init__(self, message: str, student_name: str, given_age: int, min_required_age: int = 18):
        super().__init__(message)
        self.student_name = student_name
        self.given_age = given_age
        self.min_required_age = min_required_age


def validate_student_enrollment(name: str, age_str: str, course: str, fee: float) -> dict:
    """
    Validates student enrollment data, parsing age and inspecting exception objects.
    """
    print(f"\n--- Processing Admission for: {name} ---")
    
    # 1. Type and Parsing Validation
    try:
        age = int(age_str)
    except ValueError as e:
        print(f"❌ [Parsing Error] Invalid age input '{age_str}' for {name}.")
        print(f"   -> Exception Type: {type(e).__name__}")
        print(f"   -> Error Message (str(e)): {e}")
        print(f"   -> Error Args (e.args): {e.args}")
        return {"status": "FAILED", "reason": f"Type parsing error: {e}"}
    
    # 2. Domain Logic Validation
    try:
        if age < 18:
            raise StudentAdmissionError(
                f"Applicant {name} is {age} years old, which is below the minimum age of 18.",
                student_name=name,
                given_age=age,
                min_required_age=18
            )
        if fee < 5000:
            raise ValueError(f"Initial deposit ₹{fee:,} is below minimum registration fee ₹5,000.")
            
    except StudentAdmissionError as err:
        print(f"⚠️ [Eligibility Warning] {err}")
        print(f"   -> Student: {err.student_name}")
        print(f"   -> Age Given: {err.given_age} | Min Required: {err.min_required_age}")
        return {"status": "REJECTED_UNDERAGE", "student": err.student_name, "age": err.given_age}
        
    except ValueError as err:
        print(f"⚠️ [Financial Requirement Error] {err}")
        return {"status": "INSUFFICIENT_FEE", "student": name, "fee": fee}

    # 3. Successful Registration
    print(f"✅ [SUCCESS] {name} (Age: {age}) successfully enrolled in {course}!")
    print(f"   Registration Deposit: ₹{fee:,.2f}")
    return {
        "status": "ENROLLED",
        "student": name,
        "age": age,
        "course": course,
        "fee_paid": fee
    }


def main():
    print("=" * 65)
    print("Coder & AccoTax Barrackpore – Student Admission Validation Engine")
    print("=" * 65)
    
    test_applicants = [
        {"name": "Mamata", "age_str": "21", "course": "Python Pro", "fee": 15000.0},
        {"name": "Debangshu", "age_str": "twenty", "course": "Data Analytics", "fee": 18000.0},
        {"name": "Susmita", "age_str": "16", "course": "Full Stack Dev", "fee": 25000.0},
        {"name": "Mahima", "age_str": "23", "course": "Machine Learning", "fee": 2000.0},
        {"name": "Abhronila", "age_str": "22", "course": "Cloud Architecture", "fee": 20000.0},
    ]
    
    results = []
    for applicant in test_applicants:
        res = validate_student_enrollment(
            name=applicant["name"],
            age_str=applicant["age_str"],
            course=applicant["course"],
            fee=applicant["fee"]
        )
        results.append(res)
        
    print("\n" + "=" * 65)
    print("FINAL ADMISSION SUMMARY REPORT")
    print("=" * 65)
    for r in results:
        status_symbol = "✅" if r["status"] == "ENROLLED" else "❌"
        print(f"{status_symbol} {r}")


if __name__ == "__main__":
    main()
