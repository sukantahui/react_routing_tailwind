"""
Module: 005_005_turtle-animation
Topic: Topic 6 - Multi-object synchronized animation loops
File: entity_pool_bullet_spawner.py
Teacher & Mentor: Sukanta Hui

Description:
Dynamic Entity Lifecycle Management:
- Spawns bullets on spacebar
- Updates all active bullets concurrently
- Despawns and purges bullets that travel beyond the canvas boundary (garbage prevention)
"""

import turtle
import time

def run_bullet_spawner():
    screen = turtle.Screen()
    screen.title("Dynamic Entity Spawner & Despawner - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    bullets = []
    player = {"x": 0, "y": -200, "vx": 0}

    # Spawner Trigger
    def spawn_bullet():
        bullets.append({
            "x": player["x"],
            "y": player["y"] + 25,
            "vy": 12.0
        })

    def move_left(): player["x"] = max(-300, player["x"] - 20)
    def move_right(): player["x"] = min(300, player["x"] + 20)

    screen.listen()
    screen.onkeypress(spawn_bullet, "space")
    screen.onkeypress(move_left, "Left")
    screen.onkeypress(move_right, "Right")

    # Auto-spawn demo bullets
    for frame in range(250):
        if frame % 15 == 0:
            spawn_bullet()

        t.clear()

        # 1. Update and Filter Active Bullets (Despawn offscreen)
        active_bullets = []
        for b in bullets:
            b["y"] += b["vy"]
            if b["y"] < 260:  # Within canvas
                active_bullets.append(b)
                # Render Bullet
                t.penup(); t.goto(b["x"], b["y"]); t.pendown()
                t.color("#fbbf24"); t.pensize(3); t.forward(12); t.pensize(1)
        bullets = active_bullets

        # 2. Render Player Ship
        t.penup(); t.goto(player["x"] - 20, player["y"]); t.pendown()
        t.color("#34d399", "#059669"); t.begin_fill()
        for _ in range(4): t.forward(40); t.left(90)
        t.end_fill()

        # HUD Telemetry
        t.penup(); t.goto(-320, 220); t.pendown()
        t.color("#38bdf8")
        t.write(f"ACTIVE BULLETS: {len(bullets)} · SPACE: FIRE · LEFT/RIGHT: MOVE", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_bullet_spawner()
