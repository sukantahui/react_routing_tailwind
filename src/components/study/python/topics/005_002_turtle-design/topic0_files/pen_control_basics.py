"""
Module: 005_002_turtle-design
Topic: Topic 0 - Pen Control: penup(), pendown(), and pensize()
File: pen_control_basics.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates basic pen state management in Python Turtle:
lifting the pen to move without drawing, placing the pen down,
and modifying line width dynamically.
"""

import turtle

def demonstrate_pen_control():
    # 1. Canvas Setup
    screen = turtle.Screen()
    screen.title("Pen Control: penup(), pendown() & pensize() - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=700, height=600)

    # 2. Artist Setup
    t = turtle.Turtle()
    t.shape("turtle")
    t.color("#38bdf8")
    t.speed(3)

    # 3. Draw a solid line with pensize 2
    t.pensize(2)
    t.forward(120)

    # 4. Lift pen (penup) and relocate without drawing
    print("Pen lifted. Moving to new coordinate without drawing line...")
    t.penup()
    t.forward(60)

    # 5. Place pen down (pendown) and draw thick line
    print("Pen placed down. Resuming drawing with pensize 6...")
    t.pendown()
    t.pensize(6)
    t.color("#34d399")
    t.forward(120)

    # 6. Check pen state using isdown()
    print(f"Is pen currently drawing? {t.isdown()}")

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    demonstrate_pen_control()
