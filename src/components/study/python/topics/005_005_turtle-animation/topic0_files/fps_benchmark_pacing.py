"""
Module: 005_005_turtle-animation
Topic: Topic 0 - Frame-based animation concepts and frames per second (FPS)
File: fps_benchmark_pacing.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates visual smoothness comparisons across 15 FPS, 30 FPS, and 60 FPS,
illustrating frame delta time calculation:
- 15 FPS: 66.6 ms per frame (Noticeable stutter)
- 30 FPS: 33.3 ms per frame (Standard video playback)
- 60 FPS: 16.6 ms per frame (Fluid gaming standard)
"""

import turtle
import time

def run_multi_fps_comparison():
    screen = turtle.Screen()
    screen.title("FPS Pacing Benchmark - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=500)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # 3 Balls running at different FPS refresh intervals
    balls = [
        {"name": "15 FPS (Choppy)",  "y": 100,  "fps": 15, "color": "#f43f5e", "x": -350, "last_t": 0},
        {"name": "30 FPS (Standard)","y": 0,    "fps": 30, "color": "#fbbf24", "x": -350, "last_t": 0},
        {"name": "60 FPS (Fluid)",   "y": -100, "fps": 60, "color": "#34d399", "x": -350, "last_t": 0}
    ]

    start_time = time.perf_counter()

    while True:
        now = time.perf_counter()
        t.clear()

        # Tracklines
        for b in balls:
            t.penup(); t.goto(-350, b["y"]); t.pendown()
            t.color("#334155"); t.forward(700)
            t.penup(); t.goto(-350, b["y"] + 25); t.pendown()
            t.color("#94a3b8"); t.write(f"{b['name']} ({1000/b['fps']:.1f} ms frame)", font=("Arial", 10, "bold"))

        # Update and render balls based on their target FPS timers
        all_finished = True
        for b in balls:
            frame_dt = 1.0 / b["fps"]
            if now - b["last_t"] >= frame_dt:
                b["x"] += (600 / (b["fps"] * 4.0))  # 4 seconds to cross
                b["last_t"] = now

            if b["x"] < 350:
                all_finished = False

            # Draw Ball
            t.penup(); t.goto(b["x"], b["y"]); t.pendown()
            t.color("white", b["color"])
            t.begin_fill(); t.circle(18); t.end_fill()

        screen.update()
        if all_finished:
            break
        time.sleep(0.001)

    turtle.done()

if __name__ == "__main__":
    run_multi_fps_comparison()
