// src/components/study/python/topics/003_004_working-with-json/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Building JSON-backed persistent data stores

const questions = [
  {
    question: "Why is writing directly to a database file with 'with open(\"db.json\", \"w\") as f:' dangerous in production?",
    shortAnswer: "Opening a file in '\"w\"' mode immediately truncates the file to 0 bytes; if the process crashes, power is lost, or an exception occurs before 'json.dump()' completes, the entire database is permanently destroyed.",
    explanation: "The classic 0-byte file corruption hazard of non-atomic file writes.",
    hint: "Opening in 'w' mode instantly truncates the file to 0 bytes before writing completes.",
    level: "basic",
    codeExample: "# DANGEROUS: with open('db.json', 'w') as f: json.dump(data, f)"
  },
  {
    question: "How does the 'Atomic Write & Swap' pattern using 'os.replace()' guarantee ACID atomicity?",
    shortAnswer: "Data is written and synced to a temporary file first; 'os.replace(temp_path, target_path)' then performs an atomic filesystem inode/directory entry swap that either succeeds completely or leaves the original file unmodified.",
    explanation: "Guarantees the target file is never left in an incomplete or corrupted state.",
    hint: "Write to temp file, sync to disk, then atomically swap with os.replace().",
    level: "basic",
    codeExample: "os.replace(temp_path, target_path) # Atomic filesystem rename"
  },
  {
    question: "Why must 'os.fsync(f.fileno())' be invoked before calling 'os.replace()'?",
    shortAnswer: "'f.flush()' only clears Python's user-space buffers into OS kernel memory; 'os.fsync()' forces the operating system kernel to physically flush dirty buffers to hardware disk/SSD platters before renaming.",
    explanation: "Prevents data loss during sudden power outages or OS kernel panics.",
    hint: "Forces OS kernel buffers to commit data to physical hardware storage.",
    level: "moderate",
    codeExample: "f.flush()\nos.fsync(f.fileno())\nos.replace(tmp, dest)"
  },
  {
    question: "Why MUST the temporary file be created in the SAME directory/filesystem as the target file?",
    shortAnswer: "Atomic file renaming ('os.replace') is only atomic when both files reside on the same filesystem/mount point; cross-device renames fallback to slow, non-atomic copy-and-delete operations.",
    explanation: "A critical operating system filesystem invariant.",
    hint: "Cross-device renames are non-atomic; keep temp file in the same directory.",
    level: "moderate",
    codeExample: "tempfile.mkstemp(dir=os.path.dirname(target_path))"
  },
  {
    question: "How do you achieve thread-safe reads and writes in a Python JSON document database?",
    shortAnswer: "By wrapping all document mutations (insert, update, delete) and read operations inside a reentrant lock: 'with self._lock:' ('threading.RLock').",
    explanation: "Prevents race conditions, torn reads, and concurrent dictionary mutations.",
    hint: "Use threading.RLock() context managers around all read/write operations.",
    level: "basic",
    codeExample: "with self._lock:\n    self._store[doc_id] = doc\n    self._flush_atomic()"
  },
  {
    question: "What is Newline-Delimited JSON (NDJSON / JSON Lines) and why is it ideal for Write-Ahead Logs (WAL)?",
    shortAnswer: "NDJSON stores each JSON record on a single separate line separated by '\\n'; this allows appending new transactions in O(1) time ('f.write(json.dumps(tx) + \"\\n\")') without rewriting the entire file.",
    explanation: "High-throughput append-only transaction logging.",
    hint: "Each record is a single line; enables fast O(1) appends without full-file rewrites.",
    level: "basic",
    codeExample: '{"action": "INSERT", "id": "STU-101"}\n{"action": "UPDATE", "id": "STU-101"}'
  },
  {
    question: "What is 'Snapshot Compaction' in a WAL-backed JSON database?",
    shortAnswer: "The process of replaying all delta transactions in the WAL to construct the latest canonical state, saving that state to a snapshot file, and truncating the WAL log back to 0 bytes.",
    explanation: "Prevents unbounded WAL growth and accelerates database startup replay times.",
    hint: "Collapses delta transactions into a canonical snapshot and resets the log.",
    level: "moderate",
    codeExample: "engine.compact_and_checkpoint() # Merges WAL into snapshot"
  },
  {
    question: "How do you implement secondary indexing in an in-memory JSON document database?",
    shortAnswer: "By maintaining auxiliary dictionaries mapping attribute values to sets of primary keys (e.g. 'self._index_by_course: Dict[str, Set[str]]'), enabling O(1) attribute lookups.",
    explanation: "Avoids O(N) full collection scans for frequent queries.",
    hint: "Maintain mapping dicts from secondary keys to sets of primary document IDs.",
    level: "moderate",
    codeExample: "self._index_course.setdefault(course_code, set()).add(doc_id)"
  },
  {
    question: "What is 'TinyDB' in the Python ecosystem?",
    shortAnswer: "A popular, lightweight, pure-Python document-oriented database that persists data in human-readable JSON files with an expressive query syntax.",
    explanation: "Industry-standard embedded JSON database package.",
    hint: "Lightweight pure-Python embedded document database using JSON files.",
    level: "basic",
    codeExample: "from tinydb import TinyDB, Query\ndb = TinyDB('db.json')"
  },
  {
    question: "How do you implement automated timestamped backup rotation for a JSON database?",
    shortAnswer: "By copying the live database file to a 'backups/backup_YYYYMMDD_HHMMSS.json' file periodically and pruning backups older than a retention threshold (e.g. keep latest 10 backups).",
    explanation: "Protects against accidental mass deletions or operator error.",
    hint: "Create timestamped copies and prune backups older than retention limit.",
    level: "moderate",
    codeExample: "shutil.copy2(db_path, f'backups/backup_{time.strftime(\"%Y%m%d_%H%M%S\")}.json')"
  },
  {
    question: "How do you recover a JSON database when the primary file is corrupted due to an abnormal crash?",
    shortAnswer: "Catch 'json.JSONDecodeError' on startup, inspect the backup directory, load the most recent valid backup snapshot, re-index the data, and atomically overwrite the corrupted primary file.",
    explanation: "Automatic self-healing disaster recovery architecture.",
    hint: "Catch JSONDecodeError and restore from the latest valid backup snapshot.",
    level: "moderate",
    codeExample: "except JSONDecodeError:\n    self._restore_latest_backup()"
  },
  {
    question: "What is the memory limitation of storing an entire JSON database in RAM?",
    shortAnswer: "The entire working dataset must fit into available system RAM; for datasets exceeding several gigabytes, disk-page based databases (like SQLite / PostgreSQL) must be used.",
    explanation: "JSON document stores are optimized for small to medium embedded datasets (< 500 MB).",
    hint: "Dataset must fit in RAM; use SQLite/Postgres for multi-gigabyte datasets.",
    level: "basic",
    codeExample: "# Best suited for datasets < 500 MB"
  },
  {
    question: "How do you implement soft deletes in a JSON document store?",
    shortAnswer: "By setting a metadata flag '\"is_deleted\": True' and '\"deleted_at\": timestamp' instead of immediately purging the record, allowing recovery and audit tracing.",
    explanation: "Enterprise auditing standard for record management.",
    hint: "Mark record with is_deleted: True instead of removing from dictionary.",
    level: "basic",
    codeExample: "doc['is_deleted'] = True; doc['deleted_at'] = time.time()"
  },
  {
    question: "How does 'portalocker' or 'filelock' prevent multi-process write conflicts on JSON database files?",
    shortAnswer: "They acquire exclusive operating system file-level locks ('fcntl.flock' on Unix, 'msvcrt.locking' on Windows) so only one OS process can write to the JSON file at any given time.",
    explanation: "Inter-process concurrency control.",
    hint: "Acquires OS file locks (fcntl/msvcrt) across separate OS processes.",
    level: "complex",
    codeExample: "from filelock import FileLock\nwith FileLock('db.json.lock'): ..."
  },
  {
    question: "What happens if two processes attempt to write to the same JSON file simultaneously without locks?",
    shortAnswer: "Write interleaving occurs; one process's writes overwrite part of the other's, corrupting the JSON formatting and causing unrecoverable syntax errors.",
    explanation: "The fundamental race condition in file-based storage.",
    hint: "Causes write interleaving and corrupted unparseable JSON files.",
    level: "basic",
    codeExample: "# Concurrent writes without locks corrupt file bytes"
  },
  {
    question: "How do you perform pagination over an in-memory JSON document database?",
    shortAnswer: "By sorting the collection keys or documents and slicing: 'items[offset : offset + limit]'.",
    explanation: "Standard pagination slicing over memory collections.",
    hint: "Slice list of documents: items[offset : offset + page_size].",
    level: "basic",
    codeExample: "page = list(self._store.values())[(page - 1) * size : page * size]"
  },
  {
    question: "How do you implement schema migrations for JSON document stores?",
    shortAnswer: "Store a '\"_schema_version\": 2' metadata integer at the root; on startup, run migration functions incrementally (v1 -> v2 -> v3) to transform legacy records before serving queries.",
    explanation: "Ensures backwards compatibility as data models evolve.",
    hint: "Track _schema_version and execute sequential migration functions on startup.",
    level: "complex",
    codeExample: "if doc.get('_version', 1) == 1: doc = migrate_v1_to_v2(doc)"
  },
  {
    question: "Why is formatting JSON with 'indent=2' useful in development but discouraged for multi-gigabyte logs?",
    shortAnswer: "Indentation adds significant whitespace overhead (often increasing file size by 30%-50%); compact JSON ('separators=(',', ':')') saves disk space and I/O bandwidth in production.",
    explanation: "Tradeoff between human readability and storage efficiency.",
    hint: "Indentation increases file size by 30-50%; use compact JSON in production.",
    level: "basic",
    codeExample: "json.dump(data, f, separators=(',', ':')) # Compact storage"
  },
  {
    question: "How do you enforce Primary Key uniqueness in a JSON document store?",
    shortAnswer: "By keying the in-memory store by the primary identifier ('self._store[primary_id] = doc') and checking 'if primary_id in self._store:' before allowing insertions.",
    explanation: "Guarantees O(1) duplicate key detection.",
    hint: "Use the primary ID as the top-level dictionary key and check existence on insert.",
    level: "basic",
    codeExample: "if doc_id in self._store: raise ValueError('Duplicate Key')"
  },
  {
    question: "How do you execute atomic batch transactions (multiple inserts/updates) in a JSON store?",
    shortAnswer: "Perform all mutations on an in-memory working copy inside a lock, and execute a single atomic write swap to disk only after all items succeed (rolling back memory if any step fails).",
    explanation: "All-or-nothing transactional consistency.",
    hint: "Mutate in memory inside a lock and commit with a single atomic disk flush.",
    level: "moderate",
    codeExample: "with self._lock:\n    # Mutate all items\n    self._flush_atomic()"
  },
  {
    question: "How do you compress archived JSON backups to save disk space?",
    shortAnswer: "Using the built-in 'gzip' module: 'with gzip.open(\"backup.json.gz\", \"wt\") as f: json.dump(data, f)' (typically achieves 80%-90% compression ratio on JSON).",
    explanation: "Massive storage savings for JSON text archives.",
    hint: "Use gzip.open() to compress JSON text by 80-90%.",
    level: "basic",
    codeExample: "import gzip\nwith gzip.open('db.json.gz', 'wt') as f: json.dump(data, f)"
  },
  {
    question: "When should you graduate from a JSON document database to SQLite or PostgreSQL?",
    shortAnswer: "When dataset size exceeds available RAM, when complex SQL multi-table joins are required, when high concurrent write throughput is demanded, or when strict ACID transactional guarantees across distributed processes are needed.",
    explanation: "Clear architectural boundary for relational databases.",
    hint: "When data exceeds RAM, needs multi-table joins, or demands high write concurrency.",
    level: "moderate",
    codeExample: "# Graduate to SQLite / PostgreSQL for heavy relational workloads"
  },
  {
    question: "How do you implement full-text search across JSON document fields in pure Python?",
    shortAnswer: "By building an inverted index dictionary mapping tokenized, lowercased words to sets of document IDs ('self._inverted_index[word].add(doc_id)').",
    explanation: "Fast in-memory keyword search engine.",
    hint: "Maintain an inverted index mapping words to sets of matching document IDs.",
    level: "complex",
    codeExample: "for word in doc['name'].lower().split(): self._index[word].add(doc_id)"
  },
  {
    question: "How do you benchmark JSON database read and write IOPS (operations per second)?",
    shortAnswer: "Using 'timeit' or 'cProfile' to benchmark 10,000 in-memory index queries vs 1,000 atomic disk flushes.",
    explanation: "Validates database throughput metrics.",
    hint: "Benchmark using timeit or cProfile measuring operations per second.",
    level: "moderate",
    codeExample: "timeit.timeit(lambda: db.find_by_course('PY-AI'), number=10000)"
  },
  {
    question: "What is the ultimate golden rule for Building JSON-Backed Persistent Data Stores in Python?",
    shortAnswer: "Always write atomically via temporary files and 'os.replace' with 'os.fsync', protect memory with 'threading.RLock', maintain secondary hash indices for O(1) queries, append transactions with NDJSON WAL, and automate timestamped backup rotations with disaster recovery.",
    explanation: "The complete enterprise blueprint for building reliable, production-grade JSON document databases.",
    hint: "Atomic os.replace writes, fsync, RLock concurrency, secondary indexing, and NDJSON WAL.",
    level: "basic",
    codeExample: "# Python JSON Persistent Data Store Mastery"
  }
];

export default questions;
