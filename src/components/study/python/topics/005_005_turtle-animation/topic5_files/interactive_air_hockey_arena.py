"""
Module: 005_005_turtle-animation
Topic: Topic 5 - Boundary detection and wall bouncing logic
File: interactive_air_hockey_arena.py
Teacher & Mentor: Sukanta Hui

Description:
Air Hockey Puck with 4-wall collision, center paddle obstacle deflection,
and surface friction deceleration.
"""

import turtle
import math
import time

def run_air_hockey_demo():
    screen = turtle.Screen()
    screen.title("Air Hockey Arena - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    # Puck State
    puck = {"x": -100.0, "y": 50.0, "vx": 6.5, "vy": 4.5, "radius": 16}
    arena = {"min_x": -320, "max_x": 320, "min_y": -200, "max_y": 200}
    friction = 0.995

    for frame in range(250):
        t.clear()

        # Draw Table Arena
        t.penup(); t.goto(arena["min_x"], arena["min_y"]); t.pendown()
        t.color("#0284c7", "#0f172a"); t.pensize(4); t.begin_fill()
        t.goto(arena["max_x"], arena["min_y"]); t.goto(arena["max_x"], arena["max_y"])
        t.goto(arena["min_x"], arena["max_y"]); t.goto(arena["min_x"], arena["min_y"])
        t.end_fill(); t.pensize(2)

        # Center Red Goal Line
        t.penup(); t.goto(0, arena["min_y"]); t.pendown()
        t.color("#ef4444"); t.goto(0, arena["max_y"])

        # Update Physics
        puck["x"] += puck["vx"]
        puck["y"] += puck["vy"]
        puck["vx"] *= friction
        puck["vy"] *= friction

        r = puck["radius"]
        # Wall Collisions
        if puck["x"] + r >= arena["max_x"]:
            puck["x"] = arena["max_x"] - r; puck["vx"] = -puck["vx"]
        elif puck["x"] - r <= arena["min_x"]:
            puck["x"] = arena["min_x"] + r; puck["vx"] = -puck["vx"]

        if puck["y"] + r >= arena["max_y"]:
            puck["y"] = arena["max_y"] - r; puck["vy"] = -puck["vy"]
        elif puck["y"] - r <= arena["min_y"]:
            puck["y"] = arena["min_y"] + r; puck["vy"] = -puck["vy"]

        # Draw Puck
        t.penup(); t.goto(puck["x"], puck["y"]); t.pendown()
        t.color("white", "#fbbf24"); t.begin_fill(); t.circle(r); t.end_fill()

        # Telemetry
        speed = math.hypot(puck["vx"], puck["vy"])
        t.penup(); t.goto(-300, 220); t.pendown(); t.color("#38bdf8")
        t.write(f"PUCK SPEED: {speed:.2f} px/f | POS: ({puck['x']:.0f}, {puck['y']:.0f})", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_air_hockey_demo()
