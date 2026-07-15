# simple_read.py
# Demonstrates reading a text file line by line

def read_file_example():
    """Read and print the contents of 'example.txt'."""
    try:
        # Open the file in read mode
        file = open('example.txt', 'r')
        content = file.read()
        print("File content:")
        print(content)
        file.close()  # Always close the file when done
    except FileNotFoundError:
        print("Error: The file 'example.txt' was not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    read_file_example()