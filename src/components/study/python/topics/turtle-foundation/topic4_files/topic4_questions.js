const questions = [
  {
    question: "How do you get the turtle's current x-coordinate?",
    shortAnswer: "Use `t.xcor()`.",
    explanation: "Returns a float representing the horizontal position relative to origin.",
    hint: "`xcor()` stands for 'x coordinate'.",
    level: "basic",
    codeExample: "x = t.xcor()"
  },
  {
    question: "What does `t.heading()` return?",
    shortAnswer: "Current heading angle in degrees (float).",
    explanation: "0° = east, 90° = north, 180° = west, 270° = south.",
    hint: "Degrees increase counter-clockwise.",
    level: "basic",
    codeExample: "angle = t.heading()"
  },
  {
    question: "What is the difference between `t.hideturtle()` and `t.penup()`?",
    shortAnswer: "`hideturtle()` hides the cursor icon; `penup()` stops drawing when moving.",
    explanation: "A hidden turtle can still draw if the pen is down. Pen up prevents drawing but the turtle remains visible.",
    hint: "One affects appearance, the other affects drawing.",
    level: "moderate",
    codeExample: "t.hideturtle(); t.forward(100)  # draws if pen down"
  },
  {
    question: "How can you toggle the turtle's visibility?",
    shortAnswer: "Check `t.isvisible()` and then call `showturtle()` or `hideturtle()` accordingly.",
    explanation: "Example: `if t.isvisible(): t.ht() else: t.st()`.",
    hint: "Use a conditional.",
    level: "moderate",
    codeExample: "if t.isvisible(): t.hideturtle()"
  },
  {
    question: "What is the return type of `t.pos()`?",
    shortAnswer: "A tuple of two floats: (x, y).",
    explanation: "You can unpack: `x, y = t.pos()`.",
    hint: "Useful for storing location.",
    level: "basic",
    codeExample: "position = t.pos()"
  },
  {
    question: "If the turtle is hidden, does it still respond to movement commands?",
    shortAnswer: "Yes, it continues to move and draw (if pen down).",
    explanation: "Visibility only affects the appearance of the cursor, not its behavior.",
    hint: "The turtle is still there, just invisible.",
    level: "basic",
    codeExample: "t.hideturtle(); t.forward(100)  # moves and draws"
  },
  {
    question: "What is the default heading of a newly created turtle?",
    shortAnswer: "0 degrees (east, to the right).",
    explanation: "In standard mode, 0° points right along the positive x-axis.",
    hint: "Remember: east = 0°.",
    level: "basic",
    codeExample: "print(t.heading())  # 0.0"
  },
  {
    question: "How can you set the heading to an absolute value (e.g., north)?",
    shortAnswer: "Use `t.setheading(90)`.",
    explanation: "`setheading()` sets absolute direction regardless of current heading.",
    hint: "North is 90°.",
    level: "moderate",
    codeExample: "t.setheading(90)  # point up"
  },
  {
    question: "What happens if you call `t.showturtle()` on an already visible turtle?",
    shortAnswer: "Nothing changes; it remains visible.",
    explanation: "The method is idempotent – no error, just no effect.",
    hint: "Safe to call anytime.",
    level: "basic",
    codeExample: "t.showturtle()  # no error"
  },
  {
    question: "Why might you want to hide the turtle during an animation?",
    shortAnswer: "To avoid distracting the viewer or to improve performance slightly.",
    explanation: "Hidden turtle still draws, so the final art looks cleaner without the cursor.",
    hint: "Professional presentations often hide the turtle.",
    level: "moderate",
    codeExample: "t.hideturtle()  # before final render"
  },
  {
    question: "What is the output of `print(t.heading())` after `t.left(90)` from default?",
    shortAnswer: "90.0 (north).",
    explanation: "Default heading 0, left(90) adds 90 degrees → 90°.",
    hint: "Left = counter-clockwise.",
    level: "basic",
    codeExample: "t.left(90); print(t.heading())"
  },
  {
    question: "How can you get both x and y coordinates in one line?",
    shortAnswer: "Use `x, y = t.pos()` or `print(t.pos())`.",
    explanation: "`t.pos()` returns a tuple that can be unpacked.",
    hint: "Unpacking is elegant.",
    level: "basic",
    codeExample: "x, y = t.pos()"
  },
  {
    question: "What method returns the turtle's y-coordinate only?",
    shortAnswer: "`t.ycor()`.",
    explanation: "Analogous to `xcor()`.",
    hint: "ycor = y coordinate.",
    level: "basic",
    codeExample: "y = t.ycor()"
  },
  {
    question: "Is there a way to check if the turtle is visible without creating an attribute?",
    shortAnswer: "Yes, use `t.isvisible()` which returns a boolean.",
    explanation: "This is the official method; no direct attribute access.",
    hint: "Always use `isvisible()`.",
    level: "moderate",
    codeExample: "if t.isvisible(): print('visible')"
  },
  {
    question: "How does `t.heading()` behave after multiple left/right turns?",
    shortAnswer: "It returns the cumulative absolute heading modulo 360.",
    explanation: "Heading is always normalized between 0 and 360 degrees.",
    hint: "After 400° left, heading becomes 40°.",
    level: "moderate",
    codeExample: "t.left(400); print(t.heading())  # 40.0"
  },
  {
    question: "What is the shorthand for `showturtle()` and `hideturtle()`?",
    shortAnswer: "`st()` and `ht()` respectively.",
    explanation: "These are shortcuts provided for convenience.",
    hint: "`st` = show turtle, `ht` = hide turtle.",
    level: "basic",
    codeExample: "t.ht()  # hide; t.st()  # show"
  },
  {
    question: "Why might a beginner mistakenly think `hideturtle()` erases drawings?",
    shortAnswer: "They confuse the cursor icon with the drawn lines.",
    explanation: "The turtle is a separate graphical element; drawings remain untouched.",
    hint: "Teach: pen controls drawing, visibility controls cursor.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `t.pos()` return after `t.goto(100, 200)`?",
    shortAnswer: "(100.0, 200.0).",
    explanation: "`goto()` updates position; `pos()` reflects the new coordinates.",
    hint: "Always call `pos()` after movement to verify.",
    level: "basic",
    codeExample: "t.goto(100,200); print(t.pos())"
  },
  {
    question: "Can you hide the turtle and still see its stamps?",
    shortAnswer: "Yes, stamp copies the shape at that moment; visibility doesn't affect existing stamps.",
    explanation: "Stamps are independent graphical objects.",
    hint: "Stamps remain even if turtle is hidden.",
    level: "moderate",
    codeExample: "t.stamp(); t.hideturtle()  # stamp visible"
  },
  {
    question: "What is the output of `t.heading()` after `t.setheading(270)`?",
    shortAnswer: "270.0 (south).",
    explanation: "`setheading()` sets absolute heading.",
    hint: "South = 270°.",
    level: "basic",
    codeExample: "t.setheading(270); print(t.heading())"
  },
  {
    question: "How can you store the turtle's heading before a series of turns?",
    shortAnswer: "`old_heading = t.heading()`",
    explanation: "Store in a variable, then later restore with `t.setheading(old_heading)`.",
    hint: "Useful for returning to original orientation.",
    level: "moderate",
    codeExample: "h = t.heading(); ... ; t.setheading(h)"
  },
  {
    question: "What is the effect of `t.setheading(t.heading() + 45)`?",
    shortAnswer: "Adds 45° to the current heading.",
    explanation: "It's equivalent to `t.left(45)`.",
    hint: "Works but `left()` is clearer.",
    level: "moderate",
    codeExample: "t.setheading(t.heading() + 45)"
  },
  {
    question: "Does `t.isvisible()` work if the turtle was never shown?",
    shortAnswer: "Yes, it returns True because turtle is visible by default.",
    explanation: "Default visibility is True.",
    hint: "After `t.ht()`, `isvisible()` returns False.",
    level: "basic",
    codeExample: "print(t.isvisible())  # True initially"
  },
  {
    question: "How can you animate a turtle appearing and disappearing?",
    shortAnswer: "Use a loop with `t.ht()`, `t.st()`, and `time.sleep()` or `ontimer()`.",
    explanation: "Example: `for _ in range(5): t.ht(); time.sleep(0.5); t.st(); time.sleep(0.5)`.",
    hint: "In turtle, use `turtle.ontimer()` for non-blocking.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What happens if you call `t.hideturtle()` before `turtle.done()`?",
    shortAnswer: "The turtle disappears, but the window remains open.",
    explanation: "The command is executed before the main loop.",
    hint: "Common to hide at end of script.",
    level: "basic",
    codeExample: "t.hideturtle(); turtle.done()"
  },
  {
    question: "How do you get the heading in radians instead of degrees?",
    shortAnswer: "Use `math.radians(t.heading())`.",
    explanation: "Turtle's built-in functions use degrees; convert if needed.",
    hint: "Import math first.",
    level: "expert",
    codeExample: "import math; rad = math.radians(t.heading())"
  },
  {
    question: "Why does `t.heading()` sometimes return negative numbers?",
    shortAnswer: "It shouldn't; it's normalized to [0,360). If you see negative, you might have changed mode.",
    explanation: "Standard mode wraps angles to 0-360. Negative may appear if you manipulate directly.",
    hint: "Use `t.setheading()` to normalize.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the relationship between `t.pos()` and `t.xcor()`, `t.ycor()`?",
    shortAnswer: "`t.pos()` returns a tuple; `xcor()` and `ycor()` return individual components.",
    explanation: "All three are getters; no side effects.",
    hint: "Prefer `pos()` when you need both coordinates.",
    level: "basic",
    codeExample: "x, y = t.pos()  # same as x = t.xcor(); y = t.ycor()"
  },
  {
    question: "Can you set the turtle's position without drawing using these methods?",
    shortAnswer: "No, these are getters only. Use `penup()` before `goto()` to move without drawing.",
    explanation: "Position getters do not change state.",
    hint: "Get vs. set distinction.",
    level: "moderate",
    codeExample: "t.penup(); t.goto(100,100); t.pendown()"
  },
  {
    question: "How would you check if the turtle is at the origin (0,0)?",
    shortAnswer: "`if t.pos() == (0, 0):` or `if t.xcor() == 0 and t.ycor() == 0:`.",
    explanation: "Compare coordinates directly.",
    hint: "Floating point: use `abs(t.xcor()) < 0.001` for safety.",
    level: "moderate",
    codeExample: "if t.xcor() == 0 and t.ycor() == 0: print('At origin')"
  }
];

export default questions;