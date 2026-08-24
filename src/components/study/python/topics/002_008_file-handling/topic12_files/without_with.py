# without_with.py
# Comparison: Manual closing vs with

import os

def manual_close():
    """File handling without with (manual close)."""
    print("🔹 Manual close (try-finally):")
    filename = "manual_demo.txt"

    f = None
    try:
        f = open(filename, 'w', encoding='utf-8')
        f.write("Manual close example.\n")
        # If an exception occurs here, we still need to close
        # raise RuntimeError("Simulated error")
    except Exception as e:
        print(f"   Error: {e}")
    finally:
        if f:
            f.close()
            print("✅ File closed in finally block.")

    # Clean up
    if os.path.exists(filename):
        os.remove(filename)

def with_close():
    """File handling with with."""
    print("\n🔹 With statement (automatic):")
    filename = "with_demo.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        f.write("With statement example.\n")
        # Even if we raise an exception, the file is closed
        # raise RuntimeError("Simulated error")

    print("✅ File closed automatically by with.")

    # Clean up
    if os.path.exists(filename):
        os.remove(filename)

def main():
    manual_close()
    with_close()
    print("🧹 All cleaned up.")

if __name__ == "__main__":
    main()