"""
Module 004: Problem Solving Methodology & Flowchart Design
Topic 3: Characteristics of a Good Algorithm Simulation
Pure Python Demonstrating the 5 Fundamental Knuth Criteria for Algorithms:
  1. Finiteness (Must terminate after a finite number of steps; infinite loops fail)
  2. Definiteness (Every step must be precisely and unambiguously defined)
  3. Input (0 or more well-defined inputs)
  4. Output (1 or more well-defined outputs)
  5. Effectiveness (Every operation must be basic enough to be executed feasibly)
"""

from typing import Dict, List, Any

class AlgorithmPropertiesValidator:
    """Evaluates algorithms against Donald Knuth's 5 algorithmic criteria."""

    def __init__(self):
        self.knuth_criteria = {
            "FINITENESS": "An algorithm must always terminate after a finite number of steps and in a finite amount of time.",
            "DEFINITENESS": "Each step must be precisely, rigorously, and unambiguously specified with no double meanings.",
            "INPUT": "An algorithm has zero or more quantities supplied to it externally before execution begins.",
            "OUTPUT": "An algorithm has one or more quantities produced that have a specified relation to the inputs.",
            "EFFECTIVENESS": "All operations must be sufficiently basic so they can in principle be executed exactly and in a finite length of time."
        }

    def simulate_gcd_euclidean(self, a: int, b: int) -> Dict[str, Any]:
        """Euclid's Algorithm for Greatest Common Divisor (GCD) demonstrating all 5 properties."""
        steps_log = []
        original_a, original_b = a, b
        step_count = 0

        # Step 1: Input Validation
        if a < 0 or b < 0:
            return {"error": "Inputs must be non-negative integers"}

        # Step 2: Loop until remainder is 0 (Finiteness guaranteed by decreasing remainder)
        while b != 0:
            step_count += 1
            remainder = a % b
            steps_log.append(f"Step {step_count}: GCD({a}, {b}) -> Remainder = {a} % {b} = {remainder}. Update a = {b}, b = {remainder}")
            a, b = b, remainder

        return {
            "algorithm": "Euclid's Algorithm for GCD",
            "inputs": {"a": original_a, "b": original_b},
            "output_gcd": a,
            "total_steps": step_count,
            "finiteness_verified": True,
            "trace_log": steps_log
        }

    def check_infinite_loop_violation(self, start_val: int, increment: int, target: int) -> Dict[str, Any]:
        """Demonstrates a violation of Finiteness (Infinite Loop bug)."""
        curr = start_val
        iterations = 0
        max_safety_limit = 1000

        while curr != target:
            iterations += 1
            curr += increment
            if iterations >= max_safety_limit:
                return {
                    "status": "VIOLATION_DETECTED",
                    "criterion_failed": "FINITENESS",
                    "reason": f"Loop did not terminate within {max_safety_limit} steps. Target {target} was skipped because step size is {increment}.",
                    "infinite_loop": True
                }

        return {
            "status": "PASSED",
            "criterion_failed": None,
            "steps_to_terminate": iterations,
            "infinite_loop": False
        }

if __name__ == "__main__":
    validator = AlgorithmPropertiesValidator()
    print("=" * 65)
    print("DONALD KNUTH'S 5 ALGORITHM CHARACTERISTICS SIMULATION")
    print("=" * 65)

    print("\n1. EUCLID'S GCD (Valid Algorithm):")
    gcd_res = validator.simulate_gcd_euclidean(48, 18)
    print(f"  GCD Result = {gcd_res['output_gcd']} in {gcd_res['total_steps']} steps.")
    for l in gcd_res["trace_log"]:
        print("   ", l)

    print("\n2. INFINITE LOOP CHECK (Finiteness Violation):")
    inf_res = validator.check_infinite_loop_violation(start_val=1, increment=2, target=10) # 1, 3, 5, 7, 9, 11 skips 10
    print("  Violation Status:", inf_res)
