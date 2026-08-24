# topic8_files/sub_subn_and_replacement_functions.py
# Module: 002_007_string-processing
# Topic: Pattern Matching (search, match, findall, sub)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 3: re.sub() Backreferences, Custom Callback Functions & re.subn()
Demonstrates:
  1. re.sub() fundamentals with backreferences (\1, \2, \g<name>)
  2. Date format conversion (ISO YYYY-MM-DD -> Indian DD-MM-YYYY)
  3. Dynamic transformation callbacks (Callable function passed to re.sub)
  4. USD to INR currency conversion using regex replacement callback
  5. re.subn(): Tracking total substitution counts
"""

import re

def demonstrate_backreference_substitution():
    print("=" * 65)
    print("1. re.sub() WITH BACKREFERENCES (\\1, \\2, \\g<name>)")
    print("=" * 65)

    # 1. Swapping Date Format: ISO YYYY-MM-DD -> DD-MM-YYYY
    text = "Exam date: 2026-08-24. Registration deadline: 2026-08-15."
    date_pat = r"(\d{4})-(\d{2})-(\d{2})"
    
    # \3 is Day, \2 is Month, \1 is Year
    indian_dates = re.sub(date_pat, r"\3-\2-\1", text)
    print(f"Original Text : '{text}'")
    print(f"Substituted   : '{indian_dates}'\n")

    # 2. Named Group Backreferences (\g<name>)
    named_pat = r"(?P<first>\w+)\s+(?P<last>\w+)"
    names = "Susmita Mukherjee, Rahul Roy, Anirban Banerjee"
    last_first = re.sub(named_pat, r"\g<last>, \g<first>", names)
    print(f"Original Names: '{names}'")
    print(f"Last, First   : '{last_first}'")


def demonstrate_callable_replacement_function():
    print("\n" + "=" * 65)
    print("2. DYNAMIC CALLBACK REPLACEMENT FUNCTIONS IN re.sub()")
    print("=" * 65)

    # Scenario: Convert USD amounts ($XX.XX) to INR (at exchange rate 1 USD = 83.5 INR)
    text = "Courses: Python ($55.00), SQL Analytics ($40.00), React ($65.50)."
    usd_pattern = r"\$(?P<usd>\d+(?:\.\d{2})?)"

    def usd_to_inr_callback(match: re.Match) -> str:
        usd_val = float(match.group("usd"))
        inr_val = usd_val * 83.5
        return f"INR {inr_val:,.2f}"

    inr_text = re.sub(usd_pattern, usd_to_inr_callback, text)
    print(f"USD Text : '{text}'")
    print(f"INR Text : '{inr_text}'\n")

    # Masking Email Usernames (e.g. susmita.student@gmail.com -> s*****a@gmail.com)
    email_text = "Contact: susmita.m@codernaccotax.co.in or admin.support@office.com"
    email_pat = r"(?P<user>[a-zA-Z0-9_.+-]+)@(?P<domain>[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)"

    def mask_email_callback(m: re.Match) -> str:
        u = m.group("user")
        d = m.group("domain")
        masked_user = u[0] + ("*" * (len(u) - 2)) + u[-1] if len(u) > 2 else u[0] + "*"
        return f"{masked_user}@{d}"

    masked_emails = re.sub(email_pat, mask_email_callback, email_text)
    print(f"Masked Email Text:\n  '{masked_emails}'")


def demonstrate_subn():
    print("\n" + "=" * 65)
    print("3. re.subn(): TRACKING SUBSTITUTION COUNTS")
    print("=" * 65)

    paragraph = "Python 2 is old. Python 2 lacks modern features. Migrate from Python 2 today."
    
    # re.subn returns a tuple: (new_string, count_of_replacements)
    updated_text, count = re.subn(r"Python 2", "Python 3", paragraph)
    print(f"Original Text     : '{paragraph}'")
    print(f"Updated Text      : '{updated_text}'")
    print(f"Total Replacements: {count} changes made.")


if __name__ == "__main__":
    demonstrate_backreference_substitution()
    demonstrate_callable_replacement_function()
    demonstrate_subn()
