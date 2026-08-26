"""
Module: 005_004_turtle-modular
Topic: Topic 0 - Writing reusable drawing functions
File: composite_house_builder.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates composite functional architecture: building a high-level `draw_house()`
function composed of reusable lower-level functions (`draw_rectangle`, `draw_roof`, `draw_window`).
"""

import turtle

def draw_rectangle(t, x, y, width, height, fill_color, border_color="white"):
    """Draws a parameterized rectangle."""
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()
    for _ in range(2):
        t.forward(width)
        t.left(90)
        t.forward(height)
        t.left(90)
    t.end_fill()

def draw_roof(t, x, y, width, height, fill_color):
    """Draws a triangular roof over a house base."""
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color("white", fill_color)
    t.begin_fill()
    t.goto(x + width / 2, y + height)
    t.goto(x + width, y)
    t.goto(x, y)
    t.end_fill()

def draw_house(t, x, y, size=100, wall_color="#3b82f6", roof_color="#ef4444"):
    """Draws a complete composite house with walls, roof, door, and window."""
    # 1. House Base Walls
    draw_rectangle(t, x, y, size, size * 0.8, wall_color)

    # 2. Roof
    draw_roof(t, x - size * 0.1, y + size * 0.8, size * 1.2, size * 0.5, roof_color)

    # 3. Door
    door_w, door_h = size * 0.25, size * 0.45
    draw_rectangle(t, x + size * 0.15, y, door_w, door_h, "#78350f")

    # 4. Window
    win_size = size * 0.25
    draw_rectangle(t, x + size * 0.55, y + size * 0.35, win_size, win_size, "#fef08a")

def main():
    screen = turtle.Screen()
    screen.title("Composite House Builder - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Draw 3 different houses of varying sizes and colors
    draw_house(t, -260, -100, size=110, wall_color="#0284c7", roof_color="#f43f5e")
    draw_house(t, -70, -100, size=140, wall_color="#059669", roof_color="#eab308")
    draw_house(t, 140, -100, size=90, wall_color="#7c3aed", roof_color="#fb923c")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
