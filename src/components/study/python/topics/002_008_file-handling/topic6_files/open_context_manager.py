# open_context_manager.py
# Shows why 'with open()' is the recommended way

import os

def manual_close():
    """Example of manual close (not recommended)."""
    f = open("manual.txt", 'w', encoding='utf-8')
    f.write("This is manually written.\n")
    f.close()  # Must remember to close!
    print("✅ Manual close done.")

def context_manager_best():
    """Recommended approach: with statement."""
    with open("auto.txt", 'w', encoding='utf-8') as f:
        f.write("This is automatically closed.\n")
        # Even if an exception occurs here, the file will be closed.
    print("✅ Context manager closed automatically.")

def multiple_files():
    """Open multiple files in one with statement."""
    with open("multi1.txt", 'w', encoding='utf-8') as f1, \
         open("multi2.txt", 'w', encoding='utf-8') as f2:
        f1.write("First file\n")
        f2.write("Second file\n")
    print("✅ Both files closed automatically.")

def clean():
    """Clean up created files."""
    for fname in ["manual.txt", "auto.txt", "multi1.txt", "multi2.txt"]:
        if os.path.exists(fname):
            os.remove(fname)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    manual_close()
    context_manager_best()
    multiple_files()
    clean()