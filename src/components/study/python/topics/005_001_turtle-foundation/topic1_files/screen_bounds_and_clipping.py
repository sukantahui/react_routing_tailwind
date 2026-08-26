"""
# Module: 005_001_turtle-foundation
# Topic 1: Understanding the Turtle screen: canvas, coordinate system (Cartesian plane), origin (0,0), and quadrants
# File: screen_bounds_and_clipping.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Canvas dimensions, boundary calculations, and collision checkers.
"""

from dataclasses import dataclass

@dataclass
class ScreenBoundaryAuditor:
    window_width: int = 800
    window_height: int = 600

    @property
    def x_min(self) -> float:
        return -self.window_width / 2.0

    @property
    def x_max(self) -> float:
        return self.window_width / 2.0

    @property
    def y_min(self) -> float:
        return -self.window_height / 2.0

    @property
    def y_max(self) -> float:
        return self.window_height / 2.0

    def is_point_visible(self, x: float, y: float) -> bool:
        return (self.x_min <= x <= self.x_max) and (self.y_min <= y <= self.y_max)

def test_screen_boundaries():
    print("   [...] Testing Screen Bounds & Viewport Visibility...")
    auditor = ScreenBoundaryAuditor(window_width=800, window_height=600)

    assert auditor.x_min == -400.0 and auditor.x_max == 400.0
    assert auditor.y_min == -300.0 and auditor.y_max == 300.0
    print(f"   [PASS] 1. X bounds: [{auditor.x_min}, {auditor.x_max}] | Y bounds: [{auditor.y_min}, {auditor.y_max}]")

    # Visible points
    assert auditor.is_point_visible(0.0, 0.0) is True
    assert auditor.is_point_visible(350.0, 250.0) is True
    assert auditor.is_point_visible(-390.0, -290.0) is True
    print("   [PASS] 2. In-bounds coordinates verified")

    # Off-screen points
    assert auditor.is_point_visible(450.0, 100.0) is False
    assert auditor.is_point_visible(-100.0, -350.0) is False
    print("   [PASS] 3. Off-screen coordinates correctly detected for clipping")

def main():
    print("=" * 75)
    print("[SCREEN BOUNDS] Viewport Dimension Analysis & Clipping Detection")
    print("=" * 75)

    test_screen_boundaries()

    print("=" * 75)
    print("[TAKEAWAY] Centered origin (0, 0) means coordinate limits equal +/- half")
    print("           the total window width and height.")
    print("=" * 75)

if __name__ == "__main__":
    main()
