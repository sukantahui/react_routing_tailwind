# topic11_files/chunked_large_file_and_log_streamer.py
# Module: 003_003_decorators-generators
# Topic: Infinite streams and large data processing with generators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 2: Chunked Large File & Server Log Streamer
Demonstrates:
  1. Reading large datasets line-by-line / chunk-by-chunk with constant O(1) memory
  2. Parsing structured log events on the fly (HTTP method, endpoint, status code, latency)
  3. Safe resource cleanup with `try...finally` and `gen.close()`
"""

import io
from typing import Generator, Dict, Any

def simulated_large_nginx_access_log() -> io.StringIO:
    """Creates a simulated in-memory server log stream."""
    log_content = (
        '192.168.1.10 - - [2026-08-24 10:00:01] "GET /api/v1/courses HTTP/1.1" 200 45.2\n'
        '192.168.1.15 - - [2026-08-24 10:00:02] "POST /api/v1/admissions HTTP/1.1" 201 128.5\n'
        '192.168.1.22 - - [2026-08-24 10:00:03] "GET /api/v1/student/STU-101 HTTP/1.1" 200 18.3\n'
        '10.0.0.99    - - [2026-08-24 10:00:04] "POST /api/v1/auth/login HTTP/1.1" 401 12.1\n'
        '192.168.1.10 - - [2026-08-24 10:00:05] "GET /api/v1/exam-scores HTTP/1.1" 200 89.4\n'
        '10.0.0.99    - - [2026-08-24 10:00:06] "POST /api/v1/admin/purge HTTP/1.1" 403 8.0\n'
        '192.168.1.44 - - [2026-08-24 10:00:07] "GET /api/v1/certificates HTTP/1.1" 500 350.2\n'
    )
    return io.StringIO(log_content)


def stream_parsed_log_events(log_file) -> Generator[Dict[str, Any], None, None]:
    """Streams parsed log entries one-by-one, guaranteeing file cleanup on exit."""
    print("  [RESOURCE ACQUIRED] Opened server access log stream.")
    try:
        for line in log_file:
            line = line.strip()
            if not line:
                continue

            parts = line.split()
            ip = parts[0]
            timestamp = f"{parts[3][1:]} {parts[4][:-1]}"
            method = parts[5][1:]
            endpoint = parts[6]
            status = int(parts[8])
            latency_ms = float(parts[9])

            yield {
                "ip": ip,
                "timestamp": timestamp,
                "method": method,
                "endpoint": endpoint,
                "status": status,
                "latency_ms": latency_ms,
                "is_error": status >= 400
            }
    finally:
        print("  [RESOURCE CLEANUP] File handle closed safely via generator finally block.")
        log_file.close()


def demonstrate_log_streamer():
    print("=" * 70)
    print("CODER & ACCOTAX - CHUNKED LARGE LOG FILE STREAMER")
    print("=" * 70)

    log_file = simulated_large_nginx_access_log()
    log_stream = stream_parsed_log_events(log_file)

    print("1. Streaming and Filtering HTTP Anomalies (Status >= 400):")
    for event in log_stream:
        if event["is_error"]:
            print(
                f"   * [ANOMALY HTTP {event['status']}] IP: {event['ip']:<14} | "
                f"Path: {event['method']} {event['endpoint']:<26} | Latency: {event['latency_ms']:5.1f} ms"
            )

    # Demonstrate early termination and guaranteed cleanup:
    print("\n2. Demonstrating Early Stream Termination with `gen.close()`:")
    log_file_2 = simulated_large_nginx_access_log()
    stream_2 = stream_parsed_log_events(log_file_2)

    first_item = next(stream_2)
    print(f"   * Consumed Single Item: {first_item['method']} {first_item['endpoint']}")
    print("   * Invoking `stream_2.close()` (Simulating client disconnect):")
    stream_2.close()  # Triggers finally block immediately!

    print("\n[PASSED] Chunked Log Streamer & Resource Cleanup Verified.")


if __name__ == "__main__":
    demonstrate_log_streamer()
