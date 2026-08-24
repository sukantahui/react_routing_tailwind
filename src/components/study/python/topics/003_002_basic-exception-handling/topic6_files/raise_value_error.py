try:
    value = int(input())
    if value < 0:
        raise ValueError("Must be positive")
except ValueError as e:
    print(f"Error: {e}")
