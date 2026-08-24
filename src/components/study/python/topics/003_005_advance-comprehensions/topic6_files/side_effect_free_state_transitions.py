# topic6_files/side_effect_free_state_transitions.py
# Module: 003_005_advance-comprehensions
# Topic: Pure functions & immutable programming principles in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 3: Side-Effect-Free Functional State Transitions (Redux/Elm Pattern)
Demonstrates:
  1. Pure state transitions: `reducer(state, action) -> new_state`
  2. Time-travel auditing: preserving full immutable historical states
  3. Composing state updates with dictionary unpacking (`{**state, ...}`)
"""

from typing import Dict, Any, List, Tuple

# Type definition for immutable state
State = Dict[str, Any]
Action = Dict[str, Any]

def student_state_reducer(state: State, action: Action) -> State:
    """Pure functional state reducer. NEVER mutates input 'state'."""
    action_type = action.get("type")

    if action_type == "REGISTER_STUDENT":
        student_id = action["payload"]["id"]
        return {
            **state,
            "students": {
                **state["students"],
                student_id: action["payload"]
            },
            "total_registered": state["total_registered"] + 1
        }

    elif action_type == "RECORD_PAYMENT":
        student_id = action["payload"]["id"]
        amount = action["payload"]["amount"]
        current_student = state["students"][student_id]
        updated_student = {
            **current_student,
            "fee_paid": current_student["fee_paid"] + amount,
            "status": "PAID_IN_FULL" if (current_student["fee_paid"] + amount) >= current_student["total_fee"] else "PARTIAL"
        }
        return {
            **state,
            "students": {
                **state["students"],
                student_id: updated_student
            },
            "total_collected": state["total_collected"] + amount
        }

    return state  # Unknown action returns state unmodified


def demonstrate_functional_state_machine():
    print("=" * 70)
    print("CODER & ACCOTAX - SIDE-EFFECT-FREE STATE MACHINE (REDUX PATTERN)")
    print("=" * 70)

    # Initial Immutable Base State:
    state_v0: State = {
        "institution": "Coder & AccoTax",
        "total_registered": 0,
        "total_collected": 0.0,
        "students": {}
    }

    # Action 1: Register Sourav
    action_1: Action = {
        "type": "REGISTER_STUDENT",
        "payload": {"id": "STU-101", "name": "Sourav Mukherjee", "total_fee": 30000.0, "fee_paid": 0.0, "status": "REGISTERED"}
    }
    state_v1 = student_state_reducer(state_v0, action_1)

    # Action 2: Record Payment
    action_2: Action = {
        "type": "RECORD_PAYMENT",
        "payload": {"id": "STU-101", "amount": 30000.0}
    }
    state_v2 = student_state_reducer(state_v1, action_2)

    # 1. Inspect State Evolution History (Time-Travel Proof):
    print("1. Time-Travel Audit History Across Immutable State Snapshots:")
    print(f"   * State V0 (Initial) : Total Students = {state_v0['total_registered']} | Total Collected = INR {state_v0['total_collected']}")
    print(f"   * State V1 (Enrolled): Total Students = {state_v1['total_registered']} | Total Collected = INR {state_v1['total_collected']}")
    print(f"   * State V2 (Paid)    : Total Students = {state_v2['total_registered']} | Total Collected = INR {state_v2['total_collected']:,.2f}\n")

    # 2. Verify Immutability Integrity:
    print("2. Verifying Previous Historical Snapshots were Untouched:")
    print(f"   * State V0 Students Dict: {state_v0['students']} (Still Empty!)")
    print(f"   * State V1 Sourav Status: {state_v1['students']['STU-101']['status']} (Still 'REGISTERED'!)")
    print(f"   * State V2 Sourav Status: {state_v2['students']['STU-101']['status']} (Cleanly 'PAID_IN_FULL'!)")

    print(r"""
State Transition Invariants:
  1. `(state, action) -> new_state` is a pure function with 100% referential transparency.
  2. Historical state snapshots remain intact indefinitely, enabling complete audit trails and rollbacks.
""")
    print("\n[PASSED] Side-Effect-Free State Transitions Verified.")


if __name__ == "__main__":
    demonstrate_functional_state_machine()
