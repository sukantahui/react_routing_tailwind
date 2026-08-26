"""
Module: 005_003_turtle-patterns
Topic: Topic 1 - Polygon mathematics: The 360/n degree exterior angle rule
File: circumscribed_radius_polygons.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates drawing centered regular polygons by connecting vertex points
lying on a circumscribed circle of radius R using trigonometric polar coordinates:
x = cx + R * cos(2 * pi * i / n)
y = cy + R * sin(2 * pi * i / n)
"""

import turtle
import math

def draw_circumscribed_polygon(t, cx, cy, radius, sides, color):
    t.penup()
    t.color(color)
    t.pensize(2)

    # Compute polar coordinates of all vertices
    vertices = []
    for i in range(sides):
        angle = (2 * math.pi * i) / sides - (math.pi / 2)  # Point apex upward
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        vertices.append((x, y))

    # Connect vertices
    t.goto(vertices[0])
    t.pendown()
    for vx, vy in vertices[1:]:
        t.goto(vx, vy)
    t.goto(vertices[0])

def draw_nested_circumscribed_polygons():
    screen = turtle.Screen()
    screen.title("Circumscribed Polar Polygons - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()

    radius = 160
    # Overlay Triangle(3), Square(4), Pentagon(5), Hexagon(6), Octagon(8)
    polygon_specs = [
        (3, "#f43f5e"),
        (4, "#fbbf24"),
        (5, "#34d399"),
        (6, "#38bdf8"),
        (8, "#a78bfa"),
        (12, "#ffffff")
    ]

    for sides, color in polygon_specs:
        draw_circumscribed_polygon(t, 0, 0, radius, sides, color)

    turtle.done()

if __name__ == "__main__":
    draw_nested_circumscribed_polygons()
