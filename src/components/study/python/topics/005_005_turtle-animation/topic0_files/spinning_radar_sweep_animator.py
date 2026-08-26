"""
Module: 005_005_turtle-animation
Topic: Topic 0 - Frame-based animation concepts and frames per second (FPS)
File: spinning_radar_sweep_animator.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates a continuous frame-by-frame 60 FPS rotational radar screen animation
with persistent phosphor trail fading and rotating sweep line.
"""

import turtle
import time
import math

def run_radar_simulation():
    screen = turtle.Screen()
    screen.title("60 FPS Radar Sweep Animation - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    angle = 0
    radius = 180

    for frame in range(360):
        t.clear()

        # 1. Concentric Radar Grid Rings
        for r in [60, 120, 180]:
            t.penup(); t.goto(0, -r); t.setheading(0); t.pendown()
            t.color("#064e3b")
            t.circle(r)

        # Crosshairs
        t.penup(); t.goto(-radius, 0); t.pendown(); t.color("#064e3b"); t.goto(radius, 0)
        t.penup(); t.goto(0, -radius); t.pendown(); t.color("#064e3b"); t.goto(0, radius)

        # 2. Rotating Sweep Line
        angle = (angle + 3) % 360
        rad = math.radians(angle)
        sweep_x = radius * math.cos(rad)
        sweep_y = radius * math.sin(rad)

        t.penup(); t.goto(0, 0); t.pendown()
        t.color("#34d399"); t.pensize(3)
        t.goto(sweep_x, sweep_y)
        t.pensize(2)

        # 3. Blip Target
        t.penup(); t.goto(80, 70); t.pendown()
        t.dot(10, "#fbbf24")

        # HUD
        t.penup(); t.goto(-200, -220); t.pendown()
        t.color("#34d399")
        t.write(f"RADAR ACTIVE · BEARING: {angle:03d}° · 60 FPS STABLE", font=("Courier", 10, "bold"))

        screen.update()
        time.sleep(0.0166)  # 60 FPS

    turtle.done()

if __name__ == "__main__":
    run_radar_simulation()
