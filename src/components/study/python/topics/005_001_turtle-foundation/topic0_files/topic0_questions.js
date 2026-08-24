const questions = [
  {
    question: "What is the primary educational philosophy behind Turtle Graphics?",
    shortAnswer: "Constructionist learning theory (Seymour Papert).",
    explanation: "Children learn best by building and creating tangible projects. Turtle Graphics lets learners construct geometric drawings and see immediate results, reinforcing programming and math concepts.",
    hint: "Think about learning by making something visible.",
    level: "moderate",
    codeExample: "No code example needed."
  },
  {
    question: "Who developed the LOGO programming language and when?",
    shortAnswer: "Seymour Papert, Wally Feurzeig, and Cynthia Solomon at MIT in 1967.",
    explanation: "LOGO was designed to teach programming concepts to children using turtle graphics. It introduced the concept of 'body syntonic' learning – relating abstract ideas to one's own body movements.",
    hint: "MIT in the late 1960s.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Name three real-world applications of turtle graphics principles.",
    shortAnswer: "Robotics path planning, 2D game sprite movement, pen plotter art.",
    explanation: "The forward/rotate commands mimic robot movement; coordinate systems and state management are used in games; generative art uses similar iterative drawing techniques.",
    hint: "Think of moving robots, video game characters, and drawing machines.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is the default heading (direction) of a newly created turtle in Python?",
    shortAnswer: "0 degrees (east, to the right).",
    explanation: "The turtle starts facing east (to the right). Heading increases counter-clockwise, so north is 90°, west 180°, south 270°.",
    hint: "Which way does the arrow point when you first run a turtle program?",
    level: "basic",
    codeExample: "import turtle; t = turtle.Turtle(); print(t.heading())  # 0.0"
  },
  {
    question: "What happens if you forget to call `turtle.done()` at the end of a script?",
    shortAnswer: "The graphics window closes immediately after drawing.",
    explanation: "`turtle.done()` starts the event loop, keeping the window open. Without it, the program terminates and the window disappears.",
    hint: "Try running a turtle program without `done()` – you might not see the result.",
    level: "basic",
    codeExample: "turtle.done()  # Keeps window open"
  },
  {
    question: "Why is the Cartesian coordinate system important in turtle graphics?",
    shortAnswer: "It defines positions on the screen using (x, y) pairs, enabling absolute positioning.",
    explanation: "The origin (0,0) is the center. Positive x moves right, negative x left; positive y up, negative y down. This matches algebra and geometry classes.",
    hint: "Where is (0,0) located on the turtle screen?",
    level: "moderate",
    codeExample: "t.goto(100, 50)  # Move to x=100, y=50"
  },
  {
    question: "What is the difference between `penup()` and `pendown()`?",
    shortAnswer: "`penup()` stops drawing while moving; `pendown()` resumes drawing.",
    explanation: "Use `penup()` to reposition the turtle without leaving a trail, then `pendown()` to draw again.",
    hint: "Think of a pen touching paper vs. lifting it.",
    level: "basic",
    codeExample: "t.penup(); t.goto(-100,0); t.pendown()"
  },
  {
    question: "How can you change the turtle's drawing speed?",
    shortAnswer: "Use `turtle.speed(value)` where 0=fastest, 10=fast, 1=slowest.",
    explanation: "Speed 0 turns off animation and draws instantly. Values 1-10 control animation speed.",
    hint: "Try `t.speed(0)` for instant drawing.",
    level: "basic",
    codeExample: "t.speed(6)  # Normal speed"
  },
  {
    question: "What does `setheading(90)` do?",
    shortAnswer: "Sets turtle's heading to 90 degrees (north, pointing up).",
    explanation: "Unlike `left()` or `right()` which are relative, `setheading()` sets absolute direction.",
    hint: "Compass: 0° east, 90° north, 180° west, 270° south.",
    level: "moderate",
    codeExample: "t.setheading(90); t.forward(100)  # Move up"
  },
  {
    question: "Explain a common beginner misconception about `turtle.right()` and angles.",
    shortAnswer: "Believing that `right(90)` always makes a square turn, but it depends on current heading.",
    explanation: "`right(angle)` rotates clockwise relative to current heading. For a square, you need four 90° turns after forward movements.",
    hint: "Run a mental simulation: turtle facing east → right 90 → south → right 90 → west, etc.",
    level: "moderate",
    codeExample: "for _ in range(4): t.forward(100); t.right(90)"
  },
  {
    question: "How does `turtle.reset()` differ from `turtle.clear()`?",
    shortAnswer: "`clear()` only erases drawings; `reset()` also resets position, heading, and pen state.",
    explanation: "Use `clear()` to remove drawings but keep position; use `reset()` to start over completely.",
    hint: "Reset = clear + home + restore defaults.",
    level: "moderate",
    codeExample: "t.reset()  # Turtle back at origin, facing east, drawings erased"
  },
  {
    question: "What is the purpose of `turtle.hideturtle()`?",
    shortAnswer: "Makes the turtle icon invisible on screen.",
    explanation: "Useful for final drawings where you don't want the cursor to distract. `showturtle()` brings it back.",
    hint: "Hide the 'pen' when you only care about the final art.",
    level: "basic",
    codeExample: "t.hideturtle(); t.stamp()  # stamp without showing turtle"
  },
  {
    question: "Why might you use `turtle.tracer(0)` and `turtle.update()`?",
    shortAnswer: "To disable automatic screen updates and manually control rendering for complex animations.",
    explanation: "This makes drawing much faster for many steps because it batches all changes and updates once.",
    hint: "Professional tip: speed up hundreds of drawing commands.",
    level: "expert",
    codeExample: "turtle.tracer(0); for i in range(1000): t.forward(1); t.right(1); turtle.update()"
  },
  {
    question: "How would you draw a circle using only `forward()` and `right()`?",
    shortAnswer: "Repeat small forward steps and small right turns many times.",
    explanation: "A circle is a polygon with many short sides. E.g., 360 steps of forward(1) and right(1).",
    hint: "Think of a circle as a 360-sided polygon.",
    level: "expert",
    codeExample: "for _ in range(360): t.forward(1); t.right(1)"
  },
  {
    question: "What is the significance of the turtle being a 'state machine'?",
    shortAnswer: "It holds state: position, heading, pen down/up, color, pensize, etc.",
    explanation: "All drawing commands modify this state. Understanding state is crucial for debugging and predicting behavior.",
    hint: "Each command changes one or more properties of the turtle.",
    level: "expert",
    codeExample: "print(t.position(), t.heading(), t.isdown())"
  },
  {
    question: "How can students like Swadeep debug a turtle program that draws unexpected shapes?",
    shortAnswer: "Add print statements for position and heading after each move, or use slower speed.",
    explanation: "Use `turtle.speed(1)` to watch step-by-step. Print `t.pos()` and `t.heading()` to verify.",
    hint: "Observe each move carefully – note where the turtle actually goes.",
    level: "moderate",
    codeExample: "t.forward(100); print(t.pos()); t.right(90); print(t.heading())"
  },
  {
    question: "Why does `turtle.forward(50)` sometimes not move the turtle on screen?",
    shortAnswer: "Because the pen might be up, or the window closed, or tracer disabled without update.",
    explanation: "Check `t.isdown()`; if false, movement doesn't draw. Also if `tracer(0)` was used, call `update()`.",
    hint: "Is the pen touching the 'paper'?",
    level: "moderate",
    codeExample: "if not t.isdown(): t.pendown()"
  },
  {
    question: "What is the purpose of the `turtle.stamp()` method?",
    shortAnswer: "Leaves an impression of the turtle shape at its current position.",
    explanation: "Unlike drawing, stamping copies the shape without affecting subsequent movements. Useful for markers.",
    hint: "Like pressing an ink stamp on paper.",
    level: "moderate",
    codeExample: "t.stamp(); t.forward(50); t.stamp()"
  },
  {
    question: "Compare relative movement (`forward`, `backward`) vs absolute movement (`goto`, `setx`).",
    shortAnswer: "Relative moves based on current heading; absolute moves to exact coordinates regardless of heading.",
    explanation: "Use relative for patterns like polygons; use absolute for precise positioning like a grid.",
    hint: "Forward depends on where you're facing; goto goes to a fixed address.",
    level: "moderate",
    codeExample: "t.forward(100)   # relative; t.goto(100,0) # absolute"
  },
  {
    question: "How do you draw a dotted line in turtle graphics?",
    shortAnswer: "Repeatedly `pendown()`, `forward()`, `penup()`, `forward()`.",
    explanation: "Pen down to draw a segment, up to skip, forming dashes.",
    hint: "Lift the pen between short movements.",
    level: "moderate",
    codeExample: "for _ in range(10): t.pendown(); t.forward(10); t.penup(); t.forward(10)"
  },
  {
    question: "What is the default size of the turtle screen?",
    shortAnswer: "Width 400, height 400 (in older versions). Modern Python turtle default is 50% of screen.",
    explanation: "You can set custom size using `turtle.screensize()` or `turtle.setup(width, height)`.",
    hint: "Check documentation or try `turtle.screensize()`.",
    level: "basic",
    codeExample: "turtle.setup(800, 600)"
  },
  {
    question: "Why might a turtle draw a line not visible until `turtle.update()`?",
    shortAnswer: "Because `turtle.tracer(0)` disabled automatic updates.",
    explanation: "Turtle batches drawing commands for speed. Call `update()` to flush the buffer.",
    hint: "Tracer(0) = manual mode; tracer(1) = automatic.",
    level: "expert",
    codeExample: "turtle.tracer(0); t.forward(100); turtle.update()  # Now line appears"
  },
  {
    question: "Describe the concept of 'body syntonic learning' in turtle graphics.",
    shortAnswer: "Relating turtle movements to one's own body motions – e.g., turning right means the same as turning your body right.",
    explanation: "Papert used this to make programming intuitive. Children imagine themselves as the turtle, moving and turning.",
    hint: "Think of giving commands to yourself: 'forward 10 steps, turn right'.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the effect of `turtle.colormode(255)`?",
    shortAnswer: "Changes color input mode from 0-1 to 0-255 (RGB).",
    explanation: "Default is 0-1 (e.g., `t.pencolor(1,0,0)` for red). With 255, you can use `t.pencolor(255,0,0)`.",
    hint: "Like RGB values in web design.",
    level: "moderate",
    codeExample: "turtle.colormode(255); t.pencolor(128,0,128)  # Purple"
  },
  {
    question: "How can you make the turtle draw faster for complex patterns?",
    shortAnswer: "Set speed(0) and tracer(0) with manual update.",
    explanation: "Speed(0) reduces animation delay; tracer(0) removes all screen updates until update().",
    hint: "Combine both for maximum performance.",
    level: "expert",
    codeExample: "t.speed(0); turtle.tracer(0); # many commands; turtle.update()"
  },
  {
    question: "What is the difference between `turtle.bye()` and `turtle.exitonclick()`?",
    shortAnswer: "`bye()` closes window immediately; `exitonclick()` closes after clicking on the screen.",
    explanation: "`exitonclick()` is user-friendly, allowing the student to see the drawing until they click.",
    hint: "Which one waits for the user?",
    level: "moderate",
    codeExample: "turtle.exitonclick()  # Click to close"
  },
  {
    question: "Why does `turtle.goto(100, 100)` sometimes draw a line even after `penup()`?",
    shortAnswer: "`penup()` might be called after the move or on a different turtle object.",
    explanation: "Ensure penup() is called before goto(). Also check if you have multiple turtles.",
    hint: "Trace your pen state with `print(t.isdown())`.",
    level: "moderate",
    codeExample: "t.penup(); t.goto(100,100)  # No line drawn"
  },
  {
    question: "How would you draw a filled shape like a red square?",
    shortAnswer: "Use `t.begin_fill()`, draw shape, then `t.end_fill()`.",
    explanation: "The area enclosed by the drawing path is filled with the current fill color.",
    hint: "Don't forget to set fill color before or during.",
    level: "moderate",
    codeExample: "t.fillcolor('red'); t.begin_fill(); for _ in range(4): t.forward(100); t.right(90); t.end_fill()"
  },
  {
    question: "What does `turtle.heading()` return?",
    shortAnswer: "Current heading in degrees (float).",
    explanation: "0 = east, 90 = north, 180 = west, 270 = south.",
    hint: "Use it to debug turning commands.",
    level: "basic",
    codeExample: "print(f'Heading: {t.heading()}')"
  },
  {
    question: "Explain the concept of 'turtle cloning' using `turtle.clone()`.",
    shortAnswer: "Creates a copy of the turtle with same position, heading, and pen state.",
    explanation: "Cloned turtles are independent; useful for drawing multiple patterns simultaneously.",
    hint: "Two pens drawing at once.",
    level: "expert",
    codeExample: "t2 = t.clone(); t2.forward(50)"
  }
];

export default questions;