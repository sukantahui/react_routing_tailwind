import logging

try:
    age = int(input("Age: "))
except ValueError as e:
    logging.warning(f"Invalid age input: {e}")
    print("Please enter a valid number")
