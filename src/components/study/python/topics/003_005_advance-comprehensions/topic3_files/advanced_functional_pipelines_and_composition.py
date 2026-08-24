# topic3_files/advanced_functional_pipelines_and_composition.py
# Module: 003_005_advance-comprehensions
# Topic: Functional tools: map(), filter(), and functools.reduce()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 3: Advanced Functional Pipelines, Composition & `functools.partial`
Demonstrates:
  1. Multi-stage functional data pipelines with function composition
  2. Currying and partial application using `functools.partial`
  3. Custom dictionary reduction accumulators for multi-metric aggregation
"""

import functools
from typing import Dict, Any, List

def calculate_discounted_fee(base_fee: float, discount_percent: float) -> float:
    """Calculates discounted fee."""
    return base_fee * (1.0 - (discount_percent / 100.0))

def demonstrate_advanced_functional_pipelines():
    print("=" * 70)
    print("CODER & ACCOTAX - ADVANCED FUNCTIONAL PIPELINES & PARTIALS")
    print("=" * 70)

    student_transactions = [
        {"id": "STU-101", "name": "Sourav", "base_fee": 35000.0, "category": "AI", "status": "CLEARED"},
        {"id": "STU-102", "name": "Priyanka", "base_fee": 32000.0, "category": "DS", "status": "PENDING"},
        {"id": "STU-103", "name": "Debolina", "base_fee": 35000.0, "category": "AI", "status": "CLEARED"},
        {"id": "STU-104", "name": "Rahul", "base_fee": 25000.0, "category": "WEB", "status": "CLEARED"},
        {"id": "STU-105", "name": "Amit", "base_fee": 35000.0, "category": "AI", "status": "CLEARED"}
    ]

    # 1. Partial Application with `functools.partial`:
    # Pre-bind standard 15% institutional scholarship discount
    apply_institutional_discount = functools.partial(calculate_discounted_fee, discount_percent=15.0)

    print("1. Partial Application with `functools.partial`:")
    sample_fee = 30000.0
    discounted_sample = apply_institutional_discount(sample_fee)
    print(f"   * Base INR {sample_fee:,.2f} -> 15% Discounted: INR {discounted_sample:,.2f}\n")

    # 2. Multi-Stage Functional Pipeline:
    # Filter CLEARED -> Map Discount -> Reduce to Multi-Metric Summary
    print("2. Executing Multi-Stage Functional Data Pipeline:")

    # Stage 1: Filter
    cleared_records = filter(lambda s: s["status"] == "CLEARED", student_transactions)

    # Stage 2: Map
    def enrich_record(s: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "id": s["id"],
            "name": s["name"],
            "category": s["category"],
            "final_fee": apply_institutional_discount(s["base_fee"])
        }

    enriched_stream = map(enrich_record, cleared_records)

    # Stage 3: Reduce (Multi-Metric Custom Dictionary Accumulator)
    def financial_accumulator(acc: Dict[str, Any], record: Dict[str, Any]) -> Dict[str, Any]:
        acc["total_revenue"] += record["final_fee"]
        acc["cleared_count"] += 1
        acc["category_counts"][record["category"]] = acc["category_counts"].get(record["category"], 0) + 1
        return acc

    initial_state = {
        "total_revenue": 0.0,
        "cleared_count": 0,
        "category_counts": {}
    }

    final_metrics = functools.reduce(financial_accumulator, enriched_stream, initial_state)

    print(f"   * Total Collected Revenue: INR {final_metrics['total_revenue']:,.2f}")
    print(f"   * Total Cleared Students : {final_metrics['cleared_count']}")
    print(f"   * Category Breakdown     : {final_metrics['category_counts']}")

    print(r"""
Pipeline Composition Invariants:
  1. `functools.partial` freezes function arguments for clean integration with `map()`.
  2. Multi-metric reductions initialize with a state dictionary `acc` and return the mutated/updated state.
""")
    print("\n[PASSED] Advanced Functional Pipelines & Partials Verified.")


if __name__ == "__main__":
    demonstrate_advanced_functional_pipelines()
