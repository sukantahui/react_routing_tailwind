# topic7_files/bidirectional_circular_and_sliding_iterators.py
# Module: 003_003_decorators-generators
# Topic: Creating custom iterator classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Sliding Window & Circular Iterator Classes
Demonstrates:
  1. `SlidingWindowIterator`: Yielding fixed-size moving sub-arrays over sequences
  2. `CircularIterator`: Wrapping around a collection for round-robin scheduling
  3. Advanced state cursor manipulation without intermediate full copies
"""

from typing import Sequence, Any, Tuple

class SlidingWindowIterator:
    """Iterates over a sequence yielding overlapping windows of size `window_size`."""

    def __init__(self, data: Sequence[Any], window_size: int = 3):
        if window_size <= 0:
            raise ValueError(f"window_size must be >= 1, got {window_size}")
        self._data = data
        self._window_size = window_size
        self._cursor = 0

    def __iter__(self):
        return self

    def __next__(self) -> Tuple[Any, ...]:
        if self._cursor + self._window_size > len(self._data):
            raise StopIteration("End of sliding window stream.")

        window = tuple(self._data[self._cursor : self._cursor + self._window_size])
        self._cursor += 1
        return window


class CircularIterator:
    """Cycles through a sequence up to `max_cycles` times in round-robin fashion."""

    def __init__(self, data: Sequence[Any], max_cycles: int = 2):
        if not data:
            raise ValueError("Data sequence must not be empty.")
        self._data = data
        self._max_cycles = max_cycles
        self._total_yields_limit = len(data) * max_cycles
        self._yielded_count = 0
        self._index = 0

    def __iter__(self):
        return self

    def __next__(self) -> Any:
        if self._yielded_count >= self._total_yields_limit:
            raise StopIteration("Circular iteration limit reached.")

        item = self._data[self._index]
        self._index = (self._index + 1) % len(self._data)  # Wrap around
        self._yielded_count += 1
        return item


def demonstrate_advanced_iterators():
    print("=" * 70)
    print("CODER & ACCOTAX - SLIDING WINDOW & CIRCULAR ITERATORS")
    print("=" * 70)

    # 1. Sliding Window over Student Exam Scores (3-Exam Moving Average):
    scores = [78.0, 85.0, 92.0, 88.0, 95.0, 90.0]
    print("1. 3-Score Sliding Window over Exam History:")
    slider = SlidingWindowIterator(scores, window_size=3)
    for window in slider:
        avg = sum(window) / len(window)
        print(f"   * Window {window} -> Moving Average: {avg:.2f}")

    # 2. Circular Round-Robin Lab Demonstrator Allocation:
    mentors = ["Sukanta Hui", "Deblina Roy", "Amitava Sen"]
    print("\n2. Round-Robin Lab Support Allocation (2 Cycles):")
    lab_schedule = CircularIterator(mentors, max_cycles=2)
    shift = 1
    for mentor in lab_schedule:
        print(f"   * Shift #{shift:02d}: Assigned Mentor -> {mentor}")
        shift += 1

    print("\n[PASSED] Sliding Window & Circular Iterators Verified.")


if __name__ == "__main__":
    demonstrate_advanced_iterators()
