"""
Module: 005_004_turtle-modular
Topic: Topic 4 - Combining multiple modular shapes into complex town and nature scenes
File: interactive_scene_graph_orchestrator.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates Scene Graph Architecture: organizing modular drawing functions
into ordered z-index rendering layers:
Layer 0: Celestial & Sky (Sun/Moon/Stars)
Layer 1: Distant Topography (Mountains/Hills)
Layer 2: Architecture & Structures (Houses/Buildings)
Layer 3: Props & Nature (Trees/Fences/Streetlamps)
Layer 4: Foreground Infrastructure (Roads/Sidewalks)
"""

import turtle

def render_scene_graph(t, time_of_day="sunset"):
    """Orchestrates multi-layered rendering based on theme configurations."""
    themes = {
        "day": {"sky": "#38bdf8", "sun": "#fbbf24", "mountain": "#64748b", "hill": "#15803d", "wall": "#0284c7"},
        "sunset": {"sky": "#f97316", "sun": "#f43f5e", "mountain": "#312e81", "hill": "#064e3b", "wall": "#7c3aed"},
        "night": {"sky": "#020617", "sun": "#f8fafc", "mountain": "#090d16", "hill": "#031a10", "wall": "#1e293b"}
    }
    cfg = themes.get(time_of_day, themes["sunset"])

    # 1. Sky & Sun
    t.penup(); t.goto(150, 80); t.pendown()
    t.color(cfg["sun"], cfg["sun"])
    t.begin_fill(); t.circle(45); t.end_fill()

    # 2. Mountains
    t.penup(); t.goto(-400, -100); t.pendown()
    t.color(cfg["mountain"], cfg["mountain"])
    t.begin_fill()
    for x, y in [(-400, -100), (-250, 90), (-100, -30), (50, 110), (200, 20), (350, 80), (400, -100)]:
        t.goto(x, y)
    t.end_fill()

    # 3. Rolling Foothill
    t.penup(); t.goto(-400, -100); t.pendown()
    t.color(cfg["hill"], cfg["hill"])
    t.begin_fill()
    t.goto(-400, -150); t.goto(400, -150); t.goto(400, -30); t.goto(100, -70); t.goto(-200, -40); t.goto(-400, -100)
    t.end_fill()

    # 4. Cottage House
    t.penup(); t.goto(-140, -150); t.setheading(0); t.pendown()
    t.color("white", cfg["wall"])
    t.begin_fill()
    for _ in range(4): t.forward(90); t.left(90)
    t.end_fill()

    # Roof
    t.penup(); t.goto(-150, -60); t.pendown()
    t.color("white", "#ef4444")
    t.begin_fill()
    t.goto(-95, 0); t.goto(-40, -60); t.goto(-150, -60)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Scene Graph Orchestrator - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    render_scene_graph(t, time_of_day="sunset")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
