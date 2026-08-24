# topic5_files/fstring_expressions_and_debugging.py
# Module: 002_007_string-processing
# Topic: Advanced Formatting (f-strings, format() method, padding, alignment)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 5 - File 1: f-String Expressions, Conversions & Self-Documenting Debugging
Demonstrates:
  1. Formatted string literals (f-strings) fundamentals
  2. Evaluating expressions, function calls, arithmetic & ternary logic inline
  3. Self-documenting debugging specifier: f"{var=}" (Python 3.8+)
  4. Escaping curly braces: {{ and }}
  5. Explicit conversions: !r (repr), !s (str), !a (ascii)
  6. Multi-line f-strings and quotes
"""

import math
from datetime import datetime

def demonstrate_fstring_expressions():
    print("=" * 65)
    print("1. f-STRING INLINE EXPRESSIONS & TERNARY LOGIC")
    print("=" * 65)

    student_name = "Susmita Mukherjee"
    course = "Python Core & Advanced"
    marks = 94.5
    city = "Barrackpore"

    # 1. Direct variable substitution
    intro = f"Student: {student_name}, Course: {course}, Center: {city}"
    print(f"Basic Substitution:\n  {intro}\n")

    # 2. Arithmetic & math function evaluation
    radius = 7.0
    area = f"Radius: {radius} cm -> Circle Area: {math.pi * (radius ** 2):.2f} sq.cm"
    print(f"Math Expression:\n  {area}\n")

    # 3. Method calls & uppercase transformation
    clean_alert = f"Alert: {student_name.upper()} enrolled from {city.title()}."
    print(f"Method Invocation:\n  {clean_alert}\n")

    # 4. Inline ternary conditional logic
    status = f"Result: {'DISTINCTION' if marks >= 90 else ('PASS' if marks >= 50 else 'FAIL')} (Marks: {marks})"
    print(f"Ternary Condition:\n  {status}")


def demonstrate_debugging_specifier():
    print("\n" + "=" * 65)
    print("2. SELF-DOCUMENTING DEBUGGING: f\"{variable=}\" (Python 3.8+)")
    print("=" * 65)

    batch_id = "PY-2026-B1"
    active_students = 28
    fee_per_student = 4500.0
    total_revenue = active_students * fee_per_student

    # The '=' specifier prints the expression text followed by '=' and the evaluated value
    print("--- Debug Print Output ---")
    print(f"{batch_id=}")
    print(f"{active_students=}")
    print(f"{fee_per_student=}")
    print(f"{active_students * fee_per_student=}")
    print(f"{math.sqrt(total_revenue)=:.2f}")


def demonstrate_escaping_and_conversions():
    print("\n" + "=" * 65)
    print("3. ESCAPING CURLY BRACES & CONVERSION FLAGS (!r, !s, !a)")
    print("=" * 65)

    # Escaping curly braces {{ and }}
    css_class = "student-card"
    css_rule = f".{css_class} {{ padding: 12px; border-radius: 8px; }}"
    print(f"Escaped Braces CSS Rule:\n  {css_rule}\n")

    # Conversion flags:
    # !s calls str()
    # !r calls repr() (shows quotes and exact representations)
    # !a calls ascii() (escapes non-ASCII characters)
    raw_location = "Barrackpore \t\n 'Kolkata' Café"

    print(f"Direct   : {raw_location}")
    print(f"!s (str) : {raw_location!s}")
    print(f"!r (repr): {raw_location!r} (Quotes and escape codes visible)")
    print(f"!a (ascii): {raw_location!a} (Non-ASCII 'é' escaped to \\xe9)")


def demonstrate_datetime_specifiers():
    print("\n" + "=" * 65)
    print("4. DATETIME FORMAT SPECIFIERS INSIDE f-STRINGS")
    print("=" * 65)

    now = datetime(2026, 8, 24, 18, 30, 0)
    print(f"Raw Datetime Object : {now}")
    print(f"ISO Standard Date   : {now:%Y-%m-%d}")
    print(f"Indian Standard Date: {now:%d-%b-%Y}")
    print(f"Full Timestamp      : {now:%A, %d %B %Y at %I:%M %p}")


if __name__ == "__main__":
    demonstrate_fstring_expressions()
    demonstrate_debugging_specifier()
    demonstrate_escaping_and_conversions()
    demonstrate_datetime_specifiers()
