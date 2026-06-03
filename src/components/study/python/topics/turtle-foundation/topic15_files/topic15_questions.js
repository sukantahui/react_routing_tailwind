const questions = [
  {
    question: "In what order does Python execute turtle commands?",
    shortAnswer: "Sequentially, from top to bottom of the script.",
    explanation: "Each line is executed before the next line begins.",
    hint: "Read your code like a recipe.",
    level: "basic",
    codeExample: "t.forward(50); t.left(90)  # first forward, then left"
  },
  {
    question: "What happens if you place `turtle.done()` at the beginning of your script?",
    shortAnswer: "The window opens and stays, but no drawing commands after it will execute.",
    explanation: "turtle.done() starts the event loop and blocks further command execution.",
    hint: "Always put done() at the end.",
    level: "moderate",
    codeExample: "turtle.done(); t.forward(100)  # forward never runs"
  },
  {
    question: "How can you make the turtle wait between commands?",
    shortAnswer: "Use `time.sleep(seconds)` from the time module.",
    explanation: "Pauses execution for the given number of seconds.",
    hint: "import time; time.sleep(0.5)",
    level: "moderate",
    codeExample: "import time; t.forward(50); time.sleep(1); t.forward(50)"
  },
  {
    question: "What is the output of this sequence? `t.forward(100); t.left(90); t.forward(100)`",
    shortAnswer: "An L‑shaped path: right then up (or right then down depending on heading).",
    explanation: "First line draws east, then turn north, then draws north.",
    hint: "Draw it on paper.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What would be the output of `t.left(90); t.forward(100); t.forward(100)`?",
    shortAnswer: "A straight vertical line (north) of length 200.",
    explanation: "First turn north, then two forward commands both go north.",
    hint: "Order changes everything.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Why might a beginner think commands run at the same time?",
    shortAnswer: "Because the turtle moves quickly, but they execute sequentially; modern computers just execute fast.",
    explanation: "Insert delays to see the order.",
    hint: "Use `time.sleep(1)` to slow down.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `turtle.ontimer()` do?",
    shortAnswer: "Schedules a function to be called after a delay (in milliseconds).",
    explanation: "Allows non‑blocking timed execution, unlike `time.sleep()`.",
    hint: "Useful for animations.",
    level: "expert",
    codeExample: "def move(): t.forward(10); turtle.ontimer(move, 100); turtle.ontimer(move, 100)  # move every 0.1 sec"
  },
  {
    question: "Can you change the order of execution without rearranging code lines?",
    shortAnswer: "Yes, using conditionals (if/else), loops, or function calls.",
    explanation: "Control structures can skip or repeat blocks.",
    hint: "if condition: # skip block",
    level: "moderate",
    codeExample: "if x > 0: t.forward(50) else: t.backward(50)"
  },
  {
    question: "What is a common sign that you misordered commands?",
    shortAnswer: "The drawing does not match your mental model (e.g., shape is rotated or misplaced).",
    explanation: "Check that turns happen before movements.",
    hint: "Print heading before each forward.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What does `turtle.update()` do in terms of flow?",
    shortAnswer: "Forces the screen to refresh immediately when tracer(0) is active.",
    explanation: "Normally, commands update screen instantly; tracer(0) batches them, update() flushes the batch.",
    hint: "Used for performance.",
    level: "expert",
    codeExample: "turtle.tracer(0); t.forward(100); turtle.update()  # now line appears"
  },
  {
    question: "Why should you avoid long `time.sleep()` in turtle programs?",
    shortAnswer: "It freezes the entire program, preventing user interaction or window updates.",
    explanation: "Use `turtle.ontimer()` for non‑blocking delays.",
    hint: "Sleep stops everything.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What happens if you call `t.forward(100)` and then `t.clear()`?",
    shortAnswer: "The line is drawn, then immediately erased.",
    explanation: "Commands happen in order; clear() removes whatever was drawn before it.",
    hint: "So you might not see the line if clear happens fast.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you trace the flow of execution?",
    shortAnswer: "Add `print('Step 1')` etc. between commands.",
    explanation: "Print statements appear in the console in the order commands run.",
    hint: "Also print turtle's position.",
    level: "basic",
    codeExample: "print('Moving forward'); t.forward(50); print('Now at', t.pos())"
  },
  {
    question: "What is the difference between `turtle.done()` and `turtle.exitonclick()`?",
    shortAnswer: "done() keeps window open indefinitely; exitonclick() waits for a click then closes.",
    explanation: "Both are usually the last command, but exitonclick provides a natural exit.",
    hint: "exitonclick is user‑friendly.",
    level: "moderate",
    codeExample: "turtle.exitonclick()"
  },
  {
    question: "If you have multiple turtles, do they move simultaneously?",
    shortAnswer: "No, commands are executed sequentially; one turtle moves completely before the next.",
    explanation: "To simulate simultaneous movement, interleave small steps.",
    hint: "Loop: move turtle1 a bit, then turtle2 a bit.",
    level: "expert",
    codeExample: "for _ in range(10): t1.forward(5); t2.backward(5)"
  },
  {
    question: "What is the role of `turtle.tracer(0)` in execution flow?",
    shortAnswer: "Disables automatic screen updates; you must call `update()` to see changes.",
    explanation: "Commands still execute sequentially, but screen refreshes only when you say.",
    hint: "Speeds up complex drawings.",
    level: "expert",
    codeExample: "turtle.tracer(0); for i in range(100): t.forward(i); turtle.update()"
  },
  {
    question: "How does a `for` loop change the flow?",
    shortAnswer: "It repeats a block of commands a specified number of times before moving to the next line after the loop.",
    explanation: "The loop body executes sequentially each iteration.",
    hint: "Indentation marks the block.",
    level: "basic",
    codeExample: "for _ in range(4): t.forward(50); t.right(90)  # repeats 4 times"
  },
  {
    question: "What is dead code in the context of flow?",
    shortAnswer: "Code that never executes because it appears after an unconditional `turtle.done()` or infinite loop.",
    explanation: "Placement matters; code after `done()` won't run.",
    hint: "Check your last calls.",
    level: "moderate",
    codeExample: "turtle.done(); t.forward(100)  # dead code"
  },
  {
    question: "Can you have an infinite loop intentionally?",
    shortAnswer: "Yes, `while True:` with `turtle.ontimer` or `update()` inside for animations.",
    explanation: "But standard infinite loop without break will freeze.",
    hint: "Use ontimer for animation loops.",
    level: "expert",
    codeExample: "while True: t.forward(1); t.right(1) # freezes"
  },
  {
    question: "What is the purpose of `turtle.bye()` in flow?",
    shortAnswer: "Terminates the turtle graphics window and ends the program.",
    explanation: "Useful for closing from within a script.",
    hint: "Like sys.exit() for turtle.",
    level: "moderate",
    codeExample: "turtle.bye()"
  },
  {
    question: "Why is it important to set `t.speed()` before drawing?",
    shortAnswer: "Because speed affects the animation rate but not the order; commands still execute sequentially.",
    explanation: "Speed only changes the delay between drawing steps.",
    hint: "Speed 0 is instantaneous.",
    level: "basic",
    codeExample: "t.speed(0)  # no animation delay"
  },
  {
    question: "What does `turtle.textinput()` do to the flow?",
    shortAnswer: "Pauses execution and waits for user input (blocking).",
    explanation: "The program stops until the user types something and clicks OK.",
    hint: "Useful for interactive programs.",
    level: "expert",
    codeExample: "name = turtle.textinput('Name', 'Enter your name:')"
  },
  {
    question: "How can you make a drawing that grows step by step with user interaction?",
    shortAnswer: "Use `turtle.onscreenclick()` to trigger functions, not sequential code.",
    explanation: "That's event‑driven, not sequential; a different flow.",
    hint: "Calls your function when click happens.",
    level: "expert",
    codeExample: "def draw(x,y): t.goto(x,y); turtle.onscreenclick(draw)"
  },
  {
    question: "What happens if you call `t.home()` after a series of moves?",
    shortAnswer: "The turtle returns to (0,0) and faces east, and if pen is down, draws a line back.",
    explanation: "The flow: previous moves execute, then home executes, drawing a line.",
    hint: "May create a line across your drawing.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Why is it a best practice to put `import turtle` at the top?",
    shortAnswer: "Because Python executes imports in order, and functions must be imported before use.",
    explanation: "Flow: imports happen first, then your code.",
    hint: "Always at top.",
    level: "basic",
    codeExample: "import turtle  # first line"
  },
  {
    question: "What does `turtle.clearscreen()` do to the flow?",
    shortAnswer: "Erases all drawings and resets the screen, but turtles may still exist.",
    explanation: "Subsequent commands will draw on a clean canvas.",
    hint: "Not the same as resetting turtles.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you change the order of execution using `if` statements?",
    shortAnswer: "Yes, conditionally skip or execute blocks.",
    explanation: "Flow can branch based on conditions.",
    hint: "Think of decision points.",
    level: "basic",
    codeExample: "if t.xcor() > 0: t.forward(50) else: t.backward(50)"
  },
  {
    question: "What is a stack trace and how does it relate to flow?",
    shortAnswer: "A report of function calls that led to an error; it shows execution order.",
    explanation: "Useful for debugging sequence issues.",
    hint: "Read from bottom to top.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How would you draw a square using a `while` loop instead of `for`?",
    shortAnswer: "i = 0; while i < 4: t.forward(100); t.right(90); i += 1",
    explanation: "The loop repeats the block as long as condition true.",
    hint: "Don't forget to increment i.",
    level: "moderate",
    codeExample: "i = 0; while i < 4: t.forward(100); t.right(90); i += 1"
  },
  {
    question: "What is a 'callback' in turtle flow?",
    shortAnswer: "A function passed to `ontimer()` or `onclick()` that is called later, interrupting the normal sequence.",
    explanation: "Event‑driven programming changes the linear flow.",
    hint: "Your function runs when the event occurs.",
    level: "expert",
    codeExample: ""
  }
];

export default questions;