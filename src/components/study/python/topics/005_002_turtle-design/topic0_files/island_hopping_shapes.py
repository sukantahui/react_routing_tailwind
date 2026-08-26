"""
Module: 005_002_turtle-design
Topic: Topic 0 - Pen Control: penup(), pendown(), and pensize()
File: island_hopping_shapes.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates drawing multiple disconnected geometric shapes across
the canvas without leaving connecting transit lines.
"""

import turtle

def draw_polygon(t, x, y, sides, radius, line_color, line_width):
    """Helper function to draw a polygon at an absolute coordinate."""
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.color(line_color)
    t.pensize(line_width)
    t.pendown()

    angle = 360 / sides
    for _ in range(sides):
        t.forward(radius)
        t.left(angle)

def draw_island_composition():
    screen = turtle.Screen()
    screen.title("Multi-Island Geometry - Coder & AccoTax")
    screen.bgcolor("#090d16")
    screen.setup(width=750, height=600)

    t = turtle.Turtle()
    t.speed(6)

    # 1. Draw Triangle at Top-Left
    draw_polygon(t, -200, 100, sides=3, radius=80, line_color="#38bdf8", line_width=4)

    # 2. Draw Square at Center
    draw_polygon(t, -40, -40, sides=4, radius=80, line_color="#34d399", line_width=3)

    # 3. Draw Hexagon at Bottom-Right
    draw_polygon(t, 140, -150, sides=6, radius=60, line_color="#f43f5e", line_width=5)

    # 4. Stamp center point
    t.penup()
    t.goto(0, 0)
    t.dot(15, "#fbbf24")

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_island_composition()
