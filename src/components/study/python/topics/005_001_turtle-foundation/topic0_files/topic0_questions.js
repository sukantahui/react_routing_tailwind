// src/components/study/python/topics/005_001_turtle-foundation/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: Introduction to Turtle Graphics

const questions = [
  {
    question: "Who developed the original Turtle Graphics concept and in what programming language?",
    shortAnswer: "Turtle Graphics was developed in 1967 by Wally Feurzeig, Seymour Papert, and Cynthia Solomon as part of the Logo programming language at MIT.",
    explanation: "Historical origins of Turtle Graphics in Logo and MIT Artificial Intelligence Lab.",
    hint: "Created by Seymour Papert and Wally Feurzeig as part of Logo in 1967.",
    level: "basic",
    codeExample: "# Developed in 1967 for Logo; built into Python Standard Library via 'turtle'"
  },
  {
    question: "What is Seymour Papert's concept of 'Body Syntonic' learning in Turtle Graphics?",
    shortAnswer: "'Body Syntonic' learning is an educational philosophy where students understand abstract mathematical geometry and algorithms by mentally projecting their own physical body into the position of the turtle on the 2D plane.",
    explanation: "Seymour Papert's constructivist learning philosophy.",
    hint: "Mentally imagining yourself as the turtle turning and stepping forward.",
    level: "basic",
    codeExample: "# 'If I were the turtle, I would turn right 90 degrees and walk 50 steps'"
  },
  {
    question: "What GUI framework powers Python's standard 'turtle' module under the hood?",
    shortAnswer: "Python's 'turtle' module is built directly on top of 'tkinter' (Python's standard Tk interface wrapper), using a Tkinter Canvas for vector rendering.",
    explanation: "Underlying GUI technology powering the turtle module.",
    hint: "Built on top of Python's standard 'tkinter' library.",
    level: "basic",
    codeExample: "import turtle # Wraps tkinter.Canvas under the hood"
  },
  {
    question: "Why is 'turtle.done()' or 'turtle.mainloop()' required at the end of a Turtle script?",
    shortAnswer: "'turtle.done()' (or 'mainloop()') enters the Tkinter GUI event loop, keeping the graphics window open to listen for user clicks, keyboard events, and window refreshes without immediately closing.",
    explanation: "GUI event loop lifecycle management.",
    hint: "Enters the Tkinter event loop to keep the window open after drawing completes.",
    level: "basic",
    codeExample: "import turtle\nturtle.forward(100)\nturtle.done() # Enters event loop, keeps window open"
  },
  {
    question: "What is the difference between procedural turtle commands ('turtle.forward(100)') and object-oriented turtle instances ('t = turtle.Turtle(); t.forward(100)')?",
    shortAnswer: "Procedural commands operate on the global anonymous singleton turtle; creating explicit 'turtle.Turtle()' instances allows managing multiple independent turtles with separate positions, colors, speeds, and pens on the same canvas.",
    explanation: "Singleton procedural vs multi-instance object-oriented turtle programming.",
    hint: "Procedural uses global singleton; OOP allows multiple distinct turtles on one screen.",
    level: "basic",
    codeExample: "t1 = turtle.Turtle()\nt2 = turtle.Turtle() # 2 independent turtles"
  },
  {
    question: "In what direction is a newly initialized Turtle pointing by default?",
    shortAnswer: "By default, a new turtle starts at coordinates (0, 0) facing East (0 degrees / rightward along the positive X-axis).",
    explanation: "Default orientation and heading of new turtles.",
    hint: "Facing East (0 degrees, pointing to the right along the positive X-axis).",
    level: "basic",
    codeExample: "t = turtle.Turtle()\nprint(t.heading()) # 0.0 (East)"
  },
  {
    question: "What happens if you run a Turtle script in an interactive environment (like IDLE or Jupyter) without 'turtle.bye()'?",
    shortAnswer: "The Tkinter mainloop can remain bound to the process, causing subsequent script runs to fail with 'Terminator' exceptions or frozen windows; using 'turtle.bye()' cleanly destroys the previous canvas before creating a new one.",
    explanation: "Tkinter canvas lifecycle in interactive REPL environments.",
    hint: "Can freeze or raise Terminator exceptions; turtle.bye() resets the canvas cleanly.",
    level: "moderate",
    codeExample: "turtle.bye() # Closes existing screen cleanly"
  },
  {
    question: "What are the 4 fundamental movement and rotation methods in Turtle Graphics?",
    shortAnswer: "1. 'forward(distance)' or 'fd(d)', 2. 'backward(distance)' or 'bk(d)', 3. 'left(angle)' or 'lt(a)', and 4. 'right(angle)' or 'rt(a)'.",
    explanation: "Core motion primitives in the turtle graphics API.",
    hint: "forward(), backward(), left(), and right().",
    level: "basic",
    codeExample: "t.forward(100); t.right(90); t.backward(50); t.left(45)"
  },
  {
    question: "How does Turtle Graphics differ from standard pixel-based bitmap drawing (e.g. raster images)?",
    shortAnswer: "Turtle Graphics uses vector path drawing based on continuous mathematical coordinates and angles (infinite resolution without pixelation), whereas bitmap drawing manipulates fixed grids of colored pixels.",
    explanation: "Vector mathematics vs raster pixel grids.",
    hint: "Vector paths based on continuous coordinates vs fixed pixel grids.",
    level: "basic",
    codeExample: "# Turtle draws resolution-independent vector paths"
  },
  {
    question: "What is 'turtle.exitonclick()' and how is it used?",
    shortAnswer: "'turtle.exitonclick()' is a convenience method that binds a mouse click event to the screen to close the window and terminates the event loop when the user clicks anywhere on the canvas.",
    explanation: "Convenience exit binding on canvas click.",
    hint: "Keeps window open and closes it cleanly when user clicks the canvas.",
    level: "basic",
    codeExample: "screen = turtle.Screen()\nscreen.exitonclick() # Closes on mouse click"
  },
  {
    question: "What real-world engineering domains use the same path-following principles as Turtle Graphics?",
    shortAnswer: "1. CNC (Computer Numerical Control) machining and G-code, 2. 3D printers slicing toolpaths, 3. SVG vector graphics rendering engines, 4. Pen plotters and robotic arm navigation, and 5. Autonomous robot trajectory planning.",
    explanation: "Real-world industrial applications of path-following robotics and vector CAD.",
    hint: "CNC machines, 3D printing toolpaths, SVG paths, and robotic navigation.",
    level: "moderate",
    codeExample: "# G-code: G1 X100 Y50 is conceptually identical to turtle.goto(100, 50)"
  },
  {
    question: "How do you change the appearance shape of the turtle cursor?",
    shortAnswer: "Using 'turtle.shape(name)', where standard built-in shapes include 'turtle', 'arrow', 'circle', 'square', 'triangle', and 'classic'.",
    explanation: "Customizing turtle cursor visual representation.",
    hint: "Use t.shape('turtle') with shapes like circle, square, arrow, or classic.",
    level: "basic",
    codeExample: "t.shape('turtle') # Displays actual turtle icon"
  },
  {
    question: "What is the function of 'turtle.speed(value)' and what is the fastest speed setting?",
    shortAnswer: "'turtle.speed(val)' controls animation speed from 1 (slowest) to 10 (fast); setting 'speed(0)' turns off drawing delay completely for instant rendering.",
    explanation: "Animation speed control and instant rendering mode (speed 0).",
    hint: "1 is slowest, 10 is fast, and 0 is instant with zero animation delay.",
    level: "basic",
    codeExample: "t.speed(0) # Instantaneous drawing with 0 delay"
  },
  {
    question: "How do you set the background color and dimensions of the Turtle window?",
    shortAnswer: "Using 'screen.bgcolor(\"color\")' (e.g. 'black', '#0f172a') and 'screen.setup(width, height)' (e.g. 'screen.setup(800, 600)').",
    explanation: "Screen canvas configuration methods.",
    hint: "screen.bgcolor('black') and screen.setup(width=800, height=600).",
    level: "basic",
    codeExample: "screen = turtle.Screen()\nscreen.bgcolor('#0f172a')\nscreen.setup(800, 600)"
  },
  {
    question: "Why is learning Turtle Graphics recommended for building computational thinking?",
    shortAnswer: "It provides immediate visual feedback for abstract programming logic (loops, conditionals, functions, recursion), helping students connect mathematical geometry with algorithmic problem-solving in an engaging, visual way.",
    explanation: "Pedagogical benefits of visual computational thinking.",
    hint: "Provides immediate visual feedback connecting geometry, loops, and logic.",
    level: "basic",
    codeExample: "# Immediate visual verification of loop iterations and geometry formulas"
  },
  {
    question: "What is the difference between 'turtle.clear()' and 'turtle.reset()'?",
    shortAnswer: "'clear()' erases all drawings made by that turtle while leaving the turtle at its current position and heading; 'reset()' erases the drawings AND returns the turtle to the origin (0, 0) with default heading and colors.",
    explanation: "Canvas erasing vs complete turtle state reset.",
    hint: "clear() erases lines only; reset() erases lines AND moves turtle back to (0,0).",
    level: "basic",
    codeExample: "t.clear() # Erases canvas, stays in place\nt.reset() # Erases canvas and moves home to (0,0)"
  },
  {
    question: "How do you hide the turtle cursor while drawing or after finishing a design?",
    shortAnswer: "Using 't.hideturtle()' (or 't.ht()'); show it again using 't.showturtle()' (or 't.st()').",
    explanation: "Controlling cursor visibility on the canvas.",
    hint: "t.hideturtle() hides the pen icon; t.showturtle() reveals it.",
    level: "basic",
    codeExample: "t.hideturtle() # Makes cursor invisible for clean final drawings"
  },
  {
    question: "What happens if you move a turtle without calling 't.penup()' first?",
    shortAnswer: "By default, the turtle's pen is down on the canvas, so any movement ('forward', 'goto', 'backward') will draw a visible line connecting the previous position to the new position.",
    explanation: "Default pen state and drawing trails.",
    hint: "The pen is down by default, so moving draws a visible line unless you call penup().",
    level: "basic",
    codeExample: "t.penup() # Lift pen\nt.goto(100, 100) # Move without drawing\nt.pendown() # Lower pen to draw"
  },
  {
    question: "Can multiple Python Turtle objects draw concurrently on the same canvas?",
    shortAnswer: "Yes; you can instantiate multiple 'turtle.Turtle()' instances, assign them different colors, shapes, and positions, and command them sequentially or in loops to create complex synchronized patterns.",
    explanation: "Multi-agent drawing using multiple turtle instances.",
    hint: "Yes, by creating multiple turtle.Turtle() instances on the same Screen.",
    level: "basic",
    codeExample: "t1 = turtle.Turtle(); t2 = turtle.Turtle()\nt1.color('cyan'); t2.color('magenta')"
  },
  {
    question: "What is the ultimate golden rule of Turtle Graphics programming?",
    shortAnswer: "Always configure the screen first (`turtle.Screen()`), use explicit object-oriented turtle instances (`t = turtle.Turtle()`), set clear canvas bounds and background colors, and conclude every script with `turtle.done()` or `screen.exitonclick()` to prevent GUI window freezing.",
    explanation: "The complete standard for rock-solid Python Turtle scripts.",
    hint: "Screen setup + explicit Turtle instances + colors + turtle.done().",
    level: "basic",
    codeExample: "# Enterprise Python Turtle Template"
  }
];

export default questions;