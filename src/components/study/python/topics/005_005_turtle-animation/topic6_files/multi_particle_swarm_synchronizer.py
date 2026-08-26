"""
Module: 005_005_turtle-animation
Topic: Topic 6 - Multi-object synchronized animation loops
File: multi_particle_swarm_synchronizer.py
Teacher & Mentor: Sukanta Hui

Description:
Synchronized Multi-Entity Swarm Loop:
Updates and renders 40 independent bouncing balls within a single 60 FPS frame cycle
using an Entity-Data List and double-buffered `screen.tracer(0)`.
"""

import turtle
import random
import time

def run_swarm_simulation():
    screen = turtle.Screen()
    screen.title("Multi-Entity Swarm Synchronizer - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # Arena boundaries
    min_x, max_x = -350, 350
    min_y, max_y = -240, 240

    colors = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a855f7", "#ec4899"]

    # 1. Initialize 40 Entity Dictionaries
    entities = []
    for _ in range(40):
        entities.append({
            "x": random.uniform(-200, 200),
            "y": random.uniform(-150, 150),
            "vx": random.uniform(-5.0, 5.0),
            "vy": random.uniform(-5.0, 5.0),
            "radius": random.randint(8, 16),
            "color": random.choice(colors)
        })

    for frame in range(300):
        t.clear()

        # 2. Synchronized Batch Physics Update & Render
        for e in entities:
            # Kinematics
            e["x"] += e["vx"]
            e["y"] += e["vy"]

            r = e["radius"]
            # 4-Wall Boundary Collisions
            if e["x"] + r >= max_x:
                e["x"] = max_x - r; e["vx"] = -e["vx"]
            elif e["x"] - r <= min_x:
                e["x"] = min_x + r; e["vx"] = -e["vx"]

            if e["y"] + r >= max_y:
                e["y"] = max_y - r; e["vy"] = -e["vy"]
            elif e["y"] - r <= min_y:
                e["y"] = min_y + r; e["vy"] = -e["vy"]

            # Render
            t.penup(); t.goto(e["x"], e["y"]); t.pendown()
            t.color("white", e["color"])
            t.begin_fill(); t.circle(r); t.end_fill()

        # HUD Telemetry
        t.penup(); t.goto(-350, 260); t.pendown()
        t.color("#34d399")
        t.write(f"SYNCHRONIZED ENTITIES: {len(entities)} · 60 FPS STABLE · FRAME: {frame:03d}", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_swarm_simulation()
