"""
Module: 001_003_operators-and-expressions
Topic: Topic 6 - Evaluating Expressions (Step-by-Step Rules & Order of Evaluation)
File: institutional_financial_grade_evaluator.py
Teacher & Mentor: Sukanta Hui

Description:
Real-world multi-stage evaluation pipeline for calculating institutional scholarships,
tax deductibles, and academic grades across Kolkata and Barrackpore institutions.
"""

def evaluate_scholarship_and_tax(student_name, location, gross_marks, entrance_score, family_income):
    print("=" * 70)
    print(f"  INSTITUTIONAL EVALUATOR: {student_name.upper()} ({location.upper()})")
    print("=" * 70)

    # Stage 1: Normalize percentage and entrance percentile
    # Formula: (gross_marks / 500) * 100 + (entrance_score / 200) * 50
    composite_score = (gross_marks / 500) * 100 + (entrance_score / 200) * 50
    print(f"Step 1 [Composite Academic Index] : {composite_score:.2f} / 150.0")

    # Stage 2: Eligibility boolean logic
    # Merit threshold >= 125.0 OR (Composite >= 110.0 AND Income <= 2,50,000)
    is_merit_scholar = composite_score >= 125.0
    is_need_based = (composite_score >= 110.0) and (family_income <= 250000)
    final_award = is_merit_scholar or is_need_based

    print(f"Step 2 [Merit Criteria >= 125]     : {is_merit_scholar}")
    print(f"Step 3 [Need Criteria (>=110 & Low)]: {is_need_based}")
    print(f"Step 4 [Final Scholarship Status]   : {'AWARDED' if final_award else 'REJECTED'}")

    # Stage 3: Fee reduction expression
    # Base fee: 60,000; Reduction: 50% if merit else 30% if need_based else 0%
    base_fee = 60000.0
    discount_pct = 0.50 if is_merit_scholar else (0.30 if is_need_based else 0.0)
    payable_fee = base_fee - base_fee * discount_pct

    print(f"Step 5 [Base Annual Fee]            : ₹{base_fee:,.2f}")
    print(f"Step 6 [Scholarship Reduction]      : {discount_pct * 100:.0f}%")
    print(f"Step 7 [Final Payable Fee]          : ₹{payable_fee:,.2f}")
    print("=" * 70 + "\n")
    return payable_fee

if __name__ == "__main__":
    # Student 1: Mamata from Jadavpur
    evaluate_scholarship_and_tax("Mamata", "Jadavpur", gross_marks=470, entrance_score=185, family_income=450000)

    # Student 2: Debangshu from Barrackpore
    evaluate_scholarship_and_tax("Debangshu", "Barrackpore", gross_marks=420, entrance_score=150, family_income=220000)
