// src/components/study/python/topics/005_006_turtle-interaction/topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is Event-Driven Programming?",
    shortAnswer: "A programming paradigm where program flow is determined by user actions (mouse clicks, keypresses) or timer events rather than a sequential script.",
    explanation: "Event-driven systems register listener callbacks and wait for event triggers.",
    hint: "What programming model responds to user actions asynchronously?",
    level: "basic",
    codeExample: "screen.onclick(handle_click)\nscreen.mainloop()"
  },
  {
    question: "What is a Callback Function in Python?",
    shortAnswer: "A function passed as an argument to another function, intended to be executed when a specific event occurs.",
    explanation: "Callbacks allow frameworks like Turtle and Tkinter to call your custom logic upon user interaction.",
    hint: "What is a function passed as an argument to be called later called?",
    level: "basic",
    codeExample: "def on_click(x, y): print(x, y)\nscreen.onclick(on_click)"
  },
  {
    question: "Why must callback function names be passed WITHOUT parentheses `()` in event bindings?",
    shortAnswer: "Passing `func()` executes the function immediately once and binds its return value (`None`); passing `func` binds the function reference.",
    explanation: "This is the #1 beginner bug in Python event programming.",
    hint: "What happens if you include parentheses when binding an event handler?",
    level: "basic",
    codeExample: "# CORRECT: screen.onclick(my_func)\n# BUG: screen.onclick(my_func())"
  },
  {
    question: "What role does the Event Queue play in graphical applications?",
    shortAnswer: "A FIFO buffer that collects OS hardware input events (clicks, keystrokes) until the event loop dispatches them to registered callbacks.",
    explanation: "Prevents missed inputs when the CPU is briefly busy with rendering.",
    hint: "What data structure stores incoming hardware input events?",
    level: "moderate",
    codeExample: "# OS Event Queue: [Click(100,50), Key('a'), Move(102,52)]"
  },
  {
    question: "What does `screen.mainloop()` do?",
    shortAnswer: "Enters Tkinter's persistent event listening loop, keeping the window open and actively processing user interactions.",
    explanation: "`mainloop()` blocks linear script exit, waiting continuously for user inputs.",
    hint: "What function starts the main GUI event dispatcher loop?",
    level: "basic",
    codeExample: "screen.mainloop()"
  },
  {
    question: "How do you pass extra arguments to a callback function when binding an event in Python?",
    shortAnswer: "Use a `lambda` expression or `functools.partial`: `screen.onkeypress(lambda: draw(color), 'c')`.",
    explanation: "Anonymous functions wrap parameterized calls into zero-argument callable references.",
    hint: "What Python keyword creates inline wrapper functions for parameterized callbacks?",
    level: "moderate",
    codeExample: "screen.onkeypress(lambda: set_color('red'), 'r')"
  },
  {
    question: "What are First-Class Functions in Python?",
    shortAnswer: "Functions that can be assigned to variables, passed as arguments to other functions, and returned from functions like any other data type.",
    explanation: "First-class functions make event-driven callback architectures possible in Python.",
    hint: "What property allows Python functions to be treated like regular objects and variables?",
    level: "moderate",
    codeExample: "handler = my_func\nscreen.onclick(handler)"
  },
  {
    question: "What is the difference between Polling and Event-Driven architecture?",
    shortAnswer: "Polling constantly checks state in a tight loop (`is_key_down?`); event-driven waits idly until the OS notifies the handler.",
    explanation: "Event-driven design consumes 0% CPU when idle compared to busy-waiting polling loops.",
    hint: "Which architecture waits idly for notifications instead of continuous checking?",
    level: "moderate",
    codeExample: "# Polling: while True: check_input() | Event: onkeypress(handler)"
  },
  {
    question: "What happens if a long-running computation is placed inside a callback function?",
    shortAnswer: "It blocks the event loop, freezing the GUI window and making it say 'Not Responding'.",
    explanation: "Callbacks must complete quickly (in milliseconds) to keep the user interface fluid.",
    hint: "Why should callbacks never execute 10-second heavy loops?",
    level: "moderate",
    codeExample: "# Keep callbacks lightweight to prevent UI freezing"
  },
  {
    question: "How do you bind a mouse click handler that receives click coordinates `(x, y)`?",
    shortAnswer: "Define a 2-parameter function `def on_click(x, y):` and pass it to `screen.onclick(on_click)`.",
    explanation: "Turtle automatically passes the clicked canvas coordinates `x` and `y` into the callback.",
    hint: "How many arguments does screen.onclick pass to its callback?",
    level: "basic",
    codeExample: "def handle_click(x, y):\n    t.goto(x, y)\nscreen.onclick(handle_click)"
  },
  {
    question: "What is an Anonymous Function (`lambda`) in Python?",
    shortAnswer: "A small, single-line function defined without a name using the `lambda` keyword.",
    explanation: "Lambdas are frequently used for concise event callback adapters.",
    hint: "What keyword defines single-expression anonymous functions?",
    level: "basic",
    codeExample: "lambda: draw_circle(50)"
  },
  {
    question: "Why is `screen.listen()` mandatory before keyboard callbacks will work?",
    shortAnswer: "It gives window focus to the Turtle canvas so operating system keystrokes are routed to the Python process.",
    explanation: "Without focus, keyboard events are ignored or sent to other background apps.",
    hint: "What method requests keyboard window focus in Turtle?",
    level: "basic",
    codeExample: "screen.listen()"
  },
  {
    question: "What is Inversion of Control (IoC) in event-driven frameworks?",
    shortAnswer: "The framework (Tkinter/Turtle) calls your code, rather than your code calling the framework sequentially.",
    explanation: "Also known as the 'Hollywood Principle' ('Don't call us, we'll call you').",
    hint: "What architectural principle states the framework calls user code upon events?",
    level: "advanced",
    codeExample: "# Inversion of Control: Framework dispatches callbacks"
  },
  {
    question: "How do you unbind or disable an event listener in Python Turtle?",
    shortAnswer: "Pass `None` as the callback function: `screen.onclick(None)` or `screen.onkeypress(None, 'space')`.",
    explanation: "Passing `None` detaches the event handler from the event dispatcher.",
    hint: "What value unbinds an active event listener in Turtle?",
    level: "moderate",
    codeExample: "screen.onkeypress(None, 'space')  # Unbinds spacebar"
  },
  {
    question: "What is a State Machine in event-driven applications?",
    shortAnswer: "A computational model with discrete states where events trigger transitions from one state to another (e.g. Red -> Green -> Yellow).",
    explanation: "State machines organize complex event interactions cleanly.",
    hint: "What model represents discrete states and event transitions?",
    level: "advanced",
    codeExample: "# State Machine: 'menu' -> 'playing' -> 'game_over'"
  },
  {
    question: "How does `functools.partial` compare to `lambda` for event binding?",
    shortAnswer: "`partial` binds argument values at definition time, avoiding late-binding closure bugs often encountered in `lambda` loops.",
    explanation: "`partial(func, arg)` is cleaner and more robust for parameter binding.",
    hint: "What standard library module creates partially applied function references?",
    level: "advanced",
    codeExample: "from functools import partial\nscreen.onkeypress(partial(draw, 'blue'), 'b')"
  },
  {
    question: "How do you handle keyboard shortcuts with modifier keys (e.g. Shift + Key)?",
    shortAnswer: "Bind both lowercase and uppercase characters: `screen.onkeypress(func, 'a')` and `screen.onkeypress(func, 'A')`.",
    explanation: "Tkinter distinguishes uppercase characters when Shift or Caps Lock is engaged.",
    hint: "How do you bind both uppercase and lowercase keys in Turtle?",
    level: "moderate",
    codeExample: "screen.onkeypress(undo, 'u'); screen.onkeypress(undo, 'U')"
  },
  {
    question: "What is the Publish-Subscribe (Pub/Sub) pattern in event architecture?",
    shortAnswer: "Publishers emit named events, and multiple subscriber functions execute in response without direct coupling.",
    explanation: "Decouples event emitters from event consumers across large codebases.",
    hint: "What design pattern decouples event producers from consumers?",
    level: "expert",
    codeExample: "# EventBus.publish('player_died') -> [play_sound, update_ui, show_gameover]"
  },
  {
    question: "Why should mutable global variables be encapsulated in a state dictionary for callbacks?",
    shortAnswer: "Dictionaries can be modified inside callbacks without needing the `global` keyword: `state['score'] += 10`.",
    explanation: "Dictionary state encapsulation prevents messy global variable declarations.",
    hint: "How does dictionary state avoid using the global keyword inside callbacks?",
    level: "moderate",
    codeExample: "state = {'score': 0}\ndef on_hit(): state['score'] += 10"
  },
  {
    question: "What happens if two different functions are bound to the exact same key?",
    shortAnswer: "The second binding overwrites the first; only the most recently registered callback will fire.",
    explanation: "Event registration keys map to a single active callback in standard Turtle.",
    hint: "Does registering a key a second time add to or replace the previous handler?",
    level: "moderate",
    codeExample: "# The latest binding overrides earlier bindings"
  },
  {
    question: "How do you create an interactive paint program using event callbacks?",
    shortAnswer: "Bind `screen.ondrag(t.goto)` for drawing, `screen.onclick(t.penup)` for picking up pen, and keys for color swaps.",
    explanation: "Combining mouse drag and keypress events creates a fully functional digital drawing canvas.",
    hint: "What 3 events assemble a basic interactive paint app?",
    level: "basic",
    codeExample: "t.ondrag(t.goto)"
  },
  {
    question: "What is Debouncing in event handling?",
    shortAnswer: "Limiting the rate at which a callback can fire, ignoring rapid repeated triggers until a time threshold passes.",
    explanation: "Debouncing prevents double-click glitches and keypress spamming.",
    hint: "What technique ignores rapid repeated event triggers?",
    level: "advanced",
    codeExample: "# Debounce: if time.time() - last_click > 0.3: fire()"
  },
  {
    question: "Why is `turtle.done()` interchangeable with `screen.mainloop()`?",
    shortAnswer: "In Python Turtle's source code, `turtle.done()` is simply an alias that calls `Tkinter.mainloop()`.",
    explanation: "Both enter the underlying Tkinter main event dispatcher.",
    hint: "Is turtle.done() an alias for mainloop()?",
    level: "basic",
    codeExample: "turtle.done()  # Alias for screen.mainloop()"
  },
  {
    question: "How do you bind arrow keys (`Up`, `Down`, `Left`, `Right`) in Python Turtle?",
    shortAnswer: "Use capitalized key names: `'Up'`, `'Down'`, `'Left'`, `'Right'`.",
    explanation: "Tkinter key naming conventions require capitalized arrow key identifiers.",
    hint: "How are arrow key strings formatted in onkeypress?",
    level: "basic",
    codeExample: "screen.onkeypress(move_up, 'Up')"
  },
  {
    question: "What is Event Bubbling in GUI widget hierarchies?",
    shortAnswer: "When an event on a child element (e.g. button) propagates upward to parent containers (e.g. canvas/window) if unhandled.",
    explanation: "Widget event propagation allows centralized event handling.",
    hint: "What term describes events traveling upward through widget hierarchies?",
    level: "advanced",
    codeExample: "# Event bubbling from child widget to parent canvas"
  },
  {
    question: "How do you bind the Spacebar and Escape keys in Turtle?",
    shortAnswer: "Use `'space'` (lowercase) and `'Escape'` (capitalized E).",
    explanation: "Standard Tkinter keysym strings define special keyboard keys.",
    hint: "What are the exact key names for Space and Escape in Turtle?",
    level: "basic",
    codeExample: "screen.onkeypress(fire, 'space'); screen.onkeypress(quit, 'Escape')"
  },
  {
    question: "Why is event-driven programming the foundation of all modern web and mobile apps?",
    shortAnswer: "Because modern graphical UIs are inherently reactive—waiting for user taps, clicks, swipes, and network responses.",
    explanation: "React, Flutter, iOS, Android, and JavaScript all use the event-driven callback model.",
    hint: "Why is event-driven architecture universal across frontend software?",
    level: "basic",
    codeExample: "# Universal reactive UI architecture"
  },
  {
    question: "How do you trace and debug which event callbacks are firing in real time?",
    shortAnswer: "Add logging statements `print(f'[EVENT] {event_name} at {time.time()}')` inside callback entry points.",
    explanation: "Event logging reveals event sequence and dispatch timings during development.",
    hint: "How do you inspect callback execution order?",
    level: "basic",
    codeExample: "def on_key(): print('[EVENT] Key pressed')"
  },
  {
    question: "What is the 3-step Golden Rule for Event-Driven Programming in Python Turtle?",
    shortAnswer: "1. Define callback functions | 2. Register bindings with `onclick()` / `onkeypress()` and `screen.listen()` | 3. Start `screen.mainloop()`.",
    explanation: "This 3-step blueprint forms the backbone of all interactive graphical software.",
    hint: "What 3 steps build interactive event-driven Turtle programs?",
    level: "basic",
    codeExample: "# 1. Define callbacks -> 2. Bind & listen() -> 3. mainloop()"
  },
  {
    question: "How does mastering event callbacks accelerate a student's career into full-stack development?",
    shortAnswer: "Because concepts of asynchronous callbacks, event listeners, state machines, and debouncing directly map to React, Node.js, and cloud event architectures.",
    explanation: "Event-driven programming is one of the most transferable skills in computer science.",
    hint: "How do Turtle event concepts connect to React and Node.js?",
    level: "basic",
    codeExample: "# Direct mapping to React onClick and Node.js EventEmitter"
  }
];

export default questions;
