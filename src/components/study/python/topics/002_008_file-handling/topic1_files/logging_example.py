# logging_example.py
# Demonstrates writing log messages to a file

import datetime

def log_event(message):
    """Append a timestamped message to a log file."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("app.log", "a") as log:
        log.write(f"[{timestamp}] {message}\n")

if __name__ == "__main__":
    log_event("Application started")
    log_event("User logged in (Swadeep)")
    log_event("User performed calculation")
    log_event("Application closed")
    print("✅ Log entries written to 'app.log'.")