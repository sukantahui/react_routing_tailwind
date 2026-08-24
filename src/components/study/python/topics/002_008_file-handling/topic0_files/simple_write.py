# simple_write.py
# Demonstrates writing text to a file

def write_file_example():
    """Write a greeting message to 'output.txt'."""
    try:
        # Open file in write mode (creates or overwrites)
        file = open('output.txt', 'w')
        file.write("Hello, World!\n")
        file.write("This is a file handling example.\n")
        file.close()
        print("Successfully wrote to 'output.txt'.")
    except Exception as e:
        print(f"Error writing to file: {e}")

if __name__ == "__main__":
    write_file_example()