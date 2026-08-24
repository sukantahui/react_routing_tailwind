// topic9_questions.js
// 30 questions about read+write modes (moderate to expert)

const questions = [
  {
    question: "What does the 'r+' mode do?",
    shortAnswer: "Opens for reading and writing without truncating; the file must exist.",
    explanation: "It preserves existing content and allows both operations from the current pointer position.",
    hint: "Use it for in‑place updates.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r+')"
  },
  {
    question: "What does the 'w+' mode do?",
    shortAnswer: "Opens for reading and writing; creates or truncates the file.",
    explanation: "It destroys existing content and starts with an empty file.",
    hint: "Like 'w' but with read capability.",
    level: "intermediate",
    codeExample: "open('file.txt', 'w+')"
  },
  {
    question: "What does the 'a+' mode do?",
    shortAnswer: "Opens for reading and appending; creates if missing, writes always at the end.",
    explanation: "You can read the entire file, but writes are appended to the end.",
    hint: "Ideal for logs that need to be read and appended.",
    level: "intermediate",
    codeExample: "open('file.txt', 'a+')"
  },
  {
    question: "What is the difference between 'r+' and 'w+'?",
    shortAnswer: "'r+' preserves content and requires the file to exist; 'w+' truncates and creates if missing.",
    explanation: "'r+' is for modifying; 'w+' is for starting fresh.",
    hint: "One keeps data, the other erases it.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the difference between 'r+' and 'a+'?",
    shortAnswer: "'r+' writes at the pointer position; 'a+' always writes at the end.",
    explanation: "With 'a+', you can read from anywhere, but writes are always appended.",
    hint: "'a+' appends; 'r+' overwrites at the pointer.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you read from a file opened with 'w+' after writing?",
    shortAnswer: "Yes, but you need to `seek()` to the start.",
    explanation: "After writing, the pointer is at the end; use `seek(0)` to read.",
    hint: "Always `seek()` before reading after writing.",
    level: "intermediate",
    codeExample: "f.write('hello'); f.seek(0); f.read()"
  },
  {
    question: "Does 'a+' truncate the file?",
    shortAnswer: "No, it preserves existing content.",
    explanation: "It only appends new data at the end.",
    hint: "'a' stands for append, not truncate.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens if you open a non-existent file with 'r+'?",
    shortAnswer: "FileNotFoundError is raised.",
    explanation: "'r+' requires the file to exist.",
    hint: "Use 'w+' or 'a+' if you want creation.",
    level: "intermediate",
    codeExample: "open('missing.txt', 'r+')  # FileNotFoundError"
  },
  {
    question: "What happens if you open a non-existent file with 'w+'?",
    shortAnswer: "A new empty file is created.",
    explanation: "'w+' creates the file if it doesn't exist.",
    hint: "It's like 'w' but with read.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens if you open a non-existent file with 'a+'?",
    shortAnswer: "A new empty file is created.",
    explanation: "'a+' creates the file if it doesn't exist.",
    hint: "It's like 'a' but with read.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "In 'a+' mode, where do writes go?",
    shortAnswer: "Always at the end of the file, regardless of pointer position.",
    explanation: "`seek()` affects reading but not writing; writes are always appended.",
    hint: "This is the key behavior of 'a+'.",
    level: "advanced",
    codeExample: "f.seek(0); f.write('text')  # still written at end"
  },
  {
    question: "Can you change the write position in 'a+' mode?",
    shortAnswer: "No, writes are always appended to the end.",
    explanation: "The file pointer for writes is fixed at the end.",
    hint: "Only 'r+' and 'w+' allow writing at arbitrary positions.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the initial pointer position for 'r+'?",
    shortAnswer: "At the beginning of the file (position 0).",
    explanation: "You start reading/writing from the start.",
    hint: "Use `tell()` to check.",
    level: "intermediate",
    codeExample: "f.tell()  # 0"
  },
  {
    question: "What is the initial pointer position for 'w+'?",
    shortAnswer: "At the beginning of the file (position 0).",
    explanation: "The file is empty, so the pointer is at the start.",
    hint: "The file is truncated first.",
    level: "intermediate",
    codeExample: "f.tell()  # 0"
  },
  {
    question: "What is the initial pointer position for 'a+'?",
    shortAnswer: "At the beginning for reading, but writes are at the end.",
    explanation: "You can read from the start; when you write, it goes to the end.",
    hint: "`tell()` after opening shows 0, but writes go to the end.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you read after writing in 'w+' mode?",
    shortAnswer: "Call `seek(0)` to move the pointer back to the start.",
    explanation: "After writing, the pointer is at the end of the written data.",
    hint: "`f.seek(0); content = f.read()`",
    level: "intermediate",
    codeExample: "f.write('data'); f.seek(0); f.read()"
  },
  {
    question: "Why would you use 'w+' instead of 'w'?",
    shortAnswer: "When you need to read back what you just wrote.",
    explanation: "'w' is write-only; 'w+' allows immediate verification.",
    hint: "Useful for generating and verifying content.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why would you use 'a+' instead of 'a'?",
    shortAnswer: "When you need to read the log history before appending.",
    explanation: "'a' is write-only; 'a+' lets you read existing entries.",
    hint: "Useful for monitoring and reporting.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the purpose of `truncate()` with 'r+'?",
    shortAnswer: "To remove extra bytes if you overwrite with shorter content.",
    explanation: "If you write less than the original, the extra bytes remain; `truncate()` removes them.",
    hint: "Call `f.truncate()` after writing.",
    level: "advanced",
    codeExample: "f.write('short'); f.truncate()"
  },
  {
    question: "Can you use 'r+' to insert data into the middle of a file?",
    shortAnswer: "No, writes overwrite; they don't insert. You'd need to read, modify, and write back.",
    explanation: "'r+' overwrites bytes at the current position; it doesn't shift content.",
    hint: "For insertion, you need to rewrite the entire file.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What happens to the file pointer after a read in 'r+'?",
    shortAnswer: "It moves forward by the number of bytes/characters read.",
    explanation: "You need to `seek()` to go back to a previous position.",
    hint: "Use `tell()` to track the position.",
    level: "intermediate",
    codeExample: "f.read(10); position = f.tell()"
  },
  {
    question: "In 'a+', does `seek()` affect the write position?",
    shortAnswer: "No, writes are always at the end, regardless of `seek()`.",
    explanation: "`seek()` only affects reading, not writing.",
    hint: "This is a common point of confusion.",
    level: "advanced",
    codeExample: "f.seek(10); f.write('text')  # still at end"
  },
  {
    question: "How do you read the entire file in 'a+' mode?",
    shortAnswer: "Use `f.read()` after opening; the pointer is at the start.",
    explanation: "In 'a+', the pointer starts at 0, so `read()` reads everything.",
    hint: "Just call `f.read()`.",
    level: "intermediate",
    codeExample: "with open('file.txt', 'a+') as f: content = f.read()"
  },
  {
    question: "What is the difference between 'r+' and 'r'?",
    shortAnswer: "'r+' allows writing; 'r' is read-only.",
    explanation: "Add '+' to enable writing.",
    hint: "'r+' = read + write.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between 'w+' and 'w'?",
    shortAnswer: "'w+' allows reading; 'w' is write-only.",
    explanation: "Add '+' to enable reading.",
    hint: "'w+' = write + read.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between 'a+' and 'a'?",
    shortAnswer: "'a+' allows reading; 'a' is write-only.",
    explanation: "Add '+' to enable reading.",
    hint: "'a+' = append + read.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you use 'r+' on a file that doesn't exist in the current directory?",
    shortAnswer: "No, FileNotFoundError is raised.",
    explanation: "'r+' requires the file to exist.",
    hint: "Provide the full path or ensure the file exists.",
    level: "intermediate",
    codeExample: "open('../missing.txt', 'r+')  # FileNotFoundError"
  },
  {
    question: "How can you use 'r+' to safely update a configuration file?",
    shortAnswer: "Read the file, modify the content in memory, then write back using 'w' or 'r+' with truncate.",
    explanation: "For safety, read all content, modify, and write back (with truncate).",
    hint: "This avoids partial writes.",
    level: "advanced",
    codeExample: "with open('config.txt', 'r+') as f: data = f.read(); data = data.replace('old', 'new'); f.seek(0); f.write(data); f.truncate()"
  },
  {
    question: "Why might you use 'a+' for a log file that is also monitored?",
    shortAnswer: "To append new events and read the log for monitoring without reopening.",
    explanation: "'a+' allows both appending and reading, useful for live monitoring.",
    hint: "One file handle for both operations.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the default mode if you use `open()` with a '+'?",
    shortAnswer: "There is no default '+' mode; you must specify 'r+', 'w+', or 'a+'.",
    explanation: "The '+' is always combined with a base mode.",
    hint: "You can't use '+' alone.",
    level: "basic",
    codeExample: "open('file.txt', '+')  # invalid"
  }
];

export default questions;