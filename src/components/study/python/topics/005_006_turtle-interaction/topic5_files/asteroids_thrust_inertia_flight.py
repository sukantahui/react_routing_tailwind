"""
Module: 005_006_turtle-interaction
Topic: Topic 5 - Real-time user controls: moving, steering, and aiming
File: asteroids_thrust_inertia_flight.py
Teacher & Mentor: Sukanta Hui

Description:
Classic Asteroids-Style Inertial Flight Controls:
- Left / Right: Rotates heading angle `theta`
- Up Arrow: Applies forward acceleration vector `(ax, ay) = (cos(theta)*a, sin(theta)*a)`
- Velocity decays slightly every frame via vacuum friction/damping: `vx *= 0.985`, `vy *= 0.985`
- Toroidal screen wrapping on all 4 boundaries.
"""

import turtle
import math

def run_inertial_flight():
    screen = turtle.Screen()
    screen.title("Asteroids Inertial Flight Simulator - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    ship = {
        "x": 0.0, "y": 0.0, "vx": 0.0, "vy": 0.0,
        "angle": 90.0, "turn_speed": 6.0, "thrust": 0.35, "friction": 0.985
    }
    keys = {"Up": False, "Left": False, "Right": False}

    # Bind Keys
    screen.onkeypress(lambda: keys.update({"Up": True}), "Up")
    screen.onkeyrelease(lambda: keys.update({"Up": False}), "Up")
    screen.onkeypress(lambda: keys.update({"Left": True}), "Left")
    screen.onkeyrelease(lambda: keys.update({"Left": False}), "Left")
    screen.onkeypress(lambda: keys.update({"Right": True}), "Right")
    screen.onkeyrelease(lambda: keys.update({"Right": False}), "Right")
    screen.listen()

    def tick():
        t.clear()

        # 1. Steering Rotation
        if keys["Left"]:  ship["angle"] = (ship["angle"] + ship["turn_speed"]) % 360
        if keys["Right"]: ship["angle"] = (ship["angle"] - ship["turn_speed"]) % 360

        # 2. Forward Engine Thrust
        if keys["Up"]:
            rad = math.radians(ship["angle"])
            ship["vx"] += math.cos(rad) * ship["thrust"]
            ship["vy"] += math.sin(rad) * ship["thrust"]

        # 3. Apply Vacuum Damping & Kinematics
        ship["vx"] *= ship["friction"]
        ship["vy"] *= ship["friction"]
        ship["x"] += ship["vx"]
        ship["y"] += ship["vy"]

        # 4. Toroidal Screen Wrapping
        if ship["x"] > 375: ship["x"] = -375
        elif ship["x"] < -375: ship["x"] = 375
        if ship["y"] > 275: ship["y"] = -275
        elif ship["y"] < -275: ship["y"] = 275

        # 5. Render Ship
        t.penup(); t.goto(ship["x"], ship["y"]); t.setheading(ship["angle"]); t.pendown()
        t.color("#38bdf8", "#0284c7"); t.begin_fill()
        t.forward(20); t.left(140); t.forward(25); t.left(80); t.forward(25); t.left(140)
        t.end_fill()

        # Thruster Flame
        if keys["Up"]:
            t.penup(); t.goto(ship["x"], ship["y"]); t.setheading(ship["angle"] + 180); t.pendown()
            t.color("#fbbf24", "#f59e0b"); t.begin_fill()
            t.forward(12); t.left(120); t.forward(8); t.left(120); t.forward(8); t.end_fill()

        # Telemetry HUD
        speed = math.hypot(ship["vx"], ship["vy"])
        t.penup(); t.goto(-340, 230); t.pendown(); t.color("#34d399")
        t.write(f"HEADING: {ship['angle']:.0f}° | SPEED: {speed:.1f} px/f | POS: ({ship['x']:.0f}, {ship['y']:.0f})", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(tick, 16)

    tick()
    screen.mainloop()

if __name__ == "__main__":
    run_inertial_flight()
