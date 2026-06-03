# param_vs_arg.py
# Clear distinction between parameters and arguments

# ---------- FUNCTION DEFINITION ----------
# Here, 'name' and 'age' are PARAMETERS (placeholders)
def introduce(name, age):
    print(f"I am {name} and I am {age} years old.")
# -----------------------------------------

# ---------- FUNCTION CALLS ----------
# Here, the values passed are ARGUMENTS (actual data)
introduce("Debangshu", 16)   # Arguments: "Debangshu", 16
introduce("Tuhina", 15)      # Arguments: "Tuhina", 15
introduce("Swadeep", 17)     # Arguments: "Swadeep", 17

print("\n--- Explanation ---")
print("Parameters: 'name' and 'age' (appear in def line)")
print("Arguments: 'Debangshu', 'Tuhina', 'Swadeep', 16, 15, 17 (appear in calls)")