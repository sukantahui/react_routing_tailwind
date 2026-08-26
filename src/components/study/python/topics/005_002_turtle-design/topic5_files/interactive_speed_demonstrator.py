"""
Module: 005_002_turtle-design
Topic: Topic 5 - Speed vs rendering performance: speed() settings
File: interactive_speed_demonstrator.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates dynamic speed adjustments where turtle changes speeds
at different phases of an illustration (e.g. slow careful setup, fast infill).
"""

import turtle

def dynamic_speed_drawing():
    screen = turtle.Screen()
    screen.title("Dynamic Phase-Based Speed Control - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.pensize(3)
    t.color("#38bdf8")

    # Phase 1: Slow deliberate pedagogical outline (speed 2)
    print("Phase 1: Drawing outer boundary slowly (speed=2)...")
    t.speed(2)
    for _ in range(4):
        t.forward(120)
        t.left(90)

    # Phase 2: Moderate internal diagonal structure (speed 6)
    print("Phase 2: Drawing internal diagonals at normal pace (speed=6)...")
    t.speed(6)
    t.color("#34d399")
    t.goto(120, 120)
    t.penup(); t.goto(0, 120); t.pendown()
    t.goto(120, 0)

    # Phase 3: Instantaneous rosette center stamping (speed 0)
    print("Phase 3: Generating center burst at max speed (speed=0)...")
    t.speed(0)
    t.penup(); t.goto(60, 60); t.pendown()
    t.color("#fbbf24")
    for _ in range(36):
        t.forward(30)
        t.backward(30)
        t.left(10)

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    dynamic_speed_drawing()
