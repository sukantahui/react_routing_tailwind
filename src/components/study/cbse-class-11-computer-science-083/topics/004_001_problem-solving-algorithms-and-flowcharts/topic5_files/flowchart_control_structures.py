"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Problem Solving
Topic: Developing Flowcharts for Sequential, Decision-Making, and Iterative Problems

This module demonstrates the three fundamental control structures in programming:
1. Sequential Execution (Linear Flow)
2. Decision-Making (Branching / Selection)
3. Iteration (Looping / Repetition)
"""

def sequential_example(principal: float, rate: float, time_years: float) -> dict:
    """
    1. SEQUENTIAL CONTROL STRUCTURE:
    Every step is executed in strict sequence from top to bottom.
    Problem: Simple Interest Calculation
    Formula: SI = (P * R * T) / 100
             Total = P + SI
    """
    trace = []
    trace.append(f"Step 1: Input P={principal}, R={rate}%, T={time_years} years")
    
    # Process 1: Calculate Simple Interest
    simple_interest = (principal * rate * time_years) / 100.0
    trace.append(f"Step 2: Calculate SI = ({principal} * {rate} * {time_years}) / 100 = {simple_interest:.2f}")
    
    # Process 2: Calculate Total Amount
    total_amount = principal + simple_interest
    trace.append(f"Step 3: Calculate Total = {principal} + {simple_interest:.2f} = {total_amount:.2f}")
    
    trace.append(f"Step 4: Output Simple Interest: {simple_interest:.2f}, Total: {total_amount:.2f}")
    
    return {
        "structure": "Sequential",
        "simple_interest": simple_interest,
        "total_amount": total_amount,
        "trace": trace
    }


def decision_making_example(num1: float, num2: float, num3: float) -> dict:
    """
    2. DECISION-MAKING (SELECTION / BRANCHING) STRUCTURE:
    Execution path diverges based on the evaluation of boolean conditions.
    Problem: Find Largest of Three Distinct Numbers
    """
    trace = []
    trace.append(f"Step 1: Input numbers A={num1}, B={num2}, C={num3}")
    
    largest = None
    path_taken = []
    
    if num1 >= num2:
        path_taken.append("Branch: num1 >= num2 is TRUE")
        if num1 >= num3:
            path_taken.append("Branch: num1 >= num3 is TRUE -> A is Largest")
            largest = num1
        else:
            path_taken.append("Branch: num1 >= num3 is FALSE -> C is Largest")
            largest = num3
    else:
        path_taken.append("Branch: num1 >= num2 is FALSE")
        if num2 >= num3:
            path_taken.append("Branch: num2 >= num3 is TRUE -> B is Largest")
            largest = num2
        else:
            path_taken.append("Branch: num2 >= num3 is FALSE -> C is Largest")
            largest = num3
            
    trace.extend(path_taken)
    trace.append(f"Step 3: Output Largest Number = {largest}")
    
    return {
        "structure": "Decision-Making",
        "largest": largest,
        "path": path_taken,
        "trace": trace
    }


def iterative_loop_example(n: int) -> dict:
    """
    3. ITERATIVE (LOOPING / REPETITION) STRUCTURE:
    A block of instructions is repeatedly executed while a condition remains True.
    Problem: Compute Factorial of N (N!) and Sum of First N Natural Numbers
    """
    if n < 0:
        return {"error": "Factorial is undefined for negative integers."}
        
    trace = []
    trace.append(f"Step 1: Input N = {n}")
    trace.append("Step 2: Initialize fact = 1, sum_n = 0, count = 1")
    
    fact = 1
    sum_n = 0
    iteration_table = []
    
    for count in range(1, n + 1):
        prev_fact = fact
        prev_sum = sum_n
        fact = fact * count
        sum_n = sum_n + count
        
        iteration_table.append({
            "iteration": count,
            "fact_calc": f"{prev_fact} * {count} = {fact}",
            "sum_calc": f"{prev_sum} + {count} = {sum_n}",
            "condition_check": f"count ({count}) <= N ({n})"
        })
        trace.append(f"Iteration {count}: fact={fact}, sum={sum_n}")
        
    trace.append(f"Step 3: Loop terminates when count ({n + 1}) > N ({n})")
    trace.append(f"Step 4: Output Factorial = {fact}, Sum = {sum_n}")
    
    return {
        "structure": "Iterative",
        "n": n,
        "factorial": fact,
        "sum": sum_n,
        "table": iteration_table,
        "trace": trace
    }


if __name__ == "__main__":
    print("=== 1. SEQUENTIAL CONTROL STRUCTURE DEMO ===")
    seq_res = sequential_example(10000, 7.5, 3)
    for line in seq_res["trace"]:
        print(line)
        
    print("\n=== 2. DECISION-MAKING CONTROL STRUCTURE DEMO ===")
    dec_res = decision_making_example(45, 89, 23)
    for line in dec_res["trace"]:
        print(line)
        
    print("\n=== 3. ITERATIVE CONTROL STRUCTURE DEMO ===")
    iter_res = iterative_loop_example(5)
    for line in iter_res["trace"]:
        print(line)
