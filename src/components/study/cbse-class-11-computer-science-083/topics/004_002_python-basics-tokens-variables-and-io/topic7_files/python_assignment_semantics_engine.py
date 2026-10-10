"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 7: Assignment Semantics: 'lvalue = rvalue' Rules and Assignment Variations

This script demonstrates Python's assignment mechanics:
1. Simple Assignment: var = value
2. Chained Assignment: a = b = c = 50
3. Simultaneous Unpacking Assignment: x, y = y, x (Swapping)
4. Augmented In-Place Assignment: count += 5
5. Extended Starred Unpacking: first, *middle, last = [1, 2, 3, 4, 5]
"""

def demonstrate_assignment_forms() -> dict:
    """Demonstrates all 5 forms of Python assignment semantics."""
    # 1. Simple Assignment
    x = 100
    
    # 2. Chained Assignment
    a = b = c = 50
    
    # 3. Simultaneous Unpacking & Swapping
    m, n = 10, 20
    m, n = n, m  # Swapped without temp variable!
    
    # 4. Augmented Assignment
    counter = 5
    counter += 10  # 15
    counter *= 2   # 30
    
    # 5. Extended Starred Unpacking (PEP 3132)
    sample_list = [10, 20, 30, 40, 50]
    head, *body, tail = sample_list
    
    return {
        "simple": {"x": x},
        "chained": {"a": a, "b": b, "c": c, "share_same_id": (a is b is c)},
        "swapped": {"m": m, "n": n},
        "augmented": {"counter": counter},
        "starred_unpacking": {
            "head": head,
            "body": body,
            "tail": tail
        }
    }


def parse_and_validate_syntax(code_statement: str) -> dict:
    """Attempts to compile an assignment statement string to test validity."""
    try:
        compiled = compile(code_statement, "<string>", "exec")
        return {
            "valid": True,
            "statement": code_statement,
            "message": "Valid Python statement!"
        }
    except SyntaxError as e:
        return {
            "valid": False,
            "statement": code_statement,
            "error_name": "SyntaxError",
            "message": str(e.msg),
            "line": e.lineno,
            "offset": e.offset
        }


if __name__ == "__main__":
    print("=== 1. PYTHON ASSIGNMENT FORMS DEMO ===")
    forms = demonstrate_assignment_forms()
    print("Chained Assignment:", forms["chained"])
    print("Swapped Values (m, n = n, m):", forms["swapped"])
    print("Starred Unpacking:", forms["starred_unpacking"])
    
    print("\n=== 2. SYNTAX VALIDATION OF ILLEGAL ASSIGNMENTS ===")
    test_syntax = [
        "total = 100",
        "10 = a",
        "x + 2 = y",
        "len('test') = 4",
        "a, b = 1, 2"
    ]
    for stmt in test_syntax:
        res = parse_and_validate_syntax(stmt)
        status = "VALID" if res["valid"] else "SYNTAX ERROR"
        print(f"'{stmt}': {status} -> {res['message']}")
