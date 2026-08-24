# topic1_files/vehicle_fleet_management_system.py
# Module: 003_001_object-oriented-python
# Topic: Classes, Instances & Objects: syntax and lifecycle
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Enterprise Vehicle Fleet Lifecycle Management System
Demonstrates:
  1. Class design for physical asset management (Vehicle class)
  2. Tracking object state transitions (ACTIVE, IN_SERVICE, RETIRED)
  3. Dynamic object lifecycle tracking and maintenance scheduling
"""

from typing import List, Dict

class CommercialVehicle:
    """Class blueprint modeling commercial transport assets."""
    fleet_owner = "Coder & AccoTax Logistics (Barrackpore)"
    total_vehicles_registered = 0

    def __init__(self, registration_no: str, model_name: str, initial_odometer: float = 0.0):
        self.registration_no = registration_no
        self.model_name = model_name
        self.odometer = float(initial_odometer)
        self.status = "ACTIVE"  # ACTIVE, IN_SERVICE, RETIRED
        CommercialVehicle.total_vehicles_registered += 1

    def log_trip(self, distance_km: float) -> None:
        if distance_km <= 0:
            print(f"  [ERROR] Invalid distance: {distance_km} km")
            return
        if self.status != "ACTIVE":
            print(f"  [ERROR] Cannot dispatch vehicle {self.registration_no} - Current Status: {self.status}")
            return
        self.odometer += distance_km
        print(f"  [TRIP LOGGED] {self.registration_no} completed {distance_km:.1f} km. Total Odometer: {self.odometer:,.1f} km")

    def schedule_maintenance(self) -> None:
        self.status = "IN_SERVICE"
        print(f"  [SERVICE] Vehicle {self.registration_no} moved to Maintenance Bay.")

    def release_from_service(self) -> None:
        self.status = "ACTIVE"
        print(f"  [SERVICE] Vehicle {self.registration_no} passed inspection and returned to ACTIVE fleet.")


def run_fleet_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - VEHICLE FLEET LIFECYCLE TRACKER")
    print("=" * 70)
    print(f"Fleet Manager: {CommercialVehicle.fleet_owner}\n")

    # 1. Instantiate fleet objects
    v1 = CommercialVehicle("WB-24-A-1001", "Tata Ace Gold", 15400.0)
    v2 = CommercialVehicle("WB-24-B-2002", "Mahindra Bolero Maxi", 28900.0)

    print(f"Total Fleet Registered: {CommercialVehicle.total_vehicles_registered} vehicles\n")

    # 2. Lifecycle operations
    v1.log_trip(45.5)
    v1.log_trip(120.0)

    v2.schedule_maintenance()
    v2.log_trip(50.0)  # Correctly blocked by lifecycle status
    v2.release_from_service()
    v2.log_trip(50.0)  # Allowed now

    print("\n[PASSED] Fleet Lifecycle Simulation Complete.")


if __name__ == "__main__":
    run_fleet_demo()
