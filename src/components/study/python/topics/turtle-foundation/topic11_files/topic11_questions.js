const questions = [
  {
    question: "What is the external angle of a square?",
    shortAnswer: "90°.",
    explanation: "360° / 4 sides = 90° per turn.",
    hint: "Think of walking around a square.",
    level: "basic",
    codeExample: "t.right(90)"
  },
  {
    question: "How many times should you repeat the forward+turn loop to draw a square?",
    shortAnswer: "4 times.",
    explanation: "One iteration per side.",
    hint: "A square has 4 sides.",
    level: "basic",
    codeExample: "for _ in range(4): t.forward(100); t.right(90)"
  },
  {
    question: "What is the external angle for an equilateral triangle?",
    shortAnswer: "120°.",
    explanation: "360° / 3 = 120°.",
    hint: "Turn at each corner.",
    level: "basic",
    codeExample: "t.right(120)"
  },
  {
    question: "How would you draw a rectangle that is 200 units long and 100 units wide?",
    shortAnswer: "Repeat twice: forward(200), right(90), forward(100), right(90).",
    explanation: "Two pairs of equal sides.",
    hint: "One long, one short, repeat.",
    level: "moderate",
    codeExample: "for _ in range(2): t.forward(200); t.right(90); t.forward(100); t.right(90)"
  },
  {
    question: "Why does the turtle turn 90° for a square but 120° for a triangle?",
    shortAnswer: "External angle = 360° divided by number of sides.",
    explanation: "Square: 360/4=90°, triangle: 360/3=120°.",
    hint: "Sum of external angles always 360°.",
    level: "moderate",
    codeExample: "t.right(360 / n)"
  },
  {
    question: "What happens if you use `right(90)` but loop 3 times?",
    shortAnswer: "You get an open shape (not a triangle) – actually a 270° turn total, not closed.",
    explanation: "For a closed shape, external angle × sides must equal 360°.",
    hint: "Check: 90*3 = 270, not 360.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you draw a filled square?",
    shortAnswer: "Use `t.begin_fill()` before drawing and `t.end_fill()` after.",
    explanation: "The area enclosed by the path is filled with current fill color.",
    hint: "Set fill color with `t.fillcolor()`.",
    level: "basic",
    codeExample: "t.begin_fill(); for _ in range(4): t.forward(100); t.right(90); t.end_fill()"
  },
  {
    question: "What is the difference between drawing a square and a rectangle in code?",
    shortAnswer: "Square uses same side length 4 times; rectangle uses two different lengths, alternating.",
    explanation: "A square is a special case of rectangle with equal sides.",
    hint: "Rectangle: length, width, length, width.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How do you draw a square starting from its center instead of a corner?",
    shortAnswer: "Move half the side left and up from center, then draw as usual.",
    explanation: "Center to corner offset: (-side/2, side/2) using penup.",
    hint: "Use `goto(x - side/2, y + side/2)`.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What color methods can you use to fill a shape?",
    shortAnswer: "`pencolor()` for outline, `fillcolor()` for fill, or `color(pencolor, fillcolor)`.",
    explanation: "`begin_fill()` uses the current fill color.",
    hint: "Default fill is black.",
    level: "moderate",
    codeExample: "t.fillcolor('blue'); t.begin_fill(); ... ; t.end_fill()"
  },
  {
    question: "Why is it important to call `end_fill()` after drawing the shape?",
    shortAnswer: "It closes the fill region and applies the color.",
    explanation: "Without it, the shape may not be filled, or fill may be incomplete.",
    hint: "Always pair begin_fill with end_fill.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How can you draw a triangle that is not equilateral?",
    shortAnswer: "Use different forward distances for each side and appropriate turn angles.",
    explanation: "Scalene triangle: three different sides, angles determined by law of cosines.",
    hint: "Harder; equilateral is simplest.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is a common mistake when drawing a triangle with `left(120)`?",
    shortAnswer: "Using `left(60)` (internal angle) instead of external 120°.",
    explanation: "Internal + external = 180°; internal 60° means external 120°.",
    hint: "You turn the external angle to change direction.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How would you draw a square rotated 45°?",
    shortAnswer: "Set heading to 45° BEFORE drawing the square.",
    explanation: "The entire square rotates because forward/right are relative.",
    hint: "`t.setheading(45)` before the loop.",
    level: "moderate",
    codeExample: "t.setheading(45); for _ in range(4): t.forward(100); t.right(90)"
  },
  {
    question: "What does `t.circle(50)` have to do with polygons?",
    shortAnswer: "A circle is a polygon with many sides (default 360 tiny sides).",
    explanation: "Approximated by many short straight segments.",
    hint: "You could draw a 36‑gon with 10° turns.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you draw a triangle using `goto()` with coordinates?",
    shortAnswer: "Calculate three vertices and loop through them with `goto()`.",
    explanation: "Use absolute positioning: (0,0), (100,0), (50,86.6).",
    hint: "Height = side * sqrt(3)/2.",
    level: "expert",
    codeExample: "pts = [(0,0), (100,0), (50,86.6), (0,0)]; for x,y in pts: t.goto(x,y)"
  },
  {
    question: "What is the purpose of `t.penup()` before drawing a new shape?",
    shortAnswer: "To move to a new location without drawing a line between shapes.",
    explanation: "Avoids unwanted connecting lines.",
    hint: "Teleport without a trace.",
    level: "basic",
    codeExample: "t.penup(); t.goto(200,200); t.pendown()"
  },
  {
    question: "How can you draw a rectangle that is taller than wide?",
    shortAnswer: "Set length (horizontal) smaller than width (vertical) or swap order.",
    explanation: "Example: forward(50), right(90), forward(120), right(90) – gives vertical rectangle.",
    hint: "Width = vertical side length.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Write a function `draw_polygon(n, side)` that draws any regular polygon.",
    shortAnswer: "def draw_polygon(n, side): angle = 360/n; for _ in range(n): t.forward(side); t.right(angle)",
    explanation: "Generalizes square, triangle, pentagon, etc.",
    hint: "Use n as number of sides.",
    level: "expert",
    codeExample: "def draw_polygon(n, side): angle = 360/n; for _ in range(n): t.forward(side); t.right(angle)"
  },
  {
    question: "What is the external angle of a regular pentagon?",
    shortAnswer: "72°.",
    explanation: "360 / 5 = 72°.",
    hint: "Try drawing one with a loop.",
    level: "moderate",
    codeExample: "for _ in range(5): t.forward(100); t.right(72)"
  },
  {
    question: "Why does a square drawn with `left(90)` instead of `right(90)` still form a square?",
    shortAnswer: "It just rotates the square in opposite orientation (counter‑clockwise).",
    explanation: "External angle magnitude is still 90°, direction changes orientation.",
    hint: "Both produce a square, just facing different way.",
    level: "basic",
    codeExample: "t.left(90)  # CCW square"
  },
  {
    question: "How can you draw a hollow square (only outline) with thick lines?",
    shortAnswer: "Use `pensize()` before drawing, and do not call `begin_fill()`.",
    explanation: "Outline only, no fill.",
    hint: "`t.pensize(5)` makes thick border.",
    level: "basic",
    codeExample: "t.pensize(5); for _ in range(4): t.forward(100); t.right(90)"
  },
  {
    question: "What is a common error when using `begin_fill()` but forgetting to set fillcolor?",
    shortAnswer: "The shape will be filled with the default color (usually black).",
    explanation: "Set explicitly with `t.fillcolor('red')`.",
    hint: "Always set fill color if you want a specific color.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How would you draw a triangle that is right‑angled?",
    shortAnswer: "Use sides like forward(100), right(90), forward(100), then `goto(0,0)`.",
    explanation: "Right angle triangle with legs on axes.",
    hint: "Use absolute or relative.",
    level: "expert",
    codeExample: "t.forward(100); t.right(90); t.forward(100); t.goto(0,0)"
  },
  {
    question: "What is the effect of `t.speed(0)` on drawing shapes?",
    shortAnswer: "The shape appears instantly; no animation between steps.",
    explanation: "Useful for complex or repetitive drawings.",
    hint: "Faster execution, but no visual feedback of drawing process.",
    level: "moderate",
    codeExample: "t.speed(0)"
  },
  {
    question: "How can you draw a square and a triangle overlapping?",
    shortAnswer: "Draw square, then penup to start of triangle, pendown and draw triangle.",
    explanation: "Order matters; overlapping colors may mix if fill is used.",
    hint: "Use different colors to see overlap.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is a 'polygon' in turtle graphics?",
    shortAnswer: "A closed shape with straight sides, drawn by repeating forward+turn.",
    explanation: "Regular polygons have equal sides and angles.",
    hint: "Square, triangle, pentagon, etc.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Why might a rectangle drawn with a loop not close exactly?",
    shortAnswer: "If the turn angles or distances are slightly wrong due to floating point errors or logic mistake.",
    explanation: "Use exact integers and correct angles to avoid drift.",
    hint: "Check that the sum of turn angles = 360°.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is the purpose of `t.home()` in shape drawing?",
    shortAnswer: "Returns turtle to origin (0,0) and resets heading to east.",
    explanation: "Useful as a reference point before drawing multiple shapes.",
    hint: "Not always needed; can use `goto(0,0)` instead.",
    level: "basic",
    codeExample: "t.home()"
  },
  {
    question: "How can you draw a triangle with a different orientation (e.g., pointing down)?",
    shortAnswer: "Start with `setheading(270)` before drawing or use `left(60)` differently.",
    explanation: "Adjust initial heading or turn sequence.",
    hint: "Rotate the entire triangle by starting with a different heading.",
    level: "moderate",
    codeExample: "t.setheading(0); for _ in range(3): t.forward(100); t.right(120)  # normal; to invert, start heading 180"
  }
];

export default questions;