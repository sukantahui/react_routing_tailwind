/**
 * Topic 4 FAQ Dataset: Core Design Principles of Git
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

const questions = [
  {
    question: "What are the 5 core design principles of Git?",
    shortAnswer: "1. Speed, 2. Simple design, 3. Strong non-linear development support, 4. Full distribution, 5. Absolute data integrity.",
    explanation: "When Linus Torvalds created Git in 2005, he explicitly established these five principles to avoid the architectural bottlenecks and design flaws of older version control systems like CVS and Subversion.",
    hint: "Speed, Simplicity, Non-linear branching, Distributed, Data integrity.",
    level: "basic",
    codeExample: "# The five principles dictate every Git internal command."
  },
  {
    question: "What are the 4 fundamental object types in Git's object database?",
    shortAnswer: "Blobs (file contents), Trees (directory structures), Commits (snapshots and metadata), and Tags (annotated release pointers).",
    explanation: "Everything inside the `.git/objects` folder is one of these four types. Git does not have a separate database table for files or directories; it stores everything as immutable zlib-compressed objects keyed by their SHA-1/SHA-256 hash.",
    hint: "Blob, Tree, Commit, Tag.",
    level: "basic",
    codeExample: "# Inspect object type:\ngit cat-file -t <hash>"
  },
  {
    question: "What is a 'Blob' object in Git?",
    shortAnswer: "A Blob (Binary Large Object) stores the raw, compressed contents of a file without its filename or permissions.",
    explanation: "Git decouples file content from file metadata. A blob only stores the bytes of the file. The filename, file mode, and folder structure are stored in a separate 'Tree' object.",
    hint: "Stores pure file contents, not filenames.",
    level: "basic",
    codeExample: "# Create a blob and get its hash:\necho 'console.log(1);' | git hash-object -w --stdin"
  },
  {
    question: "What is a 'Tree' object in Git?",
    shortAnswer: "A Tree object represents a directory, mapping filenames and permissions (file modes) to Blob or sub-Tree hashes.",
    explanation: "A Tree object is the equivalent of a folder in a Unix filesystem. Each entry in a tree contains the file mode (e.g. 100644 for regular file, 100755 for executable, 040000 for sub-directory), the object type, the SHA hash, and the filename.",
    hint: "Represents a directory in Git's internal filesystem.",
    level: "basic",
    codeExample: "# Inspect a tree object:\ngit cat-file -p HEAD^{tree}"
  },
  {
    question: "What is a 'Commit' object in Git?",
    shortAnswer: "An immutable object containing a pointer to a root Tree object, parent commit hash(es), author, committer, timestamps, and commit message.",
    explanation: "When you run `git commit`, Git packages the current staged tree into a commit object. A commit explicitly points to its parent commit(s), creating the historical chain of the Directed Acyclic Graph.",
    hint: "Stores tree pointer, parent SHA, author info, and message.",
    level: "basic",
    codeExample: "# Inspect raw commit object:\ngit cat-file -p HEAD"
  },
  {
    question: "How does Git's simple design enable content deduplication?",
    shortAnswer: "If two files have identical content or a file does not change between commits, Git reuses the exact same Blob SHA hash without storing duplicate bytes.",
    explanation: "Because blobs are keyed by content hash, if you copy `styles.css` into 10 different folders with identical contents, Git only stores ONE blob object on disk. The 10 tree entries simply reference that same SHA hash.",
    hint: "Content-addressed hashing prevents storing duplicate file bytes.",
    level: "intermediate",
    codeExample: "# Identical content produces identical SHA hashes:\ngit hash-object fileA.txt\ngit hash-object fileB.txt # (Same hash if content is identical)"
  },
  {
    question: "What does 'non-linear development' mean in Git's design principles?",
    shortAnswer: "The ability to easily branch off in parallel paths, experiment independently, and merge divergent histories smoothly without linear serialization.",
    explanation: "Older VCS forced teams into a linear timeline where changes were applied sequentially to a central trunk. Git enables simultaneous divergent branches that can be merged, rebased, or cherry-picked non-linearly.",
    hint: "Parallel feature branches rather than a single sequential line.",
    level: "intermediate",
    codeExample: "# View non-linear branch graph:\ngit log --graph --oneline --all"
  },
  {
    question: "Why does Git use zlib compression for all objects?",
    shortAnswer: "To minimize disk footprint and maximize I/O throughput when reading and writing repository objects on disk.",
    explanation: "Every object (blob, tree, commit, tag) is compressed with the standard deflate/zlib algorithm before being written to `.git/objects`. This keeps text code repositories extremely compact.",
    hint: "Standard zlib compression for compact storage.",
    level: "intermediate",
    codeExample: "# Decompress and inspect a raw object file on disk:\nzlib-flate -uncompress < .git/objects/7f/2a1b9..."
  },
  {
    question: "How does Git achieve data integrity through Merkle Directed Acyclic Graphs (DAG)?",
    shortAnswer: "Every commit's SHA hash depends on its tree and its parent commit's SHA hash, creating an unbroken cryptographic chain.",
    explanation: "Because a commit hash is computed from its parent hash, author, date, and root tree, it is mathematically impossible to alter any file or commit message in past history without changing that commit's SHA and all subsequent commit SHAs.",
    hint: "Cryptographic chaining where parent hash is embedded in child commit.",
    level: "intermediate",
    codeExample: "# Verify full cryptographic DAG integrity:\ngit fsck --full"
  },
  {
    question: "What is an Annotated Tag object in Git vs a Lightweight Tag?",
    shortAnswer: "An annotated tag is a full Git object in the database with a tagger name, date, message, and GPG signature; a lightweight tag is just a branch-like pointer.",
    explanation: "Lightweight tags are simple bookmarks created with `git tag v1.0.0`. Annotated tags are created with `git tag -a v1.0.0 -m 'Release v1.0.0'` and are stored as separate tag objects in `.git/objects`.",
    hint: "Full object with message/signature vs simple pointer.",
    level: "intermediate",
    codeExample: "# Create and inspect an annotated tag:\ngit tag -a v1.0.0 -m 'Official release'\ngit cat-file -p v1.0.0"
  },
  {
    question: "Why is Git's index (staging area) considered a masterpiece of simple performance design?",
    shortAnswer: "The `.git/index` is a binary cache containing file stat metadata (timestamps, file sizes, inode) that allows instantaneous `git status` checks.",
    explanation: "Instead of re-reading and re-hashing every file on disk during `git status`, Git compares file stat metadata (size, modification time) with the cached `.git/index`. If the timestamp and size match, Git knows in nanoseconds that the file has not changed.",
    hint: "Binary cache with file stat timestamps and inodes.",
    level: "advanced",
    codeExample: "# Inspect binary index entries:\ngit ls-files --stage"
  },
  {
    question: "What is the 'stat cache' optimization in Git?",
    shortAnswer: "An operating system optimization where Git uses `lstat()` system calls to verify if file modification timestamps have changed before reading file contents.",
    explanation: "This allows Git to check 500,000 files in a repository in under 200 milliseconds. If the OS `mtime` hasn't changed, Git skips reading the file from disk entirely.",
    hint: "Skipping file reads if OS modification time matches the index.",
    level: "advanced",
    codeExample: "# git status leverages the stat cache for sub-second responses."
  },
  {
    question: "How does Git ensure atomic commits across multiple files and folders?",
    shortAnswer: "A commit creates a new immutable root Tree object and Commit object; if any error occurs during write, the branch pointer is never moved.",
    explanation: "In Git, either the entire commit object is created and the branch pointer moves to it, or nothing changes. There is no partial state where 3 files commit and 2 fail.",
    hint: "All-or-nothing atomic state transitions.",
    level: "intermediate",
    codeExample: "# Commits are 100% atomic."
  },
  {
    question: "What is the difference between 'Snapshots' in Git vs 'Deltas' in SVN?",
    shortAnswer: "SVN stores base files and accumulates diffs; Git stores complete miniature filesystem snapshots with shared blob references.",
    explanation: "When you commit in Git, you are not recording 'line 4 changed from A to B'; you are saving a complete tree snapshot of the entire project at that exact second. Files that didn't change point to existing blobs.",
    hint: "Full filesystem snapshot vs list of deltas.",
    level: "basic",
    codeExample: "# Commit points directly to full tree snapshot:\ngit cat-file -p HEAD^{tree}"
  },
  {
    question: "Why is Git often described as a 'Content-Addressable Key-Value Store'?",
    shortAnswer: "Because you give Git content, it returns a 40-character key (the SHA hash), and you retrieve the exact content using that key.",
    explanation: "At its core, `.git/objects` is a key-value database. The key is the SHA-1/SHA-256 hash and the value is the compressed data payload prefixed with an object header.",
    hint: "Key = SHA hash, Value = Compressed object data.",
    level: "advanced",
    codeExample: "# Store content directly into key-value store:\necho 'Hello Barrackpore' | git hash-object -w --stdin"
  },
  {
    question: "What is the role of the 2-character subfolder partitioning in `.git/objects/`?",
    shortAnswer: "To prevent performance degradation on filesystems that slow down when thousands of files exist in a single directory.",
    explanation: "A SHA-1 hash is 40 characters long (e.g. `e83c5163316f...`). Git takes the first 2 characters (`e8`) as a directory name and uses the remaining 38 characters (`3c5163316f...`) as the filename. This splits objects into 256 balanced subfolders.",
    hint: "Splits objects across 256 subdirectories (00 to ff) for filesystem speed.",
    level: "advanced",
    codeExample: "# Inspect 2-char partitioned object folder:\nls -d .git/objects/??/"
  },
  {
    question: "How does Git maintain extreme speed during `git log` traversal?",
    shortAnswer: "By following parent pointers backward directly in memory without needing to open or read file contents.",
    explanation: "Because commit objects are small and point directly to their parent commit hashes, traversing 10,000 commits only requires reading a few megabytes of commit metadata, not loading source code files.",
    hint: "Commit objects only contain metadata and parent pointers.",
    level: "intermediate",
    codeExample: "# Fast graph traversal:\ngit log --oneline --graph"
  },
  {
    question: "What is garbage collection (`git gc`) in Git's storage model?",
    shortAnswer: "A maintenance process that packs loose object files into compressed `.pack` files and removes unreferenced orphan objects.",
    explanation: "Over time, creating temporary commits creates loose object files. `git gc` consolidates these loose files into packed binary archives (`.pack`) with index files (`.idx`), optimizing memory and disk speed.",
    hint: "Packing loose objects into compressed packfiles.",
    level: "intermediate",
    codeExample: "# Manually run Git garbage collection:\ngit gc --auto"
  },
  {
    question: "What is an 'unreachable' or 'orphan' object in Git?",
    shortAnswer: "An object that is no longer reachable by traversing backward from any branch pointer, tag, or reflog entry.",
    explanation: "If you delete a branch or amend a commit, the old commit still exists in `.git/objects` for a grace period (default 30–90 days). It is pruned when garbage collection runs.",
    hint: "Objects not pointed to by any branch or tag.",
    level: "advanced",
    codeExample: "# Find dangling objects:\ngit fsck --unreachable"
  },
  {
    question: "Why does Git never overwrite existing objects in place?",
    shortAnswer: "Because objects are immutable and named by content hash; changing content generates a brand-new object hash.",
    explanation: "Git's append-only design guarantees that past snapshots cannot be corrupted by new commits. Every write is an addition of a new object or moving a pointer.",
    hint: "Append-only immutable storage model.",
    level: "advanced",
    codeExample: "# History is append-only and immutable."
  },
  {
    question: "How does Git ensure cross-platform compatibility across Windows, macOS, and Linux?",
    shortAnswer: "Git normalizes line endings and file modes in its internal database while adapting to host OS conventions via configuration.",
    explanation: "Internally, Git always uses Unix LF (`\\n`) and standard POSIX file permissions. Configuration options like `core.autocrlf` and `core.fileMode` adapt the working tree to Windows or macOS without affecting repository objects.",
    hint: "Internal POSIX normalization + platform-specific working tree filters.",
    level: "intermediate",
    codeExample: "# Windows line ending configuration:\ngit config --global core.autocrlf true"
  },
  {
    question: "What is the difference between Git's working tree, index, and object database?",
    shortAnswer: "Working tree is your visible directory; index is the binary staging area for the next commit; object database (`.git/objects`) is the permanent history vault.",
    explanation: "This three-tree architecture is the cornerstone of Git. You edit in the working tree, stage atomic changes into the index, and commit to freeze the index into permanent objects in the repository.",
    hint: "Three-Tree Architecture (Working Tree -> Index -> Object DB).",
    level: "basic",
    codeExample: "# Move data across three states:\n# Edit file -> git add (Index) -> git commit (Object DB)"
  },
  {
    question: "What is the advantage of Git storing tree objects hierarchically?",
    shortAnswer: "It mirrors the exact directory structure of your project and allows reusing unmodified folder sub-trees across commits.",
    explanation: "If you edit one file in `/src/components/`, the root tree and the `components` tree update, but `/src/utils/`, `/public/`, and `/docs/` trees are reused without re-writing any bytes.",
    hint: "Hierarchical sub-tree reuse across commits.",
    level: "advanced",
    codeExample: "# Inspect recursive tree listing:\ngit ls-tree -r HEAD"
  },
  {
    question: "Why does Git's design make it impossible for two developers with identical commits to have different commit hashes?",
    shortAnswer: "Because the commit SHA calculation is a deterministic mathematical formula over the exact tree hash, parent hash, author, email, timestamp, and message.",
    explanation: "Given identical source code trees, identical parent hashes, identical author strings, and identical timestamps, SHA-1 will produce the exact same 40-character hex string on every computer on Earth.",
    hint: "Deterministic cryptographic hashing.",
    level: "advanced",
    codeExample: "# Deterministic SHA hashing guarantee."
  },
  {
    question: "What is the overarching design philosophy of Git summarized by Linus Torvalds?",
    shortAnswer: "'Trust no one, verify everything cryptographically, keep the core dead simple, and make it screamingly fast.'",
    explanation: "Git does not rely on complex central servers or magical hidden state. It is a simple, robust, mathematically verified content-addressable database designed to empower developers with unmatched speed and reliability.",
    hint: "Speed, Simplicity, Cryptographic verification.",
    level: "basic",
    codeExample: "# Git: Simple, Fast, Cryptographically Verified."
  }
];

export default questions;
