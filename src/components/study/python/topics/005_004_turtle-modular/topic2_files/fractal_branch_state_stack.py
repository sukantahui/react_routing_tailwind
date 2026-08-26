"""
Module: 005_004_turtle-modular
Topic: Topic 2 - Preserving turtle position and heading with state restore functions
File: fractal_branch_state_stack.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates stack-based Push/Pop State Architecture for recursive branching trees:
- push_state(t, stack): saves current snapshot
- pop_state(t, stack): restores last saved snapshot
"""

import turtle

def push_state(t, stack):
    """Pushes a snapshot of current turtle state onto the stack."""
    state = (t.position(), t.heading(), t.isdown(), t.pencolor(), t.pensize())
    stack.append(state)

def pop_state(t, stack):
    """Pops and restores the most recent turtle state snapshot."""
    if not stack:
        return
    pos, head, is_down, p_col, p_size = stack.pop()
    t.penup()
    t.goto(pos)
    t.setheading(head)
    t.color(p_col)
    t.pensize(p_size)
    if is_down:
        t.pendown()

def draw_recursive_tree(t, branch_len, depth, stack):
    """Draws a branching fractal tree using push_state and pop_state."""
    if depth == 0:
        return

    # Color shift based on depth: brown trunk to vibrant green leaves
    colors = ["#15803d", "#22c55e", "#84cc16", "#a16207", "#78350f"]
    t.color(colors[min(depth, len(colors) - 1)])
    t.pensize(max(1, depth * 2))

    t.forward(branch_len)

    # 1. Left Branch
    push_state(t, stack)
    t.left(30)
    draw_recursive_tree(t, branch_len * 0.72, depth - 1, stack)
    pop_state(t, stack)

    # 2. Right Branch
    push_state(t, stack)
    t.right(30)
    draw_recursive_tree(t, branch_len * 0.72, depth - 1, stack)
    pop_state(t, stack)

def main():
    screen = turtle.Screen()
    screen.title("Stack-Based Fractal Tree - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    state_stack = []

    # Position at bottom center
    t.penup()
    t.goto(0, -220)
    t.setheading(90)
    t.pendown()

    draw_recursive_tree(t, branch_len=90, depth=6, stack=state_stack)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
