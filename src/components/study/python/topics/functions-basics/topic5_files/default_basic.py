# default_basic.py
# Basic default parameter usage

def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Swadeep")                # uses default "Hello"
greet("Tuhina", "Namaste")      # overrides default

def set_role(username, role="student"):
    print(f"{username} is a {role}")

set_role("Abhronila")           # role defaults to "student"
set_role("Debangshu", "teacher")

def apply_discount(price, discount=0.1):
    return price - (price * discount)

print(apply_discount(100))      # 10% off → 90.0
print(apply_discount(100, 0.2)) # 20% off → 80.0