// src/components/study/python/topics/004_001_filesystem-os/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: shutil module: copying, moving, archiving, and recursive deletions

const questions = [
  {
    question: "What is the primary purpose of the 'shutil' module in Python?",
    shortAnswer: "The 'shutil' (Shell Utilities) module provides high-level filesystem operations including copying, moving, archiving, and recursive deletion of files and directory trees.",
    explanation: "High-level shell utilities in standard library.",
    hint: "Provides high-level file and directory tree operations like copy, move, and rmtree.",
    level: "basic",
    codeExample: "import shutil; shutil.copy2('source.csv', 'backup.csv')"
  },
  {
    question: "What is the difference between 'shutil.copyfile()', 'shutil.copy()', and 'shutil.copy2()'?",
    shortAnswer: "'copyfile()' copies raw file contents only; 'copy()' copies contents plus file permission mode bits; 'copy2()' copies contents, permission bits, AND full metadata (modification/creation timestamps).",
    explanation: "Copying hierarchy and metadata preservation.",
    hint: "copyfile=bytes only; copy=bytes+permissions; copy2=bytes+permissions+timestamps.",
    level: "basic",
    codeExample: "shutil.copy2('data.csv', 'backup.csv') # Preserves timestamps"
  },
  {
    question: "Why is 'shutil.copy2()' considered the industry standard for production backup pipelines?",
    shortAnswer: "Because it preserves original file modification and access timestamps ('st_mtime', 'st_atime'), preventing incremental backup tools and audit loggers from assuming the file was newly modified.",
    explanation: "Timestamp preservation in enterprise backups.",
    hint: "Preserves file modification timestamps, preventing false new-file flags in backup systems.",
    level: "moderate",
    codeExample: "shutil.copy2(src, backup_dir)"
  },
  {
    question: "How does 'shutil.move(src, dst)' handle moving files across different physical disk partitions?",
    shortAnswer: "If 'src' and 'dst' are on the same filesystem, it executes a fast atomic rename; if they are on different drives/partitions, it automatically copies the file with 'copy2()' and deletes the original.",
    explanation: "Cross-filesystem relocation semantics.",
    hint: "Atomic rename on the same drive; automatic copy-then-delete across different drives.",
    level: "moderate",
    codeExample: "shutil.move('C:\\data.txt', 'D:\\vault\\data.txt')"
  },
  {
    question: "What is the significance of 'dirs_exist_ok=True' in 'shutil.copytree()' (Python 3.8+)?",
    shortAnswer: "Without 'dirs_exist_ok=True', 'shutil.copytree()' raises a 'FileExistsError' if the target directory already exists; with 'dirs_exist_ok=True', it merges files into the existing folder tree idempotently.",
    explanation: "Idempotent directory tree cloning.",
    hint: "Allows copytree to merge files into an existing folder without raising FileExistsError.",
    level: "basic",
    codeExample: "shutil.copytree(src, dst, dirs_exist_ok=True)"
  },
  {
    question: "How do you exclude temporary files and caches during 'shutil.copytree()'?",
    shortAnswer: "By passing the 'ignore' parameter with 'shutil.ignore_patterns()': 'ignore=shutil.ignore_patterns(\"*.tmp\", \"__pycache__\", \".git\")'.",
    explanation: "Pattern-based tree copy filtering.",
    hint: "Use ignore=shutil.ignore_patterns('*.pyc', '__pycache__').",
    level: "basic",
    codeExample: "shutil.copytree(src, dst, ignore=shutil.ignore_patterns('*.tmp', '__pycache__'))"
  },
  {
    question: "Why does 'shutil.rmtree()' fail on Windows when deleting files marked as read-only?",
    shortAnswer: "On Windows, the OS kernel prevents deleting files with the read-only attribute set, causing 'shutil.rmtree()' to raise a 'PermissionError' (Access Denied).",
    explanation: "Windows read-only attribute locking invariant.",
    hint: "Windows blocks deleting files with the read-only attribute.",
    level: "moderate",
    codeExample: "# Requires an onerror handler to clear read-only flag before deleting"
  },
  {
    question: "How do you handle read-only file PermissionErrors in 'shutil.rmtree()' gracefully?",
    shortAnswer: "By providing an 'onerror' (or 'on_exc' in Python 3.12+) callback that calls 'os.chmod(path, stat.S_IWRITE)' to clear the read-only bit and retries the deletion function.",
    explanation: "Resilient recursive deletion error handler.",
    hint: "Use an onerror handler that clears the read-only flag with os.chmod(p, stat.S_IWRITE).",
    level: "moderate",
    codeExample: "def on_err(func, path, _): os.chmod(path, stat.S_IWRITE); func(path)\nshutil.rmtree(dir_path, onerror=on_err)"
  },
  {
    question: "What does 'shutil.disk_usage(path)' return?",
    shortAnswer: "A named tuple '(total, used, free)' representing the total, used, and available disk space in bytes for the drive containing 'path'.",
    explanation: "Storage capacity query.",
    hint: "Returns a named tuple with (total, used, free) space in bytes.",
    level: "basic",
    codeExample: "total, used, free = shutil.disk_usage('.'); print(free / (1024**3), 'GB free')"
  },
  {
    question: "What archive formats does 'shutil.make_archive()' support natively?",
    shortAnswer: "'zip' (ZIP file), 'tar' (Uncompressed tarball), 'gztar' (gzip-compressed tarball), 'bztar' (bzip2-compressed tarball), and 'xztar' (xz-compressed tarball).",
    explanation: "Standard library compression formats.",
    hint: "zip, tar, gztar, bztar, and xztar.",
    level: "basic",
    codeExample: "shutil.make_archive('backup', 'zip', root_dir='data')"
  },
  {
    question: "What is the difference between 'root_dir' and 'base_dir' in 'shutil.make_archive()'?",
    shortAnswer: "'root_dir' specifies the root directory that will become the root of the archive; 'base_dir' specifies the directory inside 'root_dir' from which to start archiving.",
    explanation: "Archive packaging root configuration.",
    hint: "root_dir is the folder that becomes the root of the zip archive.",
    level: "moderate",
    codeExample: "shutil.make_archive('app_pkg', 'zip', root_dir='src')"
  },
  {
    question: "How do you extract an archive file automatically using 'shutil'?",
    shortAnswer: "Using 'shutil.unpack_archive(archive_path, extract_dir=None, format=None)', which automatically infers the format from the file extension.",
    explanation: "High-level archive decompression.",
    hint: "Use shutil.unpack_archive(archive_path, extract_dir).",
    level: "basic",
    codeExample: "shutil.unpack_archive('backup.zip', 'extracted_folder')"
  },
  {
    question: "What is 'shutil.which(cmd)' used for?",
    shortAnswer: "It looks up the executable path of a command in the system 'PATH' environment variable (equivalent to the Unix 'which' or Windows 'where' command).",
    explanation: "Executable discovery in system PATH.",
    hint: "Finds the full path of an executable in the system PATH.",
    level: "basic",
    codeExample: "git_path = shutil.which('git') # 'C:\\Program Files\\Git\\bin\\git.exe'"
  },
  {
    question: "What is the difference between 'os.remove()' and 'shutil.rmtree()'?",
    shortAnswer: "'os.remove()' deletes a single file; 'shutil.rmtree()' recursively deletes an entire directory tree including all nested subfolders and files.",
    explanation: "Single file deletion vs full directory tree removal.",
    hint: "os.remove is for single files; shutil.rmtree is for entire folder trees.",
    level: "basic",
    codeExample: "os.remove('file.txt'); shutil.rmtree('nested_dir')"
  },
  {
    question: "How do you copy only the permissions from one file to another without copying file contents?",
    shortAnswer: "Using 'shutil.copymode(src, dst)'.",
    explanation: "Permission-only cloning.",
    hint: "Use shutil.copymode(src, dst).",
    level: "moderate",
    codeExample: "shutil.copymode('script.sh', 'new_script.sh')"
  },
  {
    question: "How do you copy both permissions and timestamps from one file to another without copying file contents?",
    shortAnswer: "Using 'shutil.copystat(src, dst)'.",
    explanation: "Stat metadata cloning.",
    hint: "Use shutil.copystat(src, dst).",
    level: "moderate",
    codeExample: "shutil.copystat('orig.txt', 'dest.txt')"
  },
  {
    question: "What happens if 'dst' in 'shutil.copy(src, dst)' is a directory path?",
    shortAnswer: "The file will be copied into that directory using the base filename from 'src'.",
    explanation: "Directory destination resolution in shutil.copy.",
    hint: "Copies the file into the target directory with its original filename.",
    level: "basic",
    codeExample: "shutil.copy('report.csv', 'backup_folder/')"
  },
  {
    question: "What happens if 'dst' in 'shutil.copyfile(src, dst)' is a directory path?",
    shortAnswer: "It raises an 'IsADirectoryError' (or 'PermissionError' on Windows) because 'copyfile()' requires 'dst' to be a full destination filename, not a directory.",
    explanation: "copyfile strict filename requirement.",
    hint: "Raises an error because copyfile requires a filename, not a directory.",
    level: "moderate",
    codeExample: "# copyfile requires destination to be a complete file path"
  },
  {
    question: "How do you get a list of all supported archive and unpack formats dynamically?",
    shortAnswer: "Using 'shutil.get_archive_formats()' and 'shutil.get_unpack_formats()'.",
    explanation: "Format introspection.",
    hint: "shutil.get_archive_formats() and shutil.get_unpack_formats().",
    level: "basic",
    codeExample: "formats = shutil.get_archive_formats()"
  },
  {
    question: "Can custom archive formats be registered with 'shutil'?",
    shortAnswer: "Yes. Using 'shutil.register_archive_format()' and 'shutil.register_unpack_format()', allowing integration of formats like 7z or custom encryption wrappers.",
    explanation: "Custom archive codec registration.",
    hint: "Yes, using shutil.register_archive_format and register_unpack_format.",
    level: "complex",
    codeExample: "shutil.register_archive_format('7z', my_7z_archiver)"
  },
  {
    question: "What is 'shutil.chown(path, user, group)' used for?",
    shortAnswer: "It changes the owner user and/or group of the given path (available on POSIX/Unix systems).",
    explanation: "Ownership modification on Unix systems.",
    hint: "Changes user and group ownership of a file or directory on Unix.",
    level: "basic",
    codeExample: "shutil.chown('/var/log/app.log', user='nginx', group='nginx')"
  },
  {
    question: "What is 'shutil.get_terminal_size()' used for?",
    shortAnswer: "It queries the current width and height of the terminal window in columns and lines, useful for formatting dynamic CLI output.",
    explanation: "Terminal dimension introspection.",
    hint: "Returns the terminal columns and lines for formatting CLI tables and progress bars.",
    level: "basic",
    codeExample: "cols, lines = shutil.get_terminal_size(); print('=' * cols)"
  },
  {
    question: "What is the danger of passing untrusted zip archives to 'shutil.unpack_archive()' without validation?",
    shortAnswer: "Zip Slip vulnerability: maliciously crafted zip files with relative paths ('../../etc/passwd') could extract files outside the intended destination directory; in Python 3.12+, filter policies help mitigate this.",
    explanation: "Zip Slip path traversal security hazard.",
    hint: "Malicious archive entries could extract files outside target folder (Zip Slip).",
    level: "complex",
    codeExample: "# Validate archive members or use extraction filters in Python 3.12+"
  },
  {
    question: "How do you copy an open file-like object directly into another open file-like object?",
    shortAnswer: "Using 'shutil.copyfileobj(fsrc, fdst, length=1024*1024)', which streams buffered data in chunks.",
    explanation: "Buffered stream copying.",
    hint: "Use shutil.copyfileobj(fsrc, fdst).",
    level: "moderate",
    codeExample: "with open('in.bin', 'rb') as f1, open('out.bin', 'wb') as f2:\n    shutil.copyfileobj(f1, f2)"
  },
  {
    question: "What is the ultimate golden rule for using the 'shutil' module in production systems?",
    shortAnswer: "Always use 'shutil.copy2()' to preserve file timestamps, clone directory trees with 'dirs_exist_ok=True' and 'ignore_patterns()', verify disk quotas with 'disk_usage()', and handle Windows read-only deletion errors with an 'onerror' callback.",
    explanation: "The complete enterprise guideline for shutil in Python.",
    hint: "Use copy2 for timestamp preservation, copytree with ignore_patterns, disk_usage checks, and resilient rmtree error handling.",
    level: "basic",
    codeExample: "# Python shutil Enterprise Mastery"
  }
];

export default questions;
