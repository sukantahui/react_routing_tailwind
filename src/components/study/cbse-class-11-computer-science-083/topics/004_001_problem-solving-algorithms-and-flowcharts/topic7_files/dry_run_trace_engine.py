"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Problem Solving
Topic: Tracing Flowcharts and Algorithms with Dry-Run Execution Tables

This script demonstrates desk-checking and generating structured execution
trace tables for classical algorithms tested in CBSE board exams.
"""

def trace_sum_of_digits(n: int) -> dict:
    """
    Problem: Find the sum of digits of a given integer N
    Algorithm:
      1. sum = 0, num = N
      2. WHILE num > 0 DO
           digit = num % 10
           sum = sum + digit
           num = num // 10
         ENDWHILE
    """
    table = []
    num = abs(n)
    sum_digits = 0
    step = 0
    
    while num > 0:
        step += 1
        digit = num % 10
        prev_sum = sum_digits
        sum_digits += digit
        next_num = num // 10
        
        table.append({
            "step": step,
            "current_num": num,
            "condition_check": f"{num} > 0 -> TRUE",
            "extracted_digit": digit,
            "sum_calc": f"{prev_sum} + {digit} = {sum_digits}",
            "next_num": next_num
        })
        num = next_num
        
    table.append({
        "step": step + 1,
        "current_num": num,
        "condition_check": f"{num} > 0 -> FALSE (Loop Exits)",
        "extracted_digit": "-",
        "sum_calc": f"Final Sum = {sum_digits}",
        "next_num": "-"
    })
    
    return {
        "algorithm": "Sum of Digits Trace",
        "input_n": n,
        "final_sum": sum_digits,
        "table": table
    }


def trace_reverse_number(n: int) -> dict:
    """
    Problem: Reverse an integer N (e.g. 1234 -> 4321)
    """
    table = []
    num = abs(n)
    rev = 0
    step = 0
    
    while num > 0:
        step += 1
        digit = num % 10
        prev_rev = rev
        rev = (rev * 10) + digit
        next_num = num // 10
        
        table.append({
            "step": step,
            "num": num,
            "digit": digit,
            "calculation": f"({prev_rev} * 10) + {digit} = {rev}",
            "rev": rev,
            "next_num": next_num
        })
        num = next_num
        
    return {
        "algorithm": "Reverse Number Trace",
        "input_n": n,
        "reversed": rev,
        "table": table
    }


if __name__ == "__main__":
    print("=== TRACE TABLE: SUM OF DIGITS (N = 4835) ===")
    res1 = trace_sum_of_digits(4835)
    for row in res1["table"]:
        print(f"Step {row['step']}: num={row['current_num']}, digit={row['extracted_digit']}, sum={row['sum_calc']}")
        
    print("\n=== TRACE TABLE: REVERSE NUMBER (N = 7529) ===")
    res2 = trace_reverse_number(7529)
    for row in res2["table"]:
        print(f"Step {row['step']}: num={row['num']}, digit={row['digit']}, rev={row['rev']}")
