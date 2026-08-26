"""
Module: 005_004_turtle-modular
Topic: Topic 5 - Clean code and DRY principles in graphical programming
File: data_driven_graphics_engine.py
Teacher & Mentor: Sukanta Hui

Description:
Separation of Concerns: Decouples the Scene Data (JSON/Dictionaries)
completely from the Rendering Logic functions.
"""

import turtle

def draw_polygon_node(t, node):
    """Generic Renderer: Draws any polygon entity defined in data."""
    t.penup(); t.goto(node["x"], node["y"]); t.setheading(node.get("rotation", 0)); t.pendown()
    t.color(node.get("border", "white"), node.get("fill", "#38bdf8"))
    t.pensize(node.get("pensize", 2))
    t.begin_fill()

    sides = node["sides"]
    size = node["size"]
    angle = 360 / sides
    for _ in range(sides):
        t.forward(size)
        t.left(angle)
    t.end_fill()

def render_scene_from_data(t, entities):
    """Orchestrates drawing across an entire data stream."""
    for entity in entities:
        if entity["type"] == "polygon":
            draw_polygon_node(t, entity)

def main():
    screen = turtle.Screen()
    screen.title("Data-Driven Graphics Engine - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # Scene Data definition (Could be loaded directly from JSON/API)
    SCENE_DATA = [
        {"type": "polygon", "x": -220, "y": 0, "sides": 3, "size": 90, "fill": "#f43f5e", "rotation": 0},
        {"type": "polygon", "x": -60,  "y": 0, "sides": 4, "size": 80, "fill": "#fbbf24", "rotation": 45},
        {"type": "polygon", "x": 100,  "y": 0, "sides": 6, "size": 55, "fill": "#34d399", "rotation": 0},
        {"type": "polygon", "x": 240,  "y": 0, "sides": 8, "size": 40, "fill": "#a855f7", "rotation": 22.5}
    ]

    render_scene_from_data(t, SCENE_DATA)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
