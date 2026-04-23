# mixed_unpack.py
# Combining multiple unpackings and regular arguments

def display(prefix, a, b, c, suffix="!"):
    print(f"{prefix}: {a}, {b}, {c}{suffix}")

# Multiple * unpackings (Python 3.5+)
display("Values", *[1, 2], *[3])          # prefix="Values", a=1,b=2,c=3
display("Numbers", *[10], *[20, 30])      # a=10,b=20,c=30

# Mix regular arguments after unpacking? No – unpacking must be after all positional
# display(*[1,2], "Hello", 3)  # SyntaxError? Actually works but careful: "Hello" becomes prefix
# Better to keep unpacking at the end of positional args.

# Unpacking dictionaries multiple times
def register(username, email, active=True, role="user"):
    print(f"{username} ({email}) – active={active}, role={role}")

defaults = {"active": True, "role": "user"}
overrides = {"role": "admin", "email": "admin@example.com"}
specific = {"username": "swadeep"}

# Order matters: later dicts override earlier keys
register(**defaults, **overrides, **specific)
# result: username='swadeep', email='admin@example.com', active=True, role='admin'

# Merge dictionaries in a call (Python 3.5+)
register(**defaults, **overrides)   # missing 'username' -> TypeError

# With regular keyword arguments
register("tuhina", "t@example.com", **{"active": False})