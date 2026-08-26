"""
Module: 005_004_turtle-modular
Topic: Topic 2 - Preserving turtle position and heading with state restore functions
File: turtle_state_context_manager.py
Teacher & Mentor: Sukanta Hui

Description:
Professional Pythonic pattern: building a reusable `@contextmanager` that automatically
preserves and restores Turtle position, heading, pen state, and pensize using the `with` statement.
"""

import turtle
from contextlib import contextmanager

@contextmanager
def preserve_turtle(t):
    """
    Context manager that saves Turtle position, heading, pen status,
    colors, and pensize upon enter and restores them upon exit.
    """
    saved_state = {
        "pos": t.position(),
        "heading": t.heading(),
        "is_down": t.isdown(),
        "pencolor": t.pencolor(),
        "fillcolor": t.fillcolor(),
        "pensize": t.pensize()
    }
    try:
        yield t
    finally:
        t.penup()
        t.goto(saved_state["pos"])
        t.setheading(saved_state["heading"])
        t.color(saved_state["pencolor"], saved_state["fillcolor"])
        t.pensize(saved_state["pensize"])
        if saved_state["is_down"]:
            t.pendown()

def draw_snowflake_crystal(t, length=100):
    """Draws a 6-arm snowflake utilizing the preserve_turtle context manager."""
    for _ in range(6):
        t.forward(length)

        # Draw left and right crystal needles safely inside isolated contexts
        with preserve_turtle(t):
            t.left(45)
            t.forward(length * 0.4)

        with preserve_turtle(t):
            t.right(45)
            t.forward(length * 0.4)

        # Draw sub-crystals halfway along arm
        with preserve_turtle(t):
            t.backward(length * 0.5)
            t.left(60)
            t.forward(length * 0.3)

        with preserve_turtle(t):
            t.backward(length * 0.5)
            t.right(60)
            t.forward(length * 0.3)

        t.backward(length)
        t.right(60)

def main():
    screen = turtle.Screen()
    screen.title("Pythonic State Context Manager - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)
    t.color("#38bdf8")

    draw_snowflake_crystal(t, length=120)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
