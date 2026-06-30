# file_handling_load.py
# Loads previously saved data from a file

def load_data_from_file():
    """Read and display data from a file."""
    try:
        with open("user_data.txt", "r") as f:
            content = f.read()
        print("📂 Previously saved data:")
        print(content)
    except FileNotFoundError:
        print("❌ No saved data found. Run file_handling_save.py first.")

if __name__ == "__main__":
    load_data_from_file()