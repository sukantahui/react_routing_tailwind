// topic1_questions.js
// 30 questions about why file handling is needed (moderate to expert)

const questions = [
  {
    question: "Why is RAM considered volatile memory?",
    shortAnswer: "RAM loses all stored data when power is turned off.",
    explanation: "Volatility means the data is only retained while the computer has power. This makes RAM unsuitable for long‑term storage.",
    hint: "Think about what happens to your unsaved work during a power outage.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the primary purpose of file handling?",
    shortAnswer: "To provide persistent storage for data so it survives program termination and system reboots.",
    explanation: "File handling bridges the gap between volatile memory and non‑volatile storage, ensuring data permanence.",
    hint: "It's the difference between temporary and permanent.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Give three examples of applications that rely heavily on file handling.",
    shortAnswer: "Word processors, video games, and banking systems.",
    explanation: "All these applications need to save and retrieve data to function properly across sessions.",
    hint: "Think about applications that 'remember' your progress or settings.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What happens to a Python variable's value when the script finishes?",
    shortAnswer: "It is destroyed and the memory is reclaimed by the operating system.",
    explanation: "Variables live only within the program's runtime; they do not persist after the process exits.",
    hint: "It's like writing on a whiteboard and then erasing it.",
    level: "basic",
    codeExample: "x = 10  # x disappears after script ends"
  },
  {
    question: "Why can't we just store everything in RAM permanently?",
    shortAnswer: "RAM is expensive, limited, and volatile; it cannot retain data without power.",
    explanation: "Disk storage is cheaper, denser, and non‑volatile, making it suitable for long‑term storage.",
    hint: "Cost and persistence are the key factors.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between a hard disk and RAM?",
    shortAnswer: "Hard disk is non‑volatile and slower; RAM is volatile and faster.",
    explanation: "Hard disk (or SSD) stores data permanently; RAM temporarily holds data for quick access by the CPU.",
    hint: "One is like a filing cabinet, the other like a desk.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why is data persistence important in business applications?",
    shortAnswer: "It ensures business records, transactions, and customer data are not lost.",
    explanation: "Business continuity relies on persistent data; without it, operations cannot resume after a restart.",
    hint: "Imagine a store that forgets all sales every day.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What are configuration files and why are they useful?",
    shortAnswer: "They store settings and preferences, allowing applications to be customised without recompiling code.",
    explanation: "Config files (e.g., .conf, .json, .yaml) let users and developers adjust behaviour easily.",
    hint: "They let you change how an app behaves without changing the source code.",
    level: "intermediate",
    codeExample: "with open('config.json') as f: config = json.load(f)"
  },
  {
    question: "How does logging to a file help in debugging?",
    shortAnswer: "Logs provide a historical record of events, errors, and system states.",
    explanation: "When an error occurs, logs help trace back to the root cause, even if the error happened hours ago.",
    hint: "It's like a flight recorder for your software.",
    level: "intermediate",
    codeExample: "import logging; logging.basicConfig(filename='app.log')"
  },
  {
    question: "What is an atomic write and why is it useful?",
    shortAnswer: "Writing to a temporary file and then renaming it, ensuring the file is never partially written.",
    explanation: "Atomic writes prevent corruption if the program crashes mid‑write.",
    hint: "It's like preparing a document in a draft folder and then moving it to the final folder.",
    level: "advanced",
    codeExample: "write to tmp, then os.rename(tmp, target)"
  },
  {
    question: "What is the risk of writing to a file only at the end of a program?",
    shortAnswer: "If the program crashes before the final write, all data is lost.",
    explanation: "Frequent incremental saves minimise data loss in case of unexpected termination.",
    hint: "Save early, save often.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do video games save progress using files?",
    shortAnswer: "They write player state (level, score, inventory) to a save file, often in JSON or binary format.",
    explanation: "When the game loads, it reads that file to restore the player's progress.",
    hint: "Think of your last saved checkpoint.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why do mobile apps store preferences in files?",
    shortAnswer: "To provide a personalised experience each time the user opens the app.",
    explanation: "Files allow the app to remember theme choices, login tokens, and recent activity.",
    hint: "Dark mode preference survives app restarts because of a file.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does 'persistence layer' mean in software architecture?",
    shortAnswer: "The component responsible for storing and retrieving data, often using files or databases.",
    explanation: "It's a standard term for the part of the system that handles data storage.",
    hint: "It's the bridge between your application logic and permanent storage.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do operating systems use files for system management?",
    shortAnswer: "They store logs, configuration, and system state in files (e.g., /var/log, /etc).",
    explanation: "System files allow the OS to boot, configure devices, and diagnose issues.",
    hint: "Everything in /etc on Linux is a file.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is a file descriptor in the context of persistence?",
    shortAnswer: "A low‑level handle used by the OS to manage open files; it's how the kernel tracks file operations.",
    explanation: "Understanding file descriptors is useful for advanced I/O and system programming.",
    hint: "It's the OS's internal identifier for an open file.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why should you handle PermissionError when writing files?",
    shortAnswer: "To prevent crashes when the program lacks write access to the target directory.",
    explanation: "In production, permissions vary; graceful handling improves user experience.",
    hint: "Not all directories are writable by your program.",
    level: "intermediate",
    codeExample: "try: open(...); except PermissionError: ..."
  },
  {
    question: "What is the role of file locking in multi‑user systems?",
    shortAnswer: "It prevents simultaneous writes that could corrupt the file.",
    explanation: "Locking ensures data integrity when multiple processes or users access the same file.",
    hint: "Think of a 'do not disturb' sign on a file.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why is it recommended to store user data in a separate file from program code?",
    shortAnswer: "To separate concerns; code is static, data is dynamic and user‑specific.",
    explanation: "This makes updates easier and respects user privacy.",
    hint: "Config and data should not be hard‑coded.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the trade‑off between saving data as text vs binary?",
    shortAnswer: "Text is human‑readable and portable but larger; binary is compact and faster but not human‑readable.",
    explanation: "Choose based on whether you need human inspection or performance.",
    hint: "JSON vs picke or custom binary.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does file handling contribute to data analysis workflows?",
    shortAnswer: "Data analysts load datasets from files, process them, and write results back to files.",
    explanation: "Files are the primary medium for batch data processing and reporting.",
    hint: "CSV files are the lingua franca of data analysis.",
    level: "intermediate",
    codeExample: "import pandas; df = pandas.read_csv('data.csv')"
  },
  {
    question: "What is the difference between 'saving' and 'persisting' data?",
    shortAnswer: "Saving is the act of writing; persisting is the property of data surviving beyond the session.",
    explanation: "Persistence is the goal; saving is the mechanism.",
    hint: "One is the action, the other is the outcome.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why do web applications use databases instead of plain files for user data?",
    shortAnswer: "Databases provide concurrent access, querying, and transaction support that plain files lack.",
    explanation: "For large‑scale multi‑user systems, databases are the standard persistence layer.",
    hint: "Files work for single‑user small data; databases scale.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is a 'save file' in the context of a desktop application?",
    shortAnswer: "A file written by the application to store the user's current work state.",
    explanation: "It allows the user to close and reopen the application without losing progress.",
    hint: "Your .docx, .psd, or .blend files.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why should you avoid hard‑coding absolute file paths in your code?",
    shortAnswer: "It makes the code non‑portable across different systems and user directories.",
    explanation: "Use relative paths or configuration to determine file locations.",
    hint: "Your code won't work on another computer with a different drive structure.",
    level: "intermediate",
    codeExample: "use os.path.join() or relative paths."
  },
  {
    question: "How do backup systems rely on file handling?",
    shortAnswer: "They copy files from one location to another, often with versioning, to ensure data recovery.",
    explanation: "File handling is the foundation of all backup and restore operations.",
    hint: "Backup = reading files and writing them to another location.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the role of file systems in data persistence?",
    shortAnswer: "They organise, name, and manage files on storage devices, providing the structure for persistence.",
    explanation: "The file system (NTFS, ext4, APFS) is the underlying layer that makes file handling possible.",
    hint: "You can't have files without a file system.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do cloud storage services extend file persistence?",
    shortAnswer: "They synchronise local files with remote servers, providing off‑site backup and availability.",
    explanation: "Cloud storage adds redundancy and accessibility to traditional file persistence.",
    hint: "Dropbox, Google Drive, and iCloud are examples.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is a 'version control' system and how does it use files?",
    shortAnswer: "It tracks changes to files over time, allowing rollbacks and collaboration.",
    explanation: "Git, for example, stores snapshots of files in a hidden .git folder.",
    hint: "Every commit is a saved state of your files.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why is it important to flush data to disk in critical applications?",
    shortAnswer: "To ensure data is physically written, not just held in OS buffers.",
    explanation: "Flushing reduces the risk of data loss in case of power failure or crash.",
    hint: "Buffers can lose data; flushing forces a write to the disk.",
    level: "advanced",
    codeExample: "file.flush(); os.fsync(fd)"
  }
];

export default questions;