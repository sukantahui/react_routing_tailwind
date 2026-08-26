// src/components/study/python/topics/005_004_turtle-modular/topic5_files/topic5_questions.js

const questions = [
  {
    question: "What does the DRY principle stand for and why is it essential?",
    shortAnswer: "'Don't Repeat Yourself' — every piece of knowledge or visual logic must have a single authoritative representation.",
    explanation: "Eliminating copy-pasted code makes software maintainable, extensible, and less prone to regression bugs.",
    hint: "What acronym states that logic should never be duplicated?",
    level: "basic",
    codeExample: "# DRY: Define draw_house() once, call it 10 times"
  },
  {
    question: "What is the Single Responsibility Principle (SRP) in graphical programming?",
    shortAnswer: "Every function should have exactly one job (e.g. `draw_window` draws only a window, `draw_chimney` draws only a chimney).",
    explanation: "Small, focused functions are easier to compose, test, and reuse.",
    hint: "What principle states a function should do only one specific task?",
    level: "basic",
    codeExample: "# draw_window, draw_door, draw_roof"
  },
  {
    question: "What is Data-Driven Graphics Architecture?",
    shortAnswer: "Separating the scene data (coordinates, dimensions, colors) from the rendering algorithm functions.",
    explanation: "Allows modifying or importing entire new levels and scenes from JSON files without touching Python rendering code.",
    hint: "What pattern separates coordinate data from drawing code?",
    level: "moderate",
    codeExample: "for item in SCENE_DATA:\n    render_shape(t, item)"
  },
  {
    question: "How does DRY refactoring reduce codebase size in Turtle graphics?",
    shortAnswer: "Replacing repetitive copy-pasted movement commands with parameterized helper functions typically shrinks code by 60% to 80%.",
    explanation: "Parameterized loops eliminate hundreds of redundant lines.",
    hint: "How much code reduction is typical when refactoring copy-pasted Turtle scripts?",
    level: "basic",
    codeExample: "# 500 lines of spaghetti -> 40 lines of clean DRY code"
  },
  {
    question: "How do you define configuration constants properly in Python?",
    shortAnswer: "Use UPPERCASE identifiers at the top of the file (e.g. `DEFAULT_BG_COLOR = '#020617'`).",
    explanation: "PEP 8 conventions dictate uppercase naming for global configuration constants.",
    hint: "What naming convention indicates a global configuration constant?",
    level: "basic",
    codeExample: "SCREEN_WIDTH = 800\nDEFAULT_PAGESIZE = 2"
  },
  {
    question: "How do you unit test a graphical invariant in Python Turtle?",
    shortAnswer: "Record `t.pos()` and `t.heading()`, run the drawing function, and `assert t.pos() == initial_pos`.",
    explanation: "Automated assertion testing ensures functions leave zero side effects on the environment.",
    hint: "How do you verify state restoration with Python assertions?",
    level: "moderate",
    codeExample: "assert t.position() == initial_pos"
  },
  {
    question: "Why should magic numbers (e.g. `t.forward(137.4)`) be avoided inside code bodies?",
    shortAnswer: "Magic numbers obscure geometric intent and make global scaling adjustments painful.",
    explanation: "Replacing magic numbers with named parameters or constants clarifies code semantics.",
    hint: "Why should hardcoded literal numbers be replaced with named constants?",
    level: "basic",
    codeExample: "# BAD: t.forward(137.4)\n# GOOD: t.forward(GOLDEN_RATIO_STEP)"
  },
  {
    question: "What is Type Hinting in Python and how does it benefit Turtle drawing functions?",
    shortAnswer: "Adding type annotations (e.g. `t: turtle.Turtle, x: float, y: float`) to improve IDE autocomplete and type safety.",
    explanation: "Type annotations clarify expected input types and catch type mismatch errors early.",
    hint: "What Python feature adds type annotations to function parameters?",
    level: "moderate",
    codeExample: "def draw_circle(t: turtle.Turtle, x: float, y: float, radius: float) -> None:"
  },
  {
    question: "How do Docstrings adhere to clean code standards?",
    shortAnswer: "By clearly explaining what the function draws, its anchor position, required parameters, and return types.",
    explanation: "Standardized docstrings turn individual scripts into professional, self-documenting libraries.",
    hint: "What format provides inline multi-line function documentation?",
    level: "basic",
    codeExample: '"""Draws a regular polygon anchored at (x,y)."""'
  },
  {
    question: "What is Code Smells in graphics programming?",
    shortAnswer: "Subtle indicators of poor design (e.g. functions over 100 lines long, hardcoded coordinates, deeply nested loops).",
    explanation: "Identifying code smells signals when refactoring is needed.",
    hint: "What term describes symptoms of poorly structured code?",
    level: "moderate",
    codeExample: "# Code smell: 20 consecutive penup/goto calls"
  },
  {
    question: "How do you refactor a 10-house neighborhood script to be 100% DRY?",
    shortAnswer: "Create `draw_house(t, x, y, size, wall, roof)`, store 10 house dicts in a list, and iterate with a `for` loop.",
    explanation: "Combining a parameterized function with a coordinate list is the classic DRY refactoring pattern.",
    hint: "What 2 elements replace 10 copy-pasted houses?",
    level: "basic",
    codeExample: "for h in houses:\n    draw_house(t, **h)"
  },
  {
    question: "Why should drawing functions avoid performing console I/O (`print()`)?",
    shortAnswer: "Separation of concerns: drawing functions should focus strictly on graphical rendering, not terminal output.",
    explanation: "Mixing console logging into tight graphics routines degrades performance and couples concerns.",
    hint: "Why should graphical helpers avoid console print calls?",
    level: "moderate",
    codeExample: "# Keep drawing pure without print() statements"
  },
  {
    question: "What is the Open/Closed Principle (OCP) in graphics libraries?",
    shortAnswer: "Software entities should be open for extension (adding new shapes) but closed for modification (existing shapes unchanged).",
    explanation: "Adding `draw_hexagon` should not require modifying `draw_square` or breaking client applications.",
    hint: "Which SOLID principle encourages adding new shapes without altering existing ones?",
    level: "advanced",
    codeExample: "# Add new draw_star() without touching draw_circle()"
  },
  {
    question: "How does PEP 8 guide Python code formatting in graphical projects?",
    shortAnswer: "Standardizes 4-space indentation, snake_case function names, UPPERCASE constants, and 79-character line limits.",
    explanation: "PEP 8 ensures consistent, readable style across open-source and team projects.",
    hint: "What is the official style guide for Python code?",
    level: "basic",
    codeExample: "# PEP 8: def draw_house(t, x, y):"
  },
  {
    question: "What is Dead Code and why should it be purged during refactoring?",
    shortAnswer: "Unused functions or commented-out old drawing commands that clutter the codebase and confuse maintainers.",
    explanation: "Removing dead code keeps the repository lean, readable, and maintainable.",
    hint: "What do you call unused or commented-out legacy code?",
    level: "basic",
    codeExample: "# Delete commented-out legacy drawing routines"
  },
  {
    question: "How can dictionary unpacking `**kwargs` be used in data-driven graphics pipelines?",
    shortAnswer: "`draw_shape(t, **node_data)` forwards dictionary key-value pairs directly as keyword arguments.",
    explanation: "Dictionary unpacking cleanly maps JSON data structures to Python function signatures.",
    hint: "What syntax unpacks a dictionary into function keyword arguments?",
    level: "moderate",
    codeExample: "draw_house(t, **house_dict)"
  },
  {
    question: "Why is Cyclomatic Complexity dangerous in drawing algorithms?",
    shortAnswer: "Too many nested `if`/`else` and loop branches make drawing logic nearly impossible to test and debug.",
    explanation: "Refactoring complex branches into smaller helper functions reduces cyclomatic complexity.",
    hint: "What metric measures the number of decision branches in a function?",
    level: "advanced",
    codeExample: "# Keep function cyclomatic complexity < 5"
  },
  {
    question: "How do you refactor deeply nested loops drawing a matrix grid of tiles?",
    shortAnswer: "Extract the inner tile drawing logic into `draw_single_tile(t, x, y)` and keep the double loop purely for coordinate generation.",
    explanation: "Separating loop iteration from tile rendering makes both units simple and testable.",
    hint: "How do you simplify nested grid loops?",
    level: "moderate",
    codeExample: "for r in range(N):\n    for c in range(M): draw_tile(t, r*dx, c*dy)"
  },
  {
    question: "What is the Law of Demeter (Principle of Least Knowledge) in modular graphics?",
    shortAnswer: "A drawing function should only know about its immediate inputs (`t, x, y, size`), not global screen internals.",
    explanation: "Minimizing external dependencies makes components truly decoupled and portable.",
    hint: "What principle states components should only know their direct parameters?",
    level: "advanced",
    codeExample: "# Depend only on t and passed arguments"
  },
  {
    question: "How do you create a self-contained Python package that can be installed with `pip install .`?",
    shortAnswer: "Include a `pyproject.toml` or `setup.py` defining package metadata, entry points, and dependencies.",
    explanation: "Packaging standardizes library distribution across the global Python ecosystem.",
    hint: "What configuration file standardizes modern Python package builds?",
    level: "advanced",
    codeExample: "# pyproject.toml"
  },
  {
    question: "Why should functions return early (`guard clauses`) when given invalid parameters?",
    shortAnswer: "Guard clauses eliminate deeply indented `if/else` ladders and catch invalid inputs immediately.",
    explanation: "Early returns make the primary drawing pathway clean, linear, and readable.",
    hint: "What programming pattern returns immediately upon detecting invalid inputs?",
    level: "moderate",
    codeExample: "if size <= 0: return\n# Primary drawing code..."
  },
  {
    question: "How do you measure code readability in Python projects?",
    shortAnswer: "Using linters like Flake8, Ruff, and Black to enforce consistent formatting and cognitive simplicity.",
    explanation: "Automated tooling enforces professional code quality standards automatically.",
    hint: "What tools automatically enforce Python style and quality?",
    level: "basic",
    codeExample: "# ruff check . / black --check ."
  },
  {
    question: "What is the Boy Scout Rule in software engineering?",
    shortAnswer: "'Always leave the codebase cleaner than you found it.'",
    explanation: "Continuous incremental refactoring prevents technical debt accumulation over time.",
    hint: "What rule encourages making code cleaner every time you edit it?",
    level: "basic",
    codeExample: "# Refactor messy functions when making enhancements"
  },
  {
    question: "How can list comprehensions replace verbose coordinate generation loops?",
    shortAnswer: "`coords = [(x, math.sin(x)*50) for x in range(-200, 200, 10)]` generates points cleanly in one line.",
    explanation: "List comprehensions express mathematical coordinate series with high clarity and execution speed.",
    hint: "What one-line Python syntax generates coordinate lists concisely?",
    level: "moderate",
    codeExample: "pts = [(i*20, i*15) for i in range(10)]"
  },
  {
    question: "Why should helper functions be marked as private with a leading underscore `_helper()`?",
    shortAnswer: "To signal to consumers that the function is an internal implementation detail and not part of the public API.",
    explanation: "PEP 8 convention uses `_` to denote non-public internal helpers.",
    hint: "What prefix indicates a function is private in Python?",
    level: "moderate",
    codeExample: "def _calculate_roof_vertex(x, y, w, h):"
  },
  {
    question: "How does functional immutability improve data-driven graphics pipelines?",
    shortAnswer: "Ensures the renderer never modifies the original scene data dictionaries during rendering passes.",
    explanation: "Immutability prevents subtle data corruption bugs across multiple frame redraws.",
    hint: "Why should rendering functions avoid mutating input data?",
    level: "advanced",
    codeExample: "# Treat input dictionaries as read-only"
  },
  {
    question: "What is a Pure Function in graphics programming?",
    shortAnswer: "A function whose output depends strictly on its arguments and causes no observable side effects outside its canvas target.",
    explanation: "Pure functions are deterministic, thread-safe, and effortlessly testable.",
    hint: "What term describes deterministic functions with zero side effects?",
    level: "advanced",
    codeExample: "# Pure: f(x) always produces identical geometry without side effects"
  },
  {
    question: "How do you document side effects if a function intentionally alters turtle state?",
    shortAnswer: "Explicitly highlight state modifications in the docstring under a `Side Effects:` section.",
    explanation: "Clear documentation ensures callers are never surprised by state mutations.",
    hint: "Where should intentional state alterations be documented?",
    level: "basic",
    codeExample: '"""Side Effects: Leaves turtle heading at 45 degrees."""'
  },
  {
    question: "What is the ultimate 5-step checklist for Clean Code and DRY Refactoring in Turtle Graphics?",
    shortAnswer: "1. Eliminate copy-paste | 2. Single Responsibility per function | 3. Separate data from rendering | 4. Add type hints and docstrings | 5. Test state invariants.",
    explanation: "Applying this 5-step framework transforms beginner spaghetti scripts into production-ready software.",
    hint: "What 5 steps guarantee clean, DRY graphical architecture?",
    level: "basic",
    codeExample: "# 1. DRY | 2. SRP | 3. Data-driven | 4. Docs | 5. Test Invariants"
  },
  {
    question: "Why is mastering modular graphics with clean code essential for professional Python careers?",
    shortAnswer: "Because the same principles of modularity, abstraction, SRP, and DRY power enterprise web backends, data engineering pipelines, and game engines.",
    explanation: "Turtle graphics provides a visual playground to master professional software engineering fundamentals.",
    hint: "How does clean graphics coding translate to real-world software careers?",
    level: "basic",
    codeExample: "# Clean code fundamentals apply across all software domains"
  }
];

export default questions;
