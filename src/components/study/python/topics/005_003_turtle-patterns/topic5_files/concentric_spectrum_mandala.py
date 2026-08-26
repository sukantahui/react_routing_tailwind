"""
Module: 005_003_turtle-patterns
Topic: Topic 5 - Color gradients and hue shifts inside iterative loops
File: concentric_spectrum_mandala.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates shifting hue across radial spokes to produce a continuous
360-degree color wheel spectrum mandala.
"""

import turtle
import colorsys

def draw_spectrum_mandala():
    screen = turtle.Screen()
    screen.title("Concentric Spectrum Mandala - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    spokes = 72
    turn_angle = 360 / spokes  # 5 degrees

    for spoke in range(spokes):
        hue = spoke / spokes
        r, g, b = colorsys.hsv_to_rgb(hue, 0.9, 1.0)
        t.color(r, g, b)

        # Draw spoke diamond
        t.forward(120)
        t.left(45)
        t.forward(40)
        t.left(135)
        t.forward(120)
        t.left(45)
        t.forward(40)
        t.left(135)

        t.left(turn_angle)

    turtle.done()

if __name__ == "__main__":
    draw_spectrum_mandala()
