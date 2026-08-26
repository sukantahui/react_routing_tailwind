"""
Module: 005_006_turtle-interaction
Topic: Topic 5 - Real-time user controls: moving, steering, and aiming
File: turret_mouse_aiming_trig.py
Teacher & Mentor: Sukanta Hui

Description:
Real-Time Turret Aiming via Trigonometric Arctangent (`math.atan2`):
- Tracks real-time mouse coordinate `(mx, my)`.
- Computes aiming angle: `theta = math.degrees(math.atan2(my - turret_y, mx - turret_x))`.
- Fires artillery shells along computed aim trajectory.
"""

import turtle
import math

def run_turret_aiming():
    screen = turtle.Screen()
    screen.title("Trigonometric Turret Aiming - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    turret = {"x": 0, "y": -180, "angle": 90}
    mouse = {"x": 0, "y": 0}
    bullets = []

    def on_mouse_move(x, y):
        mouse["x"] = x
        mouse["y"] = y
        # Calculate Aim Angle
        dx = x - turret["x"]
        dy = y - turret["y"]
        turret["angle"] = math.degrees(math.atan2(dy, dx))

    def on_fire(x, y):
        on_mouse_move(x, y)
        rad = math.radians(turret["angle"])
        bullets.append({
            "x": turret["x"] + math.cos(rad) * 45,
            "y": turret["y"] + math.sin(rad) * 45,
            "vx": math.cos(rad) * 14,
            "vy": math.sin(rad) * 14
        })

    screen.onclick(on_fire)

    def tick():
        t.clear()

        # 1. Update & Render Bullets
        active_b = []
        for b in bullets:
            b["x"] += b["vx"]
            b["y"] += b["vy"]
            if -375 < b["x"] < 375 and -275 < b["y"] < 275:
                active_b.append(b)
                t.penup(); t.goto(b["x"], b["y"]); t.pendown()
                t.color("#fbbf24"); t.dot(8)
        bullets[:] = active_b

        # 2. Draw Turret Base
        t.penup(); t.goto(turret["x"], turret["y"] - 30); t.pendown()
        t.color("#334155", "#0f172a"); t.begin_fill(); t.circle(30); t.end_fill()

        # 3. Draw Aiming Cannon Barrel
        t.penup(); t.goto(turret["x"], turret["y"]); t.setheading(turret["angle"]); t.pendown()
        t.color("#38bdf8"); t.pensize(8); t.forward(45); t.pensize(1)

        # 4. HUD
        t.penup(); t.goto(-330, 230); t.pendown(); t.color("#34d399")
        t.write(f"AIM ANGLE: {turret['angle']:.1f}° | BULLETS: {len(bullets)} | CLICK TO FIRE", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(tick, 16)

    tick()
    screen.mainloop()

if __name__ == "__main__":
    run_turret_aiming()
