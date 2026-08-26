"""
Module: 005_002_turtle-design
Topic: Topic 2 - Color systems (RGB 0-255 vs 0-1, hex codes, named colors)
File: hsv_rainbow_wheel.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates dynamic rainbow color cycling using colorsys.hsv_to_rgb()
and screen.colormode(255) for smooth hue modulation.
"""

import turtle
import colorsys

def draw_rainbow_rosette():
    screen = turtle.Screen()
    screen.title("HSV Rainbow Hue Cycle - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.colormode(255)  # Enable 0-255 integer RGB

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    total_petals = 72
    for i in range(total_petals):
        # Calculate Hue from 0.0 to 1.0
        hue = i / total_petals
        # Convert HSV (Hue, Saturation 1.0, Value 1.0) to RGB floats
        r_f, g_f, b_f = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
        # Convert to 0-255 integers
        r, g, b = int(r_f * 255), int(g_f * 255), int(b_f * 255)

        t.color((r, g, b))
        t.circle(120)
        t.left(360 / total_petals)

    turtle.done()

if __name__ == "__main__":
    draw_rainbow_rosette()
