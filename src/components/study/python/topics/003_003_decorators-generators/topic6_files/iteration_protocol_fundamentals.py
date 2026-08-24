# topic6_files/iteration_protocol_fundamentals.py
# Module: 003_003_decorators-generators
# Topic: Iteration protocol: __iter__() and __next__()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 1: Iteration Protocol Fundamentals: Iterable vs Iterator
Demonstrates:
  1. The distinction between an Iterable (`__iter__`) and an Iterator (`__iter__` + `__next__`)
  2. Manual iteration using `iter()` and `next()`
  3. Deconstructing the Python `for` loop into `while True` + `try...except StopIteration`
"""

def demonstrate_iterable_vs_iterator():
    print("=" * 70)
    print("CODER & ACCOTAX - ITERATION PROTOCOL FUNDAMENTALS")
    print("=" * 70)

    # An Iterable (e.g. a list or tuple):
    student_names = ["Sourav Mukherjee", "Priyanka Sen", "Rahul Verma"]
    print(f"1. Iterable Container: {student_names}")
    print(f"   Has `__iter__`: {hasattr(student_names, '__iter__')}")
    print(f"   Has `__next__`: {hasattr(student_names, '__next__')} (Iterable is NOT an Iterator!)\n")

    # 2. Obtaining an Iterator from an Iterable via iter():
    student_iterator = iter(student_names)
    print("2. Obtained Iterator via `iter(student_names)`:")
    print(f"   Iterator Type : {type(student_iterator)}")
    print(f"   Has `__iter__`: {hasattr(student_iterator, '__iter__')}")
    print(f"   Has `__next__`: {hasattr(student_iterator, '__next__')} (Iterator implements BOTH!)\n")

    # 3. Manual stepping using next():
    print("3. Stepping Manually with `next(student_iterator)`:")
    print(f"   Step 1: {next(student_iterator)}")
    print(f"   Step 2: {next(student_iterator)}")
    print(f"   Step 3: {next(student_iterator)}\n")

    # 4. Exhaustion and StopIteration:
    print("4. Attempting `next()` on Exhausted Iterator (Triggers StopIteration):")
    try:
        next(student_iterator)
    except StopIteration:
        print("   [CAUGHT EXPECTED StopIteration] Iterator is completely exhausted!\n")

    # 5. Deconstructing what the `for` loop actually does:
    print("5. Exact Mechanics of Python's `for` Loop Under the Hood:")
    simulated_for_loop(student_names)


def simulated_for_loop(iterable):
    """Exact equivalent of: for item in iterable: print(item)"""
    iterator = iter(iterable)  # 1. Calls iterable.__iter__()

    while True:                # 2. Infinite consumption loop
        try:
            item = next(iterator)  # 3. Calls iterator.__next__()
            print(f"   [FOR-LOOP SIMULATION] Processed: {item}")
        except StopIteration:      # 4. Catches StopIteration and exits cleanly!
            print("   [FOR-LOOP SIMULATION] Encountered StopIteration -> Break Loop.")
            break


if __name__ == "__main__":
    demonstrate_iterable_vs_iterator()
