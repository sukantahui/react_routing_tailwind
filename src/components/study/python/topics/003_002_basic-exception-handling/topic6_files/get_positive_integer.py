# Pattern 1: Basic numeric input validation

def get_positive_integer():
    """Get a positive integer from user with validation"""
    while True:  # Keep asking until valid input
        user_input = input("Enter a positive integer: ")

        try:
            # Try to convert to integer
            number = int(user_input)

            # Check if positive
            if number <= 0:
                print("Error: Number must be positive!")
                continue  # Ask again

            # If we get here, input is valid
            return number

        except ValueError:
            # Handle conversion errors
            if user_input.strip() == "":
                print("Error: Input cannot be empty!")
            else:
                print(f"Error: '{user_input}' is not a valid integer!")


# Test the function
print("=== Testing Input Validation ===\n")
print(
    "Try entering:\n"
    "1. Valid number (e.g., 42)\n"
    "2. Text (e.g., abc)\n"
    "3. Negative number\n"
    "4. Empty input\n"
    "5. Decimal (e.g., 3.14)\n"
)

# Uncomment to test:
# result = get_positive_integer()
# print(f"\nSuccess! You entered: {result}")
