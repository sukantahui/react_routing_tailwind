# args_with_other.py
# Combining normal parameters, default parameters, and *args

def introduce(greeting, name="Guest", *hobbies):
    """
    greeting: required positional
    name: default parameter
    *hobbies: variable-length args (optional)
    """
    print(f"{greeting}, my name is {name}.")
    if hobbies:
        print("My hobbies include:")
        for h in hobbies:
            print(f"  - {h}")
    else:
        print("No hobbies listed.")

# Different calls
introduce("Hello", "Swadeep", "coding", "chess", "reading")
introduce("Hi", "Tuhina")                       # no hobbies
introduce("Namaste", hobbies=["dancing", "singing"])  # keyword for hobbies? No – *args can't take keyword
# Instead: introduce("Namaste", "Abhronila", "dancing", "singing")

def multiply(multiplier=2, *numbers):
    """Multiplier is default (can be overridden), numbers are multiplied."""
    result = 1
    for n in numbers:
        result *= n
    return result * multiplier

print(multiply(3, 2, 4, 5))   # multiplier=3, numbers=(2,4,5) → 3*2*4*5=120
print(multiply(1, 2, 3))      # multiplier=1, numbers=(2,3) → 6