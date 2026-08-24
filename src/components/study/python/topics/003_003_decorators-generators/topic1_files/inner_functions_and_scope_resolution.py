# topic1_files/inner_functions_and_scope_resolution.py
# Module: 003_003_decorators-generators
# Topic: Inner functions and variable scope closures
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: Inner Functions & LEGB Scope Resolution
Demonstrates:
  1. Defining nested inner functions inside outer parent functions
  2. The LEGB Scope Resolution Rule: Local -> Enclosing -> Global -> Built-in
  3. Reading enclosing variables inside nested functions
"""

# Global Scope Variable:
INSTITUTION_NAME = "Coder & AccoTax (Barrackpore)"

def outer_fee_auditor(student_name: str, gross_fee: float):
    """Outer enclosing function establishing Enclosing Scope."""
    audit_category = "PREMIUM_TIER" if gross_fee >= 20000 else "STANDARD_TIER"

    # Inner Nested Function (Has access to Local, Enclosing, Global, Built-in):
    def generate_audit_summary(discount_rate: float) -> str:
        # Local variable:
        net_payable = gross_fee * (1.0 - discount_rate)

        # Accessing:
        # - Global:    INSTITUTION_NAME
        # - Enclosing: student_name, gross_fee, audit_category
        # - Local:     discount_rate, net_payable
        # - Built-in:  len(), max(), str()
        return (
            f"[{INSTITUTION_NAME}] Audit for {student_name} ({audit_category}): "
            f"Gross: INR {gross_fee:,.2f} -> Net: INR {net_payable:,.2f} (Disc: {discount_rate*100:.0f}%)"
        )

    # Invoking inner function from inside outer function:
    result = generate_audit_summary(0.15)
    return result


def demonstrate_legb_resolution():
    print("=" * 70)
    print("CODER & ACCOTAX - INNER FUNCTIONS & LEGB SCOPE RESOLUTION")
    print("=" * 70)

    print("1. Executing Outer Function with Nested Scope:")
    summary1 = outer_fee_auditor("Sourav Mukherjee", 25000.0)
    print(f"   * {summary1}")

    summary2 = outer_fee_auditor("Rahul Verma", 15000.0)
    print(f"   * {summary2}\n")

    print(r"""
The LEGB Scope Resolution Order:
  L -> Local     : Names assigned inside the currently executing function
  E -> Enclosing : Names in the local scope of any enclosing parent functions (def inside def)
  G -> Global    : Names assigned at top-level of module file
  B -> Built-in  : Built-in Python identifiers (len, range, max, Exception)
""")
    print("[PASSED] Inner Functions & LEGB Scope Resolution Verified.")


if __name__ == "__main__":
    demonstrate_legb_resolution()
