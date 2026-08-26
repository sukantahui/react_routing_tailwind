"""
# Module: 005_001_turtle-foundation
# Topic 5: Movement fundamentals: forward(), backward(), distance control and precision
# File: institutional_linear_robotics_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Robotic dispatch shuttle simulation delivering assignments
#              between student labs across Barrackpore and Kolkata.
"""

from dataclasses import dataclass

@dataclass
class CampusDispatchShuttle:
    shuttle_name: str
    current_station: str
    odometer_km: float = 0.0

    def dispatch_forward(self, destination: str, distance_km: float) -> str:
        self.odometer_km += distance_km
        self.current_station = destination
        return f"[SHUTTLE DISPATCH] '{self.shuttle_name}' moved {distance_km} km forward to {destination}. Total Odometer: {self.odometer_km} km"

    def return_backward(self, origin: str, distance_km: float) -> str:
        self.odometer_km += distance_km
        self.current_station = origin
        return f"[SHUTTLE RETURN] '{self.shuttle_name}' reversed {distance_km} km backward to {origin}. Total Odometer: {self.odometer_km} km"

def test_linear_robotics_shuttle():
    print("   [...] Running Institutional Campus Shuttle Dispatch Test...")
    shuttle = CampusDispatchShuttle("Barrackpore-Kolkata Express", "Barrackpore Central Hub")

    # 1. Forward to Kolkata (25 km)
    log1 = shuttle.dispatch_forward("Kolkata Tech Hub (Mahima)", 25.0)
    print(f"   [PASS] 1. {log1}")
    assert shuttle.current_station == "Kolkata Tech Hub (Mahima)"
    assert shuttle.odometer_km == 25.0

    # 2. Reverse return to Barrackpore (25 km)
    log2 = shuttle.return_backward("Barrackpore Central Hub (Mamata)", 25.0)
    print(f"   [PASS] 2. {log2}")
    assert shuttle.current_station == "Barrackpore Central Hub (Mamata)"
    assert shuttle.odometer_km == 50.0

def main():
    print("=" * 80)
    print("[CASE STUDY] Autonomous Campus Dispatch Shuttle Simulation")
    print("=" * 80)

    test_linear_robotics_shuttle()

    print("=" * 80)
    print("[TAKEAWAY] Linear forward and backward displacement accurately models")
    print("           real-world industrial automated guided vehicles (AGVs).")
    print("=" * 80)

if __name__ == "__main__":
    main()
