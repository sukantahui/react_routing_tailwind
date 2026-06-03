const questions = [
  {
    question: "What heading represents east (right) in turtle graphics?",
    shortAnswer: "0° (or 360°).",
    explanation: "By default, 0° points east along the positive x‑axis.",
    hint: "Think of the positive x direction.",
    level: "basic",
    codeExample: "t.setheading(0)"
  },
  {
    question: "What heading points north (up)?",
    shortAnswer: "90°.",
    explanation: "90° is counter‑clockwise from east.",
    hint: "The compass rose shows north at 90°.",
    level: "basic",
    codeExample: "t.setheading(90)"
  },
  {
    question: "If the turtle is heading east and you call `left(90)`, which direction does it face?",
    shortAnswer: "North (90°).",
    explanation: "left(90) adds 90° to heading, turning counter‑clockwise.",
    hint: "Left turn from east goes to north.",
    level: "basic",
    codeExample: "t.setheading(0); t.left(90); print(t.heading())  # 90.0"
  },
  {
    question: "What heading points west?",
    shortAnswer: "180°.",
    explanation: "180° is directly opposite east.",
    hint: "Half a circle from east.",
    level: "basic",
    codeExample: "t.setheading(180)"
  },
  {
    question: "If heading is 270°, which cardinal direction is that?",
    shortAnswer: "South (down).",
    explanation: "270° is three‑quarters of a full circle clockwise from east, i.e., south.",
    hint: "South = down.",
    level: "basic",
    codeExample: "t.setheading(270)"
  },
  {
    question: "What is the heading for south‑east?",
    shortAnswer: "315°.",
    explanation: "South‑east is halfway between south (270°) and east (0°/360°).",
    hint: "315° = 360° - 45°.",
    level: "moderate",
    codeExample: "t.setheading(315)"
  },
  {
    question: "What does `t.heading()` return after `t.setheading(400)`?",
    shortAnswer: "40° (since 400 mod 360 = 40).",
    explanation: "Headings are normalized to the range [0,360).",
    hint: "Angles wrap around.",
    level: "moderate",
    codeExample: "t.setheading(400); print(t.heading())  # 40.0"
  },
  {
    question: "How can you make the turtle face exactly north without using `setheading()`?",
    shortAnswer: "From east, call `left(90)`; from any heading, compute the difference.",
    explanation: "`setheading(90)` is simplest and absolute.",
    hint: "Absolute heading is safer.",
    level: "moderate",
    codeExample: "t.setheading(90)"
  },
  {
    question: "What is the heading of the turtle after `right(90)` from north?",
    shortAnswer: "0° (east).",
    explanation: "North = 90°, right(90) subtracts 90 → 0°.",
    hint: "right = clockwise = heading decreases.",
    level: "moderate",
    codeExample: "t.setheading(90); t.right(90); print(t.heading())  # 0.0"
  },
  {
    question: "What is the heading direction for northeast?",
    shortAnswer: "45°.",
    explanation: "Halfway between east (0°) and north (90°).",
    hint: "Northeast = 45°.",
    level: "basic",
    codeExample: "t.setheading(45)"
  },
  {
    question: "What is the heading for northwest?",
    shortAnswer: "135°.",
    explanation: "Between north (90°) and west (180°).",
    hint: "135° = 90° + 45°.",
    level: "basic",
    codeExample: "t.setheading(135)"
  },
  {
    question: "What heading is directly opposite of 45°?",
    shortAnswer: "225° (southwest).",
    explanation: "Opposite direction = heading + 180° mod 360.",
    hint: "Add 180° and take modulo 360.",
    level: "moderate",
    codeExample: "opposite = (45 + 180) % 360  # 225"
  },
  {
    question: "Why does `left(720)` leave heading unchanged?",
    shortAnswer: "720° = two full rotations, net change 0°.",
    explanation: "left(angle) adds angle modulo 360.",
    hint: "720 mod 360 = 0.",
    level: "moderate",
    codeExample: "t.left(720); print(t.heading())"
  },
  {
    question: "How can you get the heading in radians?",
    shortAnswer: "Use `math.radians(t.heading())` after importing math.",
    explanation: "Turtle works in degrees by default; convert if needed.",
    hint: "`import math; rad = math.radians(t.heading())`",
    level: "expert",
    codeExample: "import math; rad = math.radians(t.heading())"
  },
  {
    question: "If the turtle is heading south (270°) and you call `left(90)`, what is the new heading?",
    shortAnswer: "0° (east) because 270 + 90 = 360 → 0°.",
    explanation: "Heading wraps around 360.",
    hint: "South + left(90) = east.",
    level: "moderate",
    codeExample: "t.setheading(270); t.left(90); print(t.heading())  # 0.0"
  },
  {
    question: "What is the heading when the turtle faces down (south)?",
    shortAnswer: "270°.",
    explanation: "Down = south = 270°.",
    hint: "Down = 270°.",
    level: "basic",
    codeExample: "t.setheading(270)"
  },
  {
    question: "What method would you use to point the turtle toward a given (x, y) coordinate?",
    shortAnswer: "`t.setheading(t.towards(x, y))`.",
    explanation: "`towards()` returns the angle from turtle to the point.",
    hint: "Combine `towards` with `setheading`.",
    level: "moderate",
    codeExample: "angle = t.towards(100, 50); t.setheading(angle)"
  },
  {
    question: "What heading corresponds to the positive y-axis direction?",
    shortAnswer: "90° (north).",
    explanation: "In standard Cartesian, positive y is up, which is north = 90°.",
    hint: "Up = north = 90°.",
    level: "basic",
    codeExample: "t.setheading(90); t.forward(100)  # moves up"
  },
  {
    question: "Why do some people expect 0° to be north?",
    shortAnswer: "Because navigational compasses have north as 0°, but turtle uses mathematical coordinates.",
    explanation: "Math convention: 0° = east, angles increase counter‑clockwise.",
    hint: "turtle.mode('logo') changes 0° to north.",
    level: "moderate",
    codeExample: "turtle.mode('logo'); t.setheading(0)  # now points north"
  },
  {
    question: "What does `t.setheading(-90)` do?",
    shortAnswer: "Sets heading to 270° (south) because -90 mod 360 = 270.",
    explanation: "Negative angles are normalized to positive.",
    hint: "Better to use positive 270.",
    level: "moderate",
    codeExample: "t.setheading(-90); print(t.heading())  # 270.0"
  },
  {
    question: "How can you reset heading to east without moving the turtle?",
    shortAnswer: "`t.setheading(0)` or `t.seth(0)`.",
    explanation: "`home()` also resets position; `setheading` changes only heading.",
    hint: "Use `seth(0)` for heading reset.",
    level: "basic",
    codeExample: "t.setheading(0)"
  },
  {
    question: "What heading is exactly halfway between north and east?",
    shortAnswer: "45° (northeast).",
    explanation: "Average of 0° and 90° is 45°.",
    hint: "Northeast = 45°.",
    level: "basic",
    codeExample: "t.setheading(45)"
  },
  {
    question: "If heading = 10°, what is the heading after `right(20)`?",
    shortAnswer: "350° (since 10 - 20 = -10 mod 360 = 350).",
    explanation: "right subtracts angle; negative wraps.",
    hint: "Watch the wrap.",
    level: "moderate",
    codeExample: "t.setheading(10); t.right(20); print(t.heading())  # 350.0"
  },
  {
    question: "True or false: `left(45)` and `right(315)` have the same effect.",
    shortAnswer: "True. 315° clockwise is same as 45° counter‑clockwise.",
    explanation: "360 - 315 = 45, so right(315) = left(45).",
    hint: "Both produce net +45° (mod 360).",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What does the `turtle.heading()` function return if no turtle is created?",
    shortAnswer: "It returns the heading of the default anonymous turtle (0.0).",
    explanation: "Turtle module has a hidden default turtle if you call functions without creating one.",
    hint: "Better to create your own turtle.",
    level: "expert",
    codeExample: "print(turtle.heading())  # 0.0 even without Turtle()"
  },
  {
    question: "How would you draw a line exactly north (up) from the current position?",
    shortAnswer: "`t.setheading(90); t.forward(distance)`",
    explanation: "Set absolute heading to 90°, then move.",
    hint: "North = 90°.",
    level: "basic",
    codeExample: "t.setheading(90); t.forward(100)"
  },
  {
    question: "What heading points to the bottom‑left of the screen?",
    shortAnswer: "225° (southwest).",
    explanation: "Bottom‑left = negative x and negative y = southwest = 225°.",
    hint: "225° = 180° + 45°.",
    level: "moderate",
    codeExample: "t.setheading(225)"
  },
  {
    question: "What happens to heading after `t.setheading(360)`?",
    shortAnswer: "Heading becomes 0° (since 360° is equivalent to 0°).",
    explanation: "360° is a full circle, same as 0°.",
    hint: "Wraps to 0.",
    level: "basic",
    codeExample: "t.setheading(360); print(t.heading())  # 0.0"
  },
  {
    question: "Why does `t.heading()` return a float even for integer angles?",
    shortAnswer: "Because heading is stored as a floating‑point number for precision.",
    explanation: "All turtle coordinates and angles are floats.",
    hint: "You can still compare with integers.",
    level: "basic",
    codeExample: "print(type(t.heading()))  # <class 'float'>"
  },
  {
    question: "If you want the turtle to face exactly 30° (east‑north‑east), which method is most direct?",
    shortAnswer: "`t.setheading(30)`.",
    explanation: "Absolute heading is simplest for precise angles.",
    hint: "setheading is direct.",
    level: "basic",
    codeExample: "t.setheading(30)"
  }
];

export default questions;