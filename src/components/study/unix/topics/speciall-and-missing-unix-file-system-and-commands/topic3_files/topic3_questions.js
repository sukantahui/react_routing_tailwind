// topic3_questions.js - 30 questions about touch and file timestamps

const questions = [
  {
    question: "What is the primary purpose of the `touch` command?",
    shortAnswer: "Create empty files or update file timestamps (access and modification times).",
    explanation: "If the file exists, `touch` updates its atime and mtime to the current time; if it doesn't exist, it creates a zero-byte file.",
    hint: "It's like tapping a file to refresh its 'last touched' time.",
    level: "basic",
    codeExample: "touch newfile.txt"
  },
  {
    question: "How do you create multiple empty files with one `touch` command?",
    shortAnswer: "List all filenames as arguments: `touch file1 file2 file3`",
    explanation: "Brace expansion can also be used: `touch file{1..10}.txt`",
    hint: "Use `{1..100}` for many files.",
    level: "basic",
    codeExample: "touch a.log b.log c.log"
  },
  {
    question: "What happens if you `touch` an existing file?",
    shortAnswer: "Its access and modification timestamps are updated to the current time; contents remain unchanged.",
    explanation: "This is useful for forcing `make` to consider a file as 'newer', or for updating last-used timestamps in backup scripts.",
    hint: "Use `stat` before and after to see timestamps change.",
    level: "basic",
    codeExample: "touch existing_file"
  },
  {
    question: "What does the `-c` option do?",
    shortAnswer: "Prevents creation of a new file; only updates timestamps if the file exists.",
    explanation: "`--no-create` is the long form. Useful when you want to touch only existing files without accidentally creating new ones.",
    hint: "`-c` stands for 'no create' (not 'create').",
    level: "intermediate",
    codeExample: "touch -c already_there.txt"
  },
  {
    question: "How do you change only the access time of a file?",
    shortAnswer: "`touch -a file`",
    explanation: "`-a` updates the atime (last access). The mtime remains unchanged, but ctime will still update because metadata changed.",
    hint: "Check with `stat file` before and after.",
    level: "intermediate",
    codeExample: "touch -a logfile.txt"
  },
  {
    question: "How do you change only the modification time?",
    shortAnswer: "`touch -m file`",
    explanation: "`-m` updates mtime (last modification). Useful for tricking `make` into thinking a file was modified when it wasn't.",
    hint: "Combine `-am` to update both explicitly.",
    level: "intermediate",
    codeExample: "touch -m source.c"
  },
  {
    question: "What is the format for `touch -t`? Give an example for December 31, 2024 at 11:45 PM.",
    shortAnswer: "`[[CC]YY]MMDDhhmm[.ss]` – Example: `2412312345` or `202412312345`.",
    explanation: "CC century (20), YY year (24), MM month (12), DD day (31), hh hour (23), mm minute (45), optional .ss seconds.",
    hint: "No spaces, use 24-hour clock.",
    level: "advanced",
    codeExample: "touch -t 202412312345.00 file"
  },
  {
    question: "How can you set a file's timestamp to match another file?",
    shortAnswer: "`touch -r reference_file target_file`",
    explanation: "Copies atime and mtime from reference to target. Very useful for restoring timestamps after copying or extracting archives.",
    hint: "`-r` stands for 'reference'.",
    level: "intermediate",
    codeExample: "touch -r old.txt new.txt"
  },
  {
    question: "What are the three timestamps a Unix file has?",
    shortAnswer: "Access time (atime), Modification time (mtime), Change time (ctime).",
    explanation: "atime: last read; mtime: last content change; ctime: last metadata change (permissions, ownership, link count, or any timestamp change).",
    hint: "`ls -l` shows mtime; `ls -lu` shows atime; `ls -lc` shows ctime.",
    level: "basic",
    codeExample: "stat file"
  },
  {
    question: "Can `touch` directly change the change time (ctime)?",
    shortAnswer: "No, ctime changes automatically when any metadata (including atime/mtime) is updated.",
    explanation: "When you `touch` a file, atime and mtime are updated, which counts as a metadata change, so ctime also updates to the same time. But you cannot set ctime independently.",
    hint: "ctime is sometimes called 'status change time'.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does `touch -h` do when used on a symbolic link?",
    shortAnswer: "Changes the timestamp of the symlink itself, not the file it points to.",
    explanation: "Without `-h`, `touch` on a symlink updates the target's timestamps. With `-h`, it updates the symlink's own timestamps.",
    hint: "Useful for preserving symlink metatdata.",
    level: "advanced",
    codeExample: "touch -h symlink"
  },
  {
    question: "How do you prevent `touch` from creating a file if it doesn't exist?",
    shortAnswer: "Use the `-c` (or `--no-create`) option.",
    explanation: "`touch -c missing.txt` will do nothing and not report an error. Helpful in scripts where you only want to update existing files.",
    hint: "Check exit status: `touch -c missing; echo $?` returns 0 even if no file created.",
    level: "intermediate",
    codeExample: "touch -c config.ini"
  },
  {
    question: "Can `touch` be used to set a file's timestamp to a future date?",
    shortAnswer: "Yes, `touch -t` or `-d` with a future date works.",
    explanation: "The system allows any timestamp, past or future. This can be used to test date‑dependent scripts.",
    hint: "Be careful: future timestamps may confuse backup tools.",
    level: "intermediate",
    codeExample: "touch -d \"2030-01-01\" future.txt"
  },
  {
    question: "What is the difference between `touch file` and `> file`?",
    shortAnswer: "`touch` updates timestamps or creates empty file without truncating; `> file` truncates an existing file to zero length (destroying content).",
    explanation: "If the file exists, `> file` empties it; `touch` only updates timestamps. Both create empty file if missing.",
    hint: "`> file` is a redirection that overwrites; `touch` is safer for existing files.",
    level: "basic",
    codeExample: "> file   # truncates\ntouch file  # just updates time"
  },
  {
    question: "How can you touch all files in a directory recursively?",
    shortAnswer: "`find /path -type f -exec touch {} \\;` or `find /path -type f | xargs touch`.",
    explanation: "Use with caution; it will update every file, which might trigger unnecessary builds or backup changes.",
    hint: "Combine with `-mmin` or `-mtime` to touch only old files.",
    level: "advanced",
    codeExample: "find . -name \"*.log\" -exec touch {} +"
  },
  {
    question: "What does `touch -d '2 days ago' file` do?",
    shortAnswer: "Sets the file's timestamp to two days before the current time.",
    explanation: "The `-d` option accepts many human-readable date strings, including 'yesterday', 'next week', '10:30', etc.",
    hint: "Test with `date` to see what the string resolves to.",
    level: "intermediate",
    codeExample: "touch -d \"last Monday 09:00\" meeting_notes.txt"
  },
  {
    question: "Why would a system administrator use `touch` on a log file?",
    shortAnswer: "To update its timestamp so that log rotation scripts don't archive it prematurely, or to indicate that the log was checked.",
    explanation: "Many log rotation schemes use file age; touching a log resets its age, possibly preventing rotation.",
    hint: "Be careful: can interfere with intended rotation policies.",
    level: "intermediate",
    codeExample: "touch /var/log/app.log"
  },
  {
    question: "What is the exit code of `touch` if the file cannot be created (e.g., permission denied)?",
    shortAnswer: "Non-zero (usually 1).",
    explanation: "`touch` returns 0 on success, >0 on failure. Useful in scripts: `touch file || echo 'Failed'`.",
    hint: "Check with `echo $?` after touch.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you preserve timestamps when copying a file?",
    shortAnswer: "`cp -p` or `cp --preserve=timestamps`; also `touch -r` after copying.",
    explanation: "`cp -p` preserves timestamps, ownership, and permissions. If you forget, you can later use `touch -r original copy` to restore.",
    hint: "`rsync -t` also preserves times.",
    level: "intermediate",
    codeExample: "cp -p source dest"
  },
  {
    question: "What does the `--time=WORD` option do in GNU touch?",
    shortAnswer: "Changes which timestamp to set: `--time=atime` (access), `--time=mtime` (modify), or `--time=use` (uses the time specified by `-t`/`-d`).",
    explanation: "Equivalent to `-a` (access) or `-m` (modify) but more explicit.",
    hint: "Useful in scripts for clarity.",
    level: "expert",
    codeExample: "touch --time=atime file"
  },
  {
    question: "Can `touch` be used on a file that is a mount point?",
    shortAnswer: "Yes, it updates the timestamps of the mount point directory, not the root of the mounted filesystem.",
    explanation: "The mount point is a directory entry in the parent filesystem. Touching it affects that directory entry, not the mounted device's root.",
    hint: "To update timestamps inside the mount, use path inside the mount.",
    level: "expert",
    codeExample: "touch /mnt/usb   # updates /mnt entry"
  },
  {
    question: "What happens if you `touch` a directory?",
    shortAnswer: "The directory's atime and mtime are updated (like a file).",
    explanation: "Directories are special files; `touch` works on them as well. This may affect backup tools that rely on directory timestamps.",
    hint: "Use `ls -ld` to see directory timestamps.",
    level: "intermediate",
    codeExample: "touch /tmp/mydir"
  },
  {
    question: "How do you change only the seconds part of a timestamp with `touch`?",
    shortAnswer: "Use `-t` with the `.ss` fraction: `touch -t 202412311200.30 file` sets seconds to 30.",
    explanation: "If no seconds given, seconds default to 00. The `.ss` is optional and can be from 00 to 59.",
    hint: "Check with `stat --format='%y' file`.",
    level: "advanced",
    codeExample: "touch -t 202501011200.45 myfile"
  },
  {
    question: "What is the difference between `touch -a` and `touch -m` in terms of ctime?",
    shortAnswer: "Both cause ctime to update to the current time because the inode metadata changes.",
    explanation: "Any change to atime or mtime is a metadata change, so ctime always becomes the current time. There is no way to change atime or mtime without affecting ctime.",
    hint: "ctime is the 'status change' time, not settable directly.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How can you create a file with a specific timestamp in the past using `touch`?",
    shortAnswer: "`touch -t YYYYMMDDhhmm.ss file` with a date in the past.",
    explanation: "Example: `touch -t 200001011200 very_old.txt` creates a file with timestamp from year 2000.",
    hint: "Useful for testing time‑based logic.",
    level: "intermediate",
    codeExample: "touch -t 199912312359.59 y2k_bug.txt"
  },
  {
    question: "What is the purpose of the `.` in `touch -t 202512311200.30`?",
    shortAnswer: "Separates seconds from minutes; allows setting seconds precision.",
    explanation: "The format is `MMDDhhmm[.ss]`. The dot followed by two digits sets seconds. Without it, seconds default to 00.",
    hint: "Seconds must be between 00 and 59.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can `touch` be used to change the timestamp of a device file (e.g., /dev/sda)?",
    shortAnswer: "Yes, but you usually need root, and it may have no practical effect.",
    explanation: "Device files are special; updating their timestamps seldom matters, but it's allowed with appropriate permissions.",
    hint: "Avoid unless you know what you're doing.",
    level: "expert",
    codeExample: "sudo touch /dev/sda"
  },
  {
    question: "Why might `touch` fail with 'Permission denied' even if you own the file?",
    shortAnswer: "The parent directory's write permission may be missing, or the file is on a read‑only filesystem.",
    explanation: "To update timestamps, you need write access to the file. For creation, you need write access to the directory.",
    hint: "Check `ls -ld .` and `ls -l file`.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does `touch` differ from `dd if=/dev/null of=file`?",
    shortAnswer: "`dd` truncates existing file (like `>`), `touch` does not. Both create empty files if missing.",
    explanation: "`dd if=/dev/null of=file` is a longer way to truncate; `touch` is simpler for timestamp updates.",
    hint: "`dd` is overkill; use `>` or `touch`.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What does `touch --help` output?",
    shortAnswer: "Displays help information for the touch command, including all options and brief descriptions.",
    explanation: "Standard GNU coreutils behavior. Use `man touch` for full manual.",
    hint: "Always check `--help` before reading the manual.",
    level: "basic",
    codeExample: "touch --help"
  }
];

export default questions;