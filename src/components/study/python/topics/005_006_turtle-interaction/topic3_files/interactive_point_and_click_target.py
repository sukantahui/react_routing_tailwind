"""
Module: 005_006_turtle-interaction
Topic: Topic 3 - Mouse click event handling: screen.onclick() and turtle.onclick()
File: interactive_point_and_click_target.py
Teacher & Mentor: Sukanta Hui

Description:
Point-and-Click Shooting Target Mini-Game:
- Multiple target turtles wander or jump randomly.
- Clicking a target invokes its specific `turtle.onclick()` handler, awarding points
  and playing a hit animation.
"""

import turtle
import random

def run_shooting_gallery():
    screen = turtle.Screen()
    screen.title("Point-and-Click Target Gallery - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    score_t = turtle.Turtle(); score_t.hideturtle()
    state = {"score": 0, "hits": 0}

    def update_score_hud():
        score_t.clear()
        score_t.penup(); score_t.goto(-320, 220); score_t.pendown()
        score_t.color("#38bdf8")
        score_t.write(f"SCORE: {state['score']} pts  |  TARGETS HIT: {state['hits']}", font=("Arial", 12, "bold"))

    # Spawn 3 Target Turtles
    targets = []
    colors = ["#f43f5e", "#fbbf24", "#34d399"]

    for i in range(3):
        t = turtle.Turtle()
        t.shape("circle")
        t.shapesize(2.5, 2.5)
        t.color("white", colors[i])
        t.penup()
        t.goto(-200 + (i * 200), random.randint(-100, 100))

        # Define handler for this target
        def make_hit_handler(target_turtle):
            def on_target_hit(x, y):
                state["score"] += 100
                state["hits"] += 1
                # Jump to new random location
                target_turtle.goto(random.randint(-280, 280), random.randint(-160, 160))
                update_score_hud()
            return on_target_hit

        t.onclick(make_hit_handler(t))
        targets.append(t)

    update_score_hud()
    screen.mainloop()

if __name__ == "__main__":
    run_shooting_gallery()
