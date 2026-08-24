# topic8_files/generator_fundamentals_and_yield_mechanics.py
# Module: 003_003_decorators-generators
# Topic: Generators & the yield statement
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 1: Generator Fundamentals & The `yield` Statement
Demonstrates:
  1. What happens when a function contains the `yield` keyword (Returns a Generator Object)
  2. Frame pausing (suspending) and state retention across `next()` invocations
  3. Inspecting CPython generator frame state (`gi_running`, `gi_frame`)
"""

import inspect

def simple_course_generator():
    """A generator function that yields institutional course modules."""
    print("  [EXECUTION RESUMED] Step 1: Preparing Python Core...")
    yield "MODULE-1: Python Core & Syntax"

    print("  [EXECUTION RESUMED] Step 2: Preparing Data Structures...")
    yield "MODULE-2: OOP & Data Structures"

    print("  [EXECUTION RESUMED] Step 3: Preparing Decorators & Generators...")
    yield "MODULE-3: Decorators & Generators"

    print("  [EXECUTION RESUMED] Step 4: Reached end of generator body.")


def demonstrate_generator_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - GENERATOR FUNDAMENTALS & `yield` MECHANICS")
    print("=" * 70)

    # 1. Calling a generator function does NOT execute its body!
    print("1. Instantiating Generator Function:")
    gen = simple_course_generator()
    print(f"   Returned Object : {gen}")
    print(f"   Object Type     : {type(gen)}")
    print(f"   Is Generator?   : {inspect.isgenerator(gen)}")
    print(f"   Generator State : {inspect.getgeneratorstate(gen)} (GEN_CREATED)\n")

    # 2. Stepping through with next():
    print("2. First `next(gen)` Invocation:")
    item1 = next(gen)
    print(f"   -> Received Item: {item1}")
    print(f"   -> Generator State: {inspect.getgeneratorstate(gen)} (GEN_SUSPENDED)\n")

    print("3. Second `next(gen)` Invocation:")
    item2 = next(gen)
    print(f"   -> Received Item: {item2}")
    print(f"   -> Generator State: {inspect.getgeneratorstate(gen)} (GEN_SUSPENDED)\n")

    print("4. Third `next(gen)` Invocation:")
    item3 = next(gen)
    print(f"   -> Received Item: {item3}\n")

    # 3. Exhaustion & StopIteration:
    print("5. Fourth `next(gen)` Invocation (Triggers StopIteration):")
    try:
        next(gen)
    except StopIteration:
        print("   [CAUGHT EXPECTED StopIteration] Generator has completed execution.")
        print(f"   Final State : {inspect.getgeneratorstate(gen)} (GEN_CLOSED)")

    print("\n[PASSED] Generator Fundamentals & yield Mechanics Verified.")


if __name__ == "__main__":
    demonstrate_generator_fundamentals()
