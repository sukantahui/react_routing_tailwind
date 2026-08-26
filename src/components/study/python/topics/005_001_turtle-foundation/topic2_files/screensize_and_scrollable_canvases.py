"""
# Module: 005_001_turtle-foundation
# Topic 2: Screen configuration: setup(), title(), bgcolor(), screensize()
# File: screensize_and_scrollable_canvases.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Virtual canvas buffer sizing, viewport aspect ratios,
#              and Tkinter scrollbar management.
"""

from dataclasses import dataclass

@dataclass
class CanvasBufferArchitecture:
    viewport_width: int
    viewport_height: int
    canvas_buffer_width: int
    canvas_buffer_height: int

    @property
    def requires_horizontal_scrollbar(self) -> bool:
        return self.canvas_buffer_width > self.viewport_width

    @property
    def requires_vertical_scrollbar(self) -> bool:
        return self.canvas_buffer_height > self.viewport_height

    @property
    def scrollable_x_span(self) -> int:
        return max(0, self.canvas_buffer_width - self.viewport_width)

    @property
    def scrollable_y_span(self) -> int:
        return max(0, self.canvas_buffer_height - self.viewport_height)

def test_canvas_buffer():
    print("   [...] Testing Virtual Canvas vs Viewport Sizing...")
    # Standard Viewport (800x600) with High-Res Canvas Buffer (2400x1800)
    arch = CanvasBufferArchitecture(
        viewport_width=800,
        viewport_height=600,
        canvas_buffer_width=2400,
        canvas_buffer_height=1800
    )

    assert arch.requires_horizontal_scrollbar is True
    assert arch.requires_vertical_scrollbar is True
    assert arch.scrollable_x_span == 1600
    assert arch.scrollable_y_span == 1200
    print(f"   [PASS] 1. Viewport: {arch.viewport_width}x{arch.viewport_height} -> Virtual Buffer: {arch.canvas_buffer_width}x{arch.canvas_buffer_height}")
    print(f"   [PASS] 2. Scrollable X span: {arch.scrollable_x_span} px | Scrollable Y span: {arch.scrollable_y_span} px")

def main():
    print("=" * 75)
    print("[VIRTUAL CANVAS] setup() vs screensize() Scrollable Buffer Analysis")
    print("=" * 75)

    test_canvas_buffer()

    print("=" * 75)
    print("[TAKEAWAY] screensize() allocates the total internal drawing resolution,")
    print("           while setup() defines the physical OS viewing window.")
    print("=" * 75)

if __name__ == "__main__":
    main()
