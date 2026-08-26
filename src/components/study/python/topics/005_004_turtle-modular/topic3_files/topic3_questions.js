// src/components/study/python/topics/005_004_turtle-modular/topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the purpose of creating a dedicated custom shape library module?",
    shortAnswer: "To organize reusable vector drawing functions in a single `.py` file that can be imported across any project.",
    explanation: "Modular libraries eliminate code duplication and create standardized graphical APIs.",
    hint: "Why place drawing functions in a standalone .py file?",
    level: "basic",
    codeExample: "from custom_shapes import draw_gear, draw_shield"
  },
  {
    question: "Why must library modules protect demo code inside `if __name__ == '__main__':`?",
    shortAnswer: "To prevent the showcase window from opening whenever another script imports the library.",
    explanation: "Importing a module executes top-level code; the `__name__` guard ensures silent definitions upon import.",
    hint: "How do you prevent code from executing on import?",
    level: "basic",
    codeExample: "if __name__ == '__main__':\n    main()"
  },
  {
    question: "How do you calculate tooth coordinates when drawing a mechanical gear icon?",
    shortAnswer: "Alternate between outer radius and inner radius at angles `i * (360 / (teeth * 2))`.",
    explanation: "Trigonometric radial alternation creates precise gear teeth profiles.",
    hint: "How do you alternate outer and inner radius for gear teeth?",
    level: "moderate",
    codeExample: "r = outer_r if i % 2 == 0 else inner_r\nx = cx + r * math.cos(rad)"
  },
  {
    question: "How do you construct a smooth cardiovascular heart icon using Turtle primitives?",
    shortAnswer: "Tilt 50°, draw a straight diagonal line, sweep two 200° circle arcs, and return with a symmetric diagonal line.",
    explanation: "Combining linear lines with two symmetric circle arcs forms a classic heart silhouette.",
    hint: "What combinations of lines and circle arcs create a heart shape?",
    level: "moderate",
    codeExample: "t.forward(size); t.circle(r, 200); t.right(140); t.circle(r, 200); t.forward(size)"
  },
  {
    question: "What is API consistency in a graphics library?",
    shortAnswer: "Maintaining identical argument order and parameter naming conventions across all library functions.",
    explanation: "Consistent parameter order (e.g. `t, x, y, size, fill, border`) makes libraries intuitive to learn and use.",
    hint: "Why should all library functions follow identical argument orders?",
    level: "basic",
    codeExample: "draw_gear(t, x, y, ...)\ndraw_shield(t, x, y, ...)"
  },
  {
    question: "How do you draw a rounded pill/capsule badge in Turtle?",
    shortAnswer: "Draw two parallel straight lines connected at the ends by two 180° semi-circular arcs with `extent=180`.",
    explanation: "Two parallel lines capped with semicircles form a smooth rounded pill container.",
    hint: "What geometric parts make up a rounded pill capsule?",
    level: "moderate",
    codeExample: "t.forward(w); t.circle(h/2, 180); t.forward(w); t.circle(h/2, 180)"
  },
  {
    question: "How can you implement a status dictionary for themeable UI components in Python?",
    shortAnswer: "Map status keys (`'success'`, `'danger'`) to tuples of background, border, and text colors.",
    explanation: "Theme dictionaries decouple visual styling from drawing geometry.",
    hint: "How do you map status names to color palettes in Python?",
    level: "moderate",
    codeExample: "themes = {'success': ('#064e3b', '#34d399'), 'danger': ('#881337', '#fb7185')}"
  },
  {
    question: "Why should library drawing functions avoid calling `turtle.done()`?",
    shortAnswer: "`turtle.done()` blocks execution in the event loop; only the top-level main application should control the event lifecycle.",
    explanation: "Library functions must return control immediately to the calling script.",
    hint: "Where should turtle.done() be invoked?",
    level: "basic",
    codeExample: "# Keep turtle.done() strictly in main application entry point"
  },
  {
    question: "How do you draw a sun icon with radiating rays using a custom library function?",
    shortAnswer: "Calculate ray endpoints using polar coordinates `(r, r + ray_len)` at angle intervals `360 / num_rays`.",
    explanation: "Radiating radial lines around a central disc create crisp sun icons.",
    hint: "How are sun rays positioned around a center circle?",
    level: "moderate",
    codeExample: "x2 = cx + (r + ray_len) * math.cos(rad)"
  },
  {
    question: "How do you create a package of multiple shape modules in Python?",
    shortAnswer: "Place the modules in a directory containing an `__init__.py` file.",
    explanation: "`__init__.py` marks the folder as an importable Python package.",
    hint: "What special file turns a folder into a Python package?",
    level: "moderate",
    codeExample: "# graphics/__init__.py"
  },
  {
    question: "What is the benefit of `__all__` in a library module?",
    shortAnswer: "It defines the public export list when a user performs `from module import *`.",
    explanation: "`__all__ = ['draw_gear', 'draw_shield']` encapsulates internal helper functions.",
    hint: "What module variable controls wildcard exports?",
    level: "advanced",
    codeExample: "__all__ = ['draw_gear', 'draw_shield', 'draw_heart']"
  },
  {
    question: "How do you draw a battery charge level indicator with modular library functions?",
    shortAnswer: "Draw an outer rectangular container with terminal nub, then render filled green fill bars proportional to percentage.",
    explanation: "Parameterized fill bars convert numeric telemetry values into intuitive visual gauges.",
    hint: "How is percentage charge rendered in a battery graphic?",
    level: "advanced",
    codeExample: "charge_width = (pct / 100.0) * inner_width"
  },
  {
    question: "Why should anchor conventions (e.g. Center vs Top-Left) be documented in docstrings?",
    shortAnswer: "So consumers know exactly how `(x, y)` aligns relative to the drawn shape boundary.",
    explanation: "Knowing whether (x, y) is the center or corner prevents alignment errors during scene assembly.",
    hint: "Why document the anchor point of a library icon?",
    level: "basic",
    codeExample: '"""Draws a shield anchored at top-center (x, y)."""'
  },
  {
    question: "How do you render a cybersecurity shield badge with an inner checkmark?",
    shortAnswer: "Draw the shield polygon outline with `draw_shield()`, then render a checkmark using `t.goto()` points.",
    explanation: "Composing the shield icon with vector glyphs produces verified trust badges.",
    hint: "How do you add an inner checkmark to a shield?",
    level: "advanced",
    codeExample: "# draw_shield() + inner checkmark path"
  },
  {
    question: "How can you create a cloud icon using overlapping circular arcs?",
    shortAnswer: "Draw a horizontal flat base line, then connect sequential `circle(r, 120)` arcs of varying radii.",
    explanation: "Sequential tangent circle arcs create fluffy cartoon cloud profiles.",
    hint: "How do you create fluffy cloud outlines with Turtle?",
    level: "moderate",
    codeExample: "t.circle(r1, 180); t.circle(r2, 120); t.circle(r3, 120)"
  },
  {
    question: "How do you distribute an icon library across multiple classroom students?",
    shortAnswer: "Save it as `turtle_icons.py` in the shared Python path or project root directory.",
    explanation: "Placing the module in the project root makes `import turtle_icons` work automatically.",
    hint: "Where do you save a module so Python can find it?",
    level: "basic",
    codeExample: "import turtle_icons as icons"
  },
  {
    question: "What is semantic versioning in graphics libraries?",
    shortAnswer: "Labeling releases as `MAJOR.MINOR.PATCH` (e.g. `1.2.0`) to track backwards-compatible features and breaking changes.",
    explanation: "Semantic versioning maintains stability as new shapes and icons are added over time.",
    hint: "What standard version format uses 3 numbers separated by dots?",
    level: "moderate",
    codeExample: "__version__ = '1.2.0'"
  },
  {
    question: "How do you draw a metric card in a telemetry dashboard using library icons?",
    shortAnswer: "Draw a dark rounded rectangle card, render the appropriate library icon at top-left, and print text metrics on the right.",
    explanation: "Modular icon libraries allow rapid assembly of enterprise-style dashboard widgets.",
    hint: "How do you combine background cards, icons, and text in a dashboard?",
    level: "moderate",
    codeExample: "draw_card(t, x, y); draw_shield(t, x+30, y+50); t.write('99.9%')"
  },
  {
    question: "Why should library functions avoid hardcoding specific font names?",
    shortAnswer: "Different operating systems (Windows, macOS, Linux) have different available system fonts.",
    explanation: "Using standard cross-platform fonts (e.g. Arial, Helvetica, Courier) prevents rendering failures.",
    hint: "Why use standard fonts in cross-platform libraries?",
    level: "moderate",
    codeExample: "font=('Arial', 10, 'normal')"
  },
  {
    question: "How can you test all library functions automatically in a test suite?",
    shortAnswer: "Write a script that iterates over all functions in `custom_shapes` and calls each with standard parameters on an offscreen canvas.",
    explanation: "Automated regression testing ensures new changes don't break existing shapes.",
    hint: "How do you verify all library shapes render without exceptions?",
    level: "advanced",
    codeExample: "for fn in [draw_gear, draw_shield, draw_heart]: fn(t, 0, 0)"
  },
  {
    question: "What is Namespace Pollution and how does a well-designed library avoid it?",
    shortAnswer: "Dumping hundreds of global variables into the consumer scope; avoid it with `__all__` and proper module scoping.",
    explanation: "Encapsulating functions inside clean module namespaces keeps client scripts organized.",
    hint: "What happens when a library exports too many internal variables?",
    level: "advanced",
    codeExample: "from shapes import draw_gear  # Clean namespace"
  },
  {
    question: "How do you create an audio/speaker volume icon with wave arcs?",
    shortAnswer: "Draw a trapezoidal speaker cone, followed by concentric arcs using `t.circle(r, extent=60)`.",
    explanation: "Combining a polygon horn with radial circular arcs creates standard volume indicators.",
    hint: "How are sound wave arcs drawn next to a speaker cone?",
    level: "moderate",
    codeExample: "t.circle(20, 60); t.circle(35, 60)"
  },
  {
    question: "Why is modular library architecture crucial for game UI development?",
    shortAnswer: "It allows separating HUD (Heads-Up Display) health bars, minimap icons, and inventory slots from core game loop physics.",
    explanation: "Separation of concerns keeps game logic fast, modular, and maintainable.",
    hint: "Why separate HUD drawing from game physics?",
    level: "advanced",
    codeExample: "# HUD: draw_heart_hud(t, player.hp)"
  },
  {
    question: "How do you handle default parameters when callers pass `None`?",
    shortAnswer: "Use sentinel checks: `if fill_color is None: fill_color = '#38bdf8'`.",
    explanation: "Sentinel handling provides robust fallback behavior for optional arguments.",
    hint: "How do you handle optional parameters that receive None?",
    level: "basic",
    codeExample: "if color is None: color = '#38bdf8'"
  },
  {
    question: "How do you draw a toggle switch UI component using library primitives?",
    shortAnswer: "Draw a rounded pill base in green or gray, and draw a solid white circle knob at the active offset position.",
    explanation: "Pill capsules combined with circular knobs model iOS/Android toggle switches.",
    hint: "What primitives create an ON/OFF toggle switch?",
    level: "moderate",
    codeExample: "# Pill capsule + circle knob at (x_offset, y)"
  },
  {
    question: "What is an icon sprite sheet?",
    shortAnswer: "A single layout or module providing a grid of pre-rendered or procedural vector icons for quick lookup.",
    explanation: "Sprite sheets catalog all available icons in a single visual reference gallery.",
    hint: "What do you call a visual catalog displaying all available icons?",
    level: "moderate",
    codeExample: "# Gallery rendering all icons in a grid"
  },
  {
    question: "How do you draw an interconnected flowchart using a custom shape library?",
    shortAnswer: "Call `draw_rect_node(t, x1, y1)` and `draw_diamond_node(t, x2, y2)` and connect them with `draw_arrow()`.",
    explanation: "Modular shape libraries turn Turtle into an automated diagram and flowchart generator.",
    hint: "How do library primitives enable automated flowchart rendering?",
    level: "advanced",
    codeExample: "draw_node(t, 0, 100); draw_arrow(t, 0, 80, 0, 20); draw_node(t, 0, 0)"
  },
  {
    question: "Why should library functions be pure and avoid modifying caller-supplied mutable objects?",
    shortAnswer: "To prevent unexpected side effects and mutation bugs in consumer applications.",
    explanation: "Pure functions ensure predictability and thread safety.",
    hint: "Why should functions avoid mutating input data structures?",
    level: "advanced",
    codeExample: "# Pure functions produce predictable output without mutating inputs"
  },
  {
    question: "What is the ultimate 5-point quality checklist for a published Turtle shape library?",
    shortAnswer: "1. Zero top-level execution | 2. Consistent signatures | 3. Complete state restoration | 4. Full docstrings | 5. `__all__` export list.",
    explanation: "Adhering to this standard ensures production-ready, professional graphics modules.",
    hint: "What 5 standards define a production-grade graphics library?",
    level: "basic",
    codeExample: "# 1. no leak | 2. standard API | 3. state hygiene | 4. docs | 5. __all__"
  },
  {
    question: "How do you import only specific icons from a shape library module?",
    shortAnswer: "Use `from custom_shapes import draw_gear, draw_shield`.",
    explanation: "Explicit named imports clearly document dependencies and keep namespaces uncluttered.",
    hint: "What import syntax imports only selected functions?",
    level: "basic",
    codeExample: "from custom_shapes import draw_gear"
  }
];

export default questions;
