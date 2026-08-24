// src/components/study/python/topics/004_001_filesystem-os/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Building automated system maintenance scripts

const questions = [
  {
    question: "What is the primary goal of automated system maintenance scripts in production Python environments?",
    shortAnswer: "To autonomously monitor host health, rotate and compress growing log files, purge stale temporary files/caches, evaluate disk capacity thresholds, and ensure continuous system stability without manual intervention.",
    explanation: "Autonomous system maintenance principles.",
    hint: "Autonomously manages log growth, temp file cleanup, and disk health monitoring.",
    level: "basic",
    codeExample: "# Automated Python Maintenance Engineering"
  },
  {
    question: "What is the difference between size-based and age-based log rotation?",
    shortAnswer: "Size-based rotation triggers when a log file exceeds a maximum byte threshold (e.g. 50 MB); age-based rotation triggers at fixed time intervals (e.g. daily, or purging archives older than 30 days).",
    explanation: "Log rotation trigger strategies.",
    hint: "Size-based rotates upon exceeding bytes; age-based rotates at time intervals.",
    level: "basic",
    codeExample: "if size > 50*1024*1024: rotate_log() # Size-based"
  },
  {
    question: "How do you compress a log file directly into a '.gz' archive using Python's standard library?",
    shortAnswer: "Using the built-in 'gzip' and 'shutil' modules: 'with open(\"app.log\", \"rb\") as f_in, gzip.open(\"app.log.gz\", \"wb\") as f_out: shutil.copyfileobj(f_in, f_out)'.",
    explanation: "Streaming gzip compression.",
    hint: "Use gzip.open and shutil.copyfileobj to stream compressed bytes.",
    level: "basic",
    codeExample: "with open('a.log', 'rb') as fi, gzip.open('a.log.gz', 'wb') as fo: shutil.copyfileobj(fi, fo)"
  },
  {
    question: "Why should you truncate an active log with 'open(path, \"w\")' instead of deleting it with 'os.remove()'?",
    shortAnswer: "On Unix systems, running server daemons keep open file descriptors; deleting the file unlinks its name but the process continues writing to the deleted inode in RAM, causing disk space to remain un-reclaimed until the daemon restarts.",
    explanation: "Open file descriptor inode semantics on Unix.",
    hint: "Truncating preserves the open file descriptor held by active server processes.",
    level: "complex",
    codeExample: "# GOOD: Truncate active log\nwith open(log_path, 'w') as f: f.write('[ROTATED]\\n')"
  },
  {
    question: "Why is a '--dry-run' mode essential in automated cleanup and maintenance scripts?",
    shortAnswer: "It allows system administrators to simulate and review which files and directories WOULD be deleted without making any destructive modifications on the real filesystem.",
    explanation: "Safe simulation and risk mitigation.",
    hint: "Simulates deletions and shows what would be purged without actually modifying disk.",
    level: "basic",
    codeExample: "if not args.dry_run: os.remove(file_path)"
  },
  {
    question: "Why should temporary file sweepers use 'topdown=False' during 'os.walk()'?",
    shortAnswer: "Because child files and subdirectories must be removed before an empty parent cache folder (like '__pycache__') can be removed with 'os.rmdir()' or cleaned up safely.",
    explanation: "Bottom-up filesystem traversal safety.",
    hint: "Ensures leaf files are deleted before parent folders are removed.",
    level: "moderate",
    codeExample: "for root, dirs, files in os.walk(path, topdown=False): ..."
  },
  {
    question: "How do you calculate if a file is older than 7 days using 'os.stat()'?",
    shortAnswer: "Compare 'file_stat.st_mtime' against '(time.time() - (7 * 86400))': 'if file_stat.st_mtime < (time.time() - 7 * 86400): purge()'.",
    explanation: "Timestamp delta comparison.",
    hint: "Check if st_mtime is less than time.time() minus 7*86400 seconds.",
    level: "basic",
    codeExample: "is_old = os.stat(p).st_mtime < (time.time() - 7 * 86400)"
  },
  {
    question: "How do you calculate the percentage of used disk space using 'shutil.disk_usage()'?",
    shortAnswer: "'usage = shutil.disk_usage(\"/\"); used_pct = (usage.used / usage.total) * 100'.",
    explanation: "Disk usage percentage formula.",
    hint: "(usage.used / usage.total) * 100.",
    level: "basic",
    codeExample: "u = shutil.disk_usage('.'); pct = (u.used / u.total) * 100"
  },
  {
    question: "What standard temporary file patterns should an automated maintenance script clean?",
    shortAnswer: "Temporary buffers ('*.tmp'), editor lock/swap files ('*.swp', '~*'), backup artifacts ('*.bak'), and Python compiled bytecode files ('*.pyc', '*.pyo', '__pycache__').",
    explanation: "Common junk file classification.",
    hint: "*.tmp, *.bak, *.pyc, *.swp, and __pycache__ directories.",
    level: "basic",
    codeExample: "JUNK_PATTERNS = ['*.tmp', '*.bak', '*.pyc', '*.swp', '~*']"
  },
  {
    question: "How do you schedule a Python maintenance script on Linux systems?",
    shortAnswer: "By adding a cron entry via 'crontab -e', for example: '0 2 * * * /usr/bin/python3 /opt/accotax/maintenance.py >> /var/log/maint.log 2>&1' (runs nightly at 2:00 AM).",
    explanation: "Linux cron job automation.",
    hint: "Use crontab -e to set scheduled execution intervals.",
    level: "basic",
    codeExample: "# crontab: 0 2 * * * /usr/bin/python3 /path/maintenance.py"
  },
  {
    question: "How do you schedule a Python maintenance script on Windows systems?",
    shortAnswer: "Using the Windows Task Scheduler ('schtasks' command or GUI), creating a task that runs 'python.exe C:\\path\\maintenance.py' on a scheduled trigger.",
    explanation: "Windows task scheduler automation.",
    hint: "Use Windows Task Scheduler (schtasks.exe).",
    level: "basic",
    codeExample: "# schtasks /create /tn \"AccoTaxMaint\" /tr \"python.exe maint.py\" /sc daily /st 02:00"
  },
  {
    question: "How do you ensure that multiple instances of a maintenance script do not run concurrently?",
    shortAnswer: "By acquiring a file lock on a dedicated lockfile (e.g. using 'fcntl.flock' on Unix, or creating an exclusive lockfile with 'os.open(path, os.O_CREAT | os.O_EXCL)').",
    explanation: "Singleton process locking invariant.",
    hint: "Use an exclusive lockfile to prevent concurrent execution.",
    level: "moderate",
    codeExample: "lock_fd = os.open('maint.lock', os.O_CREAT | os.O_EXCL | os.O_RDWR)"
  },
  {
    question: "Why should maintenance scripts emit structured JSON logs alongside human-readable logs?",
    shortAnswer: "Structured JSON logs allow automated log collectors (Elasticsearch, CloudWatch, Datadog) to parse metrics (bytes reclaimed, rotation counts, execution latency) programmatically.",
    explanation: "Structured observability in DevOps.",
    hint: "Enables programmatic parsing by cloud monitoring and alerting platforms.",
    level: "basic",
    codeExample: "print(json.dumps({'event': 'MAINT_COMPLETE', 'bytes_reclaimed': 1048576}))"
  },
  {
    question: "What should a maintenance script do if a PermissionError occurs on a single file during sweeping?",
    shortAnswer: "Log a warning with the file path and continue sweeping remaining files rather than crashing the entire maintenance cycle.",
    explanation: "Resilient fault tolerance in batch operations.",
    hint: "Log the warning and continue processing remaining items.",
    level: "basic",
    codeExample: "try: os.remove(p)\nexcept PermissionError as e: logger.warning('Skipped %s: %s', p, e)"
  },
  {
    question: "How do you measure the exact execution duration of a maintenance script pass?",
    shortAnswer: "Using 'start_time = time.perf_counter()' at the start and calculating 'elapsed_ms = (time.perf_counter() - start_time) * 1000' at completion.",
    explanation: "High-resolution benchmarking.",
    hint: "Use time.perf_counter() to compute elapsed milliseconds.",
    level: "basic",
    codeExample: "t0 = time.perf_counter(); ...; ms = (time.perf_counter() - t0) * 1000"
  },
  {
    question: "What is the role of 'os.utime(path, times)' in testing age-based maintenance scripts?",
    shortAnswer: "It allows manually setting the access and modification timestamps ('st_atime', 'st_mtime') of a test file to a historical date (e.g. 30 days ago) to verify purge logic.",
    explanation: "Filesystem timestamp mocking.",
    hint: "Sets access and modification timestamps to simulate old files in tests.",
    level: "moderate",
    codeExample: "past = time.time() - 30 * 86400; os.utime('old.log', (past, past))"
  },
  {
    question: "How do you configure warning and critical alert thresholds in a storage health monitor?",
    shortAnswer: "Define warning at e.g. 80% usage and critical at 90% usage; trigger automated cleanup at warning, and page on-call engineers via webhook/email at critical.",
    explanation: "Tiered alert threshold architecture.",
    hint: "Set warning at 80% and critical at 90% to trigger progressive recovery actions.",
    level: "basic",
    codeExample: "if used_pct >= 90: alert_critical() elif used_pct >= 80: trigger_cleanup()"
  },
  {
    question: "Why should log compression be performed in streaming chunks using 'shutil.copyfileobj()'?",
    shortAnswer: "Streaming in fixed buffer chunks (e.g. 64KB) prevents reading entire multi-gigabyte log files into RAM at once, keeping the maintenance script's memory footprint under 20MB.",
    explanation: "Constant-memory streaming I/O.",
    hint: "Avoids loading large multi-gigabyte log files into memory at once.",
    level: "moderate",
    codeExample: "shutil.copyfileobj(f_in, f_out, length=64*1024)"
  },
  {
    question: "How do you automatically clean empty directories after purging their contents?",
    shortAnswer: "Traverse bottom-up ('topdown=False') with 'os.walk()'; if 'len(os.listdir(root)) == 0', remove the directory with 'os.rmdir(root)'.",
    explanation: "Empty directory pruning.",
    hint: "Check if directory is empty after child deletion and call os.rmdir().",
    level: "basic",
    codeExample: "if not os.listdir(dir_path): os.rmdir(dir_path)"
  },
  {
    question: "What is 'RotatingFileHandler' in Python's standard 'logging.handlers' module?",
    shortAnswer: "A built-in logging handler that automatically rotates log files when they reach a specified 'maxBytes' size and maintains a fixed 'backupCount' of historical log files.",
    explanation: "Standard logging framework log rotator.",
    hint: "Standard library logging handler for automatic size-based log rotation.",
    level: "moderate",
    codeExample: "from logging.handlers import RotatingFileHandler\nh = RotatingFileHandler('app.log', maxBytes=10*1024*1024, backupCount=5)"
  },
  {
    question: "What is 'TimedRotatingFileHandler' in Python's standard 'logging.handlers' module?",
    shortAnswer: "A built-in logging handler that rotates log files at scheduled time intervals (such as midnight every day 'when=\"midnight\"' or every hour 'when=\"H\"').",
    explanation: "Standard logging framework timed rotator.",
    hint: "Standard library logging handler for automatic time-interval log rotation.",
    level: "moderate",
    codeExample: "from logging.handlers import TimedRotatingFileHandler\nh = TimedRotatingFileHandler('app.log', when='midnight', backupCount=30)"
  },
  {
    question: "How do you ensure maintenance audit records cannot be overwritten?",
    shortAnswer: "Open audit log files in append mode ('open(path, \"a\")') and restrict permissions to append-only for the application service account.",
    explanation: "Immutable audit trail integrity.",
    hint: "Open in append mode ('a') and enforce strict OS write permissions.",
    level: "basic",
    codeExample: "with open('maintenance_audit.log', 'a') as f: f.write(entry)"
  },
  {
    question: "How do you calculate total disk bytes reclaimed across all purged files?",
    shortAnswer: "Sum 'os.stat(p).st_size' for every file successfully removed during the maintenance pass.",
    explanation: "Storage reclamation metric aggregation.",
    hint: "Sum the sizes of all files deleted during the sweep.",
    level: "basic",
    codeExample: "reclaimed += os.path.getsize(f); os.remove(f)"
  },
  {
    question: "What exit code should a maintenance script return if a critical disk warning is detected?",
    shortAnswer: "Return non-zero (e.g. exit code 2) to signal monitoring systems and CI/CD pipelines that the server requires immediate attention.",
    explanation: "Process exit code signalling for monitoring.",
    hint: "Return a non-zero exit code to alert monitoring tools.",
    level: "basic",
    codeExample: "sys.exit(2 if is_critical else 0)"
  },
  {
    question: "What is the ultimate golden rule for writing system maintenance scripts in Python?",
    shortAnswer: "Always support '--dry-run' simulation, truncate active logs instead of unlinking, stream gzip compression in constant memory, traverse bottom-up for safe cache cleanup, and emit structured audit telemetry.",
    explanation: "The complete enterprise guideline for automated maintenance scripts.",
    hint: "Support dry-run, truncate active logs, stream gzip compression, and emit structured audit metrics.",
    level: "basic",
    codeExample: "# Python Automated Maintenance Mastery"
  }
];

export default questions;
