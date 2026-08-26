"""
Module: 005_004_turtle-modular
Topic: Topic 1 - Parameterized graphics (position x, y, radius, color, rotation)
File: parameterized_polygon_rotator.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates designing fully parameterized graphic functions accepting
anchor (x, y), side count, radius/scale, orientation angle, and dual-tone colors.
"""

import turtle
import math

def draw_parameterized_polygon(t, x, y, sides, radius, rotation=0, fill_color="#38bdf8", border_color="white", pensize=2):
    """
    Draws a regular polygon centered at (x, y) with specified radius,
    initial rotation offset, fill, and border colors.
    """
    t.penup()
    t.pensize(pensize)

    # Calculate starting vertex with rotation offset
    angle_step = 360 / sides
    start_rad = math.radians(rotation)
    start_x = x + radius * math.cos(start_rad)
    start_y = y + radius * math.sin(start_rad)

    t.goto(start_x, start_y)
    t.setheading(rotation + 90 + angle_step / 2)
    t.pendown()

    t.color(border_color, fill_color)
    t.begin_fill()
    side_length = 2 * radius * math.sin(math.radians(180 / sides))
    for _ in range(sides):
        t.forward(side_length)
        t.left(angle_step)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Parameterized Polygons - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # Draw varying shapes with distinct parameters
    # 1. Triangle rotated 30 deg
    draw_parameterized_polygon(t, -220, 0, sides=3, radius=70, rotation=30, fill_color="#f43f5e")

    # 2. Square rotated 45 deg (Diamond)
    draw_parameterized_polygon(t, -70, 0, sides=4, radius=65, rotation=45, fill_color="#fbbf24")

    # 3. Hexagon upright
    draw_parameterized_polygon(t, 80, 0, sides=6, radius=70, rotation=0, fill_color="#34d399")

    # 4. Octagon rotated 15 deg
    draw_parameterized_polygon(t, 230, 0, sides=8, radius=65, rotation=15, fill_color="#a855f7")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
