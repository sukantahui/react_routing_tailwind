const questions = [
  {
    question: "What does `t.dot(50, 'red')` do?",
    shortAnswer: "Draws a red filled circle of diameter 50 at current position.",
    explanation: "The dot is centered exactly at the turtle's coordinates.",
    hint: "Size is diameter, not radius.",
    level: "basic",
    codeExample: "t.dot(50, 'red')"
  },
  {
    question: "What does `t.stamp()` do?",
    shortAnswer: "Leaves an impression of the turtle's shape at its current position and orientation.",
    explanation: "The stamp does not move with the turtle; it's a static copy.",
    hint: "Like using an ink pad.",
    level: "basic",
    codeExample: "t.stamp()"
  },
  {
    question: "What is the return value of `stamp()`?",
    shortAnswer: "An integer stamp ID that can be used with `clearstamp(id)`.",
    explanation: "Allows selective removal of stamps.",
    hint: "Store the ID if you need to erase that stamp later.",
    level: "moderate",
    codeExample: "id1 = t.stamp(); t.clearstamp(id1)"
  },
  {
    question: "How do you remove all stamps?",
    shortAnswer: "`t.clearstamps()` or `t.clearstamps(None)`.",
    explanation: "`clearstamps()` with no argument removes all stamps.",
    hint: "Use to reset a stamped pattern.",
    level: "moderate",
    codeExample: "t.clearstamps()"
  },
  {
    question: "Does `dot()` respect the turtle's heading?",
    shortAnswer: "No, a dot is always a circle; its orientation does not change.",
    explanation: "Heading only affects movement and stamp(), not dot().",
    hint: "Dots are symmetric, so rotation doesn't matter.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Does `stamp()` respect the turtle's heading?",
    shortAnswer: "Yes, the stamp is rotated according to the turtle's heading.",
    explanation: "If you set heading 45°, the stamp will be tilted 45°.",
    hint: "Useful for creating arrows or directional markers.",
    level: "moderate",
    codeExample: "t.setheading(45); t.stamp()  # rotated stamp"
  },
  {
    question: "Can you stamp a hidden turtle?",
    shortAnswer: "Yes, the stamp appears even if the turtle is hidden.",
    explanation: "Visibility does not affect stamp output; it's based on shape and state.",
    hint: "You can hide the turtle and still stamp.",
    level: "moderate",
    codeExample: "t.hideturtle(); t.stamp()  # stamp appears"
  },
  {
    question: "How can you change the shape used by stamp()?",
    shortAnswer: "Use `t.shape('new_shape')` before stamping.",
    explanation: "Available shapes: 'turtle', 'circle', 'square', 'triangle', 'arrow', 'classic'.",
    hint: "Set shape first, then stamp.",
    level: "basic",
    codeExample: "t.shape('square'); t.stamp()"
  },
  {
    question: "What is the difference between `dot()` and drawing a circle with `circle()`?",
    shortAnswer: "`dot()` draws a filled circle at current position; `circle()` draws a circle outline (or fill) by moving the turtle.",
    explanation: "`circle()` changes the turtle's position; `dot()` does not move the turtle.",
    hint: "dot() is non‑moving, circle() moves.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you remove only the first three stamps?",
    shortAnswer: "`t.clearstamps(3)` – removes the first three stamps (oldest).",
    explanation: "Positive N removes first N stamps, negative removes last N stamps.",
    hint: "Try `clearstamps(-3)` for newest three.",
    level: "expert",
    codeExample: "t.clearstamps(3)"
  },
  {
    question: "What happens if you call `dot()` without arguments?",
    shortAnswer: "Draws a dot with default size (diameter = max(pensize+4, 2*pensize)).",
    explanation: "Default size is based on current pensize.",
    hint: "Better to specify size for consistency.",
    level: "moderate",
    codeExample: "t.dot()  # default size"
  },
  {
    question: "Can you stamp multiple times at the same location?",
    shortAnswer: "Yes, stamps will overlay each other.",
    explanation: "Each stamp is independent; they stack.",
    hint: "Later stamps appear on top.",
    level: "basic",
    codeExample: "t.stamp(); t.stamp()  # two stamps same spot"
  },
  {
    question: "What is the purpose of `clearstamp()`?",
    shortAnswer: "Removes a specific stamp by its ID.",
    explanation: "Useful for dynamic removal (e.g., bullets fading).",
    hint: "Store IDs in a list for batch removal.",
    level: "moderate",
    codeExample: "id = t.stamp(); t.clearstamp(id)"
  },
  {
    question: "How do you change the color of a stamp?",
    shortAnswer: "Set turtle's color before stamping: `t.color('blue'); t.stamp()`.",
    explanation: "Stamp inherits the turtle's color at the moment of stamping.",
    hint: "Change color, stamp, change back if needed.",
    level: "basic",
    codeExample: "t.color('red'); t.stamp()"
  },
  {
    question: "Can you stamp a custom shape you designed?",
    shortAnswer: "Yes, by registering a new shape with `turtle.register_shape(name, coordinates)`.",
    explanation: "You can create a polygon and then stamp it.",
    hint: "Advanced feature.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Why might you use `dot()` instead of `stamp()`?",
    shortAnswer: "When you need a simple colored circle without orientation, and you don't need individual removal.",
    explanation: "dot() is simpler and faster for many small marks.",
    hint: "Data plotting often uses dots.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Why might you use `stamp()` instead of `dot()`?",
    shortAnswer: "When you want a directional shape (e.g., arrow), or when you need to remove markers individually.",
    explanation: "Stamp keeps orientation and shape; dot is always round.",
    hint: "Footprints or leaves benefit from rotation.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `clearstamps(0)` do?",
    shortAnswer: "Removes no stamps (does nothing).",
    explanation: "0 has no effect.",
    hint: "Use None or omit argument to clear all.",
    level: "basic",
    codeExample: "t.clearstamps(0)"
  },
  {
    question: "If you change the turtle's shape after stamping, do existing stamps change?",
    shortAnswer: "No, stamps are static copies; they keep the shape and color at creation time.",
    explanation: "Each stamp is an independent graphic object.",
    hint: "Stamps don't update.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you move a stamp after it's placed?",
    shortAnswer: "No, stamps are permanent until cleared.",
    explanation: "To move a stamp, you must clear it and stamp again elsewhere.",
    hint: "Re‑stamp if needed.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How can you stamp at regular intervals along a line?",
    shortAnswer: "Move forward in a loop and stamp each step.",
    explanation: "Example: for _ in range(10): t.forward(20); t.stamp()",
    hint: "This creates a trail of stamps.",
    level: "moderate",
    codeExample: "for _ in range(10): t.forward(20); t.stamp()"
  },
  {
    question: "What is the default shape of a stamp if you haven't changed shape?",
    shortAnswer: "'classic' (an arrow/triangle).",
    explanation: "Default turtle shape varies by turtle version, but typically an arrow.",
    hint: "You can set shape to 'turtle' for a classic turtle icon.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Is there a way to stamp all turtles on the screen at once?",
    shortAnswer: "No built‑in method; loop through `turtle.turtles()` and call stamp() on each.",
    explanation: "You can iterate over all turtles.",
    hint: "`for t in turtle.turtles(): t.stamp()`",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What happens if you call `dot()` with a size that is zero or negative?",
    shortAnswer: "No dot is drawn (or a very small dot).",
    explanation: "Better to avoid; use positive sizes.",
    hint: "Only positive sizes are meaningful.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How can you make a stamp that is a different size than the turtle's current size?",
    shortAnswer: "Change `t.turtlesize(stretch_wid, stretch_len)` before stamping.",
    explanation: "`turtlesize()` scales the turtle shape.",
    hint: "Then stamp, then reset size if needed.",
    level: "expert",
    codeExample: "t.turtlesize(2,2); t.stamp(); t.turtlesize(1,1)"
  },
  {
    question: "What does `t.clearstamps()` do to stamps created before the turtle existed?",
    shortAnswer: "Clears all stamps, regardless of when they were created.",
    explanation: "It works on the screen's stamp list.",
    hint: "Non‑discriminatory.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Can you use `dot()` to draw an outline circle instead of filled?",
    shortAnswer: "No, `dot()` always fills. Use `circle(radius)` for outline.",
    explanation: "`circle()` draws a circle path; you can fill with begin_fill() if desired.",
    hint: "Different tools for different effects.",
    level: "moderate",
    codeExample: "t.circle(20)  # outline like a ring"
  },
  {
    question: "What is the advantage of storing stamp IDs in a list?",
    shortAnswer: "To clear specific stamps later, e.g., for animation or undo.",
    explanation: "You can iterate over the list and call clearstamp.",
    hint: "Useful for dynamic graphics.",
    level: "expert",
    codeExample: "ids = [t.stamp() for _ in range(5)]; ...; for id in ids: t.clearstamp(id)"
  },
  {
    question: "How can you make a dotted line using `dot()` instead of moving?",
    shortAnswer: "Move forward a bit, dot, move forward, dot, etc.",
    explanation: "Alternate between `forward()` and `dot()` to create a dashed‑like effect.",
    hint: "Set penup before moving, pendown if you want line between? With dot you may not need lines.",
    level: "moderate",
    codeExample: "for _ in range(10): t.forward(10); t.dot(5, 'black'); t.forward(10)"
  },
  {
    question: "What does `t.stamp()` return if the turtle is hidden?",
    shortAnswer: "Still returns a stamp ID (the stamp appears).",
    explanation: "Visibility does not affect stamp creation.",
    hint: "Turtle can be hidden but still stamp.",
    level: "basic",
    codeExample: "t.hideturtle(); id = t.stamp()  # stamp appears, id returned"
  }
];

export default questions;