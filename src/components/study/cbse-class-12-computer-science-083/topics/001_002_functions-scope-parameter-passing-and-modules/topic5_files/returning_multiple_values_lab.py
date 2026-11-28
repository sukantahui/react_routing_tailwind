# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 5: Returning Multiple Values using Tuples and Unpacking
# =====================================================================

# In Python, a function can return multiple comma-separated values.
# Under the hood, Python PACKS them into a single TUPLE object!

def calculate_statistics(numbers):
    """
    Computes count, sum, average, min, and max of a numeric list.
    Returns 5 values as a packaged tuple.
    """
    count = len(numbers)
    total = sum(numbers)
    avg = total / count if count > 0 else 0
    minimum = min(numbers)
    maximum = max(numbers)
    # Returning 5 comma-separated values (Implicit Tuple Packing)
    return count, total, avg, minimum, maximum

data = [12, 45, 67, 89, 23, 56, 91]

# 1. Receiving Returned Values as a Single Tuple
stats_tuple = calculate_statistics(data)
print("1. Packed Tuple Return:", stats_tuple)
print("Type of return object:", type(stats_tuple))

# 2. Unpacking Directly into Individual Variables
n_count, n_sum, n_avg, n_min, n_max = calculate_statistics(data)
print(f"\n2. Unpacked Variables:")
print(f"   Count: {n_count}")
print(f"   Sum: {n_sum}")
print(f"   Average: {n_avg:.2f}")
print(f"   Min: {n_min}")
print(f"   Max: {n_max}")

# 3. Arithmetic Operations with Multi-Value Returns
def div_and_mod(dividend, divisor):
    quotient = dividend // divisor
    remainder = dividend % divisor
    return quotient, remainder

q, r = div_and_mod(17, 5)
print(f"\n17 div 5 -> Quotient: {q}, Remainder: {r}")
