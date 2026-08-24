// topic14_questions.js
// 30 questions about read(size) (moderate to expert)

const questions = [
  {
    question: "What is the purpose of the size parameter in read(size)?",
    shortAnswer: "It limits the number of characters/bytes read from the file.",
    explanation: "This enables efficient chunked reading, preventing memory issues.",
    hint: "It's used to read a specific amount.",
    level: "basic",
    codeExample: "data = f.read(1024)"
  },
  {
    question: "What does read(size) return when it reaches EOF?",
    shortAnswer: "An empty string '' (text) or empty bytes b'' (binary).",
    explanation: "This is the signal to stop reading in a loop.",
    hint: "Use `if not chunk: break`.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Is size measured in characters or bytes in text mode?",
    shortAnswer: "Characters.",
    explanation: "In text mode, size is the maximum number of characters to return.",
    hint: "Due to encoding, it may read more bytes.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is size measured in characters or bytes in binary mode?",
    shortAnswer: "Bytes.",
    explanation: "Binary mode reads exact byte counts.",
    hint: "No decoding is done.",
    level: "basic",
    codeExample: "f.read(100)  # reads 100 bytes"
  },
  {
    question: "What happens if you call read(size) with a negative size?",
    shortAnswer: "It reads until EOF (same as read() without args).",
    explanation: "Negative size is treated as if size were not given.",
    hint: "It's equivalent to read()",
    level: "intermediate",
    codeExample: "f.read(-1)  # reads whole file"
  },
  {
    question: "What happens if you call read(0)?",
    shortAnswer: "It returns an empty string/bytes and does not advance the pointer.",
    explanation: "It's a no‑op read.",
    hint: "Useful for testing.",
    level: "intermediate",
    codeExample: "f.read(0)  # '' or b''"
  },
  {
    question: "What is the chunked reading pattern?",
    shortAnswer: "A loop that repeatedly calls read(size) until EOF.",
    explanation: "This processes large files in manageable pieces.",
    hint: "`while True: chunk = f.read(size); if not chunk: break`",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why is chunked reading important?",
    shortAnswer: "It prevents memory exhaustion when processing large files.",
    explanation: "Only a small portion of the file is in memory at a time.",
    hint: "Think of streaming.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a good default chunk size?",
    shortAnswer: "8192 (8KB) or 16384 (16KB) are common starting points.",
    explanation: "These balance I/O overhead and memory usage.",
    hint: "Power‑of‑two sizes are typical.",
    level: "intermediate",
    codeExample: "chunk_size = 8192"
  },
  {
    question: "How do you choose the optimal chunk size?",
    shortAnswer: "By profiling your code with different sizes.",
    explanation: "Measure performance and memory usage for your specific environment.",
    hint: "Experiment.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Does read(size) always read exactly `size` characters in text mode?",
    shortAnswer: "No, it may read fewer if the file ends or if the character boundary is reached.",
    explanation: "It ensures a valid character boundary is respected.",
    hint: "May be less than size.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Does read(size) always read exactly `size` bytes in binary mode?",
    shortAnswer: "It reads up to `size` bytes; it may be less at EOF.",
    explanation: "If there are fewer bytes remaining, it returns only those.",
    hint: "Not exactly if EOF.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the difference between read(size) and read()?",
    shortAnswer: "read() reads the whole file; read(size) reads at most size.",
    explanation: "read() is just read(-1) or read(no arg).",
    hint: "read() = read(-1).",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you use read(size) with files opened in 'r+' mode?",
    shortAnswer: "Yes, it works for any mode that allows reading.",
    explanation: "'r+', 'w+', 'a+' all support read(size).",
    hint: "Any read‑enabled mode.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Does read(size) move the file pointer?",
    shortAnswer: "Yes, it advances by the number of characters/bytes read.",
    explanation: "The pointer position is updated.",
    hint: "Use tell() to check.",
    level: "intermediate",
    codeExample: "f.tell()"
  },
  {
    question: "How do you detect EOF when using read(size)?",
    shortAnswer: "Check if the returned chunk is empty ('' or b'').",
    explanation: "An empty string/bytes indicates EOF.",
    hint: "`if not chunk: break`.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why does read(size) in text mode sometimes read more bytes than size?",
    shortAnswer: "To ensure character boundaries are respected.",
    explanation: "It may need to read extra bytes to complete a multi‑byte character.",
    hint: "UTF‑8 characters can be 1‑4 bytes.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Is there a performance difference between reading in chunks vs reading whole file?",
    shortAnswer: "For large files, chunked reading is slower due to more I/O calls, but necessary.",
    explanation: "The trade‑off is memory vs speed.",
    hint: "I/O calls have overhead.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the maximum size you can pass to read(size)?",
    shortAnswer: "No hard limit, but it's limited by memory.",
    explanation: "A very large size would attempt to allocate a huge block.",
    hint: "Use reasonable sizes.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use read(size) on a file opened with 'a' mode?",
    shortAnswer: "No, 'a' is write‑only; use 'a+' for reading.",
    explanation: "'a' does not support reading.",
    hint: "Add '+' to read.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the typical use case for read(size)?",
    shortAnswer: "Processing large files, streaming data, or reading fixed‑length records.",
    explanation: "It's used whenever you need to control how much data is read at a time.",
    hint: "Memory efficiency.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How does read(size) handle multi‑byte characters like emojis?",
    shortAnswer: "In text mode, it reads complete characters; may read extra bytes.",
    explanation: "It ensures a valid character is returned.",
    hint: "Emojis are 4 bytes in UTF‑8.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the relationship between read(size) and seek()?",
    shortAnswer: "You can seek to a position, then read(size) from there.",
    explanation: "They work together for random access.",
    hint: "Use seek() to navigate, read(size) to extract.",
    level: "advanced",
    codeExample: "f.seek(100); data = f.read(50)"
  },
  {
    question: "Can you use read(size) with a file object from urllib or requests?",
    shortAnswer: "Yes, if the object supports read() with a size parameter.",
    explanation: "Many streaming response objects support it.",
    hint: "Works with file‑like objects.",
    level: "advanced",
    codeExample: "response.read(1024)"
  },
  {
    question: "What is the walrus operator and how does it help with read(size)?",
    shortAnswer: "It allows assigning and testing in one expression: `while chunk := f.read(size):`.",
    explanation: "It simplifies the loop by combining assignment and condition.",
    hint: "Python 3.8+.",
    level: "advanced",
    codeExample: "while chunk := f.read(8192): process(chunk)"
  },
  {
    question: "Is it possible to read a file in chunks without a loop?",
    shortAnswer: "No, you need a loop to process multiple chunks.",
    explanation: "Unless you only need one chunk.",
    hint: "A loop is required.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What happens if you read a file with a chunk size larger than the file?",
    shortAnswer: "It reads the entire file in one chunk.",
    explanation: "It returns the whole file content.",
    hint: "No error, just all data.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why might read(size) be preferred over readline() for certain tasks?",
    shortAnswer: "When you need to read raw bytes or fixed‑sized blocks.",
    explanation: "readline() is line‑oriented; read(size) is not.",
    hint: "Different use cases.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the effect of buffering on read(size)?",
    shortAnswer: "Python's built‑in buffering means read(size) may read more than size into the buffer.",
    explanation: "The buffer improves performance by reading ahead.",
    hint: "Buffer size can be set in open()",
    level: "advanced",
    codeExample: "open('f.txt', 'r', buffering=8192)"
  },
  {
    question: "How can you read a file backwards using read(size)?",
    shortAnswer: "Use seek() to move to positions from the end and read backwards.",
    explanation: "You can seek to end-100 and read(100), etc.",
    hint: "Seek from the end.",
    level: "advanced",
    codeExample: "f.seek(-100, 2); data = f.read(100)"
  }
];

export default questions;