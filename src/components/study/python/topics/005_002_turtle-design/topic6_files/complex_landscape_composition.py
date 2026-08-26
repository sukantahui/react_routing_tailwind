"""
Module: 005_002_turtle-design
Topic: Topic 6 - Combining geometric fills to compose complex graphics
File: complex_landscape_composition.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates layered multi-component vector illustration in Python Turtle:
- Sky backdrop with starry night dots
- Glowing crescent moon with layered background cutout
- Distant mountain silhouettes (Background Layer)
- Rolling green hills (Midground Layer)
- Traditional cottage with triangular roof and illuminated door (Foreground)
"""

import turtle

def draw_polygon_filled(t, vertices, stroke_color, fill_color, stroke_width=2):
    """Helper function to draw and fill an arbitrary polygon."""
    if not vertices:
        return
    t.penup()
    t.goto(vertices[0])
    t.pendown()
    t.color(stroke_color, fill_color)
    t.pensize(stroke_width)
    t.begin_fill()
    for vx, vy in vertices[1:]:
        t.goto(vx, vy)
    t.goto(vertices[0])
    t.end_fill()

def render_layered_landscape():
    screen = turtle.Screen()
    screen.title("Layered Landscape Composition - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # 1. Background Layer: Distant Mountains (Dark Navy)
    mountain_vertices = [
        (-400, -50), (-250, 160), (-120, 20), (0, 180),
        (150, 40), (280, 150), (400, -50), (400, -300), (-400, -300)
    ]
    draw_polygon_filled(t, mountain_vertices, "#1e293b", "#0f172a")

    # 2. Midground Layer: Rolling Green Foothills (Emerald Gradient)
    hill_vertices = [
        (-400, -120), (-200, -40), (0, -100), (200, -30), (400, -120),
        (400, -300), (-400, -300)
    ]
    draw_polygon_filled(t, hill_vertices, "#065f46", "#047857")

    # 3. Foreground: Cottage Base (Warm Slate)
    cottage_base = [(-60, -220), (60, -220), (60, -130), (-60, -130)]
    draw_polygon_filled(t, cottage_base, "#0369a1", "#0284c7")

    # 4. Foreground: Cottage Roof (Rose Red)
    roof_vertices = [(-75, -130), (0, -70), (75, -130)]
    draw_polygon_filled(t, roof_vertices, "#f43f5e", "#be123c")

    # 5. Illuminated Golden Window
    window_vertices = [(-20, -180), (20, -180), (20, -145), (-20, -145)]
    draw_polygon_filled(t, window_vertices, "#fbbf24", "#fde047")

    # Flush all layers to canvas
    screen.update()
    turtle.done()

if __name__ == "__main__":
    render_layered_landscape()
