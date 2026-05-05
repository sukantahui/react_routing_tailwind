const questions = [
  {
    question: "What does `t.clear()` do?",
    shortAnswer: "Erases all lines and drawings made by the turtle, but does not move the turtle or change its state.",
    explanation: "The turtle's position, heading, color, pensize, etc., remain unchanged.",
    hint: "Like wiping the whiteboard but not moving the marker.",
    level: "basic",
    codeExample: "t.clear()"
  },
  {
    question: "What is the difference between `clear()` and `reset()`?",
    shortAnswer: "clear() erases only drawings; reset() erases drawings AND restores turtle to its default state (position, heading, pen color, size).",
    explanation: "reset() is a 'factory reset' – turtle goes back to origin, east, pen down, black color, pensize 1.",
    hint: "reset() does everything clear() does, plus more.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `t.home()` do?",
    shortAnswer: "Moves the turtle to (0,0) and sets heading to 0° (east) without erasing drawings.",
    explanation: "Useful for returning to start while keeping existing drawing.",
    hint: "Home = origin, but drawings stay.",
    level: "basic",
    codeExample: "t.home()"
  },
  {
    question: "After calling `clear()`, does the turtle's position change?",
    shortAnswer: "No, the turtle stays exactly where it was.",
    explanation: "Only the drawing is cleared.",
    hint: "Check with `t.pos()` before and after.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "After calling `reset()`, what are the turtle's position and heading?",
    shortAnswer: "Position = (0,0), heading = 0° (east).",
    explanation: "reset() returns the turtle to initial state.",
    hint: "Like creating a new turtle.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Does `home()` erase any drawings?",
    shortAnswer: "No, home() only moves the turtle; drawings remain.",
    explanation: "It's a movement command with drawing (if pen down), so it may draw a line as it moves to origin.",
    hint: "If pen is down, home() draws a line back to origin.",
    level: "moderate",
    codeExample: "t.home()  # draws line if pendown"
  },
  {
    question: "If pen is down, does `home()` draw a line?",
    shortAnswer: "Yes, because home() involves movement (to (0,0)) and the pen is down.",
    explanation: "To avoid drawing, call `t.penup()` before home().",
    hint: "Pen up prevents the line.",
    level: "moderate",
    codeExample: "t.penup(); t.home(); t.pendown()"
  },
  {
    question: "What is the shorthand for `clear()`?",
    shortAnswer: "`clr()`",
    explanation: "Alias for clear().",
    hint: "`t.clr()`",
    level: "basic",
    codeExample: "t.clr()"
  },
  {
    question: "What is the difference between `t.clear()` and `turtle.clearscreen()`?",
    shortAnswer: "clear() erases only one turtle's drawings; clearscreen() erases drawings from all turtles on the screen.",
    explanation: "clearscreen() also does not reset turtle positions or states.",
    hint: "Clearscreen = global clear.",
    level: "moderate",
    codeExample: "turtle.clearscreen()"
  },
  {
    question: "What does `turtle.resetscreen()` do?",
    shortAnswer: "Resets the entire screen: erases all drawings and resets all turtles to their default states.",
    explanation: "Like calling reset() on every turtle.",
    hint: "Nuclear option.",
    level: "expert",
    codeExample: "turtle.resetscreen()"
  },
  {
    question: "After `t.reset()`, what is the pen color?",
    shortAnswer: "Black (default).",
    explanation: "Reset restores default pen color.",
    hint: "Even if you changed it to red, reset makes it black.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "After `t.reset()`, is the turtle visible?",
    shortAnswer: "Yes, visible (unless you had hidden it – reset shows it).",
    explanation: "Reset restores showturtle() state as well.",
    hint: "Use `hideturtle()` after reset if needed.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you restore the turtle's state after calling `reset()`?",
    shortAnswer: "Only if you saved it beforehand (position, heading, color, etc.).",
    explanation: "reset() is destructive; save state with variables.",
    hint: "Store before reset.",
    level: "expert",
    codeExample: "old_pos = t.pos(); old_head = t.heading(); t.reset(); # then t.goto(old_pos); t.setheading(old_head)"
  },
  {
    question: "What happens if you call `clear()` on a turtle that has stamps?",
    shortAnswer: "clear() does NOT remove stamps; use `clearstamps()` for stamps.",
    explanation: "Stamps are separate from line drawings.",
    hint: "Clear drawings only.",
    level: "moderate",
    codeExample: "t.clearstamps()  # to clear stamps"
  },
  {
    question: "How can you erase everything (including stamps) and reset all turtles?",
    shortAnswer: "`turtle.clearscreen()` clears drawings; stamps; then `turtle.resetscreen()` also resets turtles. Or simply restart the program.",
    explanation: "clearscreen() clears stamps too? Actually, clearscreen clears all drawings, including stamps.",
    hint: "Test it.",
    level: "expert",
    codeExample: "turtle.clearscreen()"
  },
  {
    question: "If you call `home()` multiple times, what happens?",
    shortAnswer: "Each time, the turtle moves to (0,0) and faces east; if pen down, it draws lines back to origin each time.",
    explanation: "May create a star‑like pattern if you wander away.",
    hint: "Try it in a loop.",
    level: "moderate",
    codeExample: "for _ in range(4): t.forward(50); t.right(90); t.home()  # draws lines to center"
  },
  {
    question: "True or false: `reset()` is the same as calling `clear()` followed by `home()`.",
    shortAnswer: "False. reset() also resets pen color, pensize, pen state, visibility, and other attributes.",
    explanation: "home() only changes position and heading; clear() only erases drawings. reset does both plus restores defaults.",
    hint: "More comprehensive.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Does `clear()` affect the turtle's color?",
    shortAnswer: "No, color remains unchanged.",
    explanation: "Only the drawings are erased.",
    hint: "Color is state, not drawing.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What does `t.undo()` do?",
    shortAnswer: "Undoes the last turtle action (move or draw).",
    explanation: "Not covered in detail here, but it's another way to revert.",
    hint: "Undo is like Ctrl+Z.",
    level: "expert",
    codeExample: "t.undo()"
  },
  {
    question: "If you use `clear()` and then `home()`, what is the net effect?",
    shortAnswer: "Drawings are erased, and turtle moves to origin facing east.",
    explanation: "This is similar to reset() but without resetting pen color, pensize, etc.",
    hint: "A partial reset.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Why would you use `home()` instead of `goto(0,0)`?",
    shortAnswer: "home() also resets heading to 0°; goto(0,0) does not change heading.",
    explanation: "If you only want position reset, use goto(0,0).",
    hint: "home() = goto(0,0) + setheading(0).",
    level: "basic",
    codeExample: ""
  },
  {
    question: "After calling `clear()`, can you still see the turtle?",
    shortAnswer: "Yes, unless it was hidden before.",
    explanation: "clear does not affect visibility.",
    hint: "Turtle remains visible.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How can you clear only a specific part of the drawing?",
    shortAnswer: "Turtle doesn't support selective area erasing; you must redraw or use multiple turtles.",
    explanation: "You can cover with background color, but that's hacky.",
    hint: "Plan drawings in layers.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the effect of `t.reset()` on a turtle that was hidden?",
    shortAnswer: "The turtle becomes visible again (default state).",
    explanation: "reset() restores all defaults, including visibility.",
    hint: "So hide again after reset if needed.",
    level: "moderate",
    codeExample: "t.hideturtle(); t.reset()  # now visible"
  },
  {
    question: "Can you use `clear()` on the screen without a turtle?",
    shortAnswer: "No, clear() is a turtle method. Use `turtle.clearscreen()` for screen‑level clear.",
    explanation: "clearscreen works even without a turtle.",
    hint: "Global clear.",
    level: "moderate",
    codeExample: "turtle.clearscreen()"
  },
  {
    question: "Does `reset()` affect the screen background color?",
    shortAnswer: "No, background color remains as set (unless reset is called on screen).",
    explanation: "reset() affects only the turtle, not screen properties.",
    hint: "Use `turtle.bgcolor()` separately.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What is a common mistake when using `reset()` in an interactive program?",
    shortAnswer: "Calling reset() unintentionally and losing all progress without saving state.",
    explanation: "Always confirm destructive operations.",
    hint: "Ask user before reset.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How would you create a 'clear canvas' button in a turtle program?",
    shortAnswer: "Bind a function that calls `t.clear()` or `turtle.clearscreen()` to a key or mouse click using `turtle.onkey()`.",
    explanation: "Advanced: use `turtle.listen()` and `turtle.onkeypress()`.",
    hint: "See `turtle.onkey()` documentation.",
    level: "expert",
    codeExample: "def clear_canvas(): t.clear(); turtle.onkey(clear_canvas, 'c'); turtle.listen()"
  },
  {
    question: "What does `t.resetscreen()` do to the coordinate system?",
    shortAnswer: "It resets any custom coordinates (e.g., setworldcoordinates) to default.",
    explanation: "Also restores screen size and other defaults.",
    hint: "Full screen reset.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Why might you prefer `clear()` over `reset()` when animating?",
    shortAnswer: "To erase the previous frame but keep the turtle's speed, color, and orientation for the next frame.",
    explanation: "clear() is less disruptive; you just need a clean slate for drawing.",
    hint: "Preserves motion parameters.",
    level: "expert",
    codeExample: ""
  }
];

export default questions;