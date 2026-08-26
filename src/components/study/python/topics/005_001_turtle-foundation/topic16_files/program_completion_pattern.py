"""
Module: 005_001_turtle-foundation
Topic: Topic 16 - Introduction to turtle.done() and program lifecycle completion
File: program_completion_pattern.py
Teacher & Mentor: Sukanta Hui

Description:
Shows the professional, production-grade template for building clean,
crash-free Turtle programs with safe teardown handling.
"""

import turtle
import sys

def run_production_canvas():
    try:
        # Phase 1: Window Setup
        screen = turtle.Screen()
        screen.title("Professional Turtle Lifecycle Template")
        screen.bgcolor("#020617")
        screen.setup(width=700, height=700)

        # Phase 2: Drawing Logic
        t = turtle.Turtle()
        t.speed(0)
        t.hideturtle()
        t.color("#38bdf8")

        for radius in range(20, 180, 15):
            t.penup()
            t.goto(0, -radius)
            t.pendown()
            t.circle(radius)

        t.penup()
        t.goto(0, 0)
        t.dot(12, "#34d399")

        # Phase 3: Lifecycle Finalizer
        print("Drawing complete. Starting Tkinter GUI loop...")
        turtle.mainloop()  # Equivalent to turtle.done()

    except turtle.Terminator:
        print("Window was closed by user (turtle.Terminator caught safely).")
    except Exception as e:
        print(f"Unexpected error occurred: {e}", file=sys.stderr)
    finally:
        print("Turtle program cleanup finished.")

if __name__ == "__main__":
    run_production_canvas()
