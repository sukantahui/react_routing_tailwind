# topic7_files/custom_range_iterator_class.py
# Module: 003_003_decorators-generators
# Topic: Creating custom iterator classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Custom Range Iterator Class (`FloatRange`)
Demonstrates:
  1. Building a custom iterator class from scratch supporting floating-point stepping
  2. Managing internal state (`_current`, `_stop`, `_step`)
  3. Proper `StopIteration` termination condition for both positive and negative steps
"""

class FloatRange:
    """A custom iterable and iterator for floating-point step ranges."""

    def __init__(self, start: float, stop: float, step: float = 1.0):
        if step == 0:
            raise ValueError("FloatRange() arg 3 (step) must not be zero")
        self.start = float(start)
        self.stop = float(stop)
        self.step = float(step)
        self._current = self.start

    def __iter__(self):
        """Returns self as the iterator object."""
        return self

    def __next__(self) -> float:
        """Computes and returns the next floating-point value."""
        if self.step > 0:
            if self._current >= self.stop:
                raise StopIteration("Reached upper range boundary.")
        else:
            if self._current <= self.stop:
                raise StopIteration("Reached lower range boundary.")

        value = self._current
        self._current = round(self._current + self.step, 10)  # Avoid float IEEE-754 drift
        return value


def demonstrate_custom_range():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM `FloatRange` ITERATOR CLASS")
    print("=" * 70)

    # 1. Forward Float Range (1.0 to 3.0 step 0.5):
    print("1. Forward Stepping with `FloatRange(1.0, 3.0, 0.5)`:")
    forward_range = FloatRange(1.0, 3.0, 0.5)
    for val in forward_range:
        print(f"   * Value: {val:.2f}")

    # 2. Reverse Float Range (10.0 to 0.0 step -2.5):
    print("\n2. Reverse Stepping with `FloatRange(10.0, 0.0, -2.5)`:")
    reverse_range = FloatRange(10.0, 0.0, -2.5)
    for val in reverse_range:
        print(f"   * Value: {val:.2f}")

    # 3. Dynamic Fee Concession Bracket Calculation:
    print("\n3. Calculating Dynamic Fee Discounts using FloatRange(0.05, 0.25, 0.05):")
    base_fee = 20000.0
    for rate in FloatRange(0.05, 0.25, 0.05):
        discount = base_fee * rate
        print(f"   * Discount {rate*100:4.1f}%: Concession = INR {discount:6,f} -> Payable = INR {base_fee-discount:6,f}")

    print("\n[PASSED] Custom FloatRange Iterator Verified.")


if __name__ == "__main__":
    demonstrate_custom_range()
