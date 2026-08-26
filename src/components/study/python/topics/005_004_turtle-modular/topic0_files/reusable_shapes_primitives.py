"""
Module: 005_004_turtle-modular
Topic: Topic 0 - Writing reusable drawing functions
File: reusable_shapes_primitives.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates decomposing complex drawings into clean, parameterized,
reusable drawing primitive functions in Python Turtle.
"""

import turtle

def draw_square(t, x, y, size, fill_color, border_color="white"):
    """Draws a solid colored square positioned at bottom-left (x, y)."""
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()
    for _ in range(4):
        t.forward(size)
        t.left(90)
    t.end_fill()

def draw_triangle(t, x, y, size, fill_color, border_color="white"):
    """Draws an equilateral triangle positioned at (x, y)."""
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()
    for _ in range(3):
        t.forward(size)
        t.left(120)
    t.end_fill()

def draw_star(t, x, y, size, fill_color):
    """Draws a 5-pointed star centered approximately at (x, y)."""
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(fill_color, fill_color)
    t.begin_fill()
    for _ in range(5):
        t.forward(size)
        t.right(144)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Reusable Shape Primitives - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Draw reusable primitives at various coordinates
    draw_square(t, -220, -50, 90, "#38bdf8")
    draw_triangle(t, -60, -50, 100, "#f43f5e")
    draw_star(t, 120, 20, 100, "#fbbf24")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
