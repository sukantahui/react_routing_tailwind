# positional_args.py
# Demonstrating positional arguments – order determines assignment

def student_info(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")

# Positional arguments: order matters!
student_info("Swadeep", 17, "Barrackpore")   # Swadeep → name, 17 → age, Barrackpore → city
student_info("Tuhina", 16, "Shyamnagar")     # Tuhina → name, 16 → age, Shyamnagar → city

# What happens if we change order accidentally?
student_info(16, "Tuhina", "Shyamnagar")     # Wrong: 16 becomes name! (type confusion)