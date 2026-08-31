// src/components/study/python/topics/005_001_turtle-foundation/topic16_files/topic16_questions.js

const questions = [
  {
    question: "What is the primary purpose of turtle.done() in a Python Turtle program?",
    shortAnswer: "To start the Tkinter GUI main event loop and keep the graphics window open.",
    explanation: "Without turtle.done(), Python finishes running procedural commands and terminates the script immediately, causing the graphics window to flash and close in milliseconds.",
    hint: "Think about why the window stays open after drawing finishes.",
    level: "basic",
    codeExample: "import turtle\nturtle.forward(100)\nturtle.done()  # Keeps window open"
  },
  {
    question: "What is the difference between turtle.done() and turtle.mainloop()?",
    shortAnswer: "They are completely identical aliases for Tkinter's mainloop().",
    explanation: "In Python's turtle library source code, `turtle.done()` is defined simply as an alias pointing directly to `turtle.mainloop()`.",
    hint: "Are they different or just different names for the same function?",
    level: "basic",
    codeExample: "turtle.done()      # Standard alias\nturtle.mainloop()  # Exact same function"
  },
  {
    question: "What does screen.exitonclick() do?",
    shortAnswer: "It keeps the window open until the user clicks anywhere on the canvas, then closes it.",
    explanation: "screen.exitonclick() binds a left-click event listener to screen.bye() and immediately starts the main event loop.",
    hint: "What action triggers the window to close?",
    level: "basic",
    codeExample: "screen = turtle.Screen()\nturtle.circle(50)\nscreen.exitonclick()  # Closes on click"
  },
  {
    question: "Where should turtle.done() be placed in a script?",
    shortAnswer: "At the very end of the script (last statement).",
    explanation: "turtle.done() is a blocking call that transfers execution to the GUI event loop. Any code written after turtle.done() will not run until the graphics window is closed.",
    hint: "Does it go at the beginning, middle, or end?",
    level: "basic",
    codeExample: "# At the end of file:\nif __name__ == '__main__':\n    draw_scene()\n    turtle.done()"
  },
  {
    question: "What happens if you run a Turtle script without turtle.done() in VS Code or Terminal?",
    shortAnswer: "The window opens, draws instantly, and closes immediately before you can view it.",
    explanation: "The Python interpreter reaches the end of the script and exits cleanly, which tears down the Tkinter process and canvas window.",
    hint: "Why does the canvas vanish instantly?",
    level: "basic",
    codeExample: "# Flashes and closes:\nimport turtle\nturtle.circle(100)\n# Missing turtle.done()!"
  },
  {
    question: "What is an event loop in GUI programming?",
    shortAnswer: "An infinite loop that listens for and dispatches user actions and OS events.",
    explanation: "The event loop continuously polls for keyboard strokes, mouse clicks, window resizing, and window redraw signals from the operating system.",
    hint: "How does a window know when you click a button?",
    level: "moderate",
    codeExample: "# Under the hood:\n# while window_open:\n#     process_os_events()"
  },
  {
    question: "Why does IDLE sometimes keep Turtle windows open without turtle.done()?",
    shortAnswer: "Because IDLE itself is a Tkinter application with an active event loop.",
    explanation: "IDLE runs on Tkinter and maintains a continuous event loop, preventing the window from closing. However, outside IDLE (in VS Code, PyCharm, or Terminal), turtle.done() is strictly required.",
    hint: "What GUI framework does the Python IDLE editor use?",
    level: "moderate",
    codeExample: "# Always write portable code by including turtle.done() regardless of IDE."
  },
  {
    question: "What is turtle.bye() and when is it used?",
    shortAnswer: "It programmatically destroys the graphics window and exits the canvas.",
    explanation: "turtle.bye() shuts down the Tkinter window. It is commonly bound to an 'Escape' or 'Q' key press for quitting games.",
    hint: "How do you close the window using code?",
    level: "moderate",
    codeExample: "screen = turtle.Screen()\nscreen.onkey(turtle.bye, 'q')\nscreen.listen()"
  },
  {
    question: "What exception is raised if the user closes the window while drawing commands are still executing?",
    shortAnswer: "turtle.Terminator exception.",
    explanation: "If the canvas is closed while procedural loops are still sending drawing commands, Turtle raises `turtle.Terminator` because the underlying Tkinter canvas no longer exists.",
    hint: "What is the name of the Turtle termination exception?",
    level: "advanced",
    codeExample: "try:\n    for i in range(1000):\n        t.forward(1)\nexcept turtle.Terminator:\n    print('Window closed safely.')"
  },
  {
    question: "Can you call turtle.done() multiple times in the same script?",
    shortAnswer: "No, calling it multiple times or restarting a canvas after closing causes errors in standard scripts.",
    explanation: "Once the Tkinter window is destroyed by closing, creating new turtles without properly resetting the Screen will fail.",
    hint: "Can a destroyed GUI process be restarted in the same script without re-initialization?",
    level: "advanced",
    codeExample: "turtle.done()\n# Do NOT call turtle.done() again below!"
  },
  {
    question: "What is the purpose of t.hideturtle() before calling turtle.done()?",
    shortAnswer: "To hide the arrow/turtle cursor so only the finished drawing is visible.",
    explanation: "Hiding the turtle cursor produces clean, professional presentation artwork without leaving an arrowhead sitting in the middle of the drawing.",
    hint: "How do you make the cursor invisible for the final artwork?",
    level: "basic",
    codeExample: "t.circle(100)\nt.hideturtle()  # Cleaner presentation\nturtle.done()"
  },
  {
    question: "How does screen.tracer(0) relate to the program lifecycle and update()?",
    shortAnswer: "tracer(0) pauses auto-rendering, requiring update() before done() to display the final frame.",
    explanation: "When tracer(0) is enabled for fast rendering, the screen only refreshes when `screen.update()` is called. Calling update() before done() ensures all drawn pixels appear.",
    hint: "What method must be called to refresh the canvas when tracer is turned off?",
    level: "advanced",
    codeExample: "screen.tracer(0)\n# Draw complex 10,000 line fractal\nscreen.update()  # Render now\nturtle.done()"
  },
  {
    question: "What are the 4 main stages of a structured Turtle application lifecycle?",
    shortAnswer: "1. Initialization, 2. Entity Creation, 3. Drawing/Interaction, 4. Event Loop Completion.",
    explanation: "Structuring code into these four discrete phases ensures modular, reusable, and bug-free graphics programs.",
    hint: "Think about Setup → Creation → Drawing → Completion.",
    level: "moderate",
    codeExample: "# 1. Screen → 2. Turtle → 3. Logic → 4. turtle.done()"
  },
  {
    question: "What does screen.setup(width, height) configure during initialization?",
    shortAnswer: "The pixel width and height dimensions of the graphics window.",
    explanation: "screen.setup() sets the initial canvas window size on the user's desktop monitor.",
    hint: "How do you define the canvas dimensions?",
    level: "basic",
    codeExample: "screen = turtle.Screen()\nscreen.setup(width=800, height=600)"
  },
  {
    question: "Why should drawing loops not be placed after turtle.done()?",
    shortAnswer: "Because turtle.done() blocks execution; code below it only runs after the window closes.",
    explanation: "turtle.done() yields control to the OS GUI loop. The Python interpreter will not proceed to the next line until the window is destroyed.",
    hint: "Is turtle.done() blocking or non-blocking?",
    level: "basic",
    codeExample: "turtle.done()\nprint('This prints ONLY after you close the window!')"
  },
  {
    question: "How do you handle keyboard-driven exit in a Turtle game?",
    shortAnswer: "Bind a key like 'Escape' to screen.bye() or a custom exit handler.",
    explanation: "Use `screen.onkey(screen.bye, 'Escape')` and ensure `screen.listen()` is active.",
    hint: "Which method registers a key event in Turtle?",
    level: "moderate",
    codeExample: "screen.listen()\nscreen.onkey(screen.bye, 'Escape')\nturtle.done()"
  },
  {
    question: "What is the return value of turtle.done()?",
    shortAnswer: "None.",
    explanation: "turtle.done() does not return a value; its sole function is to enter the main event loop.",
    hint: "Does turtle.done() compute anything or manage GUI state?",
    level: "basic",
    codeExample: "result = turtle.done()\nprint(result)  # None"
  },
  {
    question: "What happens if an unhandled Python exception occurs before turtle.done()?",
    shortAnswer: "Execution stops, and the window may either freeze or close immediately.",
    explanation: "If an error like NameError or ZeroDivisionError occurs during drawing, execution halts immediately and never reaches turtle.done().",
    hint: "Will turtle.done() execute if an exception aborts the script earlier?",
    level: "moderate",
    codeExample: "# Error aborts script before reaching done():\nx = 10 / 0  # ZeroDivisionError"
  },
  {
    question: "How can you create a self-closing Turtle window after a fixed delay?",
    shortAnswer: "Use screen.ontimer(screen.bye, milliseconds) before turtle.done().",
    explanation: "ontimer registers a callback to execute after a specified time interval (e.g. 5000 ms = 5 seconds) without blocking rendering.",
    hint: "What Turtle method schedules a timed callback?",
    level: "advanced",
    codeExample: "screen.ontimer(screen.bye, 3000)  # Closes in 3 seconds\nturtle.done()"
  },
  {
    question: "What is the difference between screen.reset() and screen.clear() in the lifecycle?",
    shortAnswer: "reset() restores turtle positions and settings; clear() clears drawings while keeping positions.",
    explanation: "reset() clears the canvas and re-centers all turtles to (0,0) with initial headings. clear() removes drawing lines without resetting turtle states.",
    hint: "Which one resets the turtle back to origin (0, 0)?",
    level: "moderate",
    codeExample: "screen.reset()  # Full reset\nscreen.clear()  # Erase lines only"
  },
  {
    question: "Why is a `try...except turtle.Terminator` block useful in interactive games?",
    shortAnswer: "It prevents ugly tracebacks in the terminal when players close the game window unexpectedly.",
    explanation: "When a game loop is running at 60 FPS, closing the window interrupts active turtle updates. Catching `turtle.Terminator` allows clean exit messages.",
    hint: "How do you achieve graceful degradation on user exit?",
    level: "expert",
    codeExample: "try:\n    while True:\n        game_step()\nexcept turtle.Terminator:\n    print('Goodbye!')"
  },
  {
    question: "Can turtle.done() be used with object-oriented Screen instances?",
    shortAnswer: "Yes, you can use `turtle.done()` or `screen.mainloop()` interchangeably.",
    explanation: "Both access the same shared root Tkinter instance.",
    hint: "Does the module-level done() work with Screen objects?",
    level: "basic",
    codeExample: "s = turtle.Screen()\n# Both work:\ns.mainloop()\n# or turtle.done()"
  },
  {
    question: "What is the recommended design pattern for encapsulating a complete Turtle program?",
    shortAnswer: "Define setup, drawing, and execution in a `main()` function with a `__name__ == '__main__'` guard.",
    explanation: "This modular architecture prevents accidental execution when importing functions into other test scripts or modules.",
    hint: "What standard Python guard is used for main execution?",
    level: "moderate",
    codeExample: "def main():\n    # drawing logic\n    turtle.done()\n\nif __name__ == '__main__':\n    main()"
  },
  {
    question: "How does turtle.done() interact with Python's garbage collector?",
    shortAnswer: "It keeps all active objects in memory because the Tkinter root holds references to canvas items.",
    explanation: "All lines, stamps, and turtle objects remain alive and displayed in memory until the event loop terminates and Tkinter destroys its window.",
    hint: "Do drawn shapes remain in RAM while the window is active?",
    level: "advanced",
    codeExample: "# Memory holds all drawn elements during event loop."
  },
  {
    question: "Why should you avoid using time.sleep() inside the event loop for animation?",
    shortAnswer: "time.sleep() freezes the main thread and blocks OS event processing, making the window unresponsive.",
    explanation: "Use `screen.ontimer()` instead of `time.sleep()` so the event loop can continue processing user inputs and window redraws.",
    hint: "What happens to a GUI when the main thread is put to sleep?",
    level: "expert",
    codeExample: "# BAD: time.sleep(0.1) in loop\n# GOOD: screen.ontimer(update_frame, 16)"
  },
  {
    question: "What is the role of `turtle.title(text)` during initialization?",
    shortAnswer: "It sets the text title displayed in the operating system's window title bar.",
    explanation: "Customizing the window title gives applications and games a professional appearance.",
    hint: "Where does the title appear on the screen?",
    level: "basic",
    codeExample: "turtle.title('Mamata\\'s Geometric Garden - Jadavpur')"
  },
  {
    question: "How do you ensure proper cleanup when running multiple independent Turtle tests?",
    shortAnswer: "Call `turtle.bye()` and `turtle.TurtleScreen._RUNNING = True` or create fresh isolated processes.",
    explanation: "Tkinter stores global singleton states that require explicit cleanup when running automated testing suites.",
    hint: "Why do automated tests need isolated Tkinter processes?",
    level: "expert",
    codeExample: "# Clean teardown in test fixtures"
  },
  {
    question: "What is the difference between `turtle.done()` and `sys.exit()`?",
    shortAnswer: "`turtle.done()` keeps the GUI alive; `sys.exit()` terminates the entire Python process immediately.",
    explanation: "`turtle.done()` blocks execution while letting Tkinter handle interactions. `sys.exit()` immediately aborts Python and destroys all windows.",
    hint: "Which one exits the program immediately?",
    level: "moderate",
    codeExample: "turtle.done()  # Window stays open\nsys.exit()     # Immediate termination"
  },
  {
    question: "Can you run non-GUI Python code concurrently with `turtle.done()`?",
    shortAnswer: "Only if background threads or `screen.ontimer()` callbacks are configured beforehand.",
    explanation: "Because `turtle.done()` blocks the main thread, any subsequent procedural code in the main thread cannot execute until the window closes.",
    hint: "How does the main thread behave once it enters the event loop?",
    level: "expert",
    codeExample: "# Schedule recurring tasks with ontimer before done():\nscreen.ontimer(background_worker, 1000)\nturtle.done()"
  },
  {
    question: "What is the ultimate golden rule of Turtle program lifecycle?",
    shortAnswer: "Always end your Turtle script with `turtle.done()` or `screen.exitonclick()` as the final statement.",
    explanation: "This single line ensures cross-platform reliability on Windows, macOS, and Linux across all IDEs and execution environments.",
    hint: "What must be the very last command in every Turtle script?",
    level: "basic",
    codeExample: "# The Golden Rule:\n# 1. Draw your art\n# 2. turtle.done()"
  }
];

export default questions;
