"""
Module: 005_005_turtle-animation
Topic: Topic 2 - Eliminating flickering in Turtle animations
File: dual_turtle_layer_isolation.py
Teacher & Mentor: Sukanta Hui

Description:
High-Performance Layer Isolation Pattern:
- `bg_turtle`: Draws static background scenery (mountains, stars) ONCE. Never cleared.
- `sprite_turtle`: Draws dynamic moving characters. Clears only its own sprite layer.
Eliminates 90% of redundant redraw computations!
"""

import turtle
import time

def run_dual_turtle_layers():
    screen = turtle.Screen()
    screen.title("Dual-Turtle Layer Isolation - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=550)
    screen.tracer(0)

    # Turtle 1: Dedicated Background Layer
    bg_turtle = turtle.Turtle()
    bg_turtle.hideturtle()

    # Draw complex mountain scenery once
    bg_turtle.penup(); bg_turtle.goto(-400, -100); bg_turtle.pendown()
    bg_turtle.color("#1e1b4b", "#1e1b4b")
    bg_turtle.begin_fill()
    for x, y in [(-400, -100), (-250, 100), (-100, -20), (60, 120), (220, 10), (400, -100)]:
        bg_turtle.goto(x, y)
    bg_turtle.end_fill()

    # Turtle 2: Dedicated Moving Sprite Layer
    sprite_turtle = turtle.Turtle()
    sprite_turtle.hideturtle()
    sprite_turtle.pensize(2)

    # Animate moving aircraft across static mountain backdrop
    x = -350
    for _ in range(140):
        sprite_turtle.clear()  # Wipes ONLY the aircraft sprite, leaving mountains untouched!

        x += 5

        # Draw Aircraft Jet
        sprite_turtle.penup(); sprite_turtle.goto(x, 140); sprite_turtle.pendown()
        sprite_turtle.color("#38bdf8", "#38bdf8")
        sprite_turtle.begin_fill()
        sprite_turtle.forward(40); sprite_turtle.left(140); sprite_turtle.forward(20); sprite_turtle.left(40)
        sprite_turtle.forward(30); sprite_turtle.end_fill()

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_dual_turtle_layers()
