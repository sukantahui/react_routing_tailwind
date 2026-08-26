"""
Module: 005_005_turtle-animation
Topic: Topic 5 - Boundary detection and wall bouncing logic
File: box_boundary_bouncing_billiards.py
Teacher & Mentor: Sukanta Hui

Description:
4-Wall Billiards Boundary Collision with Radius Compensation:
- Left Wall:   `if x - radius <= min_x: x = min_x + radius; vx = -vx`
- Right Wall:  `if x + radius >= max_x: x = max_x - radius; vx = -vx`
- Top Wall:    `if y + radius >= max_y: y = max_y - radius; vy = -vy`
- Bottom Wall: `if y - radius <= min_y: y = min_y + radius; vy = -vy`
"""

import turtle
import random
import time

def run_billiards_simulation():
    screen = turtle.Screen()
    screen.title("4-Wall Billiards Boundary Collision - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    # 1. Arena Boundary Box Turtle
    box_t = turtle.Turtle(); box_t.hideturtle(); box_t.pensize(4)
    min_x, max_x = -300, 300
    min_y, max_y = -200, 200

    box_t.penup(); box_t.goto(min_x, min_y); box_t.pendown()
    box_t.color("#38bdf8", "#0f172a"); box_t.begin_fill()
    box_t.goto(max_x, min_y); box_t.goto(max_x, max_y); box_t.goto(min_x, max_y); box_t.goto(min_x, min_y)
    box_t.end_fill()

    # 2. Billiard Ball
    ball_t = turtle.Turtle(); ball_t.hideturtle()
    radius = 18

    x, y = 0.0, 0.0
    vx, vy = 5.5, 4.2
    bounce_count = 0

    for frame in range(300):
        # Kinematics
        x += vx
        y += vy

        # Boundary checks with radius compensation & position snapping
        if x + radius >= max_x:
            x = max_x - radius
            vx = -vx
            bounce_count += 1
        elif x - radius <= min_x:
            x = min_x + radius
            vx = -vx
            bounce_count += 1

        if y + radius >= max_y:
            y = max_y - radius
            vy = -vy
            bounce_count += 1
        elif y - radius <= min_y:
            y = min_y + radius
            vy = -vy
            bounce_count += 1

        # Render
        ball_t.clear()
        ball_t.penup(); ball_t.goto(x, y); ball_t.pendown()
        ball_t.color("white", "#f43f5e")
        ball_t.begin_fill(); ball_t.circle(radius); ball_t.end_fill()

        # Telemetry
        ball_t.penup(); ball_t.goto(-300, 220); ball_t.pendown()
        ball_t.color("#34d399")
        ball_t.write(f"BOUNCES: {bounce_count:03d} | POS: ({x:.1f}, {y:.1f}) | VEL: ({vx:+.1f}, {vy:+.1f})", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_billiards_simulation()
