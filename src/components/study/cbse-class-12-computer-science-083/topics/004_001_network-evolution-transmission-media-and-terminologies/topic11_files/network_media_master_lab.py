"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Segment 4 Module 1: Comprehensive Network Evolution & Transmission Media Master Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import math

class NetworkMediaMasterLab:
    @staticmethod
    def file_transfer_calculator(file_size_mb: float, transfer_rate_mbps: float) -> dict:
        """Calculates exact time to transfer a file over a given network channel."""
        file_size_bits = file_size_mb * 8.0 * 1024.0 * 1024.0
        channel_rate_bps = transfer_rate_mbps * 1e6
        transfer_time_sec = file_size_bits / channel_rate_bps
        return {
            "file_size_mb": file_size_mb,
            "transfer_rate_mbps": transfer_rate_mbps,
            "time_seconds": round(transfer_time_sec, 3),
            "time_minutes": round(transfer_time_sec / 60.0, 2)
        }

    @staticmethod
    def fiber_tir_evaluator(n_core: float, n_cladding: float, incident_angle_deg: float) -> dict:
        """Evaluates Total Internal Reflection inside an optical fiber."""
        if n_cladding >= n_core:
            return {"error": "Core index must be strictly greater than cladding index."}
        crit_angle_deg = math.degrees(math.asin(n_cladding / n_core))
        tir = incident_angle_deg > crit_angle_deg
        return {
            "critical_angle_deg": round(crit_angle_deg, 2),
            "incident_angle_deg": incident_angle_deg,
            "total_internal_reflection": tir,
            "status": "GUIDED THROUGH CORE" if tir else "LEAKED INTO CLADDING"
        }

    @staticmethod
    def microwave_horizon_distance(tower_height_m: float) -> float:
        """Horizon distance (km) for a tower of height h meters over Earth curvature."""
        return 3.57 * math.sqrt(tower_height_m)

    @staticmethod
    def geo_satellite_latency_ms() -> float:
        """Round trip propagation latency to Geostationary orbit (35,786 km)."""
        altitude_km = 35786.0
        c_km_s = 300000.0
        one_way = (2 * altitude_km) / c_km_s
        return round(one_way * 1000.0, 1)

def run_all_demonstrations():
    print("=" * 75)
    print("CBSE CLASS 12 COMPUTER SCIENCE - NETWORKS MASTER LABORATORY SUITE")
    print("=" * 75)

    lab = NetworkMediaMasterLab()

    # 1. Transfer Time Calculation
    print("\n[1. Network Data Transfer Time Calculation]")
    res1 = lab.file_transfer_calculator(file_size_mb=250.0, transfer_rate_mbps=50.0)
    print(f"  * 250 MB file across a 50 Mbps broadband connection:")
    print(f"      Time: {res1['time_seconds']} seconds ({res1['time_minutes']} minutes)")

    # 2. Fiber Optic TIR Test
    print("\n[2. Optical Fiber Total Internal Reflection Verification]")
    res2 = lab.fiber_tir_evaluator(n_core=1.48, n_cladding=1.46, incident_angle_deg=82.0)
    print(f"  * Core n1=1.48, Cladding n2=1.46, Angle=82.0°:")
    print(f"      Critical Angle: {res2['critical_angle_deg']}° -> Status: {res2['status']}")

    # 3. Microwave Tower Horizon
    print("\n[3. Microwave Tower Line-of-Sight Distance]")
    h = 45.0
    horizon = lab.microwave_horizon_distance(h)
    print(f"  * Microwave tower of height {h}m has a geometric horizon of: {horizon:.2f} km")
    print(f"      Two identical 45m towers can be separated by up to: {2 * horizon:.2f} km")

    # 4. Satellite Delay
    print("\n[4. Geostationary Satellite Round-Trip Latency]")
    lat = lab.geo_satellite_latency_ms()
    print(f"  * GEO Orbit (35,786 km) One-Way Latency: {lat} ms (Round-Trip: {2 * lat} ms)")

if __name__ == "__main__":
    run_all_demonstrations()