// src/components/study/python/topics/004_003_python-testing/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Built-in unittest framework: TestCase, assertions, setUp and tearDown

const questions = [
  {
    question: "What is the primary base class used to write test suites in Python's built-in 'unittest' module?",
    shortAnswer: "'unittest.TestCase' is the fundamental base class that provides specialized assertion methods, lifecycle hooks, and test execution capabilities.",
    explanation: "Core object-oriented test case base class in the standard library.",
    hint: "Subclass unittest.TestCase to create test suites.",
    level: "basic",
    codeExample: "import unittest\nclass TestMyModule(unittest.TestCase):\n    def test_example(self): pass"
  },
  {
    question: "What naming convention must test methods follow inside a 'unittest.TestCase' class for auto-discovery?",
    shortAnswer: "Every test method must start with the prefix 'test_' (e.g. 'test_calculate_gpa'), allowing the test runner to automatically discover and execute it.",
    explanation: "Method name prefix convention for test discovery.",
    hint: "Methods must start with 'test_' like def test_addition(self):",
    level: "basic",
    codeExample: "def test_fee_calculation(self): # Discovered automatically\n    self.assertEqual(1 + 1, 2)"
  },
  {
    question: "Why should you prefer 'self.assertEqual(a, b)' over a raw 'assert a == b' inside 'unittest.TestCase'?",
    shortAnswer: "'self.assertEqual()' provides rich, detailed failure diagnostic messages showing the exact difference, type mismatch, and formatted diff between 'a' and 'b', whereas a bare 'assert' simply raises a generic AssertionError unless manually formatted.",
    explanation: "Rich diagnostic diff reporting in unittest assertion methods.",
    hint: "self.assertEqual displays detailed diff comparisons between expected and actual values.",
    level: "basic",
    codeExample: "self.assertEqual(actual_dict, expected_dict) # Shows key-by-key diff on failure"
  },
  {
    question: "How does the per-test fixture lifecycle work with 'setUp()' and 'tearDown()'?",
    shortAnswer: "'setUp()' is executed immediately BEFORE every individual test method runs, creating fresh test fixtures; 'tearDown()' is executed immediately AFTER every test method finishes, cleaning up resources even if the test fails.",
    explanation: "Instance-level test preparation and cleanup hooks.",
    hint: "setUp runs before each test; tearDown runs after each test.",
    level: "basic",
    codeExample: "def setUp(self): self.client = Client()\ndef tearDown(self): self.client.close()"
  },
  {
    question: "When should you use '@classmethod setUpClass(cls)' instead of 'setUp(self)'?",
    shortAnswer: "Use 'setUpClass(cls)' when setting up expensive resources (like establishing a database connection or spawning an external process) that can be safely shared across all test methods in the class, running once per class rather than before every test.",
    explanation: "Class-level fixture amortization for expensive initialization.",
    hint: "Runs once before all tests in the class to initialize expensive shared resources.",
    level: "moderate",
    codeExample: "@classmethod\ndef setUpClass(cls):\n    cls.db = create_expensive_db_connection()"
  },
  {
    question: "How do you test floating-point numbers in 'unittest' to avoid decimal precision pitfalls?",
    shortAnswer: "Using 'self.assertAlmostEqual(a, b, places=2)' (or 'delta=0.01'), which verifies that two floating-point numbers are equal up to a specified number of decimal places, preventing false failures caused by binary float inaccuracies.",
    explanation: "Epsilon tolerance comparison for floating-point values.",
    hint: "Use self.assertAlmostEqual(a, b, places=2) to handle float rounding differences.",
    level: "basic",
    codeExample: "self.assertAlmostEqual(0.1 + 0.2, 0.3, places=7)"
  },
  {
    question: "How do you verify that a function raises an expected exception using 'unittest' context managers?",
    shortAnswer: "Using the context manager 'with self.assertRaises(ExpectedException):', which asserts that the enclosed block raises the specified exception, optionally capturing the exception object for message inspection.",
    explanation: "Context manager pattern for exception verification.",
    hint: "with self.assertRaises(ValueError): target_function()",
    level: "basic",
    codeExample: "with self.assertRaises(ValueError) as ctx:\n    validate_age(-1)\nself.assertIn('cannot be negative', str(ctx.exception))"
  },
  {
    question: "What is 'self.subTest()' and why is it superior to running a simple 'for' loop in a test method?",
    shortAnswer: "Inside a loop, a standard assertion failure stops test execution immediately and skips the remaining iterations; 'self.subTest()' isolates each iteration so that if one subtest fails, all other iterations still run and report their individual pass/fail statuses.",
    explanation: "Non-terminating granular loop parametrization in unittest.",
    hint: "Prevents the first failing loop iteration from stopping the rest of the loop.",
    level: "moderate",
    codeExample: "for num, is_even in [(2, True), (3, False), (4, True)]:\n    with self.subTest(num=num):\n        self.assertEqual(check_even(num), is_even)"
  },
  {
    question: "How can you conditionally skip a test in 'unittest' based on an environment or OS condition?",
    shortAnswer: "Using decorators like '@unittest.skip(reason)', '@unittest.skipIf(condition, reason)', or '@unittest.skipUnless(condition, reason)'.",
    explanation: "Declarative test exclusion based on platform or environment state.",
    hint: "@unittest.skipIf(sys.platform == 'win32', 'Not supported on Windows')",
    level: "moderate",
    codeExample: "@unittest.skipIf(sys.version_info < (3, 11), 'Requires Python 3.11+')"
  },
  {
    question: "What does the '@unittest.expectedFailure' decorator do?",
    shortAnswer: "It marks a test that is currently known to fail (e.g. tracking a known bug); if the test fails, it is counted as an 'expected failure' rather than a suite failure; if it passes unexpectedly, it is reported as an 'unexpected success'.",
    explanation: "Known defect tracking without failing CI quality gates.",
    hint: "Marks a test that is expected to fail without failing the entire test suite.",
    level: "moderate",
    codeExample: "@unittest.expectedFailure\ndef test_feature_in_progress(self): ... "
  },
  {
    question: "What is the difference between 'self.assertIn(item, container)' and 'self.assertTrue(item in container)'?",
    shortAnswer: "'self.assertIn' provides a clear failure message showing both the missing item and the full container contents (e.g. '5 not found in [1, 2, 3]'), whereas 'self.assertTrue' only outputs generic 'False is not true'.",
    explanation: "Diagnostic specificity of domain assertions vs generic boolean assertions.",
    hint: "assertIn prints the item and the container on failure; assertTrue just prints False.",
    level: "basic",
    codeExample: "self.assertIn('Mamata', enrolled_students) # Rich diagnostic output"
  },
  {
    question: "How do you execute test discovery from the command line using Python's standard 'unittest' runner?",
    shortAnswer: "Run: 'python -m unittest discover -s <directory> -p \"test_*.py\" -v', which automatically finds and executes all matching test files recursively.",
    explanation: "Standard library CLI test discovery syntax.",
    hint: "python -m unittest discover -s tests -p 'test_*.py' -v",
    level: "basic",
    codeExample: "# Run tests across project: python -m unittest discover"
  },
  {
    question: "What is 'unittest.TestSuite' and how is it used to group specific tests?",
    shortAnswer: "'unittest.TestSuite' is a composite container that aggregates multiple test cases or test suites together, allowing custom subsets of tests to be executed together programmatically.",
    explanation: "Composite pattern container for custom test aggregation.",
    hint: "suite = unittest.TestSuite(); suite.addTest(TestClass('test_method'))",
    level: "moderate",
    codeExample: "suite = unittest.TestSuite()\nsuite.addTest(TestBilling('test_payment'))\nunittest.TextTestRunner().run(suite)"
  },
  {
    question: "What is the purpose of 'self.assertCountEqual(seq1, seq2)' in 'unittest'?",
    shortAnswer: "It asserts that two sequences contain the exact same elements with the exact same frequencies, regardless of their order (multiset equality).",
    explanation: "Order-agnostic multiset element comparison.",
    hint: "Checks that two lists have the exact same elements regardless of order.",
    level: "moderate",
    codeExample: "self.assertCountEqual(['A', 'B', 'A'], ['B', 'A', 'A']) # Passes!"
  },
  {
    question: "What happens if an exception is raised inside 'setUp()'?",
    shortAnswer: "If 'setUp()' raises an exception, the test method is marked as an 'ERROR' (not a 'FAIL'), the test method itself is NEVER executed, but 'tearDown()' is also skipped unless custom cleanup is registered via 'addCleanup()'.",
    explanation: "Setup failure semantics and cleanup handling.",
    hint: "The test method is skipped and marked as an ERROR.",
    level: "complex",
    codeExample: "# Use self.addCleanup(func) inside setUp to ensure cleanup even if setUp fails"
  },
  {
    question: "How does 'self.addCleanup(function, *args)' provide safer resource cleanup than 'tearDown()'?",
    shortAnswer: "'addCleanup()' registers cleanup callbacks immediately as resources are created in 'setUp()' or test methods; registered cleanup functions are guaranteed to run in LIFO order even if 'setUp()' crashes midway.",
    explanation: "Safe LIFO cleanup registration surviving partial initialization failures.",
    hint: "Guarantees cleanup callbacks execute even if setUp fails halfway through.",
    level: "complex",
    codeExample: "f = open('temp.txt', 'w')\nself.addCleanup(f.close)"
  },
  {
    question: "What is the difference between a Test 'Failure' and a Test 'Error' in unittest reporting?",
    shortAnswer: "A 'Failure' (F) occurs when an assertion fails ('self.assertEqual' or 'assert'); an 'Error' (E) occurs when an unexpected exception (like 'KeyError', 'IndexError', 'TypeError', or crash in 'setUp') is raised during execution.",
    explanation: "Distinction between contract assertion failures and unhandled runtime exceptions.",
    hint: "Failure = assertion failed; Error = unexpected unhandled exception crash.",
    level: "basic",
    codeExample: "# Failure: self.assertEqual(1, 2) | Error: x = 1 / 0 (ZeroDivisionError)"
  },
  {
    question: "Can 'unittest' test asynchronous coroutines in Python 3.8+?",
    shortAnswer: "Yes, by subclassing 'unittest.IsolatedAsyncioTestCase', which natively supports 'async def test_*', 'async def asyncSetUp()', and 'async def asyncTearDown()'.",
    explanation: "Native asyncio coroutine testing in standard library unittest.",
    hint: "Subclass unittest.IsolatedAsyncioTestCase for async tests.",
    level: "moderate",
    codeExample: "class TestAsync(unittest.IsolatedAsyncioTestCase):\n    async def test_api(self): res = await fetch()"
  },
  {
    question: "Why does 'unittest' instantiate a brand-new instance of the 'TestCase' class for EVERY test method?",
    shortAnswer: "To ensure complete test isolation, preventing instance variable mutations in one test method from leaking into or polluting another test method.",
    explanation: "Fresh instance instantiation per test method ensuring state isolation.",
    hint: "Instantiates a new class instance for each test to avoid state leakage.",
    level: "moderate",
    codeExample: "# test_one and test_two run on completely separate object instances"
  },
  {
    question: "What is the primary advantage and disadvantage of Python's built-in 'unittest' module?",
    shortAnswer: "Advantage: it is part of Python's standard library with zero external dependencies (always available in any environment); Disadvantage: it requires more boilerplate classes and verbose assertion methods compared to modern pytest.",
    explanation: "Standard library ubiquity vs boilerplate verbosity.",
    hint: "Zero dependencies and built-in, but requires boilerplate OOP classes and verbose assertions.",
    level: "basic",
    codeExample: "# Ubiquitous zero-dependency standard library testing"
  }
];

export default questions;
