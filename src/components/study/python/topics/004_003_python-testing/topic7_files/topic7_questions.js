// src/components/study/python/topics/004_003_python-testing/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Measuring Code Coverage with coverage.py / pytest-cov

const questions = [
  {
    question: "What is Code Coverage and why is it measured during automated software testing?",
    shortAnswer: "Code coverage is a metric that calculates the percentage of source code executed while running a test suite, helping engineering teams identify untested code paths, dead code, and missing edge cases.",
    explanation: "Code execution measurement during automated testing.",
    hint: "Measures what percentage of your source code is executed when tests run.",
    level: "basic",
    codeExample: "# pytest --cov=src --cov-report=term-missing"
  },
  {
    question: "What is the critical difference between Statement (Line) Coverage and Branch Coverage?",
    shortAnswer: "Statement coverage measures whether each line of code was executed at least once; Branch coverage measures whether every possible decision outcome (both the True AND False branches of every 'if', 'elif', or 'while' condition) was taken.",
    explanation: "Line execution vs full decision path traversal.",
    hint: "Statement coverage checks lines; Branch coverage checks both True and False branches of conditions.",
    level: "basic",
    codeExample: "# pytest --cov=src --cov-branch"
  },
  {
    question: "Why can 100% Statement (Line) Coverage give developers a false sense of security?",
    shortAnswer: "100% line coverage only proves that every line was executed once; it does NOT prove that assertions were meaningful, that all combination branches were tested, that edge case data was verified, or that exceptions were handled properly.",
    explanation: "The limitation of raw line coverage metrics without assertion quality.",
    hint: "Code can execute without having valid assertions, and line coverage doesn't test both True/False branches.",
    level: "moderate",
    codeExample: "def f(x): return 10/x # Line executed with x=2 (Passes), crashes on x=0!"
  },
  {
    question: "What does the PyTest CLI flag '--cov-report=term-missing' do?",
    shortAnswer: "It displays a terminal table summarizing the total statements, missed statements, and coverage percentage for each file, explicitly listing the exact line numbers (e.g. '14-18, 42') that were never executed.",
    explanation: "Terminal missing line diagnostic reporting.",
    hint: "Lists the exact missing line numbers in the terminal output.",
    level: "basic",
    codeExample: "pytest --cov=src --cov-report=term-missing"
  },
  {
    question: "How do you enforce a minimum coverage quality gate that automatically fails CI builds if coverage drops?",
    shortAnswer: "By adding '--cov-fail-under=<percentage>' (e.g. 'pytest --cov=src --cov-fail-under=85'), which exits with a non-zero exit code if the total coverage is below the specified threshold.",
    explanation: "Automated CI/CD quality gate enforcement.",
    hint: "Use --cov-fail-under=85 to fail the test run if coverage is below 85%.",
    level: "basic",
    codeExample: "pytest --cov=src --cov-fail-under=90"
  },
  {
    question: "How do you generate an interactive visual HTML coverage report?",
    shortAnswer: "Run 'pytest --cov=src --cov-report=html', which generates an 'htmlcov/index.html' directory containing color-coded line-by-line interactive source code views.",
    explanation: "HTML visual coverage report generation.",
    hint: "pytest --cov=src --cov-report=html generates an htmlcov directory.",
    level: "basic",
    codeExample: "pytest --cov=src --cov-report=html && open htmlcov/index.html"
  },
  {
    question: "What is '# pragma: no cover' and when should it be used?",
    shortAnswer: "'# pragma: no cover' is an inline comment directive that tells coverage.py to exclude that specific line or block (such as 'def __repr__', abstract methods, or OS-specific fallbacks) from coverage calculations.",
    explanation: "Targeted coverage calculation exclusion.",
    hint: "Add '# pragma: no cover' to lines you want coverage tools to ignore.",
    level: "basic",
    codeExample: "if __name__ == '__main__': # pragma: no cover\n    main()"
  },
  {
    question: "What are common lines that should typically be excluded in '.coveragerc' or 'pyproject.toml'?",
    shortAnswer: "1. '# pragma: no cover', 2. 'def __repr__', 3. 'raise NotImplementedError', 4. 'if __name__ == .__main__.:', 5. 'if TYPE_CHECKING:', and 6. '@overload' signatures.",
    explanation: "Standard exclusion configuration rules for clean coverage reports.",
    hint: "repr methods, type checking guards, main blocks, and NotImplementedErrors.",
    level: "moderate",
    codeExample: "[tool.coverage.report]\nexclude_lines = ['pragma: no cover', 'if __name__ == .__main__.:']"
  },
  {
    question: "Where is coverage configuration typically stored in modern Python projects?",
    shortAnswer: "Inside 'pyproject.toml' under the '[tool.coverage.run]' and '[tool.coverage.report]' tables (or in a legacy '.coveragerc' file).",
    explanation: "Configuration file locations for coverage.py.",
    hint: "Inside pyproject.toml under [tool.coverage] or in .coveragerc.",
    level: "basic",
    codeExample: "# pyproject.toml\n[tool.coverage.run]\nbranch = true\nsource = ['src']"
  },
  {
    question: "What is the difference between including vs omitting the '--cov-branch' flag?",
    shortAnswer: "Without '--cov-branch', coverage.py measures only statement (line) coverage; with '--cov-branch', it analyzes both statement coverage and branch decision permutations, reporting missed branch jumps.",
    explanation: "Enabling strict branch decision coverage.",
    hint: "--cov-branch forces coverage to evaluate whether all True/False branches were tested.",
    level: "moderate",
    codeExample: "pytest --cov=src --cov-branch"
  },
  {
    question: "How do you exclude test files themselves from being counted in code coverage?",
    shortAnswer: "By targeting only the application source directory (e.g. '--cov=src' or 'source = [\"src\"]' in config), ensuring test files under 'tests/' are not counted as application code.",
    explanation: "Source directory targeting for accurate coverage calculations.",
    hint: "Set --cov=src so only source application code is measured, not tests.",
    level: "basic",
    codeExample: "pytest --cov=src # Measures only files in src/"
  },
  {
    question: "What happens when multiple test jobs run in parallel (e.g. with pytest-xdist)?",
    shortAnswer: "Each parallel worker generates its own coverage data file (e.g. '.coverage.worker1'); the 'coverage combine' command merges them together into a single unified coverage report.",
    explanation: "Parallel test coverage aggregation with coverage combine.",
    hint: "Use 'coverage combine' to merge parallel coverage data files.",
    level: "complex",
    codeExample: "pytest -n auto --cov=src && coverage combine"
  },
  {
    question: "What is an acceptable / realistic target code coverage percentage for enterprise systems?",
    shortAnswer: "Typically 80% to 90% for business logic and core libraries; striving for 100% often yields diminishing returns as teams write brittle tests for trivial boilerplate rather than testing complex domain edge cases.",
    explanation: "Pragmatic coverage targets and diminishing returns.",
    hint: "80% to 90% is industry standard; 100% on trivial getters often wastes time.",
    level: "moderate",
    codeExample: "# 85% is a healthy, robust enterprise quality gate"
  },
  {
    question: "What does a partial branch coverage indicator (e.g. yellow highlight in HTML report) mean?",
    shortAnswer: "It indicates that the line containing the 'if' condition was executed, but only one of its branches was taken (e.g. the condition was always True in tests, and never False).",
    explanation: "Partial branch execution diagnostics in coverage reports.",
    hint: "Means the condition was tested for True, but never tested for False.",
    level: "moderate",
    codeExample: "# 'if score >= 90:' was tested with score=95, but never score=70"
  },
  {
    question: "How do you run coverage directly using Python's standard CLI without pytest-cov?",
    shortAnswer: "Run: 'coverage run -m pytest' followed by 'coverage report -m' (or 'coverage html').",
    explanation: "Standalone coverage.py CLI execution workflow.",
    hint: "coverage run -m pytest && coverage report -m",
    level: "basic",
    codeExample: "coverage run -m pytest && coverage report -m"
  },
  {
    question: "How can high code coverage hide concurrency bugs or race conditions?",
    shortAnswer: "Coverage only tracks that code lines were traversed sequentially; it does not test thread interleaving, deadlock hazards, or race condition permutations during concurrent execution.",
    explanation: "Limitations of coverage metrics regarding asynchronous/concurrency bugs.",
    hint: "Coverage tests lines executed sequentially, not concurrent thread race conditions.",
    level: "moderate",
    codeExample: "# Concurrency locks require specialized stress/load tests"
  },
  {
    question: "What is 'Mutation Testing' and how does it complement Code Coverage?",
    shortAnswer: "Mutation testing (e.g. with 'mutmut') injects subtle bugs/mutations into your source code and checks if your test suite catches them ('kills the mutants'), verifying whether assertions are actually effective rather than just executing lines.",
    explanation: "Mutation testing as a quality check on test assertions.",
    hint: "Mutates source code to verify that test assertions actually catch bugs.",
    level: "complex",
    codeExample: "mutmut run # Tests assertion strength by mutating source code"
  },
  {
    question: "How do you ignore specific files (like migrations or auto-generated code) in coverage reports?",
    shortAnswer: "By configuring 'omit = [\"*/migrations/*\", \"*/generated/*\"]' inside the '[tool.coverage.run]' configuration table.",
    explanation: "File pattern omission in coverage configuration.",
    hint: "Add omit patterns like omit = ['*/migrations/*'] in pyproject.toml.",
    level: "basic",
    codeExample: "[tool.coverage.run]\nomit = ['*/migrations/*', '*/__init__.py']"
  },
  {
    question: "What does the 'Stmts', 'Miss', and 'Cover' columns represent in pytest-cov output?",
    shortAnswer: "'Stmts' is the total executable statements; 'Miss' is the count of statements not executed; 'Cover' is the computed percentage formula: ((Stmts - Miss) / Stmts) * 100.",
    explanation: "Mathematical formula and column definitions in coverage tables.",
    hint: "Stmts = Total, Miss = Unexecuted, Cover = ((Stmts-Miss)/Stmts)*100%.",
    level: "basic",
    codeExample: "# Name: billing.py | Stmts: 100 | Miss: 10 | Cover: 90%"
  },
  {
    question: "What is the ultimate golden rule of Code Coverage in professional software engineering?",
    shortAnswer: "Treat coverage as a diagnostic tool to find untested blind spots rather than a target to game; combine 85%+ branch coverage with strong assertion testing, negative exception validation, and property-based testing.",
    explanation: "The complete enterprise code coverage philosophy.",
    hint: "Use coverage to find blind spots, not to game vanity 100% metrics.",
    level: "basic",
    codeExample: "# Enterprise Code Coverage Standard"
  }
];

export default questions;
