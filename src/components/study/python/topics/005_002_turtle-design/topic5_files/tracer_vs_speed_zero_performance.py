"""
Module: 005_002_turtle-design
Topic: Topic 5 - Speed vs rendering performance: speed() settings
File: tracer_vs_speed_zero_performance.py
Teacher & Mentor: Sukanta Hui

Description:
Compares speed(0) vs screen.tracer(0) rendering performance for complex
1000-line fractal and mandala generation.
"""

import turtle
import time

def draw_complex_mandala(t, total_segments=300):
    for i in range(total_segments):
        t.forward(i * 0.8)
        t.left(59)

def compare_performance():
    screen = turtle.Screen()
    screen.title("speed(0) vs tracer(0) Benchmark - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(1)
    t.color("#38bdf8")

    # Ultra-Fast Render using tracer(0)
    print("Beginning instant render with screen.tracer(0)...")
    start_time = time.time()
    screen.tracer(0)  # Disable all automatic screen refresh

    draw_complex_mandala(t, total_segments=600)

    screen.update()  # Force single instant paint
    elapsed = time.time() - start_time
    print(f"Mandala generated in {elapsed:.4f} seconds!")

    # Write completion benchmark on screen
    t.penup(); t.goto(0, -220); t.pendown()
    t.color("#34d399")
    t.write(f"Rendered 600 lines in {elapsed:.4f}s with tracer(0)", align="center", font=("Arial", 12, "bold"))

    turtle.done()

if __name__ == "__main__":
    compare_performance()
