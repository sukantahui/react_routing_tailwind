"""
Module: 005_005_turtle-animation
Topic: Topic 4 - Simulating basic 2D physics: velocity, acceleration, and gravity
File: interactive_physics_sandbox.py
Teacher & Mentor: Sukanta Hui

Description:
Multi-planet gravity sandbox:
- Earth Gravity: g = 9.8
- Moon Gravity:  g = 1.6
- Jupiter Gravity: g = 24.8
Demonstrating how gravitational acceleration alters parabolic trajectory curves.
"""

import turtle
import math

def simulate_planet_trajectory(screen, planet_name, gravity, color, start_y):
    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    vx = 45.0 * math.cos(math.radians(45))
    vy = 45.0 * math.sin(math.radians(45))
    x, y = -350.0, -150.0

    t.penup(); t.goto(x, y); t.pendown(); t.color(color)
    t.write(f"{planet_name} (g={gravity})", font=("Arial", 10, "bold"))

    dt = 0.05
    while y >= -150:
        x += vx * dt
        y += vy * dt
        vy -= gravity * dt
        t.goto(x, y)

def run_multi_gravity_sandbox():
    screen = turtle.Screen()
    screen.title("Multi-Gravity Sandbox - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    # Simulate 3 planets
    simulate_planet_trajectory(screen, "Moon", 3.0, "#fef08a", -150)
    simulate_planet_trajectory(screen, "Earth", 9.8, "#38bdf8", -150)
    simulate_planet_trajectory(screen, "Jupiter", 24.8, "#f43f5e", -150)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    run_multi_gravity_sandbox()
