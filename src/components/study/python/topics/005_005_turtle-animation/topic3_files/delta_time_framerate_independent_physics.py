"""
Module: 005_005_turtle-animation
Topic: Topic 3 - Timing and loop delays using time.sleep() and ontimer()
File: delta_time_framerate_independent_physics.py
Teacher & Mentor: Sukanta Hui

Description:
Framerate-Independent Movement using Delta-Time (dt):
Position = Position + Velocity_Per_Second * Delta_Time
Guarantees that an object moves exactly 100 pixels per second whether the simulation
runs at 20 FPS or 240 FPS!
"""

import turtle
import time

def run_delta_time_simulation():
    screen = turtle.Screen()
    screen.title("Delta-Time Framerate Independence - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=500)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    x = -300
    speed_per_second = 150.0  # Moves exactly 150 pixels every 1 second
    last_time = time.perf_counter()

    for _ in range(180):
        # Calculate real delta time in seconds
        now = time.perf_counter()
        dt = now - last_time
        last_time = now

        t.clear()

        # Framerate-independent kinematic update
        x += speed_per_second * dt

        # Draw Ball
        t.penup(); t.goto(x, 0); t.pendown()
        t.color("#34d399", "#059669")
        t.begin_fill(); t.circle(22); t.end_fill()

        # Telemetry
        t.penup(); t.goto(-320, 190); t.pendown()
        t.color("#38bdf8")
        t.write(f"DELTA TIME: {dt*1000:.2f} ms  |  SPEED: {speed_per_second} px/s  |  X: {x:.1f}", font=("Arial", 11, "bold"))

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_delta_time_simulation()
