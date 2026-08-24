# append_errors.py
# Demonstrates handling errors when appending

import os

def safe_append(filename, content):
    """Safely append content with error handling."""
    try:
        with open(filename, 'a', encoding='utf-8') as f:
            f.write(content + "\n")
        return True
    except PermissionError:
        print(f"❌ Permission denied: {filename}")
    except OSError as e:
        print(f"❌ OS error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
    return False

def append_with_retry(filename, content, max_retries=3):
    """Append with retry mechanism."""
    for attempt in range(max_retries):
        try:
            with open(filename, 'a', encoding='utf-8') as f:
                f.write(content + "\n")
            print(f"✅ Successfully appended (attempt {attempt + 1})")
            return True
        except (PermissionError, OSError) as e:
            print(f"⚠️ Attempt {attempt + 1} failed: {e}")
            import time
            time.sleep(0.5)
    print(f"❌ Failed after {max_retries} attempts")
    return False

def demo_errors():
    """Demonstrate error scenarios."""
    filename = "error_demo.txt"

    # Try to append to a file in a non-existent directory
    safe_append("/nonexistent/dir/file.txt", "test")

    # Try to append to a read-only file (simulate by creating a file and making it read-only)
    if os.name == 'posix':  # Unix-like systems
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("content\n")
        os.chmod(filename, 0o444)  # Read-only
        safe_append(filename, "attempt to append")
        os.chmod(filename, 0o666)  # Restore
        os.remove(filename)

    # Successful append
    safe_append("success.txt", "This works")
    with open("success.txt", 'r') as f:
        print(f"📄 success.txt: {f.read().strip()}")
    os.remove("success.txt")

    # Retry mechanism
    append_with_retry("retry_demo.txt", "Retry test")
    with open("retry_demo.txt", 'r') as f:
        print(f"📄 retry_demo.txt: {f.read().strip()}")
    os.remove("retry_demo.txt")

if __name__ == "__main__":
    demo_errors()
    print("🧹 Cleaned up.")