// src/components/study/python/topics/004_003_python-testing/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Parametrized tests with @pytest.mark.parametrize

const questions = [
  {
    question: "What is the primary benefit of '@pytest.mark.parametrize' over running a 'for' loop inside a test function?",
    shortAnswer: "'@pytest.mark.parametrize' generates a distinct, independent test case for each parameter tuple in the test runner; if one parameter fails, all other test cases still execute and report their individual pass/fail statuses, whereas a 'for' loop aborts on the first failure.",
    explanation: "Granular independent test case generation per parameter tuple.",
    hint: "Generates independent test runs so one failure doesn't stop the others.",
    level: "basic",
    codeExample: "@pytest.mark.parametrize('x, expected', [(1, 2), (2, 4), (3, 6)])\ndef test_double(x, expected): assert x * 2 == expected"
  },
  {
    question: "How do you define multiple arguments in '@pytest.mark.parametrize'?",
    shortAnswer: "By passing a comma-separated string of argument names as the first parameter (e.g. '\"input_val, discount, expected\"') and a list of tuples containing the matching values as the second parameter.",
    explanation: "Multi-argument parametrization syntax in pytest.",
    hint: "@pytest.mark.parametrize('arg1, arg2', [(val1, val2), ...])",
    level: "basic",
    codeExample: "@pytest.mark.parametrize('score, campus, expected', [\n    (95.0, 'Barrackpore', 5000.0),\n    (85.0, 'Kolkata', 3000.0)\n])"
  },
  {
    question: "What happens when you stack multiple '@pytest.mark.parametrize' decorators on top of a single test function?",
    shortAnswer: "PyTest calculates and executes the Cartesian Product (all combinatorial permutations) of all stacked parameters (e.g. 3 campuses stacked on 4 courses generates 3 x 4 = 12 distinct test cases).",
    explanation: "Cartesian product combinatorial test generation via stacked decorators.",
    hint: "Multiplies parameter sets to test all possible combinations (Cartesian product).",
    level: "moderate",
    codeExample: "@pytest.mark.parametrize('x', [1, 2])\n@pytest.mark.parametrize('y', ['A', 'B'])\n# Generates: (1, 'A'), (1, 'B'), (2, 'A'), (2, 'B')"
  },
  {
    question: "How do you assign custom, human-readable names to parameterized test cases?",
    shortAnswer: "By passing the 'ids' argument to '@pytest.mark.parametrize', either as a list of strings ('ids=[\"top_performer\", \"boundary_fail\"]') or as a callable function that formats names dynamically.",
    explanation: "Custom test case identification in pytest reports.",
    hint: "Use ids=['case1', 'case2'] or ids=lambda x: f'val_{x}'.",
    level: "basic",
    codeExample: "@pytest.mark.parametrize('x', [10, 20], ids=['low_tier', 'high_tier'])"
  },
  {
    question: "What is 'pytest.param()' and what special capabilities does it provide?",
    shortAnswer: "'pytest.param(*values, id=\"custom_name\", marks=pytest.mark.xfail)' allows attaching individual metadata, custom IDs, or specific markers (like 'xfail' or 'skip') to a single parameter row without affecting other rows.",
    explanation: "Per-row parameter customization and metadata tagging.",
    hint: "pytest.param(val, id='name', marks=pytest.mark.xfail)",
    level: "moderate",
    codeExample: "@pytest.mark.parametrize('val', [\n    pytest.param(-5, marks=pytest.mark.xfail, id='known_bug'),\n    pytest.param(10, id='valid')\n])"
  },
  {
    question: "How do you pass parameterized values directly into a fixture using 'indirect=True'?",
    shortAnswer: "By specifying 'indirect=True' (or 'indirect=[\"fixture_name\"]') in '@pytest.mark.parametrize', PyTest passes the parameter value to the fixture's 'request.param' attribute rather than passing it directly to the test function.",
    explanation: "Indirect fixture parametrization in pytest.",
    hint: "Use indirect=True to feed parameter values to a fixture's request.param.",
    level: "complex",
    codeExample: "@pytest.fixture\ndef student(request): return Student(request.param)\n\n@pytest.mark.parametrize('student', ['Mamata', 'Mahima'], indirect=True)\ndef test_name(student): assert student.name in ['Mamata', 'Mahima']"
  },
  {
    question: "How does PyTest's CLI output identify failing parameterized test cases?",
    shortAnswer: "PyTest appends the parameter values or custom ID in brackets to the test name in the terminal output (e.g. 'test_grades.py::test_boundary[90.0-A+] FAILED').",
    explanation: "Terminal test node ID formatting for parameterized tests.",
    hint: "Displays the parameter values or IDs in brackets [param1-param2].",
    level: "basic",
    codeExample: "test_scores.py::test_grade[95.0-A+] PASSED"
  },
  {
    question: "Can you run a single specific parameterized variation from the command line?",
    shortAnswer: "Yes, by passing the exact bracketed parameter ID to pytest on the CLI (e.g. 'pytest test_fees.py -k \"test_waiver[barrackpore-10000]\"').",
    explanation: "Targeted CLI execution of specific parameter permutations.",
    hint: "Use pytest -k with the bracketed parameter name.",
    level: "basic",
    codeExample: "pytest -k 'test_fee[Barrackpore]'"
  },
  {
    question: "What is 'pytest_generate_tests' and when should you use it?",
    shortAnswer: "'pytest_generate_tests(metafunc)' is a built-in PyTest hook used to generate test parameters dynamically at runtime (e.g. reading test cases from an external JSON file, CSV dataset, or database).",
    explanation: "Dynamic runtime test generation hook.",
    hint: "A hook function to dynamically generate test parameters from external files.",
    level: "complex",
    codeExample: "def pytest_generate_tests(metafunc):\n    if 'db_row' in metafunc.fixturenames:\n        metafunc.parametrize('db_row', load_test_cases_from_json())"
  },
  {
    question: "Why is testing boundary edge cases (e.g. 74.9 vs 75.0) particularly convenient with '@pytest.mark.parametrize'?",
    shortAnswer: "Because developers can define extensive tables of boundary inputs (e.g. just below, exactly at, and just above cutoffs) in a clean, readable table format within 5 lines of code.",
    explanation: "Boundary value table modeling in test parametrization.",
    hint: "Allows defining tables of adjacent boundary inputs in a compact, readable list.",
    level: "basic",
    codeExample: "@pytest.mark.parametrize('score, pass_status', [\n    (39.9, False), (40.0, True), (40.1, True)\n])"
  },
  {
    question: "What is the difference between a list of tuples vs a list of pytest.param instances in parametrize?",
    shortAnswer: "A list of raw tuples provides only the input values; a list of 'pytest.param()' instances allows customizing IDs and attaching markers (like 'skip' or 'xfail') to specific rows.",
    explanation: "Plain tuples vs decorated parameter objects.",
    hint: "pytest.param lets you add custom IDs and markers to individual test rows.",
    level: "basic",
    codeExample: "# Raw tuple: (1, 2) | pytest.param: pytest.param(1, 2, id='test_one')"
  },
  {
    question: "How does parametrization improve test suite maintainability over time?",
    shortAnswer: "Adding new test cases requires simply adding a new single-line tuple to the parameter list, avoiding code duplication, copy-paste errors, and large bloated test files.",
    explanation: "DRY test suite maintenance and extensible test tables.",
    hint: "You can add new test scenarios by simply adding a tuple row to the list.",
    level: "basic",
    codeExample: "# Adding a new test scenario is just 1 new line in the list"
  },
  {
    question: "What happens if a parameterized test with 'marks=pytest.mark.xfail' unexpectedly passes?",
    shortAnswer: "PyTest reports it as an 'XPASS' (Unexpected Pass); if 'strict=True' is configured, PyTest will treat the unexpected pass as a test suite failure.",
    explanation: "XPASS reporting for unexpected successes in xfail parameters.",
    hint: "PyTest reports it as XPASS (Unexpected Pass).",
    level: "moderate",
    codeExample: "pytest.param(90, 5000, marks=pytest.mark.xfail(strict=True))"
  },
  {
    question: "Can you parametrize an entire test class in PyTest?",
    shortAnswer: "Yes, applying '@pytest.mark.parametrize' at the class level automatically parametrizes every test method inside that class with those parameters.",
    explanation: "Class-level test parametrization in pytest.",
    hint: "Decorate the class with @pytest.mark.parametrize to apply to all class methods.",
    level: "moderate",
    codeExample: "@pytest.mark.parametrize('campus', ['Barrackpore', 'Kolkata'])\nclass TestCampusOperations: def test_1(self, campus): ... "
  },
  {
    question: "How do you test equivalence partitions efficiently using parametrize?",
    shortAnswer: "By selecting representative values from each valid and invalid input partition (e.g. negative numbers, zero, small positives, boundary cutoffs, extreme maximums) and listing them in the parameter table.",
    explanation: "Equivalence class partitioning via data-driven test tables.",
    hint: "Pick representative samples from each equivalence group in the parameter list.",
    level: "moderate",
    codeExample: "@pytest.mark.parametrize('amount', [-100, 0, 500, 1000000])"
  },
  {
    question: "Why should you avoid generating thousands of Cartesian product combinations without filtering?",
    shortAnswer: "Overly broad stacked parametrizations can cause combinatorial explosion (e.g. 10 x 10 x 10 x 10 = 10,000 tests), slowing down CI pipelines with redundant, low-value tests.",
    explanation: "Combinatorial explosion prevention in test matrix design.",
    hint: "Avoid multiplying too many large parameter lists to prevent huge slow test suites.",
    level: "moderate",
    codeExample: "# 5 x 5 x 5 = 125 tests (Fast) vs 50 x 50 x 50 = 125,000 tests (Too slow!)"
  },
  {
    question: "What is the best practice for naming parameter arguments in '@pytest.mark.parametrize'?",
    shortAnswer: "Use clear, descriptive domain names matching the function parameters and expected outputs (e.g. '\"score, attendance, expected_grade\"') rather than generic names like '\"a, b, c\"'.",
    explanation: "Self-documenting parameter naming conventions.",
    hint: "Use meaningful names like 'base_fee, discount, expected_net' instead of 'x, y, z'.",
    level: "basic",
    codeExample: "@pytest.mark.parametrize('base_fee, discount, expected_net', [...])"
  },
  {
    question: "How does PyTest report failures when testing multiple data types (e.g. int, float, str, None)?",
    shortAnswer: "PyTest clearly outputs the exact type and value of the parameter passed to the failing run in the failure traceback, making type-handling defects obvious immediately.",
    explanation: "Type-aware parameter failure tracing.",
    hint: "Shows the exact type and value for the specific failed permutation.",
    level: "basic",
    codeExample: "# Clearly shows: FAILED test_func[None-expected_error]"
  },
  {
    question: "Can you combine '@pytest.mark.parametrize' with exception testing ('pytest.raises')?",
    shortAnswer: "Yes, by passing the expected exception class or 'nullcontext()' as a parameter, allowing valid and invalid cases to be tested in the same parameterized function.",
    explanation: "Parametrizing expected successes alongside expected exceptions.",
    hint: "Pass the expected exception class as a parameter in the tuple.",
    level: "complex",
    codeExample: "@pytest.mark.parametrize('score, expected_exc', [\n    (95, None),\n    (-5, ValueError)\n])"
  },
  {
    question: "What is the ultimate golden rule of parameterized testing in PyTest?",
    shortAnswer: "Use '@pytest.mark.parametrize' whenever the same logical verification applies to multiple input-output data pairs, boundary conditions, or configuration matrices, keeping test code DRY and reporting granular per-case results.",
    explanation: "The core principle of enterprise data-driven test engineering.",
    hint: "Parametrize identical logic across multiple data pairs instead of copy-pasting tests.",
    level: "basic",
    codeExample: "# Enterprise Data-Driven Testing Standard"
  }
];

export default questions;
