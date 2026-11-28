"""
CBSE Class 12 Computer Science - Computer Networks
Topic 2: Communication Channel Capacity, Bandwidth & Transmission Time Calculator
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def calculate_analog_bandwidth(f_min_hz, f_max_hz):
    bw = f_max_hz - f_min_hz
    print(f"Analog Channel: f_min={f_min_hz} Hz, f_max={f_max_hz} Hz")
    print(f"Analog Bandwidth = {bw:,} Hz ({bw/1000:.2f} KHz)\n")
    return bw

def calculate_transmission_time(file_size_mb, bandwidth_mbps):
    print("--- DIGITAL TRANSMISSION TIME CALCULATION ---")
    total_bytes = file_size_mb * 1_000_000
    total_bits = total_bytes * 8
    bandwidth_bps = bandwidth_mbps * 1_000_000
    
    time_seconds = total_bits / bandwidth_bps
    
    print(f"File Size        : {file_size_mb} MB ({total_bytes:,.0f} Bytes)")
    print(f"Total Bits       : {total_bits:,.0f} bits (File Size x 8)")
    print(f"Channel Speed    : {bandwidth_mbps} Mbps ({bandwidth_bps:,.0f} bps)")
    print(f"Calculated Time  : {time_seconds:.2f} seconds")
    return time_seconds

if __name__ == "__main__":
    calculate_analog_bandwidth(f_min_hz=300, f_max_hz=3400)
    calculate_transmission_time(file_size_mb=20, bandwidth_mbps=16)
    calculate_transmission_time(file_size_mb=100, bandwidth_mbps=100)