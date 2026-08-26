"""
Module: 005_003_turtle-patterns
Topic: Topic 6 - Pattern optimization and computational efficiency
File: turtle_gc_memory_profiler.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates memory management techniques in Turtle graphics:
- Using `turtle.clear()` vs creating redundant Turtle instances
- Object reuse pool pattern for high-frequency rendering loops
"""

import turtle
import time

def profile_turtle_reuse():
    screen = turtle.Screen()
    screen.title("Turtle Memory Reuse Profiler - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    # ANTI-PATTERN: Creating new Turtle() inside loop causes severe memory leaks.
    # BEST PRACTICE: Single pooled Turtle instance reused across frames.
    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Simulate 50 animated frames with zero memory allocation
    for frame in range(50):
        t.clear()  # Erase previous frame geometry instantly

        t.penup()
        t.goto(0, 0)
        t.pendown()
        t.color("#38bdf8")

        # Draw frame geometry
        for i in range(12):
            t.forward(80)
            t.left(30 + frame * 0.5)

        screen.update()
        time.sleep(0.02)  # Target 50 FPS

    turtle.done()

if __name__ == "__main__":
    profile_turtle_reuse()
