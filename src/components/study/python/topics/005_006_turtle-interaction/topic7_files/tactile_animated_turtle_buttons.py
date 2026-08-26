"""
Module: 005_006_turtle-interaction
Topic: Topic 7 - Creating interactive buttons and clickable UI on canvas
File: tactile_animated_turtle_buttons.py
Teacher & Mentor: Sukanta Hui

Description:
Tactile Sprite Buttons with Click Depth Depression:
- Turtles styled as square buttons using `t.shapesize(2.5, 6)`.
- When clicked, shrinks temporarily to simulate physical tactile button compression!
"""

import turtle

def run_tactile_buttons():
    screen = turtle.Screen()
    screen.title("Tactile Animated Turtle Buttons - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    # Status Turtle
    hud = turtle.Turtle(); hud.hideturtle()
    def update_hud(text):
        hud.clear()
        hud.penup(); hud.goto(0, 160); hud.pendown()
        hud.color("#38bdf8")
        hud.write(text, align="center", font=("Arial", 14, "bold"))

    def create_tactile_button(x, y, color, label_text, action_name):
        btn = turtle.Turtle()
        btn.shape("square")
        btn.shapesize(2.5, 6)  # 50px height x 120px width
        btn.color("white", color)
        btn.penup()
        btn.goto(x, y)

        # Label
        lbl = turtle.Turtle(); lbl.hideturtle()
        lbl.penup(); lbl.goto(x, y - 8); lbl.pendown()
        lbl.color("white")
        lbl.write(label_text, align="center", font=("Arial", 11, "bold"))

        def on_btn_click(cx, cy):
            # Tactile Depression Animation
            btn.shapesize(2.2, 5.5)  # Shrink on press
            update_hud(f"TACTILE CLICK TRIGGERED: {action_name}")
            # Restore size after 120ms
            screen.ontimer(lambda: btn.shapesize(2.5, 6), 120)

        btn.onclick(on_btn_click)
        return btn

    create_tactile_button(-150, 0, "#059669", "BOOST", "SPEED_BOOST (+50%)")
    create_tactile_button(0, 0, "#0284c7", "SHIELD", "DEFENSE_SHIELD (ON)")
    create_tactile_button(150, 0, "#dc2626", "NUKE", "TACTICAL_NUKE (FIRED)")

    update_hud("CLICK ANY BUTTON FOR TACTILE FEEDBACK")
    screen.mainloop()

if __name__ == "__main__":
    run_tactile_buttons()
