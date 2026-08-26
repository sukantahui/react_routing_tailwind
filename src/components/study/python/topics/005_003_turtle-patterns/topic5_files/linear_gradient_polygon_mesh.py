"""
Module: 005_003_turtle-patterns
Topic: Topic 5 - Color gradients and hue shifts inside iterative loops
File: linear_gradient_polygon_mesh.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates linear RGB color interpolation (Lerp) across 2D loop coordinates
to create a smooth two-color gradient square mesh.
"""

import turtle

def lerp_color(c1, c2, t):
    """Linear interpolation between color c1 (r, g, b) and c2 (r, g, b)."""
    return (
        c1[0] + (c2[0] - c1[0]) * t,
        c1[1] + (c2[1] - c1[1]) * t,
        c1[2] + (c2[2] - c1[2]) * t,
    )

def draw_gradient_mesh():
    screen = turtle.Screen()
    screen.title("Linear Gradient Color Interpolation - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.colormode(255)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # Start color (Cyan: 56, 189, 248) -> End color (Rose: 244, 63, 94)
    start_rgb = (56, 189, 248)
    end_rgb = (244, 63, 94)

    bars = 100
    bar_width = 5
    bar_height = 200
    start_x = -250

    for i in range(bars):
        factor = i / (bars - 1)
        r, g, b = lerp_color(start_rgb, end_rgb, factor)
        t.color(int(r), int(g), int(b))
        t.penup()
        t.goto(start_x + i * bar_width, -bar_height / 2)
        t.pendown()
        t.setheading(90)
        t.pensize(bar_width)
        t.forward(bar_height)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    draw_gradient_mesh()
