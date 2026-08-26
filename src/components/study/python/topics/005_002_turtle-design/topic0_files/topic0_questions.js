// src/components/study/python/topics/005_002_turtle-design/topic0_files/topic0_questions.js

const questions = [
  {
    question: "What does turtle.penup() do?",
    shortAnswer: "Lifts the pen off the canvas so movements do not draw lines.",
    explanation: "When penup() is active, commands like forward() and goto() change the turtle's position without leaving ink on the canvas.",
    hint: "Think about lifting a pen off a sheet of paper.",
    level: "basic",
    codeExample: "t.penup()\nt.goto(100, 100)  # No line drawn!\nt.pendown()"
  },
  {
    question: "What does turtle.pendown() do?",
    shortAnswer: "Lowers the pen back onto the canvas so subsequent movements draw lines.",
    explanation: "pendown() restores the default drawing behavior after a penup() call.",
    hint: "What is the opposite of penup?",
    level: "basic",
    codeExample: "t.pendown()\nt.forward(50)  # Draws a 50px line"
  },
  {
    question: "What are the common shorthand aliases for penup() and pendown()?",
    shortAnswer: "t.up() / t.pu() for penup(), and t.down() / t.pd() for pendown().",
    explanation: "Python's turtle module provides convenient 2-letter and short method aliases.",
    hint: "What are the 2-letter abbreviations of pen up and pen down?",
    level: "basic",
    codeExample: "t.pu()  # penup\nt.pd()  # pendown"
  },
  {
    question: "How do you set the thickness of a drawn line in Turtle?",
    shortAnswer: "Using turtle.pensize(width) or turtle.width(width).",
    explanation: "pensize(width) takes a positive integer representing the line width in screen pixels.",
    hint: "Which method sets the pen size in pixels?",
    level: "basic",
    codeExample: "t.pensize(5)  # 5-pixel thick line\nt.forward(100)"
  },
  {
    question: "How do you check whether the pen is currently down or up?",
    shortAnswer: "Using the boolean method turtle.isdown().",
    explanation: "t.isdown() returns True if the pen is down and drawing, and False if it is lifted.",
    hint: "What boolean query checks pen state?",
    level: "moderate",
    codeExample: "if not t.isdown():\n    t.pendown()"
  },
  {
    question: "What is the default pensize when a new Turtle is created?",
    shortAnswer: "1 pixel.",
    explanation: "Every new Turtle instance initializes with a default stroke width of 1 pixel.",
    hint: "What is the thinnest single-pixel stroke?",
    level: "basic",
    codeExample: "print(t.pensize())  # 1"
  },
  {
    question: "How do you draw a dashed line with Turtle?",
    shortAnswer: "By looping forward with pen down, then forward with pen up repeatedly.",
    explanation: "Alternating between pendown() and penup() inside a loop creates regular dashed patterns.",
    hint: "How do you create alternating line and blank space?",
    level: "moderate",
    codeExample: "for _ in range(10):\n    t.pendown()\n    t.forward(15)\n    t.penup()\n    t.forward(10)"
  },
  {
    question: "What happens if you pass a float like 3.5 to pensize()?",
    shortAnswer: "Turtle accepts floating-point widths and renders anti-aliased strokes accordingly.",
    explanation: "Tkinter canvas lines can accept floating values, though integer pixels are standard.",
    hint: "Can line thickness have decimal precision?",
    level: "moderate",
    codeExample: "t.pensize(2.5)"
  },
  {
    question: "How do you move the turtle to (x, y) without drawing a transit line?",
    shortAnswer: "Call penup(), then goto(x, y), then pendown().",
    explanation: "This 3-step 'island hopping' pattern is the foundational idiom for repositioning turtles.",
    hint: "What must you do before and after goto(x, y)?",
    level: "basic",
    codeExample: "t.penup()\nt.goto(-150, 200)\nt.pendown()"
  },
  {
    question: "Does penup() affect the turtle.dot() command?",
    shortAnswer: "No, dot() stamps a circular point at the turtle's location even if the pen is up.",
    explanation: "turtle.dot(diameter, color) is an instantaneous stamp operation independent of pen trail state.",
    hint: "Does stamping a dot require dragging the pen?",
    level: "advanced",
    codeExample: "t.penup()\nt.goto(0, 0)\nt.dot(20, 'red')  # Renders successfully!"
  },
  {
    question: "Does penup() affect turtle.write() for rendering text?",
    shortAnswer: "No, write() renders text on the canvas regardless of whether the pen is up or down.",
    explanation: "Text rendering is an overlay operation and does not require active pen dragging.",
    hint: "Can text be printed on screen when pen is up?",
    level: "moderate",
    codeExample: "t.penup()\nt.write('Hello Jadavpur!', font=('Arial', 14, 'normal'))"
  },
  {
    question: "Can pensize() be called with no arguments to get current width?",
    shortAnswer: "Yes, `t.pensize()` with no arguments returns the current pen size integer.",
    explanation: "Like many Turtle methods, pensize() acts as a getter when called without arguments.",
    hint: "How do you inspect the current line thickness?",
    level: "moderate",
    codeExample: "current_width = t.pensize()"
  },
  {
    question: "What error occurs if you pass a negative number or zero to pensize()?",
    shortAnswer: "Passing non-positive sizes or invalid types can cause visual anomalies or errors.",
    explanation: "Standard pen thickness should always be positive (>= 1).",
    hint: "Can physical pens have negative thickness?",
    level: "moderate",
    codeExample: "# Always use positive width: t.pensize(4)"
  },
  {
    question: "How can you create a line with gradually increasing thickness (calligraphy effect)?",
    shortAnswer: "Increase pensize inside a forward loop.",
    explanation: "Incrementing `t.pensize(i)` by 1 on each step creates a tapering geometric effect.",
    hint: "How does loop index i change line thickness over time?",
    level: "moderate",
    codeExample: "for i in range(1, 20):\n    t.pensize(i)\n    t.forward(10)"
  },
  {
    question: "What is penstate preservation in modular drawing functions?",
    shortAnswer: "Recording whether the pen was up/down before drawing and restoring that state on exit.",
    explanation: "This ensures that calling a helper function like `draw_star()` does not accidentally leave the pen in an unexpected state for the caller.",
    hint: "How do clean functions clean up after themselves?",
    level: "expert",
    codeExample: "was_down = t.isdown()\n# do work...\nif not was_down: t.penup()"
  },
  {
    question: "How do you draw a dotted line (points instead of dashes)?",
    shortAnswer: "Lift pen, move forward in steps, and call t.dot() at each step.",
    explanation: "Using `t.dot(size)` with `t.penup()` creates perfectly round dotted lines.",
    hint: "What method places a circular dot on canvas?",
    level: "moderate",
    codeExample: "t.penup()\nfor _ in range(15):\n    t.dot(6, 'cyan')\n    t.forward(20)"
  },
  {
    question: "Does changing pensize() retroactively change lines already drawn?",
    shortAnswer: "No, pensize() only affects lines drawn after the method call.",
    explanation: "Canvas drawings are permanent vector line segments. Changing pen attributes applies only forward in time.",
    hint: "Does changing your physical pen alter drawings already made on paper?",
    level: "basic",
    codeExample: "t.pensize(2); t.forward(50)  # 2px\nt.pensize(10); t.forward(50) # 10px"
  },
  {
    question: "What is the function of turtle.pen()?",
    shortAnswer: "It returns or sets a dictionary containing all pen state attributes simultaneously.",
    explanation: "`t.pen()` manages shown, pendown, pencolor, fillcolor, pensize, speed, and resizemode in a single dictionary.",
    hint: "Which method returns all pen settings in a single dictionary?",
    level: "advanced",
    codeExample: "state = t.pen()\nprint(state['pensize'], state['pendown'])"
  },
  {
    question: "How can you restore an entire pen state from a dictionary?",
    shortAnswer: "Pass the saved dictionary to `t.pen(saved_dict)`.",
    explanation: "Calling `t.pen(old_state)` restores all attributes (color, size, up/down) in one command.",
    hint: "How do you unpack a saved state back into the pen?",
    level: "expert",
    codeExample: "old_state = t.pen()\n# modify pen...\nt.pen(old_state) # Restored!"
  },
  {
    question: "Why is pen control crucial for drawing coordinate axes (X and Y axes)?",
    shortAnswer: "To position the turtle at (-X, 0) and (0, -Y) without drawing diagonal lines from the origin.",
    explanation: "Drawing coordinate systems requires lifting the pen to navigate to the axis extremities cleanly.",
    hint: "How do you jump to axis start points without leaving marks?",
    level: "moderate",
    codeExample: "t.penup(); t.goto(-300, 0); t.pendown(); t.forward(600)"
  },
  {
    question: "What is the difference between `t.pensize(w)` and `t.shapesize(w)`?",
    shortAnswer: "pensize() alters drawn line thickness; shapesize() scales the turtle cursor icon.",
    explanation: "pensize modifies drawing ink, while shapesize modifies the visual size of the turtle shape itself.",
    hint: "One scales the ink, the other scales the cursor.",
    level: "moderate",
    codeExample: "t.pensize(5)   # Thick line\nt.shapesize(2) # 2x larger turtle icon"
  },
  {
    question: "How do you draw a grid of dots across the entire screen?",
    shortAnswer: "Use nested loops over X and Y coordinates with penup() and dot().",
    explanation: "Iterate across x in range(-200, 201, 40) and y in range(-200, 201, 40) with `t.goto(x,y); t.dot(4)`.",
    hint: "What structure generates a 2D matrix of points?",
    level: "advanced",
    codeExample: "t.penup()\nfor x in range(-200, 201, 50):\n    for y in range(-200, 201, 50):\n        t.goto(x, y); t.dot(4, 'white')"
  },
  {
    question: "Does turtle.stamp() depend on penup() or pendown()?",
    shortAnswer: "No, stamp() leaves an impression of the turtle cursor regardless of pen state.",
    explanation: "Stamp creates a static copy of the turtle shape at its current position and heading.",
    hint: "Does stamping a rubber stamp require drawing a line?",
    level: "moderate",
    codeExample: "t.penup(); t.goto(100, 50); t.stamp()"
  },
  {
    question: "Can multiple Turtle instances have different pensizes simultaneously?",
    shortAnswer: "Yes, each Turtle instance encapsulates its own independent pen state.",
    explanation: "Turtle A can have `pensize(2)` and red color while Turtle B has `pensize(8)` and green color.",
    hint: "Are pen attributes global or object-specific?",
    level: "basic",
    codeExample: "t1 = turtle.Turtle(); t1.pensize(2)\nt2 = turtle.Turtle(); t2.pensize(8)"
  },
  {
    question: "Why should you lift the pen when generating random scatter plots?",
    shortAnswer: "To prevent random connecting zigzag lines between discrete data points.",
    explanation: "Scatter plots represent individual points; drawing lines between them misleads the visualization.",
    hint: "Do scatter plots connect points with lines?",
    level: "moderate",
    codeExample: "t.penup()\nfor x, y in data_points:\n    t.goto(x, y); t.dot(6, 'orange')"
  },
  {
    question: "What is the return type of t.isdown()?",
    shortAnswer: "Boolean (True or False).",
    explanation: "t.isdown() returns True if the pen is down, False if it is up.",
    hint: "Is it a string, number, or boolean?",
    level: "basic",
    codeExample: "state = t.isdown()  # True / False"
  },
  {
    question: "How does setting pensize(10) affect sharp polygon corners?",
    shortAnswer: "It produces rounded/mitered corner joins rendered by the underlying Tkinter engine.",
    explanation: "Thick lines emphasize the joint geometry between intersecting segments.",
    hint: "What happens when thick line strokes meet at an angle?",
    level: "advanced",
    codeExample: "t.pensize(15)\nfor _ in range(3): t.forward(100); t.left(120)"
  },
  {
    question: "What is the best practice for resetting pen attributes back to defaults?",
    shortAnswer: "Call `t.pensize(1)` and `t.pendown()` explicitly, or `t.reset()`.",
    explanation: "Explicit reset ensures subsequent drawings start with predictable standard attributes.",
    hint: "How do you ensure clean state across functions?",
    level: "basic",
    codeExample: "t.pensize(1)\nt.pendown()"
  },
  {
    question: "How do you draw concentric circles with increasing line weights?",
    shortAnswer: "Loop over increasing radius values while adjusting `t.pensize()` and repositioning with `penup()`.",
    explanation: "Reposition to `(0, -radius)` with penup(), then draw circle with adjusted pensize.",
    hint: "How do you center concentric circles without transit lines?",
    level: "moderate",
    codeExample: "for r in range(20, 120, 20):\n    t.penup(); t.goto(0, -r); t.pendown()\n    t.pensize(r // 15); t.circle(r)"
  },
  {
    question: "What is the summary golden rule of pen control?",
    shortAnswer: "Always lift the pen before moving to a new starting location, and set pensize before drawing strokes.",
    explanation: "This simple habit eliminates 99% of accidental stray lines in Turtle graphical programming.",
    hint: "What two actions keep drawings clean and sharp?",
    level: "basic",
    codeExample: "# Golden Rule:\n# 1. t.penup() -> 2. t.goto() -> 3. t.pensize() -> 4. t.pendown()"
  }
];

export default questions;
