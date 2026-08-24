# topic5_files/format_method_and_legacy_interpolation.py
# Module: 002_007_string-processing
# Topic: Advanced Formatting (f-strings, format() method, padding, alignment)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 5 - File 3: str.format() Method, Legacy % Interpolation & Performance Comparison
Demonstrates:
  1. str.format() positional & named placeholders
  2. Unpacking dictionaries (**dict) & lists (*list) into format()
  3. Reusing and reordering placeholders
  4. Legacy % printf-style string formatting
  5. Speed benchmark: f-strings vs str.format() vs % vs '+'
"""

import time

def demonstrate_format_method():
    print("=" * 65)
    print("1. str.format() METHOD (POSITIONAL & NAMED)")
    print("=" * 65)

    # 1. Positional placeholders
    template_pos = "Student {0} from {1} scored {2:.1f}% in Python."
    msg1 = template_pos.format("Susmita", "Barrackpore", 96.5)
    print(f"Positional format():\n  {msg1}\n")

    # 2. Named keyword placeholders
    template_named = "Enrollment: {name} (ID: {student_id}) enrolled for course '{course}'."
    msg2 = template_named.format(name="Rahul Roy", student_id="PY-9402", course="Data Science")
    print(f"Named format():\n  {msg2}\n")

    # 3. Argument reuse & reordering
    math_rule = "{0} squared is {1}, and {0} cubed is {2}."
    print(f"Reused Arguments:\n  {math_rule.format(5, 5**2, 5**3)}\n")

    # 4. Dictionary unpacking (**dict)
    config = {
        "host": "localhost",
        "port": 5432,
        "db": "accounting_db",
        "user": "sukanta_admin"
    }
    db_uri = "postgresql://{user}@{host}:{port}/{db}".format(**config)
    print(f"Dictionary Unpacking (**config):\n  {db_uri}")


def demonstrate_legacy_percent_formatting():
    print("\n" + "=" * 65)
    print("2. LEGACY % (PRINTF-STYLE) FORMATTING")
    print("=" * 65)

    name = "Ankan"
    marks = 88.75
    rank = 3

    # %s for string, %d for integer, %.2f for float
    legacy_msg = "Student %s ranked #%d with score %.1f%%" % (name, rank, marks)
    print(f"Legacy %s/%d/%.2f  : {legacy_msg}")

    # Named % dictionary mapping
    named_legacy = "Invoice %(inv_id)06d: INR %(total).2f" % {"inv_id": 428, "total": 4500.0}
    print(f"Named %(key)s     : {named_legacy}")


def benchmark_formatting_speeds():
    print("\n" + "=" * 65)
    print("3. BENCHMARK: f-STRINGS VS str.format() VS % VS '+'")
    print("=" * 65)

    student = "Susmita"
    center = "Barrackpore"
    score = 95.5
    iterations = 500000

    # 1. f-string (Compiled to optimized bytecode BUILD_STRING opcode)
    t0 = time.perf_counter()
    for _ in range(iterations):
        _ = f"Student {student} at {center} scored {score:.1f}"
    time_fstring = time.perf_counter() - t0

    # 2. str.format()
    t0 = time.perf_counter()
    for _ in range(iterations):
        _ = "Student {} at {} scored {:.1f}".format(student, center, score)
    time_format = time.perf_counter() - t0

    # 3. % formatting
    t0 = time.perf_counter()
    for _ in range(iterations):
        _ = "Student %s at %s scored %.1f" % (student, center, score)
    time_percent = time.perf_counter() - t0

    # 4. '+' Concatenation
    t0 = time.perf_counter()
    for _ in range(iterations):
        _ = "Student " + student + " at " + center + " scored " + str(score)
    time_plus = time.perf_counter() - t0

    print(f"Iterations             : {iterations:,}")
    print(f"1. f-Strings (f'...')  : {time_fstring * 1000:.2f} ms (FASTEST - Direct Bytecode)")
    print(f"2. %-Formatting (%)    : {time_percent * 1000:.2f} ms ({time_percent / time_fstring:.2f}x slower)")
    print(f"3. '+' Concatenation   : {time_plus * 1000:.2f} ms ({time_plus / time_fstring:.2f}x slower)")
    print(f"4. str.format()        : {time_format * 1000:.2f} ms ({time_format / time_fstring:.2f}x slower)")


if __name__ == "__main__":
    demonstrate_format_method()
    demonstrate_legacy_percent_formatting()
    benchmark_formatting_speeds()
