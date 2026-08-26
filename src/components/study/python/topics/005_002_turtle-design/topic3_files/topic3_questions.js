// src/components/study/python/topics/005_002_turtle-design/topic3_files/topic3_questions.js

const questions = [
  {
    question: "What are the two mandatory methods used to fill a shape with color in Turtle?",
    shortAnswer: "turtle.begin_fill() and turtle.end_fill().",
    explanation: "begin_fill() marks the starting vertex of the fill path, and end_fill() renders the interior color.",
    hint: "What pair of functions starts and finishes a fill operation?",
    level: "basic",
    codeExample: "t.begin_fill()\nfor _ in range(4): t.forward(100); t.left(90)\nt.end_fill()"
  },
  {
    question: "What happens if you forget to call turtle.end_fill()?",
    shortAnswer: "The shape is never filled, remaining a hollow line outline.",
    explanation: "Tkinter only calculates and fills polygon raster data when end_fill() is explicitly invoked.",
    hint: "Will the color appear if the fill is never ended?",
    level: "basic",
    codeExample: "# Missing end_fill() -> Shape remains hollow"
  },
  {
    question: "How do you set the fill color independently from the stroke color?",
    shortAnswer: "Use `turtle.fillcolor(color)`.",
    explanation: "fillcolor() specifies the interior color while preserving the current pencolor() stroke.",
    hint: "Which method specifically sets only the interior color?",
    level: "basic",
    codeExample: "t.pencolor('black')\nt.fillcolor('cyan')"
  },
  {
    question: "What does turtle.filling() return?",
    shortAnswer: "A boolean indicating whether a fill operation is currently active (between begin_fill and end_fill).",
    explanation: "t.filling() returns True if begin_fill() was called without matching end_fill().",
    hint: "What query checks if a fill path is currently open?",
    level: "moderate",
    codeExample: "print(t.filling()) # True / False"
  },
  {
    question: "What happens if end_fill() is called on an unclosed polygon path?",
    shortAnswer: "Turtle automatically connects the last coordinate back to the begin_fill() coordinate with an invisible line and fills it.",
    explanation: "The graphics engine always closes the polygon automatically before filling.",
    hint: "Does Turtle automatically close unclosed paths when filling?",
    level: "moderate",
    codeExample: "# 3 lines of a square + end_fill() fills the triangular closure"
  },
  {
    question: "How does the Even-Odd winding rule affect self-intersecting stars?",
    shortAnswer: "Overlapping regions may be left unfilled if the winding number parity is even.",
    explanation: "Complex self-crossing polygons alternate filled and hollow interior pockets based on parity ray-casting.",
    hint: "Why is the center of a 5-pointed star sometimes unfilled?",
    level: "advanced",
    codeExample: "# 5-pointed star winding behavior"
  },
  {
    question: "Can multiple nested begin_fill() calls be active simultaneously?",
    shortAnswer: "No, calling begin_fill() while already filling resets the active fill path buffer.",
    explanation: "Always pair exactly one `begin_fill()` with one `end_fill()` before starting a new shape.",
    hint: "Can fill paths be nested or must they be sequential?",
    level: "moderate",
    codeExample: "# Always pair begin_fill() -> draw -> end_fill()"
  },
  {
    question: "How do you draw a filled circle in Turtle?",
    shortAnswer: "Call `t.begin_fill()`, then `t.circle(radius)`, then `t.end_fill()`.",
    explanation: "The circle curve forms a closed loop that is filled smoothly upon calling end_fill().",
    hint: "How do you wrap circle() with fill commands?",
    level: "basic",
    codeExample: "t.begin_fill()\nt.circle(60)\nt.end_fill()"
  },
  {
    question: "Does `t.penup()` cancel an active `begin_fill()`?",
    shortAnswer: "No, vertex points continue to be recorded even if the pen is up during movement.",
    explanation: "The fill polygon buffer records all coordinate movements between begin_fill and end_fill regardless of penup.",
    hint: "Does lifting the pen clear the fill vertex buffer?",
    level: "advanced",
    codeExample: "t.begin_fill()\nt.forward(100); t.penup(); t.left(90); t.forward(100); t.pendown()\nt.end_fill() # Fills the full polygon!"
  },
  {
    question: "How do you create a shape with no visible outline stroke, only solid fill?",
    shortAnswer: "Set `t.pencolor('')` or set `t.pencolor()` to the same color as `t.fillcolor()` or canvas background.",
    explanation: "Matching pencolor to fillcolor eliminates visual boundary stroke contrast.",
    hint: "How do you make the outline invisible against the fill?",
    level: "moderate",
    codeExample: "t.color('#38bdf8', '#38bdf8') # Same pen & fill"
  },
  {
    question: "What is the recommended design pattern for drawing multi-part composite scenes (e.g. house, car)?",
    shortAnswer: "Draw and fill each sub-component (base, roof, windows) with separate begin_fill()/end_fill() pairs.",
    explanation: "Breaking illustrations into modular filled polygons prevents unwanted color bleeding across shapes.",
    hint: "Should an entire town scene use one fill or multiple separate fills?",
    level: "basic",
    codeExample: "# Part 1: Roof -> end_fill()\n# Part 2: Walls -> end_fill()"
  },
  {
    question: "Why should you avoid drawing complex 1000-line fractals inside a single begin_fill()?",
    shortAnswer: "Complex self-intersecting paths cause heavy CPU rasterization slowdowns and distorted fill artifacts.",
    explanation: "Filling thousands of self-intersecting edges forces Tkinter to calculate complex polygon triangulation.",
    hint: "What happens to performance when filling thousands of self-crossing lines?",
    level: "advanced",
    codeExample: "# Keep fractals wireframe or fill simple sub-polygons"
  },
  {
    question: "How do you fill an irregular hand-drawn polygon defined by an arbitrary list of (x, y) coordinates?",
    shortAnswer: "Call begin_fill(), iterate through coordinate points with goto(x, y), and call end_fill().",
    explanation: "Iterating through point lists creates custom freeform vector shapes.",
    hint: "How do you traverse a list of vertices with Turtle?",
    level: "moderate",
    codeExample: "t.begin_fill()\nfor x, y in polygon_vertices:\n    t.goto(x, y)\nt.end_fill()"
  },
  {
    question: "Can fillcolor be an RGB tuple like `(56, 189, 248)`?",
    shortAnswer: "Yes, provided `screen.colormode(255)` is enabled.",
    explanation: "fillcolor supports named strings, hex strings, and RGB tuples in either 1.0 or 255 modes.",
    hint: "Does fillcolor accept the same color formats as pencolor?",
    level: "basic",
    codeExample: "screen.colormode(255)\nt.fillcolor((56, 189, 248))"
  },
  {
    question: "What happens if you change `fillcolor()` while inside a `begin_fill()` block?",
    shortAnswer: "The final color active at the exact moment `end_fill()` is called will be used for the entire shape.",
    explanation: "Fill color is evaluated at the conclusion of the fill operation.",
    hint: "Does the fill color apply when starting or when finishing?",
    level: "moderate",
    codeExample: "t.begin_fill()\nt.fillcolor('red')\n# draw...\nt.fillcolor('blue')\nt.end_fill() # Entire shape fills BLUE!"
  },
  {
    question: "How do you draw a semi-circular filled arc (pie slice or crescent)?",
    shortAnswer: "Move from center to perimeter, draw arc with `t.circle(r, extent)`, return to center, and call `end_fill()`.",
    explanation: "Combining radial straight lines with curved arc segments creates pie slices and wedges.",
    hint: "How do you close a pie wedge path back to the origin?",
    level: "moderate",
    codeExample: "t.begin_fill()\nt.forward(100); t.left(90)\nt.circle(100, 60); t.goto(0, 0)\nt.end_fill()"
  },
  {
    question: "What is the result of `t.fillcolor()` with no arguments?",
    shortAnswer: "Returns the current fill color as a string or RGB tuple.",
    explanation: "Like all Turtle color methods, it functions as a getter when called without arguments.",
    hint: "What does calling fillcolor without arguments return?",
    level: "basic",
    codeExample: "current_fill = t.fillcolor()"
  },
  {
    question: "How do you draw a checkerboard grid with alternating black and white filled tiles?",
    shortAnswer: "Use 2D nested loops for row and column coordinates, filling each tile with `row + col % 2` color logic.",
    explanation: "Alternating fills across a 2D coordinate grid produces clean checkerboards.",
    hint: "What mathematical formula alternates between two states on a 2D grid?",
    level: "advanced",
    codeExample: "# Checkerboard generator"
  },
  {
    question: "Does `t.reset()` clear the active fill color?",
    shortAnswer: "Yes, reset() restores fillcolor back to default 'black' and pencolor to 'black'.",
    explanation: "reset() clears all drawings and restores initial turtle attribute states.",
    hint: "Does reset() restore factory default colors?",
    level: "moderate",
    codeExample: "t.reset() # fillcolor becomes 'black'"
  },
  {
    question: "How do you fill a donut shape (a shape with a hollow hole inside)?",
    shortAnswer: "Draw the outer shape and fill it, then draw and fill a smaller inner shape matching the canvas background color.",
    explanation: "Overdrawing with the background color creates the visual illusion of a hollow donut or aperture.",
    hint: "How do you punch a visual hole in a solid 2D shape?",
    level: "advanced",
    codeExample: "# Outer filled circle in gold -> Inner circle in bgcolor"
  },
  {
    question: "What is the difference between filling convex vs concave polygons?",
    shortAnswer: "Convex polygons fill uniformly without ambiguity; concave polygons may produce complex internal winding triangles.",
    explanation: "Tkinter's polygon rasterizer handles concave shapes using the standard non-zero/even-odd winding algorithm.",
    hint: "Do concave shapes have internal indentations?",
    level: "expert",
    codeExample: "# Concave polygon fill"
  },
  {
    question: "Can two different turtles draw into the same begin_fill() path?",
    shortAnswer: "No, each Turtle instance maintains its own private vertex buffer.",
    explanation: "Fill paths are strictly encapsulated within the specific Turtle instance that invoked begin_fill().",
    hint: "Are fill buffers shared across multiple turtles?",
    level: "advanced",
    codeExample: "# Each turtle manages its own independent fill"
  },
  {
    question: "How do you create a stylized badge with a 4px black border and glowing cyan fill?",
    shortAnswer: "Set `t.pensize(4)`, `t.pencolor('black')`, `t.fillcolor('#38bdf8')`, and wrap drawing with `begin_fill()`/`end_fill()`.",
    explanation: "Combining pensize and dual colors creates professional vector UI components.",
    hint: "How do you configure stroke weight, stroke color, and fill color together?",
    level: "basic",
    codeExample: "t.pensize(4); t.color('black', '#38bdf8')"
  },
  {
    question: "What happens if an exception occurs between `begin_fill()` and `end_fill()`?",
    shortAnswer: "Execution halts immediately, leaving the incomplete fill path dangling without rendering color.",
    explanation: "Uncaught errors abort the Python process before reaching end_fill().",
    hint: "Will color render if code crashes before end_fill?",
    level: "moderate",
    codeExample: "# Aborted fill due to error"
  },
  {
    question: "How do you fill an equilateral triangle centered on the canvas?",
    shortAnswer: "Position turtle at `(0, -radius)`, wrap a 3-iteration loop with `begin_fill()` and `end_fill()`.",
    explanation: "3 sides with 120-degree exterior turns produce a closed equilateral triangle.",
    hint: "What exterior turn angle creates an equilateral triangle?",
    level: "basic",
    codeExample: "t.begin_fill()\nfor _ in range(3): t.forward(100); t.left(120)\nt.end_fill()"
  },
  {
    question: "Why should `t.speed(0)` or `screen.tracer(0)` be used when filling complex multi-petal flowers?",
    shortAnswer: "To eliminate animation delays and render dozens of filled petals instantaneously.",
    explanation: "Instant rendering avoids waiting for each fill rasterization step during procedural generation.",
    hint: "How do you speed up rendering for complex filled geometry?",
    level: "moderate",
    codeExample: "screen.tracer(0)\n# draw 50 filled petals\nscreen.update()"
  },
  {
    question: "How do you fill a regular octagon (stop sign shape)?",
    shortAnswer: "Wrap an 8-iteration loop with forward and 45-degree turns inside `begin_fill()` and `end_fill()`.",
    explanation: "360 / 8 = 45-degree exterior angles form a closed 8-sided polygon.",
    hint: "What angle is 360 divided by 8?",
    level: "basic",
    codeExample: "t.begin_fill()\nfor _ in range(8): t.forward(50); t.left(45)\nt.end_fill()"
  },
  {
    question: "What is the effect of changing `t.pencolor()` during drawing while inside `begin_fill()`?",
    shortAnswer: "Individual line segments will have different stroke colors, while the interior is filled with a single solid `fillcolor`.",
    explanation: "Line stroke colors update per segment, but the interior fill uses one unified fillcolor.",
    hint: "Can a shape have a multi-colored outline with a solid filled center?",
    level: "advanced",
    codeExample: "# Multi-colored perimeter with solid center fill"
  },
  {
    question: "How do you draw a heart shape with smooth red fill in Turtle?",
    shortAnswer: "Combine left straight line, left 180-degree circular arc, right 180-degree circular arc, and right straight line inside fill commands.",
    explanation: "A classic Turtle geometry problem combining 2 straight lines and 2 semi-circles.",
    hint: "What geometric parts make up a standard 2D heart?",
    level: "advanced",
    codeExample: "# Classic Turtle Heart Shape"
  },
  {
    question: "What is the summary golden rule of Turtle fill mechanics?",
    shortAnswer: "Always explicitly set `fillcolor()`, call `begin_fill()` before the first vertex, draw a closed path, and call `end_fill()` immediately after the final vertex.",
    explanation: "Following this 4-step sequence guarantees perfect, artifact-free vector fills in every Python graphics program.",
    hint: "What 4 steps guarantee reliable filled shapes?",
    level: "basic",
    codeExample: "# 1. fillcolor() -> 2. begin_fill() -> 3. closed path -> 4. end_fill()"
  }
];

export default questions;
