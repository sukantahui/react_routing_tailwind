# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 4: Default Parameters: Rules for Placement
# =====================================================================

# 1. Statutory Placement Rule:
# Default arguments MUST be placed at the END of the parameter list.
# A non-default parameter CANNOT follow a default parameter.

# LEGAL DEFINITION:
def calculate_interest(principal, time=1, rate=0.05):
    """
    principal: required non-default parameter
    time: default parameter (defaults to 1 year)
    rate: default parameter (defaults to 5% or 0.05)
    """
    si = principal * rate * time
    return si

# ILLEGAL DEFINITION (SyntaxError: non-default argument follows default argument):
# def invalid_calc(rate=0.05, principal):
#     pass

print("--- 1. Testing Default Argument Invocations ---")
# Case A: Providing only required parameter (both defaults used)
print("P=10000, defaults: SI =", calculate_interest(10000))

# Case B: Overriding 'time', keeping default 'rate'
print("P=10000, time=3, default rate: SI =", calculate_interest(10000, 3))

# Case C: Overriding both 'time' and 'rate'
print("P=10000, time=2, rate=0.08: SI =", calculate_interest(10000, 2, 0.08))

# Case D: Overriding 'rate' using keyword argument, keeping default 'time'
print("P=10000, override rate keyword: SI =", calculate_interest(10000, rate=0.10))

# 2. Mutable Default Argument Trap (The Classic Python Gotcha!)
print("\n--- 2. Mutable Default Argument Trap ---")
def append_to_cart(item, cart=[]):
    cart.append(item)
    return cart

print("Customer 1:", append_to_cart("Book"))
print("Customer 2 (Shared mutable default!):", append_to_cart("Pen"))
# Notice how 'Pen' was added to the SAME list as 'Book'!

# Correct Idiomatic Pattern:
def append_to_cart_safe(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart

print("Safe Customer 1:", append_to_cart_safe("Book"))
print("Safe Customer 2 (Independent list):", append_to_cart_safe("Pen"))
