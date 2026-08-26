// src/components/study/python/topics/005_003_turtle-patterns/topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is the Schläfli symbol {p/q} for a star polygon?",
    shortAnswer: "`p` represents the number of vertices, and `q` is the step stride (density) connecting every q-th vertex.",
    explanation: "For example, {5/2} is a 5-pointed star connecting every 2nd vertex.",
    hint: "What do p and q represent in {p/q}?",
    level: "basic",
    codeExample: "# {5/2} = 5-pointed star"
  },
  {
    question: "What is the exterior turn angle formula for regular star polygon {p/q}?",
    shortAnswer: "theta = (q * 360) / p degrees.",
    explanation: "Tracing the star wraps around the center `q` full 360° revolutions across `p` turns.",
    hint: "Multiply 360 by density q and divide by vertex count p.",
    level: "basic",
    codeExample: "theta = (q * 360) / p"
  },
  {
    question: "What is the steering turn angle to draw a standard 5-pointed star?",
    shortAnswer: "144 degrees.",
    explanation: "theta = (2 * 360) / 5 = 720 / 5 = 144°.",
    hint: "What is (2 * 360) / 5?",
    level: "basic",
    codeExample: "for _ in range(5): t.forward(100); t.right(144)"
  },
  {
    question: "What is the internal vertex angle at each point of a 5-pointed star?",
    shortAnswer: "36 degrees.",
    explanation: "180° - 144° = 36° tip angle.",
    hint: "What is 180 minus 144?",
    level: "basic",
    codeExample: "tip_angle = 180 - 144  # 36 deg"
  },
  {
    question: "What mathematical condition is required for {p/q} to be a single unicursal (continuous) star polygon?",
    shortAnswer: "`p` and `q` must be coprime (greatest common divisor gcd(p, q) == 1).",
    explanation: "If gcd(p, q) > 1, the shape decomposes into multiple disjoint polygons (e.g. {6/2} is two triangles).",
    hint: "What must gcd(p, q) equal for a continuous path?",
    level: "moderate",
    codeExample: "import math; assert math.gcd(p, q) == 1"
  },
  {
    question: "What is the exterior turn angle for an 8-pointed star {8/3}?",
    shortAnswer: "135 degrees.",
    explanation: "theta = (3 * 360) / 8 = 1080 / 8 = 135°.",
    hint: "What is (3 * 360) / 8?",
    level: "moderate",
    codeExample: "for _ in range(8): t.forward(100); t.left(135)"
  },
  {
    question: "What is the difference between heptagram {7/2} and {7/3}?",
    shortAnswer: "{7/2} has wide blunt points (102.86° turn); {7/3} has acute sharp needle points (154.29° turn).",
    explanation: "Higher stride `q` makes the star points sharper and more acute.",
    hint: "Which heptagram has sharper points: q=2 or q=3?",
    level: "moderate",
    codeExample: "# {7/2}: turn=102.86° | {7/3}: turn=154.29°"
  },
  {
    question: "What is a compound star polygon?",
    shortAnswer: "A star formed by overlaying multiple rotated regular polygons when gcd(p, q) > 1.",
    explanation: "The Star of David {6/2} consists of 2 overlapping triangles; the Islamic Octagram {8/2} is 2 overlapping squares.",
    hint: "What is formed when two triangles or squares overlap?",
    level: "moderate",
    codeExample: "# {6/2} = 2 triangles | {8/2} = 2 squares"
  },
  {
    question: "How do you draw the 6-pointed Star of David in Python Turtle?",
    shortAnswer: "Draw one equilateral triangle pointing up, lift pen to offset, and draw a second triangle pointing down.",
    explanation: "Overlaying two rotated triangles produces the hexagram.",
    hint: "How do you combine two triangles to form a 6-pointed star?",
    level: "basic",
    codeExample: "# Triangle 1: left(120) | Triangle 2: right(120)"
  },
  {
    question: "How do you draw the 8-pointed Islamic Star (Rub el Hizb)?",
    shortAnswer: "Draw one centered square, rotate 45 degrees, and draw a second centered square.",
    explanation: "Two concentric squares offset by 45° form the classic 8-pointed star rosette.",
    hint: "What angle separates the two squares in an 8-pointed star?",
    level: "moderate",
    codeExample: "# Square 1: heading 0 | Square 2: heading 45"
  },
  {
    question: "How do you create a rotational star mandala in Python Turtle?",
    shortAnswer: "Loop over N radial spokes, drawing a 5-pointed star at each spoke and turning by `360 / N`.",
    explanation: "Rotating star motifs around the origin generates intricate circular mandalas.",
    hint: "How do you combine star drawing with radial spoke pivots?",
    level: "moderate",
    codeExample: "for _ in range(12): draw_star(); t.left(30)"
  },
  {
    question: "What is the total sum of turning angles when drawing a 5-pointed star {5/2}?",
    shortAnswer: "720 degrees (2 full revolutions).",
    explanation: "5 turns of 144° = 720° (density q = 2 full turns around the center).",
    hint: "What is 5 multiplied by 144?",
    level: "basic",
    codeExample: "5 * 144 = 720 deg (2 revolutions)"
  },
  {
    question: "What is the winding number of a star polygon {p/q}?",
    shortAnswer: "The integer `q`, representing how many times the perimeter winds around the central hub.",
    explanation: "Winding number determines fill intersection parity in vector graphics.",
    hint: "What integer represents the number of full revolutions around center?",
    level: "advanced",
    codeExample: "winding_number = q"
  },
  {
    question: "How does the non-zero winding rule affect filling a 5-pointed star?",
    shortAnswer: "The entire star including the central pentagon is filled solid.",
    explanation: "Non-zero winding fills all regions with winding count != 0.",
    hint: "Does non-zero winding fill the center of a star?",
    level: "advanced",
    codeExample: "# Non-zero rule fills entire star"
  },
  {
    question: "How does the even-odd fill rule affect a 5-pointed star?",
    shortAnswer: "The 5 points are filled, but the central pentagon is left empty (a transparent hole).",
    explanation: "The central pentagon has winding number 2 (even), which becomes a hole under even-odd parity.",
    hint: "What rule leaves the central pentagon empty?",
    level: "advanced",
    codeExample: "# Even-odd parity leaves center hollow"
  },
  {
    question: "How do you draw a star polygon using polar vertex coordinates?",
    shortAnswer: "Compute all `p` vertices `(R*cos, R*sin)`, then connect in sequence `idx = (idx + q) % p`.",
    explanation: "Modulo indexing by stride `q` guarantees exact vertex connectivity without cumulative angle drift.",
    hint: "How does modulo arithmetic connect star vertices?",
    level: "expert",
    codeExample: "current = (current + q) % p"
  },
  {
    question: "What is a decagram {10/3} star?",
    shortAnswer: "A 10-pointed regular star polygon with exterior turn angle `theta = (3 * 360) / 10 = 108°`.",
    explanation: "Connects every 3rd vertex of a regular decagon.",
    hint: "What is (3 * 360) / 10?",
    level: "moderate",
    codeExample: "# {10/3} turn angle = 108°"
  },
  {
    question: "What is a dodecagram {12/5} star?",
    shortAnswer: "A 12-pointed acute star with exterior turn angle `theta = (5 * 360) / 12 = 150°`.",
    explanation: "Connects every 5th vertex of a 12-gon.",
    hint: "What is (5 * 360) / 12?",
    level: "moderate",
    codeExample: "# {12/5} turn angle = 150°"
  },
  {
    question: "How do you draw a starburst with alternating long and short rays?",
    shortAnswer: "Loop over 2N points, alternating radius between `R_outer` and `R_inner` on each step.",
    explanation: "Connecting alternating outer tips and inner valleys forms classic starbursts.",
    hint: "How do alternating inner and outer radii form starbursts?",
    level: "moderate",
    codeExample: "r = r_outer if i % 2 == 0 else r_inner"
  },
  {
    question: "Why is `q < p/2` a requirement for standard Schläfli star symbols?",
    shortAnswer: "Because `q > p/2` produces the exact same star traced in the reverse (clockwise) direction: `{p/(p-q)}`.",
    explanation: "{5/3} is geometrically identical to {5/2}, just drawn clockwise.",
    hint: "Why is {5/3} identical to {5/2}?",
    level: "advanced",
    codeExample: "# {p/q} is isomorphic to {p/(p-q)}"
  },
  {
    question: "What is sacred geometry in mathematical art?",
    shortAnswer: "The study of geometric proportions (Flower of Life, Seed of Life, Metatron's Cube) based on nested overlapping circles and stars.",
    explanation: "Found across historical architecture, stained glass, and mandala art.",
    hint: "What term describes the geometric study of mandalas and the Flower of Life?",
    level: "basic",
    codeExample: "# Sacred geometry overlapping circles"
  },
  {
    question: "How do you draw the Seed of Life in Python Turtle?",
    shortAnswer: "Draw one central circle, then draw 6 identical overlapping circles centered at radius R on each 60° spoke.",
    explanation: "7 intersecting circles with 6-fold radial symmetry form the Seed of Life.",
    hint: "How many circles make up the Seed of Life?",
    level: "advanced",
    codeExample: "for i in range(6): t.goto(r*cos(i*60), r*sin(i*60)); t.circle(r)"
  },
  {
    question: "How do you draw a multi-layered star kaleidoscope?",
    shortAnswer: "Draw multiple concentric star polygons with decreasing radii and alternating rotation angles.",
    explanation: "Layering nested star frames creates depth and kaleidoscopic symmetry.",
    hint: "How do shrinking rotated stars create a kaleidoscope?",
    level: "moderate",
    codeExample: "for i in range(5): draw_star(r=100 - i*15); t.left(15)"
  },
  {
    question: "What is the ratio of golden sections inside a regular 5-pointed pentagram?",
    shortAnswer: "Every line segment intersects another at the Golden Ratio (phi ≈ 1.6180339).",
    explanation: "The pentagram is the primary geometric embodiment of the golden ratio in Euclidean geometry.",
    hint: "What famous mathematical ratio appears throughout a pentagram?",
    level: "advanced",
    codeExample: "# Pentagram contains phi = 1.618"
  },
  {
    question: "How do you fill each triangular point of a star with different colors?",
    shortAnswer: "Draw each of the `p` triangular points independently from the outer tip to the inner valley using `begin_fill()`.",
    explanation: "Decomposing the star into `p` distinct triangle facets allows independent coloring.",
    hint: "How do you color star facets individually?",
    level: "advanced",
    codeExample: "# Draw p independent facet triangles"
  },
  {
    question: "What is an enneagram {9/2} or {9/4}?",
    shortAnswer: "A 9-pointed regular star polygon.",
    explanation: "{9/2} has 80° turn; {9/4} has 160° turn.",
    hint: "What is a 9-pointed star polygon called?",
    level: "moderate",
    codeExample: "# Enneagram {9/4}: turn = (4 * 360) / 9 = 160°"
  },
  {
    question: "How do you draw a dynamic star with a parameterized number of points in Python?",
    shortAnswer: "Define `draw_star(p, q, size)` where `turn = (q * 360) / p` and loop `p` times.",
    explanation: "Parameterized functions handle arbitrary star geometries dynamically.",
    hint: "How do you generalize star drawing to any (p, q)?",
    level: "basic",
    codeExample: "def star(p, q, size):\n    for _ in range(p): t.forward(size); t.right((q*360)/p)"
  },
  {
    question: "How do you create an animated pulsing star in Turtle?",
    shortAnswer: "In a loop, repeatedly clear canvas, update radius with `r = base + amp * sin(time)`, and redraw with `tracer(0)`.",
    explanation: "Sine-modulated radius animation creates organic pulsing effects.",
    hint: "How does math.sin modulate star size over time?",
    level: "advanced",
    codeExample: "size = 100 + 20 * math.sin(frame * 0.1)"
  },
  {
    question: "What happens if you attempt to draw {6/3}?",
    shortAnswer: "gcd(6, 3) = 3, which collapses into 3 straight lines passing through the origin (a degenerate figure).",
    explanation: "q = p/2 is a straight line through the center, not a polygon.",
    hint: "Why is q = p/2 degenerate?",
    level: "expert",
    codeExample: "# Degenerate straight line"
  },
  {
    question: "What is the summary formula for star polygon mathematics?",
    shortAnswer: "Given Schläfli symbol `{p/q}` where `gcd(p,q) == 1`, turn by `theta = (q * 360) / p` exactly `p` times to complete the star.",
    explanation: "This universal formula renders every possible regular star polygon in Euclidean geometry.",
    hint: "What formula produces any regular star polygon?",
    level: "basic",
    codeExample: "# theta = (q * 360) / p across p iterations"
  }
];

export default questions;
