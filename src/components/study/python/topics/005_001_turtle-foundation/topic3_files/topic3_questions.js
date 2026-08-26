// src/components/study/python/topics/005_001_turtle-foundation/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Turtle object creation and lifecycle

const questions = [
  {
    question: "Why is object-oriented instantiation ('t = turtle.Turtle()') superior to procedural global calls ('turtle.forward(100)')?",
    shortAnswer: "Object-oriented instantiation allows creating multiple independent turtles with isolated states (positions, headings, colors, pen sizes, speeds) on the same screen, which is impossible with the procedural singleton.",
    explanation: "Multi-instance object-oriented design vs procedural singleton limitations.",
    hint: "Allows multiple independent turtles with separate states on one canvas.",
    level: "basic",
    codeExample: "t1 = turtle.Turtle()\nt2 = turtle.Turtle() # Two independent drawing agents"
  },
  {
    question: "What is the initial default state of a newly created 'turtle.Turtle()' instance?",
    shortAnswer: "Position: (0, 0) center; Heading: 0.0 degrees (East); Shape: 'classic' arrow; Pen Color: 'black'; Pen State: down (drawing); Speed: 3 (normal); Cursor Visibility: visible.",
    explanation: "Default properties of newly instantiated Turtle objects.",
    hint: "Position (0,0), Heading 0 (East), Shape 'classic', Pen down, Color black.",
    level: "basic",
    codeExample: "t = turtle.Turtle()\nprint(t.pos(), t.heading(), t.isdown()) # (0.0, 0.0) 0.0 True"
  },
  {
    question: "What are the 6 built-in cursor shapes supported by 't.shape()'?",
    shortAnswer: "1. 'arrow', 2. 'turtle', 3. 'circle', 4. 'square', 5. 'triangle', and 6. 'classic'.",
    explanation: "Standard built-in cursor shapes in the turtle module.",
    hint: "'arrow', 'turtle', 'circle', 'square', 'triangle', 'classic'.",
    level: "basic",
    codeExample: "t.shape('turtle') # Changes cursor to actual turtle graphic"
  },
  {
    question: "What does 't.clone()' do?",
    shortAnswer: "'t.clone()' creates and returns an exact duplicate Turtle object with the identical position, heading, pen color, pen size, and drawing state as the original turtle at that moment.",
    explanation: "Deep cloning of turtle state.",
    hint: "Creates a clone with identical position, heading, color, and pen properties.",
    level: "moderate",
    codeExample: "t2 = t1.clone() # t2 inherits t1's current coordinates and state"
  },
  {
    question: "How do you scale the visual size of the turtle cursor icon?",
    shortAnswer: "Using 't.shapesize(stretch_wid, stretch_len, outline)' (or 't.turtlesize()') where numbers represent scaling multipliers (e.g. 'shapesize(2, 2)' doubles cursor size).",
    explanation: "Scaling cursor dimensions on canvas.",
    hint: "Use t.shapesize(stretch_wid, stretch_len).",
    level: "basic",
    codeExample: "t.shapesize(2.5, 2.5) # 2.5x larger cursor"
  },
  {
    question: "How do you check whether a turtle's pen is currently drawing or lifted?",
    shortAnswer: "Using 't.isdown()', which returns 'True' if the pen is down (drawing) and 'False' if lifted with 'penup()'.",
    explanation: "Inspecting pen drawing status.",
    hint: "Use t.isdown().",
    level: "basic",
    codeExample: "if t.isdown(): print('Drawing active')"
  },
  {
    question: "How do you check whether the turtle cursor is currently visible or hidden?",
    shortAnswer: "Using 't.isvisible()', which returns 'True' if the cursor is shown and 'False' if hidden with 'hideturtle()'.",
    explanation: "Inspecting cursor visibility state.",
    hint: "Use t.isvisible().",
    level: "basic",
    codeExample: "if not t.isvisible(): print('Cursor is hidden')"
  },
  {
    question: "How can multiple turtles draw synchronized patterns in parallel?",
    shortAnswer: "By storing turtle instances in a list and iterating through them inside a loop, advancing each turtle by one step or angle rotation per iteration.",
    explanation: "Simulating multi-agent parallel drawing on a single thread.",
    hint: "Store turtles in a list and iterate through them in a single drawing loop.",
    level: "moderate",
    codeExample: "turtles = [t1, t2, t3]\nfor _ in range(36):\n    for t in turtles:\n        t.forward(10); t.left(10)"
  },
  {
    question: "What is the difference between 't.color(\"red\", \"yellow\")' with two arguments vs one argument?",
    shortAnswer: "With two arguments, the first argument sets the pen line color ('pencolor') and the second sets the polygon interior fill color ('fillcolor').",
    explanation: "Separate pencolor and fillcolor configuration.",
    hint: "First arg = pencolor (outline); Second arg = fillcolor (interior).",
    level: "basic",
    codeExample: "t.color('teal', 'yellow') # Teal outline, yellow fill"
  },
  {
    question: "How do you register a custom polygon shape for turtle cursors using 'screen.register_shape()'?",
    shortAnswer: "By defining a tuple of coordinate vertices and calling 'screen.register_shape(\"custom_name\", shape_coords)' or registering a GIF image with 'screen.register_shape(\"icon.gif\")'.",
    explanation: "Custom shape registration in Python Turtle.",
    hint: "Use screen.register_shape('name', vertex_tuple) or GIF file path.",
    level: "pro",
    codeExample: "screen.register_shape('star', ((0,10), (3,3), (10,3), (5,-2)))"
  },
  {
    question: "What happens when a Turtle object goes out of scope and is garbage collected in Python?",
    shortAnswer: "The Python object is destroyed, but any visual lines and shapes already drawn by that turtle remain on the Tkinter canvas until cleared explicitly.",
    explanation: "Canvas vector persistence vs Python object lifecycle.",
    hint: "Drawn pixels remain on the canvas even after the Python object is deleted.",
    level: "moderate",
    codeExample: "del t1 # Python object deleted, canvas drawing remains intact"
  },
  {
    question: "How do you get a list of all active Turtle objects registered on a Screen?",
    shortAnswer: "Using 'screen.turtles()', which returns a list of all currently active Turtle instances associated with that screen.",
    explanation: "Screen-level turtle registry inspection.",
    hint: "Use screen.turtles().",
    level: "basic",
    codeExample: "all_turtles = screen.turtles()\nprint(f'{len(all_turtles)} active turtles')"
  },
  {
    question: "How do you reset a specific turtle's state without affecting other turtles on the screen?",
    shortAnswer: "By calling 't.reset()' on that specific instance; this erases only the lines drawn by that turtle and returns it to (0,0), leaving all other turtles and their drawings untouched.",
    explanation: "Instance-level reset vs global screen clear.",
    hint: "t.reset() only resets that specific turtle instance.",
    level: "moderate",
    codeExample: "t1.reset() # Only t1 is cleared and returned home"
  },
  {
    question: "What is 't.stamp()' and how does it relate to turtle object lifecycle?",
    shortAnswer: "'t.stamp()' leaves an indelible visual imprint of the turtle cursor's current shape and color at its current position on the canvas and returns a unique integer stamp ID.",
    explanation: "Stamping cursor imprints on the canvas.",
    hint: "Leaves an imprint of current turtle shape/color and returns a stamp ID.",
    level: "basic",
    codeExample: "stamp_id = t.stamp() # Imprints cursor"
  },
  {
    question: "How do you erase a specific stamped cursor imprint created with 't.stamp()'?",
    shortAnswer: "Using 't.clearstamp(stamp_id)' to erase a specific stamp, or 't.clearstamps(n)' to erase multiple stamps.",
    explanation: "Managing and removing stamped shapes.",
    hint: "Use t.clearstamp(stamp_id).",
    level: "moderate",
    codeExample: "t.clearstamp(stamp_id) # Removes specific stamped imprint"
  },
  {
    question: "How do you set the drawing speed of a turtle, and what values are valid?",
    shortAnswer: "Using 't.speed(val)' with integers 0 to 10 (or string keywords 'fastest': 0, 'fast': 10, 'normal': 6, 'slow': 3, 'slowest': 1).",
    explanation: "Turtle animation speed configuration.",
    hint: "0 (fastest/instant) to 10 (fast), with 1 being slowest.",
    level: "basic",
    codeExample: "t.speed('fastest') # or t.speed(0)"
  },
  {
    question: "What is the return type of 't.pencolor()' and 't.fillcolor()' when called without arguments?",
    shortAnswer: "They return the current pen color and fill color as strings (e.g. 'teal', '#090d16') or RGB tuples depending on the active colormode.",
    explanation: "Color query return values.",
    hint: "Returns current color name, hex code, or RGB tuple.",
    level: "basic",
    codeExample: "current_color = t.pencolor() # '#2dd4bf'"
  },
  {
    question: "Why should you hide the turtle cursor ('t.hideturtle()') when drawing complex mathematical curves?",
    shortAnswer: "Hiding the cursor improves rendering performance significantly (Tkinter does not need to constantly rotate and redraw the cursor icon) and produces cleaner, professional final graphics.",
    explanation: "Performance optimization and visual polish via cursor hiding.",
    hint: "Speeds up rendering and eliminates cursor clutter on complex curves.",
    level: "basic",
    codeExample: "t.hideturtle() # Boosts speed and hides cursor"
  },
  {
    question: "Can multiple turtles inherit shared drawing behavior using Python class inheritance?",
    shortAnswer: "Yes; you can create custom subclasses: 'class ParticleTurtle(turtle.Turtle): ...' and encapsulate custom physics, velocities, and specialized drawing methods directly into the object.",
    explanation: "Object-oriented subclassing of turtle.Turtle.",
    hint: "Yes, by subclassing turtle.Turtle to add custom physics and methods.",
    level: "pro",
    codeExample: "class StudentAgent(turtle.Turtle):\n    def draw_star(self): ... # Custom method"
  },
  {
    question: "What is the ultimate golden rule of Turtle Object Creation?",
    shortAnswer: "Always instantiate explicit OOP `turtle.Turtle()` instances (`t1`, `t2`), encapsulate unique state (colors, pens, shapes), leverage `t.clone()` for fractal branches, and use `screen.turtles()` to manage multi-agent graphics systems with modular elegance.",
    explanation: "The complete standard for object-oriented Turtle graphics programming.",
    hint: "Explicit OOP instances + encapsulated states + cloning + multi-agent coordination.",
    level: "basic",
    codeExample: "# Enterprise Multi-Agent Turtle Standard"
  }
];

export default questions;