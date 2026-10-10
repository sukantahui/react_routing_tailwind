"""
Module 003: Emerging Trends in Computing
Topic 6: Big Data Characteristics & The 5 Vs Simulation
Pure Python Analytics Simulator Modeling Volume, Velocity, Variety, Veracity, and Value Extraction.
"""

from typing import Dict, List, Any
import json
import time

class BigData5VEngine:
    """Models the 5 fundamental V characteristics of modern Big Data systems."""

    def __init__(self):
        # 1. Volume Scale Definition (Bytes)
        self.scale_tiers = {
            "Kilobyte (KB)": 10**3,
            "Megabyte (MB)": 10**6,
            "Gigabyte (GB)": 10**9,
            "Terabyte (TB)": 10**12,
            "Petabyte (PB)": 10**15,
            "Exabyte (EB)": 10**18,
            "Zettabyte (ZB)": 10**21,
            "Yottabyte (YB)": 10**24
        }
        
        # 2. Variety Formats
        self.variety_samples = {
            "Structured": "Relational SQL Table records (RollNo, Name, Marks, Grade)",
            "Semi-Structured": "JSON / XML API payloads with dynamic tags and nested objects",
            "Unstructured": "Raw YouTube MP4 video streams, audio recordings, JPEG satellite photos"
        }

    def simulate_ingestion_velocity(self, stream_type: str, events_per_sec: int) -> Dict[str, Any]:
        """Calculates throughput velocity and storage accumulation over time."""
        avg_event_bytes = 512 # 512 bytes per JSON telemetry event
        bytes_per_second = events_per_sec * avg_event_bytes
        mb_per_hour = (bytes_per_second * 3600) / (1024 * 1024)
        gb_per_day = (mb_per_hour * 24) / 1024
        tb_per_year = (gb_per_day * 365) / 1024

        return {
            "stream_type": stream_type,
            "velocity_rate": f"{events_per_sec:,} events/second",
            "bandwidth": f"{(bytes_per_second / 1024):.2f} KB/s",
            "accumulation": {
                "per_hour": f"{mb_per_hour:.2f} MB",
                "per_day": f"{gb_per_day:.2f} GB",
                "per_year": f"{tb_per_year:.2f} TB"
            }
        }

    def evaluate_veracity(self, raw_records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Evaluates data veracity (cleanliness, missing values, anomalies)."""
        total = len(raw_records)
        clean_count = 0
        corrupted_count = 0
        missing_fields_count = 0

        for r in raw_records:
            if r.get("id") is None or r.get("value") is None:
                missing_fields_count += 1
            elif not isinstance(r.get("value"), (int, float)) or r.get("value") < 0:
                corrupted_count += 1
            else:
                clean_count += 1

        veracity_pct = (clean_count / total) * 100 if total > 0 else 0.0
        return {
            "total_records": total,
            "valid_clean_records": clean_count,
            "corrupted_records": corrupted_count,
            "missing_fields": missing_fields_count,
            "veracity_score": f"{veracity_pct:.1f}%",
            "data_trust_level": "High" if veracity_pct >= 90 else "Medium" if veracity_pct >= 70 else "Low (Requires Cleaning)"
        }

    def extract_business_value(self, category_sales: Dict[str, float]) -> Dict[str, Any]:
        """Converts raw high-volume data into actionable business intelligence value."""
        total_revenue = sum(category_sales.values())
        top_category = max(category_sales, key=category_sales.get)
        top_share = (category_sales[top_category] / total_revenue) * 100

        return {
            "total_revenue": f"₹{total_revenue:,.2f}",
            "top_performer": top_category,
            "top_performer_share": f"{top_share:.1f}%",
            "strategic_insight": f"Prioritize inventory allocation for '{top_category}' which contributes {top_share:.1f}% of total gross merchandise volume."
        }

if __name__ == "__main__":
    engine = BigData5VEngine()
    print("=" * 65)
    print("Big Data 5 Vs Simulation (Volume, Velocity, Variety, Veracity, Value)")
    print("=" * 65)

    # Velocity simulation
    telemetry_vel = engine.simulate_ingestion_velocity("IoT Smart Grid Telemetry", 50000)
    print(f"\n1. VELOCITY SIMULATION:")
    print(json.dumps(telemetry_vel, indent=2))

    # Veracity simulation
    raw_data = [
        {"id": 101, "value": 45.2},
        {"id": 102, "value": -99.0}, # Corrupted negative
        {"id": 103, "value": 88.1},
        {"id": None, "value": 12.0}, # Missing ID
        {"id": 105, "value": 67.4}
    ]
    veracity = engine.evaluate_veracity(raw_data)
    print(f"\n2. VERACITY EVALUATION:")
    print(json.dumps(veracity, indent=2))

    # Value extraction
    sales = {"Laptops": 4500000.0, "Smartphones": 8900000.0, "Accessories": 1200000.0}
    val = engine.extract_business_value(sales)
    print(f"\n3. VALUE CONVERSION (Actionable Insight):")
    print(json.dumps(val, indent=2))
