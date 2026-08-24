# topic7_files/smart_thermostat_and_energy_monitor.py
# Module: 003_001_object-oriented-python
# Topic: Properties & Getters/Setters with @property
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 4: Smart Server Room Thermostat & Energy Monitor (Case Study)
Demonstrates:
  1. Bi-directional property conversions: Celsius <-> Fahrenheit
  2. Range validation and thermal emergency protections
  3. Dynamic power consumption calculations and HVAC status indicators
"""

class ServerRoomThermostat:
    """Enterprise HVAC & Server Room Climate Controller."""
    institute = "Coder & AccoTax Data Center (Barrackpore)"
    MIN_SAFE_CELSIUS = 10.0
    MAX_SAFE_CELSIUS = 35.0

    def __init__(self, target_celsius: float = 22.0):
        self._operational_mode = "AUTO_ECO"
        # Trigger setter validation:
        self.celsius = target_celsius

    # =================================================================
    # 1. CELSIUS PROPERTY (Internal Canonical Storage)
    # =================================================================
    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float):
        if not (-50.0 <= value <= 100.0):
            raise ValueError(f"Temperature {value} C is outside physical hardware limits (-50 C to 100 C)!")
        self._celsius = float(value)

    # =================================================================
    # 2. FAHRENHEIT PROPERTY (Bi-Directional Converter)
    # =================================================================
    @property
    def fahrenheit(self) -> float:
        """Dynamically converts internal Celsius to Fahrenheit."""
        return (self._celsius * 9 / 5) + 32

    @fahrenheit.setter
    def fahrenheit(self, value: float):
        """Converts incoming Fahrenheit back to internal canonical Celsius."""
        converted_celsius = (value - 32) * 5 / 9
        self.celsius = converted_celsius  # Routes through celsius setter validation!

    # =================================================================
    # 3. COMPUTED POWER CONSUMPTION PROPERTY
    # =================================================================
    @property
    def power_consumption_watts(self) -> float:
        """Computes HVAC cooling load based on deviation from ambient 25 C."""
        ambient_c = 25.0
        delta = abs(ambient_c - self._celsius)
        base_idle_power = 150.0  # Watts
        return base_idle_power + (delta * 85.0)

    @property
    def is_thermal_hazard(self) -> bool:
        """Dynamic boolean property alerting if server room is too hot."""
        return self._celsius > self.MAX_SAFE_CELSIUS

    def get_telemetry_report(self) -> str:
        status = "CRITICAL OVERHEAT ALERT" if self.is_thermal_hazard else "OPTIMAL RUNNING"
        return (
            f"======================================================================\n"
            f"CODER & ACCOTAX - SERVER CLIMATE TELEMETRY\n"
            f"Location    : {self.institute}\n"
            f"Temperature : {self.celsius:.1f} C | {self.fahrenheit:.1f} F\n"
            f"Power Load  : {self.power_consumption_watts:.1f} Watts\n"
            f"Status      : {status}\n"
            f"======================================================================"
        )


def run_thermostat_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - SMART THERMOSTAT CASE STUDY")
    print("=" * 70)

    t = ServerRoomThermostat(21.0)
    print(t.get_telemetry_report())

    # 1. Mutate via Fahrenheit setter
    print("\n1. Updating temperature to 77.0 F via Fahrenheit setter:")
    t.fahrenheit = 77.0
    print(f"   Internal Canonical Celsius: {t.celsius:.1f} C (Fahrenheit: {t.fahrenheit:.1f} F)\n")

    # 2. Overheat condition
    print("2. Simulating server load spike (38.0 C):")
    t.celsius = 38.0
    print(t.get_telemetry_report())

    print("[PASSED] Smart Thermostat & Energy Telemetry Suite Completed.")


if __name__ == "__main__":
    run_thermostat_demo()
