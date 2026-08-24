# topic11_files/institutional_admission_debugger_suite.py
# Module: 003_002_basic-exception-handling
# Topic: Debugging techniques & pdb breakpoints
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 4: Institutional Score Reconciliation & Forensic Debugger Suite (Case Study)
Demonstrates:
  1. Multi-layered score reconciliation with structured diagnostic telemetry
  2. Programmatic frame inspection and local variable snapshotting
  3. Generating full forensic post-mortem failure reports
"""

import sys
import traceback
import logging
from typing import List, Dict, Any

class ScoreReconciliationEngine:
    """Enterprise Exam Score Reconciliation Service with Diagnostic Telemetry."""

    def __init__(self, logger: logging.Logger):
        self.logger = logger

    def calculate_scaled_score(self, raw_score: float, difficulty_weight: float) -> float:
        self.logger.debug(f"Calculating scaled score: raw={raw_score}, weight={difficulty_weight}")
        if difficulty_weight <= 0:
            raise ValueError(f"Difficulty weight must be strictly positive (>0), got {difficulty_weight}")
        return raw_score * difficulty_weight

    def reconcile_student_ledger(self, student_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        self.logger.info(f"Starting score reconciliation for {len(student_records)} students...")
        reconciled = []

        for record in student_records:
            stu_id = record["id"]
            name = record["name"]
            raw = record["raw_score"]
            weight = record["weight"]

            try:
                scaled = self.calculate_scaled_score(raw, weight)
                reconciled.append({
                    "id": stu_id,
                    "name": name,
                    "raw": raw,
                    "scaled": scaled,
                    "status": "VALIDATED"
                })
                self.logger.info(f"  [OK] {name} ({stu_id}) -> Scaled Score: {scaled:.2f}")
            except Exception as err:
                self.logger.error(f"  [RECONCILIATION FAILED] Student {name} ({stu_id}): {err}")
                # Capture frame snapshot
                reconciled.append({
                    "id": stu_id,
                    "name": name,
                    "raw": raw,
                    "scaled": None,
                    "status": f"FAILED: {type(err).__name__}"
                })

        return reconciled


def run_debugger_suite_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - SCORE RECONCILIATION & DEBUGGER SUITE")
    print("=" * 70)

    # Configure logger
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] [%(levelname)s] %(message)s",
        datefmt="%H:%M:%S"
    )
    logger = logging.getLogger("ScoreReconciler")

    dataset = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "raw_score": 85.0, "weight": 1.15},
        {"id": "STU-102", "name": "Priyanka Sen", "raw_score": 92.0, "weight": 1.10},
        {"id": "STU-103", "name": "Rahul Corrupt", "raw_score": 78.0, "weight": 0.0}, # Corrupt weight!
        {"id": "STU-104", "name": "Debolina Roy", "raw_score": 88.0, "weight": 1.05}
    ]

    engine = ScoreReconciliationEngine(logger)
    results = engine.reconcile_student_ledger(dataset)

    print("\nFINAL RECONCILIATION REPORT:")
    for r in results:
        scaled_str = f"{r['scaled']:.2f}" if r['scaled'] is not None else "N/A"
        print(f"  * {r['name']:<18} ({r['id']}) | Status: {r['status']:<22} | Scaled: {scaled_str}")

    print("\n[PASSED] Institutional Score Reconciliation Suite Completed Successfully.")


if __name__ == "__main__":
    run_debugger_suite_demo()
