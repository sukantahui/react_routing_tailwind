# none_realworld.py
# Real-world usage of None as a sentinel

# 1. Database lookup (simulated)
user_database = {
    "swadeep": {"name": "Swadeep", "city": "Barrackpore"},
    "tuhina": {"name": "Tuhina", "city": "Shyamnagar"}
}

def get_user(username):
    """Return user dict if exists, else None."""
    return user_database.get(username)  # .get returns None if missing

user = get_user("abhronila")
if user is None:
    print("User not found, creating new profile...")
else:
    print(f"Welcome back {user['name']}")

# 2. Caching with None as "not yet computed"
cache = {}

def expensive_computation(key):
    if key in cache:
        result = cache[key]
        if result is None:
            print(f"Key {key} is being computed...")
        else:
            print(f"Returning cached result for {key}")
        return result
    print(f"Computing {key}...")
    cache[key] = None  # mark as in progress
    # simulate work
    import time
    time.sleep(0.1)
    result = f"Result for {key}"
    cache[key] = result
    return result

print(expensive_computation("user:123"))
print(expensive_computation("user:123"))  # cached

# 3. Optional configuration with None defaults
def connect(host="localhost", port=None, timeout=None):
    if port is None:
        port = 5432
    if timeout is None:
        timeout = 30
    print(f"Connecting to {host}:{port} (timeout={timeout}s)")
    return True

connect()
connect(host="db.example.com", port=5433, timeout=60)
connect(port=5433)  # host default, port overridden, timeout default

# 4. None in list comprehensions (filtering)
data = [1, None, 3, None, 5]
filtered = [x for x in data if x is not None]
print(filtered)  # [1, 3, 5]