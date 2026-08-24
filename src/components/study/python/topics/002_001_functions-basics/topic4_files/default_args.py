# default_args.py
# Demonstrating default arguments (parameters with predefined values)

def greet(name, greeting="Hello"):
    """greeting has a default value of "Hello" """
    print(f"{greeting}, {name}!")

# Calling without providing default argument
greet("Tuhina")                 # Uses default: "Hello"
greet("Swadeep", "Namaste")     # Overrides default
greet(name="Abhronila")         # Keyword, default used for greeting
greet(name="Debangshu", greeting="Hey")  # Both keyword

# Required parameters must come before default parameters
# def wrong_order(default="Hi", required):  # SyntaxError!
#     pass

# Default values can be any expression (but evaluated only once)
def register(username, password, role="student"):
    print(f"Registered {username} as {role}")

register("swadeep_123", "pass123")                    # role defaults to "student"
register("tuhina_456", "pass456", "teacher")         # role overridden