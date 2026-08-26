"""
Module: 005_005_turtle-animation
Topic: Topic 4 - Simulating basic 2D physics: velocity, acceleration, and gravity
File: damped_bouncing_ball_physics.py
Teacher & Mentor: Sukanta Hui

Description:
Realistic bouncing ball with coefficient of restitution (elasticity/damping):
- When ball hits ground (`y <= floor_y`):
  `y = floor_y` (Position correction)
  `vy = -vy * elasticity` (Velocity reversal with kinetic energy loss)
  `vx *= ground_friction` (Rolling friction)
"""

import turtle
import time

def run_bouncing_ball_demo():
    screen = turtle.Screen()
    screen.title("Damped Bouncing Ball Physics - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    # Ground Line
    bg_t = turtle.Turtle(); bg_t.hideturtle()
    bg_t.penup(); bg_t.goto(-350, -180); bg_t.pendown()
    bg_t.color("#64748b"); bg_t.pensize(3); bg_t.forward(700)

    ball_t = turtle.Turtle(); ball_t.hideturtle()

    x = -280.0
    y = 150.0
    vx = 4.0
    vy = 0.0

    gravity = 0.6
    elasticity = 0.75      # 75% energy retained per bounce
    floor_y = -180.0 + 15  # Floor + radius
    ground_friction = 0.98

    for _ in range(250):
        # 1. Physics Step
        vy -= gravity
        x += vx
        y += vy

        # 2. Collision & Restitution
        if y <= floor_y:
            y = floor_y
            vy = -vy * elasticity
            vx *= ground_friction

            # Stop micro-jitter when kinetic energy falls below threshold
            if abs(vy) < 1.0:
                vy = 0.0

        # 3. Render
        ball_t.clear()
        ball_t.penup(); ball_t.goto(x, y); ball_t.pendown()
        ball_t.color("white", "#fbbf24")
        ball_t.begin_fill(); ball_t.circle(15); ball_t.end_fill()

        # Telemetry
        ball_t.penup(); ball_t.goto(-320, 210); ball_t.pendown()
        ball_t.color("#38bdf8")
        ball_t.write(f"BOUNCE SIMULATION · VY: {vy:+.2f} px/f · ELASTICITY: {elasticity*100:.0f}%", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_bouncing_ball_demo()
