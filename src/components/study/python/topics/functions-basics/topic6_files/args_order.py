# args_order.py
# Correct and incorrect ordering of *args

# ✅ CORRECT: required, default, *args
def func1(a, b=2, *args):
    print(f"a={a}, b={b}, args={args}")

func1(1)               # a=1, b=2, args=()
func1(1, 5)            # a=1, b=5, args=()
func1(1, 5, 10, 20)    # a=1, b=5, args=(10,20)

# ❌ INCORRECT: *args before default
# def func2(a, *args, b=2):   # b becomes keyword-only! (sometimes intended, but not for beginners)
#     pass

# ✅ Using *args after all positional parameters
def log(level, *messages):
    """level is required, then any number of messages."""
    for msg in messages:
        print(f"[{level}] {msg}")

log("INFO", "Server started", "User logged in", "Data loaded")

# ❌ Common mistake: trying to pass a list as multiple args
def sum_all(*nums):
    return sum(nums)

my_list = [1, 2, 3]
# print(sum_all(my_list))   # TypeError: unsupported operand type(s) for +: 'int' and 'list'
# Instead, unpack the list:
print(sum_all(*my_list))      # works: 6