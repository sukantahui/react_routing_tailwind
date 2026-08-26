"""
Module: 005_006_turtle-interaction
Topic: Topic 7 - Creating interactive buttons and clickable UI on canvas
File: complete_interactive_game_toolbar.py
Teacher & Mentor: Sukanta Hui

Description:
Full In-Game Dashboard Toolbar:
- Bottom docked toolbar with 4 interactive UI widgets:
  1. [PLAY / PAUSE] toggle button
  2. [RESET] game button
  3. [SOUND: ON/OFF] audio switcher
  4. [THEME: DARK/LIGHT] theme toggle
"""

import turtle

def run_toolbar_dashboard():
    screen = turtle.Screen()
    screen.title("In-Game Dashboard Toolbar - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    app_state = {
        "is_playing": False,
        "sound_on": True,
        "theme": "DARK",
        "clicks": 0
    }

    toolbar_buttons = [
        {"id": "play_pause", "label": "▶ PLAY", "x": -260, "y": -230, "w": 110, "h": 40, "col": "#059669"},
        {"id": "reset",      "label": "↺ RESET", "x": -130, "y": -230, "w": 110, "h": 40, "col": "#dc2626"},
        {"id": "sound",      "label": "🔊 AUDIO: ON", "x": 0, "y": -230, "w": 130, "h": 40, "col": "#0284c7"},
        {"id": "theme",      "label": "🌓 THEME", "x": 150, "y": -230, "w": 110, "h": 40, "col": "#7c3aed"}
    ]

    def render_dashboard():
        t.clear()

        # Update dynamic button labels
        toolbar_buttons[0]["label"] = "⏸ PAUSE" if app_state["is_playing"] else "▶ PLAY"
        toolbar_buttons[2]["label"] = "🔊 AUDIO: ON" if app_state["sound_on"] else "🔇 AUDIO: OFF"

        # Docked Toolbar Background Bar
        t.penup(); t.goto(-375, -250); t.pendown()
        t.color("#0f172a", "#020617"); t.begin_fill()
        for _ in range(2): t.forward(750); t.left(90); t.forward(80); t.left(90)
        t.end_fill()

        # Render Buttons
        for b in toolbar_buttons:
            t.penup(); t.goto(b["x"], b["y"]); t.pendown()
            t.color(b["col"], b["col"]); t.begin_fill()
            for _ in range(2): t.forward(b["w"]); t.left(90); t.forward(b["h"]); t.left(90)
            t.end_fill()

            t.penup(); t.goto(b["x"] + b["w"]/2, b["y"] + 12); t.pendown()
            t.color("white")
            t.write(b["label"], align="center", font=("Arial", 10, "bold"))

        # Main Arena Status Readout
        t.penup(); t.goto(0, 50); t.pendown()
        t.color("#38bdf8")
        t.write(f"GAME STATUS: {'RUNNING' if app_state['is_playing'] else 'STOPPED'}", align="center", font=("Arial", 18, "bold"))

        t.penup(); t.goto(0, 0); t.pendown()
        t.color("#34d399")
        t.write(f"AUDIO: {'ENABLED' if app_state['sound_on'] else 'MUTED'}  |  TOTAL CLICKS: {app_state['clicks']}", align="center", font=("Arial", 12))

        screen.update()

    def handle_click(x, y):
        app_state["clicks"] += 1
        for b in toolbar_buttons:
            if (b["x"] <= x <= b["x"] + b["w"]) and (b["y"] <= y <= b["y"] + b["h"]):
                if b["id"] == "play_pause": app_state["is_playing"] = not app_state["is_playing"]
                elif b["id"] == "reset": app_state["is_playing"] = False; app_state["clicks"] = 0
                elif b["id"] == "sound": app_state["sound_on"] = not app_state["sound_on"]
                break
        render_dashboard()

    screen.onclick(handle_click)
    render_dashboard()
    screen.mainloop()

if __name__ == "__main__":
    run_toolbar_dashboard()
