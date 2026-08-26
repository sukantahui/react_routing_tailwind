// src/components/study/python/topics/005_003_turtle-patterns/topic1_files/topic1_questions.js

const questions = [
  {
    question: "Why does the sum of exterior angles of any closed convex polygon always equal 360 degrees?",
    shortAnswer: "Because completing the polygon requires the turtle to make one complete rotational heading revolution back to its starting orientation.",
    explanation: "Any closed loop on a 2D plane represents a total angular deviation of 360° (2π radians).",
    hint: "How many degrees are in one full circle?",
    level: "basic",
    codeExample: "# Sum of turns = 360 degrees"
  },
  {
    question: "What is the exterior turn angle for an equilateral triangle?",
    shortAnswer: "120 degrees.",
    explanation: "360 / 3 = 120°. (Note: The interior angle is 60°, and 180° - 60° = 120°).",
    hint: "What is 360 divided by 3?",
    level: "basic",
    codeExample: "t.left(120)  # for triangle"
  },
  {
    question: "What is the exterior turn angle for a regular pentagon?",
    shortAnswer: "72 degrees.",
    explanation: "360 / 5 = 72° exterior turn (interior angle is 108°).",
    hint: "What is 360 divided by 5?",
    level: "basic",
    codeExample: "t.left(72)  # for pentagon"
  },
  {
    question: "What is the formula for the interior angle of a regular N-sided polygon?",
    shortAnswer: "((N - 2) * 180) / N degrees (or 180 - (360 / N)).",
    explanation: "The interior and exterior angles at any vertex lie on a straight line and sum to 180°.",
    hint: "How is the interior angle related to 180 minus exterior angle?",
    level: "moderate",
    codeExample: "interior_angle = 180 - (360 / n)"
  },
  {
    question: "Why do beginners mistakenly use 60 degrees when drawing a triangle?",
    shortAnswer: "Because they confuse the interior angle (60°) with the required steering exterior turn (120°).",
    explanation: "Turning 60° produces a 6-sided hexagon instead of a 3-sided triangle.",
    hint: "Does the turtle turn the interior or exterior angle?",
    level: "basic",
    codeExample: "# BUG: t.left(60) draws a hexagon, not a triangle!"
  },
  {
    question: "What is the exterior turn angle for a regular octagon?",
    shortAnswer: "45 degrees.",
    explanation: "360 / 8 = 45°.",
    hint: "What is 360 divided by 8?",
    level: "basic",
    codeExample: "t.left(45)  # for octagon"
  },
  {
    question: "What is the exterior turn angle for a regular dodecagon (12 sides)?",
    shortAnswer: "30 degrees.",
    explanation: "360 / 12 = 30°.",
    hint: "What is 360 divided by 12?",
    level: "basic",
    codeExample: "t.left(30)  # for dodecagon"
  },
  {
    question: "How do you calculate the side length of a regular polygon from its circumscribed radius R?",
    shortAnswer: "side = 2 * R * sin(pi / N).",
    explanation: "Trigonometric chord formula relating inscribed polygon edge length to radius.",
    hint: "What trigonometric formula relates chord length to circle radius?",
    level: "advanced",
    codeExample: "import math\nside = 2 * r * math.sin(math.pi / n)"
  },
  {
    question: "How do you calculate vertex coordinates of an N-gon using polar coordinates?",
    shortAnswer: "x = cx + R * cos(2 * pi * i / N), y = cy + R * sin(2 * pi * i / N).",
    explanation: "Polar to Cartesian conversion places all N vertices evenly on a circle of radius R.",
    hint: "What equations convert polar radius and angle into (x, y)?",
    level: "advanced",
    codeExample: "x = cx + r * math.cos(angle)\ny = cy + r * math.sin(angle)"
  },
  {
    question: "What is an apothem in regular polygon geometry?",
    shortAnswer: "The perpendicular distance from the center of the polygon to the midpoint of any side.",
    explanation: "apothem = R * cos(pi / N) = side / (2 * tan(pi / N)).",
    hint: "What is the distance from polygon center to side midpoint?",
    level: "expert",
    codeExample: "apothem = r * math.cos(math.pi / n)"
  },
  {
    question: "How do you calculate the area of a regular N-sided polygon in Python?",
    shortAnswer: "Area = (1/2) * Perimeter * Apothem = (N * side^2) / (4 * tan(pi / N)).",
    explanation: "Standard regular polygon area formula.",
    hint: "How is area related to perimeter and apothem?",
    level: "expert",
    codeExample: "area = (n * (side ** 2)) / (4 * math.tan(math.pi / n))"
  },
  {
    question: "What is a non-convex (concave) polygon?",
    shortAnswer: "A polygon where at least one interior angle exceeds 180 degrees (having internal indentations).",
    explanation: "The 360/N rule applies strictly to convex regular polygons.",
    hint: "What type of polygon has indentations and angles > 180°?",
    level: "moderate",
    codeExample: "# Concave polygon has reflex angles"
  },
  {
    question: "What happens as N approaches infinity in the 360/N formula?",
    shortAnswer: "The exterior turn approaches 0 degrees, and the polygon converges into a smooth continuous circle.",
    explanation: "Calculus limit: lim (N->inf) of N-gon = Circle.",
    hint: "What geometric shape is the limit of an infinite-sided polygon?",
    level: "moderate",
    codeExample: "# Circle approximation"
  },
  {
    question: "How do you draw a regular heptagon (7 sides) in Python Turtle?",
    shortAnswer: "Loop 7 times with `t.forward(length)` and `t.left(360 / 7)`.",
    explanation: "360 / 7 ≈ 51.42857° floating-point turn angle.",
    hint: "Can turn angles be floating-point numbers?",
    level: "basic",
    codeExample: "for _ in range(7):\n    t.forward(70); t.left(360 / 7)"
  },
  {
    question: "Why does `360 / n` use float division in Python 3?",
    shortAnswer: "Because `360 // n` integer division drops decimal remainders, causing imperfect closure and gaps in heptagons and 11-gons.",
    explanation: "True float division `/` ensures mathematically exact rotational angle accumulation.",
    hint: "Why is true division `/` better than floor division `//` for angles?",
    level: "moderate",
    codeExample: "# Always use 360 / n, NOT 360 // n"
  },
  {
    question: "How do you draw concentric nested regular polygons with matching side count?",
    shortAnswer: "Loop over increasing side lengths while adjusting starting corner coordinates.",
    explanation: "Scaling side lengths while keeping angle constant produces nested concentric geometric frames.",
    hint: "How do you scale nested polygons?",
    level: "moderate",
    codeExample: "for s in range(20, 120, 20):\n    draw_polygon(sides=6, length=s)"
  },
  {
    question: "What is the sum of interior angles of a hexagon?",
    shortAnswer: "720 degrees.",
    explanation: "(6 - 2) * 180° = 4 * 180° = 720°.",
    hint: "What is (6 - 2) * 180?",
    level: "basic",
    codeExample: "# Hexagon interior sum = 720°"
  },
  {
    question: "How do you write a universal parameterized `polygon(t, sides, length)` function in Python?",
    shortAnswer: "Accept `sides` and `length`, calculate `angle = 360 / sides`, and loop `sides` times.",
    explanation: "Parameterized functions represent clean functional abstraction.",
    hint: "What parameters should a reusable polygon function accept?",
    level: "basic",
    codeExample: "def polygon(t, sides, length):\n    for _ in range(sides): t.forward(length); t.left(360/sides)"
  },
  {
    question: "What is a Reuleaux Triangle?",
    shortAnswer: "A curved geometric shape of constant width formed by intersecting 3 circular arcs centered at the vertices of an equilateral triangle.",
    explanation: "Combines triangle vertex geometry with circular arc drawing.",
    hint: "What curved shape is constructed on top of an equilateral triangle?",
    level: "expert",
    codeExample: "# Reuleaux triangle generator"
  },
  {
    question: "How do you draw a tessellated honeycomb grid using hexagons?",
    shortAnswer: "Arrange hexagons where adjacent columns are spaced by `1.5 * side` and rows by `sqrt(3) * side`.",
    explanation: "Regular hexagons tile the 2D Euclidean plane with zero gaps.",
    hint: "Why are hexagons ideal for tiling 2D surfaces?",
    level: "expert",
    codeExample: "# Hexagonal tessellation spacing"
  },
  {
    question: "What is the exterior angle for a regular icosagon (20 sides)?",
    shortAnswer: "18 degrees.",
    explanation: "360 / 20 = 18°.",
    hint: "What is 360 divided by 20?",
    level: "basic",
    codeExample: "t.left(18)  # for 20-gon"
  },
  {
    question: "How do you draw a polygon centered at origin (0,0) without polar coordinates?",
    shortAnswer: "Calculate apothem and half-side, position turtle at `(-side/2, -apothem)`, and draw with `360/N` turns.",
    explanation: "Offsetting by apothem centers the polygon bounding box around the origin.",
    hint: "How does apothem offset center a polygon?",
    level: "advanced",
    codeExample: "# Center offset with apothem"
  },
  {
    question: "Can polygons have negative side lengths in Turtle?",
    shortAnswer: "Passing negative length moves the turtle backward while turning, drawing an inverted polygon.",
    explanation: "Negative values invert forward vector displacement direction.",
    hint: "What happens when forward receives a negative distance?",
    level: "moderate",
    codeExample: "t.forward(-50) # Moves backward"
  },
  {
    question: "What is the total sum of exterior angles for an irregular non-self-intersecting polygon?",
    shortAnswer: "Still exactly 360 degrees.",
    explanation: "The Total Turning Theorem holds for ALL simple closed polygons regardless of side lengths.",
    hint: "Does the 360° total turning rule hold for irregular polygons?",
    level: "moderate",
    codeExample: "# Total exterior sum remains 360°"
  },
  {
    question: "How do you fill a regular polygon with a gradient in Turtle?",
    shortAnswer: "Draw concentric shrinking polygons inside with gradually shifting fill colors.",
    explanation: "Layering shrinking concentric polygons creates a step-gradient illusion.",
    hint: "How do shrinking polygons create gradient fills?",
    level: "advanced",
    codeExample: "# Concentric polygon gradient"
  },
  {
    question: "How do you draw an equilateral triangle pointing downwards?",
    shortAnswer: "Start with `t.setheading(0)` and turn `t.right(120)` instead of `t.left(120)`.",
    explanation: "Clockwise right turns invert the vertical orientation of the polygon.",
    hint: "How does right turn change polygon orientation?",
    level: "basic",
    codeExample: "for _ in range(3): t.forward(100); t.right(120)"
  },
  {
    question: "How do you verify mathematically that a polygon has closed completely?",
    shortAnswer: "Check that `t.heading()` has returned to initial angle and `t.distance(start_x, start_y) < 0.001`.",
    explanation: "Floating-point distance checking verifies closed loop topology.",
    hint: "What query checks if turtle returned to starting coordinates?",
    level: "advanced",
    codeExample: "assert t.distance(start_pos) < 0.01"
  },
  {
    question: "What is the golden ratio polygon?",
    shortAnswer: "The regular pentagon, where the ratio of diagonal length to side length is the Golden Ratio (phi ≈ 1.618).",
    explanation: "Pentagons and pentagrams contain inherent golden ratio proportions.",
    hint: "Which 5-sided polygon contains the golden ratio?",
    level: "advanced",
    codeExample: "# Golden ratio phi in pentagons"
  },
  {
    question: "Why should `math.radians()` or `2 * math.pi` be used when computing polar coordinates?",
    shortAnswer: "Because Python's `math.sin()` and `math.cos()` functions expect angle arguments in radians, not degrees.",
    explanation: "Converting degrees to radians (`deg * pi / 180`) is required for Python's math library.",
    hint: "Do Python math trig functions use degrees or radians?",
    level: "moderate",
    codeExample: "rad = math.radians(deg)"
  },
  {
    question: "What is the summary golden rule of polygon mathematics in Python graphics?",
    shortAnswer: "Always steer by the exterior turn angle `theta = 360 / N`, use true division (`/`), and use polar coordinates `(R*cos, R*sin)` when centering shapes on origin.",
    explanation: "This guarantees mathematically exact geometry and effortless scaling across all polygon counts.",
    hint: "What rule governs all regular polygon vector geometry?",
    level: "basic",
    codeExample: "# theta = 360 / N | polar: (cx + R*cos, cy + R*sin)"
  }
];

export default questions;
