"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 9: Satellite Geostationary Orbit Latency & Link Budget Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import math

class GeostationarySatelliteLink:
    def __init__(self, altitude_km: float = 35786.0):
        self.altitude_km = altitude_km
        self.speed_of_light_km_s = 300000.0  # 3 * 10^5 km/s

    def calculate_one_way_latency_ms(self, elevation_angle_deg: float = 90.0) -> float:
        """
        Calculates one-way propagation delay from Earth station to GEO satellite and back to Earth.
        At zenith (90 deg), slant range = altitude.
        At lower elevation angles, slant range is longer: R = sqrt(h^2 + 2*Re*h + Re^2*sin^2(theta)) - Re*sin(theta)
        """
        # Simplified slant range estimation
        earth_radius_km = 6378.0
        theta_rad = math.radians(elevation_angle_deg)
        slant_range_km = math.sqrt(
            self.altitude_km**2 + 2 * earth_radius_km * self.altitude_km + (earth_radius_km * math.sin(theta_rad))**2
        ) - (earth_radius_km * math.sin(theta_rad))
        
        # 1-hop one-way path: Up to satellite + Down to receiver
        total_distance_km = 2 * slant_range_km
        delay_seconds = total_distance_km / self.speed_of_light_km_s
        return delay_seconds * 1000.0  # Return in ms

    def calculate_round_trip_ping_ms(self, elevation_angle_deg: float = 90.0) -> float:
        """Ping involves: Up -> Down -> Response Up -> Response Down (2 full round-trips)"""
        return 2.0 * self.calculate_one_way_latency_ms(elevation_angle_deg)

def run_satellite_lab():
    print("=" * 70)
    print("SATELLITE COMMUNICATIONS LATENCY & ORBIT CALCULATOR - CBSE CS 083")
    print("=" * 70)

    geo = GeostationarySatelliteLink()
    print(f"Geostationary Orbit Altitude: {geo.altitude_km:,.1f} km above Equator")
    print(f"Speed of Light in Vacuum:    {geo.speed_of_light_km_s:,.0f} km/s")

    angles = [90.0, 45.0, 20.0, 10.0]
    print("\n[Propagation Delay vs Earth Station Dish Elevation Angle]")
    for angle in angles:
        one_way = geo.calculate_one_way_latency_ms(angle)
        ping = geo.calculate_round_trip_ping_ms(angle)
        print(f"  * Elevation Angle {angle:4.1f}°:")
        print(f"      One-way Delay: {one_way:.1f} ms")
        print(f"      Round-Trip Ping Latency: {ping:.1f} ms (~{ping/1000.0:.2f} seconds)")

if __name__ == "__main__":
    run_satellite_lab()