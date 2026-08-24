// src/components/study/python/topics/004_001_filesystem-os/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Modern path manipulation with pathlib.Path

const questions = [
  {
    question: "Why was 'pathlib' introduced in Python 3.4 to replace legacy 'os.path'?",
    shortAnswer: "'pathlib' provides an intuitive, object-oriented API where paths are rich first-class objects with methods and properties, eliminating error-prone string manipulation and hardcoded path separators.",
    explanation: "Object-oriented filesystem abstraction.",
    hint: "Encapsulates paths as rich objects rather than raw strings.",
    level: "basic",
    codeExample: "from pathlib import Path\np = Path('data') / 'report.csv'"
  },
  {
    question: "How does the slash '/' operator operate in 'pathlib.Path'?",
    shortAnswer: "The '/' operator is overloaded via the '__truediv__' dunder method to join path components cleanly using the host OS's native separator ('\\' on Windows, '/' on POSIX).",
    explanation: "Intuitive path joining syntax.",
    hint: "Overloads the division operator to join path components.",
    level: "basic",
    codeExample: "full_path = Path.cwd() / 'vault' / 'students' / 'profile.json'"
  },
  {
    question: "What is the difference between 'path.name', 'path.stem', and 'path.suffix'?",
    shortAnswer: "'path.name' is the full filename with extensions ('data.kyc.pdf'); 'path.stem' is the filename without the final extension ('data.kyc'); 'path.suffix' is the final extension ('.pdf').",
    explanation: "Path anatomy properties.",
    hint: "name=full leaf; stem=leaf without last extension; suffix=last extension.",
    level: "basic",
    codeExample: "p = Path('a/b/test.kyc.pdf'); p.name # 'test.kyc.pdf'; p.stem # 'test.kyc'; p.suffix # '.pdf'"
  },
  {
    question: "What does 'path.suffixes' return on a file with multiple extensions like 'archive.tar.gz'?",
    shortAnswer: "It returns a list of all extension strings in order: \"['.tar', '.gz']\".",
    explanation: "Multi-extension decomposition.",
    hint: "Returns a list of all extensions: ['.tar', '.gz'].",
    level: "basic",
    codeExample: "Path('backup.tar.gz').suffixes # ['.tar', '.gz']"
  },
  {
    question: "How do you change only the file extension of a Path object without mutating the original?",
    shortAnswer: "Using the pure transformation method 'path.with_suffix(\".new_ext\")'.",
    explanation: "Non-mutating extension replacement.",
    hint: "Use path.with_suffix('.csv').",
    level: "basic",
    codeExample: "new_path = Path('report.json').with_suffix('.csv')"
  },
  {
    question: "How do you change only the filename (leaf name) of a Path object?",
    shortAnswer: "Using 'path.with_name(\"new_filename.ext\")' (or 'path.with_stem(\"new_name\")' in Python 3.9+ to keep the extension).",
    explanation: "Leaf name replacement.",
    hint: "Use path.with_name('new_file.txt') or path.with_stem('new_stem').",
    level: "basic",
    codeExample: "Path('dir/old.txt').with_name('new.txt') # Path('dir/new.txt')"
  },
  {
    question: "What is the benefit of 'path.read_text()' and 'path.write_text()' over 'open()'?",
    shortAnswer: "They provide clean, readable one-liners that automatically handle file opening, reading/writing, and closing without verbose 'with open(...) as f:' context manager boilerplate.",
    explanation: "Concise standard library I/O convenience.",
    hint: "Convenient one-liners that automatically handle opening and closing files.",
    level: "basic",
    codeExample: "content = Path('config.json').read_text(encoding='utf-8')"
  },
  {
    question: "Why should you ALWAYS pass 'encoding=\"utf-8\"' to 'path.read_text()' and 'path.write_text()'?",
    shortAnswer: "Without an explicit encoding, Python defaults to the OS-dependent system encoding ('cp1252' on Windows), causing 'UnicodeDecodeError' when encountering non-ASCII or UTF-8 characters.",
    explanation: "Windows encoding portability invariant.",
    hint: "Prevents UnicodeDecodeError on Windows default cp1252.",
    level: "basic",
    codeExample: "Path('log.txt').write_text(data, encoding='utf-8')"
  },
  {
    question: "How do you create a deeply nested directory tree safely using pathlib?",
    shortAnswer: "Using 'path.mkdir(parents=True, exist_ok=True)'.",
    explanation: "Recursive idempotent directory creation.",
    hint: "Use path.mkdir(parents=True, exist_ok=True).",
    level: "basic",
    codeExample: "Path('vault/2026/q1/audits').mkdir(parents=True, exist_ok=True)"
  },
  {
    question: "How do you delete a file safely without raising an error if it doesn't exist?",
    shortAnswer: "Using 'path.unlink(missing_ok=True)' (introduced in Python 3.8).",
    explanation: "Idempotent file deletion.",
    hint: "Use path.unlink(missing_ok=True).",
    level: "basic",
    codeExample: "Path('temp_file.tmp').unlink(missing_ok=True)"
  },
  {
    question: "What is the difference between 'path.glob(\"*.py\")' and 'path.rglob(\"*.py\")'?",
    shortAnswer: "'path.glob(\"*.py\")' searches ONLY the immediate directory; 'path.rglob(\"*.py\")' recursively searches the directory and ALL nested subdirectories.",
    explanation: "Shallow vs recursive directory searching.",
    hint: "glob() searches immediate directory; rglob() searches all nested subdirectories.",
    level: "basic",
    codeExample: "all_py = list(Path.cwd().rglob('*.py'))"
  },
  {
    question: "How do you compute a relative subpath from a base directory using pathlib?",
    shortAnswer: "Using 'child_path.relative_to(base_path)'.",
    explanation: "Relative path derivation.",
    hint: "Use path.relative_to(base).",
    level: "basic",
    codeExample: "Path('/a/b/c/d.txt').relative_to('/a/b') # Path('c/d.txt')"
  },
  {
    question: "What is the difference between 'Path.cwd()' and 'Path.home()'?",
    shortAnswer: "'Path.cwd()' returns the Current Working Directory; 'Path.home()' returns the current user's operating system home directory (e.g. '/home/user' or 'C:\\Users\\user').",
    explanation: "Standard system path anchors.",
    hint: "cwd() is current working directory; home() is user's home folder.",
    level: "basic",
    codeExample: "user_downloads = Path.home() / 'Downloads'"
  },
  {
    question: "What does 'path.resolve()' do?",
    shortAnswer: "It converts a relative path into an absolute canonical path and resolves all filesystem symbolic links (symlinks) and '..' segments.",
    explanation: "Path normalization and canonicalization.",
    hint: "Resolves relative segments and symlinks to absolute canonical path.",
    level: "moderate",
    codeExample: "abs_path = Path('../report.csv').resolve()"
  },
  {
    question: "What does 'path.parent' vs 'path.parents' return?",
    shortAnswer: "'path.parent' returns the immediate parent folder; 'path.parents' is an immutable sequence of all ancestor directories leading up to the root ('path.parents[0]' is immediate, '[1]' is grandparent).",
    explanation: "Ancestor path hierarchy traversal.",
    hint: "parent is immediate folder; parents is sequence of all ancestor folders.",
    level: "basic",
    codeExample: "p = Path('/a/b/c/d.txt'); p.parent # /a/b/c; p.parents[1] # /a/b"
  },
  {
    question: "How do you check if a Path object points to an existing regular file or directory?",
    shortAnswer: "Using 'path.is_file()' (for regular files) and 'path.is_dir()' (for directories).",
    explanation: "Node classification methods.",
    hint: "path.is_file() and path.is_dir().",
    level: "basic",
    codeExample: "if target.is_file(): process_file(target)"
  },
  {
    question: "How do you read raw binary bytes from a file using pathlib?",
    shortAnswer: "Using 'raw_bytes = path.read_bytes()' and write with 'path.write_bytes(data)'.",
    explanation: "Binary file I/O convenience.",
    hint: "Use path.read_bytes() and path.write_bytes().",
    level: "basic",
    codeExample: "img_bytes = Path('logo.png').read_bytes()"
  },
  {
    question: "What does 'path.iterdir()' return and how does it differ from 'os.listdir()'?",
    shortAnswer: "'os.listdir()' returns a list of raw string filenames; 'path.iterdir()' yields 'Path' objects lazily, enabling immediate chaining of Path methods.",
    explanation: "Object-oriented directory iteration.",
    hint: "Yields Path objects lazily instead of raw strings.",
    level: "basic",
    codeExample: "for p in Path('.').iterdir(): print(p.suffix)"
  },
  {
    question: "What is 'PurePath' in the pathlib module?",
    shortAnswer: "A base class that provides pure computational path manipulation without accessing the real filesystem (useful when manipulating Unix paths on Windows or vice versa).",
    explanation: "Pure computational path manipulation.",
    hint: "Manipulates path strings purely in memory without filesystem I/O.",
    level: "moderate",
    codeExample: "from pathlib import PurePosixPath\np = PurePosixPath('/etc/nginx/nginx.conf')"
  },
  {
    question: "Can 'pathlib.Path' objects be passed directly to 'open()' or built-in functions?",
    shortAnswer: "Yes. 'Path' implements the '__fspath__' protocol (PEP 519), allowing Path objects to be passed seamlessly to 'open()', 'os.path', 'json.dump()', and third-party libraries.",
    explanation: "Standard OS filesystem path protocol compatibility.",
    hint: "Yes, Path implements __fspath__ and is accepted by all standard library file functions.",
    level: "basic",
    codeExample: "with open(Path('data.txt')) as f: ..."
  },
  {
    question: "How do you find the size of a file in bytes using pathlib?",
    shortAnswer: "Using 'path.stat().st_size'.",
    explanation: "Filesystem stat size query on Path objects.",
    hint: "Use path.stat().st_size.",
    level: "basic",
    codeExample: "size_kb = Path('app.log').stat().st_size / 1024"
  },
  {
    question: "How do you touch (create or update timestamp) a file using pathlib?",
    shortAnswer: "Using 'path.touch(exist_ok=True)'.",
    explanation: "File touching.",
    hint: "Use path.touch(exist_ok=True).",
    level: "basic",
    codeExample: "Path('heartbeat.lock').touch(exist_ok=True)"
  },
  {
    question: "How do you rename or move a file using pathlib?",
    shortAnswer: "Using 'path.rename(target_path)' (or 'path.replace(target_path)' for atomic overwrites).",
    explanation: "Path moving and renaming.",
    hint: "Use path.replace(new_path) for atomic replacement.",
    level: "basic",
    codeExample: "Path('draft.txt').replace(Path('published.txt'))"
  },
  {
    question: "What happens if you call 'path.relative_to(base)' when 'path' is not inside 'base'?",
    shortAnswer: "It raises a 'ValueError: path does not start with base'.",
    explanation: "Relative path boundary verification.",
    hint: "Raises ValueError if path is not a subpath of base.",
    level: "moderate",
    codeExample: "# Raises ValueError if path is not a child of base"
  },
  {
    question: "What is the ultimate golden rule for modern path manipulation in Python?",
    shortAnswer: "Use 'pathlib.Path' for all filesystem operations, compose paths with the '/' operator, use '.read_text()' and '.write_text()' with explicit 'encoding=\"utf-8\"', and create directories with '.mkdir(parents=True, exist_ok=True)'.",
    explanation: "The complete enterprise guideline for modern path handling in Python.",
    hint: "Always use pathlib.Path with slash operator, UTF-8 encoding, and idempotent mkdir.",
    level: "basic",
    codeExample: "# Python pathlib Enterprise Mastery"
  }
];

export default questions;
