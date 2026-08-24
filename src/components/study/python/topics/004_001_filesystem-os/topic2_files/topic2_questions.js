// src/components/study/python/topics/004_001_filesystem-os/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Directory traversal: os.walk(), scandir(), and glob patterns

const questions = [
  {
    question: "What does 'os.walk(top_dir)' yield on each iteration?",
    shortAnswer: "A 3-tuple '(root, dirs, files)' where 'root' is the current directory path string, 'dirs' is a list of subdirectories in 'root', and 'files' is a list of non-directory filenames in 'root'.",
    explanation: "Recursive directory tree generator protocol.",
    hint: "Yields a 3-tuple: (root, dirs, files).",
    level: "basic",
    codeExample: "for root, dirs, files in os.walk('.'): print(root, len(files))"
  },
  {
    question: "How do you prune subdirectories (e.g., skip '.git' or '__pycache__') during 'os.walk()'?",
    shortAnswer: "By mutating the 'dirs' list IN-PLACE using slice assignment ('dirs[:] = [d for d in dirs if not d.startswith('.')]') or 'dirs.remove(name)' when 'topdown=True'.",
    explanation: "In-place list mutation pruning invariant.",
    hint: "Mutate dirs in-place with dirs[:] = [...] or dirs.remove().",
    level: "moderate",
    codeExample: "for root, dirs, files in os.walk(p, topdown=True):\n    dirs[:] = [d for d in dirs if d != '__pycache__']"
  },
  {
    question: "Why does writing 'dirs = [d for d in dirs if d != \".git\"]' FAIL to prune directories in 'os.walk()'?",
    shortAnswer: "Because reassigning 'dirs = ...' binds the local variable 'dirs' to a brand new list in memory without modifying the original list referenced internally by the 'os.walk()' generator; you must mutate it in-place via 'dirs[:] = ...'.",
    explanation: "Python variable rebinding vs in-place slice mutation.",
    hint: "dirs = ... rebinds the local variable; dirs[:] = ... modifies the list in-place.",
    level: "moderate",
    codeExample: "# BAD: dirs = [d for d in dirs] -> GOOD: dirs[:] = [d for d in dirs]"
  },
  {
    question: "What is the difference between 'topdown=True' and 'topdown=False' in 'os.walk()'?",
    shortAnswer: "With 'topdown=True', parent directories are visited BEFORE their children (enabling subtree pruning); with 'topdown=False', child leaf directories are visited BEFORE their parents (ideal for bottom-up deletion).",
    explanation: "Tree traversal order.",
    hint: "topdown=True visits parents first; topdown=False visits children first.",
    level: "basic",
    codeExample: "# topdown=False is ideal for bottom-up directory deletion"
  },
  {
    question: "Why is 'topdown=False' required when writing a script to delete a directory tree using 'os.rmdir()'?",
    shortAnswer: "Because 'os.rmdir()' only deletes empty directories; visiting children first ensures child files/folders are deleted before attempting to remove the parent directory.",
    explanation: "Bottom-up tree removal invariant.",
    hint: "Leaves must be deleted before their parent folder can become empty.",
    level: "moderate",
    codeExample: "for root, dirs, files in os.walk(path, topdown=False):\n    os.rmdir(root)"
  },
  {
    question: "What is 'os.scandir()' and why is it significantly faster than 'os.listdir()'?",
    shortAnswer: "'os.scandir()' yields 'DirEntry' objects that cache file attributes and types directly from the operating system directory stream, avoiding expensive secondary 'stat()' system calls for every file.",
    explanation: "C-level inode caching in scandir.",
    hint: "Caches file metadata directly from the directory stream, avoiding stat() calls.",
    level: "basic",
    codeExample: "with os.scandir('.') as entries:\n    for e in entries: print(e.name, e.stat().st_size)"
  },
  {
    question: "Why should 'os.scandir()' always be used inside a 'with' context manager?",
    shortAnswer: "To guarantee that the underlying operating system directory stream handle is closed immediately when exiting the block, preventing resource leaks.",
    explanation: "OS directory stream lifecycle safety.",
    hint: "Ensures the OS directory stream file descriptor is closed properly.",
    level: "basic",
    codeExample: "with os.scandir(folder) as it:\n    for entry in it: ..."
  },
  {
    question: "What is the difference between 'entry.is_file()' and 'os.path.isfile(entry.path)' when using 'DirEntry'?",
    shortAnswer: "'entry.is_file()' retrieves the cached file type directly without making a separate system call; 'os.path.isfile()' invokes an additional 'stat' system call against the disk.",
    explanation: "Direct attribute cache vs secondary system call.",
    hint: "entry.is_file() uses cached attributes; os.path.isfile makes a new system call.",
    level: "moderate",
    codeExample: "if entry.is_file(): ... # Fast cached lookup"
  },
  {
    question: "What is the difference between 'glob.glob()' and 'glob.iglob()'?",
    shortAnswer: "'glob.glob()' returns an eager list containing all matching paths in memory at once; 'glob.iglob()' returns a lazy generator iterator that streams matches one-by-one with O(1) memory.",
    explanation: "Eager list vs lazy iterator globbing.",
    hint: "glob.glob returns a full list; glob.iglob returns a streaming iterator.",
    level: "basic",
    codeExample: "for path in glob.iglob('**/*.csv', recursive=True): process(path)"
  },
  {
    question: "What does '**' represent in 'glob.glob(\"data/**/*.json\", recursive=True)'?",
    shortAnswer: "The '**' wildcard matches zero or more nested subdirectories recursively when 'recursive=True' is enabled.",
    explanation: "Recursive recursive glob wildcard.",
    hint: "Matches zero or more nested directory levels recursively.",
    level: "basic",
    codeExample: "glob.glob('vault/**/*.pdf', recursive=True)"
  },
  {
    question: "What is the difference between the 'glob' module and the 'fnmatch' module?",
    shortAnswer: "'glob' queries the physical filesystem directly to find matching paths; 'fnmatch' evaluates wildcard patterns against in-memory string lists without touching the disk.",
    explanation: "Filesystem traversal vs in-memory string matching.",
    hint: "glob scans the disk; fnmatch matches strings in memory.",
    level: "basic",
    codeExample: "fnmatch.filter(['a.txt', 'b.csv'], '*.txt') # ['a.txt']"
  },
  {
    question: "What wildcard patterns does 'fnmatch' support?",
    shortAnswer: "'*' (matches any characters), '?' (matches exactly one character), '[seq]' (matches any character in seq), and '[!seq]' (matches any character not in seq).",
    explanation: "Unix shell pattern syntax.",
    hint: "* for any chars, ? for single char, [seq] for char set, [!seq] for negation.",
    level: "basic",
    codeExample: "fnmatch.fnmatch('student_1.json', 'student_?.json') # True"
  },
  {
    question: "What is the difference between 'fnmatch.fnmatch()' and 'fnmatch.fnmatchcase()'?",
    shortAnswer: "'fnmatch.fnmatch()' normalizes case according to the host OS filesystem (case-insensitive on Windows, case-sensitive on POSIX); 'fnmatch.fnmatchcase()' ALWAYS performs strict case-sensitive matching on all platforms.",
    explanation: "Cross-platform case sensitivity matching.",
    hint: "fnmatch respects OS case conventions; fnmatchcase is strictly case-sensitive.",
    level: "moderate",
    codeExample: "fnmatch.fnmatchcase('File.CSV', '*.csv') # False"
  },
  {
    question: "How do you filter a list of 100,000 filenames efficiently using 'fnmatch'?",
    shortAnswer: "Using 'fnmatch.filter(names_list, pattern)', which executes an optimized C-level regex loop over the string list.",
    explanation: "Bulk in-memory wildcard filtering.",
    hint: "Use fnmatch.filter(list, pattern).",
    level: "basic",
    codeExample: "csv_files = fnmatch.filter(file_names, '*.csv')"
  },
  {
    question: "How do you handle filesystem permission errors during 'os.walk()'?",
    shortAnswer: "Pass an error handler function to the 'onerror' parameter: 'os.walk(path, onerror=my_err_handler)'.",
    explanation: "Graceful error recovery during tree walks.",
    hint: "Use the onerror callback parameter of os.walk.",
    level: "moderate",
    codeExample: "def on_err(err): print('Access Denied:', err)\nos.walk('.', onerror=on_err)"
  },
  {
    question: "How do you count the total number of files in a directory tree without loading full lists?",
    shortAnswer: "Using a generator expression with 'os.walk()': 'sum(len(files) for _, _, files in os.walk(root))'.",
    explanation: "Constant memory file counting.",
    hint: "Use sum(len(files) for _, _, files in os.walk(root)).",
    level: "basic",
    codeExample: "total_files = sum(len(files) for _, _, files in os.walk(vault_dir))"
  },
  {
    question: "How do you calculate the total disk size consumed by all PDF files in a directory tree?",
    shortAnswer: "Combine 'os.walk()' with 'os.path.getsize()' (or 'os.scandir()') filtering by filename extension '.endswith(\".pdf\")'.",
    explanation: "Tree aggregation calculation.",
    hint: "Iterate with os.walk and sum os.path.getsize() for matching files.",
    level: "basic",
    codeExample: "total_bytes = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk('.') for f in fs if f.endswith('.pdf'))"
  },
  {
    question: "What is 'followlinks=True' in 'os.walk()' and what hazard does it introduce?",
    shortAnswer: "It tells 'os.walk()' to traverse symbolic links (symlinks) pointing to directories; hazard: if symlinks form a cycle, 'os.walk()' will loop infinitely until recursion or memory crashes.",
    explanation: "Symlink recursion cycle hazard.",
    hint: "Follows directory symlinks, but can cause infinite loops if symlinks form cycles.",
    level: "complex",
    codeExample: "os.walk('.', followlinks=True) # Danger if cyclical symlinks exist"
  },
  {
    question: "How does 'pathlib.Path.rglob()' compare to 'os.walk()'?",
    shortAnswer: "'pathlib.Path.rglob()' is more concise for pattern-based file searches; 'os.walk()' provides greater control over directory pruning ('dirs[:]') and bottom-up traversal ('topdown=False').",
    explanation: "API tradeoff: convenience vs fine-grained traversal control.",
    hint: "rglob() is cleaner for simple pattern searches; os.walk() gives granular pruning control.",
    level: "basic",
    codeExample: "# rglob for quick scans; os.walk for custom pruning & bottom-up cleanup"
  },
  {
    question: "How do you extract the directory depth (nesting level) of the current folder during 'os.walk()'?",
    shortAnswer: "Calculate the difference in path separator counts: 'depth = root.count(os.sep) - top_dir.count(os.sep)'.",
    explanation: "Nesting depth calculation.",
    hint: "Count the number of os.sep separators relative to the root directory.",
    level: "basic",
    codeExample: "depth = root.count(os.sep) - base_dir.count(os.sep)"
  },
  {
    question: "What is 'os.DirEntry.stat(follow_symlinks=False)' used for?",
    shortAnswer: "It queries metadata about the symlink itself rather than the target file it points to.",
    explanation: "Symlink metadata inspection.",
    hint: "Inspects symlink metadata rather than target file metadata.",
    level: "moderate",
    codeExample: "entry.stat(follow_symlinks=False)"
  },
  {
    question: "How do you find all files modified in the last 24 hours across a directory tree?",
    shortAnswer: "Iterate with 'os.scandir()' inside 'os.walk()', comparing 'entry.stat().st_mtime' against '(time.time() - 86400)'.",
    explanation: "Timestamp-based filesystem filtering.",
    hint: "Compare st_mtime against time.time() - 86400.",
    level: "moderate",
    codeExample: "cutoff = time.time() - 86400\nrecent = [e.path for r in os.walk('.') with ... if e.stat().st_mtime >= cutoff]"
  },
  {
    question: "Why does 'os.walk()' yield directory paths as strings rather than Path objects?",
    shortAnswer: "Because 'os.walk()' was written for legacy Python before 'pathlib' existed; 'os.fwalk()' or wrapping paths in 'Path(root)' bridges the two APIs.",
    explanation: "Legacy string API vs modern Path wrappers.",
    hint: "os.walk is a classic API that yields strings for backwards compatibility.",
    level: "basic",
    codeExample: "root_path = Path(root)"
  },
  {
    question: "How do you implement a max-depth limit on 'os.walk()'?",
    shortAnswer: "Compute the current depth; if 'depth >= max_depth', clear the 'dirs' list in-place ('dirs.clear()') to prevent 'os.walk()' from descending deeper.",
    explanation: "Depth-bounded tree traversal.",
    hint: "Check depth and call dirs.clear() when max depth is reached.",
    level: "moderate",
    codeExample: "if depth >= 2: dirs.clear() # Stops descending deeper"
  },
  {
    question: "What is the ultimate golden rule for directory traversal in Python?",
    shortAnswer: "Use 'os.scandir()' for high-performance single-directory scanning, 'os.walk(topdown=True)' with 'dirs[:] = [...]' in-place pruning for deep crawling, and 'glob.iglob()' for streaming pattern matching.",
    explanation: "The complete enterprise guideline for directory traversal in Python.",
    hint: "Use os.scandir for speed, os.walk with dirs[:] for pruning, and glob.iglob for streaming wildcards.",
    level: "basic",
    codeExample: "# Python Directory Traversal Mastery"
  }
];

export default questions;
