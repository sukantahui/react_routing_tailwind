# append_mode.py
# Demonstrates the 'a' (append) mode

import os
import datetime

def log_event(message, logfile="app.log"):
    """Append a timestamped event to the log file."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(logfile, 'a', encoding='utf-8') as f:
        f.write(f"[{timestamp}] {message}\n")
    print(f"✅ Logged: {message}")

def read_log(logfile="app.log"):
    """Read and display the entire log."""
    try:
        with open(logfile, 'r', encoding='utf-8') as f:
            content = f.read()
        print("\n📄 Full log:")
        print(content)
    except FileNotFoundError:
        print("❌ Log file not found yet.")

if __name__ == "__main__":
    # Simulate logging
    log_event("Application started")
    log_event("User Swadeep logged in")
    log_event("Calculated results")
    log_event("Application closed")

    # Display the log
    read_log()

    # Clean up
    os.remove("app.log")
    print("🧹 Cleaned up.")