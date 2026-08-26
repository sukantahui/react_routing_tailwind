"""
Module: 005_005_turtle-animation
Topic: Topic 4 - Simulating basic 2D physics: velocity, acceleration, and gravity
File: euler_kinematics_gravity_cannon.py
Teacher & Mentor: Sukanta Hui

Description:
Classic 2D Projectile Physics via Forward Euler Integration:
1. Update Position: `x += vx * dt`, `y += vy * dt`
2. Update Velocity: `vy -= gravity * dt`
3. Aerodynamic Drag: `vx *= (1 - drag * dt)`
Renders a parabolic arc projectile from a cannon turret.
"""

import turtle
import math
import time

def run_cannon_simulation():
    screen = turtle.Screen()
    screen.title("Euler Projectile Physics - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    # 1. Background Ground Turtle
    bg_t = turtle.Turtle(); bg_t.hideturtle()
    bg_t.penup(); bg_t.goto(-400, -200); bg_t.pendown()
    bg_t.color("#334155", "#0f172a"); bg_t.begin_fill()
    for _ in range(2): bg_t.forward(800); bg_t.right(90); bg_t.forward(100); bg_t.right(90)
    bg_t.end_fill()

    # 2. Physics Ball Turtle
    ball_t = turtle.Turtle(); ball_t.hideturtle()
    trail_t = turtle.Turtle(); trail_t.hideturtle(); trail_t.pensize(2)

    # Initial kinematic parameters
    launch_angle = 55.0  # degrees
    launch_speed = 90.0  # px/s
    rad = math.radians(launch_angle)

    x, y = -350.0, -200.0
    vx = launch_speed * math.cos(rad)
    vy = launch_speed * math.sin(rad)
    gravity = 18.0  # px/s^2
    drag = 0.05     # air resistance

    trail_t.penup(); trail_t.goto(x, y); trail_t.pendown(); trail_t.color("#38bdf8")

    dt = 0.08  # Euler step interval

    while y >= -200:
        # Euler Integration
        x += vx * dt
        y += vy * dt
        vy -= gravity * dt
        vx *= (1.0 - drag * dt)

        # Draw Trajectory Trail
        trail_t.goto(x, y)

        # Draw Ball
        ball_t.clear()
        ball_t.penup(); ball_t.goto(x, y); ball_t.pendown()
        ball_t.color("white", "#f43f5e")
        ball_t.begin_fill(); ball_t.circle(12); ball_t.end_fill()

        # Telemetry
        ball_t.penup(); ball_t.goto(-360, 240); ball_t.pendown()
        ball_t.color("#34d399")
        ball_t.write(f"POS: ({x:.1f}, {y:.1f}) | VEL: ({vx:.1f}, {vy:.1f}) | GRAVITY: {gravity}", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_cannon_simulation()
