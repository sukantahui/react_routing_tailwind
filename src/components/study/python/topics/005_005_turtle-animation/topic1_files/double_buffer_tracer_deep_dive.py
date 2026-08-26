"""
Module: 005_005_turtle-animation
Topic: Topic 1 - Controlling redraw with tracer(0) and update() for instant rendering
File: double_buffer_tracer_deep_dive.py
Teacher & Mentor: Sukanta Hui

Description:
Deep dive into Double-Buffering mechanics:
- Back-Buffer: Offscreen memory where thousands of geometric primitives are drawn silently.
- Front-Buffer: Onscreen display monitor.
- `screen.update()`: Atomic buffer swap making entire complex frames appear instantly.
"""

import turtle
import time
import math

def run_double_buffer_demo():
    screen = turtle.Screen()
    screen.title("Double Buffering & Tracer Deep Dive - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)

    # 1. Engage Double Buffering
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    for frame in range(120):
        t.clear()

        # Render 24-petaled rotating mandala (2,000+ draw operations in memory)
        num_petals = 24
        for i in range(num_petals):
            angle = frame * 2 + i * (360 / num_petals)
            rad = math.radians(angle)
            x = 80 * math.cos(rad)
            y = 80 * math.sin(rad)

            t.penup(); t.goto(x, y); t.setheading(angle + 90); t.pendown()
            t.color("#38bdf8", "#0284c7")
            t.begin_fill()
            t.circle(35, 180)
            t.end_fill()

        # HUD Overlay
        t.penup(); t.goto(-350, 260); t.pendown()
        t.color("#34d399")
        t.write(f"DOUBLE BUFFER ACTIVE · 2,400 SHAPES / TICK · FRAME: {frame:03d}", font=("Arial", 11, "bold"))

        # 2. Atomic Buffer Swap to Front Screen
        screen.update()
        time.sleep(0.0166)  # 60 FPS

    turtle.done()

if __name__ == "__main__":
    run_double_buffer_demo()
