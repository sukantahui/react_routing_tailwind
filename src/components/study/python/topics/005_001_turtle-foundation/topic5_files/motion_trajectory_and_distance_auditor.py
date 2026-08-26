"""
# Module: 005_001_turtle-foundation
# Topic 5: Movement fundamentals: forward(), backward(), distance control and precision
# File: motion_trajectory_and_distance_auditor.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Tracking cumulative linear path distance and odometer telemetry.
"""

from dataclasses import dataclass

@dataclass
class OdometerTracker:
    total_distance_traveled: float = 0.0
    steps_count: int = 0

    def record_step(self, distance: float):
        self.total_distance_traveled += abs(distance)
        self.steps_count += 1

def test_odometer_tracking():
    print("   [...] Testing Odometer Path Distance Accumulator...")
    odometer = OdometerTracker()

    # Move forward 100, backward 50, forward 80
    odometer.record_step(100.0)
    odometer.record_step(-50.0) # Backward 50 contributes +50 to total distance
    odometer.record_step(80.0)

    assert odometer.steps_count == 3
    assert odometer.total_distance_traveled == 230.0
    print(f"   [PASS] 1. Recorded {odometer.steps_count} steps -> Cumulative Odometer: {odometer.total_distance_traveled} units")

def main():
    print("=" * 75)
    print("[ODOMETER TELEMETRY] Cumulative Linear Distance Traveled Tracking")
    print("=" * 75)

    test_odometer_tracking()

    print("=" * 75)
    print("[TAKEAWAY] Accumulating absolute step lengths provides exact vehicle")
    print("           odometer metrics for robotics and physics simulations.")
    print("=" * 75)

if __name__ == "__main__":
    main()
