# file_handling_save.py
# Saves user data to a file so it persists

def save_data_to_file():
    """Save user input to a file."""
    name = input("Enter your name: ")
    age = input("Enter your age: ")
    
    with open("user_data.txt", "w") as f:
        f.write(f"Name: {name}\n")
        f.write(f"Age: {age}\n")
    
    print(f"✅ Data saved to 'user_data.txt'.")

if __name__ == "__main__":
    save_data_to_file()