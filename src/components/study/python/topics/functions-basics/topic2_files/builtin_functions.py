# builtin_functions.py
# Demonstrating common Python built-in functions

# print() - output to console
print("Hello, welcome to built-in functions!")

# len() - get length of a string or list
message = "Python"
print(f"The length of '{message}' is {len(message)}")

# type() - check data type
number = 42
print(f"The type of {number} is {type(number)}")

# input() - get user input (uncomment to test)
# name = input("What is your name? ")
# print(f"Nice to meet you, {name}!")

# range() - generate a sequence
print("Numbers from 0 to 4:")
for i in range(5):
    print(i)

# sum() - add all numbers in a list
marks = [85, 90, 78, 92]
print(f"Total marks: {sum(marks)}")