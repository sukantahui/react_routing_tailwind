// src/components/study/python/topics/004_003_python-testing/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Testing exceptions with pytest.raises

const questions = [
  {
    question: "Why is exception testing ('Negative Testing') critical for building enterprise-grade Python software?",
    shortAnswer: "Negative testing proves that an application rejects invalid data, handles edge case violations defensively, raises specific error types rather than crashing unexpectedly, and provides actionable error diagnostics.",
    explanation: "Defensive programming and boundary error handling verification.",
    hint: "Verifies that code fails safely and predictably on invalid inputs.",
    level: "basic",
    codeExample: "with pytest.raises(ValueError): calculate_fee(-500)"
  },
  {
    question: "What is the primary syntax for testing an expected exception using 'pytest.raises'?",
    shortAnswer: "Using the context manager: 'with pytest.raises(ExpectedException):' around the line of code expected to raise the error.",
    explanation: "Standard context manager syntax for exception assertion in pytest.",
    hint: "with pytest.raises(ValueError): target_call()",
    level: "basic",
    codeExample: "with pytest.raises(KeyError):\n    student_db.get_record('NONEXISTENT')"
  },
  {
    question: "How does the 'match' parameter in 'pytest.raises' verify exception error messages?",
    shortAnswer: "The 'match' argument accepts a regular expression string (e.g. 'match=r\"must be positive.*\"') and asserts that the string representation of the raised exception matches that regex pattern.",
    explanation: "Regex-based error message assertion in pytest.",
    hint: "with pytest.raises(ValueError, match=r'regex pattern'):",
    level: "basic",
    codeExample: "with pytest.raises(ValueError, match=r'Invalid score: -5'):\n    validate_score(-5)"
  },
  {
    question: "How can you capture and inspect custom attributes on a raised exception object in PyTest?",
    shortAnswer: "By capturing the exception info object with 'with pytest.raises(CustomError) as exc_info:' and then accessing the exception instance via 'exc_info.value' (e.g. 'assert exc_info.value.error_code == 4001').",
    explanation: "Exception instance inspection via ExceptionInfo wrapper.",
    hint: "Use 'as exc_info' and inspect 'exc_info.value.attribute'.",
    level: "moderate",
    codeExample: "with pytest.raises(QuotaError) as exc_info:\n    enroll('BP')\nassert exc_info.value.max_capacity == 50"
  },
  {
    question: "What happens if the code inside a 'with pytest.raises(ValueError):' block DOES NOT raise any exception?",
    shortAnswer: "The test immediately FAILS with a 'Failed: DID NOT RAISE <class 'ValueError'>' error message.",
    explanation: "Failure semantics when an expected exception is missing.",
    hint: "PyTest fails the test because the expected exception was not raised.",
    level: "basic",
    codeExample: "# Fails if no exception is raised inside the block"
  },
  {
    question: "What happens if code inside 'with pytest.raises(ValueError):' raises a 'TypeError' instead?",
    shortAnswer: "The test FAILS because a TypeError does not match the expected ValueError; PyTest lets the unexpected TypeError propagate as an unhandled error.",
    explanation: "Strict exception type matching and unhandled exception propagation.",
    hint: "The test fails because the raised type does not match the expected type.",
    level: "basic",
    codeExample: "# Fails because TypeError is not a subclass of ValueError"
  },
  {
    question: "Can 'pytest.raises' match multiple possible exception types?",
    shortAnswer: "Yes, by passing a tuple of exception classes: 'with pytest.raises((ValueError, TypeError)):', which succeeds if either exception type is raised.",
    explanation: "Multiple exception type matching via tuple argument.",
    hint: "Pass a tuple of exception classes: pytest.raises((ErrorA, ErrorB))",
    level: "moderate",
    codeExample: "with pytest.raises((ValueError, KeyError)):\n    process_record(bad_data)"
  },
  {
    question: "How do you test both valid success cases and expected exception cases in a single '@pytest.mark.parametrize' test?",
    shortAnswer: "By passing the expected exception class (or 'contextlib.nullcontext()' for successful runs) as a parameter in the tuple, and using 'with expectation:' inside the test.",
    explanation: "Unified success and failure parametrization via contextlib.nullcontext.",
    hint: "Use contextlib.nullcontext() for successes and pytest.raises(Error) for failures.",
    level: "complex",
    codeExample: "from contextlib import nullcontext\n@pytest.mark.parametrize('val, expectation', [\n    (100, nullcontext()),\n    (-1, pytest.raises(ValueError))\n])\ndef test_fn(val, expectation):\n    with expectation: validate(val)"
  },
  {
    question: "What is the danger of writing an overly broad 'with pytest.raises(Exception):' assertion?",
    shortAnswer: "Testing against the generic base 'Exception' can mask unintended bugs (such as NameErrors, SyntaxErrors, or TypeErrors occurring in fixture setup or earlier lines) that pass the test by accident.",
    explanation: "Specificity in exception contract testing vs masked defects.",
    hint: "Broad Exception masks accidental NameError or TypeError bugs; always specify the exact error type.",
    level: "moderate",
    codeExample: "# BAD: with pytest.raises(Exception):\n# GOOD: with pytest.raises(AdmissionQuotaError):"
  },
  {
    question: "Why should you keep the code inside a 'with pytest.raises():' block as minimal as possible (ideally 1 line)?",
    shortAnswer: "Placing multiple lines of setup or calculation inside the context block creates ambiguity; an earlier line might raise the expected exception for the wrong reason rather than the actual function under test.",
    explanation: "Minimizing exception trapping scope to target operations.",
    hint: "Keep only the single target function call inside the with block.",
    level: "moderate",
    codeExample: "# GOOD:\nstudent = setup_student() # Outside with block\nwith pytest.raises(ValueError):\n    student.pay(-100) # Only 1 line inside!"
  },
  {
    question: "How does 'pytest.warns()' differ from 'pytest.raises()'?",
    shortAnswer: "'pytest.raises()' expects an exception that halts execution; 'pytest.warns(DeprecationWarning)' expects a non-fatal Python warning (via the 'warnings' module) that allows code execution to continue.",
    explanation: "Warning assertion vs exception trapping.",
    hint: "pytest.warns tests non-fatal warnings (e.g. deprecations) without stopping execution.",
    level: "moderate",
    codeExample: "with pytest.warns(DeprecationWarning, match=r'deprecated'):\n    legacy_method()"
  },
  {
    question: "How can you test custom exception hierarchies where subclasses inherit from a domain base exception?",
    shortAnswer: "Testing against the base class (e.g. 'with pytest.raises(InstitutionalError):') will catch any custom subclass ('PaymentError', 'QuotaError'), or testing the specific subclass to verify exact error specialization.",
    explanation: "Object-oriented exception inheritance verification.",
    hint: "Subclasses are caught by their parent exception classes in pytest.raises.",
    level: "moderate",
    codeExample: "# class PaymentError(InstitutionalError): pass\nwith pytest.raises(InstitutionalError):\n    raise PaymentError('Failed')"
  },
  {
    question: "What does 'exc_info.type' vs 'exc_info.typename' provide?",
    shortAnswer: "'exc_info.type' returns the actual exception class object (e.g. '<class ValueError>'), while 'exc_info.typename' returns the class name as a plain string (e.g. '\"ValueError\"').",
    explanation: "Exception metadata properties on ExceptionInfo.",
    hint: "type returns the class; typename returns the class name string.",
    level: "basic",
    codeExample: "assert exc_info.typename == 'ValueError'"
  },
  {
    question: "Why is using 'try...except' with 'assert False' inside tests considered an anti-pattern compared to 'pytest.raises'?",
    shortAnswer: "Writing manual 'try...except' requires 6+ lines of boilerplate code, risks forgetting the 'assert False' in the try block (causing silent false passes), and lacks automatic regex matching and rich traceback reporting.",
    explanation: "Anti-pattern of manual try-except in test code.",
    hint: "Manual try-except is verbose, error-prone, and lacks pytest's match features.",
    level: "basic",
    codeExample: "# Anti-pattern: try: f() except: pass (Do NOT use! Use pytest.raises)"
  },
  {
    question: "How do you test that an exception contains specific structured JSON or dictionary details in an API test?",
    shortAnswer: "By catching the exception with 'as exc_info' and asserting on the structured payload properties (e.g. 'assert exc_info.value.details[\"field\"] == \"email\"').",
    explanation: "Testing structured API validation exception payloads.",
    hint: "Access exc_info.value.details and assert on the dictionary keys.",
    level: "moderate",
    codeExample: "with pytest.raises(ValidationError) as exc_info:\n    parse_user({})\nassert exc_info.value.field == 'email'"
  },
  {
    question: "What is 'exc_info.traceback' used for in advanced test scenarios?",
    shortAnswer: "It provides access to the captured traceback object, allowing advanced assertions on call stack depth or verifying that an exception originated in a specific source module.",
    explanation: "Traceback inspection in ExceptionInfo.",
    hint: "Allows inspecting the call stack and origin of the raised error.",
    level: "complex",
    codeExample: "assert 'admission.py' in str(exc_info.traceback)"
  },
  {
    question: "How do you test that an exception is raised from another exception ('raise ... from err')?",
    shortAnswer: "By asserting on 'exc_info.value.__cause__', which points to the underlying original cause exception chained by Python's exception handling syntax.",
    explanation: "Chained exception assertion in Python 3.",
    hint: "Check exc_info.value.__cause__ to verify the underlying cause exception.",
    level: "complex",
    codeExample: "assert isinstance(exc_info.value.__cause__, DatabaseError)"
  },
  {
    question: "What is the behavior of 'pytest.raises' when testing asynchronous coroutines?",
    shortAnswer: "Inside an 'async def test_*' function, place the 'await' call inside the context block: 'with pytest.raises(ValueError): await async_function()'.",
    explanation: "Async exception assertion syntax in pytest-asyncio.",
    hint: "Place 'await async_call()' inside the 'with pytest.raises' block.",
    level: "moderate",
    codeExample: "with pytest.raises(ValueError):\n    await fetch_invalid_student()"
  },
  {
    question: "Why should regex special characters in the 'match' parameter be escaped when matching exact strings?",
    shortAnswer: "Characters like '(', ')', '[', ']', '.', and '*' have special meanings in regular expressions; if your error message contains parentheses (e.g. 'Invalid (code 400)'), you must escape them ('match=r\"Invalid \(code 400\)\"') or use re.escape.",
    explanation: "Regex character escaping in pytest error message matching.",
    hint: "Escape parentheses and brackets with backslashes in regex match strings.",
    level: "moderate",
    codeExample: "with pytest.raises(ValueError, match=re.escape('Error (Code 400)')):"
  },
  {
    question: "What is the ultimate golden rule of exception testing in Python?",
    shortAnswer: "Always test the exact exception type, assert that the error message contains the expected cause via 'match=r\"...\"', and keep the context block focused to a single target line to eliminate false passes.",
    explanation: "The complete enterprise exception testing standard.",
    hint: "Exact error type + regex message match + minimal single-line scope.",
    level: "basic",
    codeExample: "# Enterprise Exception Testing Standard"
  }
];

export default questions;
