// src/components/study/python/topics/005_004_turtle-modular/topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is Turtle State Pollution?",
    shortAnswer: "When a helper function modifies position, heading, or pen attributes without restoring them, breaking subsequent caller drawing.",
    explanation: "Unrestored mutations cause unpredictable side effects in complex scenes.",
    hint: "What do you call unintended side effects left behind by a drawing function?",
    level: "basic",
    codeExample: "# Unrestored heading causes subsequent lines to be skewed"
  },
  {
    question: "Which methods return the turtle's current position, heading, and pen status?",
    shortAnswer: "`t.position()` (or `t.pos()`), `t.heading()`, and `t.isdown()`.",
    explanation: "These getter methods inspect the current kinematic state of the turtle.",
    hint: "What three methods read position, angle, and pen contact?",
    level: "basic",
    codeExample: "pos = t.pos()\nhead = t.heading()\nis_down = t.isdown()"
  },
  {
    question: "Why must `t.penup()` be called when returning to a saved position `t.goto(saved_pos)`?",
    shortAnswer: "To prevent drawing an unwanted return stroke line across the canvas when moving back.",
    explanation: "Moving the turtle back to its saved anchor while the pen is down leaves a visible streak.",
    hint: "How do you prevent visible streaks during state restoration?",
    level: "basic",
    codeExample: "t.penup()\nt.goto(saved_pos)\nif saved_down: t.pendown()"
  },
  {
    question: "How does Python's `contextlib.contextmanager` simplify Turtle state preservation?",
    shortAnswer: "It allows wrapping drawing code inside a `with preserve_turtle(t):` block, guaranteeing cleanup via the `finally` block.",
    explanation: "Context managers guarantee state restoration even if exceptions or early returns occur.",
    hint: "What Python feature enables the `with` statement for automatic cleanup?",
    level: "moderate",
    codeExample: "with preserve_turtle(t):\n    t.left(45)\n    t.forward(50)"
  },
  {
    question: "What is a State Stack in recursive graphics programming?",
    shortAnswer: "A Last-In, First-Out (LIFO) list where turtle state tuples are pushed before branching and popped after returning.",
    explanation: "State stacks enable arbitrary-depth recursive structures like fractal trees and L-systems.",
    hint: "What data structure manages nested recursive snapshots?",
    level: "advanced",
    codeExample: "stack.append((t.pos(), t.heading()))\n# ... branch ...\npos, head = stack.pop()"
  },
  {
    question: "Which getter methods read the turtle's current pen and fill colors?",
    shortAnswer: "`t.pencolor()` and `t.fillcolor()` (or `t.color()`).",
    explanation: "Calling `color()` without arguments returns `(pencolor, fillcolor)` as strings or tuples.",
    hint: "What getter returns current stroke and fill colors?",
    level: "basic",
    codeExample: "pen_col, fill_col = t.color()"
  },
  {
    question: "How do you read the current stroke width in Turtle graphics?",
    shortAnswer: "`t.pensize()` (or `t.width()`).",
    explanation: "Calling `pensize()` without arguments returns the current integer stroke width in pixels.",
    hint: "What method retrieves current line thickness?",
    level: "basic",
    codeExample: "current_size = t.pensize()"
  },
  {
    question: "Why is stack-based state management preferred over calculating manual return steps `backward()` / `right()` in fractal trees?",
    shortAnswer: "Because floating-point trigonometric rounding errors accumulate over deep recursion, causing the turtle to drift off-target.",
    explanation: "`goto(saved_pos)` is mathematically exact and immune to accumulated float errors.",
    hint: "Why does t.backward() drift compared to t.goto(saved_pos)?",
    level: "advanced",
    codeExample: "# Exact restore: t.goto(saved_pos)"
  },
  {
    question: "What is an Invariant in computer graphics programming?",
    shortAnswer: "A condition that remains true before and after a function executes (e.g. 'turtle returns to starting pos and heading').",
    explanation: "Establishing state invariants makes drawing functions robust, predictable, and composable.",
    hint: "What term describes a state property guaranteed to remain unchanged?",
    level: "advanced",
    codeExample: "# Invariant: Function leaves turtle exactly where it started"
  },
  {
    question: "How does the `try...finally` block in a context manager protect against state leakage?",
    shortAnswer: "The `finally` block executes unconditionally, ensuring state is restored even if an error occurs inside the `with` body.",
    explanation: "`finally` guarantees cleanup execution under all execution circumstances.",
    hint: "Why does `finally` guarantee state restoration?",
    level: "moderate",
    codeExample: "try:\n    yield t\nfinally:\n    # restore state guaranteed"
  },
  {
    question: "How can you snapshot all Turtle attributes into a Python dictionary?",
    shortAnswer: "Store keys for `'pos'`, `'heading'`, `'isdown'`, `'color'`, `'pensize'`, and `'visible'` in a dict.",
    explanation: "A dictionary snapshot packages complete turtle state into a clean, serializable structure.",
    hint: "How can you store comprehensive turtle state in a single variable?",
    level: "moderate",
    codeExample: "snapshot = {'pos': t.pos(), 'head': t.heading(), 'size': t.pensize()}"
  },
  {
    question: "What happens if a recursive function pops from an empty state stack?",
    shortAnswer: "An `IndexError: pop from empty list` exception is raised.",
    explanation: "Stack operations must ensure matching pairs of push and pop calls.",
    hint: "What error occurs when popping an empty list?",
    level: "moderate",
    codeExample: "if stack:\n    state = stack.pop()"
  },
  {
    question: "How do L-Systems (Lindenmayer Systems) use '[' and ']' characters for state preservation?",
    shortAnswer: "'[' corresponds to `push_state()`, and ']' corresponds to `pop_state()`.",
    explanation: "L-Systems use bracket notation to generate complex botanical and fractal models.",
    hint: "What do brackets signify in Turtle L-System grammars?",
    level: "expert",
    codeExample: "# '[' -> push_state | ']' -> pop_state"
  },
  {
    question: "Why should visibility status `t.isvisible()` also be preserved in general-purpose utilities?",
    shortAnswer: "So that if a helper temporarily shows or hides the turtle cursor, the caller's visibility preference is respected.",
    explanation: "Complete state preservation includes visual sprite visibility.",
    hint: "What getter returns whether the turtle cursor is currently visible?",
    level: "moderate",
    codeExample: "was_visible = t.isvisible()"
  },
  {
    question: "How do you preserve speed setting `t.speed()` across functions?",
    shortAnswer: "Read `current_speed = t.speed()`, perform time-critical drawing, and restore `t.speed(current_speed)`.",
    explanation: "Calling `speed()` without parameters returns the active integer speed level (0-10).",
    hint: "How do you read current animation speed in Turtle?",
    level: "moderate",
    codeExample: "spd = t.speed()\n# ... draw ...\nt.speed(spd)"
  },
  {
    question: "How does state preservation enable drawing concentric multi-layered emblems easily?",
    shortAnswer: "The turtle returns to the exact center anchor after drawing each outer ring, ready to draw the next inner ring.",
    explanation: "Returning to origin center anchor prevents manual recentering calculations between layers.",
    hint: "How does resetting to center anchor simplify concentric shapes?",
    level: "basic",
    codeExample: "for r in [80, 60, 40, 20]:\n    with preserve_turtle(t): draw_ring(t, r)"
  },
  {
    question: "What is the computational cost of saving and restoring turtle state?",
    shortAnswer: "Virtually zero (a few microsecond dictionary/tuple allocations).",
    explanation: "State restoration overhead is negligible compared to screen rendering time.",
    hint: "Is saving turtle state CPU-expensive?",
    level: "basic",
    codeExample: "# Negligible microsecond overhead"
  },
  {
    question: "How do you restore colors when `colormode(255)` vs `colormode(1.0)` is used?",
    shortAnswer: "Turtle's `pencolor()` returns a format matching the active `colormode()`, allowing direct restoration.",
    explanation: "Passing the captured color tuple directly to `t.color()` works seamlessly in either color mode.",
    hint: "Does pencolor() preserve the active colormode format?",
    level: "moderate",
    codeExample: "t.color(saved_pencolor, saved_fillcolor)"
  },
  {
    question: "What is the difference between local state restoration and global canvas reset `screen.reset()`?",
    shortAnswer: "Local restoration resets a single turtle's pose without erasing the screen; `screen.reset()` wipes all drawings and all turtles.",
    explanation: "State preservation preserves existing canvas artwork while resetting the pen cursor.",
    hint: "Which reset preserves existing drawings on screen?",
    level: "basic",
    codeExample: "# Local restore: preserves canvas | screen.reset(): wipes canvas"
  },
  {
    question: "How can decorators `@preserve_state` be used to automatically wrap drawing functions in Python?",
    shortAnswer: "A decorator captures state before calling `func(t, *args, **kwargs)` and restores state in a `finally` block.",
    explanation: "Function decorators provide clean declarative state preservation without boilerplate inside function bodies.",
    hint: "What Python feature uses '@' syntax to wrap functions automatically?",
    level: "expert",
    codeExample: "@preserve_state\ndef draw_ornament(t, x, y): ..."
  },
  {
    question: "Why should `t.tiltangle()` be tracked in 3D-like turtle extensions?",
    shortAnswer: "Because custom turtle cursor shapes can have independent tilt angles that alter drawing projections.",
    explanation: "Tilt angles control shape transformation matrices in advanced extensions.",
    hint: "What method tracks cursor polygon tilt angle?",
    level: "expert",
    codeExample: "tilt = t.tiltangle()"
  },
  {
    question: "How do you draw clock hour marks around a dial using state preservation?",
    shortAnswer: "For each hour: save state at center, rotate angle, move outward to radius, draw tick mark, restore to center.",
    explanation: "Centroid restoration makes drawing 12 evenly spaced radial tick marks trivial.",
    hint: "How does returning to dial center make drawing clock marks easy?",
    level: "moderate",
    codeExample: "for hr in range(12):\n    with preserve_turtle(t):\n        t.right(hr * 30); t.forward(100); t.dot(6)"
  },
  {
    question: "What is the Golden Rule of Turtle Functional Hygiene?",
    shortAnswer: "Leave the turtle in the exact state you found it, or explicitly document why the state was moved.",
    explanation: "Strict functional hygiene prevents bugs in collaborative and multi-module graphic codebases.",
    hint: "What rule governs clean modular graphics state management?",
    level: "basic",
    codeExample: "# Invariant: Zero side-effect state footprint"
  },
  {
    question: "How does state restoration prevent cumulative rotation drift in procedural games?",
    shortAnswer: "By snapping to absolute heading anchors rather than accumulating hundreds of relative `t.left()` turns.",
    explanation: "Restoring absolute heading anchors prevents floating-point angular inaccuracies.",
    hint: "How does restoring saved heading eliminate angular drift?",
    level: "advanced",
    codeExample: "t.setheading(saved_heading)"
  },
  {
    question: "How can you test if a drawing function properly restores state?",
    shortAnswer: "Assert that `t.pos() == initial_pos` and `t.heading() == initial_heading` after calling the function.",
    explanation: "Automated unit tests can verify state preservation by comparing before-and-after snapshots.",
    hint: "How do you unit test state preservation in Python?",
    level: "advanced",
    codeExample: "assert t.pos() == start_pos\nassert t.heading() == start_heading"
  },
  {
    question: "Why is `t.home()` NOT a valid substitute for state restoration?",
    shortAnswer: "`t.home()` resets position to `(0, 0)` and heading to 0°, destroying any intermediate caller position.",
    explanation: "State restoration must return to the *caller's* position, which is rarely `(0, 0)`.",
    hint: "Why is t.home() dangerous inside helper functions?",
    level: "basic",
    codeExample: "# BAD: t.home() -> jumps to (0, 0) and loses caller position"
  },
  {
    question: "How do you manage state when multiple turtles `[t1, t2]` are drawing concurrently?",
    shortAnswer: "Maintain independent state contexts or stacks keyed by each turtle instance.",
    explanation: "Independent state encapsulation prevents cross-turtle state collisions in multi-agent scenes.",
    hint: "How do you isolate state when using multiple turtles?",
    level: "advanced",
    codeExample: "with preserve_turtle(t1): ...\nwith preserve_turtle(t2): ..."
  },
  {
    question: "How do snowflake crystals benefit from recursive branch state preservation?",
    shortAnswer: "Each sub-crystal needle can branch out at 60° and restore to the main arm without manual back-tracing.",
    explanation: "State preservation enables symmetric hexagonal crystal fractal growth.",
    hint: "How does state restoration create intricate snowflake branches?",
    level: "moderate",
    codeExample: "with preserve_turtle(t): t.left(60); t.forward(20)"
  },
  {
    question: "What is the 4-step checklist for building a zero-side-effect drawing function?",
    shortAnswer: "1. Capture state | 2. Execute drawing | 3. Move pen up before return | 4. Restore position, heading, colors, and pen status.",
    explanation: "Applying this 4-step framework guarantees bug-free composability across large projects.",
    hint: "What 4 steps guarantee zero-side-effect drawing functions?",
    level: "basic",
    codeExample: "# 1. save | 2. draw | 3. penup | 4. restore"
  },
  {
    question: "What Python standard library module provides `@contextmanager`?",
    shortAnswer: "`contextlib`.",
    explanation: "`from contextlib import contextmanager` allows creating lightweight Pythonic context managers easily.",
    hint: "Which standard module defines the @contextmanager decorator?",
    level: "basic",
    codeExample: "from contextlib import contextmanager"
  }
];

export default questions;
