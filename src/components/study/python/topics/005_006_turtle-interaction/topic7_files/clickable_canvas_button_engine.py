"""
Module: 005_006_turtle-interaction
Topic: Topic 7 - Creating interactive buttons and clickable UI on canvas
File: clickable_canvas_button_engine.py
Teacher & Mentor: Sukanta Hui

Description:
Bounding Box Button Manager:
- Defines buttons as data dicts `{'name': 'START', 'x': -100, 'y': 50, 'w': 200, 'h': 45, 'color': '#38bdf8'}`
- Renders button rectangles and centered typography.
- Hit testing: `is_inside = (btn['x'] <= x <= btn['x'] + btn['w']) and (btn['y'] <= y <= btn['y'] + btn['h'])`.
"""

import turtle

def run_button_engine():
    screen = turtle.Screen()
    screen.title("Bounding Box Button Engine - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    status_msg = ["CLICK ANY BUTTON"]

    buttons = [
        {"id": "play", "text": "▶ PLAY GAME", "x": -110, "y": 40, "w": 220, "h": 50, "bg": "#0284c7", "fg": "white"},
        {"id": "settings", "text": "⚙ SETTINGS", "x": -110, "y": -30, "w": 220, "h": 50, "bg": "#334155", "fg": "#38bdf8"},
        {"id": "quit", "text": "✕ QUIT", "x": -110, "y": -100, "w": 220, "h": 50, "bg": "#881337", "fg": "#f43f5e"}
    ]

    def render_ui():
        t.clear()

        # Render Header
        t.penup(); t.goto(0, 150); t.pendown()
        t.color("#38bdf8")
        t.write("CANVAS UI BUTTON MANAGER", align="center", font=("Arial", 16, "bold"))

        # Render Buttons
        for b in buttons:
            # Button Rectangle
            t.penup(); t.goto(b["x"], b["y"]); t.pendown()
            t.color(b["bg"], b["bg"]); t.begin_fill()
            for _ in range(2): t.forward(b["w"]); t.left(90); t.forward(b["h"]); t.left(90)
            t.end_fill()

            # Button Border
            t.color("#64748b"); t.pensize(2)
            for _ in range(2): t.forward(b["w"]); t.left(90); t.forward(b["h"]); t.left(90)

            # Centered Text Label
            t.penup(); t.goto(b["x"] + b["w"]/2, b["y"] + 15); t.pendown()
            t.color(b["fg"])
            t.write(b["text"], align="center", font=("Arial", 12, "bold"))

        # Status HUD
        t.penup(); t.goto(0, -180); t.pendown(); t.color("#34d399")
        t.write(f"STATUS: {status_msg[0]}", align="center", font=("Arial", 12, "bold"))

        screen.update()

    def on_click(x, y):
        # Hit-test all buttons
        clicked = False
        for b in buttons:
            if (b["x"] <= x <= b["x"] + b["w"]) and (b["y"] <= y <= b["y"] + b["h"]):
                status_msg[0] = f"DISPATCHED ACTION: '{b['id'].upper()}'"
                clicked = True
                break
        if not clicked:
            status_msg[0] = f"CLICKED BACKGROUND AT ({x:.0f}, {y:.0f})"
        render_ui()

    screen.onclick(on_click)
    render_ui()
    screen.mainloop()

if __name__ == "__main__":
    run_button_engine()
