const questions = [
  {
    question: "What does `goto(100, 50)` do?",
    shortAnswer: "Moves the turtle to absolute coordinates x=100, y=50.",
    explanation: "The turtle moves in a straight line to that point, drawing if the pen is down.",
    hint: "Does not depend on heading.",
    level: "basic",
    codeExample: "t.goto(100, 50)"
  },
  {
    question: "What is the difference between `goto()` and `forward()`?",
    shortAnswer: "`goto()` moves to absolute coordinates; `forward()` moves relative to current heading.",
    explanation: "`forward()` respects heading; `goto()` ignores heading and goes directly to (x,y).",
    hint: "Absolute vs relative.",
    level: "moderate",
    codeExample: "t.forward(100) # relative; t.goto(100,0) # absolute"
  },
  {
    question: "How can you move the turtle to (x=0, y=100) without drawing?",
    shortAnswer: "`t.penup(); t.goto(0,100); t.pendown()`.",
    explanation: "Lift the pen before moving to avoid drawing a line.",
    hint: "Pen up = no trail.",
    level: "basic",
    codeExample: "t.penup(); t.goto(0,100); t.pendown()"
  },
  {
    question: "What does `setx(200)` do?",
    shortAnswer: "Moves the turtle horizontally to x=200, keeping y unchanged.",
    explanation: "The turtle moves left or right along the current y-level.",
    hint: "Only x changes; y stays same.",
    level: "basic",
    codeExample: "t.setx(200)"
  },
  {
    question: "What does `sety(-100)` do?",
    shortAnswer: "Moves the turtle vertically to y=-100, keeping x unchanged.",
    explanation: "The turtle moves up or down along the current x-coordinate.",
    hint: "Only y changes; x stays same.",
    level: "basic",
    codeExample: "t.sety(-100)"
  },
  {
    question: "If the turtle is at (50, 50) and you call `setx(100)`, what is the new position?",
    shortAnswer: "(100, 50).",
    explanation: "x becomes 100, y remains 50.",
    hint: "Horizontal move only.",
    level: "basic",
    codeExample: "t.setx(100); print(t.pos())"
  },
  {
    question: "What happens if you call `goto(300, 300)` but the screen is only 400x400?",
    shortAnswer: "The turtle moves there; you may see scrollbars or the turtle goes off‑screen.",
    explanation: "Coordinates are not clipped; use `screensize()` to enlarge canvas.",
    hint: "You can scroll or set larger canvas.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you get the current position as a tuple?",
    shortAnswer: "`pos()` or `position()`.",
    explanation: "Returns (x, y) as floats.",
    hint: "`x, y = t.pos()`",
    level: "basic",
    codeExample: "print(t.pos())"
  },
  {
    question: "What is the alias for `goto()`?",
    shortAnswer: "`setpos()` and `setposition()`.",
    explanation: "All three are identical.",
    hint: "`t.setpos(100,100)` same as `t.goto(100,100)`.",
    level: "moderate",
    codeExample: "t.setpos(100, 50)"
  },
  {
    question: "Why might you use `setx()` instead of `goto()`?",
    shortAnswer: "To change only the x-coordinate while preserving y and heading.",
    explanation: "More efficient for horizontal alignment.",
    hint: "Use when y should stay fixed.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "If pen is down, does `setx()` draw a line?",
    shortAnswer: "Yes, it draws a horizontal line from the old x to new x.",
    explanation: "Any movement with pen down draws.",
    hint: "Pen up to avoid drawing.",
    level: "basic",
    codeExample: "t.pendown(); t.setx(100)  # draws line"
  },
  {
    question: "What does `t.goto(t.xcor(), 200)` do?",
    shortAnswer: "Moves the turtle vertically to y=200, keeping x unchanged.",
    explanation: "Equivalent to `t.sety(200)`.",
    hint: "Same as sety(200).",
    level: "moderate",
    codeExample: "t.goto(t.xcor(), 200)"
  },
  {
    question: "How would you move the turtle to the origin without drawing?",
    shortAnswer: "`t.penup(); t.goto(0,0); t.pendown()` or `t.penup(); t.home(); t.pendown()`.",
    explanation: "`home()` also resets heading.",
    hint: "Pen up first.",
    level: "basic",
    codeExample: "t.penup(); t.home()"
  },
  {
    question: "What is the return type of `xcor()` and `ycor()`?",
    shortAnswer: "float.",
    explanation: "Coordinates are stored as floating-point numbers.",
    hint: "Even integer coordinates return as floats.",
    level: "basic",
    codeExample: "print(type(t.xcor()))  # <class 'float'>"
  },
  {
    question: "Can you use negative coordinates with `goto()`?",
    shortAnswer: "Yes, negative x moves left, negative y moves down.",
    explanation: "Origin is center; negative values go to left/down.",
    hint: "Quadrants: (-,-) is bottom-left.",
    level: "basic",
    codeExample: "t.goto(-100, -50)"
  },
  {
    question: "What happens to heading after `goto()`?",
    shortAnswer: "Heading remains unchanged.",
    explanation: "`goto()` only changes position; direction stays same.",
    hint: "The turtle does not turn to face the destination.",
    level: "basic",
    codeExample: "heading_before = t.heading(); t.goto(100,0); print(t.heading() == heading_before)  # True"
  },
  {
    question: "How can you draw a rectangle using only `goto()`?",
    shortAnswer: "Move to four corners: (x1,y1), (x1,y2), (x2,y2), (x2,y1), then back to start.",
    explanation: "Use pen down and goto sequentially.",
    hint: "Corner points define the shape.",
    level: "moderate",
    codeExample: "points = [(0,0), (0,100), (150,100), (150,0), (0,0)]; for p in points: t.goto(p)"
  },
  {
    question: "What is a common mistake when using `setx()` and `sety()` together?",
    shortAnswer: "Assuming they move diagonally; they move separately, creating an L-shaped path.",
    explanation: "First setx moves horizontally, then sety moves vertically (or vice versa).",
    hint: "Two moves, not one diagonal.",
    level: "moderate",
    codeExample: "t.setx(100); t.sety(100)  # moves in L shape"
  },
  {
    question: "How can you store the current position to return later?",
    shortAnswer: "`position = t.pos()` and later `t.goto(position)`.",
    explanation: "Store as tuple; use `goto()` to restore.",
    hint: "Useful for saving waypoints.",
    level: "moderate",
    codeExample: "pos = t.pos(); ... ; t.goto(pos)"
  },
  {
    question: "What is the difference between `t.goto(100, 100)` and `t.setpos(100, 100)`?",
    shortAnswer: "No difference; they are aliases.",
    explanation: "Both move to absolute coordinates.",
    hint: "Same function.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Why does `t.sety(0)` from (50, 50) draw a vertical line?",
    shortAnswer: "Because pen is down, moving vertically from y=50 to y=0 draws a line.",
    explanation: "Any movement with pen down creates a line.",
    hint: "Lift pen before calling sety if you don't want a line.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is the purpose of `t.setposition(0,0)` in a program?",
    shortAnswer: "Moves turtle to origin (0,0), same as `t.goto(0,0)`.",
    explanation: "Useful for resetting position without changing heading.",
    hint: "Not the same as `home()` (which resets heading).",
    level: "basic",
    codeExample: "t.setposition(0,0)"
  },
  {
    question: "Can you use `goto()` with a variable or expression?",
    shortAnswer: "Yes, e.g., `t.goto(x * 2, y + 10)`.",
    explanation: "Any numeric expressions are allowed.",
    hint: "Useful in loops.",
    level: "basic",
    codeExample: "for i in range(10): t.goto(i*10, i*5)"
  },
  {
    question: "How would you draw a diagonal line from (0,0) to (200,200) using `goto()`?",
    shortAnswer: "`t.penup(); t.goto(0,0); t.pendown(); t.goto(200,200)`.",
    explanation: "Straight line because both x and y change proportionally.",
    hint: "No need to calculate angle.",
    level: "basic",
    codeExample: "t.goto(200,200)"
  },
  {
    question: "What happens if you call `goto()` with the same coordinates?",
    shortAnswer: "No movement; no line drawn.",
    explanation: "Turtle stays in place.",
    hint: "Idempotent.",
    level: "basic",
    codeExample: "t.goto(t.pos())  # no effect"
  },
  {
    question: "How can you make a dashed line using `goto()`?",
    shortAnswer: "Alternate `penup()` and `pendown()` while moving to points along a line.",
    explanation: "Compute intermediate points, lift pen every other segment.",
    hint: "Use loop with step increments.",
    level: "expert",
    codeExample: "for x in range(0, 201, 20): t.goto(x, 0) if (x//20)%2 else t.penup(); etc."
  },
  {
    question: "What is the advantage of `setx()` over `goto()` for horizontal movement?",
    shortAnswer: "Simplicity when only x should change; less typing.",
    explanation: "You don't need to pass current y.",
    hint: "Keeps code clean.",
    level: "moderate",
    codeExample: "t.setx(150)  # vs t.goto(150, t.ycor())"
  },
  {
    question: "If you want to move the turtle to (100, 200) but keep heading unchanged, which method do you use?",
    shortAnswer: "`goto(100,200)`.",
    explanation: "`goto()` changes position but not heading.",
    hint: "Perfect.",
    level: "basic",
    codeExample: "t.goto(100,200)"
  },
  {
    question: "What does `t.pos()` return after `t.setx(0); t.sety(0)`?",
    shortAnswer: "(0.0, 0.0).",
    explanation: "Both coordinates set to zero.",
    hint: "Origin.",
    level: "basic",
    codeExample: "t.setx(0); t.sety(0); print(t.pos())"
  },
  {
    question: "How can you draw a circle by only using `goto()`?",
    shortAnswer: "Compute many points on circle using sine/cosine and `goto()` each point.",
    explanation: "Example: for angle in range(360): x = 100*cos(rad), y = 100*sin(rad); t.goto(x,y).",
    hint: "Circle approximated by many small line segments.",
    level: "expert",
    codeExample: "import math; for deg in range(360): rad = math.radians(deg); t.goto(100*math.cos(rad), 100*math.sin(rad))"
  }
];

export default questions;