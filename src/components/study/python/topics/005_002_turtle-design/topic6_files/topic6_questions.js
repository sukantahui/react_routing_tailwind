// src/components/study/python/topics/005_002_turtle-design/topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the Painter's Algorithm in 2D computer graphics?",
    shortAnswer: "A rendering technique where background elements are drawn first, and foreground elements are painted on top.",
    explanation: "Like an oil painter laying down the distant sky before painting trees in front, later draw commands overwrite earlier ones.",
    hint: "How does the sequence of drawing determine what appears on top?",
    level: "basic",
    codeExample: "# 1. Draw sky → 2. Draw mountains → 3. Draw house"
  },
  {
    question: "What happens if you draw a window before drawing the house wall?",
    shortAnswer: "The house wall fill will completely cover and hide the window.",
    explanation: "Because Turtle follows sequential z-indexing, drawing the wall second paints over the window pixels.",
    hint: "Which shape gets drawn on top: the earlier or the later one?",
    level: "basic",
    codeExample: "# BUG: Wall drawn over window hides it completely!"
  },
  {
    question: "How do you decompose a complex illustration into modular Python functions?",
    shortAnswer: "Create dedicated helper functions for distinct elements like `draw_mountain()`, `draw_tree()`, and `draw_cottage()`.",
    explanation: "Modular decomposition makes code clean, reusable, and easy to debug.",
    hint: "How does functional decomposition apply to vector art?",
    level: "moderate",
    codeExample: "def draw_tree(t, x, y):\n    # draw trunk & foliage\n    pass"
  },
  {
    question: "How do you render the 24 radial spokes of the Ashoka Chakra evenly in Python?",
    shortAnswer: "Loop 24 times with `t.forward(radius); t.backward(radius); t.left(360 / 24)`.",
    explanation: "360 / 24 = 15-degree turns per spoke evenly subdivide the circle.",
    hint: "What angle separates each of the 24 spokes in a circle?",
    level: "moderate",
    codeExample: "for _ in range(24):\n    t.forward(35); t.backward(35); t.left(15)"
  },
  {
    question: "How do you draw an arbitrary polygon from a list of (x, y) vertex tuples?",
    shortAnswer: "Iterate through the tuple list with `t.goto(x, y)` inside a `begin_fill()` / `end_fill()` block.",
    explanation: "This allows rendering custom vector shapes from mathematical coordinate models.",
    hint: "How do you traverse a coordinate array?",
    level: "moderate",
    codeExample: "t.begin_fill()\nfor vx, vy in vertices: t.goto(vx, vy)\nt.end_fill()"
  },
  {
    question: "What is the recommended approach for creating complex gradients in Turtle?",
    shortAnswer: "Stack multiple concentric or horizontal polygons with incrementally shifted RGB values.",
    explanation: "Layering closely spaced thin slices with varying colors simulates linear or radial gradients.",
    hint: "How do you simulate smooth gradients using solid filled bands?",
    level: "advanced",
    codeExample: "# Multi-stripe gradient simulation"
  },
  {
    question: "Why should `screen.tracer(0)` be used for composite scenes with 10+ filled layers?",
    shortAnswer: "To prevent visual stutter and render all composite layers simultaneously in a single frame update.",
    explanation: "tracer(0) buffers all component rendering in memory and presents the completed scene instantly.",
    hint: "How do you eliminate rendering delays across complex multi-part art?",
    level: "basic",
    codeExample: "screen.tracer(0)\nrender_all_layers()\nscreen.update()"
  },
  {
    question: "How do you center an object of width W at horizontal position X?",
    shortAnswer: "Position the turtle starting corner at `X - (W / 2)`.",
    explanation: "Offsetting by half the width ensures the shape is symmetrically balanced around the target center.",
    hint: "How do you calculate the starting corner from a center anchor?",
    level: "moderate",
    codeExample: "start_x = target_center_x - (width / 2)"
  },
  {
    question: "What is the purpose of pen state restoration in modular drawing components?",
    shortAnswer: "To ensure a helper function leaves the turtle in a clean, predictable state for the next component.",
    explanation: "Lifting the pen and resetting colors at function exit prevents side effects in subsequent drawing calls.",
    hint: "Why should functions clean up their pen state before returning?",
    level: "moderate",
    codeExample: "# Reset penup() at the end of draw_component()"
  },
  {
    question: "How do you draw a pine tree using stacked green triangles and a brown trunk?",
    shortAnswer: "Draw a brown rectangular trunk at the base, then stack 3 overlapping green filled triangles of decreasing sizes on top.",
    explanation: "Layering 3 triangles (large base, medium center, small tip) creates classic stylized pine trees.",
    hint: "What geometric primitive creates stylized foliage layers?",
    level: "moderate",
    codeExample: "# Stack 3 green triangles with vertical offsets"
  },
  {
    question: "How do you create a glowing neon sign effect in composite graphics?",
    shortAnswer: "Draw thick dark-colored base strokes first, followed by thinner, brighter colored strokes directly on top.",
    explanation: "This mimics optical light bloom by layering wide soft borders under sharp intense highlights.",
    hint: "How does layering stroke widths create a bloom/glow illusion?",
    level: "advanced",
    codeExample: "# Layer 1: pensize(10) dark pink → Layer 2: pensize(2) bright white"
  },
  {
    question: "What is the coordinate anchor of `turtle.circle(radius)`?",
    shortAnswer: "The bottom point of the circle (the center is at `(x, y + radius)`).",
    explanation: "Turtle draws circles tangentially to the left of its current heading, placing the center radius units to the left.",
    hint: "Where is the center of a circle relative to the turtle's starting point?",
    level: "moderate",
    codeExample: "# To center a circle at (0,0), move turtle to (0, -radius)"
  },
  {
    question: "How do you place a circular Ashoka Chakra precisely at center (cx, cy)?",
    shortAnswer: "Move to `(cx, cy - radius)` to draw the outer ring, then move to `(cx, cy)` to draw the spokes.",
    explanation: "Accounting for tangential circle drawing ensures concentric alignment with the radial spokes.",
    hint: "How do you align the circular rim with the center of the spokes?",
    level: "moderate",
    codeExample: "t.goto(cx, cy - r); t.circle(r); t.goto(cx, cy)"
  },
  {
    question: "How do you draw a multi-story skyscraper with lighted windows in Turtle?",
    shortAnswer: "Draw a tall dark rectangle for the building facade, then use nested 2D loops to stamp small yellow window rectangles across floors.",
    explanation: "Nested loops over floor levels (Y) and column positions (X) generate architectural window grids.",
    hint: "What programming construct creates a regular grid of windows?",
    level: "advanced",
    codeExample: "for floor_y in range(-100, 150, 30):\n    for col_x in range(-40, 40, 20):\n        # draw window"
  },
  {
    question: "Can multiple Turtle instances be used to draw different layers in parallel?",
    shortAnswer: "Yes, you can instantiate separate turtles (e.g. `bg_artist`, `fg_artist`, `ui_artist`).",
    explanation: "Multiple named turtles help organize code into distinct architectural responsibilities.",
    hint: "Can you assign specific turtles to specific visual layers?",
    level: "moderate",
    codeExample: "bg_t = turtle.Turtle(); fg_t = turtle.Turtle()"
  },
  {
    question: "How do you create a drop-shadow effect behind a composite card or box?",
    shortAnswer: "Draw a semi-offset dark rectangle at `(x + 5, y - 5)` before drawing the main card at `(x, y)`.",
    explanation: "Underlying offset dark shapes create realistic 2.5D elevation and depth.",
    hint: "Where do you position a shadow relative to the primary shape?",
    level: "moderate",
    codeExample: "# Shadow at (x+5, y-5) in '#0f172a' → Main card at (x, y) in '#38bdf8'"
  },
  {
    question: "How do you draw cloud puffs in a sky landscape?",
    shortAnswer: "Draw 3 to 5 overlapping white filled circles of varying radii clustered along a horizontal line.",
    explanation: "Overlapping circular disks merge visually into a fluffy cloud silhouette.",
    hint: "What geometric shapes cluster together to form cloud silhouettes?",
    level: "basic",
    codeExample: "# Cluster of 4 overlapping circles"
  },
  {
    question: "What is the best way to handle color palettes across large composite projects?",
    shortAnswer: "Define a centralized dictionary or namespace of color hex tokens at the top of the module.",
    explanation: "Centralized color palettes ensure visual harmony and allow quick theme rebranding.",
    hint: "Where should design tokens and color constants be declared?",
    level: "moderate",
    codeExample: "PALETTE = {'sky': '#020617', 'mountain': '#1e293b', 'accent': '#38bdf8'}"
  },
  {
    question: "How do you draw a symmetrical robot face with identical left and right ears?",
    shortAnswer: "Mirror coordinate offsets: draw left ear at `(-offset_x, y)` and right ear at `(+offset_x, y)`.",
    explanation: "Reflecting X coordinates across the Y-axis produces perfect bilateral symmetry.",
    hint: "How does changing the sign of X reflect geometry across the center axis?",
    level: "moderate",
    codeExample: "# Left: (-80, 50) | Right: (+80, 50)"
  },
  {
    question: "Why should background mountain silhouettes be darker than foreground elements in night scenes?",
    shortAnswer: "Atmospheric perspective in dark mode places low-contrast dark silhouettes in the distance and bright vibrant elements in the foreground.",
    explanation: "Controlling tonal contrast creates depth perception in 2D illustrations.",
    hint: "How does contrast affect perceived visual distance?",
    level: "advanced",
    codeExample: "# Distant: #0f172a → Foreground: #38bdf8"
  },
  {
    question: "How do you stamp repeating ground texture dots without slowing down execution?",
    shortAnswer: "Set `screen.tracer(0)` and use `t.dot()` in a random distribution loop.",
    explanation: "Stamping dots with tracer disabled generates thousands of texture particles in milliseconds.",
    hint: "What method places rapid texture points on canvas?",
    level: "moderate",
    codeExample: "screen.tracer(0)\nfor _ in range(300): t.goto(rx, ry); t.dot(3)"
  },
  {
    question: "How do you clip an illustration within a decorative outer border?",
    shortAnswer: "Draw the outer border frame as the final topmost layer, covering any slight edge imperfections.",
    explanation: "Applying a crisp foreground bezel cleans up geometric boundary overflows.",
    hint: "Which layer acts as a picture frame over your artwork?",
    level: "moderate",
    codeExample: "# Draw outer bezel frame as the final step"
  },
  {
    question: "What is procedural vector generation in Python?",
    shortAnswer: "Generating visual art programmatically using algorithms, loops, and mathematical equations rather than manual asset files.",
    explanation: "Procedural graphics scale infinitely without pixelation and can generate unique variations on every run.",
    hint: "What is computer art generated through pure code called?",
    level: "advanced",
    codeExample: "# Algorithmic art generation"
  },
  {
    question: "How do you draw a sun with radiating triangular rays?",
    shortAnswer: "Draw a central filled circle, then loop around 360 degrees drawing small filled triangles extending outward.",
    explanation: "Combining a central disk with rotational triangular spikes produces stylized sunburst icons.",
    hint: "How do you attach radiating spikes around a central circular hub?",
    level: "moderate",
    codeExample: "# Central circle + rotational ray loop"
  },
  {
    question: "How do you organize a large multi-component Turtle program for maintainability?",
    shortAnswer: "Structure code into: 1. Setup & Config, 2. Helper drawing functions, 3. Layer orchestration, 4. Main execution entry point.",
    explanation: "Clean architectural separation prevents tangled spaghetti code in complex graphical projects.",
    hint: "What 4 phases structure clean Python applications?",
    level: "moderate",
    codeExample: "# Config → Helpers → Compose Scene → main()"
  },
  {
    question: "What happens if you use `t.dot(size)` while inside a `begin_fill()` block?",
    shortAnswer: "The dot is stamped immediately on the canvas, while the surrounding polygon vertices continue recording into the fill buffer.",
    explanation: "Stamping operations are instantaneous canvas overlays and do not corrupt vertex path buffers.",
    hint: "Does stamping a dot break active fill buffer recording?",
    level: "advanced",
    codeExample: "t.begin_fill(); t.forward(50); t.dot(10); t.forward(50); t.end_fill()"
  },
  {
    question: "How do you draw a smooth river winding through a landscape?",
    shortAnswer: "Define the river banks using two bezier-like coordinate paths and fill the enclosed water polygon with cyan/blue.",
    explanation: "Connecting top and bottom winding bank coordinates produces natural flowing river geometry.",
    hint: "How do you create organic curved waterway polygons?",
    level: "expert",
    codeExample: "# River bank coordinate polygon"
  },
  {
    question: "Can composite artwork be scaled to different sizes using a scaling factor variable `scale`?",
    shortAnswer: "Yes, by multiplying all coordinate and dimension offsets by `scale`.",
    explanation: "Parameterized scale factors enable responsive vector resizing across mobile, desktop, and print.",
    hint: "How do you make an entire vector drawing scale dynamically?",
    level: "moderate",
    codeExample: "def draw_house(x, y, scale=1.0):\n    width = 100 * scale"
  },
  {
    question: "How do you draw a speech bubble with an arrow pointer pointing to a character?",
    shortAnswer: "Draw a rounded rectangle or ellipse, connect a triangular pointer at the bottom, and fill both with white/cream.",
    explanation: "Combining a message box with a directional triangle creates cartoon dialogue balloons.",
    hint: "What geometric parts make up a comic book speech bubble?",
    level: "moderate",
    codeExample: "# Balloon box + directional pointer triangle"
  },
  {
    question: "What is the summary rule for mastering composite vector graphics in Python Turtle?",
    shortAnswer: "Decompose illustrations into simple geometric primitives, order rendering from background to foreground (Painter's Algorithm), use parameterized helper functions, and render instantly with `tracer(0)`.",
    explanation: "This complete methodology allows developers to build museum-grade procedural vector illustrations and games.",
    hint: "What 4 principles govern professional vector graphics composition?",
    level: "basic",
    codeExample: "# 1. Decompose | 2. Layer (Painter's Alg) | 3. Modular DRY helpers | 4. tracer(0)"
  }
];

export default questions;
