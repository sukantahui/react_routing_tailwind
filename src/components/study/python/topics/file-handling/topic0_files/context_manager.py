# context_manager.py
# Uses the 'with' statement for automatic file closing

def context_manager_example():
    """Read a file using a context manager (recommended approach)."""
    try:
        # 'with' automatically closes the file
        with open('example.txt', 'r') as file:
            content = file.read()
            print("File content (using context manager):")
            print(content)
        # No need to call file.close() - it's done automatically
    except FileNotFoundError:
        print("Error: 'example.txt' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    context_manager_example()