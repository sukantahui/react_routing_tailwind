# topic8_files/findall_finditer_and_groups.py
# Module: 002_007_string-processing
# Topic: Pattern Matching (search, match, findall, sub)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 2: findall() Return Rules, finditer() Streaming & re.split()
Demonstrates:
  1. re.findall() output types:
     - 0 groups: list of strings (full matches)
     - 1 group: list of strings (captured group)
     - 2+ groups: list of tuples of strings
  2. re.finditer(): Memory-efficient lazy generator of Match objects
  3. re.split(): Splitting strings on complex regex patterns
  4. Capturing parentheses in re.split(): Preserving delimiters
"""

import re

def demonstrate_findall_group_rules():
    print("=" * 65)
    print("1. re.findall() GROUP RETURN STRUCTURE RULES")
    print("=" * 65)

    contacts = "Susmita: 96.5% (Barrackpore), Rahul: 88.0% (Kolkata), Priya: 92.0% (Palta)"
    print(f"Target Text: '{contacts}'\n")

    # Rule A: Zero capture groups -> Returns list of full matching strings
    pat_no_group = r"\b[A-Za-z]+:\s*\d+\.\d+%"
    res_no_group = re.findall(pat_no_group, contacts)
    print("A. Zero Groups (r'\\b[A-Za-z]+:\\s*\\d+\\.\\d+%'):")
    print(f"   Returns list of full strings: {res_no_group}\n")

    # Rule B: Exactly One capture group -> Returns list of strings for that group
    pat_one_group = r"\b([A-Za-z]+):\s*\d+\.\d+%"
    res_one_group = re.findall(pat_one_group, contacts)
    print("B. One Group (r'\\b([A-Za-z]+):\\s*\\d+\\.\\d+%'):")
    print(f"   Returns list of captured names: {res_one_group}\n")

    # Rule C: Two or More capture groups -> Returns list of TUPLES of strings
    pat_multi_groups = r"\b([A-Za-z]+):\s*(\d+\.\d+)%\s*\(([A-Za-z]+)\)"
    res_multi_groups = re.findall(pat_multi_groups, contacts)
    print("C. Three Groups (r'\\b([A-Za-z]+):\\s*(\\d+\\.\\d+)%\\s*\\(([A-Za-z]+)\\)'):")
    print(f"   Returns list of tuples (Name, Marks, City):")
    for tup in res_multi_groups:
        print(f"     -> {tup}")


def demonstrate_finditer_streaming():
    print("\n" + "=" * 65)
    print("2. re.finditer(): STREAMING Match OBJECTS LAZILY")
    print("=" * 65)

    log_stream = """
2026-08-24 10:00:15 - USER: 101 - LOGIN SUCCESS
2026-08-24 10:05:22 - USER: 102 - FAILED PASSWORD
2026-08-24 10:12:40 - USER: 101 - PURCHASE COURSE
"""

    log_pattern = re.compile(
        r"(?P<ts>\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\s-\sUSER:\s(?P<uid>\d+)\s-\s(?P<action>.+)"
    )

    print("Iterating Match objects via re.finditer():")
    for match in log_pattern.finditer(log_stream):
        ts = match.group("ts")
        uid = match.group("uid")
        action = match.group("action")
        start_idx, end_idx = match.span()
        print(f"  [Span: {start_idx:>3}:{end_idx:>3}] User {uid:>3} performed '{action:<16}' at {ts}")


def demonstrate_regex_split():
    print("\n" + "=" * 65)
    print("3. re.split(): ADVANCED REGEX DELIMITER SPLITTING")
    print("=" * 65)

    # Splitting by multiple irregular separators: commas, semicolons, pipes, or spaces
    messy_tags = "Python,  SQL;  FastAPI |  React ,,,   TailwindCSS"
    clean_tokens = re.split(r"[,;|\s]+", messy_tags.strip())
    print(f"Raw String     : '{messy_tags}'")
    print(f"re.split()     : {clean_tokens}\n")

    # Retaining delimiters using capturing parentheses ()
    formula = "10+25*4-100/5"
    tokens_with_delims = re.split(r"([+\-*/])", formula)
    print(f"Math Formula   : '{formula}'")
    print(f"Captured Split : {tokens_with_delims} (Operators preserved!)")


if __name__ == "__main__":
    demonstrate_findall_group_rules()
    demonstrate_finditer_streaming()
    demonstrate_regex_split()
