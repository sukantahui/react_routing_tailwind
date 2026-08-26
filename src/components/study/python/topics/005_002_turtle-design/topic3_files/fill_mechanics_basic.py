"""
Module: 005_002_turtle-design
Topic: Topic 3 - Fill mechanics: begin_fill(), end_fill(), fillcolor()
File: fill_mechanics_basic.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the fundamental begin_fill() and end_fill() lifecycle in Python Turtle.
"""

import turtle

def draw_filled_shapes():
    screen = turtle.Screen()
    screen.title("Turtle Fill Mechanics - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)

    t = turtle.Turtle()
    t.speed(4)
    t.pensize(3)

    # Shape 1: Solid Filled Emerald Pentagon
    t.penup(); t.goto(-200, 50); t.pendown()
    t.pencolor("#34d399")
    t.fillcolor("#065f46")  # Dark emerald fill

    t.begin_fill()
    for _ in range(5):
        t.forward(90)
        t.left(72)
    t.end_fill()

    # Shape 2: Filled Golden Star with Overlapping Fill
    t.penup(); t.goto(100, 50); t.pendown()
    t.pencolor("#fbbf24")
    t.fillcolor("#d97706")  # Amber fill

    t.begin_fill()
    for _ in range(5):
        t.forward(120)
        t.right(144)
    t.end_fill()

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_filled_shapes()
