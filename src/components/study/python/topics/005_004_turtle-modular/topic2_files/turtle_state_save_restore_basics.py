"""
Module: 005_004_turtle-modular
Topic: Topic 2 - Preserving turtle position and heading with state restore functions
File: turtle_state_save_restore_basics.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates explicit state preservation: capturing position, heading, pen status,
and colors before drawing sub-features and restoring them completely upon completion.
"""

import turtle

def draw_decorated_branch(t, length, decoration_color="#f43f5e"):
    """
    Draws a main stem, branches off to draw an ornament, and restores
    the turtle's exact position, heading, and pen status.
    """
    t.forward(length)

    # 1. CAPTURE STATE
    saved_pos = t.position()
    saved_head = t.heading()
    saved_pen_down = t.isdown()
    saved_pencolor = t.pencolor()
    saved_fillcolor = t.fillcolor()

    # 2. DRAW SUB-DECORATION (MODIFIES STATE)
    t.left(45)
    t.penup()
    t.forward(30)
    t.pendown()
    t.color("white", decoration_color)
    t.begin_fill()
    t.circle(12)
    t.end_fill()

    # 3. RESTORE EXACT STATE
    t.penup()
    t.goto(saved_pos)
    t.setheading(saved_head)
    t.color(saved_pencolor, saved_fillcolor)
    if saved_pen_down:
        t.pendown()

    # Continue drawing along original stem trajectory seamlessly!
    t.forward(length * 0.5)

def main():
    screen = turtle.Screen()
    screen.title("Turtle State Save and Restore - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(3)
    t.color("#38bdf8")

    # Draw 4 branches radiating outward from center
    for angle in [0, 90, 180, 270]:
        t.penup()
        t.goto(0, 0)
        t.setheading(angle)
        t.pendown()
        t.color("#38bdf8")
        draw_decorated_branch(t, 80, decoration_color="#fbbf24")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
