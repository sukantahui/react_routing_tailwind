# topic1_files/institutional_scholarship_accumulator_closure.py
# Module: 003_003_decorators-generators
# Topic: Inner functions and variable scope closures
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Institutional Scholarship Budget Closure (Case Study)
Demonstrates:
  1. Encapsulating rich multi-variable state inside closures without classes
  2. Returning a bundle of closure methods (Disburse, Balance, Audit History)
  3. Enforcing institutional budget limits and state integrity
"""

from typing import Dict, Any, Callable, List

def create_scholarship_budget_manager(total_budget: float) -> Dict[str, Callable]:
    """Creates a closure suite managing institutional scholarship funds."""
    if total_budget <= 0:
        raise ValueError(f"Scholarship budget must be strictly positive: INR {total_budget}")

    allocated_budget = total_budget
    total_disbursed = 0.0
    history: List[Dict[str, Any]] = []

    def disburse(student_id: str, student_name: str, amount: float) -> Dict[str, Any]:
        nonlocal total_disbursed

        if amount <= 0:
            raise ValueError(f"Disbursement amount must be positive: INR {amount}")
        if total_disbursed + amount > allocated_budget:
            remaining = allocated_budget - total_disbursed
            raise ValueError(f"Budget Exceeded! Requested INR {amount:,.2f}, remaining budget: INR {remaining:,.2f}")

        total_disbursed += amount
        entry = {
            "student_id": student_id,
            "student_name": student_name,
            "amount": amount,
            "remaining_budget": allocated_budget - total_disbursed
        }
        history.append(entry)
        return entry

    def get_summary() -> Dict[str, Any]:
        return {
            "total_budget": allocated_budget,
            "total_disbursed": total_disbursed,
            "remaining_budget": allocated_budget - total_disbursed,
            "recipients_count": len(history)
        }

    def get_history() -> List[Dict[str, Any]]:
        # Return defensive copy of history list:
        return list(history)

    # Return dictionary bundle of closure methods:
    return {
        "disburse": disburse,
        "get_summary": get_summary,
        "get_history": get_history
    }


def run_scholarship_closure_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - SCHOLARSHIP BUDGET MANAGER (CLOSURE SUITE)")
    print("=" * 70)

    # 1. Initialize manager with INR 50,000 budget:
    manager = create_scholarship_budget_manager(50000.0)
    disburse_fn = manager["disburse"]
    summary_fn = manager["get_summary"]

    print("1. Disbursing Merit Scholarships:")
    e1 = disburse_fn("STU-101", "Sourav Mukherjee", 12000.0)
    print(f"   * Disbursed INR {e1['amount']:,.2f} to {e1['student_name']} | Remaining: INR {e1['remaining_budget']:,.2f}")

    e2 = disburse_fn("STU-102", "Priyanka Sen", 15000.0)
    print(f"   * Disbursed INR {e2['amount']:,.2f} to {e2['student_name']} | Remaining: INR {e2['remaining_budget']:,.2f}")

    e3 = disburse_fn("STU-103", "Rahul Verma", 10000.0)
    print(f"   * Disbursed INR {e3['amount']:,.2f} to {e3['student_name']} | Remaining: INR {e3['remaining_budget']:,.2f}\n")

    # 2. Testing Budget Overflow Guard:
    print("2. Attempting Disbursal Exceeding Remaining Budget (INR 20,000):")
    try:
        disburse_fn("STU-104", "Debolina Roy", 20000.0)
    except ValueError as err:
        print(f"   [BLOCKED BY CLOSURE GUARD] ValueError: {err}\n")

    # 3. Summary Report:
    print("3. Final Scholarship Portfolio Summary:")
    summary = summary_fn()
    print(f"   * Total Budget     : INR {summary['total_budget']:,.2f}")
    print(f"   * Total Disbursed  : INR {summary['total_disbursed']:,.2f}")
    print(f"   * Remaining Budget : INR {summary['remaining_budget']:,.2f}")
    print(f"   * Total Recipients : {summary['recipients_count']}")

    print("\n[PASSED] Scholarship Accumulator Closure Verified.")


if __name__ == "__main__":
    run_scholarship_closure_case_study()
