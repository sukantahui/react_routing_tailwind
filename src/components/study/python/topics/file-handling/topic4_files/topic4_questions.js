// topic4_questions.js
// 30 questions about file paths (moderate to expert)

const questions = [
  {
    question: "What is the difference between an absolute and a relative path?",
    shortAnswer: "An absolute path starts from the root; a relative path starts from the current working directory.",
    explanation: "Absolute paths are unambiguous but non‑portable; relative paths are portable but depend on the CWD.",
    hint: "One is like a full address, the other like 'next door'.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you get the current working directory in Python?",
    shortAnswer: "Using os.getcwd() or Path.cwd() from pathlib.",
    explanation: "Both return the absolute path of the current directory.",
    hint: "os.getcwd() is the classic way; Path.cwd() is modern.",
    level: "basic",
    codeExample: "import os; os.getcwd()"
  },
  {
    question: "How do you change the current working directory in Python?",
    shortAnswer: "Using os.chdir(path) or Path.cwd() (but Path.cwd() is read‑only).",
    explanation: "os.chdir() changes the CWD for the entire Python process.",
    hint: "Use with caution; it affects all subsequent file operations.",
    level: "intermediate",
    codeExample: "os.chdir('/home/user')"
  },
  {
    question: "Why is hard‑coding absolute paths considered a bad practice?",
    shortAnswer: "It makes your code non‑portable and breaks when the file structure changes.",
    explanation: "Absolute paths work only on the developer's machine, not on other systems or after deployment.",
    hint: "Use relative paths or environment variables instead.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does `os.path.join()` do and why is it useful?",
    shortAnswer: "It joins path components using the correct separator for the current OS.",
    explanation: "This makes your code cross‑platform and avoids hard‑coding slashes.",
    hint: "Never use string concatenation for paths.",
    level: "intermediate",
    codeExample: "os.path.join('folder', 'file.txt')"
  },
  {
    question: "What is `__file__` in Python?",
    shortAnswer: "It's a built‑in variable that contains the path of the current script file.",
    explanation: "Use it to construct paths relative to the script's location.",
    hint: "It's useful for determining where your script resides.",
    level: "intermediate",
    codeExample: "os.path.dirname(__file__)"
  },
  {
    question: "How do you get the directory name of a path?",
    shortAnswer: "Use os.path.dirname(path) or Path(path).parent.",
    explanation: "Both return the parent directory of the given path.",
    hint: "os.path.dirname('/home/user/file.txt') → '/home/user'",
    level: "basic",
    codeExample: "os.path.dirname('/home/user/file.txt')"
  },
  {
    question: "How do you get the filename from a path?",
    shortAnswer: "Use os.path.basename(path) or Path(path).name.",
    explanation: "Returns the last component of the path.",
    hint: "os.path.basename('/home/user/file.txt') → 'file.txt'",
    level: "basic",
    codeExample: "os.path.basename('/home/user/file.txt')"
  },
  {
    question: "What is the `pathlib` module and why is it preferred over `os.path`?",
    shortAnswer: "It provides an object‑oriented interface to paths, making code more readable and less error‑prone.",
    explanation: "Path objects have methods for all common operations, and they handle separators automatically.",
    hint: "It's the modern way; use it for new projects.",
    level: "intermediate",
    codeExample: "from pathlib import Path; p = Path('folder/file.txt')"
  },
  {
    question: "How can you check if a file exists using `pathlib`?",
    shortAnswer: "Use the `.exists()` method on a Path object.",
    explanation: "It returns True if the file or directory exists.",
    hint: "Path('data.txt').exists()",
    level: "basic",
    codeExample: "Path('data.txt').exists()"
  },
  {
    question: "What is the difference between `os.path.abspath()` and `os.path.realpath()`?",
    shortAnswer: "`abspath()` returns the absolute path; `realpath()` also resolves symbolic links.",
    explanation: "`realpath()` follows symlinks to get the canonical path.",
    hint: "Use `realpath()` when you want the final target of a symlink.",
    level: "advanced",
    codeExample: "os.path.realpath('link_to_file')"
  },
  {
    question: "What does `os.path.normpath()` do?",
    shortAnswer: "It normalizes a path by collapsing redundant separators and up‑level references (..).",
    explanation: "Useful for cleaning up user‑input paths.",
    hint: "It makes paths consistent.",
    level: "intermediate",
    codeExample: "os.path.normpath('folder/../file.txt') → 'file.txt'"
  },
  {
    question: "How do you get the parent directory of a path using `pathlib`?",
    shortAnswer: "Using the `.parent` attribute.",
    explanation: "Path('/home/user/file.txt').parent → Path('/home/user')",
    hint: "You can chain .parent.parent for grandparent.",
    level: "basic",
    codeExample: "Path('/home/user/file.txt').parent"
  },
  {
    question: "What is the purpose of `os.path.expanduser()`?",
    shortAnswer: "It replaces `~` with the current user's home directory path.",
    explanation: "Useful for paths like `~/Documents/report.pdf`.",
    hint: "Makes user‑home relative paths absolute.",
    level: "intermediate",
    codeExample: "os.path.expanduser('~/Documents')"
  },
  {
    question: "How do you split a path into drive and path parts on Windows?",
    shortAnswer: "Use `os.path.splitdrive(path)`.",
    explanation: "Returns a tuple (drive, rest).",
    hint: "Not needed on Unix.",
    level: "advanced",
    codeExample: "os.path.splitdrive('C:\\Users\\file.txt')"
  },
  {
    question: "What is the `os.path.sep` constant?",
    shortAnswer: "It's the separator character for the current OS ('/' on Unix, '\\' on Windows).",
    explanation: "Useful when you need to know the separator.",
    hint: "Don't hard‑code separators; use `os.path.join` instead.",
    level: "intermediate",
    codeExample: "os.path.sep  # '/', '\\', etc."
  },
  {
    question: "Why might a relative path fail when running a script from a different directory?",
    shortAnswer: "Because the CWD changes, so the relative path points to a different location.",
    explanation: "The script's location and the CWD are not necessarily the same.",
    hint: "Use `__file__` to base paths on the script location.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you get the absolute path of the script's directory?",
    shortAnswer: "Use `os.path.dirname(os.path.abspath(__file__))`.",
    explanation: "This gives the folder containing the script, regardless of the CWD.",
    hint: "This is a common pattern for config file loading.",
    level: "intermediate",
    codeExample: "script_dir = os.path.dirname(os.path.abspath(__file__))"
  },
  {
    question: "What is the difference between `.` and `..` in file paths?",
    shortAnswer: "`.` means the current directory; `..` means the parent directory.",
    explanation: "They are used in relative paths to navigate the file system.",
    hint: "`../` goes up one level.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you check if a path is absolute in Python?",
    shortAnswer: "Using `os.path.isabs(path)` or `Path(path).is_absolute()`.",
    explanation: "Returns True if the path is absolute.",
    hint: "Useful before concatenation.",
    level: "intermediate",
    codeExample: "os.path.isabs('/home/user/file.txt')"
  },
  {
    question: "What is a relative path starting with `./`?",
    shortAnswer: "It explicitly indicates the current directory; equivalent to without `./`.",
    explanation: "It's often used for clarity, especially in scripts.",
    hint: "`./file.txt` means 'file.txt in the current directory'.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you list files in a directory using `pathlib`?",
    shortAnswer: "Use `Path.iterdir()` or `Path.glob('*')`.",
    explanation: "`iterdir()` yields Path objects for each entry.",
    hint: "`for p in Path('.').iterdir(): print(p)`",
    level: "intermediate",
    codeExample: "for p in Path('.').iterdir(): print(p)"
  },
  {
    question: "What is the `os.path.splitext()` function used for?",
    shortAnswer: "It splits a filename into the base name and the extension.",
    explanation: "Returns a tuple (root, ext).",
    hint: "Useful for changing file extensions.",
    level: "intermediate",
    codeExample: "os.path.splitext('image.jpg') → ('image', '.jpg')"
  },
  {
    question: "How can you construct a path from a list of components in a cross‑platform way?",
    shortAnswer: "Using `os.path.join(*list_of_components)` or `Path(*list_of_components)`.",
    explanation: "Both handle separators correctly.",
    hint: "`os.path.join('home', 'user', 'file.txt')`",
    level: "intermediate",
    codeExample: "os.path.join('folder', 'subfolder', 'file.txt')"
  },
  {
    question: "What is a symlink and how does it affect paths?",
    shortAnswer: "A symbolic link is a pointer to another file or directory; it can make paths more complex.",
    explanation: "`os.path.realpath()` resolves symlinks to the target.",
    hint: "Symlinks can lead to circular references if not careful.",
    level: "advanced",
    codeExample: "os.path.realpath('link_to_dir')"
  },
  {
    question: "How do you get the size of a file using `pathlib`?",
    shortAnswer: "Use the `.stat().st_size` attribute or `.resolve().stat().st_size`.",
    explanation: "Returns the file size in bytes.",
    hint: "`Path('file.txt').stat().st_size`",
    level: "intermediate",
    codeExample: "Path('file.txt').stat().st_size"
  },
  {
    question: "What is the difference between `Path.resolve()` and `Path.absolute()`?",
    shortAnswer: "`resolve()` returns the absolute path, resolving symlinks and normalizing; `absolute()` returns the absolute path without resolving symlinks.",
    explanation: "Use `resolve()` for canonical paths.",
    hint: "`absolute()` is simpler but doesn't handle symlinks.",
    level: "advanced",
    codeExample: "Path('.').resolve()"
  },
  {
    question: "How do you change a file's extension using `pathlib`?",
    shortAnswer: "Use `Path.with_suffix(new_suffix)`.",
    explanation: "Returns a new Path with the extension changed.",
    hint: "`Path('image.jpg').with_suffix('.png')`",
    level: "intermediate",
    codeExample: "Path('image.jpg').with_suffix('.png')"
  },
  {
    question: "What is the `os.path.commonpath()` function?",
    shortAnswer: "It returns the longest common sub‑path of a list of paths.",
    explanation: "Useful for finding a shared parent directory.",
    hint: "`os.path.commonpath(['/a/b/c', '/a/b/d']) → '/a/b'`",
    level: "advanced",
    codeExample: "os.path.commonpath(['/a/b/c', '/a/b/d'])"
  },
  {
    question: "How do you create a new directory with `pathlib`?",
    shortAnswer: "Use `.mkdir()` with `exist_ok=True` to avoid errors if it already exists.",
    explanation: "`Path('new_folder').mkdir(exist_ok=True)`",
    hint: "Use `parents=True` to create intermediate directories.",
    level: "intermediate",
    codeExample: "Path('new_folder').mkdir(exist_ok=True)"
  },
  {
    question: "Why is `pathlib` recommended over `os.path` for new code?",
    shortAnswer: "It's more readable, intuitive, and less error‑prone, with a unified object interface.",
    explanation: "Path objects encapsulate all path operations, reducing the need for string manipulation.",
    hint: "It's the future of Python path handling.",
    level: "intermediate",
    codeExample: null
  }
];

export default questions;