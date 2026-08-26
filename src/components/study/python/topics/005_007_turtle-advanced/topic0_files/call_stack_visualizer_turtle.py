"""
Module: 005_007_turtle-advanced
Topic: Topic 0 - Understanding recursion through visual geometry
File: call_stack_visualizer_turtle.py
Teacher & Mentor: Sukanta Hui

Description:
Call Stack Depth Visualizer:
- Simultaneously renders recursive geometric branching while drawing the stack frames
  in memory alongside the geometry.
"""

import turtle

def draw_recursive_branches(t, stack_t, length, depth, x, y, angle):
    if depth == 0 or length < 10:
        return

    # 1. Update Stack Frame Telemetry
    stack_y = 120 - ((5 - depth) * 45)
    stack_t.penup(); stack_t.goto(150, stack_y); stack_t.pendown()
    stack_t.color("#334155", "#0f172a"); t.pensize(2); stack_t.begin_fill()
    for _ in range(2): stack_t.forward(170); stack_t.left(90); stack_t.forward(35); stack_t.left(90)
    stack_t.end_fill()

    stack_t.penup(); stack_t.goto(235, stack_y + 10); stack_t.pendown()
    stack_t.color("#38bdf8")
    stack_t.write(f"Frame #{5-depth}: len={length:.0f}", align="center", font=("Courier", 10, "bold"))

    # 2. Draw Branch
    t.penup(); t.goto(x, y); t.setheading(angle); t.pendown()
    t.color("#34d399") if depth > 2 else t.color("#f43f5e")
    t.pensize(depth * 1.5)
    t.forward(length)

    nx, ny = t.pos()

    # Recurse Left and Right
    draw_recursive_branches(t, stack_t, length * 0.7, depth - 1, nx, ny, angle + 25)
    draw_recursive_branches(t, stack_t, length * 0.7, depth - 1, nx, ny, angle - 25)

def run_call_stack_demo():
    screen = turtle.Screen()
    screen.title("Call Stack Visualizer - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    stack_t = turtle.Turtle(); stack_t.hideturtle()

    # Header
    t.penup(); t.goto(-150, 240); t.pendown(); t.color("#38bdf8")
    t.write("FRACTAL GEOMETRY (LEFT)  |  CALL STACK FRAMES (RIGHT)", align="center", font=("Arial", 12, "bold"))

    draw_recursive_branches(t, stack_t, 80, 4, -150, -180, 90)

    screen.update()
    screen.mainloop()

if __name__ == "__main__":
    run_call_stack_demo()
