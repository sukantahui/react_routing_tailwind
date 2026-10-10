"""
CBSE Class 11 Computer Science (083) - Unit 2
Topic 11: Standard Console Output in Python - The print() Function
Demonstrating sep, end, file, flush parameters, escape sequences, and string formatting
Author: Sukanta Hui
"""

import sys
import time

def print_separator_demo():
    print("=" * 60)
    print("DEMO 1: The 'sep' (Separator) Keyword Parameter")
    print("=" * 60)
    
    # Default separator is a single space ' '
    print("Default separator:", "Python", "is", "awesome")
    
    # Custom separator: Comma + Space
    print("Comma separated:", "Apple", "Banana", "Cherry", sep=", ")
    
    # Hyphen separator
    print("Date Format:", "2026", "10", "10", sep="-")
    
    # Empty separator (joining tokens directly)
    print("Joined tokens:", "User", "ID", "4092", sep="")
    
    # Newline as separator (prints each argument on a new line)
    print("Newline separated:\n", "Step 1", "Step 2", "Step 3", sep="\n")


def print_end_demo():
    print("=" * 60)
    print("DEMO 2: The 'end' (Ending) Keyword Parameter")
    print("=" * 60)
    
    # Default end is newline '\n'
    print("Line 1 (default end='\\n')")
    print("Line 2 (default end='\\n')")
    
    # Overriding end with a space
    print("\nPrinting on the same line with space:")
    for i in range(1, 6):
        print(i, end=" ")
    print()  # Reset line
    
    # Overriding end with custom delimiter
    print("\nPrinting with arrow end:")
    for step in ["Input", "Process", "Storage", "Output"]:
        print(step, end=" --> ")
    print("DONE\n")


def print_combined_demo():
    print("=" * 60)
    print("DEMO 3: Combining 'sep' and 'end' with String Formatting")
    print("=" * 60)
    
    # Multiple arguments with custom sep and custom end
    print("A", "B", "C", sep="#", end=" *** ")
    print("X", "Y", "Z", sep="-", end="\n")
    
    # Formatted Strings (f-strings vs .format() vs % operator)
    name = "Sukanta Hui"
    score = 98.756
    roll = 101
    
    print("\nf-string interpolation:")
    print(f"Student: {name:<15} | Roll: {roll:04d} | Score: {score:.2f}%")
    
    print("\nstr.format() method:")
    print("Student: {:<15} | Roll: {:04d} | Score: {:.2f}%".format(name, roll, score))


def print_flush_demo():
    print("=" * 60)
    print("DEMO 4: Stream Flushing & Progress Bar Simulation")
    print("=" * 60)
    print("Simulating fast progress buffer flush: ", end="", flush=True)
    for _ in range(5):
        print("#", end="", flush=True)
    print(" [100% COMPLETE]")


if __name__ == "__main__":
    print_separator_demo()
    print_end_demo()
    print_combined_demo()
    print_flush_demo()
