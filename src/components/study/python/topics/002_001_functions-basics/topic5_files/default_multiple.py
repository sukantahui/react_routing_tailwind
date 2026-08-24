# default_multiple.py
# Functions with multiple default parameters

def register_user(name, age, city="Barrackpore", active=True, role="learner"):
    print(f"Name: {name}, Age: {age}, City: {city}, Active: {active}, Role: {role}")

# Using all defaults for city, active, role
register_user("Swadeep", 17)

# Override only role (using keyword to skip others)
register_user("Tuhina", 16, role="mentor")

# Override city and active, leave role default
register_user("Abhronila", 15, city="Ichapur", active=False)

# Positional + keyword mix
register_user("Debangshu", 17, "Naihati", role="admin")