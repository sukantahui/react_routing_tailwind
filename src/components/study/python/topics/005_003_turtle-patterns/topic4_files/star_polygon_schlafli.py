"""
Module: 005_003_turtle-patterns
Topic: Topic 4 - Angle mathematics in star polygons and mandalas
File: star_polygon_schlafli.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates regular star polygon mathematics using Schläfli symbol {p/q}:
- p = number of vertices
- q = vertex step stride (coprime to p, 1 < q < p/2)
- Exterior Turn Angle: theta = (q * 360) / p
- Total Turns to close: p turns of theta degrees
"""

import turtle
import math

def draw_star_polygon(t, cx, cy, p, q, radius, color):
    """Draws regular star polygon {p/q} centered at (cx, cy)."""
    t.penup()
    t.color(color)
    t.pensize(2)

    # Compute polar coordinates of all p vertices
    vertices = []
    for i in range(p):
        angle = (2 * math.pi * i) / p - (math.pi / 2)
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        vertices.append((x, y))

    # Connect vertices stepping by stride q
    current_idx = 0
    t.goto(vertices[0])
    t.pendown()

    for _ in range(p):
        current_idx = (current_idx + q) % p
        t.goto(vertices[current_idx])

def demonstrate_star_family():
    screen = turtle.Screen()
    screen.title("Star Polygon Schläfli Family - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()

    # 1. 5-pointed star {5/2} (theta = 144°)
    draw_star_polygon(t, -250, 0, p=5, q=2, radius=80, color="#fbbf24")

    # 2. 7-pointed star {7/2} (theta = 102.86°)
    draw_star_polygon(t, -80, 0, p=7, q=2, radius=80, color="#38bdf8")

    # 3. 7-pointed acute star {7/3} (theta = 154.29°)
    draw_star_polygon(t, 90, 0, p=7, q=3, radius=80, color="#34d399")

    # 4. 8-pointed star {8/3} (theta = 135°)
    draw_star_polygon(t, 260, 0, p=8, q=3, radius=80, color="#f43f5e")

    turtle.done()

if __name__ == "__main__":
    demonstrate_star_family()
