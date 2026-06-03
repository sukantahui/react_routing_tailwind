# kwargs_unpacking.py
# Unpacking dictionaries into keyword arguments using **

def create_profile(name, age, city, occupation="Student"):
    print(f"{name}, {age}, from {city} – {occupation}")

# Normal call
create_profile("Swadeep", 17, "Barrackpore")

# Using a dictionary and unpacking with **
profile_data = {
    "name": "Tuhina",
    "age": 16,
    "city": "Shyamnagar",
    "occupation": "Class President"
}
create_profile(**profile_data)

# Partial unpacking (missing keys cause error)
partial_data = {"name": "Abhronila", "age": 15}
# create_profile(**partial_data)  # TypeError: missing 'city'

# Merging dictionaries with **
defaults = {"occupation": "Student", "country": "India"}
extra = {"name": "Debangshu", "age": 17, "city": "Naihati"}
merged = {**defaults, **extra}
print(merged)