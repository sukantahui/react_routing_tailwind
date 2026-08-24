// topic20_questions.js
// 30 questions about appending data (moderate to expert)

const questions = [
  {
    question: "What is the difference between 'w' and 'a' modes?",
    shortAnswer: "'w' overwrites; 'a' appends to the end.",
    explanation: "'w' truncates the file; 'a' preserves existing content.",
    hint: "Write vs append.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Does append mode create a file if it doesn't exist?",
    shortAnswer: "Yes, both 'a' and 'a+' create the file if it doesn't exist.",
    explanation: "It's safe to use append mode without checking for existence.",
    hint: "No need to check first.",
    level: "basic",
    codeExample: "open('new.txt', 'a')"
  },
  {
    question: "Where does append mode write data?",
    shortAnswer: "Always at the end of the file.",
    explanation: "Regardless of the current pointer position, writes go to the end.",
    hint: "End of file.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between 'a' and 'a+'?",
    shortAnswer: "'a' is write‑only; 'a+' allows reading as well.",
    explanation: "'a+' adds read capability to append mode.",
    hint: "Read + append.",
    level: "intermediate",
    codeExample: "open('log.txt', 'a+')"
  },
  {
    question: "Can you read from a file opened in 'a' mode?",
    shortAnswer: "No, 'a' is write‑only.",
    explanation: "Use 'a+' if you need to read as well.",
    hint: "Add '+' to read.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the initial file pointer position in append mode?",
    shortAnswer: "For 'a' mode, it starts at the end; for 'a+', it starts at the beginning.",
    explanation: "In 'a+', you can read from the start; writes still go to the end.",
    hint: "'a+' starts at 0.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Does `seek()` work in append mode?",
    shortAnswer: "For reading, yes (in 'a+'); for writing, no (writes always go to end).",
    explanation: "You can seek to read, but writes are always appended.",
    hint: "Seek affects only reads.",
    level: "advanced",
    codeExample: "f.seek(0); data = f.read()"
  },
  {
    question: "What happens if you try to read from 'a' mode?",
    shortAnswer: "It raises an OSError because 'a' is write‑only.",
    explanation: "Use 'a+' for reading.",
    hint: "Not allowed.",
    level: "basic",
    codeExample: "f = open('f.txt', 'a'); f.read()  # OSError"
  },
  {
    question: "Why is append mode preferred for logging?",
    shortAnswer: "It preserves history and doesn't destroy existing log entries.",
    explanation: "Logs are accumulated over time; append mode ensures no data loss.",
    hint: "Preserves history.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you add a timestamp to a log entry when appending?",
    shortAnswer: "Use `datetime.now()` and format the string.",
    explanation: "`f.write(f'[{datetime.now()}] {message}\\n')`",
    hint: "Add timestamp in the string.",
    level: "intermediate",
    codeExample: "from datetime import datetime; f.write(f'[{datetime.now()}] {msg}\\n')"
  },
  {
    question: "Can you append binary data with 'ab' mode?",
    shortAnswer: "Yes, use 'ab' for binary append.",
    explanation: "Binary append works like text append but with bytes.",
    hint: "Use 'ab'.",
    level: "intermediate",
    codeExample: "open('data.bin', 'ab')"
  },
  {
    question: "What happens if you open a file in 'a' mode and write without newline?",
    shortAnswer: "The data is appended at the end, but may run together with previous content.",
    explanation: "Always include '\\n' to separate entries.",
    hint: "Add newlines.",
    level: "basic",
    codeExample: "f.write('entry')  # may run together"
  },
  {
    question: "How do you append multiple lines in one operation?",
    shortAnswer: "Use `writelines()` in append mode.",
    explanation: "Pass a list of strings; they'll be appended to the end.",
    hint: "Use writelines().",
    level: "intermediate",
    codeExample: "f.writelines(['line1\\n', 'line2\\n'])"
  },
  {
    question: "Is appending efficient for large files?",
    shortAnswer: "Yes, appending is efficient because it only writes at the end.",
    explanation: "No need to rewrite the entire file.",
    hint: "Very efficient.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is log rotation and how does it relate to appending?",
    shortAnswer: "Log rotation moves old logs and starts a new file; appending writes to the current log.",
    explanation: "When a log file gets too large, it's renamed and a new file is created.",
    hint: "Managing log size.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you append to a file that's being read by another process?",
    shortAnswer: "It depends on the OS; on Unix, it's usually fine; on Windows, may be locked.",
    explanation: "Concurrent access can cause issues; use file locks if needed.",
    hint: "Be careful with concurrent access.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the purpose of the `a+` mode?",
    shortAnswer: "To both read and append to a file.",
    explanation: "Useful for reading the log and then adding new entries.",
    hint: "Read + append.",
    level: "intermediate",
    codeExample: "with open('log.txt', 'a+') as f: content = f.read(); f.write('new\\n')"
  },
  {
    question: "How do you read all existing content before appending?",
    shortAnswer: "Use 'a+' mode, read the file, then append.",
    explanation: "In 'a+', the pointer starts at 0, so read() reads everything.",
    hint: "Open with 'a+'.",
    level: "intermediate",
    codeExample: "with open('f.txt', 'a+') as f: old = f.read(); f.write('new\\n')"
  },
  {
    question: "What happens if you append to a file with insufficient permissions?",
    shortAnswer: "PermissionError is raised.",
    explanation: "Catch PermissionError and handle it gracefully.",
    hint: "Check permissions.",
    level: "intermediate",
    codeExample: "try: open('f.txt', 'a'); except PermissionError: ..."
  },
  {
    question: "Can you append to a file using `print()` with `file=`?",
    shortAnswer: "Yes, open the file in append mode and use `print('text', file=f)`.",
    explanation: "print() writes to the file, and if it's in append mode, it appends.",
    hint: "print() works too.",
    level: "intermediate",
    codeExample: "with open('f.txt', 'a') as f: print('text', file=f)"
  },
  {
    question: "What is the difference between `f.write('text\\n')` and `print('text', file=f)`?",
    shortAnswer: "print() adds a newline by default; write() does not.",
    explanation: "Both work in append mode; choose based on preference.",
    hint: "print() adds newline.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you append data to a file without opening it multiple times?",
    shortAnswer: "Keep the file open and write multiple times.",
    explanation: "You can call write() multiple times on the same file object.",
    hint: "Write multiple times.",
    level: "basic",
    codeExample: "with open('f.txt', 'a') as f: f.write('a\\n'); f.write('b\\n')"
  },
  {
    question: "Is there a limit to how many times you can append to a file?",
    shortAnswer: "Limited by disk space and file system limits (file size).",
    explanation: "No practical limit besides storage capacity.",
    hint: "Disk space limits.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why is append mode called 'a'?",
    shortAnswer: "It stands for 'append'.",
    explanation: "The name is derived from the action of adding to the end.",
    hint: "'a' = append.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you append to a file and then immediately read the new content?",
    shortAnswer: "Use 'a+' mode, append, seek to start, then read.",
    explanation: "After appending, the pointer is at the end; seek(0) to read from start.",
    hint: "Seek to start after writing.",
    level: "advanced",
    codeExample: "f = open('f.txt', 'a+'); f.write('new\\n'); f.seek(0); data = f.read()"
  },
  {
    question: "What is the performance impact of appending to a very large file?",
    shortAnswer: "Appending is O(1) - it writes at the end, so it's fast regardless of file size.",
    explanation: "Unlike inserting, appending does not require moving existing data.",
    hint: "Very efficient.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you append to a file that is in use by another program?",
    shortAnswer: "Depends on the OS and the locks held by the other program.",
    explanation: "On Unix, it's often possible; on Windows, files may be locked.",
    hint: "Not guaranteed.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you ensure appends are written to disk immediately?",
    shortAnswer: "Call `flush()` or close the file.",
    explanation: "Use `f.flush()` after writing to force the buffer to disk.",
    hint: "Use flush().",
    level: "intermediate",
    codeExample: "f.write('data\\n'); f.flush()"
  },
  {
    question: "What is the difference between 'a' and 'a+' in terms of file pointer?",
    shortAnswer: "'a' pointer starts at end; 'a+' pointer starts at beginning for reads, end for writes.",
    explanation: "'a+' allows reading from the start, but writes still go to the end.",
    hint: "'a+' starts at 0.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why do logs typically use append mode instead of write mode?",
    shortAnswer: "To preserve history and maintain a complete audit trail.",
    explanation: "Overwriting logs would lose valuable historical data.",
    hint: "Preserve history.",
    level: "intermediate",
    codeExample: null
  }
];

export default questions;