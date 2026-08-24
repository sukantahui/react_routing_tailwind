# topic0_files/dispatch_table_with_function_objects.py
# Module: 003_003_decorators-generators
# Topic: First-Class Functions: Passing and returning functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: Command Dispatch Tables Using Function Objects
Demonstrates:
  1. Storing function objects as values inside Python dictionaries
  2. Eliminating large `if/elif/else` ladders with O(1) Command Dispatch Tables
  3. Safe fallback dispatching with `dict.get()`
"""

from typing import Dict, Callable

# Action Handler Functions
def handle_admission(data: dict) -> str:
    return f"Processing Admission for {data.get('name')} (Course: {data.get('course')})"

def handle_fee_payment(data: dict) -> str:
    return f"Recording Fee Payment of INR {data.get('amount', 0):,.2f} for {data.get('student_id')}"

def handle_issue_certificate(data: dict) -> str:
    return f"Generating Certified Completion Diploma for {data.get('name')}"

def handle_unknown_action(data: dict) -> str:
    return f"[ERROR] Unrecognized action '{data.get('action')}' in dispatch pipeline!"


# Command Dispatch Table (Mapping strings -> Function Objects)
DISPATCH_TABLE: Dict[str, Callable[[dict], str]] = {
    "ADMISSION": handle_admission,
    "PAYMENT": handle_fee_payment,
    "CERTIFICATE": handle_issue_certificate
}


def execute_portal_action(payload: dict) -> str:
    """Executes action by looking up the appropriate function object from dispatch table."""
    action_key = payload.get("action", "").upper()

    # Retrieve function object from dictionary (O(1) lookup):
    handler = DISPATCH_TABLE.get(action_key, handle_unknown_action)

    # Invoke the dispatched function:
    return handler(payload)


def demonstrate_dispatch_tables():
    print("=" * 70)
    print("CODER & ACCOTAX - FUNCTION DISPATCH TABLES (COMMAND PATTERN)")
    print("=" * 70)

    # 1. Admission Command
    cmd1 = {"action": "ADMISSION", "name": "Sourav Mukherjee", "course": "Full-Stack Python & AI"}
    print(f"1. Action 1: {execute_portal_action(cmd1)}")

    # 2. Payment Command
    cmd2 = {"action": "PAYMENT", "student_id": "STU-101", "amount": 18000.0}
    print(f"2. Action 2: {execute_portal_action(cmd2)}")

    # 3. Certificate Command
    cmd3 = {"action": "CERTIFICATE", "name": "Priyanka Sen"}
    print(f"3. Action 3: {execute_portal_action(cmd3)}")

    # 4. Unknown Fallback Command
    cmd4 = {"action": "PURGE_DATABASE", "name": "Attacker"}
    print(f"4. Action 4: {execute_portal_action(cmd4)}")

    print("\n[PASSED] Command Dispatch Tables Verified.")


if __name__ == "__main__":
    demonstrate_dispatch_tables()
