"""
01_sensor_data_pipeline_creation.py
===================================
Worked Example 1: Ingesting & Structuring IoT Sensor Stream into 3D Batch Tensors
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 1: IOT SENSOR DATA INGESTION & 3D RESHAPING")
    print("=" * 70)

    # Problem Statement:
    # A Barrackpore weather station records 3 sensors: [Temperature, Humidity, AQI]
    # every hour (24 hours/day) for 7 days.
    # The sensor telemetry arrives as a continuous 1D raw stream of 7 * 24 * 3 = 504 float values.
    
    total_days = 7
    hours_per_day = 24
    num_sensors = 3
    total_readings = total_days * hours_per_day * num_sensors  # 504

    # 1. Simulate Raw 1D Stream Ingestion using np.linspace & arange
    raw_stream = np.linspace(start=10.0, stop=95.0, num=total_readings)
    print(f"1. Raw Ingested Stream: Shape {raw_stream.shape}, Total Elements: {raw_stream.size}")
    print("   First 6 raw readings:", np.round(raw_stream[:6], 2))

    # 2. Reshape into 3D Structured Tensor (Days, Hours, Sensors)
    # Shape: (7, 24, 3)
    sensor_tensor = raw_stream.reshape((total_days, hours_per_day, num_sensors))
    print(f"\n2. Structured 3D Sensor Tensor Shape: {sensor_tensor.shape}")
    print(f"   Dimensions (ndim): {sensor_tensor.ndim}")
    print(f"   Memory layout flags:\n     C_CONTIGUOUS: {sensor_tensor.flags.c_contiguous}")

    # 3. Querying Subsets:
    # Day 0, Hour 12 (Noon), All 3 Sensors
    day0_noon = sensor_tensor[0, 12, :]
    print(f"\n3. Day 1 Noon Readings [Temp, Humidity, AQI]: {np.round(day0_noon, 2)}")

    # Extract all 7 days for Sensor 0 (Temperature) across 24 hours -> (7, 24)
    all_temp_grid = sensor_tensor[:, :, 0]
    print(f"4. 7-Day Temperature Matrix Shape: {all_temp_grid.shape} (Days x Hours)")

    # 4. Flattening back for downstream batch ML inference
    # Reshape to (N_samples=168 hours, 3 features)
    batch_features = sensor_tensor.reshape(-1, num_sensors)
    print(f"5. Downstream ML 2D Batch Shape: {batch_features.shape} (168 hourly samples, 3 features)")
    assert batch_features.shape == (168, 3)

if __name__ == "__main__":
    main()
