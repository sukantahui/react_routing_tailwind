# unpack_realworld.py
# Real-world applications of argument unpacking

import math

# 1. Reading CSV rows and unpacking into variables
csv_row = ["Swadeep", "17", "Barrackpore"]
name, age, city = csv_row   # unpack outside function
print(f"Student: {name}, Age: {age}, City: {city}")

# 2. Passing a list of numbers to a function that expects multiple args
def distance(x1, y1, x2, y2):
    return math.hypot(x2 - x1, y2 - y1)

coords = [0, 0, 3, 4]
print(distance(*coords))   # 5.0

# 3. API call with dynamic parameters using **kwargs
def api_request(endpoint, **params):
    print(f"GET {endpoint} with params: {params}")
    # Simulate request
    return {"status": 200}

filters = {"user_id": 123, "active": True, "limit": 10}
api_request("/users", **filters)

# 4. Merging configuration dictionaries
default_config = {
    "host": "localhost",
    "port": 8080,
    "debug": False
}
user_config = {
    "port": 9090,
    "debug": True
}
# Merge with precedence: user_config overrides default_config
merged = {**default_config, **user_config}
print(merged)

# 5. Forwarding arguments in a wrapper function (decorator pattern)
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"Result: {result}")
        return result
    return wrapper

@logger
def multiply(x, y):
    return x * y

multiply(4, 5)                     # args=(4,5)
multiply(x=6, y=7)                 # kwargs={'x':6,'y':7}

# 6. Unpacking in list/dict literals (Python 3.5+)
numbers = [1, 2, 3]
more_numbers = [*numbers, 4, 5, 6]   # [1,2,3,4,5,6]
print(more_numbers)

dict_a = {"a": 1, "b": 2}
dict_b = {"c": 3, "d": 4}
combined = {**dict_a, **dict_b}      # {'a':1,'b':2,'c':3,'d':4}
print(combined)