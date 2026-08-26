"""
Module: 005_006_turtle-interaction
Topic: Topic 0 - Event-driven programming model concepts
File: callbacks_first_class_functions.py
Teacher & Mentor: Sukanta Hui

Description:
Deep dive into First-Class Functions and Callbacks:
- Function references passed as arguments WITHOUT execution parentheses:
  `screen.onclick(handle_click)` vs `screen.onclick(handle_click())` [BUG!]
- Using `functools.partial` and `lambda` for parameterized event dispatch.
"""

import turtle
from functools import partial

def draw_shape(t, shape_type, color):
    """Parameterized shape renderer."""
    t.clear()
    t.penup(); t.goto(0, -50); t.pendown()
    t.color("white", color)
    t.begin_fill()
    if shape_type == "circle":
        t.circle(60)
    elif shape_type == "square":
        for _ in range(4): t.forward(100); t.left(90)
    elif shape_type == "triangle":
        for _ in range(3): t.forward(120); t.left(120)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Callbacks as First-Class Functions - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    t = turtle.Turtle(); t.hideturtle(); t.speed(0); t.pensize(3)

    # HUD
    t.penup(); t.goto(0, 180); t.pendown()
    t.color("#38bdf8")
    t.write("PRESS: [1] Circle | [2] Square | [3] Triangle", align="center", font=("Arial", 12, "bold"))

    # Passing parameterized callbacks using lambda & functools.partial
    screen.onkeypress(lambda: draw_shape(t, "circle", "#f43f5e"), "1")
    screen.onkeypress(partial(draw_shape, t, "square", "#38bdf8"), "2")
    screen.onkeypress(lambda: draw_shape(t, "triangle", "#34d399"), "3")

    screen.listen()
    screen.mainloop()

if __name__ == "__main__":
    main()
