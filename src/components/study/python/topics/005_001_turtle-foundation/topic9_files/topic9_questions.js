const questions = [
  {
    question: "What is the key difference between relative and absolute movement?",
    shortAnswer: "Relative depends on current heading; absolute depends on fixed coordinates.",
    explanation: "Relative: forward/back/left/right. Absolute: goto/setx/sety.",
    hint: "Body vs world reference.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Which command(s) are relative?",
    shortAnswer: "forward(), backward(), left(), right().",
    explanation: "These modify position/heading based on turtle's current state.",
    hint: "Also their aliases: fd, bk, lt, rt.",
    level: "basic",
    codeExample: "t.forward(100)"
  },
  {
    question: "Which command(s) are absolute?",
    shortAnswer: "goto(), setx(), sety(), setpos(), setposition().",
    explanation: "These move to specific world coordinates ignoring heading.",
    hint: "Teleport to (x,y).",
    level: "basic",
    codeExample: "t.goto(50, -30)"
  },
  {
    question: "If the turtle is at (0,0) facing north, what is the result of `forward(100)`?",
    shortAnswer: "Moves to (0, 100) (north).",
    explanation: "Relative to heading: north is 90°, so forward moves up.",
    hint: "North = positive y.",
    level: "basic",
    codeExample: "t.setheading(90); t.forward(100)"
  },
  {
    question: "If the turtle is at (50, 50) and you call `goto(100, 0)`, what is the new position regardless of heading?",
    shortAnswer: "(100, 0).",
    explanation: "goto sets absolute coordinates.",
    hint: "Ignores heading.",
    level: "basic",
    codeExample: "t.goto(100, 0)"
  },
  {
    question: "Why would you use relative movement to draw a square?",
    shortAnswer: "Because the pattern is repeating: forward, right 90, four times.",
    explanation: "Relative moves fit the shape naturally; absolute would require calculating each corner.",
    hint: "Loop with forward and right.",
    level: "moderate",
    codeExample: "for _ in range(4): t.forward(100); t.right(90)"
  },
  {
    question: "Why would you use absolute movement to draw a grid of dots?",
    shortAnswer: "Because each dot has fixed coordinates (x,y), independent of order.",
    explanation: "Relative would require tracking position and would be error‑prone.",
    hint: "Nested loops with computed x,y.",
    level: "moderate",
    codeExample: "for x in range(-100,101,20): for y in range(-100,101,20): t.goto(x,y); t.dot()"
  },
  {
    question: "Does `goto()` change the turtle's heading?",
    shortAnswer: "No, heading remains unchanged.",
    explanation: "Only position changes; the turtle still faces the same direction.",
    hint: "You can verify with `t.heading()` before and after.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Does `forward(100)` change the turtle's heading?",
    shortAnswer: "No, only position changes; heading stays the same.",
    explanation: "Forward moves along current heading without turning.",
    hint: "Turning only happens with left/right or setheading.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "If you combine relative and absolute moves, what should you be careful about?",
    shortAnswer: "Position and heading offsets can accumulate unpredictably if not tracked.",
    explanation: "Keep track of where the turtle is and which mode you're using.",
    hint: "Print position often during debugging.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you draw a star at five different screen locations using absolute positioning?",
    shortAnswer: "Define a star‑drawing function using relative moves, then call it after `goto()` each location.",
    explanation: "Use relative inside the function, but absolute to position the function call.",
    hint: "Combine both: relocate then draw using relative.",
    level: "expert",
    codeExample: "def star(): for _ in range(5): t.forward(50); t.right(144); locations = [(0,0), (100,100), ...]; for x,y in locations: t.penup(); t.goto(x,y); t.pendown(); star()"
  },
  {
    question: "What happens if you call `forward(100)` when the turtle is hidden?",
    shortAnswer: "It moves forward and draws (if pen down) – visibility doesn't affect movement.",
    explanation: "Hiding only hides the cursor icon.",
    hint: "Pen still draws.",
    level: "basic",
    codeExample: "t.hideturtle(); t.forward(100)  # still moves and draws"
  },
  {
    question: "What happens if you call `goto(100, 100)` with pen up?",
    shortAnswer: "Moves to (100,100) without drawing a line.",
    explanation: "Pen up disables drawing during movement.",
    hint: "Useful for teleporting.",
    level: "basic",
    codeExample: "t.penup(); t.goto(100,100)"
  },
  {
    question: "How can you draw a triangle using relative movements?",
    shortAnswer: "Repeat 3 times: forward(side), left(120) (or right(120)).",
    explanation: "Exterior angle 120° for equilateral triangle.",
    hint: "Sum of exterior angles = 360°.",
    level: "moderate",
    codeExample: "for _ in range(3): t.forward(100); t.left(120)"
  },
  {
    question: "How can you draw a triangle using absolute coordinates?",
    shortAnswer: "Use `goto()` with three vertices: (0,0), (100,0), (50,86.6) and back to start.",
    explanation: "Compute coordinates manually.",
    hint: "Height = side * sqrt(3)/2.",
    level: "expert",
    codeExample: "pts = [(0,0), (100,0), (50,86.6), (0,0)]; for x,y in pts: t.goto(x,y)"
  },
  {
    question: "What is a real‑world analogy for relative movement?",
    shortAnswer: "Walking directions: 'walk 10 steps, turn left, walk 5 steps'.",
    explanation: "Depends on where you're facing at each step.",
    hint: "Body‑relative instructions.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is a real‑world analogy for absolute movement?",
    shortAnswer: "GPS coordinates or 'go to room 204 on the map'.",
    explanation: "Independent of your current location/direction.",
    hint: "Fixed reference system.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "If you want to draw a rectangle that is always aligned with the screen axes, which movement type is easier?",
    shortAnswer: "Absolute (goto with fixed x,y).",
    explanation: "Relative would require careful heading management; absolute just sets corners.",
    hint: "Even if heading changes, rectangle stays axis‑aligned.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "If you want to draw a rectangle that rotates when the turtle rotates, which is better?",
    shortAnswer: "Relative (forward/right) – the rectangle rotates with heading.",
    explanation: "Relative moves are body‑centric; the shape orientation follows the turtle.",
    hint: "Use relative for local coordinate systems.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `setx(100)` do in terms of relative vs absolute?",
    shortAnswer: "Absolute: moves turtle to x=100, keeping y unchanged.",
    explanation: "Horizontal move only; ignores heading.",
    hint: "Like `goto(x, t.ycor())`.",
    level: "basic",
    codeExample: "t.setx(100)"
  },
  {
    question: "Why might a beginner accidentally draw a diagonal line when using `setx()` and `sety()`?",
    shortAnswer: "If pen is down, first setx draws horizontal, then sety draws vertical – creating an L, not diagonal.",
    explanation: "To draw diagonal, use `goto()` with both coordinates changed at once.",
    hint: "Two separate moves = corner, not straight line.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you mix relative and absolute in a single command?",
    shortAnswer: "Not directly; each command is either relative or absolute.",
    explanation: "But you can compute an absolute target using relative current position: e.g., `t.goto(t.xcor() + 50, t.ycor())`",
    hint: "Combine in expressions.",
    level: "expert",
    codeExample: "t.goto(t.xcor() + 50, t.ycor())  # relative forward 50 using absolute"
  },
  {
    question: "What is the advantage of storing the turtle's position before a series of relative moves?",
    shortAnswer: "You can return to that exact spot later using an absolute `goto()`.",
    explanation: "Common pattern: save position, draw something, then restore.",
    hint: "Use for modular drawing.",
    level: "moderate",
    codeExample: "old_pos = t.pos(); ... ; t.goto(old_pos)"
  },
  {
    question: "If you always use absolute commands, do you ever need to care about heading?",
    shortAnswer: "Yes, because heading still affects the shape of lines drawn with `forward()` or `circle()`.",
    explanation: "Absolute `goto()` ignores heading, but other commands don't.",
    hint: "If you only use goto, heading doesn't matter.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How would you draw a horizontal line of length 100 using only relative commands?",
    shortAnswer: "`t.setheading(0); t.forward(100)`.",
    explanation: "Ensure heading is east (0°), then forward.",
    hint: "Reset heading first.",
    level: "basic",
    codeExample: "t.setheading(0); t.forward(100)"
  },
  {
    question: "How would you draw a horizontal line of length 100 using only absolute commands?",
    shortAnswer: "`t.goto(100, t.ycor())` from start, or specify both endpoints.",
    explanation: "Move horizontally regardless of heading.",
    hint: "`t.goto(t.xcor() + 100, t.ycor())`",
    level: "moderate",
    codeExample: "t.goto(t.xcor() + 100, t.ycor())"
  },
  {
    question: "What is the output of `t.pos()` after `t.forward(50); t.backward(25)`?",
    shortAnswer: "(25, 0) if started at (0,0) facing east.",
    explanation: "Relative: forward 50, then backward 25 nets +25 in x.",
    hint: "Net displacement = sum of signed moves.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Which type of movement is more natural for drawing a fractal tree?",
    shortAnswer: "Relative – because each branch grows from the current position and heading.",
    explanation: "Fractals are self‑similar; relative recursion is easier.",
    hint: "See recursive turtle graphics.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Why do professional CAD systems support both relative and absolute coordinate input?",
    shortAnswer: "Designers need both: relative for local features, absolute for global placement.",
    explanation: "Flexibility for different workflows.",
    hint: "Think of drawing a bolt pattern relative to a hole, then placing that hole absolutely.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is a common sign that you should switch from relative to absolute?",
    shortAnswer: "When you find yourself calculating positions from a fixed reference instead of chaining moves.",
    explanation: "Absolute is clearer for grids, charts, and when orientation doesn't matter.",
    hint: "If you need to 'jump' to a specific location.",
    level: "moderate",
    codeExample: ""
  }
];

export default questions;