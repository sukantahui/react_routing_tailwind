// topic8_questions.js
const questions = [
  {
    question: "What does the pipe() system call do?",
    shortAnswer: "Creates a unidirectional data channel, returning two file descriptors: one for reading, one for writing.",
    explanation: "pipe() is used for communication between related processes. Data written to fd[1] can be read from fd[0]. The kernel maintains a circular buffer.",
    hint: "man 2 pipe",
    level: "basic",
    codeExample: "int fd[2]; pipe(fd);"
  },
  {
    question: "Which file descriptor is read end and which is write end?",
    shortAnswer: "fd[0] is read end, fd[1] is write end.",
    explanation: "Convention: 0 for read (like stdin), 1 for write (like stdout).",
    hint: "read from fd[0], write to fd[1]",
    level: "basic",
    codeExample: "read(fd[0], buf, len); write(fd[1], buf, len);"
  },
  {
    question: "Are pipes bidirectional?",
    shortAnswer: "No, a pipe is unidirectional. For two‑way communication, use two pipes or socketpair.",
    explanation: "Data flows only from write end to read end. You cannot read what you wrote on the same end.",
    hint: "You need two pipes for full duplex.",
    level: "intermediate",
    codeExample: "int fd1[2], fd2[2]; pipe(fd1); pipe(fd2);"
  },
  {
    question: "What happens if you read from an empty pipe?",
    shortAnswer: "The read blocks until data is available (unless O_NONBLOCK is set).",
    explanation: "If write end is closed, read returns 0 (EOF). Blocking behaviour can be changed with fcntl.",
    hint: "fcntl(fd, F_SETFL, O_NONBLOCK);",
    level: "intermediate",
    codeExample: "ssize_t n = read(fd[0], buf, size); // may block"
  },
  {
    question: "What happens if you write to a full pipe?",
    shortAnswer: "The write blocks until space becomes available (unless O_NONBLOCK).",
    explanation: "Pipe buffer size is limited (typically 64KB). Write may also return a partial count if interrupted.",
    hint: "ulimit -a shows pipe buffer size.",
    level: "intermediate",
    codeExample: "write(fd[1], bigbuf, 100000); // may block"
  },
  {
    question: "Why should a process close the unused pipe ends after fork?",
    shortAnswer: "To prevent resource leaks and ensure proper EOF detection.",
    explanation: "If a child keeps the write end open, the parent's read will never get EOF. Closing prevents deadlocks.",
    hint: "close(fd[0]) in writer; close(fd[1]) in reader.",
    level: "intermediate",
    codeExample: "if (pid == 0) { close(fd[1]); /* child reads */ } else { close(fd[0]); /* parent writes */ }"
  },
  {
    question: "What is the typical pipe buffer size on Linux?",
    shortAnswer: "Default is 16 pages = 65536 bytes (64KB), configurable via fcntl(..., F_SETPIPE_SZ).",
    explanation: "The buffer size can be increased up to /proc/sys/fs/pipe-max-size (usually 1MB).",
    hint: "fcntl(fd, F_GETPIPE_SZ);",
    level: "advanced",
    codeExample: "int size = fcntl(fd[0], F_GETPIPE_SZ);"
  },
  {
    question: "What is PIPE_BUF and why is it important?",
    shortAnswer: "Maximum size for atomic writes. Writes ≤ PIPE_BUF are guaranteed atomic; larger writes may be interleaved.",
    explanation: "On Linux, PIPE_BUF = 4096 bytes. Atomic means the write won't be interleaved with writes from other processes.",
    hint: "pathconf(\".\", _PC_PIPE_BUF);",
    level: "advanced",
    codeExample: "write(fd[1], data, 4096); // atomic if no other writer"
  },
  {
    question: "Can two unrelated processes use a pipe?",
    shortAnswer: "No, anonymous pipes require a common ancestor. Named pipes (FIFOs) can be used for unrelated processes.",
    explanation: "Pipe file descriptors are inherited via fork(). For unrelated processes, use mkfifo (named pipe).",
    hint: "mkfifo mypipe",
    level: "intermediate",
    codeExample: "mkfifo /tmp/mypipe; read end process: cat /tmp/mypipe; write end: echo hello > /tmp/mypipe"
  },
  {
    question: "How do shells implement pipelines like 'ls | grep foo'?",
    shortAnswer: "The shell creates a pipe, forks two children, redirects stdout of the first to pipe write end and stdin of the second from pipe read end.",
    explanation: "The shell then waits for both children to finish. It also closes the pipe ends in the parent.",
    hint: "strace -f -e pipe,dup2 bash -c 'ls | grep foo'",
    level: "advanced",
    codeExample: "pipe(fd); dup2(fd[1], STDOUT_FILENO); dup2(fd[0], STDIN_FILENO);"
  },
  {
    question: "What does read() return on a pipe when the write end is closed?",
    shortAnswer: "Returns 0 (EOF) after reading all remaining data, indicating no more writes will happen.",
    explanation: "This is how the reader knows the writer has finished.",
    hint: "while ((n = read(fd[0], buf, size)) > 0) { } // loop ends when n == 0",
    level: "intermediate",
    codeExample: "if (read(fd[0], buf, 1) == 0) printf('Writer closed pipe');"
  },
  {
    question: "Can a pipe be made non‑blocking?",
    shortAnswer: "Yes, using fcntl(fd, F_SETFL, O_NONBLOCK) on either end.",
    explanation: "Then read returns -1 with errno EAGAIN if empty, write returns -1 with EAGAIN if full.",
    hint: "fcntl(fd[0], F_SETFL, fcntl(fd[0], F_GETFL) | O_NONBLOCK);",
    level: "advanced",
    codeExample: "int flags = fcntl(fd[0], F_GETFL); fcntl(fd[0], F_SETFL, flags | O_NONBLOCK);"
  },
  {
    question: "What is the difference between pipe() and socketpair()?",
    shortAnswer: "pipe() is unidirectional stream; socketpair() creates a pair of connected sockets, which can be bidirectional.",
    explanation: "socketpair(AF_UNIX, SOCK_STREAM, 0, sv) gives two file descriptors, each can read and write.",
    hint: "Use socketpair for full duplex between parent and child.",
    level: "expert",
    codeExample: "int sv[2]; socketpair(AF_UNIX, SOCK_STREAM, 0, sv);"
  },
  {
    question: "What happens if multiple processes write to the same pipe?",
    shortAnswer: "Writes ≤ PIPE_BUF are atomic and won't interleave; larger writes may be interleaved arbitrarily.",
    explanation: "Kernel uses a pipe mutex for atomicity of small writes. For larger writes, data from different writers can mix.",
    hint: "Use a single writer or synchronise externally.",
    level: "advanced",
    codeExample: "// two children writing to same pipe; parent reading"
  },
  {
    question: "Can a pipe be used for binary data?",
    shortAnswer: "Yes, pipes are byte streams; they handle any data, including null bytes.",
    explanation: "Unlike C strings, read/write deal with raw bytes. No special interpretation.",
    hint: "write(fd[1], &binary, sizeof(binary));",
    level: "basic",
    codeExample: "int value = 42; write(fd[1], &value, sizeof(value));"
  },
  {
    question: "What is the relation between pipe() and popen()?",
    shortAnswer: "popen() creates a pipe to a child process and returns a FILE* stream, simplifying reading/writing.",
    explanation: "popen() is built on pipe(), fork(), exec(). It handles closing ends and waiting.",
    hint: "FILE *fp = popen('ls', 'r'); fread(...); pclose(fp);",
    level: "intermediate",
    codeExample: "FILE *fp = popen('grep error', 'w'); fwrite(...); pclose(fp);"
  },
  {
    question: "What is a 'broken pipe' error (SIGPIPE)?",
    shortAnswer: "When a process writes to a pipe whose read end has been closed, the kernel sends SIGPIPE.",
    explanation: "Default action is to terminate the writer. Can be ignored or handled.",
    hint: "signal(SIGPIPE, SIG_IGN); write returns -1 with EPIPE.",
    level: "intermediate",
    codeExample: "write(fd[1], buf, len); // if fd[0] closed, process gets SIGPIPE"
  },
  {
    question: "How can you avoid SIGPIPE when writing to a broken pipe?",
    shortAnswer: "Ignore SIGPIPE (signal(SIGPIPE, SIG_IGN)) or use MSG_NOSIGNAL flag on send() for sockets.",
    explanation: "For pipes, ignoring SIGPIPE causes write to return -1 with errno EPIPE.",
    hint: "signal(SIGPIPE, SIG_IGN);",
    level: "advanced",
    codeExample: "signal(SIGPIPE, SIG_IGN); ssize_t n = write(fd[1], buf, size); if (n == -1 && errno == EPIPE) // pipe broken"
  },
  {
    question: "What is the difference between pipe and FIFO (named pipe)?",
    shortAnswer: "Pipe is anonymous, exists only in kernel, used between related processes. FIFO has a pathname, can be used by unrelated processes.",
    explanation: "FIFOs are created by mkfifo and opened like regular files. They support the same semantics as pipes.",
    hint: "mkfifo /tmp/myfifo; cat /tmp/myfifo & echo data > /tmp/myfifo",
    level: "intermediate",
    codeExample: "mkfifo myfifo; int fd = open('myfifo', O_RDONLY);"
  },
  {
    question: "How to check if a pipe has data available without blocking?",
    shortAnswer: "Use select(), poll(), or epoll on the read file descriptor.",
    explanation: "These I/O multiplexing calls can test readability without blocking.",
    hint: "struct pollfd fds = { .fd = fd[0], .events = POLLIN }; poll(&fds, 1, 0);",
    level: "advanced",
    codeExample: "if (poll(&fds, 1, 0) > 0 && (fds.revents & POLLIN)) // data available"
  },
  {
    question: "What is the kernel implementation of pipes?",
    shortAnswer: "A pipe is represented by struct pipe_inode_info containing a circular buffer of pages and wait queues.",
    explanation: "The buffer is allocated as a ring of pages. Locking ensures atomic writes.",
    hint: "Source: fs/pipe.c",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can you change the pipe buffer size after creation?",
    shortAnswer: "Yes, using fcntl(fd, F_SETPIPE_SZ, size) (Linux 2.6.35+). Requires CAP_SYS_ADMIN or size ≤ /proc/sys/fs/pipe-max-size.",
    explanation: "The size must be a multiple of page size. Returns new size or -1 on error.",
    hint: "fcntl(fd, F_SETPIPE_SZ, 1048576); // set to 1MB",
    level: "expert",
    codeExample: "int new_size = fcntl(fd[1], F_SETPIPE_SZ, 65536 * 2);"
  },
  {
    question: "Why does closing pipe ends prevent deadlock?",
    shortAnswer: "If writer keeps write end open, reader will never get EOF; if reader keeps read end open, writer may never get SIGPIPE on full pipe.",
    explanation: "Proper closing ensures that when one side finishes, the other receives EOF or SIGPIPE.",
    hint: "Rule: close the side you don't use.",
    level: "intermediate",
    codeExample: "close(fd[0]); // writer doesn't need read end"
  },
  {
    question: "How many bytes can be stored in a pipe buffer?",
    shortAnswer: "Default 65536 bytes (64KB), but can be increased per pipe or system‑wide.",
    explanation: "The system maximum is /proc/sys/fs/pipe-max-size (usually 1MB).",
    hint: "cat /proc/sys/fs/pipe-max-size",
    level: "intermediate",
    codeExample: "ulimit -a | grep 'pipe size'"
  },
  {
    question: "What is the performance of pipe compared to other IPC?",
    shortAnswer: "Very fast – pipes are among the fastest IPC mechanisms (kernel‑optimised).",
    explanation: "Pipes avoid copying data to user space multiple times when used with splice() or tee().",
    hint: "splice() zero‑copy moves data between pipes.",
    level: "expert",
    codeExample: "splice(fd_in, NULL, fd_out, NULL, len, SPLICE_F_MOVE);"
  },
  {
    question: "Can you share a pipe between processes after fork?",
    shortAnswer: "Yes, both parent and child have copies of the pipe file descriptors after fork.",
    explanation: "Both processes can access the same pipe. You must coordinate which end each uses.",
    hint: "After fork, both have fd[0] and fd[1] open.",
    level: "basic",
    codeExample: "pipe(fd); fork(); // both have fd[0] and fd[1]"
  },
  {
    question: "What does '|' mean in shell?",
    shortAnswer: "The pipe operator connects stdout of left command to stdin of right command using an anonymous pipe.",
    explanation: "The shell handles pipe creation, fork/exec, and redirections.",
    hint: "cmd1 | cmd2",
    level: "basic",
    codeExample: "ls -l | wc -l"
  },
  {
    question: "How to create a pipeline of more than two commands?",
    shortAnswer: "The shell creates a series of pipes and connects them appropriately. For 'a | b | c', two pipes are created.",
    explanation: "Each intermediate command's stdin comes from previous pipe, stdout goes to next pipe.",
    hint: "a | b | c",
    level: "intermediate",
    codeExample: "ps aux | grep bash | wc -l"
  },
  {
    question: "What is the difference between pipe and named pipe regarding persistence?",
    shortAnswer: "Anonymous pipes vanish when all referencing file descriptors are closed. Named pipes persist as filesystem entries until deleted.",
    explanation: "Named pipes (FIFOs) are created by mkfifo and remain in the filesystem.",
    hint: "ls -l myfifo shows a 'p' file type.",
    level: "basic",
    codeExample: "rm myfifo"
  }
];

export default questions;