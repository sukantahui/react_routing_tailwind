# topic2_files/automated_system_audit_and_lottery.py
# Module: 002_009_modules-packages
# Topic: Built-in standard library modules: math, random, datetime, sys, os
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Integrated System Environment Audit & Scholarship Lottery Suite
Demonstrates:
  1. Integrating all 5 core standard library modules (math, random, datetime, sys, os)
  2. System health, memory footprint, and environment diagnostic
  3. Verifiable scholarship lottery selector using pseudo-random seeding
  4. Enterprise report generation with date math and path safety
"""

import sys
import os
import math
import random
import datetime as dt
from typing import Dict, Any, List

class EnterpriseDiagnosticSuite:
    """Integrated system diagnostic and student event manager."""

    @classmethod
    def audit_environment(cls) -> Dict[str, Any]:
        """Audits Python runtime, memory, and OS parameters."""
        return {
            "python_version": sys.version.split()[0],
            "platform": sys.platform,
            "cwd": os.getcwd(),
            "user": os.environ.get("USERNAME", os.environ.get("USER", "SystemUser")),
            "audit_timestamp": dt.datetime.now(),
            "next_scheduled_audit": dt.datetime.now() + dt.timedelta(days=7),
        }

    @classmethod
    def conduct_scholarship_lottery(
        cls,
        candidates: List[Dict[str, Any]],
        winners_count: int = 2,
        seed: int = 2026
    ) -> List[Dict[str, Any]]:
        """Conducts a verifiable, reproducible scholarship draw."""
        # Seeding guarantees the lottery can be independently verified and audited
        random.seed(seed)
        
        # Select winners
        selected = random.sample(candidates, k=min(winners_count, len(candidates)))
        
        # Calculate scholarship amounts using math
        results = []
        for winner in selected:
            original_fee = winner["fee"]
            # 25% discount rounded up to nearest integer
            discount = math.ceil(original_fee * 0.25)
            net_fee = original_fee - discount
            results.append({
                "student_id": winner["id"],
                "name": winner["name"],
                "course": winner["course"],
                "original_fee": original_fee,
                "scholarship_discount": discount,
                "net_fee_payable": net_fee
            })
        return results


def run_enterprise_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - INTEGRATED ENVIRONMENT AUDIT & LOTTERY ENGINE")
    print("=" * 75)

    # 1. System Environment Audit
    audit = EnterpriseDiagnosticSuite.audit_environment()
    print("\n--- 1. SYSTEM ENVIRONMENT DIAGNOSTIC ---")
    print(f"CPython Version   : {audit['python_version']}")
    print(f"Host Platform     : {audit['platform']}")
    print(f"Active Operator   : {audit['user']}")
    print(f"Audit Timestamp   : {audit['audit_timestamp']:%d-%b-%Y %I:%M:%S %p}")
    print(f"Next Audit Date   : {audit['next_scheduled_audit']:%d-%b-%Y}")

    # 2. Scholarship Draw
    student_candidates = [
        {"id": 101, "name": "Susmita Mukherjee", "course": "Python Pro", "fee": 12000},
        {"id": 102, "name": "Rahul Roy", "course": "Data Analytics", "fee": 10000},
        {"id": 103, "name": "Priya Sharma", "course": "Web Development", "fee": 14000},
        {"id": 104, "name": "Anirban Banerjee", "course": "GST & Accounting", "fee": 8500},
        {"id": 105, "name": "Sneha Das", "course": "Python Pro", "fee": 12000},
    ]

    print("\n--- 2. VERIFIABLE 2026 SCHOLARSHIP LOTTERY DRAW ---")
    winners = EnterpriseDiagnosticSuite.conduct_scholarship_lottery(student_candidates, winners_count=2, seed=2026)
    for idx, w in enumerate(winners, 1):
        print(f"Winner #{idx}: {w['name']} (ID: {w['student_id']}) - {w['course']}")
        print(f"  Gross: INR {w['original_fee']} | Scholarship: -INR {w['scholarship_discount']} (25%) | Net: INR {w['net_fee_payable']}\n")


if __name__ == "__main__":
    run_enterprise_demo()
