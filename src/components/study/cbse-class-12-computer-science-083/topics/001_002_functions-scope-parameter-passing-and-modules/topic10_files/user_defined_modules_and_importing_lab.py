# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 10: Creating User-Defined Modules (.py files) and Importing
# =====================================================================

# In Python, ANY file containing Python code with a '.py' extension is a MODULE!
# Modules bundle related functions, constants, and classes into reusable packages.

# Demonstration of Built-in and Standard Library Module Imports:
import math
import random

print("--- 1. Using 'import module_name' (Namespace Prefix Required) ---")
radius = 7.0
area = math.pi * (radius ** 2)
print(f"Circle Radius={radius} -> Area using math.pi: {area:.2f}")

print("\n--- 2. Using 'from module import name' (Direct Access) ---")
from math import sqrt, ceil, floor
val = 18.75
print(f"Value: {val} -> sqrt: {sqrt(val):.2f}, ceil: {ceil(val)}, floor: {floor(val)}")

print("\n--- 3. Using Aliases via 'as' Keyword ---")
import random as rnd
lucky_number = rnd.randint(1, 100)
print(f"Random integer via alias 'rnd.randint(1, 100)': {lucky_number}")

# 4. Simulating a Custom Module Architecture
"""
# File: geometry_utils.py
PI = 3.14159

def sphere_volume(r):
    return (4/3) * PI * (r ** 3)

def cube_volume(side):
    return side ** 3

if __name__ == '__main__':
    # Unit tests that execute ONLY when file is run directly
    print('Testing sphere_volume(1):', sphere_volume(1))
"""
print("\n--- 4. __name__ and '__main__' Demonstration ---")
print(f"Current module's __name__ is: '{__name__}'")
