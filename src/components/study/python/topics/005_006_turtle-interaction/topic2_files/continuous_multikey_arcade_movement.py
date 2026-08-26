"""
Module: 005_006_turtle-interaction
Topic: Topic 2 - Keyboard input binding: screen.onkey() and screen.onkeypress()
File: continuous_multikey_arcade_movement.py
Teacher & Mentor: Sukanta Hui

Description:
Professional Arcade 8-Directional Flight Engine:
Supports simultaneous multi-key combinations (e.g., Up + Right = Diagonal Flight,
Spacebar = Weapon Fire) with zero input delay or OS key-repeat stutter.
"""

import turtle

def run_arcade_flight_engine():
    screen = turtle.Screen()
    screen.title("8-Directional Flight Engine - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    player = {"x": 0.0, "y": 0.0, "angle": 0, "speed": 6.0}
    bullets = []
    keys = {"w": False, "s": False, "a": False, "d": False}

    # Bind WASD Press and Release
    for k in ["w", "s", "a", "d"]:
        screen.onkeypress(lambda key=k: keys.update({key: True}), k)
        screen.onkeyrelease(lambda key=k: keys.update({key: False}), k)

    def fire_bullet():
        bullets.append({"x": player["x"], "y": player["y"] + 20, "vy": 12})

    screen.onkeypress(fire_bullet, "space")
    screen.listen()

    def main_tick():
        t.clear()

        # Update Player Motion
        dx = (1 if keys["d"] else 0) - (1 if keys["a"] else 0)
        dy = (1 if keys["w"] else 0) - (1 if keys["s"] else 0)

        player["x"] = max(-330, min(330, player["x"] + dx * player["speed"]))
        player["y"] = max(-230, min(230, player["y"] + dy * player["speed"]))

        # Update Bullets
        active_b = []
        for b in bullets:
            b["y"] += b["vy"]
            if b["y"] < 250:
                active_b.append(b)
                t.penup(); t.goto(b["x"], b["y"]); t.pendown()
                t.color("#fbbf24"); t.pensize(3); t.forward(10); t.pensize(1)
        bullets[:] = active_b

        # Draw Player Ship
        t.penup(); t.goto(player["x"] - 15, player["y"] - 15); t.pendown()
        t.color("#38bdf8", "#0284c7"); t.begin_fill()
        t.forward(30); t.left(120); t.forward(30); t.left(120); t.forward(30); t.left(120)
        t.end_fill()

        # Telemetry
        t.penup(); t.goto(-330, 230); t.pendown(); t.color("#34d399")
        t.write(f"WASD: 8-WAY FLIGHT | SPACE: FIRE BULLETS ({len(bullets)} ACTIVE)", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(main_tick, 16)

    main_tick()
    screen.mainloop()

if __name__ == "__main__":
    run_arcade_flight_engine()
