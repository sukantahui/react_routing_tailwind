"""
Module: 005_005_turtle-animation
Topic: Topic 0 - Frame-based animation concepts and frames per second (FPS)
File: frame_animation_fundamentals.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the classic 4-stage Game/Animation Loop:
1. Erase / Clear previous frame (`t.clear()`)
2. Update mathematical state (x += vx, y += vy)
3. Render frame geometry
4. Flush GPU buffer (`screen.update()`) & Frame Delta Sleep (`time.sleep(1/60)`)
"""

import turtle
import time

def run_frame_loop():
    screen = turtle.Screen()
    screen.title("Frame-Based Animation Loop - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=500)
    screen.tracer(0)  # Suppress automatic redraws

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Ball kinematic state
    x, y = -300, 0
    vx = 4  # 4 pixels per frame

    fps_target = 60
    frame_duration = 1.0 / fps_target
    frame_count = 0

    while x < 300:
        start_time = time.perf_counter()

        # 1. Clear previous frame
        t.clear()

        # 2. Update physics state
        x += vx
        frame_count += 1

        # 3. Render current frame
        t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
        t.color("white", "#38bdf8")
        t.begin_fill()
        t.circle(25)
        t.end_fill()

        # HUD Info
        t.penup(); t.goto(-320, 200); t.pendown()
        t.color("#94a3b8")
        t.write(f"Frame: {frame_count:04d}  |  Target: {fps_target} FPS  |  Pos: ({x:.1f}, {y:.1f})", font=("Arial", 11, "bold"))

        # 4. Flush Buffer
        screen.update()

        # Delta time pacing to guarantee constant 60 FPS
        elapsed = time.perf_counter() - start_time
        sleep_time = max(0.0, frame_duration - elapsed)
        time.sleep(sleep_time)

    turtle.done()

if __name__ == "__main__":
    run_frame_loop()
