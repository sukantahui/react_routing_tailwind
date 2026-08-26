// src/components/study/python/topics/005_004_turtle-modular/topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary benefit of wrapping drawing commands inside a Python function?",
    shortAnswer: "Reusability, parameterization, and eliminating code duplication.",
    explanation: "Functions allow you to draw the same shape in any size, position, and color with a single line call.",
    hint: "What principle eliminates copy-pasting drawing code?",
    level: "basic",
    codeExample: "def draw_circle(t, x, y, radius): ..."
  },
  {
    question: "Why should a drawing function accept the turtle instance `t` as its first parameter?",
    shortAnswer: "It allows the function to operate on any turtle instance and avoids reliance on global state.",
    explanation: "Passing the turtle object explicitly makes the function pure, decoupled, and testable.",
    hint: "Why avoid using global turtle variables in functions?",
    level: "basic",
    codeExample: "def draw_square(t, x, y, size): ..."
  },
  {
    question: "What should always be done before moving the turtle to `(x, y)` inside a shape function?",
    shortAnswer: "Call `t.penup()`.",
    explanation: "Calling `penup()` prevents unwanted stray drag lines across the canvas when repositioning.",
    hint: "How do you avoid drawing unwanted lines during repositioning?",
    level: "basic",
    codeExample: "t.penup()\nt.goto(x, y)\nt.pendown()"
  },
  {
    question: "Why is resetting the heading with `t.setheading(0)` important inside a modular drawing function?",
    shortAnswer: "It guarantees that the shape is drawn upright regardless of what angle the previous function left the turtle at.",
    explanation: "Enforcing a known initial heading ensures predictable, repeatable geometry.",
    hint: "How do you ensure shapes don't end up drawn tilted?",
    level: "basic",
    codeExample: "t.setheading(0)"
  },
  {
    question: "What is a Composite Drawing Function?",
    shortAnswer: "A high-level function that draws complex objects by calling simpler atomic functions.",
    explanation: "For example, `draw_house()` calls `draw_rectangle()` for walls, `draw_triangle()` for roof, and `draw_square()` for windows.",
    hint: "What do you call a function that combines smaller drawing functions?",
    level: "moderate",
    codeExample: "def draw_house(t, x, y, size):\n    draw_rectangle(t, x, y, size, size*0.8)\n    draw_roof(t, x, y+size*0.8, size)"
  },
  {
    question: "How do default parameter values improve drawing function design in Python?",
    shortAnswer: "They provide sensible standard sizes and colors while allowing callers to override them when needed.",
    explanation: "Default arguments reduce boilerplate while preserving maximum flexibility.",
    hint: "How can function arguments have fallback values?",
    level: "moderate",
    codeExample: "def draw_star(t, x, y, size=50, color='gold'): ..."
  },
  {
    question: "How does procedural composition help in drawing entire landscapes?",
    shortAnswer: "It allows a `main()` function to orchestrate loops over coordinate lists, placing houses, stars, and trees across the canvas.",
    explanation: "Separating scene layout data from shape rendering logic creates clean, scalable graphic programs.",
    hint: "How do you render a village with 5 houses and 20 stars cleanly?",
    level: "moderate",
    codeExample: "for x, y in star_coords:\n    draw_star(t, x, y, size=15)"
  },
  {
    question: "What is the DRY principle and how does it apply to Turtle graphics?",
    shortAnswer: "'Don't Repeat Yourself' — every unique shape logic should exist in one authoritative function.",
    explanation: "If you need to change how a roof or star is drawn, you edit one function instead of 50 copy-pasted lines.",
    hint: "What acronym represents avoiding code duplication?",
    level: "basic",
    codeExample: "# DRY: Define draw_tree() once, call it 10 times"
  },
  {
    question: "Why should `screen.update()` typically be kept outside drawing functions?",
    shortAnswer: "Drawing functions should focus purely on geometry; buffer flushing is the responsibility of the scene orchestrator.",
    explanation: "Calling `screen.update()` inside every small helper function destroys the performance gains of double buffering.",
    hint: "Where should screen buffer updates be handled?",
    level: "moderate",
    codeExample: "# Keep screen.update() in main() loop"
  },
  {
    question: "What is the recommended coordinate origin convention for a shape function?",
    shortAnswer: "Bottom-left corner or geometric center `(x, y)`.",
    explanation: "Consistently choosing bottom-left or center ensures intuitive spatial layout when combining shapes.",
    hint: "What standard reference points are used for shape anchors?",
    level: "moderate",
    codeExample: "# (x, y) = bottom-left anchor"
  },
  {
    question: "How do you calculate relative child element offsets inside a composite shape like `draw_house`?",
    shortAnswer: "Multiply the base `size` parameter by proportional factors (e.g. `door_width = size * 0.25`).",
    explanation: "Proportional scaling ensures the door and windows scale harmoniously whenever the house size changes.",
    hint: "How do you keep windows proportional when scaling a house?",
    level: "moderate",
    codeExample: "win_size = size * 0.2\nwin_x = x + size * 0.6"
  },
  {
    question: "What happens if a function forgets to call `t.end_fill()`?",
    shortAnswer: "The fill remains unclosed and bleeds unexpectedly into shapes drawn by subsequent functions.",
    explanation: "Every `begin_fill()` must have a matching `end_fill()` in the same function scope.",
    hint: "What happens if begin_fill() is never closed?",
    level: "basic",
    codeExample: "t.begin_fill()\n# ... draw ...\nt.end_fill()  # Required"
  },
  {
    question: "How can you pass keyword arguments `**kwargs` into Turtle drawing functions?",
    shortAnswer: "Use `**kwargs` to forward optional pen and style configurations to underlying turtle methods.",
    explanation: "Keyword forwarding allows callers to specify pensize, speed, and capstyle dynamically.",
    hint: "How do you accept arbitrary styling arguments in Python?",
    level: "advanced",
    codeExample: "def draw_circle(t, x, y, r, **styles): ..."
  },
  {
    question: "How does functional decomposition simplify debugging in graphical programs?",
    shortAnswer: "If a window is drawn crooked, you only need to inspect and isolate `draw_window()`, rather than scrolling through 500 lines of code.",
    explanation: "Isolating visual components makes unit testing and visual debugging fast and pinpointed.",
    hint: "Why is modular code easier to debug?",
    level: "moderate",
    codeExample: "# Test draw_window(t, 0, 0, 50) in isolation"
  },
  {
    question: "How do you draw a polygon with an arbitrary number of sides `n` using a single function?",
    shortAnswer: "Loop `n` times with `forward(size)` and `left(360 / n)`.",
    explanation: "The exterior angle rule enables a single function `draw_regular_polygon(t, x, y, n, size)` to draw triangles, squares, octagons, etc.",
    hint: "What function can draw any regular polygon?",
    level: "moderate",
    codeExample: "def draw_polygon(t, x, y, n, size):\n    # loop n times with turn 360/n"
  },
  {
    question: "Why is hardcoding coordinates inside drawing functions considered a severe anti-pattern?",
    shortAnswer: "Because it prevents drawing the shape anywhere else on the canvas.",
    explanation: "Hardcoded coordinates make functions completely non-reusable across different scenes.",
    hint: "Why should (x, y) coordinates always be passed as parameters?",
    level: "basic",
    codeExample: "# BAD: t.goto(100, 200)\n# GOOD: t.goto(x, y)"
  },
  {
    question: "How do you document a reusable drawing function using Python Docstrings?",
    shortAnswer: "Use triple quotes `\"\"\"` beneath the `def` statement describing parameters, coordinate anchor, and side effects.",
    explanation: "Clear docstrings help other developers and IDE autocomplete understand required inputs.",
    hint: "What standard documentation format describes function parameters in Python?",
    level: "moderate",
    codeExample: 'def draw_star(t, x, y, size):\n    """Draws a 5-pointed star at (x,y)."""'
  },
  {
    question: "How do you test a drawing function independently in its own file?",
    shortAnswer: "Place unit test code inside `if __name__ == '__main__':` block.",
    explanation: "This allows the file to be imported as a library module without executing test drawings immediately.",
    hint: "What Python idiom allows a file to be both a module and a script?",
    level: "moderate",
    codeExample: "if __name__ == '__main__':\n    main()"
  },
  {
    question: "What is the single-responsibility principle (SRP) in graphics programming?",
    shortAnswer: "Each function should do exactly one thing well (e.g. `draw_door` only draws a door).",
    explanation: "Small, single-purpose functions are easiest to reuse, compose, and maintain.",
    hint: "What software principle states each unit should have one clear job?",
    level: "advanced",
    codeExample: "# draw_door, draw_window, draw_chimney"
  },
  {
    question: "How do you create an arch or rounded doorway in a modular house function?",
    shortAnswer: "Draw vertical side rectangles and top it with `t.circle(radius, extent=180)`.",
    explanation: "Combining linear lines with partial circle arcs produces classic architectural arches.",
    hint: "What parameter in turtle.circle draws half a circle for an arch?",
    level: "advanced",
    codeExample: "t.circle(radius, 180)"
  },
  {
    question: "How can list unpacking `*coords` be used to render multiple trees efficiently?",
    shortAnswer: "Store coordinates as `[(x1, y1), (x2, y2)]` and call `draw_tree(t, *pt)` in a loop.",
    explanation: "Unpacking tuples cleanly separates coordinate datasets from rendering calls.",
    hint: "How do you unpack (x, y) tuples into function arguments in Python?",
    level: "moderate",
    codeExample: "for pt in tree_coords:\n    draw_tree(t, *pt)"
  },
  {
    question: "What is the difference between absolute positioning `goto(x, y)` and relative movement `forward(d)` inside shape functions?",
    shortAnswer: "Absolute positioning sets the starting anchor `(x, y)`; relative movement constructs the shape perimeter from that anchor.",
    explanation: "Anchor positioning sets context; relative turtle geometry builds local shape features.",
    hint: "Which commands establish the starting position vs the outline?",
    level: "moderate",
    codeExample: "t.goto(x, y)  # Absolute anchor\nt.forward(50)  # Relative stroke"
  },
  {
    question: "How do you draw a flower using modular functions?",
    shortAnswer: "Define `draw_petal()` and call it in a loop with radial rotation `t.left(360 / num_petals)`.",
    explanation: "Radial repetition of a modular petal function creates realistic floral geometry.",
    hint: "How do you compose a flower from a single petal function?",
    level: "moderate",
    codeExample: "for _ in range(8): draw_petal(t); t.left(45)"
  },
  {
    question: "How can functions return graphical metadata, such as bounding boxes?",
    shortAnswer: "A drawing function can return a tuple `(min_x, min_y, max_x, max_y)` indicating the shape's bounds.",
    explanation: "Returning bounding box metadata allows parent orchestrators to perform collision detection or alignment.",
    hint: "How can functions communicate shape boundaries back to the caller?",
    level: "advanced",
    codeExample: "return (x, y, x + width, y + height)"
  },
  {
    question: "Why should `pensize()` be parameterized with a default value?",
    shortAnswer: "So the caller can draw delicate hairline accents (pensize=1) or bold comic outlines (pensize=4).",
    explanation: "Parametric stroke weight gives the artist control over visual hierarchy.",
    hint: "Why allow customizable stroke thickness?",
    level: "basic",
    codeExample: "def draw_box(t, x, y, size, pensize=2): ..."
  },
  {
    question: "How do you draw a night cityscape using modular functions?",
    shortAnswer: "Loop across the x-axis, calling `draw_building(t, x, y, width, height, num_floors)` with randomized heights.",
    explanation: "Parameterized building functions make generating skyline silhouettes effortless.",
    hint: "How do you generate skyline silhouettes with modular functions?",
    level: "advanced",
    codeExample: "for x in range(-300, 300, 80):\n    draw_building(t, x, -150, 70, random.randint(150, 300))"
  },
  {
    question: "What is functional recursion in Turtle graphics?",
    shortAnswer: "A function that calls itself with smaller parameter values to produce fractal structures like trees or snowflakes.",
    explanation: "Recursion is the natural mathematical extension of modular graphic functions.",
    hint: "What do you call a function that calls itself with decreasing scale?",
    level: "advanced",
    codeExample: "def draw_branch(t, length):\n    draw_branch(t, length * 0.7)"
  },
  {
    question: "How do you handle color contrast between base walls and roofs in modular houses?",
    shortAnswer: "Provide distinct default parameters (e.g. wall='#3b82f6', roof='#ef4444') and validate contrast.",
    explanation: "Pairing complementary or high-contrast palette values ensures distinct visual silhouette recognition.",
    hint: "How do you ensure house components are visually distinct?",
    level: "moderate",
    codeExample: "draw_house(t, x, y, wall_color='skyblue', roof_color='crimson')"
  },
  {
    question: "Why is creating a custom graphics module (`shapes.py`) beneficial for large projects?",
    shortAnswer: "It allows multiple developers or scenes to `import shapes` and share a standardized library of geometric primitives.",
    explanation: "Module packaging fosters team collaboration, reusability, and clean project architecture.",
    hint: "Why organize drawing functions into an imported module?",
    level: "advanced",
    codeExample: "from shapes import draw_star, draw_house, draw_tree"
  },
  {
    question: "What is the 5-step checklist for writing a flawless reusable drawing function?",
    shortAnswer: "1. Accept `t, x, y, size` | 2. `t.penup(); t.goto(x, y)` | 3. `t.setheading(0)` | 4. `t.pendown()` | 5. Close `end_fill()`.",
    explanation: "Following these 5 steps guarantees reproducible, leak-free modular graphics anywhere on canvas.",
    hint: "What 5 steps guarantee clean modular drawing functions?",
    level: "basic",
    codeExample: "# 1. params | 2. goto | 3. heading | 4. pendown | 5. end_fill"
  }
];

export default questions;
