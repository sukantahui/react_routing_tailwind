// src/components/study/python/topics/003_002_basic-exception-handling/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Creating User-Defined Custom Exception Classes

const questions = [
  {
    question: "Why should custom user-defined exception classes inherit from 'Exception' and NOT 'BaseException'?",
    shortAnswer: "Because 'BaseException' is reserved for system-exiting events (KeyboardInterrupt, SystemExit, GeneratorExit); inheriting from 'Exception' ensures normal domain errors can be safely caught by standard 'except Exception:' handlers without blocking Ctrl+C.",
    explanation: "A fundamental rule of Python exception architecture.",
    hint: "Inherit from Exception so KeyboardInterrupt and SystemExit are not accidentally caught.",
    level: "basic",
    codeExample: "class MyCustomError(Exception):\n    pass  # Correct!"
  },
  {
    question: "What is the 'Root Domain Base Exception' design pattern?",
    shortAnswer: "Creating a top-level abstract or base exception class (e.g. 'class CoderAccoTaxError(Exception): pass') from which all library/application-specific exceptions inherit.",
    explanation: "Allows users of your library to catch all module errors with a single except statement.",
    hint: "A common base class for all exceptions defined in a package or library.",
    level: "basic",
    codeExample: "class InstituteError(Exception): pass\nclass AdmissionError(InstituteError): pass"
  },
  {
    question: "How do you store custom forensic attributes on a user-defined exception instance?",
    shortAnswer: "By overriding the '__init__' method, accepting the custom arguments, storing them on 'self' (e.g. 'self.student_id = student_id'), and calling 'super().__init__(message)'.",
    explanation: "Preserves standard string rendering while enabling programmatic access to error metadata.",
    hint: "Override __init__, save attributes on self, and call super().__init__().",
    level: "basic",
    codeExample: "class FeeDeficitError(Exception):\n    def __init__(self, stu_id, deficit):\n        self.stu_id = stu_id\n        self.deficit = deficit\n        super().__init__(f'Deficit of INR {deficit}')"
  },
  {
    question: "What is the 'Exception Shadowing' trap in hierarchical 'except' clauses?",
    shortAnswer: "Placing a general parent exception block (e.g. 'except InstituteError:') BEFORE a specific child exception block (e.g. 'except QuotaFullError:'), which causes the parent block to catch all errors, rendering the child block unreachable dead code.",
    explanation: "Python evaluates except blocks top-to-bottom and stops at the first matching class.",
    hint: "Placing a broad parent class before a specific child class makes the child block unreachable.",
    level: "moderate",
    codeExample: "# BAD:\nexcept InstituteError: ...\nexcept QuotaFullError: ... # DEAD CODE!"
  },
  {
    question: "What is the correct ordering rule for multi-tiered 'except' blocks?",
    shortAnswer: "Always order except blocks from Most Specific (leaf derived subclasses) to Most General (root ancestor base classes).",
    explanation: "Guarantees specific handlers receive priority.",
    hint: "Most specific subclass first, most general base class last.",
    level: "basic",
    codeExample: "except QuotaFullError: ...\nexcept AdmissionError: ...\nexcept InstituteError: ..."
  },
  {
    question: "Why should custom exceptions follow standard Python naming conventions ending in 'Error'?",
    shortAnswer: "PEP 8 specifies that exception classes should end with the suffix 'Error' (e.g., 'DatabaseConnectionError') to make their purpose instantly recognizable in code and stack traces.",
    explanation: "Promotes code clarity and consistency.",
    hint: "PEP 8 requires exception classes to end with the 'Error' suffix.",
    level: "basic",
    codeExample: "class StudentNotFoundError(Exception): pass"
  },
  {
    question: "Can a custom exception class be completely empty ('pass')?",
    shortAnswer: "Yes. An empty class inheriting from Exception ('class RecordNotFoundError(Exception): pass') is 100% functional and automatically inherits message handling from Exception.",
    explanation: "Common for simple sentinel error types.",
    hint: "Yes, 'class MyError(Exception): pass' is fully functional.",
    level: "basic",
    codeExample: "class ItemNotFoundError(Exception): pass"
  },
  {
    question: "How do custom exceptions facilitate structured REST API error responses in frameworks like FastAPI or Flask?",
    shortAnswer: "By attaching status codes, error codes, and details to custom exception classes, which global exception handlers serialize into standardized JSON payloads.",
    explanation: "Separates domain validation from HTTP transport mechanics.",
    hint: "Custom attributes can be serialized into standardized JSON error responses.",
    level: "moderate",
    codeExample: "def to_dict(self):\n    return {'error': self.code, 'details': self.details}"
  },
  {
    question: "Can a custom exception inherit from built-in specialized exceptions like 'ValueError' or 'KeyError'?",
    shortAnswer: "Yes. If your custom exception represents a specialized value or key failure (e.g. 'class InvalidPANError(ValueError): pass'), inheriting from the built-in type allows existing code expecting ValueError to catch it automatically.",
    explanation: "Leverages Python's existing exception semantics.",
    hint: "Yes, subclassing ValueError allows it to be caught by except ValueError handlers.",
    level: "moderate",
    codeExample: "class InvalidPANError(ValueError): pass"
  },
  {
    question: "What happens if you do NOT call 'super().__init__()' in a custom exception constructor?",
    shortAnswer: "The exception will still be created, but standard string conversions ('str(err)') and traceback formatting may fail to display the message properly because 'BaseException.args' was not populated.",
    explanation: "Always call super().__init__() to maintain full Python Data Model compatibility.",
    hint: "Always call super().__init__() to ensure .args and str(err) work properly.",
    level: "complex",
    codeExample: "def __init__(self, msg, code):\n    self.code = code\n    super().__init__(msg)  # Essential!"
  },
  {
    question: "How can you check if an exception object is an instance of a specific custom hierarchy?",
    shortAnswer: "Using the built-in 'isinstance(err, MyBaseException)' or 'issubclass(type(err), MyBaseException)' functions.",
    explanation: "Operates identically to standard Python OOP type checking.",
    hint: "Use isinstance(err, MyBaseException).",
    level: "basic",
    codeExample: "if isinstance(err, AdmissionError):\n    print('Admission failure')"
  },
  {
    question: "Can custom exceptions define custom methods (like '__str__' or 'log()')?",
    shortAnswer: "Yes. Custom exceptions are full-featured Python classes and can define custom helper methods, formatting functions, or diagnostic serializers.",
    explanation: "Enables rich domain-specific error utilities.",
    hint: "Yes, custom exceptions are standard Python classes with methods.",
    level: "basic",
    codeExample: "def __str__(self): return f'[{self.code}] {self.msg}'"
  },
  {
    question: "What is the advantage of using custom exceptions over raising generic 'Exception(\"string\")'?",
    shortAnswer: "Generic 'Exception' cannot be caught selectively without catching unintended bugs; custom exceptions allow precise, targeted error handling while letting unexpected bugs crash or be logged appropriately.",
    explanation: "Prevents accidental masking of syntax or type bugs.",
    hint: "Allows targeted catching without masking unrelated system exceptions.",
    level: "basic",
    codeExample: "# Specific catching: except QuotaExceededError:"
  },
  {
    question: "How do custom exceptions improve software testability?",
    shortAnswer: "Test suites can assert that specific failure edge cases raise the exact expected custom exception class (e.g. 'with pytest.raises(DuplicateStudentRecordError):') and verify forensic payload values.",
    explanation: "Enables rock-solid regression testing.",
    hint: "Enables testing exact error types and validating metadata with pytest.raises().",
    level: "basic",
    codeExample: "with pytest.raises(DuplicateStudentRecordError) as exc:\n    assert exc.value.student_id == 'STU-101'"
  },
  {
    question: "What is a 'Mix-in Exception'?",
    shortAnswer: "A secondary class mixed into custom exception definitions to add shared capabilities, such as JSON serialization or Sentry logging integration.",
    explanation: "Applies multiple inheritance to enhance exception behavior.",
    hint: "A mixin class providing shared capabilities across multiple exception types.",
    level: "complex",
    codeExample: "class JSONErrorMixin:\n    def to_json(self): return json.dumps(self.__dict__)"
  },
  {
    question: "When should you NOT create a custom exception class?",
    shortAnswer: "When an existing standard built-in exception (like ValueError, TypeError, KeyError, FileNotFoundError) perfectly and unambiguously describes the failure mode without needing custom metadata.",
    explanation: "Avoid creating redundant exception classes for standard conditions.",
    hint: "When standard built-ins (ValueError, TypeError) already describe the error perfectly.",
    level: "basic",
    codeExample: "# Prefer ValueError over custom 'NegativeNumberError' for simple math"
  },
  {
    question: "Can multiple custom exception classes be defined in a single module file?",
    shortAnswer: "Yes. It is standard industry practice to group all domain-specific exception classes together in a dedicated 'exceptions.py' file within a package.",
    explanation: "Provides a single source of truth for library errors.",
    hint: "Yes, commonly grouped inside an 'exceptions.py' module.",
    level: "basic",
    codeExample: "# my_package/exceptions.py"
  },
  {
    question: "How does Python populate the 'err.args' tuple in custom exceptions?",
    shortAnswer: "Whatever positional arguments are passed into 'super().__init__(*args)' are stored in the immutable tuple 'err.args'.",
    explanation: "Used internally by Python's serialization and printing mechanics.",
    hint: "Populated by positional arguments passed into super().__init__().",
    level: "moderate",
    codeExample: "err = MyError('msg', 404)\nprint(err.args)  # ('msg', 404)"
  },
  {
    question: "Can custom exceptions be pickled for multiprocessing or celery task serialization?",
    shortAnswer: "Yes, provided their '__init__' arguments match the values stored in 'self.args' or by implementing '__reduce__()'.",
    explanation: "Crucial for distributed task queues like Celery.",
    hint: "Yes, supported if __init__ args match self.args or via __reduce__.",
    level: "complex",
    codeExample: "# Fully picklable across multiprocessing workers"
  },
  {
    question: "What is the difference between a custom exception and a custom dataclass?",
    shortAnswer: "A custom exception inherits from 'Exception' and participates in Python's stack unwinding and 'try...except' mechanisms; dataclasses are purely data containers and cannot be raised.",
    explanation: "Though dataclasses can be combined with Exception via '@dataclass class MyError(Exception):'.",
    hint: "Exceptions participate in try...except and call stack unwinding.",
    level: "moderate",
    codeExample: "from dataclasses import dataclass\n@dataclass\nclass APIError(Exception):\n    code: int"
  },
  {
    question: "Can you re-raise a custom exception with modified attributes?",
    shortAnswer: "Yes. Inside an except block, you can mutate custom attributes on the caught instance and invoke bare 'raise' to propagate it.",
    explanation: "Enriches telemetry as errors bubble up microservice layers.",
    hint: "Yes, mutate attributes on the instance before calling bare raise.",
    level: "moderate",
    codeExample: "except AdmissionError as e:\n    e.retries += 1\n    raise"
  },
  {
    question: "How do custom exceptions simplify logging in production?",
    shortAnswer: "Log formatters can inspect custom attributes (e.g. 'err.student_id', 'err.deficit') to emit structured JSON logs with high-cardinality forensic metadata automatically.",
    explanation: "Drastically simplifies querying logs in Datadog, ELK, or CloudWatch.",
    hint: "Enables emitting structured JSON logs with rich forensic metadata.",
    level: "moderate",
    codeExample: "logger.error('Admission failed', extra=err.to_dict())"
  },
  {
    question: "What is the 'Subsystem Exception Wrapper' pattern?",
    shortAnswer: "Catching low-level third-party exceptions (e.g. 'psycopg2.OperationalError') at domain boundaries and wrapping them into a custom high-level domain exception (e.g. 'DatabaseConnectionError').",
    explanation: "Prevents internal implementation details from leaking to callers.",
    hint: "Wrapping low-level third-party errors into high-level domain exceptions.",
    level: "moderate",
    codeExample: "except LowLevelDBError as e:\n    raise HighLevelDomainError('Database unreachable') from e"
  },
  {
    question: "Can custom exceptions be used as context managers with 'with' statements?",
    shortAnswer: "While technically possible by defining '__enter__' and '__exit__', it is an anti-pattern; exception classes should only represent error conditions, not resource lifecycle managers.",
    explanation: "Keep responsibilities focused and cohesive.",
    hint: "Avoid using exceptions as context managers; keep responsibilities cohesive.",
    level: "complex",
    codeExample: "# Anti-pattern: Do not use exceptions as context managers"
  },
  {
    question: "What is the ultimate golden rule for designing User-Defined Custom Exception Classes in Python?",
    shortAnswer: "Inherit from 'Exception', establish a root domain base class for your package, end class names with 'Error', store structured forensic metadata on 'self', and always order except handlers from most specific to most general.",
    explanation: "Produces maintainable, self-documenting, and crash-proof enterprise code.",
    hint: "Subclass Exception, create a root base class, store rich metadata, and order specific first.",
    level: "basic",
    codeExample: "# Enterprise-grade custom exception architecture"
  }
];

export default questions;
