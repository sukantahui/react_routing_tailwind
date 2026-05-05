const questions = [
  {
    question: "What does `left(90)` do to the turtle's heading?",
    shortAnswer: "Increases heading by 90 degrees (counter-clockwise).",
    explanation: "If heading was 0° (east), it becomes 90° (north).",
    hint: "Left = counter-clockwise, right = clockwise.",
    level: "basic",
    codeExample: "t.left(90)"
  },
  {
    question: "What is the difference between `left()` and `setheading()`?",
    shortAnswer: "`left()` is relative (adds angle); `setheading()` is absolute (sets exact heading).",
    explanation: "`left(90)` from heading 45° becomes 135°; `setheading(90)` always sets heading to 90°.",
    hint: "Relative vs absolute.",
    level: "moderate",
    codeExample: "t.left(45); t.setheading(90)  # absolute"
  },
  {
    question: "What is the default heading direction?",
    shortAnswer: "0° pointing east (right).",
    explanation: "In standard mode, 0° = east, 90° = north, 180° = west, 270° = south.",
    hint: "Remember: right is east.",
    level: "basic",
    codeExample: "print(t.heading())  # 0.0"
  },
  {
    question: "How can you make the turtle point north?",
    shortAnswer: "Use `t.setheading(90)` or `t.left(90)` if starting east.",
    explanation: "`setheading(90)` works regardless of current heading.",
    hint: "North is 90°.",
    level: "basic",
    codeExample: "t.setheading(90)"
  },
  {
    question: "What happens if you call `right(450)`?",
    shortAnswer: "Turns clockwise 450°, which is equivalent to 90° (since 450 mod 360 = 90).",
    explanation: "Angles wrap around modulo 360; `right(450) = right(90)`.",
    hint: "Excess angle is reduced modulo 360.",
    level: "moderate",
    codeExample: "t.right(450)  # same as right(90)"
  },
  {
    question: "How do you switch turtle to use radians instead of degrees?",
    shortAnswer: "Call `turtle.radians()`.",
    explanation: "After that, all angle arguments (left, right, setheading) are in radians.",
    hint: "Use `math.pi` for common angles.",
    level: "moderate",
    codeExample: "turtle.radians(); t.left(math.pi/2)"
  },
  {
    question: "What is the shorthand for `left()` and `right()`?",
    shortAnswer: "`lt()` and `rt()`.",
    explanation: "These are aliases for convenience.",
    hint: "`t.lt(90)` same as `t.left(90)`.",
    level: "basic",
    codeExample: "t.lt(90); t.rt(90)"
  },
  {
    question: "What does `setheading(0)` do?",
    shortAnswer: "Sets heading to east (right).",
    explanation: "Absolute heading to 0°, the default starting direction.",
    hint: "Useful for resetting orientation.",
    level: "basic",
    codeExample: "t.setheading(0)"
  },
  {
    question: "If heading is 350° and you call `left(20)`, what is the new heading?",
    shortAnswer: "10° (since 350 + 20 = 370, mod 360 = 10).",
    explanation: "Headings wrap around 360.",
    hint: "Angles are modular.",
    level: "moderate",
    codeExample: "t.setheading(350); t.left(20); print(t.heading())  # 10.0"
  },
  {
    question: "What is the effect of `turtle.mode('logo')`?",
    shortAnswer: "Changes heading: 0° points north (up), 90° points east (right).",
    explanation: "Matches original LOGO turtle orientation.",
    hint: "'standard' mode (default) has 0° east.",
    level: "expert",
    codeExample: "turtle.mode('logo'); t.setheading(0)  # points up"
  },
  {
    question: "How can you get the current heading?",
    shortAnswer: "Use `t.heading()`.",
    explanation: "Returns float between 0 and 360 (or radians if in radian mode).",
    hint: "Useful for debugging.",
    level: "basic",
    codeExample: "print(t.heading())"
  },
  {
    question: "What is the difference between `right(180)` and `left(180)`?",
    shortAnswer: "Both turn the turtle 180°, but opposite directions. End heading same (reverse).",
    explanation: "From east, right(180) = west; left(180) also = west.",
    hint: "180° turn is same either way.",
    level: "basic",
    codeExample: "t.right(180) vs t.left(180)"
  },
  {
    question: "What happens if you call `left(-45)`?",
    shortAnswer: "It turns right 45° (negative angle rotates clockwise).",
    explanation: "Negative angles work but are confusing; use `right(45)` instead.",
    hint: "Avoid negative arguments.",
    level: "moderate",
    codeExample: "t.left(-45)  # same as t.right(45)"
  },
  {
    question: "Why does `setheading(400)` set heading to 40°?",
    shortAnswer: "Angles are normalized modulo 360; 400 mod 360 = 40°.",
    explanation: "Turtle automatically wraps angles to 0-360 range.",
    hint: "Any angle outside 0–360 is normalized.",
    level: "moderate",
    codeExample: "t.setheading(400); print(t.heading())  # 40.0"
  },
  {
    question: "How would you turn 45° to the left of current heading?",
    shortAnswer: "`t.left(45)`.",
    explanation: "Relative turn; does not depend on absolute heading.",
    hint: "Always relative.",
    level: "basic",
    codeExample: "t.left(45)"
  },
  {
    question: "What is the alias for `setheading()`?",
    shortAnswer: "`seth()`.",
    explanation: "Short form for quick coding.",
    hint: "`t.seth(90)` same as `t.setheading(90)`.",
    level: "basic",
    codeExample: "t.seth(180)"
  },
  {
    question: "How can you reset heading to default (east) without affecting position?",
    shortAnswer: "`t.setheading(0)` or `t.seth(0)`.",
    explanation: "`home()` also resets position and heading.",
    hint: "Use `setheading` for heading-only reset.",
    level: "basic",
    codeExample: "t.setheading(0)"
  },
  {
    question: "What is the heading range in degrees?",
    shortAnswer: "0 to 360 degrees, inclusive of 0, exclusive of 360 (modulo).",
    explanation: "360° is equivalent to 0°.",
    hint: "Angles wrap around.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "If you switch to radians, what is the equivalent of `left(90)`?",
    shortAnswer: "`left(math.pi/2)`.",
    explanation: "90 degrees = π/2 radians.",
    hint: "Import math.",
    level: "moderate",
    codeExample: "import math; turtle.radians(); t.left(math.pi/2)"
  },
  {
    question: "What is a common student mistake regarding `setheading()`?",
    shortAnswer: "Thinking it is relative like `left()`.",
    explanation: "New programmers often expect `setheading(45)` to add 45°, but it sets absolute heading.",
    hint: "Absolute = exact value, not cumulative.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you make the turtle point south?",
    shortAnswer: "`t.setheading(270)` or `t.right(90)` if facing east, etc.",
    explanation: "South is 270° in standard mode.",
    hint: "South = 270°.",
    level: "basic",
    codeExample: "t.setheading(270)"
  },
  {
    question: "What does `t.heading()` return after `t.left(361)`?",
    shortAnswer: "1° (since 361 mod 360 = 1).",
    explanation: "Full circle + 1°.",
    hint: "Angles wrap.",
    level: "moderate",
    codeExample: "t.left(361); print(t.heading())  # 1.0"
  },
  {
    question: "Can you use `setheading()` in radians mode?",
    shortAnswer: "Yes, argument should be in radians.",
    explanation: "Example: `t.setheading(math.pi)` points west (180°).",
    hint: "Convert if needed.",
    level: "moderate",
    codeExample: "turtle.radians(); t.setheading(math.pi)"
  },
  {
    question: "What is the relationship between `left()` and `right()`?",
    shortAnswer: "`right(angle)` is same as `left(-angle)`.",
    explanation: "Mathematically, clockwise = negative counter-clockwise.",
    hint: "But use `right` for clarity.",
    level: "moderate",
    codeExample: "t.right(90) == t.left(-90)"
  },
  {
    question: "How can you smoothly rotate the turtle in a circle without moving?",
    shortAnswer: "Use a loop: `for _ in range(360): t.left(1)`.",
    explanation: "The turtle will spin in place.",
    hint: "Combine with `dot()` for a spiral effect.",
    level: "moderate",
    codeExample: "for _ in range(360): t.left(1); t.dot(2)"
  },
  {
    question: "What is the default angle unit when turtle starts?",
    shortAnswer: "Degrees.",
    explanation: "Unless changed with `radians()`.",
    hint: "Standard math class uses degrees.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "Why might a program using `left(90)` produce a different shape after switching to radians?",
    shortAnswer: "Because `left(90)` in radians means 90 radians (≈ 5156°), causing many rotations.",
    explanation: "Always reset angle unit or use conditional logic.",
    hint: "Check mode before passing large numbers.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What does `t.towards(x, y)` return?",
    shortAnswer: "The angle from turtle to point (x, y) in degrees (or radians).",
    explanation: "Useful with `setheading()` to point toward a target.",
    hint: "Combine: `t.setheading(t.towards(target_x, target_y))`.",
    level: "moderate",
    codeExample: "angle = t.towards(100, 0); t.setheading(angle)"
  },
  {
    question: "How can you make the turtle point to the mouse cursor?",
    shortAnswer: "Use `turtle.onscreenclick()` or `t.setheading(t.towards(mouse_x, mouse_y))` in event handler.",
    explanation: "Requires capturing mouse coordinates.",
    hint: "Advanced: bind click event.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the purpose of `turtle.degrees(fullcircle=360)`?",
    shortAnswer: "Sets angle measurement to degrees with custom full circle value.",
    explanation: "You could set fullcircle to 400 (gradians) if desired.",
    hint: "Rarely used; defaults fine.",
    level: "expert",
    codeExample: "turtle.degrees(400)  # 400 gradians per circle"
  }
];

export default questions;