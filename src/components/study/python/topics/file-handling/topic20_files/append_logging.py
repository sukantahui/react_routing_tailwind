# append_logging.py
# Builds a simple logging system using append mode

import os
import datetime

def log_message(message, logfile="app.log"):
    """Append a timestamped message to the log file."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(logfile, 'a', encoding='utf-8') as f:
        f.write(f"[{timestamp}] {message}\n")
    print(f"✅ Logged: {message}")

def read_log(logfile="app.log"):
    """Read and display the entire log."""
    try:
        with open(logfile, 'r', encoding='utf-8') as f:
            content = f.read()
        print("\n📄 Log file content:")
        print(content)
    except FileNotFoundError:
        print("❌ Log file not found.")

def simulate_application():
    """Simulate an application logging events."""
    print("🔹 Simulating application logs:")
    log_message("Application started")
    log_message("User Swadeep logged in")
    log_message("Processing data...")
    log_message("Data processed successfully")
    log_message("User Swadeep logged out")
    log_message("Application shutting down")

def log_with_severity(level, message, logfile="detailed.log"):
    """Log with severity level."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(logfile, 'a', encoding='utf-8') as f:
        f.write(f"[{timestamp}] [{level}] {message}\n")

def simulate_detailed_logs():
    """Log with different severity levels."""
    print("\n🔹 Logging with severity levels:")
    log_with_severity("INFO", "System check passed")
    log_with_severity("WARNING", "High memory usage detected")
    log_with_severity("ERROR", "Database connection timeout")
    log_with_severity("INFO", "Retry successful")

if __name__ == "__main__":
    simulate_application()
    read_log("app.log")

    simulate_detailed_logs()
    read_log("detailed.log")

    # Clean up
    for f in ["app.log", "detailed.log"]:
        if os.path.exists(f):
            os.remove(f)
    print("🧹 Cleaned up.")