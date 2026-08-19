# write_errors.py
# Demonstrates handling write errors

import os

def handle_write_errors():
    """Show how to handle common write errors."""
    filename = "error_demo.txt"

    # PermissionError (simulate by trying to write to a protected location)
    try:
        with open("/root/forbidden.txt", 'w', encoding='utf-8') as f:
            f.write("This should fail")
    except PermissionError:
        print("❌ PermissionError: Cannot write to protected directory")
    except Exception as e:
        print(f"❌ Other error: {e}")

    # Writing to a file with insufficient space (simulate)
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            # Try to write a huge string (may raise OSError on full disk)
            f.write("x" * 1000000000)
    except OSError as e:
        print(f"❌ OSError: {e}")
    except Exception as e:
        print(f"❌ Other error: {e}")

    # Type error: writing non-string
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(42)  # TypeError
    except TypeError as e:
        print(f"❌ TypeError: {e}")

    # Writing to a closed file
    try:
        f = open(filename, 'w', encoding='utf-8')
        f.close()
        f.write("This will fail")
    except ValueError as e:
        print(f"❌ ValueError: {e}")

    if os.path.exists(filename):
        os.remove(filename)
    print("🧹 Cleaned up.")

def safe_write_with_retry():
    """Demonstrate safe writing with error handling."""
    filename = "safe_write.txt"
    data = "Important data to save"

    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(data)
        print(f"✅ Successfully wrote data to {filename}")
    except PermissionError:
        print("❌ Permission denied. Check file permissions.")
    except OSError as e:
        print(f"❌ OS error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
    else:
        # Only runs if no exception occurred
        print("   Data was written successfully!")

    if os.path.exists(filename):
        os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    handle_write_errors()
    safe_write_with_retry()