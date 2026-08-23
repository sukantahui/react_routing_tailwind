"""
Network Sensor Deployment Simulator: Hardware TAP vs Switch SPAN vs Inline IPS
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_002 (Topic 5)
"""

from dataclasses import dataclass
from typing import Dict, List, Tuple

@dataclass
class NetworkLinkLoad:
    tx_throughput_gbps: float
    rx_throughput_gbps: float
    switch_cpu_utilization_percent: float
    has_malformed_crc_packets: bool

class DeploymentModeSimulator:
    def __init__(self):
        pass

    def evaluate_switch_span(self, link: NetworkLinkLoad, span_port_capacity_gbps: float = 10.0) -> Dict[str, any]:
        """Evaluates packet capture fidelity on a Switch SPAN / Mirror Port."""
        aggregate_traffic = link.tx_throughput_gbps + link.rx_throughput_gbps
        
        # Calculate oversubscription drop percentage
        if aggregate_traffic > span_port_capacity_gbps:
            dropped_bandwidth = aggregate_traffic - span_port_capacity_gbps
            drop_percentage = (dropped_bandwidth / aggregate_traffic) * 100.0
        else:
            drop_percentage = 0.0

        # High switch CPU causes additional internal packet drops
        if link.switch_cpu_utilization_percent > 80.0:
            cpu_drop = (link.switch_cpu_utilization_percent - 80.0) * 0.5
            drop_percentage = min(100.0, drop_percentage + cpu_drop)

        return {
            "mode": "SWITCH_SPAN_PORT",
            "aggregate_offered_gbps": round(aggregate_traffic, 2),
            "span_capacity_gbps": span_port_capacity_gbps,
            "packet_drop_percentage": round(drop_percentage, 2),
            "malformed_crc_captured": False if link.has_malformed_crc_packets else True,
            "added_line_latency_us": 0.0,
            "switch_cpu_overhead": "+12% to +20%",
            "verdict": "⚠️ SEVERE PACKET DROPS (Oversubscription Loss)" if drop_percentage > 5.0 else "✔ SPAN CAPTURE OK"
        }

    def evaluate_optical_tap(self, link: NetworkLinkLoad, split_ratio: str = "70/30") -> Dict[str, any]:
        """Evaluates packet capture fidelity on a Hardware Passive Optical TAP."""
        insertion_loss_db = 1.8 if split_ratio == "70/30" else 3.4
        
        return {
            "mode": "HARDWARE_OPTICAL_TAP",
            "split_ratio": split_ratio,
            "production_insertion_loss_db": f"{insertion_loss_db} dB",
            "packet_drop_percentage": 0.0,  # Physical splitting never drops packets
            "malformed_crc_captured": True, # Physical layer captures raw electrical/optical frames
            "added_line_latency_us": 0.0,
            "switch_cpu_overhead": "0% (Zero Switch Impact)",
            "verdict": "✔ 100% LINE-RATE FORENSIC CAPTURE (Zero Packet Drop)"
        }

    def evaluate_inline_ips(self, link: NetworkLinkLoad, bypass_enabled: bool = True) -> Dict[str, any]:
        """Evaluates in-line active IPS placement."""
        aggregate_traffic = max(link.tx_throughput_gbps, link.rx_throughput_gbps)
        
        return {
            "mode": "INLINE_ACTIVE_IPS",
            "aggregate_traffic_gbps": round(aggregate_traffic, 2),
            "packet_drop_percentage": 0.0,
            "added_line_latency_us": 18.5,
            "threat_mitigation": "ACTIVE_INLINE_DROPPING_ENABLED",
            "hardware_bypass_state": "FAIL_OPEN_OPTICAL_RELAY_ACTIVE" if bypass_enabled else "SINGLE_POINT_OF_FAILURE_RISK",
            "verdict": "🛡️ ACTIVE INLINE PROTECTION (+18.5 µs Wire Latency)"
        }

# Execution Test Harness
if __name__ == "__main__":
    sim = DeploymentModeSimulator()
    print("=== Network Sensor Deployment Fidelity Simulator ===")

    # Scenario: 10 Gbps Full-Duplex Link under 80% Load (8 Gbps TX + 7 Gbps RX = 15 Gbps Aggregate)
    heavy_load = NetworkLinkLoad(
        tx_throughput_gbps=8.0,
        rx_throughput_gbps=7.0,
        switch_cpu_utilization_percent=85.0,
        has_malformed_crc_packets=True
    )

    print("\n--- 1. Switch SPAN Port on 10 Gbps Destination Port ---")
    span_res = sim.evaluate_switch_span(heavy_load, span_port_capacity_gbps=10.0)
    print(f"Offered Load    : {span_res['aggregate_offered_gbps']} Gbps -> SPAN Port: {span_res['span_capacity_gbps']} Gbps")
    print(f"Packet Drop Rate: {span_res['packet_drop_percentage']}%")
    print(f"Verdict         : {span_res['verdict']}")

    print("\n--- 2. Passive Optical Hardware TAP (70/30 Split) ---")
    tap_res = sim.evaluate_optical_tap(heavy_load, split_ratio="70/30")
    print(f"Packet Drop Rate: {tap_res['packet_drop_percentage']}% (100% Line Rate)")
    print(f"Switch CPU Load : {tap_res['switch_cpu_overhead']}")
    print(f"Verdict         : {tap_res['verdict']}")
