# no_return.py
# Functions without any return statement

def greet(name):
    """Prints a greeting but returns nothing."""
    print(f"Hello, {name}!")

def update_counter(counter):
    """Increments a counter (modifies mutable list) but no return."""
    counter[0] += 1

# Calling the functions
result1 = greet("Swadeep")
print(f"greet() returned: {result1}")  # None

my_counter = [0]
update_counter(my_counter)
print(f"Counter after update: {my_counter[0]}")  # 1
result2 = update_counter(my_counter)
print(f"update_counter() returned: {result2}")  # None

# Demonstrating that None is a real object
print(type(result1))  # <class 'NoneType'>