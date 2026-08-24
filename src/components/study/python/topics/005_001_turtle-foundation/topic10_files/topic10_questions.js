const questions = [
  {
    question: "What is the simplest way to draw a straight line?",
    shortAnswer: "Use `forward(distance)` or `backward(distance)` with pen down.",
    explanation: "The turtle moves along its current heading, drawing a line.",
    hint: "Make sure pen is down (default).",
    level: "basic",
    codeExample: "t.forward(100)"
  },
  {
    question: "How do you draw a line from (0,0) to (100,50) using absolute positioning?",
    shortAnswer: "`t.goto(100, 50)` after starting at (0,0).",
    explanation: "`goto()` draws a straight line to the specified coordinates.",
    hint: "Pen down draws the line.",
    level: "basic",
    codeExample: "t.goto(100, 50)"
  },
  {
    question: "What is a connected path (polyline)?",
    shortAnswer: "A sequence of line segments where each starts at the end of the previous one.",
    explanation: "Pen stays down between segments; the path can change direction.",
    hint: "No pen lifts.",
    level: "basic",
    codeExample: "t.forward(50); t.left(90); t.forward(30)  # L shape"
  },
  {
    question: "How can you draw a zig‑zag line?",
    shortAnswer: "Alternate `forward` and turns (left/right) without lifting pen.",
    explanation: "Example: forward 50, right 90, forward 50, left 90, repeat.",
    hint: "Change direction each segment.",
    level: "moderate",
    codeExample: "for _ in range(5): t.forward(40); t.right(90); t.forward(40); t.left(90)"
  },
  {
    question: "What happens if you lift the pen between two segments?",
    shortAnswer: "The segments are not connected; there will be a gap.",
    explanation: "Pen up prevents drawing, so the movement creates a jump.",
    hint: "Keep pen down for connected path.",
    level: "basic",
    codeExample: "t.forward(50); t.penup(); t.forward(50)  # gap"
  },
  {
    question: "Which method returns the length of a straight line to a point?",
    shortAnswer: "`distance(x, y)`.",
    explanation: "Returns Euclidean distance between turtle and (x,y).",
    hint: "Useful to check if you reached a target.",
    level: "moderate",
    codeExample: "length = t.distance(100, 0)"
  },
  {
    question: "How can you draw a straight horizontal line without using `setheading()`?",
    shortAnswer: "Use `setx(new_x)` with pen down.",
    explanation: "`setx()` moves horizontally regardless of heading.",
    hint: "Absolute horizontal movement.",
    level: "moderate",
    codeExample: "t.setx(200)"
  },
  {
    question: "How can you draw a straight vertical line without using `setheading()`?",
    shortAnswer: "Use `sety(new_y)` with pen down.",
    explanation: "`sety()` moves vertically regardless of heading.",
    hint: "Absolute vertical movement.",
    level: "moderate",
    codeExample: "t.sety(150)"
  },
  {
    question: "What is the result of `t.forward(100); t.backward(100)`?",
    shortAnswer: "A line drawn forward then backward over itself, ending at start.",
    explanation: "The path goes out and back, leaving a single line (double‑drawn).",
    hint: "Net displacement zero.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What command would you use to draw a line from current position to (300, 0)?",
    shortAnswer: "`t.goto(300, 0)`.",
    explanation: "`goto()` draws a straight line to absolute coordinates.",
    hint: "Heading doesn't matter.",
    level: "basic",
    codeExample: "t.goto(300, 0)"
  },
  {
    question: "Why might a line not appear even though you called `forward(100)`?",
    shortAnswer: "Pen might be up, or color same as background, or tracer(0) without update.",
    explanation: "Check `t.isdown()`, pen color, and tracer settings.",
    hint: "Add `t.pendown()` before moving.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is a polyline in computer graphics?",
    shortAnswer: "A connected sequence of line segments defined by a list of points.",
    explanation: "The turtle can draw a polyline by iterating over points with `goto()`.",
    hint: "Also called a broken line or path.",
    level: "moderate",
    codeExample: "points = [(0,0), (50,0), (50,50), (0,50)]; for x,y in points: t.goto(x,y)"
  },
  {
    question: "How do you draw an open shape (not closed) like a letter 'L'?",
    shortAnswer: "Draw horizontal segment, turn, draw vertical segment, stop – don't return.",
    explanation: "Open shape has different start and end points.",
    hint: "No final segment back to start.",
    level: "basic",
    codeExample: "t.forward(80); t.left(90); t.forward(60)"
  },
  {
    question: "How do you draw a closed shape like a square?",
    shortAnswer: "Draw four sides, then return to start (or use loop and close).",
    explanation: "Closed shape's end point coincides with start point.",
    hint: "Last segment connects back.",
    level: "basic",
    codeExample: "for _ in range(4): t.forward(100); t.right(90)"
  },
  {
    question: "What is the difference between a polyline and a polygon?",
    shortAnswer: "Polygon is closed (start = end); polyline can be open.",
    explanation: "A triangle is a closed polyline (polygon). A zig‑zag is open.",
    hint: "Closed shapes enclose area.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you measure the total length of a connected path?",
    shortAnswer: "Sum the distances of each segment (using `distance()` between points).",
    explanation: "Turtle doesn't track it automatically; you need to accumulate.",
    hint: "Keep a running total variable.",
    level: "expert",
    codeExample: "total = 0; total += 100; total += 60; print(total)"
  },
  {
    question: "What is a common mistake when drawing a rectangle with `goto()`?",
    shortAnswer: "Forgetting to lift pen between corners, causing unwanted diagonals.",
    explanation: "If you goto from one corner to another without correct order, you get diagonal lines.",
    hint: "Use penup when jumping, but for rectangle you can goto sequentially.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `t.forward(50); t.right(90); t.forward(50)` draw?",
    shortAnswer: "An L‑shaped path (two connected perpendicular lines).",
    explanation: "First horizontal (assuming heading east), then vertical (south).",
    hint: "Like the corner of a square.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How can you draw a dashed line using connected paths?",
    shortAnswer: "Alternate pen down for segment, pen up for gap, repeat.",
    explanation: "Connected implies no gap; dashed line is not fully connected.",
    hint: "Use `pendown()`, `forward()`, `penup()`, `forward()` in loop.",
    level: "moderate",
    codeExample: "for _ in range(10): t.pendown(); t.forward(10); t.penup(); t.forward(10)"
  },
  {
    question: "What is the result of `t.goto(100, 0); t.goto(100, 100)`?",
    shortAnswer: "An L‑shaped path: horizontal then vertical line.",
    explanation: "First line from (0,0) to (100,0), second from (100,0) to (100,100).",
    hint: "Connected because pen down between.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How would you draw a straight line of exact length 150 at a 30° angle?",
    shortAnswer: "`t.setheading(30); t.forward(150)`.",
    explanation: "Set heading to desired angle, then forward.",
    hint: "Use `setheading()` for precise angle.",
    level: "moderate",
    codeExample: "t.setheading(30); t.forward(150)"
  },
  {
    question: "What does `t.distance(t.pos())` return?",
    shortAnswer: "0.0 – distance from turtle to itself.",
    explanation: "Always zero.",
    hint: "Not useful.",
    level: "basic",
    codeExample: "print(t.distance(t.pos()))  # 0.0"
  },
  {
    question: "Why is it important to plan the order of points for a polyline?",
    shortAnswer: "The order determines the drawn path; wrong order creates crossing lines.",
    explanation: "Polyline connects points in the sequence given.",
    hint: "Sort points in the order you want to draw.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you draw a curve using only straight line segments?",
    shortAnswer: "Yes, approximate a curve with many short straight segments.",
    explanation: "Turtle's `circle()` does exactly that: many small forward and turn steps.",
    hint: "Think of a circle as a polygon with many sides.",
    level: "expert",
    codeExample: "for _ in range(360): t.forward(1); t.right(1)"
  },
  {
    question: "What is the effect of `t.width(3)` on a line?",
    shortAnswer: "Sets the line thickness to 3 pixels.",
    explanation: "Also called `pensize()`; affects all subsequent lines.",
    hint: "Use `pensize()` for thicker lines.",
    level: "basic",
    codeExample: "t.pensize(3); t.forward(100)"
  },
  {
    question: "How can you draw a line that changes color along its length?",
    shortAnswer: "Use multiple segments, changing color before each segment.",
    explanation: "Not a single continuous color, but a multi‑colored polyline.",
    hint: "Set `t.color()` before each segment.",
    level: "moderate",
    codeExample: "t.color('red'); t.forward(30); t.color('blue'); t.forward(30)"
  },
  {
    question: "What does `t.speed(0)` do to line drawing?",
    shortAnswer: "Disables animation; the line appears instantly.",
    explanation: "Useful for complex drawings where animation would slow things down.",
    hint: "Fastest drawing speed.",
    level: "moderate",
    codeExample: "t.speed(0); t.forward(100)  # instant"
  },
  {
    question: "How can you draw a line that extends beyond the screen?",
    shortAnswer: "Just move forward; the line will be drawn off‑screen.",
    explanation: "You may need to scroll or enlarge canvas to see it.",
    hint: "Use `screensize()` to enlarge canvas.",
    level: "moderate",
    codeExample: "t.forward(1000)  # may go off‑screen"
  },
  {
    question: "What is a common mistake when drawing a connected path with many segments?",
    shortAnswer: "Forgetting to lift pen when moving to a new area, causing unwanted lines.",
    explanation: "To 'jump' to a new location without drawing, use `penup()` before moving.",
    hint: "Pen up to teleport, pen down to draw.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How would you draw a star shape using connected straight lines?",
    shortAnswer: "Use a loop of forward and turn angles (e.g., 144° for 5‑point star).",
    explanation: "The path is continuous and closed.",
    hint: "The interior lines cross but pen stays down.",
    level: "expert",
    codeExample: "for _ in range(5): t.forward(100); t.right(144)"
  }
];

export default questions;