// src/components/study/python/topics/004_004_capstone-projects/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Configuring logging, error handling, and modular CLI / GUI interfaces

const questions = [
  {
    question: "Why is Python's standard 'logging' module preferred over 'print()' statements in production applications?",
    shortAnswer: "The 'logging' module provides severity levels (DEBUG to CRITICAL), structured formatting with timestamps and module names, destination routing (console, rotating files, remote syslog), and dynamic log level filtering without modifying code.",
    explanation: "Production logging advantages over amateur print debugging.",
    hint: "Provides severity levels, timestamps, rotating files, and dynamic filtering.",
    level: "basic",
    codeExample: "import logging\nlogger = logging.getLogger(__name__)\nlogger.info('Student enrolled successfully')"
  },
  {
    question: "What are the 5 standard logging levels in Python and their numerical hierarchy?",
    shortAnswer: "1. DEBUG (10), 2. INFO (20), 3. WARNING (30), 4. ERROR (40), and 5. CRITICAL (50). Setting a logger to INFO automatically suppresses DEBUG messages.",
    explanation: "The 5 standard Python logging severity levels.",
    hint: "DEBUG (10), INFO (20), WARNING (30), ERROR (40), CRITICAL (50).",
    level: "basic",
    codeExample: "logging.basicConfig(level=logging.INFO) # DEBUG ignored"
  },
  {
    question: "What is a 'RotatingFileHandler' and why is it essential for long-running servers?",
    shortAnswer: "A 'RotatingFileHandler' automatically rolls over log files when they reach a maximum byte threshold (e.g. 5MB), keeping a fixed number of historical backup files (e.g. 'app.log.1', 'app.log.2') to prevent application logs from consuming all server disk space.",
    explanation: "Disk space exhaustion defense via rotating log handlers.",
    hint: "Rotates log files when they reach maxBytes to prevent disk space exhaustion.",
    level: "basic",
    codeExample: "from logging.handlers import RotatingFileHandler\nhandler = RotatingFileHandler('app.log', maxBytes=5_000_000, backupCount=5)"
  },
  {
    question: "Why should you create a domain-specific custom Exception hierarchy in enterprise Python applications?",
    shortAnswer: "A domain exception hierarchy (e.g. inheriting from 'class InstitutionalError(Exception)') allows calling code to catch specific business errors (like 'StudentNotFoundError' or 'InsufficientFundsError') while providing structured error codes and user-friendly messages.",
    explanation: "Domain exception design and structured error categorization.",
    hint: "Inheriting from a base domain exception allows clean, categorized error handling.",
    level: "moderate",
    codeExample: "class InstitutionalError(Exception): pass\nclass StudentNotFoundError(InstitutionalError): pass"
  },
  {
    question: "How do you capture full exception tracebacks in logs when an unexpected error occurs?",
    shortAnswer: "Use 'logger.exception(\"Error message\")' or pass 'exc_info=True' to 'logger.error()', which automatically appends the complete Python exception traceback to the log entry.",
    explanation: "Traceback logging via logger.exception and exc_info.",
    hint: "Use logger.exception('message') inside an except block to log full tracebacks.",
    level: "basic",
    codeExample: "try:\n    enroll()\nexcept Exception:\n    logger.exception('Failed to enroll student')"
  },
  {
    question: "What is 'argparse.ArgumentParser' and how do sub-commands work (e.g. 'git commit', 'campus-cli enroll')?",
    shortAnswer: "'argparse.ArgumentParser' is Python's standard library tool for parsing CLI arguments; using 'parser.add_subparsers()' allows dividing a CLI tool into distinct operational sub-commands, each with its own arguments, flags, and handler functions.",
    explanation: "Sub-command CLI architectures in standard Python.",
    hint: "add_subparsers() creates modular subcommands like enroll, pay, and report.",
    level: "moderate",
    codeExample: "subparsers = parser.add_subparsers(dest='command')\nenroll_p = subparsers.add_parser('enroll')"
  },
  {
    question: "What are POSIX standard exit codes and why should Python CLI scripts return them (sys.exit(0) vs sys.exit(1))?",
    shortAnswer: "Exit code 0 signals success, while non-zero exit codes (1-255) signal specific errors; this allows shell scripts, CI/CD pipelines, and orchestrators (Docker, Kubernetes) to reliably detect script success or failure.",
    explanation: "Process exit code standards in operating systems.",
    hint: "sys.exit(0) for success; sys.exit(1) for error, enabling CI/CD status checks.",
    level: "basic",
    codeExample: "import sys\nsys.exit(0) # Success | sys.exit(1) # Error"
  },
  {
    question: "Why should you name module loggers using 'logging.getLogger(__name__)'?",
    shortAnswer: "Using '__name__' automatically creates a hierarchical logger named after the module's dot-separated package path (e.g. 'institutional_manager.services.admission'), allowing granular log filtering per package.",
    explanation: "Hierarchical logger naming convention.",
    hint: "Automatically names the logger after the current module path for hierarchical filtering.",
    level: "basic",
    codeExample: "logger = logging.getLogger(__name__)"
  },
  {
    question: "What is the danger of a 'bare except:' or 'except Exception: pass' block in production code?",
    shortAnswer: "Swallowing exceptions silently hides critical bugs, memory errors, or system exit signals (KeyboardInterrupt/SystemExit), making the application fail unpredictably without any trace in the logs.",
    explanation: "Exception swallowing and silent failure hazards.",
    hint: "Hides critical defects and makes debugging impossible; always log or handle exceptions.",
    level: "basic",
    codeExample: "# ANTI-PATTERN: try: ... except: pass\n# BEST PRACTICE: except InstitutionalError as e: logger.error(e)"
  },
  {
    question: "What is 'Exception Chaining' ('raise NewError() from orig_error') in Python 3?",
    shortAnswer: "Exception chaining explicitly links a high-level domain error to the underlying lower-level cause (e.g. wrapping an sqlite3.OperationalError into a DatabaseConnectionError), preserving the original traceback for debugging.",
    explanation: "Explicit exception chaining with the 'from' keyword.",
    hint: "Use 'raise CustomError() from original_error' to preserve the underlying traceback.",
    level: "moderate",
    codeExample: "except sqlite3.Error as e:\n    raise StorageError('Database failed') from e"
  },
  {
    question: "How can you format log records as structured JSON in modern cloud-native architectures?",
    shortAnswer: "By implementing a custom 'logging.Formatter' that converts the 'LogRecord' into a dictionary (timestamp, level, message, module, process) and serializes it with 'json.dumps()', enabling automated parsing by tools like Datadog, ELK, or CloudWatch.",
    explanation: "Structured JSON logging for centralized cloud observability.",
    hint: "Subclass logging.Formatter to output json.dumps(record_dict) for log aggregators.",
    level: "complex",
    codeExample: "class JSONFormatter(logging.Formatter):\n    def format(self, record): return json.dumps({'msg': record.getMessage()})"
  },
  {
    question: "What is the difference between 'logging.basicConfig()' and configuring custom handlers?",
    shortAnswer: "'basicConfig()' is a quick one-line setup for the root logger; production applications should explicitly instantiate loggers, formatters, and handlers (e.g. StreamHandler, RotatingFileHandler) or use 'logging.config.dictConfig()'.",
    explanation: "Basic vs production logger configuration.",
    hint: "basicConfig is a simple root setup; production apps use dictConfig or custom handlers.",
    level: "moderate",
    codeExample: "logging.config.dictConfig(logging_config_dictionary)"
  },
  {
    question: "How do you create optional flags vs positional arguments in 'argparse'?",
    shortAnswer: "Arguments prefixed with '--' (e.g. '--campus', '-c') are optional flags (with defaults), while arguments without '--' (e.g. 'student_id') are required positional arguments.",
    explanation: "Positional vs optional flag arguments in argparse.",
    hint: "Prefix with '--' for optional flags; omit '--' for required positional arguments.",
    level: "basic",
    codeExample: "parser.add_argument('sid') # Positional\nparser.add_argument('--campus', default='BP') # Flag"
  },
  {
    question: "What is the role of a 'Global Exception Boundary' in a CLI or desktop application?",
    shortAnswer: "A top-level try/except block (or 'sys.excepthook') at the application entrypoint that catches unhandled exceptions, logs the full diagnostic traceback, and displays a polite, human-readable error message to the user before cleanly exiting.",
    explanation: "Top-level crash recovery and graceful error presentation.",
    hint: "Catches any unhandled error at the top level, logs it, and shows a clean message.",
    level: "moderate",
    codeExample: "def main():\n    try: run_app()\n    except Exception as e: logger.critical(e); sys.exit(1)"
  },
  {
    question: "Why should sensitive data (passwords, payment tokens) never be printed or logged?",
    shortAnswer: "Logging sensitive credentials stores plain-text secrets in log files, exposing them to log aggregators, developers, and unauthorized users, violating compliance standards (PCI-DSS, GDPR).",
    explanation: "Log sanitization and security hygiene.",
    hint: "Logging passwords leaks plain-text secrets; always sanitize or redact sensitive data.",
    level: "basic",
    codeExample: "# Sanitize: logger.info('Card charged: ****-****-****-%s', card[-4:])"
  },
  {
    question: "What is the difference between 'logger.info()' and 'logger.debug()' in terms of production volume?",
    shortAnswer: "'INFO' logs high-level milestone events (e.g. service started, payment processed) and runs continuously in production; 'DEBUG' logs high-volume granular details (e.g. loop iterations, raw payloads) and is enabled only during troubleshooting.",
    explanation: "Log volume management and production performance.",
    hint: "INFO logs major events; DEBUG logs high-volume details for troubleshooting.",
    level: "basic",
    codeExample: "# INFO for milestones, DEBUG for deep troubleshooting"
  },
  {
    question: "How do you add color and formatted tables to Python CLI applications?",
    shortAnswer: "Using standard ANSI escape codes or modern libraries like 'rich' (e.g. 'rich.table.Table', 'rich.console.Console') to render beautiful colored tables, progress bars, and panels.",
    explanation: "Modern terminal user interface formatting.",
    hint: "Use the 'rich' library or ANSI escape codes to render styled tables and panels.",
    level: "basic",
    codeExample: "from rich.console import Console\nconsole = Console()\nconsole.print('[green]Success![/green]')"
  },
  {
    question: "How do you prompt users for interactive confirmation before dangerous operations in a CLI (e.g. deleting student records)?",
    shortAnswer: "Use 'input(\"Are you sure? (y/N): \").strip().lower() in ('y', 'yes')' or rich/click confirmation prompts before executing irreversible mutations.",
    explanation: "Defensive CLI confirmation patterns.",
    hint: "Use input() prompt or Click confirmation prompt before irreversible actions.",
    level: "basic",
    codeExample: "if input('Delete student? (y/N): ').lower() == 'y': repo.delete(sid)"
  },
  {
    question: "What is an 'Audit Log' and how does it differ from standard application logs?",
    shortAnswer: "An audit log is an immutable, append-only record of security-critical business actions (who performed what action, on which student ID, at what timestamp, from what IP/terminal), retained for legal and compliance auditing.",
    explanation: "Audit trail logging vs operational error logging.",
    hint: "Immutable log of security-critical business events for compliance and tracking.",
    level: "moderate",
    codeExample: "audit_logger.info('USER: admin | ACTION: FEE_OVERRIDE | TARGET: STU_BP_01 | AMT: 5000')"
  },
  {
    question: "What is the ultimate golden rule of logging, error handling, and CLI design?",
    shortAnswer: "Never use 'print()' for system diagnostics, use hierarchical loggers with rotating handlers, structure custom exception hierarchies with status codes, catch errors at top-level boundaries, and return standard POSIX exit codes.",
    explanation: "The complete enterprise Python CLI and observability standard.",
    hint: "Rotating loggers + custom exceptions + top-level boundaries + POSIX exit codes.",
    level: "basic",
    codeExample: "# Enterprise Python Logging & CLI Standard"
  }
];

export default questions;
