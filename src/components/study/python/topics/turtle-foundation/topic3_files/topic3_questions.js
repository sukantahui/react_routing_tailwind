const questions = [
  {
    question: "How do you create a new turtle object in Python?",
    shortAnswer: "`t = turtle.Turtle()`",
    explanation: "The `Turtle()` constructor creates a new turtle instance with default settings (position at origin, heading east, pen down, shape 'classic').",
    hint: "You need to import turtle first.",
    level: "basic",
    codeExample: "import turtle; t = turtle.Turtle()"
  },
  {
    question: "What is the difference between `t2 = t` and `t2 = t.clone()`?",
    shortAnswer: "`t2 = t` makes both variables refer to the same object; `clone()` creates an independent copy.",
    explanation: "Changes to `t` will affect `t2` if they reference the same object. Cloning gives a separate turtle with the same state (position, heading, color).",
    hint: "Try changing t's color after assignment and see if t2 changes.",
    level: "moderate",
    codeExample: "t2 = t.clone()  # independent copy"
  },
  {
    question: "Can you have multiple turtles on the screen at the same time?",
    shortAnswer: "Yes, create as many as you want using `Turtle()` multiple times.",
    explanation: "Each turtle moves independently. They share the same screen.",
    hint: "Create `t1 = turtle.Turtle()` and `t2 = turtle.Turtle()`.",
    level: "basic",
    codeExample: "t1 = turtle.Turtle(); t2 = turtle.Turtle()"
  },
  {
    question: "What function returns a list of all existing turtles?",
    shortAnswer: "`turtle.turtles()`",
    explanation: "Returns a list of all `Turtle` objects currently on the screen.",
    hint: "Useful for debugging multiple turtles.",
    level: "moderate",
    codeExample: "print(turtle.turtles())"
  },
  {
    question: "How can you check if a turtle is visible?",
    shortAnswer: "Use `t.isvisible()` which returns a boolean.",
    explanation: "Returns `True` if the turtle is shown, `False` if hidden via `hideturtle()`.",
    hint: "Check before trying to show again.",
    level: "basic",
    codeExample: "if not t.isvisible(): t.showturtle()"
  },
  {
    question: "What happens to a turtle when the program ends?",
    shortAnswer: "The turtle object is destroyed and the window closes (unless `done()` or `exitonclick()` is used).",
    explanation: "The Python interpreter cleans up objects when they go out of scope or program terminates.",
    hint: "`turtle.done()` keeps the window open.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How do you explicitly delete a turtle object?",
    shortAnswer: "Use `del t` after closing the screen, or let it go out of scope.",
    explanation: "`del` reduces reference count; the object is garbage collected if no references remain.",
    hint: "You usually don't need to manually delete turtles.",
    level: "expert",
    codeExample: "del t"
  },
  {
    question: "What is the default shape of a newly created turtle?",
    shortAnswer: "`'classic'` (an arrow-like triangle).",
    explanation: "Other shapes: `'turtle'`, `'circle'`, `'square'`, `'triangle'`, `'arrow'`.",
    hint: "Change with `t.shape('turtle')`.",
    level: "basic",
    codeExample: "t.shape('turtle')"
  },
  {
    question: "Can two turtles have different pen colors?",
    shortAnswer: "Yes, each turtle maintains its own color and pen state independently.",
    explanation: "Set `t1.color('red')` and `t2.color('blue')` and each draws with its own color.",
    hint: "Colors are object attributes.",
    level: "basic",
    codeExample: "t1.color('red'); t2.color('green')"
  },
  {
    question: "What is the purpose of `turtle.Screen()`?",
    shortAnswer: "Creates or returns the singleton screen object that manages the window.",
    explanation: "You can store it as a variable: `screen = turtle.Screen()` to call screen methods like `bgcolor()`.",
    hint: "You don't have to store it, but it's good practice.",
    level: "moderate",
    codeExample: "screen = turtle.Screen(); screen.title('My App')"
  },
  {
    question: "What is the difference between `t.reset()` and creating a new turtle?",
    shortAnswer: "`reset()` clears drawings and resets state of existing turtle; new turtle is a separate object.",
    explanation: "`reset()` does not delete the turtle; it clears its trails and moves it to home. New turtle adds another object.",
    hint: "Reset reuses the same turtle.",
    level: "moderate",
    codeExample: "t.reset()  # clears and homes"
  },
  {
    question: "How can you make a turtle disappear without deleting it?",
    shortAnswer: "Use `t.hideturtle()`.",
    explanation: "The turtle continues to move and draw (if pen down) but the cursor icon is invisible.",
    hint: "Use `showturtle()` to bring it back.",
    level: "basic",
    codeExample: "t.hideturtle()"
  },
  {
    question: "What happens if you create a turtle after closing the window?",
    shortAnswer: "A new window will be created automatically (if possible).",
    explanation: "Calling `Turtle()` when no screen exists creates a default screen.",
    hint: "But it's better to create screen explicitly first.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Can a turtle be copied without using `clone()`?",
    shortAnswer: "You can create a new turtle and manually set its position/heading/color to match.",
    explanation: "`clone()` is the simplest method for an exact copy.",
    hint: "Avoid manual copying unless you need partial state.",
    level: "moderate",
    codeExample: "t2 = turtle.Turtle(); t2.setpos(t.pos()); t2.setheading(t.heading())"
  },
  {
    question: "What does `turtle.turtles()` return if no turtles have been created?",
    shortAnswer: "An empty list `[]`.",
    explanation: "Even the 'default' turtle? In Python, if you never created a Turtle explicitly, there might be a hidden one? Actually no, you must create a turtle. The `turtles()` function returns only explicitly created turtles.",
    hint: "Test it.",
    level: "expert",
    codeExample: "print(turtle.turtles())  # []"
  },
  {
    question: "Why might you want to create multiple turtles?",
    shortAnswer: "To draw multiple independent shapes, simulate race games, or create complex animations.",
    explanation: "Examples: two turtles racing, one drawing background, another drawing foreground.",
    hint: "Think of collaborative art.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How do you access the screen object after creating turtles?",
    shortAnswer: "If you stored it, use that variable; otherwise `turtle.Screen()` returns the same screen.",
    explanation: "`turtle.Screen()` is a singleton: always returns the same screen object.",
    hint: "Always store it for clarity.",
    level: "basic",
    codeExample: "screen = turtle.Screen()"
  },
  {
    question: "What is the default speed of a new turtle?",
    shortAnswer: "Speed 3 (normal).",
    explanation: "Speeds range from 0 (fastest) to 10 (fast) and 1 (slowest). Speed 0 disables animation.",
    hint: "Change with `t.speed(0)`.",
    level: "basic",
    codeExample: "t.speed(6)"
  },
  {
    question: "What method cleans up all turtles and closes the window?",
    shortAnswer: "`turtle.bye()`",
    explanation: "`bye()` closes the turtle graphics window and ends the session. Equivalent to calling `sys.exit()` in some contexts.",
    hint: "Use with caution – it exits the program.",
    level: "moderate",
    codeExample: "turtle.bye()"
  },
  {
    question: "How can you change the default turtle shape for all future turtles?",
    shortAnswer: "Set the default shape using `turtle.shape('turtle')` before creating new turtles? Actually, `turtle.shape()` affects the default shape for subsequently created turtles? No, it changes the shape of the default turtle. To set a default for all, you'd need to subclass Turtle or use a factory function.",
    explanation: "Simplest: create a function that returns a configured turtle.",
    hint: "`def make_turtle(): t = turtle.Turtle(); t.shape('turtle'); return t`",
    level: "expert",
    codeExample: "def make_turtle(): t = turtle.Turtle(); t.shape('turtle'); return t"
  },
  {
    question: "What is the `turtle.Turtle` constructor's optional parameter?",
    shortAnswer: "`shape` – e.g., `Turtle(shape='turtle')`.",
    explanation: "You can pass a shape name directly to the constructor.",
    hint: "Saves an extra line.",
    level: "moderate",
    codeExample: "t = turtle.Turtle(shape='turtle')"
  },
  {
    question: "Can turtles have different pen sizes?",
    shortAnswer: "Yes, using `t.pensize(size)` per turtle.",
    explanation: "Each turtle maintains its own pensize.",
    hint: "Thick lines for one, thin for another.",
    level: "basic",
    codeExample: "t1.pensize(5); t2.pensize(1)"
  },
  {
    question: "What happens if you try to access a turtle's method after it's been deleted?",
    shortAnswer: "A `NameError` if variable is gone, or `ReferenceError` if object is garbage collected.",
    explanation: "Once deleted, the variable no longer refers to a valid turtle.",
    hint: "Avoid deleting turtles while still using them.",
    level: "expert",
    codeExample: "del t; t.forward(10)  # NameError"
  },
  {
    question: "How can you make two turtles draw at the same time?",
    shortAnswer: "Interleave their commands or use `ontimer()` for pseudo-concurrency.",
    explanation: "Turtle is single-threaded; you can alternate commands quickly to simulate simultaneous movement.",
    hint: "Write a loop that moves each turtle a little bit.",
    level: "moderate",
    codeExample: "for _ in range(100): t1.forward(1); t2.backward(1)"
  },
  {
    question: "What is the difference between `turtle.Turtle()` and `turtle.Pen()`?",
    shortAnswer: "`Pen()` is an alias for `Turtle()`; they are identical.",
    explanation: "Historical reason: some versions differentiate, but in standard turtle, `Pen` is the same as `Turtle`.",
    hint: "Use `Turtle()` for clarity.",
    level: "moderate",
    codeExample: "p = turtle.Pen()  # same as Turtle()"
  },
  {
    question: "What does the `turtle.numturtles()` function do?",
    shortAnswer: "Returns the number of turtles currently on the screen.",
    explanation: "It is an alias for `len(turtle.turtles())`.",
    hint: "Useful for debugging.",
    level: "moderate",
    codeExample: "print(turtle.numturtles())"
  },
  {
    question: "Can you change the shape of a turtle after creation?",
    shortAnswer: "Yes, using `t.shape('new_shape')`.",
    explanation: "Available shapes: 'arrow', 'circle', 'classic', 'square', 'triangle', 'turtle'.",
    hint: "Some systems support custom shapes.",
    level: "basic",
    codeExample: "t.shape('circle')"
  },
  {
    question: "How does the turtle object manage its internal state?",
    shortAnswer: "Each turtle has attributes: position (x,y), heading, pen state (up/down), color, pensize, visibility, etc.",
    explanation: "Methods modify these attributes. The state is independent for each turtle.",
    hint: "Think of it as a little robot with its own memory.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is the `__init__` method of the Turtle class?",
    shortAnswer: "The constructor that initializes a new turtle object with default values.",
    explanation: "You don't call it directly; `Turtle()` invokes it.",
    hint: "Part of object-oriented programming.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How would you create a turtle that starts at (100, 100) facing south?",
    shortAnswer: "`t = turtle.Turtle(); t.penup(); t.goto(100,100); t.setheading(270); t.pendown()`",
    explanation: "Use `setheading(270)` for south (or 270 degrees).",
    hint: "Remember: penup to move without drawing.",
    level: "moderate",
    codeExample: "t = turtle.Turtle(); t.penup(); t.goto(100,100); t.setheading(270); t.pendown()"
  }
];

export default questions;