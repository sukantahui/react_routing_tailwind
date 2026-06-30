# exception_handling.py
# Demonstrates handling file-related exceptions

def safe_file_read(filename):
    """Try to read a file and handle common errors gracefully."""
    try:
        with open(filename, 'r') as f:
            data = f.read()
            print(f"Successfully read {len(data)} characters from '{filename}'")
            return data
    except FileNotFoundError:
        print(f"Error: The file '{filename}' does not exist.")
    except PermissionError:
        print(f"Error: You don't have permission to read '{filename}'.")
    except UnicodeDecodeError:
        print(f"Error: '{filename}' contains non-text data or wrong encoding.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    return None

if __name__ == "__main__":
    # Try reading a file that likely exists
    safe_file_read("example.txt")
    # Try reading a file that doesn't exist
    safe_file_read("missing_file.txt")