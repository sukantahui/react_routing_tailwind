# empty_return.py
# Using 'return' without a value (early exit)

def process_data(data):
    """Process data, but exit early if data is empty."""
    if not data:
        print("No data to process")
        return   # returns None
    print(f"Processing {len(data)} items...")
    # more processing here
    return   # also returns None (optional at end)

result1 = process_data([])
print(f"Empty data returned: {result1}")

result2 = process_data([1, 2, 3])
print(f"Non‑empty data returned: {result2}")

# Early return in validation
def validate_age(age):
    if age < 0:
        print("Age cannot be negative")
        return
    if age > 150:
        print("Age too high")
        return
    print(f"Age {age} is valid")
    # No explicit return – still returns None

validate_age(-5)
validate_age(200)
validate_age(25)