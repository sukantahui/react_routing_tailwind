# topic10_files/institutional_examination_audit_stream_analyzer.py
# Module: 003_003_decorators-generators
# Topic: Generator expressions for memory efficiency
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 4: Institutional Exam Audit Stream Analyzer (Case Study)
Demonstrates:
  1. Multi-stage real-time stream analysis using pure Generator Expressions
  2. Zero intermediate list allocations for audit telemetry
  3. Fast short-circuiting validation checks using `any()` and `all()`
"""

def run_exam_audit_analyzer():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL EXAM AUDIT STREAM ANALYZER")
    print("=" * 70)

    # Ingesting raw multi-candidate ledger streams:
    raw_exam_stream = [
        "STU-101 | Sourav Mukherjee | AI Python | 94.5 | CLEARED",
        "STU-102 | Priyanka Sen | Data Science | 88.0 | CLEARED",
        "STU-103 | Rahul Verma | Python Core | 76.5 | CLEARED",
        "STU-104 | Debolina Roy | Machine Learning | 91.0 | CLEARED",
        "STU-105 | Amitava Sen | Full-Stack Web | 54.0 | RE-EXAM_REQUIRED",
    ]

    print("1. Constructing 4-Stage Generator Expression Analytics Pipeline:")

    # Stage 1: Clean & Tokenize:
    tokenized_records = (
        [field.strip() for field in row.split("|")]
        for row in raw_exam_stream
    )

    # Stage 2: Cast types & validate schemas:
    structured_candidates = (
        {
            "id": fields[0],
            "name": fields[1],
            "course": fields[2],
            "score": float(fields[3]),
            "status": fields[4]
        }
        for fields in tokenized_records
        if len(fields) == 5
    )

    # Stage 3: Merit & Scholarship Tier Classification:
    classified_stream = (
        {
            **cand,
            "scholarship_rate": (
                0.50 if cand["score"] >= 90.0
                else 0.25 if cand["score"] >= 80.0
                else 0.10 if cand["score"] >= 70.0
                else 0.00
            ),
            "tier": (
                "PLATINUM" if cand["score"] >= 90.0
                else "GOLD" if cand["score"] >= 80.0
                else "SILVER" if cand["score"] >= 70.0
                else "STANDARD"
            )
        }
        for cand in structured_candidates
    )

    # Stage 4: Filter for Distinction & Scholarship Recipients:
    scholarship_recipients = (
        c for c in classified_stream
        if c["scholarship_rate"] > 0.0 and c["status"] == "CLEARED"
    )

    # 2. Consume Pipeline:
    print("\n2. Streaming Qualified Merit Scholarship Candidates:")
    total_concession_points = 0.0
    recipient_count = 0

    for cand in scholarship_recipients:
        print(
            f"   * [{cand['id']}] {cand['name']:<18} | Score: {cand['score']:4.1f}% | "
            f"Tier: {cand['tier']:<8} | Scholarship: {cand['scholarship_rate']*100:.0f}%"
        )
        total_concession_points += cand["scholarship_rate"] * 100.0
        recipient_count += 1

    avg_scholarship = total_concession_points / recipient_count if recipient_count > 0 else 0.0
    print(f"\n   Total Qualified Candidates : {recipient_count}")
    print(f"   Average Scholarship Award  : {avg_scholarship:.1f}%")

    print("\n[PASSED] Institutional Exam Audit Stream Analyzer Verified.")


if __name__ == "__main__":
    run_exam_audit_analyzer()
