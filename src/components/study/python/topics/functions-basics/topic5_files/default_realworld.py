# default_realworld.py
# Real‑world API client with default parameters

import time

def fetch_data(url, timeout=5, retries=3, log_level="INFO"):
    """
    Simulate fetching data from an API.
    - timeout: seconds to wait (default 5)
    - retries: number of attempts (default 3)
    - log_level: 'INFO', 'DEBUG', 'ERROR' (default 'INFO')
    """
    print(f"[{log_level}] Fetching {url} (timeout={timeout}, retries={retries})")
    attempt = 1
    while attempt <= retries:
        print(f"  Attempt {attempt}/{retries}")
        # Simulate network call
        if attempt == retries:
            print(f"  Success! Data from {url}")
            return {"data": "sample"}
        attempt += 1
        time.sleep(0.1)
    return None

# Using all defaults
fetch_data("https://api.example.com/students")

# Override timeout only
fetch_data("https://api.example.com/grades", timeout=10)

# Override retries and log_level using keyword args
fetch_data("https://api.example.com/attendance", retries=5, log_level="DEBUG")

# Override everything
fetch_data("https://api.example.com/fees", timeout=2, retries=1, log_level="ERROR")