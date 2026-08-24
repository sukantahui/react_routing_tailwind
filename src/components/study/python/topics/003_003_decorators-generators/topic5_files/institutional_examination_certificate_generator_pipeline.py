# topic5_files/institutional_examination_certificate_generator_pipeline.py
# Module: 003_003_decorators-generators
# Topic: Chaining multiple decorators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 4: Institutional Degree Certificate Pipeline (Case Study)
Demonstrates:
  1. Multi-layered interceptor pipeline chaining 4 production decorators
  2. Input verification, digital signing, audit hash generation, and latency profiling
  3. Clean separation of concerns across layered middleware wrappers
"""

import functools
import time
import hashlib
from typing import Dict, Any

# 1. Academic Clearance Guard (Layer 1: Outermost)
def verify_academic_clearance(func):
    @functools.wraps(func)
    def wrapper(student_id: str, student_name: str, has_paid_dues: bool, score_pct: float, *args, **kwargs):
        if not has_paid_dues:
            raise PermissionError(f"[CLEARANCE FAILED] Outstanding tuition balance pending for {student_name} ({student_id})!")
        if score_pct < 60.0:
            raise ValueError(f"[ACADEMIC FAILED] Passing score threshold is 60.0%. Candidate achieved {score_pct:.1f}%!")
        print("  [LAYER 1: SECURITY] Student academic & financial clearance verified.")
        return func(student_id, student_name, has_paid_dues, score_pct, *args, **kwargs)
    return wrapper


# 2. Digital Watermark & QR Signature (Layer 2)
def apply_digital_signature(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("  [LAYER 2: SIGNATURE] Attaching cryptographic institutional digital seal...")
        result = func(*args, **kwargs)
        result["digital_signature"] = f"SEAL-CA-2026-{result['certificate_id'][:8]}"
        return result
    return wrapper


# 3. Blockchain Audit Ledger Hash (Layer 3)
def record_blockchain_audit_hash(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        payload = f"{result['student_id']}-{result['certificate_id']}-{result['grade']}"
        tx_hash = hashlib.sha256(payload.encode()).hexdigest()[:16]
        result["blockchain_tx_hash"] = f"0x{tx_hash}"
        print(f"  [LAYER 3: BLOCKCHAIN] Registered audit transaction hash: {result['blockchain_tx_hash']}")
        return result
    return wrapper


# 4. Latency Profiler (Layer 4: Innermost)
def measure_generation_latency(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed_us = (time.perf_counter() - t0) * 1_000_000.0
        print(f"  [LAYER 4: TELEMETRY] Core diploma generation completed in {elapsed_us:.2f} us")
        return result
    return wrapper


# =====================================================================
# STACKED PRODUCTION DIPLOMA GENERATOR SERVICE
# =====================================================================
@verify_academic_clearance
@apply_digital_signature
@record_blockchain_audit_hash
@measure_generation_latency
def issue_certified_diploma(student_id: str, student_name: str, has_paid_dues: bool, score_pct: float) -> Dict[str, Any]:
    """Core diploma credential compilation service."""
    grade = "DISTINCTION" if score_pct >= 85 else "FIRST_CLASS"
    return {
        "certificate_id": f"DIPLOMA-{student_id}-2026",
        "student_id": student_id,
        "student_name": student_name,
        "grade": grade,
        "status": "OFFICIALLY_ISSUED"
    }


def run_certificate_pipeline_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - DIPLOMA GENERATION INTERCEPTOR PIPELINE")
    print("=" * 70)

    # 1. Successful Certificate Generation (Distinction Candidate):
    print("1. Processing Distinction Candidate (Sourav Mukherjee):")
    diploma1 = issue_certified_diploma(
        student_id="STU-101",
        student_name="Sourav Mukherjee",
        has_paid_dues=True,
        score_pct=92.5
    )
    print(f"\n   Issued Certificate Record:\n   {diploma1}\n")

    # 2. Blocked by Clearance Guard (Outstanding Dues):
    print("2. Attempting Generation for Student with Unpaid Dues:")
    try:
        issue_certified_diploma(
            student_id="STU-102",
            student_name="Priyanka Sen",
            has_paid_dues=False,
            score_pct=88.0
        )
    except PermissionError as err:
        print(f"   [BLOCKED BY LAYER 1 GUARD] {err}\n")

    # 3. Blocked by Academic Guard (Failing Score):
    print("3. Attempting Generation for Student with Sub-60% Score:")
    try:
        issue_certified_diploma(
            student_id="STU-103",
            student_name="Rahul Verma",
            has_paid_dues=True,
            score_pct=52.0
        )
    except ValueError as err:
        print(f"   [BLOCKED BY LAYER 1 GUARD] {err}")

    print("\n[PASSED] Institutional Diploma Interceptor Pipeline Verified.")


if __name__ == "__main__":
    run_certificate_pipeline_demo()
