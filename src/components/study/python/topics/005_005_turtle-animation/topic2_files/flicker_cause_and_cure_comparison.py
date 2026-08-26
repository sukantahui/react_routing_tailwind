"""
Module: 005_005_turtle-animation
Topic: Topic 2 - Eliminating flickering in Turtle animations
File: flicker_cause_and_cure_comparison.py
Teacher & Mentor: Sukanta Hui

Description:
Side-by-side analysis of what causes animation flicker and how to eliminate it:
- FLICKER CAUSE: Erasing the canvas while automatic redraws are active.
  The monitor captures the blank white canvas during the brief microsecond before
  the new frame is drawn, causing visible strobe flashing.
- FLICKER CURE: `screen.tracer(0)` buffers the erase and redraw in memory,
  swapping only the finished frame with `screen.update()`.
"""

import turtle
import time

def run_flicker_free_cure():
    screen = turtle.Screen()
    screen.title("Eliminating Animation Flicker - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=500)

    # CURE: Disable canvas repaint events during erase & draw
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    x = -250
    vx = 4

    for frame in range(125):
        # 1. Erase offscreen (No flicker visible to user)
        t.clear()

        # 2. Update math
        x += vx

        # 3. Draw new frame
        t.penup(); t.goto(x, 0); t.setheading(0); t.pendown()
        t.color("#38bdf8", "#0284c7")
        t.begin_fill()
        for _ in range(4):
            t.forward(50); t.left(90)
        t.end_fill()

        # HUD
        t.penup(); t.goto(-300, 180); t.pendown()
        t.color("#34d399")
        t.write(f"ZERO FLICKER GUARANTEED · DOUBLE-BUFFERED · FRAME: {frame:03d}", font=("Arial", 11, "bold"))

        # 4. Swap to front monitor
        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_flicker_free_cure()
