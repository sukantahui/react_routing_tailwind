"""
Module: 005_006_turtle-interaction
Topic: Topic 0 - Event-driven programming model concepts
File: event_driven_paradigm_intro.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the Event-Driven Programming Model:
- Traditional Sequential: Program dictates exact execution order from top to bottom.
- Event-Driven: Program registers callback listeners and yields control to Tkinter's
  event dispatcher (`screen.mainloop()`), waiting for user triggers (clicks, keys, timers).
"""

import turtle

def run_event_driven_demo():
    screen = turtle.Screen()
    screen.title("Event-Driven Programming Model - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    t = turtle.Turtle()
    t.hideturtle()
    t.speed(0)
    t.pensize(3)

    # Initial instruction text
    t.penup(); t.goto(0, 180); t.pendown()
    t.color("#38bdf8")
    t.write("EVENT DISPATCHER ACTIVE\nClick Anywhere or Press 'C' for Color Cycle", align="center", font=("Arial", 12, "bold"))

    colors = ["#f43f5e", "#fbbf24", "#34d399", "#38bdf8", "#a855f7"]
    color_idx = [0]

    # Callback 1: Mouse Click Event Handler
    def on_canvas_click(x, y):
        """Asynchronous callback executed when the user clicks the mouse."""
        t.penup(); t.goto(x, y); t.pendown()
        current_color = colors[color_idx[0]]
        t.color(current_color, current_color)
        t.begin_fill(); t.circle(20); t.end_fill()

    # Callback 2: Keypress Event Handler
    def on_change_color():
        """Asynchronous callback executed when the user presses 'C'."""
        color_idx[0] = (color_idx[0] + 1) % len(colors)
        t.penup(); t.goto(0, -220); t.pendown()
        t.color(colors[color_idx[0]])
        t.write(f"Active Brush: {colors[color_idx[0]]}", align="center", font=("Arial", 11, "bold"))

    # Register Event Listeners
    screen.onclick(on_canvas_click)
    screen.onkeypress(on_change_color, "c")
    screen.onkeypress(on_change_color, "C")

    # Give focus to event queue
    screen.listen()

    # Hand control over to the Tkinter Event Loop
    screen.mainloop()

if __name__ == "__main__":
    run_event_driven_demo()
