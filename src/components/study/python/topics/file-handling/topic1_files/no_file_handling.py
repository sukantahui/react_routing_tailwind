# no_file_handling.py
# A program that loses all data when it ends

def run_without_persistence():
    """Simulates a program that doesn't save data."""
    print("📝 Enter your name: (type 'quit' to exit)")
    name = input("Name: ")
    
    if name == "quit":
        print("Exiting. Your name is lost forever.")
        return
    
    print(f"Hello, {name}! (This data will vanish when the program ends)")

if __name__ == "__main__":
    run_without_persistence()
    print("\n🔴 Program ended. All data lost. No file was written.")