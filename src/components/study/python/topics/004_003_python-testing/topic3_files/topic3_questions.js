// src/components/study/python/topics/004_003_python-testing/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Modern testing with PyTest: test discovery, assert statements, fixtures

const questions = [
  {
    question: "Why has PyTest become the de-facto standard testing framework in modern Python engineering?",
    shortAnswer: "PyTest eliminates object-oriented test class boilerplate (allowing clean standalone test functions), uses standard Python 'assert' statements with AST-rewritten detailed diff reporting, provides powerful modular fixture dependency injection, and has a rich plugin ecosystem.",
    explanation: "Ergonomics, simplicity, and modular architecture of pytest.",
    hint: "No mandatory TestCase classes, clean standard assert statements, and powerful modular fixtures.",
    level: "basic",
    codeExample: "# PyTest: def test_fee(): assert calculate(100) == 90"
  },
  {
    question: "How does PyTest auto-discover test files and test functions across a project?",
    shortAnswer: "PyTest searches recursively for files matching 'test_*.py' or '*_test.py', inside which it discovers standalone functions prefixed with 'test_' or methods inside classes prefixed with 'Test' (without '__init__').",
    explanation: "Automatic discovery conventions in pytest.",
    hint: "Finds files named test_*.py or *_test.py and functions named test_*().",
    level: "basic",
    codeExample: "# Discovers test_billing.py → def test_payment():"
  },
  {
    question: "What is 'AST Assert Rewriting' in PyTest and why is it a game-changer?",
    shortAnswer: "PyTest parses the test file's Abstract Syntax Tree (AST) at import time and rewrites standard 'assert a == b' statements, intercepting intermediate expressions to display rich, colorful diffs of variables, dictionary keys, and list mismatches without requiring verbose 'self.assertEqual()' methods.",
    explanation: "Bytecode/AST introspection providing detailed failure diffs on plain assert statements.",
    hint: "PyTest rewrites the AST of plain assert statements to show detailed values and diffs.",
    level: "moderate",
    codeExample: "# Plain assert in pytest shows exact list differences:\nassert [1, 2, 'BP'] == [1, 2, 'CC']"
  },
  {
    question: "How do you define and inject a fixture into a test function in PyTest?",
    shortAnswer: "Decorate a function with '@pytest.fixture', and then declare the fixture's name as a parameter in any test function; PyTest automatically resolves and injects the fixture's return value when running the test.",
    explanation: "Dependency injection via fixture parameters in pytest.",
    hint: "Define @pytest.fixture def my_fixture(): ... and pass my_fixture as an argument to test_*().",
    level: "basic",
    codeExample: "@pytest.fixture\ndef fresh_student(): return Student('Mamata')\n\ndef test_enroll(fresh_student): assert fresh_student.name == 'Mamata'"
  },
  {
    question: "How does teardown / cleanup work inside a '@pytest.fixture'?",
    shortAnswer: "By using the 'yield' keyword instead of 'return': code before 'yield' runs during setup, the yielded object is passed to the test, and code after 'yield' runs automatically as teardown cleanup after the test completes.",
    explanation: "Yield-based setup and teardown fixture lifecycle in pytest.",
    hint: "Code before 'yield' is setup; code after 'yield' is teardown.",
    level: "basic",
    codeExample: "@pytest.fixture\ndef db_conn():\n    conn = open_db()\n    yield conn # Test runs here\n    conn.close() # Teardown cleanup"
  },
  {
    question: "What are the four primary fixture scopes available in PyTest?",
    shortAnswer: "1. 'function' (default - runs per test function), 2. 'class' (runs once per test class), 3. 'module' (runs once per test module file), and 4. 'session' (runs once across the entire test suite run).",
    explanation: "Granular fixture lifecycle scope tiers in pytest.",
    hint: "function (default), class, module, and session.",
    level: "moderate",
    codeExample: "@pytest.fixture(scope='session')\ndef shared_server(): ... "
  },
  {
    question: "What is 'conftest.py' and what special capabilities does it provide in PyTest?",
    shortAnswer: "'conftest.py' is a special configuration file in pytest that automatically shares fixtures, hooks, and custom markers across all test files within its directory and subdirectories without needing explicit imports.",
    explanation: "Automatic root and directory-level fixture sharing without imports.",
    hint: "A file defining fixtures shared across multiple test files without importing them.",
    level: "moderate",
    codeExample: "# conftest.py\n@pytest.fixture\ndef global_client(): return Client()"
  },
  {
    question: "Can a PyTest fixture request and consume other fixtures (Fixture Composition)?",
    shortAnswer: "Yes, fixtures can accept other fixtures as arguments, forming a modular dependency tree (e.g. 'authenticated_user' fixture requests 'db_session' which requests 'app_config').",
    explanation: "Modular fixture composition and chaining.",
    hint: "Fixtures can take other fixtures as parameters.",
    level: "moderate",
    codeExample: "@pytest.fixture\ndef admin_student(fresh_student):\n    fresh_student.is_admin = True\n    return fresh_student"
  },
  {
    question: "What does the PyTest CLI flag '-k <expression>' do?",
    shortAnswer: "The '-k' flag filters and runs only tests whose names match the given substring expression (e.g. 'pytest -k \"scholarship or admission\"' or 'pytest -k \"not slow\"').",
    explanation: "Keyword expression-based test filtering in pytest CLI.",
    hint: "pytest -k 'keyword' filters tests matching that name.",
    level: "basic",
    codeExample: "pytest -k 'barrackpore' # Runs only tests containing 'barrackpore'"
  },
  {
    question: "What does the PyTest CLI flag '-x' do?",
    shortAnswer: "The '-x' flag tells PyTest to stop the entire test run immediately upon encountering the very first test failure ('fail-fast' mode).",
    explanation: "Immediate test suite termination on first failure.",
    hint: "pytest -x stops test execution immediately upon the first failure.",
    level: "basic",
    codeExample: "pytest -x # Stops on first failure"
  },
  {
    question: "What does the PyTest CLI flag '--lf' (last-failed) do?",
    shortAnswer: "'pytest --lf' reads PyTest's internal cache and re-executes only the tests that failed in the previous test run, saving time during iterative debugging.",
    explanation: "Iterative debugging by re-running failed test subset.",
    hint: "pytest --lf re-runs only the tests that failed in the last run.",
    level: "basic",
    codeExample: "pytest --lf # Instant retry on failed tests only"
  },
  {
    question: "What does the '-s' (or '--capture=no') flag do in PyTest?",
    shortAnswer: "By default, PyTest captures stdout/stderr and only displays output for failing tests; passing '-s' disables output capture so that all 'print()' statements appear in the terminal during test execution.",
    explanation: "Standard output capture disablement for live console streaming.",
    hint: "pytest -s allows console print() statements to display live.",
    level: "basic",
    codeExample: "pytest -s # Shows print outputs"
  },
  {
    question: "What is an 'autouse=True' fixture in PyTest?",
    shortAnswer: "An 'autouse=True' fixture runs automatically for every test within its scope without needing to be explicitly declared as a parameter in individual test functions (useful for database transaction rollbacks or environment variable resets).",
    explanation: "Implicit automatic fixture execution per scope.",
    hint: "@pytest.fixture(autouse=True) runs automatically without being passed as a parameter.",
    level: "moderate",
    codeExample: "@pytest.fixture(autouse=True)\ndef reset_global_state():\n    clear_cache()\n    yield"
  },
  {
    question: "How do you access temporary directories in PyTest using built-in fixtures?",
    shortAnswer: "By requesting the built-in 'tmp_path' fixture (which provides a unique 'pathlib.Path' object for each test) or 'tmpdir' (legacy 'py.path.local'), ensuring temporary files are automatically isolated and cleaned up.",
    explanation: "Built-in isolated temporary filesystem fixture in pytest.",
    hint: "Use the built-in tmp_path fixture parameter for clean temp file tests.",
    level: "basic",
    codeExample: "def test_save(tmp_path):\n    file = tmp_path / 'out.json'\n    file.write_text('{}')"
  },
  {
    question: "How does PyTest handle legacy 'unittest.TestCase' test classes?",
    shortAnswer: "PyTest natively recognizes and executes standard 'unittest.TestCase' subclasses out-of-the-box, allowing teams to run legacy suites and new pytest-style tests in the same test runner.",
    explanation: "Backward compatibility and interoperability with unittest.",
    hint: "PyTest automatically discovers and runs legacy unittest.TestCase classes.",
    level: "basic",
    codeExample: "# PyTest runs both unittest classes and standalone pytest functions"
  },
  {
    question: "What is the purpose of the 'capsys' built-in fixture in PyTest?",
    shortAnswer: "'capsys' captures standard output (stdout) and standard error (stderr) generated during test execution, allowing assertions on printed console output via 'captured = capsys.readouterr()'.",
    explanation: "Console output interception and text assertion.",
    hint: "capsys.readouterr().out allows asserting on printed terminal text.",
    level: "moderate",
    codeExample: "def test_cli(capsys):\n    print('Hello Mamata')\n    captured = capsys.readouterr()\n    assert 'Mamata' in captured.out"
  },
  {
    question: "What is the difference between a fixture returning a value vs yielding a generator?",
    shortAnswer: "A fixture with 'return' executes only a setup phase; a fixture with 'yield' executes setup before the yield, pauses while the test runs, and resumes after the yield for teardown cleanup.",
    explanation: "Single-phase return vs dual-phase yield generator fixtures.",
    hint: "return has only setup; yield supports setup before and teardown after.",
    level: "basic",
    codeExample: "# return → setup only | yield → setup + teardown"
  },
  {
    question: "How does PyTest's test output differ from unittest when an assertion fails?",
    shortAnswer: "PyTest displays the failing source code line, evaluates and prints every sub-expression value in the line, and prints a specialized visual diff (showing missing keys in dicts, extra elements in lists, or character differences in strings).",
    explanation: "Detailed expression evaluation and visual diff rendering.",
    hint: "PyTest prints full expression values and exact element-by-element diffs.",
    level: "basic",
    codeExample: "# Shows: Where: {'name': 'Mamata'} != {'name': 'Mahima'}"
  },
  {
    question: "What is 'pytest.ini' (or pyproject.toml [tool.pytest.ini_options])?",
    shortAnswer: "It is the central configuration file for PyTest where default CLI options (e.g. 'addopts = -v --strict-markers'), test discovery paths, and custom registered markers are configured.",
    explanation: "Project-wide configuration file for pytest defaults.",
    hint: "Configures default CLI flags, markers, and paths in pytest.ini.",
    level: "moderate",
    codeExample: "# pytest.ini\n[pytest]\naddopts = -v --strict-markers\ntestpaths = tests"
  },
  {
    question: "What is the ultimate golden rule of writing clean PyTest suites?",
    shortAnswer: "Keep test functions small and focused using standard 'assert', compose modular fixtures with '@pytest.fixture' and 'yield' for setup/teardown, share global fixtures in 'conftest.py', and avoid unnecessary OOP class boilerplate.",
    explanation: "The complete enterprise PyTest best practice standard.",
    hint: "Use plain assert, modular fixtures, conftest.py, and simple test functions.",
    level: "basic",
    codeExample: "# Professional Modern PyTest Standard"
  }
];

export default questions;
