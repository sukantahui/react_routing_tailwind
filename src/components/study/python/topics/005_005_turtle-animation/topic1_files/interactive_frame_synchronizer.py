"""
Module: 005_005_turtle-animation
Topic: Topic 1 - Controlling redraw with tracer(0) and update() for instant rendering
File: interactive_frame_synchronizer.py
Teacher & Mentor: Sukanta Hui

Description:
Interactive frame synchronizer demonstrating why calling `screen.tracer(0)`
without `screen.update()` leaves the display blank, and how explicit buffer swapping
guarantees clean atomic frame presentation.
"""

import turtle
import time

def run_synchronizer_demo():
    screen = turtle.Screen()
    screen.title("Interactive Frame Synchronizer - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # Draw complex vector artwork in back-buffer
    t.penup(); t.goto(-150, 0); t.pendown()
    t.color("#38bdf8", "#0284c7")
    t.begin_fill()
    for _ in range(6):
        t.forward(100); t.left(60)
    t.end_fill()

    # Center label
    t.penup(); t.goto(-100, -50); t.pendown()
    t.color("white")
    t.write("Buffered Frame Ready!", font=("Arial", 12, "bold"))

    # Crucial Step: Flush to Front Buffer!
    screen.update()

    turtle.done()

if __name__ == "__main__":
    run_synchronizer_demo()
