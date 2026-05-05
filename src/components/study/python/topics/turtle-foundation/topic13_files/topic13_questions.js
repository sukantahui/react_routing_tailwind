const questions = [
  {
    question: "What does `t.penup()` do?",
    shortAnswer: "Lifts the pen so that moving the turtle does NOT draw.",
    explanation: "Movements after penup leave no trail until pendown is called.",
    hint: "Think of lifting a pen off paper.",
    level: "basic",
    codeExample: "t.penup()"
  },
  {
    question: "What does `t.pendown()` do?",
    shortAnswer: "Lowers the pen so that moving the turtle draws lines.",
    explanation: "This is the default state when a turtle is created.",
    hint: "Press the pen to paper.",
    level: "basic",
    codeExample: "t.pendown()"
  },
  {
    question: "What is the shorthand for `penup()` and `pendown()`?",
    shortAnswer: "`pu()` / `up()` for penup; `pd()` / `down()` for pendown.",
    explanation: "Short aliases exist for faster typing.",
    hint: "`t.pu()` works too.",
    level: "basic",
    codeExample: "t.pu(); t.pd()"
  },
  {
    question: "How can you check if the pen is currently down?",
    shortAnswer: "Use `t.isdown()` which returns a boolean.",
    explanation: "Useful for conditional drawing or debugging.",
    hint: "Returns True if pen is down, False if up.",
    level: "moderate",
    codeExample: "if t.isdown(): print('Drawing')"
  },
  {
    question: "What is the default pen state when a turtle is created?",
    shortAnswer: "pendown() – the pen is down.",
    explanation: "By default, the turtle draws when it moves.",
    hint: "If you don't change it, forward() will draw.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How do you move the turtle to a new location without drawing?",
    shortAnswer: "`t.penup(); t.goto(x, y); t.pendown()`.",
    explanation: "Lift pen, move, then lower to continue drawing.",
    hint: "The classic 'teleport' pattern.",
    level: "basic",
    codeExample: "t.penup(); t.goto(100,100); t.pendown()"
  },
  {
    question: "What happens if you call `pendown()` twice in a row?",
    shortAnswer: "Nothing – the pen remains down.",
    explanation: "It's idempotent; no error, no change.",
    hint: "Safe to call multiple times.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What happens if you call `penup()` twice in a row?",
    shortAnswer: "Pen remains up; no drawing occurs.",
    explanation: "Also idempotent.",
    hint: "No harm.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How would you draw a dashed line?",
    shortAnswer: "Alternate pendown() and penup() while moving forward.",
    explanation: "Example: pendown, forward(10), penup, forward(5), repeat.",
    hint: "Dash = pen down, gap = pen up.",
    level: "moderate",
    codeExample: "for _ in range(10): t.pendown(); t.forward(10); t.penup(); t.forward(5)"
  },
  {
    question: "Why might a beginner think that `penup()` also stops the turtle from moving?",
    shortAnswer: "Because they confuse drawing with movement; penup only affects drawing.",
    explanation: "The turtle still moves; it just doesn't leave a trail.",
    hint: "Movement and drawing are separate.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is the effect of `t.penup()` on the turtle's heading?",
    shortAnswer: "No effect; heading remains unchanged.",
    explanation: "Pen state doesn't affect orientation.",
    hint: "Only left/right/setheading change heading.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How can you ensure the pen is down before drawing a critical shape?",
    shortAnswer: "Call `t.pendown()` just before the drawing loop.",
    explanation: "You can also check with `if not t.isdown(): t.pendown()`.",
    hint: "Defensive programming.",
    level: "moderate",
    codeExample: "if not t.isdown(): t.pendown()"
  },
  {
    question: "What is the difference between `penup()` and `hideturtle()`?",
    shortAnswer: "penup() stops drawing; hideturtle() hides the cursor icon.",
    explanation: "A hidden turtle can still draw if pen is down.",
    hint: "One affects the trail, the other affects visibility.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you draw without moving the turtle?",
    shortAnswer: "Yes, using `dot()` or `stamp()`.",
    explanation: "Those methods create marks without moving.",
    hint: "No need to change pen state.",
    level: "basic",
    codeExample: "t.dot(10, 'red')"
  },
  {
    question: "What does `t.isdown()` return after `t.penup()`?",
    shortAnswer: "False.",
    explanation: "Because the pen is lifted, it's not down.",
    hint: "Check state after each operation.",
    level: "basic",
    codeExample: "t.penup(); print(t.isdown())  # False"
  },
  {
    question: "Why is it important to call `pendown()` after `penup()` before drawing?",
    shortAnswer: "Otherwise subsequent movements won't draw (invisible lines).",
    explanation: "This is a common mistake: forget to lower the pen.",
    hint: "Always pair penup with pendown if you want to draw again.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can you toggle the pen state with a single command?",
    shortAnswer: "No built‑in toggle, but you can write: `if t.isdown(): t.penup() else: t.pendown()`.",
    explanation: "Custom toggle function is easy.",
    hint: "Use conditional based on isdown().",
    level: "moderate",
    codeExample: "def toggle_pen(t): t.penup() if t.isdown() else t.pendown()"
  },
  {
    question: "What is the purpose of `t.pen()` method?",
    shortAnswer: "Gets or sets multiple pen attributes at once (color, size, speed, etc.).",
    explanation: "Example: `t.pen(pencolor='red', pensize=3)`.",
    hint: "Advanced configuration.",
    level: "expert",
    codeExample: "t.pen(pendown=False, speed=0)"
  },
  {
    question: "What does `t.pen()` return?",
    shortAnswer: "A dictionary with current pen settings (pencolor, pensize, pendown, etc.).",
    explanation: "Useful for inspecting or saving state.",
    hint: "`settings = t.pen()`",
    level: "expert",
    codeExample: "print(t.pen()['pensize'])"
  },
  {
    question: "How can you draw a dotted line (dots instead of dashes)?",
    shortAnswer: "Move, dot, move, dot: `t.forward(space); t.dot(size);` in a loop.",
    explanation: "Combine pen down? Actually dot works regardless of pen state.",
    hint: "You don't need penup/pendown for dots.",
    level: "moderate",
    codeExample: "for _ in range(10): t.forward(15); t.dot(5)"
  },
  {
    question: "If you call `penup()` and then `stamp()`, does the stamp appear?",
    shortAnswer: "Yes, stamp() is independent of pen state.",
    explanation: "stamp() always leaves an impression.",
    hint: "Pen state only affects movement drawing.",
    level: "moderate",
    codeExample: "t.penup(); t.stamp()  # stamp appears"
  },
  {
    question: "What happens to the pen state when you call `t.reset()`?",
    shortAnswer: "Pen is set back to pendown (default).",
    explanation: "reset() restores many defaults, including pen down.",
    hint: "Reset also clears drawings and homes turtle.",
    level: "moderate",
    codeExample: "t.reset()  # pen becomes down"
  },
  {
    question: "How can you draw a rectangle, then move to a new spot and draw another without connecting lines?",
    shortAnswer: "Draw first rectangle, penup, goto new location, pendown, draw second.",
    explanation: "Penup prevents a trail between shapes.",
    hint: "Essential for multi‑shape drawings.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Is there a way to save and restore the entire pen state?",
    shortAnswer: "Use `old_state = t.pen()` then later `t.pen(old_state)`.",
    explanation: "The pen dictionary can be reused.",
    hint: "Powerful for temporary changes.",
    level: "expert",
    codeExample: "state = t.pen(); t.pen(pencolor='red', pensize=5); # draw; t.pen(state)"
  },
  {
    question: "What is the effect of `t.width(10)` on lines drawn after penup/pendown?",
    shortAnswer: "Sets line thickness to 10 pixels for subsequent drawing.",
    explanation: "It's independent of pen up/down state; takes effect when pen is down.",
    hint: "Also known as `pensize()`.",
    level: "basic",
    codeExample: "t.pensize(10); t.pendown(); t.forward(100)  # thick line"
  },
  {
    question: "Why does `t.forward(50)` sometimes draw and sometimes not?",
    shortAnswer: "Because the pen might be up (if you called penup() earlier).",
    explanation: "Check with `t.isdown()`.",
    hint: "A classic debugging moment.",
    level: "basic",
    codeExample: "print(t.isdown())"
  },
  {
    question: "How can you draw an outline of a shape without filling?",
    shortAnswer: "Just use pendown and draw; do not call begin_fill().",
    explanation: "Outline only requires pen down.",
    hint: "Fill is separate.",
    level: "basic",
    codeExample: "t.pendown(); for _ in range(4): t.forward(100); t.right(90)  # outline only"
  },
  {
    question: "What is a common mistake when making a dashed line?",
    shortAnswer: "Forgetting to call pendown() before the dash segment, so nothing appears.",
    explanation: "Must ensure pen is down for the dash.",
    hint: "Check pen state before each dash.",
    level: "moderate",
    codeExample: "t.pendown(); t.forward(10); t.penup()"
  },
  {
    question: "What does `t.penup().forward(50)` produce?",
    shortAnswer: "Syntax error – you cannot chain like that in Python turtle (unlike some other languages).",
    explanation: "Each method must be on its own line or separated by semicolon.",
    hint: "Use separate statements.",
    level: "basic",
    codeExample: "t.penup(); t.forward(50)"
  },
  {
    question: "How would you draw a rectangle using only absolute positioning and pen control to avoid unwanted diagonals?",
    shortAnswer: "penup to first corner, pendown, goto each corner sequentially.",
    explanation: "Goto draws lines; penup between corners if you need to jump, but for rectangle you can goto continuously.",
    hint: "Usually pen stays down for the whole rectangle.",
    level: "moderate",
    codeExample: "t.penup(); t.goto(0,0); t.pendown(); t.goto(100,0); t.goto(100,50); t.goto(0,50); t.goto(0,0)"
  }
];

export default questions;