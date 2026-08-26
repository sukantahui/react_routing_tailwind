"""
Module: 005_004_turtle-modular
Topic: Topic 4 - Combining multiple modular shapes into complex town and nature scenes
File: layered_mountain_sunset_landscape.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates multi-layered procedural landscape composition:
1. Sky Gradient & Setting Sun (Background)
2. Distant Snowcapped Mountain Ranges (Midground Layer 1)
3. Rolling Foothills (Midground Layer 2)
4. Pine Forest & Lake Reflection (Foreground)
"""

import turtle
import math

def draw_sun(t, x, y, radius=40, color="#f97316"):
    t.penup(); t.goto(x, y - radius); t.setheading(0); t.pendown()
    t.color(color, color)
    t.begin_fill(); t.circle(radius); t.end_fill()

def draw_mountain_range(t, points, fill_color, border_color="#334155"):
    """Renders a continuous mountain silhouette from a list of peak vertices."""
    t.penup(); t.goto(points[0][0], -250); t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()
    for x, y in points:
        t.goto(x, y)
    t.goto(points[-1][0], -250)
    t.goto(points[0][0], -250)
    t.end_fill()

def draw_pine_tree(t, x, y, size=50):
    """Draws a layered pine tree."""
    # Trunk
    t.penup(); t.goto(x - size*0.08, y); t.setheading(0); t.pendown()
    t.color("#451a03", "#451a03")
    t.begin_fill()
    for _ in range(2):
        t.forward(size*0.16); t.left(90); t.forward(size*0.3); t.left(90)
    t.end_fill()

    # Needles
    foliage = ["#064e3b", "#047857", "#10b981"]
    for i, col in enumerate(foliage):
        ly = y + size*0.25 + (i * size*0.22)
        lw = size * (0.7 - i*0.15)
        t.penup(); t.goto(x - lw/2, ly); t.pendown()
        t.color(col, col)
        t.begin_fill()
        t.goto(x, ly + size*0.35)
        t.goto(x + lw/2, ly)
        t.goto(x - lw/2, ly)
        t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Layered Mountain Sunset Landscape - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=850, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # 1. Background Setting Sun
    draw_sun(t, 120, 80, radius=50, color="#fb923c")

    # 2. Far Mountain Range (Cool Dark Indigo)
    far_mountains = [(-425, -250), (-300, 120), (-140, 20), (0, 160), (180, 40), (320, 140), (425, -250)]
    draw_mountain_range(t, far_mountains, fill_color="#1e1b4b")

    # 3. Near Mountain Range (Deep Forest Slate)
    near_mountains = [(-425, -250), (-240, 40), (-100, -60), (60, 60), (220, -40), (380, 50), (425, -250)]
    draw_mountain_range(t, near_mountains, fill_color="#0f291e")

    # 4. Foreground Lake Basin
    t.penup(); t.goto(-425, -120); t.pendown()
    t.color("#0284c7", "#0c4a6e")
    t.begin_fill()
    for _ in range(2):
        t.forward(850); t.right(90); t.forward(130); t.right(90)
    t.end_fill()

    # 5. Foreground Pine Forest Along Shoreline
    tree_coords = [(-380, -120), (-320, -120), (-250, -120), (-180, -120), (140, -120), (220, -120), (290, -120), (360, -120)]
    for tx, ty in tree_coords:
        draw_pine_tree(t, tx, ty, size=65)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
