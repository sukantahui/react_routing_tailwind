"""
# Module: 005_001_turtle-foundation
# Topic 6: Rotation control: left(), right(), setheading(), degrees vs angles
# File: angular_normalization_and_polygon_geometry.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Interior vs exterior polygon angles and star polygon turning geometry.
"""

from dataclasses import dataclass

@dataclass
class PolygonGeometrySpec:
    name: str
    sides_count: int
    interior_angle_deg: float
    exterior_turn_angle_deg: float

def compute_regular_polygon_spec(name: str, n: int) -> PolygonGeometrySpec:
    interior = (n - 2) * 180.0 / n
    exterior = 360.0 / n
    return PolygonGeometrySpec(name, n, interior, exterior)

def compute_star_polygon_turn_angle(points: int, density: int = 2) -> float:
    """Computes turning angle for {p/q} star polygon: 360 * density / points."""
    return (360.0 * density) / points

def test_polygon_geometry():
    print("   [...] Testing Interior vs Exterior Polygon Angles & Stars...")
    
    # 1. Equilateral Triangle (N=3)
    tri = compute_regular_polygon_spec("Triangle", 3)
    assert tri.interior_angle_deg == 60.0 and tri.exterior_turn_angle_deg == 120.0
    print(f"   [PASS] 1. {tri.name}: Interior={tri.interior_angle_deg} deg | Turn (Exterior)={tri.exterior_turn_angle_deg} deg")

    # 2. Regular Octagon (N=8)
    octa = compute_regular_polygon_spec("Octagon", 8)
    assert octa.interior_angle_deg == 135.0 and octa.exterior_turn_angle_deg == 45.0
    print(f"   [PASS] 2. {octa.name}: Interior={octa.interior_angle_deg} deg | Turn (Exterior)={octa.exterior_turn_angle_deg} deg")

    # 3. 5-Pointed Star (Pentagram {5/2})
    star_turn = compute_star_polygon_turn_angle(5, 2)
    assert star_turn == 144.0
    print(f"   [PASS] 3. 5-Pointed Star: Tip Turn Angle = {star_turn} deg")

def main():
    print("=" * 75)
    print("[POLYGON GEOMETRY] Interior Angles vs Exterior Turning Angles & Stars")
    print("=" * 75)

    test_polygon_geometry()

    print("=" * 75)
    print("[TAKEAWAY] Turtles always turn by the EXTERIOR angle (180 - interior)")
    print("           to complete a closed polygon traversal.")
    print("=" * 75)

if __name__ == "__main__":
    main()
