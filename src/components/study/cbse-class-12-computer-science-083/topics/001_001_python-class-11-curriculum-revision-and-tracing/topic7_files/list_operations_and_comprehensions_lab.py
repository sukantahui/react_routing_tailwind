# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 7: List Operations: Nested Lists, Comprehensions, Slicing & Methods
# =====================================================================

# 1. Mutability and Slicing Operations
fruits = ["Apple", "Banana", "Cherry", "Date"]
fruits[1] = "Blueberry"       # In-place replacement
print("Updated list:", fruits)

fruits.append("Elderberry")   # Adds to end
fruits.insert(1, "Apricot")   # Inserts at index 1
print("After append & insert:", fruits)

# 2. Removing Items
removed_item = fruits.pop()   # Removes and returns last item
print(f"Popped item: '{removed_item}', Remaining: {fruits}")
fruits.remove("Apple")        # Removes first matching value
print("After remove('Apple'):", fruits)

# 3. In-Place Sorting vs Built-in sorted()
scores = [88, 42, 95, 73, 61]
sorted_copy = sorted(scores)  # Returns new sorted list
print(f"Original: {scores}, sorted() copy: {sorted_copy}")
scores.sort(reverse=True)     # In-place sort in descending order
print(f"scores.sort(reverse=True) mutated: {scores}")

# 4. List Comprehensions
# Syntax: [expression for item in iterable if condition]
numbers = range(1, 11)
even_squares = [x ** 2 for x in numbers if x % 2 == 0]
print(f"\nEven squares from 1 to 10: {even_squares}")

# 5. Nested Lists & Matrix Traversal
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(f"\nMatrix element at row 1, col 2: {matrix[1][2]}")
flattened = [val for row in matrix for val in row]
print(f"Flattened matrix: {flattened}")
