# default_mutable.py
# The mutable default trap and how to avoid it

# ❌ DANGEROUS: default list is shared across calls
def add_item_bad(item, basket=[]):
    basket.append(item)
    return basket

print("BAD (shared list):")
print(add_item_bad("apple"))   # ['apple']
print(add_item_bad("banana"))  # ['apple', 'banana'] ← unexpected!
print(add_item_bad("cherry"))  # ['apple', 'banana', 'cherry']

# ✅ SAFE: use None and create a new list each time
def add_item_good(item, basket=None):
    if basket is None:
        basket = []
    basket.append(item)
    return basket

print("\nGOOD (fresh list each call):")
print(add_item_good("apple"))   # ['apple']
print(add_item_good("banana"))  # ['banana']
print(add_item_good("cherry"))  # ['cherry']

# Same applies to dictionaries
def add_pair_bad(key, value, d={}):   # ❌ shared dict
    d[key] = value
    return d

def add_pair_good(key, value, d=None): # ✅ safe
    if d is None:
        d = {}
    d[key] = value
    return d