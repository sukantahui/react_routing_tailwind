# write_append.py
# Compares writing ('w') vs appending ('a')

import os

def compare_write_append():
    """Show the difference between 'w' and 'a' modes."""
    filename = "compare.txt"

    # Write mode - overwrites
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("First content in write mode.\n")
    print("✅ 'w' mode: Created file with first content")

    # Write again - overwrites
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Second content - overwrote the first!\n")
    print("✅ 'w' mode: Overwrote with second content")

    print("\n📄 After 'w' (overwrite):")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    # Append mode - adds to end
    with open(filename, 'a', encoding='utf-8') as f:
        f.write("Appended line 1\n")
    print("✅ 'a' mode: Appended line 1")

    with open(filename, 'a', encoding='utf-8') as f:
        f.write("Appended line 2\n")
    print("✅ 'a' mode: Appended line 2")

    print("\n📄 After 'a' (append):")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

def safe_append_logging():
    """Demonstrate safe appending for logs."""
    filename = "app.log"

    # Simulate logging events
    import datetime

    def log_event(message):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(filename, 'a', encoding='utf-8') as f:
            f.write(f"[{timestamp}] {message}\n")

    log_event("Application started")
    log_event("User Swadeep logged in")
    log_event("Data processed successfully")

    print(f"✅ Log entries written to {filename}")

    with open(filename, 'r', encoding='utf-8') as f:
        print("\n📄 Log file content:")
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    compare_write_append()
    safe_append_logging()