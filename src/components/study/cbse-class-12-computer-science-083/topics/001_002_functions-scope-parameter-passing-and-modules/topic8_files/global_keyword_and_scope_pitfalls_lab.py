# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 8: Modifying Global Variables using the 'global' Keyword
# =====================================================================

counter = 100

# 1. Modifying Global Variable via 'global' statement
def increment_counter(amount):
    global counter  # Declares that 'counter' refers to the module-level global variable
    counter += amount
    print(f"Inside increment_counter(): counter is now {counter}")

print(f"Initial global counter: {counter}")
increment_counter(25)
print(f"After function execution, global counter: {counter}")

# 2. Creating New Global Variables from inside a Function
def initialize_system():
    global app_version, is_configured
    app_version = "2.1.0"
    is_configured = True

initialize_system()
print(f"\nDynamically created globals: Version={app_version}, Configured={is_configured}")

# 3. Classic UnboundLocalError Pitfall
balance = 500

def faulty_transaction():
    try:
        # Without 'global balance', Python sees assignment 'balance = ...' and treats
        # 'balance' as LOCAL. Reading 'balance' before assignment raises UnboundLocalError!
        # balance = balance - 50
        pass
    except Exception as e:
        print("Error caught:", e)

faulty_transaction()
