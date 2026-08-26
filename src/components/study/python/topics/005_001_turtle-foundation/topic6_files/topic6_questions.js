// src/components/study/python/topics/005_001_turtle-foundation/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Rotation control: left(), right(), setheading(), degrees vs angles

const questions = [
  {
    question: "What rotational directions do 't.left(angle)' and 't.right(angle)' represent in Python Turtle?",
    shortAnswer: "'t.left(angle)' rotates counter-clockwise (increasing the heading angle), while 't.right(angle)' rotates clockwise (decreasing the heading angle).",
    explanation: "Standard rotation direction conventions in Turtle Graphics.",
    hint: "left() = counter-clockwise (increasing angle); right() = clockwise (decreasing angle).",
    level: "basic",
    codeExample: "t.left(90)  # Counter-clockwise turn\nt.right(90) # Clockwise turn"
  },
  {
    question: "What is the Exterior Angle Theorem for drawing regular $N$-sided polygons?",
    shortAnswer: "To draw a closed regular $N$-sided polygon, the turtle must turn by an exterior angle of $\\theta = 360^\\circ / N$ at each vertex.",
    explanation: "Total turning theorem for closed simple polygons.",
    hint: "turn_angle = 360 / N.",
    level: "basic",
    codeExample: "# Equilateral Triangle: 360/3 = 120° | Square: 360/4 = 90° | Hexagon: 360/6 = 60°"
  },
  {
    question: "Why must a turtle turn 120° to draw an equilateral triangle whose interior angles are 60°?",
    shortAnswer: "The turtle turns by the exterior angle ($180^\\circ - 60^\\circ = 120^\\circ$) to change its heading along the next side, completing a total rotation of $360^\\circ$ around the polygon.",
    explanation: "Interior vs exterior turning angle geometry.",
    hint: "The turtle turns by the exterior angle: 180° - 60° = 120°.",
    level: "basic",
    codeExample: "for _ in range(3):\n    t.forward(100)\n    t.left(120) # 120° exterior turn creates 60° interior angle"
  },
  {
    question: "What are the shorthand aliases for 'left()', 'right()', and 'setheading()'?",
    shortAnswer: "'t.lt()' for 'left()', 't.rt()' for 'right()', and 't.seth()' for 'setheading()'.",
    explanation: "Shorthand aliases in the turtle rotation API.",
    hint: "lt(), rt(), and seth().",
    level: "basic",
    codeExample: "t.lt(45)   # left(45)\nt.rt(90)   # right(90)\nt.seth(0)  # setheading(0)"
  },
  {
    question: "How does 'setheading(angle)' differ from 'left(angle)' or 'right(angle)'?",
    shortAnswer: "'setheading(angle)' is an absolute orientation setting (e.g. Setting direction directly to 90° North regardless of previous angle), whereas 'left()' and 'right()' are relative rotational turns added to or subtracted from the current heading.",
    explanation: "Absolute heading orientation vs relative rotational turning.",
    hint: "setheading() is absolute direction; left()/right() are relative additions/subtractions.",
    level: "basic",
    codeExample: "t.setheading(90) # Absolute North\nt.left(30)       # Relative turn to 120°"
  },
  {
    question: "How do you switch the angular unit mode in Python Turtle to radians?",
    shortAnswer: "Using 'screen.radians()', which sets the full circle angle to $2\\pi$ ($6.28318...$ radians); switch back to degrees using 'screen.degrees()'.",
    explanation: "Switching between degrees and radians modes.",
    hint: "screen.radians() for radians mode; screen.degrees() for standard degrees.",
    level: "moderate",
    codeExample: "screen.radians()\nt.setheading(3.14159 / 2) # Points North (pi/2 radians)"
  },
  {
    question: "What is the exterior turning angle for drawing a regular hexagon ($N=6$)?",
    shortAnswer: "60 degrees ($360^\\circ / 6 = 60^\\circ$).",
    explanation: "Exterior angle calculation for hexagon.",
    hint: "360 / 6 = 60 degrees.",
    level: "basic",
    codeExample: "for _ in range(6):\n    t.forward(80)\n    t.left(60)"
  },
  {
    question: "What is the exterior turning angle for drawing a regular pentagon ($N=5$)?",
    shortAnswer: "72 degrees ($360^\\circ / 5 = 72^\\circ$).",
    explanation: "Exterior angle calculation for pentagon.",
    hint: "360 / 5 = 72 degrees.",
    level: "basic",
    codeExample: "for _ in range(5):\n    t.forward(100)\n    t.left(72)"
  },
  {
    question: "What is the exterior turning angle for drawing a regular octagon ($N=8$)?",
    shortAnswer: "45 degrees ($360^\\circ / 8 = 45^\\circ$).",
    explanation: "Exterior angle calculation for octagon.",
    hint: "360 / 8 = 45 degrees.",
    level: "basic",
    codeExample: "for _ in range(8):\n    t.forward(60)\n    t.left(45)"
  },
  {
    question: "How do you approximate a circle using a loop of small forward steps and angle turns?",
    shortAnswer: "'for _ in range(360): t.forward(1); t.left(1)' (360 1-pixel steps turning 1 degree each).",
    explanation: "Polygon approximation of circles in Turtle Graphics.",
    hint: "360 steps of forward(1) and left(1).",
    level: "basic",
    codeExample: "for _ in range(360):\n    t.forward(1)\n    t.left(1) # Draws circle of circumference ~360"
  },
  {
    question: "What happens if a turtle at 350° executes 't.left(20)'?",
    shortAnswer: "The new heading angle is normalized to 10.0° ($370^\\circ \\pmod{360^\\circ} = 10^\\circ$).",
    explanation: "Modulo 360 degree normalization across the full circle boundary.",
    hint: "350 + 20 = 370, which normalizes to 10.0 degrees.",
    level: "basic",
    codeExample: "t.setheading(350)\nt.left(20)\nassert t.heading() == 10.0"
  },
  {
    question: "What happens if a turtle at 10° executes 't.right(20)'?",
    shortAnswer: "The new heading angle is normalized to 350.0° ($-10^\\circ \\pmod{360^\\circ} = 350^\\circ$).",
    explanation: "Modulo 360 degree normalization for negative rotation.",
    hint: "10 - 20 = -10, which normalizes to 350.0 degrees.",
    level: "basic",
    codeExample: "t.setheading(10)\nt.right(20)\nassert t.heading() == 350.0"
  },
  {
    question: "Can you pass negative angles to 'left()' and 'right()'?",
    shortAnswer: "Yes; 't.left(-90)' rotates 90 degrees clockwise (equivalent to 't.right(90)'), and 't.right(-90)' rotates 90 degrees counter-clockwise (equivalent to 't.left(90)').",
    explanation: "Signed rotational angles.",
    hint: "Yes, negative left turns right, and negative right turns left.",
    level: "basic",
    codeExample: "t.left(-90) # Equivalent to t.right(90)"
  },
  {
    question: "How do you calculate the turning angle to draw a 5-pointed star (pentagram)?",
    shortAnswer: "A 5-pointed star turns by 144 degrees at each tip ($720^\\circ / 5 = 144^\\circ$, completing 2 full revolutions).",
    explanation: "Star polygon total turning angle formula.",
    hint: "720 / 5 = 144 degrees.",
    level: "moderate",
    codeExample: "for _ in range(5):\n    t.forward(150)\n    t.right(144) # Star vertex turn"
  },
  {
    question: "How do you point the turtle towards a specific coordinate (target_x, target_y)?",
    shortAnswer: "Using 't.setheading(t.towards(target_x, target_y))'.",
    explanation: "Combining towards() and setheading() to aim at target coordinates.",
    hint: "Use t.setheading(t.towards(x, y)).",
    level: "moderate",
    codeExample: "angle = t.towards(100, 100)\nt.setheading(angle) # Aims directly at (100, 100)"
  },
  {
    question: "How do you reset the turtle's orientation to East (0°) without moving its position?",
    shortAnswer: "By calling 't.setheading(0)' (or 't.seth(0)').",
    explanation: "Resetting orientation in place.",
    hint: "Use t.setheading(0).",
    level: "basic",
    codeExample: "t.setheading(0) # Re-orients East"
  },
  {
    question: "Why does accumulating fractional rotational turns in loops cause slight geometric distortion?",
    shortAnswer: "Infinitesimal IEEE 754 floating-point rounding errors in degree-to-radian trigonometric transformations accumulate over hundreds of iterations; using exact integer angles or normalizing prevents drift.",
    explanation: "Accumulative rotational precision in procedural art.",
    hint: "IEEE 754 float rounding errors; normalize with modulo 360.",
    level: "moderate",
    codeExample: "# Normalize heading to eliminate drift"
  },
  {
    question: "What is the total sum of exterior angles for any simple closed convex polygon?",
    shortAnswer: "Exactly 360 degrees ($2\\pi$ radians), regardless of the number of sides $N$.",
    explanation: "Total turning theorem for closed plane curves.",
    hint: "Always 360 degrees for any simple closed convex polygon.",
    level: "basic",
    codeExample: "# Total exterior sum = 360° always"
  },
  {
    question: "How do you generate a colorful spiral mandala by combining incremental forward steps with constant angle turns?",
    shortAnswer: "'for i in range(100): t.forward(i * 3); t.left(59)' (turning an angle like 59° or 91° creates intricate multi-arm spiraling rosettes).",
    explanation: "Spiral rosette generation algorithm.",
    hint: "Increase step length incrementally inside a loop while turning a fixed angle.",
    level: "moderate",
    codeExample: "for i in range(100):\n    t.forward(i * 2)\n    t.left(59) # Generates beautiful spiral"
  },
  {
    question: "What is the ultimate golden rule of Rotation Control in Turtle Graphics?",
    shortAnswer: "Always use the exterior angle theorem ($360^\\circ / N$) when constructing regular polygons, choose `left()` / `right()` for relative procedural shapes and `setheading()` for absolute compass bearings, and remember that 0° is East, 90° is North, 180° is West, and 270° is South.",
    explanation: "The complete standard for rotational geometry in Python Turtle.",
    hint: "turn_angle = 360/N + relative vs absolute + compass quadrant conventions.",
    level: "basic",
    codeExample: "# Enterprise Rotation Control Standard"
  }
];

export default questions;