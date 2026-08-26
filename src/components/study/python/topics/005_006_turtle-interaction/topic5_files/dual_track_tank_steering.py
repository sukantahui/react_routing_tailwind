"""
Module: 005_006_turtle-interaction
Topic: Topic 5 - Real-time user controls: moving, steering, and aiming
File: dual_track_tank_steering.py
Teacher & Mentor: Sukanta Hui

Description:
Realistic Tank Tread Steering Mechanics:
- Left Tread (Q/A): Forward / Reverse
- Right Tread (E/D): Forward / Reverse
- Turning in place occurs when one tread moves forward and the other reverses!
"""

import turtle
import math

def run_tank_simulation():
    screen = turtle.Screen()
    screen.title("Dual-Track Tank Steering Simulator - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    tank = {"x": 0.0, "y": 0.0, "angle": 0.0, "v_left": 0.0, "v_right": 0.0}
    keys = {"q": False, "a": False, "e": False, "d": False}

    for k in ["q", "a", "e", "d"]:
        screen.onkeypress(lambda key=k: keys.update({key: True}), k)
        screen.onkeyrelease(lambda key=k: keys.update({key: False}), k)
    screen.listen()

    def tick():
        t.clear()

        # Update Tread Velocities
        tank["v_left"] = (3.0 if keys["q"] else 0.0) - (3.0 if keys["a"] else 0.0)
        tank["v_right"] = (3.0 if keys["e"] else 0.0) - (3.0 if keys["d"] else 0.0)

        # Differential Drive Kinematics
        linear_v = (tank["v_left"] + tank["v_right"]) / 2.0
        angular_v = (tank["v_right"] - tank["v_left"]) * 1.5

        tank["angle"] = (tank["angle"] + angular_v) % 360
        rad = math.radians(tank["angle"])
        tank["x"] += math.cos(rad) * linear_v
        tank["y"] += math.sin(rad) * linear_v

        # Render Tank Body
        t.penup(); t.goto(tank["x"], tank["y"]); t.setheading(tank["angle"]); t.pendown()
        t.color("#34d399", "#064e3b"); t.begin_fill()
        for _ in range(2): t.forward(30); t.left(90); t.forward(20); t.left(90)
        t.end_fill()

        # Cannon
        t.forward(15); t.left(90); t.forward(10); t.right(90)
        t.color("#10b981"); t.pensize(5); t.forward(25); t.pensize(1)

        # HUD
        t.penup(); t.goto(-330, 230); t.pendown(); t.color("#38bdf8")
        t.write(f"LEFT TREAD: Q/A | RIGHT TREAD: E/D | HEADING: {tank['angle']:.0f}°", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(tick, 16)

    tick()
    screen.mainloop()

if __name__ == "__main__":
    run_tank_simulation()
