"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 6: The Concept of l-value and r-value in Python

This script demonstrates:
1. The definition of l-value (Locator Value / Left Hand Side)
2. The definition of r-value (Read Value / Right Hand Side)
3. Legal vs Illegal assignment statements
"""

def audit_assignment_statement(lhs: str, rhs: str) -> dict:
    """Audits whether a given LHS is a valid l-value and RHS is a valid r-value."""
    # Check if LHS is an illegal literal
    if lhs.isdigit() or (lhs.startswith('"') and lhs.endswith('"')) or (lhs.startswith("'") and lhs.endswith("'")):
        return {
            "valid": False,
            "statement": f"{lhs} = {rhs}",
            "lhs": lhs,
            "rhs": rhs,
            "error_type": "SyntaxError: cannot assign to literal",
            "explanation": f"LHS '{lhs}' is a Literal constant. Literals have no mutable locator address and cannot serve as l-values."
        }
        
    # Check if LHS contains arithmetic operators
    for op in ["+", "-", "*", "/", "%", "**", "//"]:
        if op in lhs and not (lhs.startswith("[") or lhs.startswith("{")):
            return {
                "valid": False,
                "statement": f"{lhs} = {rhs}",
                "lhs": lhs,
                "rhs": rhs,
                "error_type": "SyntaxError: cannot assign to expression",
                "explanation": f"LHS '{lhs}' is an evaluated mathematical expression. Expressions produce r-values, not storage target l-values."
            }
            
    # Check if LHS is a function call
    if "(" in lhs and ")" in lhs and not (lhs.startswith("(") and lhs.endswith(")")):
        return {
            "valid": False,
            "statement": f"{lhs} = {rhs}",
            "lhs": lhs,
            "rhs": rhs,
            "error_type": "SyntaxError: cannot assign to function call",
            "explanation": f"LHS '{lhs}' is a function call which produces a return r-value and cannot act as an l-value."
        }
        
    return {
        "valid": True,
        "statement": f"{lhs} = {rhs}",
        "lhs": lhs,
        "rhs": rhs,
        "explanation": f"'{lhs}' is a 100% legal l-value target capable of binding to evaluated r-value '{rhs}'."
    }


if __name__ == "__main__":
    print("=== L-VALUE VS R-VALUE ASSIGNMENT AUDITOR ===")
    test_cases = [
        ("total", "100 + 50"),
        ("10", "x"),
        ("x + 2", "y"),
        ("len(s)", "5"),
        ("marks[0]", "98"),
        ("student['name']", "'Mamata'"),
        ("(a, b)", "(10, 20)")
    ]
    for lhs, rhs in test_cases:
        res = audit_assignment_statement(lhs, rhs)
        status = "LEGAL" if res["valid"] else "ILLEGAL"
        print(f"\nStatement: {res['statement']:<20} -> {status}")
        print(f"  Details: {res['explanation']}")
