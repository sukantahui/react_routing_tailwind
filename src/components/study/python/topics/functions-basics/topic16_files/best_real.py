# Use type hints, defaults, and avoid side effects
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"