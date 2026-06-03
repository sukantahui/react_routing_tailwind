# explicit_none.py
# Explicitly returning None (clear intent)

def find_student(students, name):
    """Return student dict if found, otherwise None."""
    for student in students:
        if student['name'] == name:
            return student
    return None   # explicit

def configure(timeout=None, retries=None):
    """Set configuration; explicit None means use defaults."""
    if timeout is None:
        timeout = 5
    if retries is None:
        retries = 3
    return {"timeout": timeout, "retries": retries}

students = [
    {"name": "Tuhina", "age": 16},
    {"name": "Abhronila", "age": 15}
]

found = find_student(students, "Debangshu")
if found is None:
    print("Student not found")

config = configure(retries=5)
print(config)  # timeout uses default 5, retries=5

# Explicit None can be more readable than empty return
def log_message(msg, level="INFO"):
    print(f"[{level}] {msg}")
    return None   # explicitly signals no value