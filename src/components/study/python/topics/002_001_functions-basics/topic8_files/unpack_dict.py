# unpack_dict.py
# Unpacking dictionaries with ** in function calls

def create_profile(name, age, city, occupation="Student"):
    print(f"{name}, {age}, from {city} – {occupation}")

# Normal call
create_profile("Swadeep", 17, "Barrackpore")

# Data in a dictionary (keys must match parameter names)
profile1 = {
    "name": "Tuhina",
    "age": 16,
    "city": "Shyamnagar"
}
create_profile(**profile1)   # occupation uses default

# Override some values by mixing with regular keyword args
create_profile(**profile1, occupation="Class Captain")

# Dictionary with extra keys? They go to **kwargs if function has it
def flexible_profile(**kwargs):
    for k, v in kwargs.items():
        print(f"{k} = {v}")

extra_data = {"name": "Abhronila", "age": 15, "city": "Ichapur", "grade": "A"}
flexible_profile(**extra_data)   # all keys accepted

# Invalid: key not a string (can't happen in dict literal, but key must be str)
# def f(a): pass
# f(**{1: "one"})  # TypeError: keywords must be strings