// src/components/study/python/topics/005_003_turtle-patterns/topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the primary role of an outer loop in generative geometric patterns?",
    shortAnswer: "The outer loop orchestrates global transformations such as radial rotations, grid translations, or layer scaling.",
    explanation: "Outer loops position or orient the drawing canvas before the inner loop draws the individual shape.",
    hint: "What does the outer loop control in nested graphics?",
    level: "basic",
    codeExample: "for spoke in range(36): ... t.left(10)"
  },
  {
    question: "What is the primary role of an inner loop in nested geometry?",
    shortAnswer: "The inner loop renders the local geometric primitive, such as tracing the sides of a polygon or petal.",
    explanation: "The inner loop executes repeatedly within each outer cycle to draw the shape.",
    hint: "What does the inner loop draw?",
    level: "basic",
    codeExample: "for _ in range(4): t.forward(100); t.left(90)"
  },
  {
    question: "How many times does the inner loop body run in `for i in range(12): for j in range(4):`?",
    shortAnswer: "48 times (12 * 4).",
    explanation: "Total operations in nested loops equal the product of outer and inner iteration counts.",
    hint: "What is 12 multiplied by 4?",
    level: "basic",
    codeExample: "12 * 4 = 48 iterations"
  },
  {
    question: "How do you construct a radial rosette mandala of squares in Python Turtle?",
    shortAnswer: "Outer loop: 36 iterations rotating 10 degrees. Inner loop: 4 iterations drawing a square.",
    explanation: "36 squares rotated by 10° (36 * 10° = 360°) form a symmetric circular rosette.",
    hint: "How do you rotate 36 squares around the origin?",
    level: "moderate",
    codeExample: "for _ in range(36):\n    for _ in range(4): t.forward(80); t.left(90)\n    t.left(10)"
  },
  {
    question: "How do you generate a 2D matrix grid of shapes (e.g. 5 rows by 5 columns)?",
    shortAnswer: "Outer loop iterates rows (Y coordinates); inner loop iterates columns (X coordinates).",
    explanation: "Nested 2D iteration maps matrix coordinates `(x, y)` to canvas positions.",
    hint: "Which loop controls rows and which controls columns?",
    level: "moderate",
    codeExample: "for r in range(5):\n    for c in range(5):\n        t.goto(x0 + c*dx, y0 - r*dy); draw_cell()"
  },
  {
    question: "How do you create a checkerboard pattern using nested loops?",
    shortAnswer: "Check if `(row + col) % 2 == 0` to alternate between black and white fill colors for each cell.",
    explanation: "Parity of row + column indices yields the classic alternating checkerboard pattern.",
    hint: "What mathematical parity check creates alternating tiles?",
    level: "moderate",
    codeExample: "color = 'black' if (r + c) % 2 == 0 else 'white'"
  },
  {
    question: "What is a spinning fractal vortex in Turtle?",
    shortAnswer: "A pattern where each outer iteration draws a polygon with an expanding side length and a slight rotational twist.",
    explanation: "Expanding side lengths combined with rotational offsets create logarithmic spiral vortices.",
    hint: "What happens when polygon size grows and angle twists each loop?",
    level: "moderate",
    codeExample: "for i in range(60):\n    for _ in range(4): t.forward(i*3); t.left(90)\n    t.left(6)"
  },
  {
    question: "Why is `screen.tracer(0)` essential when rendering nested loops with 1,000+ iterations?",
    shortAnswer: "To suppress intermediate animations and render the final complex artwork instantaneously.",
    explanation: "Rendering 1,000+ turtle animations in real time can take minutes without tracer(0).",
    hint: "How do you prevent severe lag in heavy nested loops?",
    level: "basic",
    codeExample: "screen.tracer(0)\n# nested loops...\nscreen.update()"
  },
  {
    question: "How do you ensure a turtle returns to its original heading after an inner polygon loop?",
    shortAnswer: "Ensure the inner loop completes a full 360-degree rotation (`sides * (360 / sides) = 360°`).",
    explanation: "Preserving rotational invariants prevents unintended angular drift.",
    hint: "Why does an inner polygon loop return the heading to 0° relative?",
    level: "advanced",
    codeExample: "# 4 * 90 = 360 deg → heading unchanged"
  },
  {
    question: "How do you draw concentric nested polygons with diminishing sizes using nested loops?",
    shortAnswer: "Outer loop iterates over sizes from largest to smallest; inner loop draws each polygon.",
    explanation: "Descending loops layer smaller filled shapes over larger ones without occluding them.",
    hint: "How does loop ordering affect layered fills?",
    level: "moderate",
    codeExample: "for size in range(200, 20, -30):\n    for _ in range(6): t.forward(size); t.left(60)"
  },
  {
    question: "What happens if you accidentally place the spoke rotation `t.left(10)` inside the inner loop?",
    shortAnswer: "The polygon fails to form properly because every side turns by 100° (90 + 10) instead of 90°.",
    explanation: "Placing outer transformation steps inside the inner loop scrambles the polygon shape.",
    hint: "Where must the outer spoke pivot be placed relative to the inner loop?",
    level: "moderate",
    codeExample: "# BUG: t.left(10) must be OUTSIDE the inner loop"
  },
  {
    question: "How do you draw a nested Islamic geometric star pattern?",
    shortAnswer: "Combine outer radial rotational loops with inner intersecting star polygon loops.",
    explanation: "Overlapping rotated star motifs create intricate Islamic arabesques.",
    hint: "What nested symmetry generates arabesque tile patterns?",
    level: "expert",
    codeExample: "# Islamic geometric tessellation"
  },
  {
    question: "How can 3 nested loops be used in Turtle Graphics?",
    shortAnswer: "Loop 1: Grid rows, Loop 2: Grid columns, Loop 3: Petals/sides within each cell.",
    explanation: "3-level nesting creates a grid where every cell contains its own complete mandala.",
    hint: "How do you draw a grid of mandalas?",
    level: "advanced",
    codeExample: "for r in rows: for c in cols: for spoke in mandala:"
  },
  {
    question: "What is time complexity of a 3-level nested loop with counts N, M, K?",
    shortAnswer: "O(N * M * K) cubic time complexity.",
    explanation: "The total number of primitive drawing steps is the product of all three bounds.",
    hint: "What is the Big-O complexity of 3 nested loops?",
    level: "moderate",
    codeExample: "# O(N * M * K)"
  },
  {
    question: "How do you create a rainbow color gradient across nested loop iterations?",
    shortAnswer: "Compute hue `h = outer_index / total_outer` and convert HSV to RGB using Python's `colorsys` module.",
    explanation: "Parametric hue modulation maps outer loop progress to the visible color spectrum.",
    hint: "How does colorsys map loop index to rainbow hues?",
    level: "advanced",
    codeExample: "import colorsys\nr, g, b = colorsys.hsv_to_rgb(i / total, 1.0, 1.0)"
  },
  {
    question: "How do you draw a hexagonal honeycomb lattice with nested loops?",
    shortAnswer: "In outer loop (rows), offset odd rows horizontally by `0.75 * side` and vertically by `sqrt(3) * side`.",
    explanation: "Hexagonal grid coordinates require staggering alternate rows.",
    hint: "How are odd rows staggered in hexagonal grids?",
    level: "expert",
    codeExample: "offset_x = (r % 2) * (col_spacing / 2)"
  },
  {
    question: "Why should `penup()` and `pendown()` be used when moving between grid cells in nested loops?",
    shortAnswer: "To prevent unwanted connecting lines between adjacent cells across rows and columns.",
    explanation: "Lifting the pen during grid repositioning keeps cells visually decoupled.",
    hint: "How do you navigate between grid cells cleanly?",
    level: "basic",
    codeExample: "t.penup(); t.goto(x, y); t.pendown()"
  },
  {
    question: "How do you draw a kaleidoscope snowflake in Turtle using nested loops?",
    shortAnswer: "Outer loop: 6 branches (60° turn). Inner loop: recursive branching twigs along each spoke.",
    explanation: "Hexagonal 6-fold radial symmetry produces classic snowflake crystals.",
    hint: "What rotational symmetry matches snowflakes?",
    level: "advanced",
    codeExample: "for _ in range(6): draw_branch(); t.left(60)"
  },
  {
    question: "How do you create a nested spiral of shrinking triangles?",
    shortAnswer: "Outer loop rotates and shifts inwards; inner loop draws a 3-sided triangle with shrinking side length.",
    explanation: "Scaling both rotation and length creates logarithmic fractal spirals.",
    hint: "How do shrinking triangles form a spiral?",
    level: "moderate",
    codeExample: "for i in range(50): polygon(3, 100 - i*2); t.left(10)"
  },
  {
    question: "What is loop nesting depth limit in Python?",
    shortAnswer: "Python has no fixed syntactical limit, but nesting beyond 3-4 levels hurts readability and maintainability.",
    explanation: "Refactoring deeply nested loops into helper functions is recommended clean code practice.",
    hint: "Why should deeply nested loops be refactored into functions?",
    level: "moderate",
    codeExample: "# Best practice: decompose nested loops into helper functions"
  },
  {
    question: "How do you draw a circular clock dial with 12 hour tick marks and 60 minute ticks?",
    shortAnswer: "Outer loop: 60 iterations (6° turn). Inner check: if `i % 5 == 0` draw long tick, else short tick.",
    explanation: "Modulo indexing distinguishes hour positions from minute tick marks.",
    hint: "How does modulo 5 distinguish hour ticks from minute ticks?",
    level: "moderate",
    codeExample: "for i in range(60):\n    tick_len = 15 if i % 5 == 0 else 5"
  },
  {
    question: "How do you generate a Spirograph mathematical curve with nested loops?",
    shortAnswer: "Iterate over parametric angle `t` from 0 to `2 * pi * k`, calculating epicycloid coordinates.",
    explanation: "Epicycloids and hypotrochoids simulate gears rotating inside gears.",
    hint: "What mathematical equations model Spirograph gear curves?",
    level: "expert",
    codeExample: "# Hypotrochoid parametric equations"
  },
  {
    question: "How can nested list comprehension coordinates be fed into a Turtle loop?",
    shortAnswer: "Precompute grid coordinates: `grid = [(x, y) for y in y_vals for x in x_vals]`, then loop `for x, y in grid:`.",
    explanation: "Decouples spatial math from drawing execution.",
    hint: "How do 2D list comprehensions generate grid point lists?",
    level: "advanced",
    codeExample: "grid = [(c*50, r*50) for r in range(5) for c in range(5)]"
  },
  {
    question: "How do you draw a dartboard target with nested loops?",
    shortAnswer: "Outer loop: concentric ring radii. Inner loop: 20 radial sector divisions.",
    explanation: "Combining radial spoke lines with concentric circles produces tournament dartboards.",
    hint: "What geometry forms a regulation dartboard?",
    level: "advanced",
    codeExample: "# Concentric rings + 20 angular sectors"
  },
  {
    question: "What is an isotropic geometric pattern?",
    shortAnswer: "A pattern with uniform physical and structural properties in all directions (high rotational symmetry).",
    explanation: "Radial nested loops naturally generate isotropic graphics.",
    hint: "What term describes rotational uniformity in all directions?",
    level: "expert",
    codeExample: "# High rotational symmetry"
  },
  {
    question: "How do you prevent turtle coordinate overflow when generating large nested grids?",
    shortAnswer: "Calculate the total bounding box `(cols * spacing, rows * spacing)` and offset `start_x = -total_width / 2`.",
    explanation: "Centering the entire grid bounding box keeps all cells within canvas visible boundaries.",
    hint: "How do you center an entire matrix grid on the canvas?",
    level: "moderate",
    codeExample: "start_x = -(cols * spacing) / 2"
  },
  {
    question: "Can nested loops draw 3D isometric cube grids?",
    shortAnswer: "Yes, by drawing 3 rhombuses (top, left, right faces) with appropriate shading for each grid cell.",
    explanation: "Combining 3 shaded polygons inside the inner loop renders isometric 3D cubes.",
    hint: "How do 3 shaded rhombuses create a 3D isometric cube?",
    level: "advanced",
    codeExample: "# Isometric cube = top, left, right rhombuses"
  },
  {
    question: "How do you randomize orientation inside nested loops for organic mosaics?",
    shortAnswer: "In the inner loop, add a slight random jitter: `t.left(random.uniform(-5, 5))`.",
    explanation: "Adding controlled perturbations creates hand-drawn or mosaic aesthetics.",
    hint: "How do you simulate handmade mosaic irregularity?",
    level: "moderate",
    codeExample: "t.left(random.uniform(-5, 5))"
  },
  {
    question: "What debugging technique is best for diagnosing nested loop drawing glitches?",
    shortAnswer: "Slow down turtle speed (`t.speed(1)`), add print statements with `(outer_i, inner_j)`, and test with small bounds (2x2).",
    explanation: "Isolating small iteration counts makes coordinate bugs immediately visible.",
    hint: "How do you debug nested loops visually?",
    level: "basic",
    codeExample: "print(f'Row {r}, Col {c}')"
  },
  {
    question: "What is the summary rule for mastering nested loops in Python Graphics?",
    shortAnswer: "Separate global layout (outer loop: rotation, rows, scaling) from local primitive drawing (inner loop: sides, arcs, fills), and always preserve state invariants.",
    explanation: "Clear conceptual separation between global positioning and local geometry makes any complex design modular and bug-free.",
    hint: "What conceptual separation makes nested graphics easy?",
    level: "basic",
    codeExample: "# Outer: Global position/angle | Inner: Local polygon edges"
  }
];

export default questions;
