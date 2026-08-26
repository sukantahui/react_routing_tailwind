"""
Module: 005_004_turtle-modular
Topic: Topic 0 - Writing reusable drawing functions
File: modular_village_landscape.py
Teacher & Mentor: Sukanta Hui

Description:
Combines modular drawing functions (stars, houses, pine trees, and moon)
into a cohesive nighttime landscape scene.
"""

import turtle
import math

def draw_star(t, x, y, size, color="#fef08a"):
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color(color, color)
    t.begin_fill()
    for _ in range(5):
        t.forward(size)
        t.right(144)
    t.end_fill()

def draw_tree(t, x, y, size=60):
    """Draws a pine tree with a trunk and layered green triangular canopies."""
    # Trunk
    t.penup(); t.goto(x - size*0.1, y); t.setheading(0); t.pendown()
    t.color("#78350f", "#78350f")
    t.begin_fill()
    for _ in range(2):
        t.forward(size * 0.2); t.left(90)
        t.forward(size * 0.4); t.left(90)
    t.end_fill()

    # Foliage layers
    foliage_colors = ["#14532d", "#15803d", "#22c55e"]
    for i, col in enumerate(foliage_colors):
        layer_y = y + size * 0.3 + (i * size * 0.25)
        layer_w = size * (0.8 - i * 0.15)
        t.penup(); t.goto(x - layer_w/2, layer_y); t.pendown()
        t.color(col, col)
        t.begin_fill()
        t.goto(x, layer_y + size * 0.4)
        t.goto(x + layer_w/2, layer_y)
        t.goto(x - layer_w/2, layer_y)
        t.end_fill()

def draw_house(t, x, y, size=80, wall="#0369a1", roof="#e11d48"):
    # Base
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color("white", wall)
    t.begin_fill()
    for _ in range(4):
        t.forward(size); t.left(90)
    t.end_fill()

    # Roof
    t.penup(); t.goto(x - size*0.1, y + size); t.pendown()
    t.color("white", roof)
    t.begin_fill()
    t.goto(x + size*0.5, y + size * 1.5)
    t.goto(x + size*1.1, y + size)
    t.goto(x - size*0.1, y + size)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Modular Village Landscape - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Night Sky Stars
    star_coords = [(-300, 220), (-180, 260), (-40, 210), (120, 250), (280, 230), (320, 160)]
    for sx, sy in star_coords:
        draw_star(t, sx, sy, 18)

    # Ground Baseline
    t.penup(); t.goto(-400, -120); t.pendown()
    t.color("#334155"); t.pensize(3); t.forward(800)

    # Houses
    draw_house(t, -260, -120, size=90, wall="#0284c7", roof="#f43f5e")
    draw_house(t, 60, -120, size=110, wall="#4f46e5", roof="#f59e0b")

    # Trees
    draw_tree(t, -120, -120, size=80)
    draw_tree(t, -40, -120, size=95)
    draw_tree(t, 240, -120, size=75)
    draw_tree(t, 320, -120, size=90)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
