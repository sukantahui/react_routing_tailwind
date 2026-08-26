// src/components/study/python/topics/005_003_turtle-patterns/topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is an Archimedean spiral in polar mathematics?",
    shortAnswer: "A spiral where the radius `r` increases linearly with angle `theta`: `r = a * theta`.",
    explanation: "Because distance grows linearly, all successive spiral coils have constant equal separation distances.",
    hint: "What spiral has constant spacing between adjacent coil rings?",
    level: "basic",
    codeExample: "r = a * theta"
  },
  {
    question: "How do you draw an Archimedean spiral in Python Turtle?",
    shortAnswer: "Loop over increasing steps: `t.forward(i * step_scale)` followed by a fixed turn angle `t.left(angle)`.",
    explanation: "Increasing forward step length incrementally with loop index `i` produces linear radial growth.",
    hint: "How do you increment step length in a loop?",
    level: "basic",
    codeExample: "for i in range(200):\n    t.forward(i * 0.5); t.left(10)"
  },
  {
    question: "What produces a 4-armed square spiral vortex?",
    shortAnswer: "Setting the turn angle to 91 degrees instead of 90 degrees inside an expanding forward loop.",
    explanation: "The 1-degree excess prevents closure and shifts each concentric square outward into a dynamic vortex.",
    hint: "What angle turn turns a square into a spiral?",
    level: "basic",
    codeExample: "for i in range(100): t.forward(i * 3); t.left(91)"
  },
  {
    question: "What is a Logarithmic (Equiangular) spiral?",
    shortAnswer: "A spiral where the radius grows exponentially with angle: `r = a * e^(b * theta)`.",
    explanation: "Natural phenomena like nautilus shells, hurricane vortices, and spiral galaxies follow logarithmic spiral math.",
    hint: "What spiral grows exponentially and models nautilus shells?",
    level: "moderate",
    codeExample: "r = a * math.exp(b * theta)"
  },
  {
    question: "How do you construct a Fibonacci Golden Spiral using Turtle arcs?",
    shortAnswer: "Iterate through the Fibonacci sequence `[1, 1, 2, 3, 5, 8, 13...]`, calling `t.circle(radius, 90)` for each value.",
    explanation: "Each 90-degree circular arc corresponds to a quadrant of adjacent golden rectangles.",
    hint: "What arc angle corresponds to a quarter circle?",
    level: "moderate",
    codeExample: "for r in fib:\n    t.circle(r, 90)"
  },
  {
    question: "What produces a 6-armed hexagonal spiral?",
    shortAnswer: "Setting the turn angle to 61 degrees (or 59 degrees) inside an expanding forward loop.",
    explanation: "Slight deviation from the regular hexagon exterior angle (60°) produces hexagonal spiral arms.",
    hint: "What angle turn is 1 degree off from a hexagon?",
    level: "basic",
    codeExample: "for i in range(100): t.forward(i * 2); t.left(61)"
  },
  {
    question: "What is the difference between an Archimedean spiral and a Logarithmic spiral?",
    shortAnswer: "Archimedean spirals have constant distance between coils; Logarithmic spirals have exponentially increasing distance between coils.",
    explanation: "Linear growth vs exponential growth distinguishes the two geometries.",
    hint: "Which spiral has constant coil spacing vs expanding coil spacing?",
    level: "moderate",
    codeExample: "# Archimedean: r=a*θ | Logarithmic: r=a*e^(b*θ)"
  },
  {
    question: "How do you draw a multi-armed spiral galaxy with N arms?",
    shortAnswer: "Run an outer loop for N arms, rotating the turtle by `360 / N` before drawing each spiral arm.",
    explanation: "Combining radial rotation with spiral trajectories creates multi-armed pinwheels and galaxies.",
    hint: "How do you rotate multiple spiral arms around the center?",
    level: "advanced",
    codeExample: "for arm in range(4):\n    t.penup(); t.goto(0,0); t.setheading(arm * 90); t.pendown()\n    draw_spiral()"
  },
  {
    question: "What happens if the turn angle is set to 89 degrees instead of 91 degrees?",
    shortAnswer: "The spiral turns inward or mirrors orientation relative to the 91-degree clockwise vortex.",
    explanation: "Angles less than 90° advance the path faster than the perimeter, reversing perceived spiral flow.",
    hint: "How does 89° differ in visual winding from 91°?",
    level: "moderate",
    codeExample: "# 89° produces clockwise/inward phase shift"
  },
  {
    question: "How do you draw a Fermat Spiral (parabolic spiral)?",
    shortAnswer: "Use polar equation `r = a * sqrt(theta)` where radius scales with the square root of angle.",
    explanation: "Fermat's spiral describes sunflower seed distribution and phyllotaxis patterns.",
    hint: "What spiral equation uses square root of angle?",
    level: "expert",
    codeExample: "r = a * math.sqrt(theta)"
  },
  {
    question: "What is the Golden Angle in phyllotaxis plant spirals?",
    shortAnswer: "Approximately 137.508 degrees (360° * (1 - 1/phi)).",
    explanation: "Rotating by 137.5° between successive points creates maximally packed sunflower seed head lattices.",
    hint: "What angle is approximately 137.5 degrees?",
    level: "advanced",
    codeExample: "GOLDEN_ANGLE = 137.508"
  },
  {
    question: "How do you draw a sunflower seed head in Python Turtle?",
    shortAnswer: "Loop over N seeds: `t.penup(); t.goto(r * cos(i*137.5°), r * sin(i*137.5°)); t.dot(size)` where `r = c * sqrt(i)`.",
    explanation: "Vogel's mathematical model for sunflower seed packing using the golden angle.",
    hint: "What formula packs dots into sunflower spiral heads?",
    level: "expert",
    codeExample: "# Vogel's model: angle = i * 137.5°, r = c * sqrt(i)"
  },
  {
    question: "What happens if the forward step inside an Archimedean spiral is fixed while angle decreases?",
    shortAnswer: "It produces a reciprocal hyperbolic spiral where radius increases as angle approaches zero.",
    explanation: "Hyperbolic spiral polar equation is `r = a / theta`.",
    hint: "What is an inverse hyperbolic spiral?",
    level: "expert",
    codeExample: "r = a / theta"
  },
  {
    question: "How do you create a 3D perspective vortex illusion with spirals?",
    shortAnswer: "Increase line pensize `t.pensize(i / 10)` as the spiral expands outwards.",
    explanation: "Varying line thickness alongside radius creates simulated 3D depth perspective.",
    hint: "How does modulating pen width create 3D depth?",
    level: "moderate",
    codeExample: "t.pensize(1 + i * 0.05)"
  },
  {
    question: "Why does `screen.tracer(0)` make spiral drawing dramatically smoother?",
    shortAnswer: "Spirals require hundreds of micro-segments; tracer(0) renders them as a single GPU frame without animation delays.",
    explanation: "Suppresses frame-by-frame overhead during 500+ segment computations.",
    hint: "Why is tracer(0) vital for 500-step spiral paths?",
    level: "basic",
    codeExample: "screen.tracer(0); ...; screen.update()"
  },
  {
    question: "What is an Archimedean spiral coil pitch?",
    shortAnswer: "The distance between consecutive turn loops, given by `d = 2 * pi * a`.",
    explanation: "The pitch is constant and depends only on parameter `a`.",
    hint: "What formula gives the spacing between spiral turns?",
    level: "advanced",
    codeExample: "pitch = 2 * math.pi * a"
  },
  {
    question: "How do you draw an inward winding spiral that starts outside and terminates at center?",
    shortAnswer: "Loop over descending range `range(max_steps, 0, -1)`: `t.forward(i * step); t.left(angle)`.",
    explanation: "Decreasing the forward step shrinks the radius toward (0,0).",
    hint: "How do you reverse a loop to spiral inward?",
    level: "moderate",
    codeExample: "for i in range(150, 0, -1):\n    t.forward(i * 0.5); t.left(15)"
  },
  {
    question: "How do you draw a Cornu Spiral (Clothoid / Euler Spiral)?",
    shortAnswer: "A spiral where curvature increases linearly with arc length, used in highway and rollercoaster track design.",
    explanation: "Evaluated using Fresnel integrals in computational geometry.",
    hint: "What spiral has curvature proportional to distance traveled?",
    level: "expert",
    codeExample: "# Clothoid / Euler spiral curvature"
  },
  {
    question: "What is the result of using a turn angle of 144 degrees in a spiral loop?",
    shortAnswer: "A 5-pointed star spiral vortex.",
    explanation: "144° is the exterior angle of a 5-pointed star (pentagram), so expanding steps produce a star vortex.",
    hint: "What geometric shape corresponds to a 144° turn?",
    level: "moderate",
    codeExample: "for i in range(80): t.forward(i * 2); t.left(144)"
  },
  {
    question: "How do you color code a spiral by angular sector?",
    shortAnswer: "Use `t.heading() // 60` to select one of 6 palette colors based on the current compass direction.",
    explanation: "Heading-based coloring creates rainbow quadrant fans.",
    hint: "How can turtle heading dictate color choices?",
    level: "moderate",
    codeExample: "sector = int(t.heading() // 60) % len(colors)"
  },
  {
    question: "What is a 3D conical spiral (helix)?",
    shortAnswer: "A spiral where the point moves along the surface of a cone, increasing radius and Z-height simultaneously.",
    explanation: "Projecting 3D conical coordinates onto a 2D canvas creates isometric helix spirals.",
    hint: "What spiral ascends a 3D cone surface?",
    level: "advanced",
    codeExample: "# 2D isometric conical helix"
  },
  {
    question: "How do you draw a spiral of expanding circles?",
    shortAnswer: "In each loop step, move along the spiral path and stamp or draw a circle whose radius scales with `i`.",
    explanation: "Combining spiral trajectories with secondary geometry produces bead necklace spirals.",
    hint: "How do you place shapes along a spiral path?",
    level: "moderate",
    codeExample: "for i in range(50): t.penup(); t.forward(i*2); t.left(30); t.pendown(); t.circle(i*0.5)"
  },
  {
    question: "What is an involute spiral?",
    shortAnswer: "The curve traced by the end of a taut string as it is unwound from a fixed cylinder or polygon.",
    explanation: "Used extensively in engineering for designing gear tooth profiles.",
    hint: "What spiral curve models unwinding string from a cylinder?",
    level: "expert",
    codeExample: "# Involute of circle for gear teeth"
  },
  {
    question: "How does the golden ratio phi (1.6180339) relate to the logarithmic spiral?",
    shortAnswer: "A Golden Spiral widens by a factor of phi for every quarter turn (90 degrees / pi/2 radians).",
    explanation: "Growth factor `b = ln(phi) / (pi / 2) ≈ 0.30635` in `r = a * e^(b * theta)`.",
    hint: "By what factor does a golden spiral expand every 90 degrees?",
    level: "advanced",
    codeExample: "b = math.log(1.6180339) / (math.pi / 2)"
  },
  {
    question: "How do you draw a double counter-rotating spiral (yin-yang vortex)?",
    shortAnswer: "Draw one clockwise spiral, return to center, and draw an identical counterclockwise spiral with opposite turns.",
    explanation: "Overlaying mirrored spiral paths produces interlocking counter-rotating vortices.",
    hint: "How do you mirror spiral directions?",
    level: "moderate",
    codeExample: "# Spiral 1: t.left(angle) | Spiral 2: t.right(angle)"
  },
  {
    question: "What happens if the turn angle is an exact divisor of 360 (e.g. 90 degrees)?",
    shortAnswer: "The path draws 4 concentric nested square lines without spiraling or rotating.",
    explanation: "Without an angular offset, the trajectory stays locked along the 4 Cartesian axes.",
    hint: "Why does 90° fail to create a rotational spiral vortex?",
    level: "basic",
    codeExample: "# 90° gives axis-aligned nested rectangles"
  },
  {
    question: "How do you prevent a long spiral from running off the screen boundaries?",
    shortAnswer: "Calculate maximum radius: `max_r = max_steps * step_size` and scale step size so `max_r < min(screen_width, screen_height) / 2`.",
    explanation: "Bounding box pre-calculation ensures all coils fit within canvas limits.",
    hint: "How do you bound spiral dimensions to window size?",
    level: "moderate",
    codeExample: "step_size = (window_width / 2) / total_steps"
  },
  {
    question: "Can recursive functions draw fractal spirals?",
    shortAnswer: "Yes, by calling `draw_spiral(step * 0.95, angle)` with a base case terminating when `step < 1`.",
    explanation: "Recursive branching produces self-similar fractal trees and spiral fronds.",
    hint: "How does recursion implement shrinking spirals?",
    level: "advanced",
    codeExample: "def spiral(len): if len > 1: t.forward(len); t.left(30); spiral(len * 0.9)"
  },
  {
    question: "What mathematical property makes spirals ubiquitous in biological growth?",
    shortAnswer: "Self-similarity: an organism can grow larger without changing its overall shape or structural proportions.",
    explanation: "Logarithmic spirals maintain constant equiangular geometry across all scales.",
    hint: "Why do shells and horns grow in logarithmic spirals?",
    level: "moderate",
    codeExample: "# Constant shape during scaling growth"
  },
  {
    question: "What is the summary formula for generating spirals in Python Turtle?",
    shortAnswer: "Combine an iterative forward step proportional to loop index (`forward(i * k)`) with a non-divisor turn angle (`left(angle)`).",
    explanation: "This simple 2-statement algorithm generates all polygonal, Archimedean, and vortex spirals.",
    hint: "What 2 commands form the core of all Turtle spirals?",
    level: "basic",
    codeExample: "for i in range(N): t.forward(i * k); t.left(angle)"
  }
];

export default questions;
