const topic0_questions = [
  {
    "question": "Why does unbuffered I/O (e.g. reading single bytes from FileInputStream) result in catastrophic performance degradation?",
    "shortAnswer": "Every unbuffered read or write triggers an operating system Kernel context switch (user mode to kernel mode transition) and physical disk/network hardware interrupt. Reading a 10MB file 1 byte at a time forces 10,000,000 separate kernel syscalls. Buffering fetches an 8192-byte block in a single syscall and serves subsequent reads directly from RAM at memory bus speeds.",
    "explanation": "Buffering reduces OS system call frequency by a factor of 8192x.",
    "hint": "Eliminates millions of expensive OS kernel context switches by caching large blocks in RAM.",
    "level": "Beginner",
    "codeExample": "BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));"
  }
];

export default topic0_questions;