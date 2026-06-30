// topic5_questions.js
// 30 questions about the current working directory (moderate to expert)

const questions = [
  {
    question: "What does CWD stand for and what is it?",
    shortAnswer: "Current Working Directory – the directory in which a process is currently operating.",
    explanation: "It's the base location for resolving relative paths.",
    hint: "Think of it as your 'current folder' in a terminal.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you get the CWD in Python?",
    shortAnswer: "Using os.getcwd() or pathlib.Path.cwd().",
    explanation: "Both return the absolute path of the current working directory.",
    hint: "os.getcwd() is classic, Path.cwd() is modern.",
    level: "basic",
    codeExample: "import os; os.getcwd()"
  },
  {
    question: "How do you change the CWD in Python?",
    shortAnswer: "Using os.chdir(path).",
    explanation: "It changes the working directory for the entire process.",
    hint: "Use with caution; it's global.",
    level: "intermediate",
    codeExample: "os.chdir('/home/user')"
  },
  {
    question: "What is the difference between CWD and the script's directory?",
    shortAnswer: "CWD is where the process started; script directory is where the script file resides.",
    explanation: "They are often different; rely on `__file__` for script location.",
    hint: "Running a script from a different folder changes the CWD but not the script location.",
    level: "intermediate",
    codeExample: "os.path.dirname(__file__)"
  },
  {
    question: "How can you get the script's absolute path?",
    shortAnswer: "Using `os.path.abspath(__file__)`.",
    explanation: "__file__ is the relative path of the script; abspath makes it absolute.",
    hint: "Use this to build paths relative to the script.",
    level: "intermediate",
    codeExample: "os.path.dirname(os.path.abspath(__file__))"
  },
  {
    question: "Why does a relative path sometimes fail even though the file exists?",
    shortAnswer: "Because the CWD may be different from where the file is located.",
    explanation: "Relative paths are resolved from the CWD, not from the script's location.",
    hint: "Always check the CWD if relative paths behave unexpectedly.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What happens to the CWD when you use `os.chdir()` inside a script?",
    shortAnswer: "The CWD changes for the entire Python process, including imported modules.",
    explanation: "It's a global change that affects all subsequent file operations.",
    hint: "It's like changing directory in a shell.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you safely change the CWD temporarily?",
    shortAnswer: "Save the original CWD, change, do your work, then restore it.",
    explanation: "Use try‑finally or a context manager to ensure restoration.",
    hint: "Wrap it in a context manager for safety.",
    level: "advanced",
    codeExample: "old = os.getcwd(); try: os.chdir(...); finally: os.chdir(old)"
  },
  {
    question: "What is the `pathlib.Path.cwd()` method?",
    shortAnswer: "It returns a Path object representing the current working directory.",
    explanation: "It's the pathlib equivalent of os.getcwd().",
    hint: "Use it for a more OOP style.",
    level: "intermediate",
    codeExample: "from pathlib import Path; Path.cwd()"
  },
  {
    question: "Does `os.chdir()` work on Windows with backslashes?",
    shortAnswer: "Yes, but it's safer to use forward slashes or `os.path.join`.",
    explanation: "Python accepts both, but using `os.path` ensures portability.",
    hint: "Use `os.path.normpath` if needed.",
    level: "intermediate",
    codeExample: "os.chdir('C:/Users')  # works on Windows too"
  },
  {
    question: "How does the CWD affect the `open()` function?",
    shortAnswer: "If you pass a relative path, `open()` looks for the file relative to the CWD.",
    explanation: "If the file is not in the CWD, you'll get a FileNotFoundError.",
    hint: "Use absolute or script‑relative paths to avoid this.",
    level: "basic",
    codeExample: "open('data.txt')  # looks in CWD"
  },
  {
    question: "What is the difference between `__file__` and `os.getcwd()`?",
    shortAnswer: "`__file__` is the path to the script; `os.getcwd()` is the current working directory.",
    explanation: "They can be the same but are often different.",
    hint: "`__file__` is about where the script lives; CWD is about where you are.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why is it a bad idea to use `os.chdir()` in a library?",
    shortAnswer: "It can silently break the calling code by changing its CWD.",
    explanation: "Libraries should not change global state like the CWD.",
    hint: "Use absolute paths or accept paths as parameters.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you get the parent directory of the CWD?",
    shortAnswer: "Use `os.path.dirname(os.getcwd())` or `Path.cwd().parent`.",
    explanation: "Both give you the parent directory of the CWD.",
    hint: "`Path.cwd().parent` is more readable.",
    level: "intermediate",
    codeExample: "from pathlib import Path; Path.cwd().parent"
  },
  {
    question: "What is the effect of running a Python script from a symlinked directory?",
    shortAnswer: "The CWD will be the symlink's target (if you cd into the symlink), but `__file__` may be resolved differently.",
    explanation: "Python resolves `__file__` to the actual file location, not the symlink.",
    hint: "Use `os.path.realpath` to resolve symlinks.",
    level: "advanced",
    codeExample: "os.path.realpath(__file__)"
  },
  {
    question: "How can you get the CWD as a string from a Path object?",
    shortAnswer: "Use `str(Path.cwd())` or `Path.cwd().as_posix()` for forward slashes.",
    explanation: "Path objects are not strings; convert when needed.",
    hint: "`as_posix()` gives a path with `/` separators.",
    level: "intermediate",
    codeExample: "str(Path.cwd())"
  },
  {
    question: "What is the difference between `os.getcwd()` and `os.path.abspath('.')`?",
    shortAnswer: "They both return the absolute path of the current directory; they are functionally equivalent.",
    explanation: "Both give the same result.",
    hint: "Use `os.getcwd()` for clarity.",
    level: "basic",
    codeExample: "os.path.abspath('.') == os.getcwd()"
  },
  {
    question: "How do you change the CWD to the script's directory?",
    shortAnswer: "Use `os.chdir(os.path.dirname(__file__))`.",
    explanation: "This makes the script's directory the CWD, so relative paths work from there.",
    hint: "Common pattern in scripts that need to load relative resources.",
    level: "intermediate",
    codeExample: "os.chdir(os.path.dirname(__file__))"
  },
  {
    question: "Why might `os.chdir()` raise a PermissionError?",
    shortAnswer: "If the user does not have execute permission on the target directory.",
    explanation: "You need appropriate permissions to change into a directory.",
    hint: "Check permissions with `os.access(path, os.X_OK)`.",
    level: "intermediate",
    codeExample: "if os.access(path, os.X_OK): os.chdir(path)"
  },
  {
    question: "What is the `os.path` equivalent of `Path.cwd().resolve()`?",
    shortAnswer: "`os.path.realpath(os.getcwd())` — but `os.getcwd()` already returns an absolute path.",
    explanation: "`resolve()` also normalizes and resolves symlinks.",
    hint: "Use `Path.cwd().resolve()` for consistency.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you change the CWD from within an interactive Python session?",
    shortAnswer: "Yes, using `os.chdir()` works in the interpreter just like in a script.",
    explanation: "It changes the CWD for the current interpreter session.",
    hint: "Try it in a Python shell.",
    level: "basic",
    codeExample: ">>> import os; os.chdir('/tmp')"
  },
  {
    question: "How does the CWD affect imports in Python?",
    shortAnswer: "The CWD is added to sys.path, so modules in the CWD can be imported.",
    explanation: "Python includes the CWD in the module search path.",
    hint: "That's why you can import scripts from the same folder.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the `os.getcwdb()` function?",
    shortAnswer: "It returns the CWD as bytes (not string).",
    explanation: "Rarely used; `os.getcwd()` returns a string.",
    hint: "It's a low‑level function; you probably don't need it.",
    level: "advanced",
    codeExample: "os.getcwdb()  # b'/home/user'"
  },
  {
    question: "How can you list all files in the CWD?",
    shortAnswer: "Using `os.listdir('.')` or `list(Path.cwd().iterdir())`.",
    explanation: "Both give you the contents of the CWD.",
    hint: "Path.cwd().iterdir() is more expressive.",
    level: "intermediate",
    codeExample: "for f in Path.cwd().iterdir(): print(f)"
  },
  {
    question: "What is the role of the CWD in subprocesses?",
    shortAnswer: "Subprocesses inherit the CWD of the parent process by default, but you can specify a different one.",
    explanation: "You can set `cwd` parameter in `subprocess.Popen`.",
    hint: "Use `subprocess.run(['ls'], cwd='/tmp')`.",
    level: "advanced",
    codeExample: "subprocess.run(['ls'], cwd='/tmp')"
  },
  {
    question: "Why might you want to change the CWD in a script?",
    shortAnswer: "To simplify relative paths for a group of files, or to run legacy code that expects a certain CWD.",
    explanation: "It can make code shorter, but it's generally better to use absolute or script‑relative paths.",
    hint: "Use it sparingly.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the difference between `os.chdir('..')` and `os.chdir(os.path.dirname(os.getcwd()))`?",
    shortAnswer: "They both go up one directory level. The latter is more explicit and avoids ambiguity with symlinks.",
    explanation: "`'..'` is a relative path; `os.path.dirname` is more precise.",
    hint: "Use `Path.cwd().parent` for clarity.",
    level: "intermediate",
    codeExample: "os.chdir(Path.cwd().parent)"
  },
  {
    question: "How can you ensure a script always runs with a specific CWD?",
    shortAnswer: "Call `os.chdir()` at the start of the script, or set the CWD in the shell before running.",
    explanation: "But be careful; it affects the whole process.",
    hint: "Alternatively, use `__file__` to build absolute paths.",
    level: "intermediate",
    codeExample: "os.chdir('/path/to/your/project')"
  },
  {
    question: "What is the relationship between CWD and home directory (`~`)?",
    shortAnswer: "They are different; `~` is the user's home, while CWD can be anywhere.",
    explanation: "`~` is expanded with `os.path.expanduser()`.",
    hint: "Don't confuse `~` with CWD.",
    level: "basic",
    codeExample: "os.path.expanduser('~')"
  },
  {
    question: "How do you get the CWD in a cross‑platform way using `pathlib`?",
    shortAnswer: "`Path.cwd()` works identically on all platforms.",
    explanation: "It returns a Path object that abstracts away platform differences.",
    hint: "Use it for new projects.",
    level: "basic",
    codeExample: "from pathlib import Path; Path.cwd()"
  },
  {
    question: "What happens to the CWD when a script is run as a module (with `-m`)?",
    shortAnswer: "The CWD remains the directory from which the command was run, not the module's location.",
    explanation: "Using `python -m mypackage.module` does not change the CWD.",
    hint: "The CWD is still the terminal's current directory.",
    level: "advanced",
    codeExample: null
  }
];

export default questions;