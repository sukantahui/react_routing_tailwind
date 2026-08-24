# keyword_args.py
# Demonstrating keyword arguments – order does NOT matter

def student_info(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")

# Keyword arguments: specify parameter names
student_info(city="Ichapur", name="Abhronila", age=15)
student_info(name="Debangshu", age=17, city="Naihati")

# Mix positional and keyword (positional first, then keyword)
student_info("Swadeep", city="Barrackpore", age=17)  # valid
# student_info(age=17, "Swadeep", city="Barrackpore") # SyntaxError!