# topic2_files/datetime_and_time_modules.py
# Module: 002_009_modules-packages
# Topic: Built-in standard library modules: math, random, datetime, sys, os
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: datetime, timedelta & time Standard Library Modules
Demonstrates:
  1. Creating and inspecting date, time, and datetime objects
  2. Timedelta arithmetic (Adding/subtracting days, computing date differences)
  3. Formatting with strftime() and parsing strings with strptime()
  4. High-resolution benchmarking with time.perf_counter()
"""

import datetime as dt
import time

def demonstrate_datetime_and_timedelta():
    print("=" * 65)
    print("1. datetime & timedelta: DATE ARITHMETIC")
    print("=" * 65)

    # Current date and time
    now = dt.datetime(2026, 8, 24, 18, 30, 0)
    today = now.date()
    print(f"Current Datetime     : {now}")
    print(f"Date Component       : {today}\n")

    # Timedelta Arithmetic
    days_to_exam = dt.timedelta(days=45)
    exam_date = today + days_to_exam
    print(f"Exam Scheduled Date  : {exam_date} (+45 days)")

    # Date difference calculation
    course_start = dt.date(2026, 7, 1)
    elapsed = today - course_start
    print(f"Days Since Batch Start: {elapsed.days} days completed\n")


def demonstrate_strftime_and_strptime():
    print("=" * 65)
    print("2. strftime() (FORMATTING) VS strptime() (PARSING)")
    print("=" * 65)

    # A. strftime: datetime -> String
    current_moment = dt.datetime(2026, 8, 24, 18, 30, 0)
    formatted_in = current_moment.strftime("%d-%b-%Y (%A) at %I:%M %p")
    iso_format = current_moment.strftime("%Y-%m-%dT%H:%M:%S")

    print(f"strftime() Indian Format : '{formatted_in}'")
    print(f"strftime() ISO-8601      : '{iso_format}'\n")

    # B. strptime: String -> datetime object
    raw_date_str = "15/09/2026 10:00:00"
    parsed_dt = dt.datetime.strptime(raw_date_str, "%d/%m/%Y %H:%M:%S")
    print(f"Raw Input String         : '{raw_date_str}'")
    print(f"strptime() Parsed Object : {parsed_dt} (Type: {type(parsed_dt).__name__})")


def demonstrate_time_perf_counter():
    print("\n" + "=" * 65)
    print("3. time.perf_counter(): HIGH-PRECISION BENCHMARKING")
    print("=" * 65)

    # High-precision timer for algorithm benchmarking
    t_start = time.perf_counter()

    # Perform a light calculation (sum of 1,000,000 numbers)
    total = sum(i ** 2 for i in range(100_000))

    t_end = time.perf_counter()
    duration_ms = (t_end - t_start) * 1000

    print(f"Calculated Sum           : {total}")
    print(f"Execution Duration       : {duration_ms:.3f} milliseconds")


if __name__ == "__main__":
    demonstrate_datetime_and_timedelta()
    demonstrate_strftime_and_strptime()
    demonstrate_time_perf_counter()
