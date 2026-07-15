# custom_context.py
# Creating a custom context manager (advanced)

import time

class Timer:
    """A simple context manager to time code execution."""
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.perf_counter()
        self.elapsed = self.end - self.start
        print(f"⏱️ Time elapsed: {self.elapsed:.4f} seconds")
        # Return False to propagate exceptions
        return False

def custom_context_example():
    """Demonstrate a custom context manager."""
    print("🔹 Custom context manager (Timer):")

    with Timer() as timer:
        # Simulate some work
        total = 0
        for i in range(1000000):
            total += i
        print(f"   Sum: {total}")

    print(f"   Elapsed time: {timer.elapsed:.4f}s")

def context_manager_for_file_like():
    """Simulate a file-like context manager (for illustration)."""
    print("\n🔹 Custom file-like context manager:")

    class ManagedFile:
        def __init__(self, filename, mode):
            self.filename = filename
            self.mode = mode
            self.file = None

        def __enter__(self):
            self.file = open(self.filename, self.mode, encoding='utf-8')
            return self.file

        def __exit__(self, exc_type, exc_val, exc_tb):
            if self.file:
                self.file.close()
                print(f"   Closed file: {self.filename}")
            # Return False to propagate exceptions
            return False

    with ManagedFile('custom.txt', 'w') as f:
        f.write("Written with custom context manager.\n")

    # Verify
    with open('custom.txt', 'r') as f:
        content = f.read()
        print(f"📄 Content: {content.strip()}")

    # Clean up
    import os
    os.remove('custom.txt')
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    custom_context_example()
    context_manager_for_file_like()