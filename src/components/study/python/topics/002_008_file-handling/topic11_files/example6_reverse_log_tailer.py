"""
================================================================================
Topic 11 - Example 6: High-Performance Reverse Log Tailer with seek()
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Unix 'tail -n 10' can be implemented efficiently in Python using binary seek().
2. Instead of loading an entire 5GB log file into RAM, we seek backwards from EOF
   in small chunks (e.g., 1024 bytes) until we find the required number of newlines.
3. Memory consumption remains O(1) regardless of total file size on disk.
"""

import os

def tail_file(filename, n_lines=3, chunk_size=64):
    """
    Reads the last `n_lines` lines of a file without reading the whole file into RAM.
    """
    lines_found = []
    buffer = bytearray()
    
    with open(filename, "rb") as f:
        # Get total file size
        f.seek(0, os.SEEK_END)
        file_size = f.tell()
        cursor_pos = file_size
        
        while cursor_pos > 0 and len(lines_found) <= n_lines:
            read_size = min(chunk_size, cursor_pos)
            cursor_pos -= read_size
            f.seek(cursor_pos)
            
            chunk = f.read(read_size)
            buffer = chunk + buffer
            
            # Split lines in accumulated buffer
            lines = buffer.split(b"\n")
            if len(lines) > n_lines:
                lines_found = [line.decode("utf-8") for line in lines[-n_lines:] if line]
                break
                
        if not lines_found:
            lines_found = [line.decode("utf-8") for line in buffer.split(b"\n") if line]
            
    return lines_found[-n_lines:]

def demonstrate_reverse_tail():
    filename = "server_system.log"
    
    # 1. Create a simulated log file
    sample_logs = [
        "[2026-10-02 08:00:00] [INFO] Server started at Barrackpore data center",
        "[2026-10-02 08:15:30] [INFO] User Mamata logged in from IP 192.168.1.5",
        "[2026-10-02 08:30:10] [INFO] Database backup completed (Size: 45MB)",
        "[2026-10-02 08:45:00] [WARN] Memory utilization reached 78%",
        "[2026-10-02 09:00:15] [CRITICAL] Connection timeout on Payment Gateway",
        "[2026-10-02 09:05:00] [ALERT] Automatic recovery initiated successfully",
        "[2026-10-02 09:10:22] [INFO] All services operating at optimal latency"
    ]
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write("\n".join(sample_logs) + "\n")
        
    print(f"[*] Generated log file with {len(sample_logs)} entries.")
    
    # 2. Reverse tail the last 3 log entries
    print("\n--- Tail -3 Output (Read Backwards from EOF) ---")
    last_3_lines = tail_file(filename, n_lines=3)
    for i, line in enumerate(last_3_lines, start=1):
        print(f"    [{i}] {line}")

if __name__ == "__main__":
    demonstrate_reverse_tail()
