// src/components/study/python/topics/005_004_turtle-modular/topic1_files/topic1_questions.js

const questions = [
  {
    question: "What are the four primary parameters in 2D graphic function design?",
    shortAnswer: "Position (x, y), Scale (radius/size), Orientation (rotation angle), and Color (fill/stroke).",
    explanation: "These four attributes form the complete mathematical specification for rendering 2D vector primitives.",
    hint: "What four properties fully describe a 2D shape on screen?",
    level: "basic",
    codeExample: "def draw_shape(t, x, y, size, rotation, color): ..."
  },
  {
    question: "How do you apply a rotation parameter to a shape in Python Turtle?",
    shortAnswer: "Call `t.setheading(rotation)` after moving to `(x, y)` and before drawing.",
    explanation: "Setting the heading aligns the turtle's forward vector with the desired angular orientation.",
    hint: "Which command sets absolute orientation before drawing starts?",
    level: "basic",
    codeExample: "t.setheading(rotation)"
  },
  {
    question: "How do you implement proportional scaling across a complex multi-segment shape?",
    shortAnswer: "Multiply all internal lengths, radii, and offsets by a uniform `scale` or `size` parameter.",
    explanation: "Uniform multiplication preserves the aspect ratio and relative component alignments of the shape.",
    hint: "How do you keep all parts proportional when resizing?",
    level: "basic",
    codeExample: "t.forward(40 * scale)\nt.circle(10 * scale)"
  },
  {
    question: "What is an Affine Transformation in computer graphics?",
    shortAnswer: "A geometric transformation that preserves collinearity and ratios of distances (e.g. Translation, Rotation, Scaling).",
    explanation: "Parameterized functions implement affine transformations directly through Turtle commands.",
    hint: "What mathematical term encompasses translation, rotation, and scaling?",
    level: "moderate",
    codeExample: "# Translation -> goto | Rotation -> setheading | Scale -> multiplier"
  },
  {
    question: "Why should rotation default to 0 in function signatures?",
    shortAnswer: "So the shape is drawn upright by default without forcing the caller to specify an angle every time.",
    explanation: "Sensible default arguments keep common use cases concise while enabling advanced rotations.",
    hint: "What is the standard default angle for upright shapes?",
    level: "basic",
    codeExample: "def draw_arrow(t, x, y, rotation=0): ..."
  },
  {
    question: "How do you calculate the side length of a regular polygon given its circumscribed radius `r` and side count `n`?",
    shortAnswer: "`side_length = 2 * r * sin(180 / n)`.",
    explanation: "Trigonometric chord formula accurately computes side lengths for any polygon radius.",
    hint: "What trigonometric formula relates polygon radius to side length?",
    level: "advanced",
    codeExample: "side = 2 * radius * math.sin(math.radians(180 / sides))"
  },
  {
    question: "How do you rotate a regular polygon around its geometric center rather than its bottom vertex?",
    shortAnswer: "Calculate the first vertex offset using polar coordinates `(x + r*cos(theta), y + r*sin(theta))`.",
    explanation: "Centering the anchor on the geometric centroid ensures rotational symmetry around `(x, y)`.",
    hint: "How do you offset the starting vertex for centroid-centered rotation?",
    level: "advanced",
    codeExample: "start_x = x + r * math.cos(math.radians(rotation))"
  },
  {
    question: "What is the difference between passing named colors ('cyan') vs hex codes ('#06b6d4')?",
    shortAnswer: "Named colors are limited to Tkinter presets; hex codes give access to over 16.7 million 24-bit TrueColor hues.",
    explanation: "Hex color parameterization enables curated modern color palettes.",
    hint: "Why are hex codes preferred for modern UI color styling?",
    level: "basic",
    codeExample: "draw_star(t, 0, 0, fill_color='#06b6d4')"
  },
  {
    question: "How can you parameterize stroke thickness in a drawing function?",
    shortAnswer: "Accept a `pensize` parameter and call `t.pensize(pensize)` at the start of the function.",
    explanation: "Allowing dynamic stroke weight enables both hairline accents and bold cartoon silhouettes.",
    hint: "Which parameter controls line stroke thickness?",
    level: "basic",
    codeExample: "def draw_rect(t, x, y, w, h, pensize=2): ..."
  },
  {
    question: "How do you draw a rotating pinwheel garden using parameterized functions?",
    shortAnswer: "Loop over coordinate positions and pass incrementing `rotation` and varying `petal_color` values.",
    explanation: "Looping over parameterized functions creates dynamic, varied procedural layouts.",
    hint: "How do you generate diverse flowers from a single function?",
    level: "moderate",
    codeExample: "for i, pt in enumerate(points):\n    draw_flower(t, *pt, rotation=i*30)"
  },
  {
    question: "What happens if a negative radius is passed to `draw_circle` or `t.circle()`?",
    shortAnswer: "Turtle draws the circle in the opposite direction (to the right of the turtle instead of the left).",
    explanation: "Negative radii invert the curvature direction in Turtle graphics.",
    hint: "How does a negative radius alter circle curvature?",
    level: "moderate",
    codeExample: "t.circle(-50)  # Curves rightwards"
  },
  {
    question: "How do you validate parameter types and bounds inside a robust graphics function?",
    shortAnswer: "Use `isinstance()` checks and assertion bounds (e.g. `assert radius > 0`).",
    explanation: "Defensive input validation prevents cryptic visual bugs and infinite loops.",
    hint: "How do you ensure radius is positive and non-zero?",
    level: "advanced",
    codeExample: "if radius <= 0: raise ValueError('Radius must be positive')"
  },
  {
    question: "Why should `fill_color` and `border_color` be separate parameters?",
    shortAnswer: "To give callers the freedom to create filled shapes with contrasting, colored borders or transparent fills.",
    explanation: "Separating stroke and fill parameters provides complete styling flexibility.",
    hint: "Why distinguish fill color from border stroke color?",
    level: "basic",
    codeExample: "def draw_poly(t, x, y, fill_color, border_color='white'): ..."
  },
  {
    question: "How do you implement non-uniform scaling (stretching width and height independently)?",
    shortAnswer: "Accept separate `width` and `height` parameters or `scale_x` and `scale_y` multipliers.",
    explanation: "Independent axis scaling enables creating ellipses, rectangles, and stretched banners.",
    hint: "What parameters allow independent horizontal and vertical stretching?",
    level: "moderate",
    codeExample: "def draw_oval(t, x, y, width, height): ..."
  },
  {
    question: "How can you pass a list of points `[(x1, y1), (x2, y2)]` to draw a custom parameterized polygon?",
    shortAnswer: "Accept `points` as a list of tuples, move to `points[0]`, and loop `goto(px, py)` for subsequent points.",
    explanation: "Point array parameterization allows rendering arbitrary arbitrary vector meshes.",
    hint: "How do you render arbitrary vertex lists with Turtle?",
    level: "advanced",
    codeExample: "def draw_mesh(t, points):\n    for pt in points: t.goto(*pt)"
  },
  {
    question: "What is polar coordinate conversion and why is it useful in parameterized circular arrays?",
    shortAnswer: "`x = cx + r * cos(theta)`, `y = cy + r * sin(theta)`; it places items evenly along a circular perimeter.",
    explanation: "Trigonometric polar conversion is the foundation for radial menus, clock ticks, and flowers.",
    hint: "What math converts radius and angle into Cartesian (x, y)?",
    level: "moderate",
    codeExample: "x = cx + r * math.cos(rad)\ny = cy + r * math.sin(rad)"
  },
  {
    question: "How do default keyword arguments allow backward-compatible function enhancements?",
    shortAnswer: "Adding new parameters with default values (e.g. `rotation=0`) does not break existing calls that omit them.",
    explanation: "Default parameters maintain API compatibility across evolving codebases.",
    hint: "Why do default arguments prevent breaking existing function calls?",
    level: "advanced",
    codeExample: "def draw_house(t, x, y, size, rotation=0): ..."
  },
  {
    question: "How do you animate a rotating parameterized shape in a loop?",
    shortAnswer: "In a loop, call `t.clear()`, `draw_shape(t, x, y, rotation=angle)`, `screen.update()`, and increment `angle`.",
    explanation: "Passing an updated rotation angle in each frame produces fluid real-time animation.",
    hint: "How do you create rotation animation using parameterized functions?",
    level: "moderate",
    codeExample: "for angle in range(0, 360, 5):\n    t.clear(); draw_shape(t, 0, 0, rotation=angle); screen.update()"
  },
  {
    question: "How do you draw a parameterized speedometer needle in Python Turtle?",
    shortAnswer: "Calculate angle based on value: `angle = min_angle + (val / max_val) * span`; call `draw_needle(t, x, y, rotation=angle)`.",
    explanation: "Mapping numeric data to rotation angles transforms Turtle into a dashboard visualization engine.",
    hint: "How is data value mapped to a rotating gauge needle?",
    level: "advanced",
    codeExample: "theta = 180 - (speed / 120.0) * 180"
  },
  {
    question: "What is the advantage of using Python's `math.radians()` before calling `math.cos()` or `math.sin()`?",
    shortAnswer: "Python's `math` functions require radians, while Turtle and humans work in degrees (0°-360°).",
    explanation: "`math.radians(deg)` converts degrees to radians (`deg * pi / 180`) preventing math domain errors.",
    hint: "Why must degrees be converted to radians for math.sin()?",
    level: "basic",
    codeExample: "rad = math.radians(rotation_degrees)"
  },
  {
    question: "How can you create a parameterized star with an arbitrary number of points `p`?",
    shortAnswer: "Accept `num_points` parameter, compute outer and inner radius vertices, and alternate between them.",
    explanation: "Radius alternating geometry generates stars with any number of points (4, 6, 8, 12).",
    hint: "How do you construct an n-pointed star parametrically?",
    level: "advanced",
    codeExample: "def draw_n_star(t, x, y, points=5, r_outer=50, r_inner=20): ..."
  },
  {
    question: "What is the computational benefit of parameterizing color palettes as tuple/list arguments?",
    shortAnswer: "It allows passing pre-calculated color theme arrays into functions without recomputing HSV conversions.",
    explanation: "Palette decoupling enables instant theme switching (Dark Mode, Cyberpunk, Solarized).",
    hint: "How does passing color lists enable instant theme switching?",
    level: "moderate",
    codeExample: "draw_mandala(t, x, y, palette=CYBERPUNK_PALETTE)"
  },
  {
    question: "Why should `t.speed()` generally NOT be changed inside a parameterized drawing function?",
    shortAnswer: "Changing speed inside a function overrides global animation settings and causes unexpected delays.",
    explanation: "Speed is a global environment configuration best managed in `main()`.",
    hint: "Why avoid mutating turtle speed inside reusable functions?",
    level: "moderate",
    codeExample: "# Set t.speed() once in main(), not in draw_shape()"
  },
  {
    question: "How do you draw a parameterized 3D isometric cube in Turtle?",
    shortAnswer: "Draw 3 parameterized rhombuses for top, left, and right faces with 30° and 150° slant angles.",
    explanation: "Composing 3 parameterized polygons produces convincing isometric 3D visuals.",
    hint: "Which 3 faces compose an isometric 3D cube?",
    level: "advanced",
    codeExample: "# top_face, left_face, right_face"
  },
  {
    question: "How do you implement a scale factor `scale=1.0` that supports zooming in and out?",
    shortAnswer: "Multiply all base coordinate dimensions by `scale` (e.g. `size * scale`).",
    explanation: "A single scalar multiplier allows seamless camera zoom effects.",
    hint: "How does a scalar multiplier facilitate camera zoom?",
    level: "moderate",
    codeExample: "draw_character(t, x, y, scale=0.5)  # 50% mini scale"
  },
  {
    question: "What is the recommended argument order for parameterized graphics functions in Python?",
    shortAnswer: "1. `t` (turtle) -> 2. `x, y` (position) -> 3. `size/radius` (scale) -> 4. `rotation` -> 5. `colors/styles`.",
    explanation: "Following standard spatial precedence (Target -> Space -> Scale -> Angle -> Style) provides an intuitive API.",
    hint: "What is the standard argument order from spatial anchor to style?",
    level: "advanced",
    codeExample: "def draw_icon(t, x, y, size=50, rotation=0, fill='gold', border='white'):"
  },
  {
    question: "How can you draw a series of concentric rotating stars with increasing size?",
    shortAnswer: "Loop `for i in range(5): draw_star(t, x, y, size=20 + i*15, rotation=i*10)`.",
    explanation: "Varying scale and rotation parameters concurrently produces rich optical illusions.",
    hint: "How do loops over scale and rotation create optical depth?",
    level: "basic",
    codeExample: "for i in range(5):\n    draw_star(t, 0, 0, size=20*(i+1), rotation=i*15)"
  },
  {
    question: "What is the difference between local coordinate space and global world coordinate space?",
    shortAnswer: "Local space is relative to the shape's anchor `(x, y)`; global world space is the entire canvas coordinate grid.",
    explanation: "Parameterized functions convert local geometric offsets into global world coordinates.",
    hint: "What coordinate space is relative to the shape's anchor?",
    level: "advanced",
    codeExample: "# Local (0, 0) maps to World (x, y)"
  },
  {
    question: "How do you create a directional compass or clock hand using parameterized functions?",
    shortAnswer: "Draw an elongated triangle/arrow pointing along heading 0°, then rotate with `setheading(rotation)`.",
    explanation: "Orientation parameterization naturally models clock hands and navigational compass needles.",
    hint: "How do you draw clock hands pointing to different hours?",
    level: "moderate",
    codeExample: "draw_hand(t, 0, 0, length=80, rotation=hour_angle)"
  },
  {
    question: "What is the core benefit of parameterized graphics for UI component design?",
    shortAnswer: "It allows building reusable icon and badge systems where size, orientation, and color adapt dynamically to UI state.",
    explanation: "Parameterization bridges algorithmic drawing with modern modular UI design.",
    hint: "How does parameterization support adaptable UI icon libraries?",
    level: "basic",
    codeExample: "# UI Badge: draw_badge(t, x, y, status='success')"
  }
];

export default questions;
