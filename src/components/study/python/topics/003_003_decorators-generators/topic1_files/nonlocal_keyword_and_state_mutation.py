# topic1_files/nonlocal_keyword_and_state_mutation.py
# Module: 003_003_decorators-generators
# Topic: Inner functions and variable scope closures
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: The `nonlocal` Keyword & Stateful Closures
Demonstrates:
  1. Why reassigning enclosing variables fails with `UnboundLocalError` without `nonlocal`
  2. Using the `nonlocal` keyword to mutate enclosing state across function calls
  3. Building a stateful student enrollment counter closure
"""

def make_enrollment_counter(starting_count: int = 0):
    """Creates a stateful counter closure encapsulating mutable state."""
    count = starting_count

    def increment_and_enroll(student_name: str) -> str:
        # Declare `count` as nonlocal to mutate enclosing variable:
        nonlocal count
        count += 1
        return f"Enrolled Student #{count:03d}: {student_name} (Total Active: {count})"

    return increment_and_enroll


def make_running_average_tracker():
    """Creates a stateful closure calculating rolling average of exam scores."""
    total_score = 0.0
    count = 0

    def add_score(new_score: float) -> float:
        nonlocal total_score, count
        total_score += new_score
        count += 1
        return total_score / count

    return add_score


def demonstrate_nonlocal_mutation():
    print("=" * 70)
    print("CODER & ACCOTAX - THE `nonlocal` KEYWORD & STATEFUL CLOSURES")
    print("=" * 70)

    # 1. Stateful Enrollment Counter:
    print("1. Incrementing Stateful Enrollment Counter:")
    barrackpore_counter = make_enrollment_counter(starting_count=100)

    print(f"   * {barrackpore_counter('Sourav Mukherjee')}")
    print(f"   * {barrackpore_counter('Priyanka Sen')}")
    print(f"   * {barrackpore_counter('Rahul Verma')}\n")

    # 2. Stateful Running Average Tracker:
    print("2. Stateful Rolling Exam Score Average Tracker:")
    avg_tracker = make_running_average_tracker()

    print(f"   Adding Score 85.0 -> Current Running Avg: {avg_tracker(85.0):.2f}")
    print(f"   Adding Score 95.0 -> Current Running Avg: {avg_tracker(95.0):.2f}")
    print(f"   Adding Score 90.0 -> Current Running Avg: {avg_tracker(90.0):.2f}")

    print("\n[PASSED] Nonlocal Keyword & Stateful Closures Verified.")


if __name__ == "__main__":
    demonstrate_nonlocal_mutation()
