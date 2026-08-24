// src/components/study/python/topics/002_009_modules-packages/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Built-in standard library modules: math, random, datetime, sys, os

const questions = [
  {
    question: "Why does (0.1 + 0.2 == 0.3) evaluate to False in Python and how does math.isclose() solve this?",
    shortAnswer: "Floating-point numbers are represented in binary IEEE 754 format which cannot represent base-10 decimals exactly; math.isclose(a, b) compares floats within a tiny tolerance (relative tolerance).",
    explanation: "0.1 + 0.2 produces 0.30000000000000004 in binary float math. math.isclose(0.1 + 0.2, 0.3) handles this tolerance safely and returns True.",
    hint: "Binary float precision issues; use math.isclose().",
    level: "basic",
    codeExample: "import math\nprint(0.1 + 0.2 == 0.3)          # False\nprint(math.isclose(0.1 + 0.2, 0.3))  # True"
  },
  {
    question: "What is the difference between random.choice() and random.sample()?",
    shortAnswer: "random.choice() returns a single random element; random.sample(seq, k) returns a list of k unique elements chosen without replacement.",
    explanation: "If you need 3 distinct winners from a student list without duplicates, use random.sample(students, 3).",
    hint: "choice() gives 1 item; sample(seq, k) gives k unique items.",
    level: "basic",
    codeExample: "import random\nitems = ['A', 'B', 'C', 'D']\nprint(random.choice(items))      # 'B'\nprint(random.sample(items, 2))   # ['C', 'A']"
  },
  {
    question: "Why should you NEVER use the 'random' module for generating passwords, authentication tokens, or OTPs?",
    shortAnswer: "The 'random' module uses the Mersenne Twister algorithm which is pseudo-random and completely predictable after observing 624 outputs; use the 'secrets' module instead.",
    explanation: "The standard 'secrets' module generates cryptographically secure pseudo-random numbers (CSPRNG) backed by operating system entropy.",
    hint: "random is predictable; secrets is cryptographically secure.",
    level: "basic",
    codeExample: "import secrets\nprint(secrets.token_hex(16))     # Secure 32-character token\nprint(secrets.randbelow(900000) + 100000) # Secure 6-digit OTP"
  },
  {
    question: "What is the operational difference between strftime() and strptime() in the datetime module?",
    shortAnswer: "strftime() formats a datetime object into a string (String Format Time); strptime() parses a string into a datetime object (String Parse Time).",
    explanation: "Memory mnemonic: 'f' in strftime stands for 'Format', 'p' in strptime stands for 'Parse'.",
    hint: "strftime = Datetime to String; strptime = String to Datetime.",
    level: "basic",
    codeExample: "import datetime as dt\n# strftime:\nprint(dt.date(2026, 8, 24).strftime('%d-%b-%Y'))  # '24-Aug-2026'\n# strptime:\nprint(dt.datetime.strptime('24-08-2026', '%d-%m-%Y'))  # datetime(2026, 8, 24)"
  },
  {
    question: "How do you calculate a future date 30 days from today using datetime.timedelta?",
    shortAnswer: "today = datetime.date.today(); future_date = today + datetime.timedelta(days=30)",
    explanation: "timedelta represents a duration of time and supports addition and subtraction directly with date and datetime objects.",
    hint: "Use date + timedelta(days=30).",
    level: "basic",
    codeExample: "import datetime as dt\ntoday = dt.date(2026, 8, 24)\ndue_date = today + dt.timedelta(days=30)\nprint(due_date)  # 2026-09-23"
  },
  {
    question: "Why is time.perf_counter() preferred over time.time() for benchmarking code execution speed?",
    shortAnswer: "time.perf_counter() is a monotonic, high-resolution clock designed specifically for performance measurement, unaffected by system clock updates or daylight savings shifts.",
    explanation: "time.time() measures wall-clock time and can jump backwards if the system clock syncs with an NTP server, invalidating benchmark results.",
    hint: "perf_counter is monotonic and high-resolution.",
    level: "moderate",
    codeExample: "import time\nt0 = time.perf_counter()\nsum(range(100000))\nt1 = time.perf_counter()\nprint(f'Elapsed: {(t1-t0)*1000:.3f} ms')"
  },
  {
    question: "What does sys.argv contain when a Python script is executed from the command line?",
    shortAnswer: "A list of command-line argument strings passed to the script, where sys.argv[0] is the script filename itself.",
    explanation: "Running 'python app.py --port 8000' populates sys.argv with ['app.py', '--port', '8000'].",
    hint: "A list of strings containing CLI arguments.",
    level: "basic",
    codeExample: "import sys\nprint('Script name:', sys.argv[0])"
  },
  {
    question: "What does sys.getsizeof(object) return?",
    shortAnswer: "The memory footprint of the Python object in bytes allocated by the CPython interpreter heap.",
    explanation: "Due to object header overhead, even an empty integer or string consumes dozens of bytes in Python.",
    hint: "Returns object size in bytes.",
    level: "basic",
    codeExample: "import sys\nprint(sys.getsizeof(0))      # 28 bytes\nprint(sys.getsizeof('hello')) # 54 bytes"
  },
  {
    question: "Why should you always use os.path.join() instead of manual string concatenation for building file paths?",
    shortAnswer: "os.path.join() automatically uses the correct operating system path separator ('\\' on Windows, '/' on Linux/macOS), preventing cross-platform file path errors.",
    explanation: "Hardcoding '\\' breaks immediately on Linux and cloud servers. os.path.join ensures code is portable.",
    hint: "Handles OS-specific slashes (\\ vs /) automatically.",
    level: "basic",
    codeExample: "import os\npath = os.path.join('data', 'reports', 'august.csv')\nprint(path)  # data\\reports\\august.csv on Windows, data/reports/august.csv on Linux"
  },
  {
    question: "How do you read an environment variable in Python safely without raising a KeyError?",
    shortAnswer: "os.environ.get('KEY_NAME', default_value)",
    explanation: "Accessing os.environ['KEY'] directly raises KeyError if missing; .get() returns None or a specified default safely.",
    hint: "Use os.environ.get('KEY', default).",
    level: "basic",
    codeExample: "import os\ndb_host = os.environ.get('DB_HOST', 'localhost')\nprint(db_host)"
  },
  {
    question: "What does random.seed(x) do and why is it essential for reproducible data science experiments?",
    shortAnswer: "It initializes the internal pseudo-random number generator state so that subsequent random calls produce the exact same sequence of numbers every time.",
    explanation: "Seeding ensures machine learning splits, simulations, and unit tests produce deterministic, reproducible results.",
    hint: "Fixes the random sequence for reproducibility.",
    level: "moderate",
    codeExample: "import random\nrandom.seed(42)\nprint(random.randint(1, 100))  # Always prints 82"
  },
  {
    question: "What is the difference between math.ceil() and math.floor()?",
    shortAnswer: "math.ceil(x) rounds UP to the nearest integer (ceiling); math.floor(x) rounds DOWN to the nearest integer (floor).",
    explanation: "For 4.2: ceil is 5, floor is 4. For negative -4.2: ceil is -4, floor is -5.",
    hint: "ceil = up, floor = down.",
    level: "basic",
    codeExample: "import math\nprint(math.ceil(4.1))   # 5\nprint(math.floor(4.9))  # 4"
  },
  {
    question: "How do you compute the Greatest Common Divisor of two integers in Python?",
    shortAnswer: "math.gcd(a, b)",
    explanation: "math.gcd uses Euclid's algorithm in fast C code to compute GCD in logarithmic time.",
    hint: "Use math.gcd(a, b).",
    level: "basic",
    codeExample: "import math\nprint(math.gcd(48, 180))  # 12"
  },
  {
    question: "What is the difference between os.getcwd() and os.path.dirname(__file__)?",
    shortAnswer: "os.getcwd() returns the directory from which the terminal command was executed; os.path.dirname(__file__) returns the directory where the .py script file actually resides.",
    explanation: "If you run 'python /opt/app/main.py' from your home folder, getcwd() is your home folder, while __file__ points to '/opt/app'.",
    hint: "getcwd is terminal execution dir; __file__ is script location dir.",
    level: "moderate",
    codeExample: "import os\nprint('CWD:', os.getcwd())\nprint('Script Dir:', os.path.dirname(__file__))"
  },
  {
    question: "How do you shuffle a list in-place using the random module?",
    shortAnswer: "random.shuffle(my_list)",
    explanation: "random.shuffle modifies the list in place and returns None (it does not return a new list).",
    hint: "random.shuffle(list) modifies in place.",
    level: "basic",
    codeExample: "import random\ndeck = [1, 2, 3, 4]\nrandom.shuffle(deck)\nprint(deck)"
  },
  {
    question: "How do you immediately terminate a running Python program with a specific exit status code?",
    shortAnswer: "sys.exit(code) (0 for success, non-zero for error)",
    explanation: "sys.exit() raises the SystemExit exception, allowing Python to clean up finally blocks and exit cleanly.",
    hint: "Use sys.exit(0) or sys.exit(1).",
    level: "basic",
    codeExample: "import sys\n# sys.exit(0) -> Success\n# sys.exit(1) -> General Error"
  },
  {
    question: "How do you check if a file or directory exists on disk using the standard library?",
    shortAnswer: "os.path.exists(path) or pathlib.Path(path).exists()",
    explanation: "Returns True if the path exists, False otherwise.",
    hint: "Use os.path.exists(path).",
    level: "basic",
    codeExample: "import os\nprint(os.path.exists('Topic2.jsx'))"
  },
  {
    question: "What does sys.platform return on Windows vs Linux vs macOS?",
    shortAnswer: "'win32' on Windows, 'linux' on Linux, and 'darwin' on macOS.",
    explanation: "Used extensively for cross-platform branching in production scripts.",
    hint: "'win32', 'linux', 'darwin'.",
    level: "basic",
    codeExample: "import sys\nprint('Platform:', sys.platform)"
  },
  {
    question: "How do you calculate the difference in days between two dates in Python?",
    shortAnswer: "(date2 - date1).days",
    explanation: "Subtracting two date objects returns a timedelta object whose .days property gives the integer day count.",
    hint: "Subtract dates and read .days.",
    level: "basic",
    codeExample: "import datetime as dt\nd1 = dt.date(2026, 8, 1)\nd2 = dt.date(2026, 8, 24)\nprint((d2 - d1).days)  # 23"
  },
  {
    question: "What is math.factorial(n)?",
    shortAnswer: "Computes the product of all positive integers less than or equal to n (n!).",
    explanation: "math.factorial(5) computes 5 * 4 * 3 * 2 * 1 = 120 in C speed.",
    hint: "Computes n!",
    level: "basic",
    codeExample: "import math\nprint(math.factorial(5))  # 120"
  },
  {
    question: "How do you list all files and folders in a specific directory using the os module?",
    shortAnswer: "os.listdir(directory_path)",
    explanation: "Returns a list of entry names in the given directory.",
    hint: "Use os.listdir(path).",
    level: "basic",
    codeExample: "import os\nprint(os.listdir('.'))"
  },
  {
    question: "What is the modern standard library replacement for os.path in Python 3.4+?",
    shortAnswer: "The pathlib module (pathlib.Path)",
    explanation: "pathlib provides an object-oriented interface for file paths with overloaded '/' operators (e.g. Path('data') / 'file.txt').",
    hint: "The pathlib module.",
    level: "moderate",
    codeExample: "from pathlib import Path\np = Path.cwd() / 'data' / 'file.txt'\nprint(p)"
  },
  {
    question: "How do you generate a random floating-point number between 10.0 and 20.0?",
    shortAnswer: "random.uniform(10.0, 20.0)",
    explanation: "random.random() gives [0.0, 1.0), whereas random.uniform(a, b) gives a float in [a, b].",
    hint: "Use random.uniform(a, b).",
    level: "basic",
    codeExample: "import random\nprint(round(random.uniform(10.0, 20.0), 2))"
  },
  {
    question: "How do you get the current date and time in UTC format in Python?",
    shortAnswer: "datetime.datetime.now(datetime.timezone.utc)",
    explanation: "Using timezone.utc guarantees timezone-aware UTC timestamps, avoiding deprecated utcnow().",
    hint: "Use datetime.datetime.now(datetime.timezone.utc).",
    level: "moderate",
    codeExample: "import datetime as dt\nprint(dt.datetime.now(dt.timezone.utc))"
  },
  {
    question: "What is math.pow(x, y) vs the built-in operator x ** y?",
    shortAnswer: "math.pow(x, y) always converts its arguments to floats and returns a float; x ** y supports exact arbitrary-precision integers.",
    explanation: "For massive integer powers like 2 ** 1000, always use ** to preserve full integer precision.",
    hint: "math.pow returns float; ** preserves exact integer precision.",
    level: "moderate",
    codeExample: "import math\nprint(math.pow(2, 3))  # 8.0 (float)\nprint(2 ** 3)          # 8 (int)"
  }
];

export default questions;
