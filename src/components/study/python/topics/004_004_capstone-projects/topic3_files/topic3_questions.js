// src/components/study/python/topics/004_004_capstone-projects/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Writing complete documentation (README.md, docstrings, typing hints)

const questions = [
  {
    question: "What are the primary sections of a standard Google-Style Python docstring (PEP 257)?",
    shortAnswer: "1. One-line summary, 2. Extended description, 3. 'Args:' (parameter names, types, descriptions), 4. 'Returns:' (return type and description), 5. 'Raises:' (exceptions and trigger conditions), and 6. 'Examples:' (interactive doctests).",
    explanation: "Standard Google Python docstring sections.",
    hint: "Summary, Args, Returns, Raises, and Examples.",
    level: "basic",
    codeExample: '"""One-line summary.\n\nArgs:\n    sid: Student ID.\n\nReturns:\n    StudentProfile.\n"""'
  },
  {
    question: "What is a 'doctest' in Python and how do you execute it?",
    shortAnswer: "Doctests are interactive Python REPL sessions embedded directly within function docstrings (using '>>>'); running 'python -m doctest module.py' or 'pytest --doctest-modules' verifies that the code examples in documentation execute correctly without errors.",
    explanation: "Self-testing documentation using Python's doctest module.",
    hint: "Embeds '>>>' sessions in docstrings and tests them with python -m doctest.",
    level: "basic",
    codeExample: '"""\nExamples:\n    >>> add(2, 3)\n    5\n"""'
  },
  {
    question: "What are the advantages of adding PEP 484 static type hints to Python codebases?",
    shortAnswer: "Type hints provide instant IDE autocompletion, enable automated static error detection with Mypy before runtime, serve as self-enforcing documentation, and dramatically improve code maintainability during large refactorings.",
    explanation: "Static typing benefits in dynamic Python.",
    hint: "Enables IDE autocomplete, Mypy bug catching before runtime, and self-documenting code.",
    level: "basic",
    codeExample: "def calculate_fee(base: float, discount: float = 0.0) -> float:"
  },
  {
    question: "What is 'typing.Protocol' (Structural Subtyping / Static Duck Typing) introduced in PEP 544?",
    shortAnswer: "'Protocol' allows defining an interface based on expected methods and attributes; any class that implements those methods is automatically considered a valid subtype by Mypy without requiring explicit inheritance.",
    explanation: "Structural subtyping via Protocol vs nominal subclassing.",
    hint: "Allows static duck typing: if it has the required methods, it satisfies the Protocol without subclassing.",
    level: "complex",
    codeExample: "class Renderable(Protocol):\n    def render(self) -> str: ..."
  },
  {
    question: "What are the essential sections every professional GitHub 'README.md' must contain?",
    shortAnswer: "1. Project Title & Status Badges, 2. Value Proposition (What it does & why it matters), 3. Key Features list, 4. Installation Quickstart ('pip install -e .'), 5. Usage Code Examples, 6. Running Tests ('pytest --cov'), 7. Architecture Overview, and 8. License.",
    explanation: "Standard structure of a professional open-source README.",
    hint: "Title/badges, description, installation, usage examples, testing guide, and license.",
    level: "basic",
    codeExample: "# Institutional Manager\n[![CI](...)]\n\n## Quickstart\n```bash\npip install -e .\n```"
  },
  {
    question: "What is the modern Python 3.10+ union syntax compared to legacy 'typing.Union'?",
    shortAnswer: "Python 3.10+ uses the pipe operator '|' (e.g. 'str | None', 'int | float') instead of 'Union[str, None]' and 'Optional[str]'.",
    explanation: "PEP 604 union syntax via the pipe operator.",
    hint: "Use 'str | None' instead of 'Optional[str]' or 'Union[str, None]'.",
    level: "basic",
    codeExample: "def find_student(sid: str) -> Student | None:"
  },
  {
    question: "What does 'typing.Literal' represent and when should it be used?",
    shortAnswer: "'Literal' restricts a type to an exact set of predefined literal values (e.g. 'Literal[\"Barrackpore\", \"Kolkata\", \"Ichapur\"]'), providing compile-time validation for fixed strings or constants.",
    explanation: "Literal type constraints in static typing.",
    hint: "Restricts arguments to exact specific literal values like 'Literal[\"GET\", \"POST\"]'.",
    level: "moderate",
    codeExample: "CampusType = Literal['Barrackpore', 'Kolkata', 'Ichapur']"
  },
  {
    question: "What is the difference between 'typing.TypeVar' and concrete types in generic programming?",
    shortAnswer: "'TypeVar' is a type variable used in generic functions or classes to declare that an input type and output type are linked (e.g. 'def first(items: list[T]) -> T:'), preserving exact type information across transformations.",
    explanation: "Generic type parameters via TypeVar.",
    hint: "T = TypeVar('T') preserves the exact type across function inputs and outputs.",
    level: "moderate",
    codeExample: "T = TypeVar('T')\ndef get_first(items: list[T]) -> T: return items[0]"
  },
  {
    question: "What is the Diátaxis documentation framework and what are its 4 distinct quadrants?",
    shortAnswer: "1. Tutorials (learning-oriented for beginners), 2. How-To Guides (problem-oriented step-by-step solutions), 3. Reference (information-oriented technical specs and API docs), and 4. Explanation (understanding-oriented architectural concepts).",
    explanation: "The Diátaxis documentation architecture.",
    hint: "Tutorials, How-To Guides, Technical Reference, and Conceptual Explanation.",
    level: "moderate",
    codeExample: "# Diátaxis Framework organizes documentation into 4 distinct quadrants"
  },
  {
    question: "What does 'mypy --strict' check during automated continuous integration?",
    shortAnswer: "'mypy --strict' enforces maximum type safety by disallowing untyped function definitions, forbidding implicit 'Any', checking optional access (None checks), and enforcing strict generic variance.",
    explanation: "Strict static type verification with Mypy.",
    hint: "Forces all functions to have type hints, forbids untyped Any, and enforces strict None checks.",
    level: "moderate",
    codeExample: "mypy --strict src/"
  },
  {
    question: "What is 'typing.TypedDict' and how does it differ from a standard Python 'dict'?",
    shortAnswer: "'TypedDict' allows type checkers to validate that a dictionary possesses specific string keys with specific value types at compile time, while remaining a regular runtime dictionary with zero performance overhead.",
    explanation: "Type-checked dictionary schemas via TypedDict.",
    hint: "Provides compile-time type checking for dictionary keys and value types.",
    level: "moderate",
    codeExample: "class StudentPayload(TypedDict):\n    sid: str\n    gpa: float"
  },
  {
    question: "How do you generate automated HTML API documentation from Python docstrings?",
    shortAnswer: "Using documentation generators like Sphinx (with 'sphinx-autodoc') or MkDocs (with 'mkdocstrings'), which parse Python docstrings and build static searchable HTML websites.",
    explanation: "Automated API documentation pipelines.",
    hint: "Use Sphinx or MkDocs with mkdocstrings to build static searchable HTML sites.",
    level: "basic",
    codeExample: "# mkdocs.yml with mkdocstrings plugin"
  },
  {
    question: "What is 'typing.Callable' used for in type annotations?",
    shortAnswer: "'Callable[[ArgType1, ArgType2], ReturnType]' annotates higher-order functions that accept or return functions, callbacks, or decorators.",
    explanation: "Function signature typing with Callable.",
    hint: "Annotates callback functions and function parameters: Callable[[int, int], str].",
    level: "moderate",
    codeExample: "def apply_discount(fee: float, strategy: Callable[[float], float]) -> float:"
  },
  {
    question: "What is the purpose of 'typing.overload'?",
    shortAnswer: "'@overload' decorators allow developers to declare multiple type signatures for a single function whose return type depends on the specific types of its arguments, followed by one single runtime implementation.",
    explanation: "Function signature overloading in Python static typing.",
    hint: "Declares different return types depending on input types for IDEs and type checkers.",
    level: "complex",
    codeExample: "@overload\ndef get_val(key: str) -> str: ...\n@overload\ndef get_val(key: int) -> int: ..."
  },
  {
    question: "What is 'typing.Final' and '@final' in Python?",
    shortAnswer: "'Final' prevents a variable or attribute from being reassigned, and '@final' prevents a class from being subclassed or a method from being overridden.",
    explanation: "Immutability and inheritance prevention via Final.",
    hint: "Prevents variables from being reassigned and classes from being inherited.",
    level: "basic",
    codeExample: "MAX_FEE: Final[float] = 50000.0"
  },
  {
    question: "Why should you include Shields.io status badges in your project's README.md?",
    shortAnswer: "Badges provide immediate visual proof of repository health (CI build passing, code coverage %, latest release version, supported Python versions, license type), establishing immediate credibility.",
    explanation: "Repository credibility and visual status indicators.",
    hint: "Visually displays CI status, test coverage %, and supported Python versions at a glance.",
    level: "basic",
    codeExample: "[![Build Status](https://img.shields.io/github/actions/workflow/status/org/repo/ci.yml)]"
  },
  {
    question: "What is 'typing.Self' introduced in Python 3.11 (PEP 673)?",
    shortAnswer: "'Self' represents the current class instance type within method signatures, making fluent method chaining and classmethod factory constructors cleanly typed without manual TypeVar boilerplate.",
    explanation: "Fluent builder typing with Self.",
    hint: "Represents the returning class instance type for method chaining.",
    level: "moderate",
    codeExample: "def set_name(self, name: str) -> Self:\n    self.name = name\n    return self"
  },
  {
    question: "How do you document exceptions that a function is expected to raise?",
    shortAnswer: "Under the 'Raises:' section of the docstring, listing the exact Exception class and the business condition that triggers it.",
    explanation: "Documenting failure modes and exceptions.",
    hint: "Use the 'Raises:' block in docstrings with the exception name and trigger condition.",
    level: "basic",
    codeExample: "Raises:\n    ValueError: If base_fee is negative.\n    StudentNotFoundError: If sid does not exist."
  },
  {
    question: "What is the difference between a docstring and a comment in Python?",
    shortAnswer: "Comments ('#') are ignored by the Python interpreter and intended for internal code notes; docstrings ('\"\"\"...\"\"\"') are retained in memory at runtime as '__doc__' attributes, accessible via 'help()' and documentation generators.",
    explanation: "Runtime introspection of docstrings vs stripped comments.",
    hint: "Docstrings are retained in '__doc__' for help() and tools; comments are ignored.",
    level: "basic",
    codeExample: "print(calculate_fee.__doc__) # Inspect docstring at runtime"
  },
  {
    question: "What is the ultimate golden rule of professional Python documentation and typing?",
    shortAnswer: "Every public function, class, and module must have a PEP 257 Google-style docstring with executable doctests, full PEP 484 static type annotations passing 'mypy --strict', and a clear, badge-decorated GitHub README.",
    explanation: "The complete enterprise Python documentation standard.",
    hint: "Google docstrings + doctests + PEP 484 static typing + mypy strict + clean README.",
    level: "basic",
    codeExample: "# Enterprise Python Documentation Standard"
  }
];

export default questions;
