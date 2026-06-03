// topic9_questions.js
const questions = [
  {
    question: "What is message passing in IPC?",
    shortAnswer: "A method where processes exchange discrete messages via kernel‑managed message queues.",
    explanation: "Each message has a type and data. Senders and receivers do not need to be related or run simultaneously. Messages persist in the kernel until received.",
    hint: "Think of a mailbox.",
    level: "basic",
    codeExample: "msgsnd(msqid, &msg, size, 0);"
  },
  {
    question: "What is the difference between pipes and message queues?",
    shortAnswer: "Pipes are byte streams for related processes; message queues handle structured messages and can be used by unrelated processes.",
    explanation: "Message queues decouple sender and receiver in time – a process can send a message and exit, another can receive it later.",
    hint: "Pipes: synchronous stream; message queues: asynchronous with message boundaries.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What are the key System V message queue system calls?",
    shortAnswer: "msgget(), msgsnd(), msgrcv(), msgctl().",
    explanation: "msgget creates/connects, msgsnd sends, msgrcv receives, msgctl controls (e.g., removal).",
    hint: "man 2 msgget",
    level: "basic",
    codeExample: "int msqid = msgget(key, IPC_CREAT | 0666);"
  },
  {
    question: "What is the required structure for a System V message?",
    shortAnswer: "It must have a long mtype as first member, followed by any data.",
    explanation: "The kernel uses the long integer to route messages by type. The type must be > 0.",
    hint: "struct msgbuf { long mtype; char mtext[100]; };",
    level: "intermediate",
    codeExample: "struct msgbuf msg = { 1, 'Hello' };"
  },
  {
    question: "What does msgrcv() do when msgtyp is 0?",
    shortAnswer: "It receives the first message of any type in the queue (FIFO).",
    explanation: "Useful when you don't need type filtering.",
    hint: "First‑in‑first‑out regardless of type.",
    level: "intermediate",
    codeExample: "msgrcv(msqid, &msg, size, 0, 0);"
  },
  {
    question: "What does msgrcv() do when msgtyp is positive?",
    shortAnswer: "It receives the first message of that exact type.",
    explanation: "Only messages with mtype equal to msgtyp are considered.",
    hint: "msgrcv(..., 1, ...) receives type 1 messages.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does msgrcv() do when msgtyp is negative?",
    shortAnswer: "It receives the first message with the lowest type value that is ≤ |msgtyp|.",
    explanation: "Example: msgtyp = -5 receives messages of types 1,2,3,4,5 – the one with smallest type value.",
    hint: "Used for priority reception (lower type = higher priority).",
    level: "advanced",
    codeExample: "msgrcv(..., msgtyp, ...) with msgtyp = -10;"
  },
  {
    question: "How do you delete a System V message queue?",
    shortAnswer: "Use msgctl(msqid, IPC_RMID, NULL).",
    explanation: "The queue is removed immediately, even if processes still have it open.",
    hint: "ipcrm -q <msqid>",
    level: "basic",
    codeExample: "msgctl(msqid, IPC_RMID, NULL);"
  },
  {
    question: "What command shows all message queues?",
    shortAnswer: "ipcs -q",
    explanation: "Shows msqid, key, owner, permissions, number of messages, etc.",
    hint: "ipcs -a shows all IPC facilities.",
    level: "basic",
    codeExample: "ipcs -q"
  },
  {
    question: "What is a POSIX message queue?",
    shortAnswer: "A newer message queue interface using names (e.g., '/myqueue') and functions like mq_open(), mq_send(), mq_receive().",
    explanation: "POSIX queues support non‑blocking operations, priorities, and are mounted under /dev/mqueue.",
    hint: "ls /dev/mqueue",
    level: "intermediate",
    codeExample: "mqd_t mqd = mq_open('/myqueue', O_CREAT | O_RDWR, 0666, NULL);"
  },
  {
    question: "What is the difference between System V and POSIX message queues?",
    shortAnswer: "System V uses integer keys; POSIX uses string names and has better support for real‑time and non‑blocking ops.",
    explanation: "POSIX queues have a simpler API and are more portable across modern Unix systems.",
    hint: "POSIX: mq_send, System V: msgsnd.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What are typical kernel limits for System V message queues?",
    shortAnswer: "msgmax (max bytes per message), msgmnb (max bytes per queue), msgmni (max number of queues).",
    explanation: "Defaults: msgmax=8192, msgmnb=16384, msgmni=16 (can be tuned).",
    hint: "cat /proc/sys/kernel/msgmax",
    level: "advanced",
    codeExample: "sysctl kernel.msgmax"
  },
  {
    question: "Can a message queue be shared between unrelated processes?",
    shortAnswer: "Yes, if they use the same key (System V) or same name (POSIX).",
    explanation: "No parent‑child relationship needed. Just need appropriate permissions.",
    hint: "Any process with the key can access the queue.",
    level: "intermediate",
    codeExample: "msgget(key, 0666);"
  },
  {
    question: "What happens if you msgsnd to a full queue?",
    shortAnswer: "The call blocks until space becomes available unless IPC_NOWAIT is set.",
    explanation: "The queue has a maximum size (msgmnb). Blocking can be avoided with O_NONBLOCK equivalent.",
    hint: "msgsnd(..., IPC_NOWAIT);",
    level: "intermediate",
    codeExample: "msgsnd(msqid, &msg, len, IPC_NOWAIT); // returns -1 if full"
  },
  {
    question: "What is ftok() used for?",
    shortAnswer: "Generates a key for System V IPC from a pathname and project ID.",
    explanation: "Converts a filesystem path and integer into a likely unique key for msgget, semget, shmget.",
    hint: "key_t key = ftok('/tmp/myapp', 'A');",
    level: "intermediate",
    codeExample: "key_t key = ftok('.', 'x');"
  },
  {
    question: "How can two processes receive different message types from the same queue?",
    shortAnswer: "Each calls msgrcv with its desired msgtyp. The kernel delivers messages to the first waiting receiver that matches the type.",
    explanation: "Multiple receivers can coexist; each receives messages that match its type filter.",
    hint: "One receiver can wait for type 1, another for type 2.",
    level: "advanced",
    codeExample: "// process A: msgrcv(..., 1, ...); process B: msgrcv(..., 2, ...);"
  },
  {
    question: "What is the purpose of IPC_CREAT and IPC_EXCL flags?",
    shortAnswer: "IPC_CREAT creates the queue if it doesn't exist; IPC_EXCL causes failure if it already exists.",
    explanation: "Used together to ensure exclusive creation.",
    hint: "Similar to O_CREAT|O_EXCL for files.",
    level: "intermediate",
    codeExample: "msgget(key, IPC_CREAT | IPC_EXCL | 0666);"
  },
  {
    question: "What does msgrcv return on success?",
    shortAnswer: "The number of bytes actually copied into the message text (excluding the mtype).",
    explanation: "Useful to validate how much data was received.",
    hint: "ssize_t n = msgrcv(...);",
    level: "basic",
    codeExample: "if (msgrcv(...) == -1) perror('msgrcv');"
  },
  {
    question: "Can you use the same message queue for both directions?",
    shortAnswer: "Yes, with different message types: type 1 for request, type 2 for reply.",
    explanation: "The queue is bidirectional but you need type differentiation to avoid confusion.",
    hint: "Two‑way communication with one queue.",
    level: "intermediate",
    codeExample: "sender sends type=1; receiver replies with type=2 using same queue."
  },
  {
    question: "What are the advantages of POSIX over System V message queues?",
    shortAnswer: "Better API (mq_send, mq_receive), support for priorities, non‑blocking operations, file‑like interface.",
    explanation: "POSIX also supports notification via signals or threads (mq_notify).",
    hint: "mq_notify() can spawn a thread on message arrival.",
    level: "advanced",
    codeExample: "mq_notify(mqd, &sevp);"
  },
  {
    question: "How do you remove a POSIX message queue?",
    shortAnswer: "Use mq_unlink(name).",
    explanation: "The queue is removed when all references are closed.",
    hint: "mq_unlink('/myqueue');",
    level: "intermediate",
    codeExample: "mq_unlink('/myqueue');"
  },
  {
    question: "What is the default maximum message size for POSIX queues?",
    shortAnswer: "Depends on system, often 8192 bytes (can be set with mq_attr).",
    explanation: "You can specify mq_maxmsg and mq_msgsize when creating a queue.",
    hint: "struct mq_attr attr = { .mq_maxmsg = 10, .mq_msgsize = 4096 };",
    level: "advanced",
    codeExample: "mq_open(name, O_CREAT, 0666, &attr);"
  },
  {
    question: "What happens if you send a message larger than the maximum message size?",
    shortAnswer: "mq_send fails with EMSGSIZE (System V msgsnd also fails).",
    explanation: "The kernel rejects messages exceeding the queue's per‑message size limit.",
    hint: "Check mq_msgsize attribute.",
    level: "intermediate",
    codeExample: "if (mq_send(...) == -1 && errno == EMSGSIZE) // too big"
  },
  {
    question: "Can a process receive a message sent by itself?",
    shortAnswer: "Yes, if it sends with a type and then receives that same type.",
    explanation: "But it's usually not useful; can be used for testing.",
    hint: "Self‑communication is possible.",
    level: "basic",
    codeExample: "msgsnd(..., 1, ...); msgrcv(..., 1, ...); // receives own message"
  },
  {
    question: "What is the advantage of message queues over shared memory?",
    shortAnswer: "No synchronisation issues – messages are atomic and buffered by kernel.",
    explanation: "Shared memory requires explicit synchronisation (semaphores). Message queues handle it automatically.",
    hint: "Message queues are simpler for small, discrete messages.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How to set non‑blocking mode for msgrcv?",
    shortAnswer: "Use IPC_NOWAIT flag.",
    explanation: "If no message is available, msgrcv returns -1 with errno ENOMSG.",
    hint: "msgrcv(..., IPC_NOWAIT);",
    level: "intermediate",
    codeExample: "if (msgrcv(..., IPC_NOWAIT) == -1 && errno == ENOMSG) // no message"
  },
  {
    question: "What is the 'msqid_ds' structure?",
    shortAnswer: "Kernel data structure storing queue metadata: permissions, message counts, creator PID, etc.",
    explanation: "Retrieved with msgctl(msqid, IPC_STAT, &buf).",
    hint: "man 2 msgctl",
    level: "advanced",
    codeExample: "struct msqid_ds buf; msgctl(msqid, IPC_STAT, &buf);"
  },
  {
    question: "How can a process get the sender's PID from a message?",
    shortAnswer: "In System V, the kernel does not store sender PID in the message. You must embed it in the message data.",
    explanation: "You can add a field in your message structure to carry PID.",
    hint: "struct msgbuf { long mtype; pid_t sender_pid; char data[...]; };",
    level: "expert",
    codeExample: "msg.sender_pid = getpid(); msgsnd(...);"
  },
  {
    question: "What is the 'msgctl' command to change queue permissions?",
    shortAnswer: "IPC_SET with a filled struct msqid_ds.",
    explanation: "Only the owner or superuser can change permissions.",
    hint: "msgctl(msqid, IPC_SET, &buf);",
    level: "advanced",
    codeExample: "buf.msg_perm.mode = 0600; msgctl(msqid, IPC_SET, &buf);"
  },
  {
    question: "What happens if you call msgrcv with msgtyp = -1?",
    shortAnswer: "It receives the first message with type ≤ 1, i.e., only messages of type 1.",
    explanation: "Negative numbers select the smallest type value less than or equal to the absolute value.",
    hint: "-1 means receive type 1 only.",
    level: "expert",
    codeExample: "msgrcv(..., -1, ...); // receives type 1"
  }
];

export default questions;