# args_realworld.py
# Real-world uses of *args

# 1. Flexible logger
def log(level, *messages):
    """Log messages at given level. Can log multiple messages in one call."""
    for msg in messages:
        print(f"[{level.upper()}] {msg}")

log("error", "Disk full", "Backup failed")
log("info", "User connected", "Loading preferences", "Ready")

# 2. Math functions
def geometric_mean(first, *rest):
    """First argument required, then any number of additional numbers."""
    product = first
    for num in rest:
        product *= num
    return product ** (1 / (1 + len(rest)))

print(geometric_mean(4, 9))          # sqrt(4*9)=6
print(geometric_mean(2, 8, 16))      # cube root(2*8*16)= cube root(256)=6.349

# 3. String formatter (like join but custom)
def join_strings(separator=" ", *strings):
    return separator.join(strings)

print(join_strings(", ", "apple", "banana", "cherry"))
print(join_strings(" - ", "Barrackpore", "Shyamnagar", "Ichapur", "Naihati"))

# 4. Decorator that accepts any number of arguments
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_sum(*nums):
    total = 0
    for n in nums:
        total += n
        time.sleep(0.1)
    return total

slow_sum(1, 2, 3, 4, 5)