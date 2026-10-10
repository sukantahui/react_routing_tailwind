"""
CBSE Class 11 Computer Science (083) - Unit 2
Topic 13: Practical Skill Arena & Code Challenge Solver
Author: Sukanta Hui
"""

def task_1_identifier_sanitizer(raw_token: str) -> bool:
    """
    Validates if a given token qualifies as a legal Python identifier under CBSE rules.
    """
    import keyword
    return raw_token.isidentifier() and not keyword.iskeyword(raw_token)


def task_2_lvalue_rvalue_evaluator(lhs: str, rhs: str) -> str:
    """
    Simulates Python's syntax checker for assignment statements.
    """
    import keyword
    clean_lhs = lhs.strip()
    if clean_lhs.isidentifier() and not keyword.iskeyword(clean_lhs):
        return f"VALID: Assigned {rhs} to l-value '{clean_lhs}'"
    elif clean_lhs.isdigit() or (clean_lhs.startswith(('"', "'")) and clean_lhs.endswith(('"', "'"))):
        return f"SYNTAX ERROR: Cannot assign to literal '{clean_lhs}' (r-value used as l-value)"
    elif any(op in clean_lhs for op in ['+', '-', '*', '/', '%', '//', '**']):
        return f"SYNTAX ERROR: Cannot assign to expression '{clean_lhs}' (l-value must be storage target)"
    else:
        return f"SYNTAX ERROR: Invalid l-value target '{clean_lhs}'"


def task_3_student_id_card_generator(name: str, roll_no: int, stream: str, marks: float) -> str:
    """
    Formats a student biodata card using custom sep, end, and f-string specifications.
    """
    border = "=" * 45
    card = (
        f"{border}\n"
        f"CBSE HIGHER SECONDARY ID BADGE (2026-27)\n"
        f"{border}\n"
        f"Name   : {name:<25}\n"
        f"Roll No: {roll_no:05d}\n"
        f"Stream : {stream:<15}\n"
        f"Score  : {marks:.2f}%\n"
        f"{border}"
    )
    return card


if __name__ == "__main__":
    print("=== TASK 1: IDENTIFIER VALIDATOR ===")
    for token in ["student_name", "2nd_rank", "for", "_cache", "my$var"]:
        print(f"Token: {token:<15} Valid: {task_1_identifier_sanitizer(token)}")

    print("\n=== TASK 2: LVALUE / RVALUE VALIDATOR ===")
    print(task_2_lvalue_rvalue_evaluator("score", "95"))
    print(task_2_lvalue_rvalue_evaluator("100", "score"))
    print(task_2_lvalue_rvalue_evaluator("a + 5", "b"))

    print("\n=== TASK 3: STUDENT ID CARD GENERATOR ===")
    print(task_2_lvalue_rvalue_evaluator("temp", "50"))
    print(task_3_student_id_card_generator("Sukanta Hui", 101, "Computer Science", 98.4))
