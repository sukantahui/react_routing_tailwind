# topic11_files/pdb_debugger_fundamentals.py
# Module: 003_002_basic-exception-handling
# Topic: Debugging techniques & pdb breakpoints
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 1: Python Debugger (pdb) Fundamentals & `breakpoint()`
Demonstrates:
  1. Setting interactive breakpoints with built-in `breakpoint()` (Python 3.7+)
  2. Essential pdb debugger commands: n, s, c, q, p, pp, w, u, d, l
  3. Non-interactive programmatic inspection for automated environments
"""

def calculate_student_gpa(scores: list) -> float:
    """Calculates average student GPA with debug introspection points."""
    total = sum(scores)
    count = len(scores)

    # In an interactive terminal, calling `breakpoint()` pauses execution
    # and opens an interactive (Pdb) prompt:
    # breakpoint()

    gpa = total / count if count > 0 else 0.0
    return gpa


def demonstrate_pdb_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - PYTHON DEBUGGER (PDB) FUNDAMENTALS")
    print("=" * 70)

    print(r"""
Essential PDB Debugger Navigation Commands:
  -------------------------------------------------------------------------
  Command   Full Name       Action
  -------------------------------------------------------------------------
  n         next            Execute current line and stop at next line
  s         step            Step into function call on current line
  c         continue        Resume full execution until next breakpoint
  q         quit            Abort debugging session and exit script
  p <var>   print           Evaluate and print value of variable or expression
  pp <var>  pretty-print    Format and pretty-print complex dicts/lists
  l         list            Display 11 lines of source code around current line
  w         where           Print full call stack trace with frame pointers
  u         up              Move current frame up one level in call stack
  d         down            Move current frame down one level in call stack
  b <line>  break           Set dynamic breakpoint at specific line or function
  -------------------------------------------------------------------------
""")

    scores = [85.0, 92.5, 88.0, 96.0]
    print(f"Sample Student Exam Scores: {scores}")
    avg_gpa = calculate_student_gpa(scores)
    print(f"Computed Grade Average: {avg_gpa:.2f}/100")

    print("\n[PASSED] PDB Fundamentals & Command Reference Verified.")


if __name__ == "__main__":
    demonstrate_pdb_fundamentals()
