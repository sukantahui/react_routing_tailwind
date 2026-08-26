"""
Module: 005_005_turtle-animation
Topic: Topic 6 - Multi-object synchronized animation loops
File: solar_system_orbital_mechanics.py
Teacher & Mentor: Sukanta Hui

Description:
Multi-Body Solar System Orbital Simulation:
Synchronizes orbital angular velocity for Sun, Mercury, Earth, Mars, and Jupiter:
- Position: `x = r * cos(theta)`, `y = r * sin(theta)`
- Angular velocity: `theta += omega` (Keplerian orbital periods)
"""

import turtle
import math
import time

def run_solar_system_simulation():
    screen = turtle.Screen()
    screen.title("Multi-Body Solar System Simulator - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    planets = [
        {"name": "Mercury", "radius": 60,  "size": 5,  "speed": 4.15, "angle": 0, "color": "#cbd5e1"},
        {"name": "Earth",   "radius": 110, "size": 9,  "speed": 2.00, "angle": 45,"color": "#38bdf8"},
        {"name": "Mars",    "radius": 160, "size": 7,  "speed": 1.25, "angle": 90,"color": "#f43f5e"},
        {"name": "Jupiter", "radius": 220, "size": 16, "speed": 0.65, "angle": 180,"color": "#fbbf24"}
    ]

    for frame in range(300):
        t.clear()

        # 1. Central Sun
        t.penup(); t.goto(0, -25); t.setheading(0); t.pendown()
        t.color("#f59e0b", "#fbbf24"); t.begin_fill(); t.circle(25); t.end_fill()

        # 2. Draw Orbit Track Rings & Synchronized Planets
        for p in planets:
            # Orbital Track Line
            t.penup(); t.goto(0, -p["radius"]); t.pendown()
            t.color("#1e293b"); t.circle(p["radius"])

            # Update Angle
            p["angle"] = (p["angle"] + p["speed"]) % 360
            rad = math.radians(p["angle"])
            px = p["radius"] * math.cos(rad)
            py = p["radius"] * math.sin(rad)

            # Draw Planet
            t.penup(); t.goto(px, py - p["size"]); t.pendown()
            t.color("white", p["color"]); t.begin_fill(); t.circle(p["size"]); t.end_fill()

        # Telemetry
        t.penup(); t.goto(-350, 260); t.pendown(); t.color("#34d399")
        t.write(f"SYNCHRONIZED SOLAR ENGINE · 4 PLANETS IN HARMONY · FRAME: {frame:03d}", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_solar_system_simulation()
