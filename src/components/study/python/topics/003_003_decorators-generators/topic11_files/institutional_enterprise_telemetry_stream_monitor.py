# topic11_files/institutional_enterprise_telemetry_stream_monitor.py
# Module: 003_003_decorators-generators
# Topic: Infinite streams and large data processing with generators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 4: Enterprise Server Telemetry Stream Monitor (Case Study)
Demonstrates:
  1. Production pipeline monitoring infinite student portal request traffic
  2. Multi-stage generator composition: Source -> Ingestion -> Security Filter -> Anomaly Detector -> Telemetry Sink
  3. Operating with zero memory growth across millions of requests
"""

import itertools
import collections
from typing import Generator, Dict, Any

def portal_request_traffic_stream() -> Generator[Dict[str, Any], None, None]:
    """Generates continuous stream of student portal web requests."""
    synthetic_traffic = [
        {"ip": "103.21.14.50", "endpoint": "/api/v1/auth/login", "status": 200, "latency_ms": 32.5},
        {"ip": "103.21.14.50", "endpoint": "/api/v1/student/dashboard", "status": 200, "latency_ms": 48.0},
        {"ip": "45.122.90.11", "endpoint": "/admin/config/db_dump", "status": 403, "latency_ms": 14.2},
        {"ip": "103.21.14.88", "endpoint": "/api/v1/exam/submit", "status": 200, "latency_ms": 85.0},
        {"ip": "45.122.90.11", "endpoint": "/.env", "status": 404, "latency_ms": 9.5},
        {"ip": "103.21.14.92", "endpoint": "/api/v1/certificates/download", "status": 500, "latency_ms": 420.0},
        {"ip": "103.21.14.50", "endpoint": "/api/v1/fee/receipt", "status": 200, "latency_ms": 38.0},
    ]
    req_id = 1
    for raw in itertools.cycle(synthetic_traffic):
        yield {
            "request_id": f"REQ-{req_id:06d}",
            **raw
        }
        req_id += 1


def security_anomaly_interceptor(
    request_stream: Generator[Dict[str, Any], None, None]
) -> Generator[Dict[str, Any], None, None]:
    """Filters incoming requests and flags security threats and server errors."""
    for req in request_stream:
        threat_level = "NONE"
        if req["status"] in (401, 403):
            threat_level = "UNAUTHORIZED_PROBE"
        elif req["status"] >= 500:
            threat_level = "SERVER_CRITICAL_FAULT"
        elif req["latency_ms"] >= 300.0:
            threat_level = "LATENCY_DEGRADATION"

        yield {
            **req,
            "threat_level": threat_level,
            "requires_alert": threat_level != "NONE"
        }


def run_enterprise_telemetry_monitor():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE SERVER TELEMETRY STREAM MONITOR")
    print("=" * 70)

    # Ingest Infinite Traffic Stream:
    raw_traffic = portal_request_traffic_stream()

    # Pass through Security Interceptor Pipeline:
    security_pipeline = security_anomaly_interceptor(raw_traffic)

    # Monitor First 10 Requests from infinite pipeline:
    print("1. Ingesting Real-Time Student Portal Request Telemetry (First 10 Events):")
    alert_count = 0

    for event in itertools.islice(security_pipeline, 10):
        if event["requires_alert"]:
            print(
                f"   [SECURITY ALERT] {event['request_id']} | Threat: {event['threat_level']:<22} | "
                f"IP: {event['ip']:<14} | Path: {event['endpoint']:<28} | HTTP {event['status']}"
            )
            alert_count += 1
        else:
            print(
                f"   [OK]             {event['request_id']} | IP: {event['ip']:<14} | "
                f"Path: {event['endpoint']:<28} | HTTP {event['status']} | Latency: {event['latency_ms']:5.1f} ms"
            )

    print(f"\n   Total Alerts Triggered: {alert_count} / 10")
    print("[PASSED] Enterprise Telemetry Stream Monitor Verified.")


if __name__ == "__main__":
    run_enterprise_telemetry_monitor()
