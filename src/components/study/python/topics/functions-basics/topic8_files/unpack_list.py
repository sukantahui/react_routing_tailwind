# unpack_list.py
# Unpacking lists and tuples with * in function calls

def calculate_total(price, tax, discount):
    """Calculate final price after tax and discount."""
    total = price + tax - discount
    print(f"Price: {price}, Tax: {tax}, Discount: {discount} → Total: {total}")
    return total

# Normal call with separate arguments
calculate_total(100, 18, 10)

# Data already in a list
order1 = [100, 18, 10]
calculate_total(*order1)   # unpack list into three arguments

# Data in a tuple
order2 = (200, 36, 20)
calculate_total(*order2)   # unpack tuple

# Mixed with regular arguments (positional before unpack)
calculate_total(50, *[9, 5])   # price=50, tax=9, discount=5

# Unpacking with too many/few elements -> TypeError
# order3 = [100, 18, 10, 99]
# calculate_total(*order3)  # TypeError: takes 3 positional arguments but 4 were given

# Unpacking strings (works, but rarely useful)
def show(a, b, c):
    print(a, b, c)

show(*"abc")   # 'a', 'b', 'c'