"""
Module 003: Emerging Trends in Computing
Topic 7: Internet of Things (IoT) & Smart Ecosystems Simulation
Pure Python Simulation of IoT Multi-Layer Architecture, MQTT Publish/Subscribe, and RFID Tag Verification.
"""

from typing import Dict, List, Any
import time

class IoTEcosystemEngine:
    def __init__(self):
        # Layer 1: Perception Layer (Sensors/Actuators)
        self.temperature_c = 24.0
        self.humidity_pct = 55.0
        self.soil_moisture_pct = 40.0
        self.ac_power_state = "OFF"
        self.irrigation_valve_state = "CLOSED"

        # RFID Database
        self.rfid_database = {
            "TAG_001_TOLL": {"vehicle_no": "DL-01-AB-1234", "owner": "Amit Verma", "fastag_balance": 450.0},
            "TAG_002_TOLL": {"vehicle_no": "WB-02-XY-9876", "owner": "Sunita Roy", "fastag_balance": 80.0},
            "TAG_003_STUDENT": {"id": "CS11-09", "name": "Rohan Gupta", "attendance": "PRESENT"}
        }

    def simulate_telemetry_reading(self, temp: float, humidity: float, soil_moist: float) -> Dict[str, Any]:
        """Senses ambient environment and triggers automated actuator responses."""
        self.temperature_c = temp
        self.humidity_pct = humidity
        self.soil_moisture_pct = soil_moist

        # Automated Smart Decision Rules
        if self.temperature_c > 28.0:
            self.ac_power_state = "ON (Cooling at 22°C)"
        else:
            self.ac_power_state = "STANDBY"

        if self.soil_moisture_pct < 30.0:
            self.irrigation_valve_state = "OPEN (Drip Irrigation Active)"
        else:
            self.irrigation_valve_state = "CLOSED (Optimal Moisture)"

        return {
            "perception_layer": {
                "temperature": f"{self.temperature_c}°C",
                "humidity": f"{self.humidity_pct}%",
                "soil_moisture": f"{self.soil_moisture_pct}%"
            },
            "network_layer": {
                "protocol": "MQTT over TLS / CoAP",
                "broker_ip": "192.168.1.100:1883",
                "topic": "smartcity/home/telemetry"
            },
            "application_layer": {
                "smart_ac_actuator": self.ac_power_state,
                "smart_irrigation_valve": self.irrigation_valve_state
            }
        }

    def process_rfid_scan(self, tag_id: str, toll_amount: float = 65.0) -> Dict[str, Any]:
        """Simulates RFID Tag Reader in FASTag Toll Gates or Attendance Systems."""
        if tag_id not in self.rfid_database:
            return {"status": "FAILED", "reason": "Unregistered RFID Tag Detected", "barrier": "CLOSED"}

        entry = self.rfid_database[tag_id]
        if "fastag_balance" in entry:
            if entry["fastag_balance"] >= toll_amount:
                entry["fastag_balance"] -= toll_amount
                return {
                    "status": "AUTHORIZED",
                    "tag_id": tag_id,
                    "vehicle": entry["vehicle_no"],
                    "owner": entry["owner"],
                    "deducted": f"₹{toll_amount}",
                    "remaining_balance": f"₹{entry['fastag_balance']}",
                    "toll_barrier": "OPEN (Green Signal)"
                }
            else:
                return {
                    "status": "DENIED",
                    "reason": f"Insufficient FASTag Balance (Current: ₹{entry['fastag_balance']})",
                    "toll_barrier": "CLOSED (Red Signal)"
                }
        else:
            return {
                "status": "SUCCESS",
                "type": "Student Smart Card",
                "student_name": entry["name"],
                "attendance_recorded": True
            }

if __name__ == "__main__":
    iot = IoTEcosystemEngine()
    print("=" * 65)
    print("IoT 3-Layer Architecture & Telemetry Cycle Simulation")
    print("=" * 65)

    telemetry = iot.simulate_telemetry_reading(temp=32.5, humidity=68.0, soil_moist=22.0)
    print("Sensed Readings & Automated Actuation Output:")
    for layer, details in telemetry.items():
        print(f"[{layer.upper()}] : {details}")

    print("\n" + "=" * 65)
    print("RFID FASTag Toll Plaza Automated Transaction Simulation")
    print("=" * 65)
    print("Scan Tag 1:", iot.process_rfid_scan("TAG_001_TOLL"))
    print("Scan Tag 2 (Low Balance):", iot.process_rfid_scan("TAG_002_TOLL", 100.0))
    print("Scan Unknown Tag:", iot.process_rfid_scan("TAG_999_UNKNOWN"))
