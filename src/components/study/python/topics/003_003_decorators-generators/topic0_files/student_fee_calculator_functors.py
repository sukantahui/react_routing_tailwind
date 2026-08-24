# topic0_files/student_fee_calculator_functors.py
# Module: 003_003_decorators-generators
# Topic: First-Class Functions: Passing and returning functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Composable Financial Functor Pipelines (Case Study)
Demonstrates:
  1. Building a pipeline composer higher-order function: `compose_pipeline(f, g, h)`
  2. Passing multiple function transformations in sequence
  3. Processing institutional student fees through clean functional composition
"""

from typing import Callable, List, Dict, Any

# Transformation Functions
def add_laboratory_fee(amount: float) -> float:
    return amount + 2500.0

def apply_early_bird_discount(amount: float) -> float:
    return amount * 0.90  # 10% discount

def add_gst_tax(amount: float) -> float:
    return amount * 1.18  # 18% GST

def round_to_nearest_hundred(amount: float) -> float:
    return round(amount, -2)


# Higher-Order Pipeline Composer
def compose_pipeline(*functions: Callable[[float], float]) -> Callable[[float], float]:
    """Higher-order function that takes multiple functions and returns a unified composite pipeline function."""

    def composite_pipeline(initial_value: float) -> float:
        current_value = initial_value
        for fn in functions:
            current_value = fn(current_value)
        return current_value

    pipeline_names = " -> ".join(fn.__name__ for fn in functions)
    composite_pipeline.__name__ = f"pipeline({pipeline_names})"
    composite_pipeline.__doc__ = f"Composed calculation pipeline consisting of {len(functions)} steps."

    return composite_pipeline


def run_pipeline_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - COMPOSABLE FEE PIPELINE (CASE STUDY)")
    print("=" * 70)

    # 1. Compose specialized fee processing pipelines:
    standard_it_pipeline = compose_pipeline(
        add_laboratory_fee,
        apply_early_bird_discount,
        add_gst_tax,
        round_to_nearest_hundred
    )

    print(f"1. Composed Pipeline: {standard_it_pipeline.__name__}")
    print(f"   Documentation    : {standard_it_pipeline.__doc__}\n")

    # 2. Process student batch through composed pipeline:
    student_records = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "base_tuition": 20000.0},
        {"id": "STU-102", "name": "Priyanka Sen", "base_tuition": 28000.0},
        {"id": "STU-103", "name": "Rahul Verma", "base_tuition": 15000.0}
    ]

    print("2. Processing Student Batch Through Composed Pipeline:")
    for stu in student_records:
        final_payable = standard_it_pipeline(stu["base_tuition"])
        print(f"  * {stu['name']:<18} ({stu['id']}) | Base: INR {stu['base_tuition']:>8,.2f} -> Payable: INR {final_payable:>8,.2f}")

    print("\n[PASSED] Composable Financial Functor Pipelines Verified.")


if __name__ == "__main__":
    run_pipeline_case_study()
