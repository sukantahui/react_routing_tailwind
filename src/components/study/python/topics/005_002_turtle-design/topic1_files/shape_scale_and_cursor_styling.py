"""
Module: 005_002_turtle-design
Topic: Topic 1 - Line thickness, pensize, and cap styling
File: shape_scale_and_cursor_styling.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates turtle.shapesize() / turtlesize() for scaling the cursor
and turtle.pen() dictionary attribute manipulation.
"""

import turtle

def style_cursor_and_pen():
    screen = turtle.Screen()
    screen.title("Cursor Scaling & Pen State Dictionary - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.shape("turtle")
    t.color("#38bdf8", "#0284c7")  # Outline sky-blue, fill ocean-blue

    # Scale the turtle cursor: stretch_wid, stretch_len, outline
    t.shapesize(stretch_wid=3, stretch_len=3, outline=2)

    # Inspect the full pen state dictionary
    current_pen_dict = t.pen()
    print("Full Pen Dictionary State:")
    for k, v in current_pen_dict.items():
        print(f"  {k:<12}: {v}")

    # Draw scaled triangle with thick pensize
    t.pensize(5)
    for _ in range(3):
        t.forward(150)
        t.left(120)

    turtle.done()

if __name__ == "__main__":
    style_cursor_and_pen()
