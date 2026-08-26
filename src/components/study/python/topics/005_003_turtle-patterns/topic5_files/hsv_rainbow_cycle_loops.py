"""
Module: 005_003_turtle-patterns
Topic: Topic 5 - Color gradients and hue shifts inside iterative loops
File: hsv_rainbow_cycle_loops.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates dynamic color gradient generation inside iterative loops:
- Uses Python's built-in `colorsys.hsv_to_rgb()` module.
- Hue `h` ranges from 0.0 to 1.0 (covering Red -> Yellow -> Green -> Cyan -> Blue -> Magenta -> Red).
"""

import turtle
import colorsys

def draw_rainbow_spiral():
    screen = turtle.Screen()
    screen.title("HSV Rainbow Color Cycle Spiral - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)

    # Note: turtle colormode defaults to 1.0, which matches colorsys.hsv_to_rgb output!
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    total_steps = 300

    for i in range(total_steps):
        # Calculate continuous hue from 0.0 to 1.0
        hue = i / total_steps
        r, g, b = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
        t.color(r, g, b)

        t.forward(i * 0.7)
        t.left(59)

    turtle.done()

if __name__ == "__main__":
    draw_rainbow_spiral()
