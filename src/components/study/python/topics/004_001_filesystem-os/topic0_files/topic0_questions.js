// src/components/study/python/topics/004_001_filesystem-os/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: os module: environment variables, cwd, file system queries

const questions = [
  {
    question: "What is the primary role of the 'os' module in Python?",
    shortAnswer: "The 'os' module provides a portable, cross-platform interface to interact with operating system dependent functionalities (process management, environment variables, working directory, and filesystem queries).",
    explanation: "Core OS interface module in the Python standard library.",
    hint: "Provides cross-platform access to operating system and filesystem APIs.",
    level: "basic",
    codeExample: "import os; print(os.name, os.getcwd())"
  },
  {
    question: "What is the key difference between 'os.environ' and 'os.getenv()'?",
    shortAnswer: "'os.environ' is a dictionary-like mapping where missing keys raise a 'KeyError'; 'os.getenv(key, default=None)' returns a fallback default value instead of raising an error.",
    explanation: "Defensive environment variable access.",
    hint: "os.environ raises KeyError on missing keys; os.getenv returns a default value.",
    level: "basic",
    codeExample: "val = os.getenv('DATABASE_URL', 'localhost:5432') # Safe fallback"
  },
  {
    question: "Does modifying 'os.environ['MY_VAR'] = '123'' permanently change the environment in the host operating system shell?",
    shortAnswer: "No. Changes to 'os.environ' only affect the currently running Python process and any child subprocesses spawned by it; the parent OS shell environment remains completely unchanged.",
    explanation: "Process environment isolation invariant.",
    hint: "No, environment changes are scoped only to the running Python process and child subprocesses.",
    level: "moderate",
    codeExample: "os.environ['APP_PORT'] = '8080' # Affects only current process"
  },
  {
    question: "What does 'os.environ.setdefault(key, default)' do?",
    shortAnswer: "It sets the environment variable to 'default' ONLY IF the variable is not already defined in the environment, preserving existing values.",
    explanation: "Safe environment default initialization.",
    hint: "Sets the variable only if it does not already exist.",
    level: "basic",
    codeExample: "os.environ.setdefault('LOG_LEVEL', 'DEBUG')"
  },
  {
    question: "What is the difference between 'os.getcwd()' and the special variable '__file__'?",
    shortAnswer: "'os.getcwd()' returns the Current Working Directory from which the Python script was launched; '__file__' holds the relative or absolute path of the script file itself on disk.",
    explanation: "CWD vs script file location distinction.",
    hint: "os.getcwd() is where the terminal was when running python; __file__ is where the .py file lives.",
    level: "basic",
    codeExample: "cwd = os.getcwd(); script_dir = os.path.dirname(os.path.abspath(__file__))"
  },
  {
    question: "Why is calling 'os.chdir(new_dir)' considered an anti-pattern in multi-threaded web servers?",
    shortAnswer: "The Current Working Directory is process-global; calling 'os.chdir()' changes the working directory for ALL concurrently running threads in the process, causing race conditions in relative file operations.",
    explanation: "Process-global state hazard in concurrent systems.",
    hint: "CWD is shared globally across all threads, causing race conditions.",
    level: "moderate",
    codeExample: "# Prefer passing absolute paths over calling os.chdir()"
  },
  {
    question: "What is the difference between 'os.path.exists()', 'os.path.isfile()', and 'os.path.isdir()'?",
    shortAnswer: "'os.path.exists()' returns True for any existing filesystem entry (file, directory, symlink); 'os.path.isfile()' returns True only for regular files; 'os.path.isdir()' returns True only for directories.",
    explanation: "Filesystem node classification.",
    hint: "exists checks any node; isfile checks regular files; isdir checks directories.",
    level: "basic",
    codeExample: "os.path.exists(p); os.path.isfile(p); os.path.isdir(p)"
  },
  {
    question: "What is the difference between 'os.mkdir()' and 'os.makedirs()'?",
    shortAnswer: "'os.mkdir()' creates only a single directory and fails if parent directories are missing; 'os.makedirs()' recursively creates all missing intermediate parent directories along the path.",
    explanation: "Single directory creation vs recursive hierarchy creation.",
    hint: "os.mkdir creates only the leaf; os.makedirs creates intermediate parent directories.",
    level: "basic",
    codeExample: "os.makedirs('logs/2026/q1', exist_ok=True)"
  },
  {
    question: "Why should you ALWAYS pass 'exist_ok=True' to 'os.makedirs()' in production code?",
    shortAnswer: "Without 'exist_ok=True', 'os.makedirs()' raises a 'FileExistsError' if the target directory already exists; with 'exist_ok=True', it succeeds idempotently without error.",
    explanation: "Idempotent directory creation.",
    hint: "Prevents FileExistsError if the directory already exists.",
    level: "basic",
    codeExample: "os.makedirs(vault_dir, exist_ok=True)"
  },
  {
    question: "What is 'os.replace(src, dst)' and why is it preferred over 'os.rename(src, dst)'?",
    shortAnswer: "'os.replace()' is guaranteed to be an atomic cross-platform file replacement, silently overwriting 'dst' if it exists on both Windows and POSIX systems; on Windows, 'os.rename()' raises 'FileExistsError' if 'dst' exists.",
    explanation: "Atomic file swap semantics.",
    hint: "os.replace atomically overwrites the destination on all OS platforms.",
    level: "moderate",
    codeExample: "os.replace('temp_draft.txt', 'production_data.txt')"
  },
  {
    question: "How do you test file permissions using 'os.access()'?",
    shortAnswer: "Using bitwise OR of permission constants: 'os.access(path, os.R_OK | os.W_OK)', which checks for read and write permissions according to the operating system.",
    explanation: "OS permission verification.",
    hint: "Use os.access(path, os.R_OK | os.W_OK | os.X_OK).",
    level: "basic",
    codeExample: "is_writable = os.access('/var/log/app.log', os.W_OK)"
  },
  {
    question: "What information does 'os.stat(path)' return?",
    shortAnswer: "A 'stat_result' object containing low-level inode/filesystem metadata: 'st_size' (bytes), 'st_mtime' (modification time), 'st_ctime' (creation time), 'st_mode' (permissions), and 'st_uid'/'st_gid'.",
    explanation: "Filesystem metadata inspection.",
    hint: "Returns st_size, st_mtime, st_ctime, st_mode, etc.",
    level: "basic",
    codeExample: "stat_info = os.stat('data.csv'); print(stat_info.st_size, stat_info.st_mtime)"
  },
  {
    question: "What does 'os.name' return on Windows vs Linux/macOS?",
    shortAnswer: "'os.name' returns ''nt'' on Windows NT-based systems, and ''posix'' on Linux, macOS, and Unix-like operating systems.",
    explanation: "OS kernel identification.",
    hint: "'nt' on Windows, 'posix' on Linux and macOS.",
    level: "basic",
    codeExample: "is_windows = (os.name == 'nt')"
  },
  {
    question: "How do you get the current Process ID (PID) and Parent Process ID (PPID) in Python?",
    shortAnswer: "Using 'os.getpid()' for the current process ID and 'os.getppid()' for the parent process ID.",
    explanation: "Process identification in Python.",
    hint: "os.getpid() and os.getppid().",
    level: "basic",
    codeExample: "pid = os.getpid(); ppid = os.getppid()"
  },
  {
    question: "How do you get the number of logical CPU cores on the host machine using 'os'?",
    shortAnswer: "Using 'os.cpu_count()', which returns an integer representing the number of logical cores (or 'None' if undetermined).",
    explanation: "Hardware introspection.",
    hint: "Use os.cpu_count().",
    level: "basic",
    codeExample: "workers = os.cpu_count() or 4"
  },
  {
    question: "How do you delete a single file and a single empty directory using 'os'?",
    shortAnswer: "Use 'os.remove(file_path)' (or 'os.unlink()') to delete a file, and 'os.rmdir(dir_path)' to delete an empty directory.",
    explanation: "File and empty folder removal.",
    hint: "os.remove() for files; os.rmdir() for empty directories.",
    level: "basic",
    codeExample: "os.remove('temp.log'); os.rmdir('empty_folder')"
  },
  {
    question: "What happens if you call 'os.rmdir()' on a directory that contains files?",
    shortAnswer: "It raises an 'OSError: [Errno 39] Directory not empty' (or 'WindowsError: [Error 145]'); use 'shutil.rmtree()' to delete non-empty directory trees.",
    explanation: "Non-empty directory deletion safety.",
    hint: "Raises OSError because the directory is not empty; use shutil.rmtree() instead.",
    level: "basic",
    codeExample: "# To delete non-empty directory: shutil.rmtree(dir_path)"
  },
  {
    question: "How do you convert a Unix epoch timestamp from 'os.path.getmtime()' into a human-readable datetime string?",
    shortAnswer: "Using 'datetime.datetime.fromtimestamp(os.path.getmtime(path)).strftime(\"%Y-%m-%d %H:%M:%S\")'.",
    explanation: "Timestamp formatting.",
    hint: "Use datetime.fromtimestamp(os.path.getmtime(path)).",
    level: "basic",
    codeExample: "dt = datetime.fromtimestamp(os.path.getmtime('app.log'))"
  },
  {
    question: "What is 'os.path.abspath(path)' vs 'os.path.realpath(path)'?",
    shortAnswer: "'os.path.abspath()' resolves relative paths against the CWD; 'os.path.realpath()' additionally resolves all filesystem symbolic links (symlinks) to their canonical target.",
    explanation: "Path canonicalization and symlink resolution.",
    hint: "abspath resolves relative paths; realpath also resolves symlinks.",
    level: "moderate",
    codeExample: "canonical_path = os.path.realpath('/symlink/to/data')"
  },
  {
    question: "How do you join path components portably across Windows and Linux using 'os.path'?",
    shortAnswer: "Using 'os.path.join(\"folder\", \"subfolder\", \"file.txt\")' (or modern 'pathlib.Path').",
    explanation: "Cross-platform path separator handling.",
    hint: "Use os.path.join() to handle OS-specific path separators automatically.",
    level: "basic",
    codeExample: "log_path = os.path.join('var', 'log', 'app.log')"
  },
  {
    question: "What does 'os.listdir(dir_path)' return?",
    shortAnswer: "A list of strings containing the names of all entries (files and folders) inside the directory, excluding '.' and '..'.",
    explanation: "Directory listing.",
    hint: "Returns a list of entry names inside the directory.",
    level: "basic",
    codeExample: "files = os.listdir('/var/log')"
  },
  {
    question: "Why is hardcoding forward slashes ('/') or backslashes ('\\\\') in file paths an anti-pattern?",
    shortAnswer: "Hardcoded separators break cross-platform portability; Windows uses '\\' and Linux/macOS use '/', so use 'os.path.join()' or 'pathlib.Path' instead.",
    explanation: "Cross-platform path compatibility.",
    hint: "Hardcoded separators cause bugs across Windows and Linux; use os.path.join.",
    level: "basic",
    codeExample: "# BAD: 'dir\\file.txt' -> GOOD: os.path.join('dir', 'file.txt')"
  },
  {
    question: "How do you safely read an integer environment variable with a default fallback?",
    shortAnswer: "Using 'int(os.getenv(\"PORT\", \"8000\"))', providing a default string value before calling 'int()'.",
    explanation: "Type casting environment variables.",
    hint: "Pass default as string to getenv, then cast to int.",
    level: "basic",
    codeExample: "port = int(os.getenv('PORT', '8080'))"
  },
  {
    question: "What is 'os.urandom(size)' and why is it used for cryptography?",
    shortAnswer: "It generates cryptographically strong random bytes from the OS kernel entropy source ('/dev/urandom' on Unix, CryptGenRandom/BCrypt on Windows), suitable for encryption keys and tokens.",
    explanation: "Kernel cryptographic random source.",
    hint: "Generates cryptographically secure random bytes directly from the OS kernel.",
    level: "moderate",
    codeExample: "token = os.urandom(32).hex()"
  },
  {
    question: "What is the ultimate golden rule for using the 'os' module in production Python applications?",
    shortAnswer: "Always access environment secrets with 'os.getenv()' fallbacks, create directories with 'os.makedirs(exist_ok=True)', perform atomic file overwrites with 'os.replace()', and never hardcode OS path separators.",
    explanation: "The complete enterprise guideline for the os module in Python.",
    hint: "Use os.getenv with fallbacks, os.makedirs(exist_ok=True), os.replace for atomic swaps, and portable path joins.",
    level: "basic",
    codeExample: "# Python OS Module Enterprise Mastery"
  }
];

export default questions;
