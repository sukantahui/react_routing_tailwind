# args_basic.py
# Basic usage of *args

def total(*numbers):
    """Returns the sum of all provided numbers."""
    print(f"Received numbers: {numbers} (type: {type(numbers)})")
    return sum(numbers)

# Calling with different numbers of arguments
print(total(1, 2, 3))           # 6
print(total(10, 20, 30, 40))    # 100
print(total(5))                 # 5
print(total())                  # 0 (empty tuple)

def average(*scores):
    """Calculate average of any number of scores."""
    if not scores:
        return 0
    return sum(scores) / len(scores)

print(average(85, 90, 78))      # 84.333...
print(average(92, 88))          # 90.0