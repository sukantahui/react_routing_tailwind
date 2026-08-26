"""
Module: 005_005_turtle-animation
Topic: Topic 5 - Boundary detection and wall bouncing logic
File: screen_wrap_vs_bounce_comparison.py
Teacher & Mentor: Sukanta Hui

Description:
Comparison of two screen boundary mechanics:
1. PONG BOUNCE: Velocity vector reverses upon edge contact (`vx = -vx`)
2. ASTEROIDS WRAP: Object teleports to opposite edge (Toroidal space: `if x > max_x: x = min_x`)
"""

import turtle
import time

def run_boundary_comparison():
    screen = turtle.Screen()
    screen.title("Bounce vs Screen Wrap Comparison - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    # Ball 1: Bounce Mode (Top half)
    b1 = {"x": -300.0, "y": 100.0, "vx": 6.0, "color": "#38bdf8", "name": "Bounce Ball (Pong)"}

    # Ball 2: Screen Wrap Mode (Bottom half)
    b2 = {"x": -300.0, "y": -100.0, "vx": 6.0, "color": "#34d399", "name": "Wrap Ball (Asteroids)"}

    for _ in range(250):
        t.clear()

        # Divider
        t.penup(); t.goto(-380, 0); t.pendown(); t.color("#334155"); t.forward(760)

        # 1. Update Bounce Ball
        b1["x"] += b1["vx"]
        if b1["x"] >= 340:
            b1["x"] = 340
            b1["vx"] = -b1["vx"]
        elif b1["x"] <= -340:
            b1["x"] = -340
            b1["vx"] = -b1["vx"]

        # 2. Update Wrap Ball
        b2["x"] += b2["vx"]
        if b2["x"] > 350:
            b2["x"] = -350

        # Draw Ball 1
        t.penup(); t.goto(b1["x"], b1["y"]); t.pendown()
        t.color("white", b1["color"]); t.begin_fill(); t.circle(18); t.end_fill()
        t.penup(); t.goto(-350, 160); t.pendown(); t.color(b1["color"])
        t.write(f"{b1['name']}  |  X: {b1['x']:.1f}  |  VX: {b1['vx']:.1f}", font=("Arial", 11, "bold"))

        # Draw Ball 2
        t.penup(); t.goto(b2["x"], b2["y"]); t.pendown()
        t.color("white", b2["color"]); t.begin_fill(); t.circle(18); t.end_fill()
        t.penup(); t.goto(-350, -40); t.pendown(); t.color(b2["color"])
        t.write(f"{b2['name']}  |  X: {b2['x']:.1f}  |  Toroidal Teleport", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_boundary_comparison()
