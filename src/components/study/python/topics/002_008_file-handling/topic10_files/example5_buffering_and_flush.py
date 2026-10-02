"""
Topic 10 - Example 5: Python I/O Buffering, file.flush(), and Crash Resilience
Module: 002_008_file-handling
Institute: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui

Key Concepts Covered:
1. Python buffers file writes in RAM before committing to physical disk.
2. file.flush() forces buffered user-space data to be passed to the OS kernel.
3. os.fsync(file.fileno()) forces the OS kernel to flush dirty pages to physical drive.
4. Why long-running servers and background telemetry daemons need periodic flushing.
5. What happens if a process crashes before buffer is flushed.
"""

import os
import time

def simulate_realtime_iot_telemetry():
    filename = "jadavpur_sensor_telemetry.log"
    
    print(f"[*] Simulating real-time sensor logging to '{filename}' with .flush()...")
    
    with open(filename, mode="w", encoding="utf-8") as file:
        file.write("--- JADAVPUR UNIVERSITY IOT TELEMETRY FEED ---\n")
        # Flush the header immediately
        file.flush()
        
        sensor_readings = [
            {"sensor": "TEMP_BKP_01", "val": 28.4, "unit": "°C"},
            {"sensor": "HUMID_BKP_01", "val": 74.2, "unit": "%"},
            {"sensor": "AIR_KOL_02", "val": 142.0, "unit": "AQI"},
            {"sensor": "TEMP_JAD_03", "val": 29.1, "unit": "°C"},
            {"sensor": "SOLAR_ICH_04", "val": 845.0, "unit": "W/m²"}
        ]
        
        for reading in sensor_readings:
            timestamp = time.strftime("%H:%M:%S")
            line = f"[{timestamp}] Sensor: {reading['sensor']} | Value: {reading['val']} {reading['unit']}\n"
            file.write(line)
            
            # CRUCIAL STEP IN CRITICAL LOGGING:
            # Without file.flush(), data stays in RAM buffer until buffer fills (usually 4KB / 8KB)
            # or until the file is closed.
            # file.flush() ensures anyone reading the file concurrently sees the latest data immediately!
            file.flush()
            
            # Optional: Guarantee hardware-level write (used in banking / medical systems)
            os.fsync(file.fileno())
            
            print(f"    [+] Logged & flushed: {reading['sensor']} ({reading['val']} {reading['unit']})")
            time.sleep(0.01)
            
    print(f"\n[✓] Telemetry logging session finished. File safely closed.")
    
    # Verify file size on disk
    size_on_disk = os.path.getsize(filename)
    print(f"[*] Total file size on disk: {size_on_disk} bytes")

if __name__ == "__main__":
    simulate_realtime_iot_telemetry()
