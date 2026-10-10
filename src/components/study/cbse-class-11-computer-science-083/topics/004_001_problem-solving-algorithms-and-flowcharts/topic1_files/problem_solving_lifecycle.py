"""
Module 004: Problem Solving Methodology & Flowchart Design
Topic 1: Steps in Problem Solving Lifecycle Simulation
Pure Python Demonstration of the 5 Problem Solving Phases:
  1. Problem Analysis & Requirement Specification
  2. Algorithm Design & Decomposition
  3. Coding (Implementation)
  4. Testing (Test Cases, Edge Cases)
  5. Debugging (Syntax, Runtime, Logical Errors)
"""

from typing import Dict, List, Any, Tuple

class ProblemSolvingLifecycleEngine:
    """Simulates solving a real-world problem: Calculating Electricity Bill based on Slabs."""

    def __init__(self):
        # 1. Problem Analysis & Specifications
        self.problem_spec = {
            "title": "Domestic Electricity Tariff Calculator",
            "inputs": "units_consumed (non-negative float)",
            "outputs": "total_bill (INR float) with fixed meter charge of ₹50",
            "slabs": [
                {"range": "0 - 100 units", "rate": 3.50},
                {"range": "101 - 200 units", "rate": 5.00},
                {"range": "201+ units", "rate": 7.20}
            ]
        }

    def phase1_analyze(self) -> Dict[str, Any]:
        """Phase 1: Analyzing the problem and defining constraints."""
        return {
            "phase": "1. Problem Analysis",
            "objective": "Calculate monthly bill based on tiered unit consumption rates",
            "constraints": ["units >= 0", "fixed meter charge = ₹50", "progressive tier calculation"],
            "inputs_required": ["units_consumed"],
            "expected_outputs": ["energy_charge", "fixed_charge", "total_bill"]
        }

    def phase2_algorithm(self) -> List[str]:
        """Phase 2: Step-by-step logical algorithm."""
        return [
            "Step 1: Start",
            "Step 2: Input units_consumed",
            "Step 3: If units_consumed < 0 then Output 'Invalid Input' and Stop",
            "Step 4: Initialize fixed_charge = 50.0, energy_charge = 0.0",
            "Step 5: If units_consumed <= 100 then energy_charge = units_consumed * 3.50",
            "Step 6: Else if units_consumed <= 200 then energy_charge = (100 * 3.50) + ((units_consumed - 100) * 5.00)",
            "Step 7: Else energy_charge = (100 * 3.50) + (100 * 5.00) + ((units_consumed - 200) * 7.20)",
            "Step 8: Calculate total_bill = energy_charge + fixed_charge",
            "Step 9: Display total_bill",
            "Step 10: Stop"
        ]

    def phase3_code(self, units: float) -> Tuple[float, float, float]:
        """Phase 3: Coding implementation in Python."""
        if units < 0:
            raise ValueError("Units consumed cannot be negative!")

        fixed_charge = 50.0
        if units <= 100:
            energy_charge = units * 3.50
        elif units <= 200:
            energy_charge = (100 * 3.50) + ((units - 100) * 5.00)
        else:
            energy_charge = (100 * 3.50) + (100 * 5.00) + ((units - 200) * 7.20)

        total_bill = energy_charge + fixed_charge
        return round(energy_charge, 2), fixed_charge, round(total_bill, 2)

    def phase4_test(self, test_suite: List[float]) -> List[Dict[str, Any]]:
        """Phase 4: Testing across boundary, nominal, and edge cases."""
        results = []
        for units in test_suite:
            try:
                energy, fixed, total = self.phase3_code(units)
                status = "PASSED"
                err = None
            except Exception as e:
                energy, fixed, total = 0.0, 0.0, 0.0
                status = "CAUGHT_EXCEPTION"
                err = str(e)

            results.append({
                "test_input_units": units,
                "energy_charge": energy,
                "fixed_charge": fixed,
                "total_bill": total,
                "status": status,
                "exception": err
            })
        return results

    def phase5_debug(self, buggy_code_flag: bool = False) -> str:
        """Phase 5: Demonstrating common bugs (Syntax vs Runtime vs Logical error)."""
        if buggy_code_flag:
            # Common Logical Error: Non-progressive slab calculation
            return "LOGICAL BUG DETECTED: Flat rate applied instead of progressive slab tiering!"
        return "DEBUGGING SUCCESS: No syntax, runtime, or logical errors detected."

if __name__ == "__main__":
    solver = ProblemSolvingLifecycleEngine()
    print("=" * 65)
    print("THE 5 PHASES OF PROBLEM SOLVING IN COMPUTING")
    print("=" * 65)

    print("\nPhase 1 - Analysis:", solver.phase1_analyze())
    print("\nPhase 2 - Algorithm Steps:")
    for step in solver.phase2_algorithm():
        print("  ", step)

    print("\nPhase 4 - Testing & Verification Suite:")
    test_cases = [0.0, 50.0, 100.0, 150.0, 250.0, -25.0]
    for res in solver.phase4_test(test_cases):
        print("  ", res)

    print("\nPhase 5 - Debugging Status:", solver.phase5_debug())
