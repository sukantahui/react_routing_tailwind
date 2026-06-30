# relative_path_issue.py
# Shows the pitfall of using relative paths without knowing the CWD

import os

def demonstrate_issue():
    """Demonstrate how relative paths can break depending on CWD."""
    # Create a dummy file in the current directory
    with open("test.txt", "w") as f:
        f.write("This is a test file.")

    print("📁 Created test.txt in the current directory.")
    print(f"📍 Current CWD: {os.getcwd()}")

    # This works because test.txt is in the CWD
    if os.path.exists("test.txt"):
        print("✅ Found 'test.txt' using relative path.")
    else:
        print("❌ Could not find 'test.txt'.")

    # Now simulate running the script from a different directory
    print("\n🔀 Simulating a different CWD (e.g., parent directory):")
    # Change to parent (if possible)
    original_cwd = os.getcwd()
    try:
        os.chdir("..")
        print(f"   New CWD: {os.getcwd()}")
        # Now test.txt is not in this directory (unless we copied it)
        if os.path.exists("test.txt"):
            print("   ✅ Found 'test.txt' (unexpected!)")
        else:
            print("   ❌ Could not find 'test.txt' (expected).")
            print("   💡 This is why you should use absolute or script‑relative paths.")
    except Exception as e:
        print(f"   Could not change directory: {e}")
    finally:
        os.chdir(original_cwd)

    # Clean up
    os.remove("test.txt")
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    demonstrate_issue()