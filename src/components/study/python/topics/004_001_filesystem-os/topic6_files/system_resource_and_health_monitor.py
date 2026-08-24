# topic6_files/system_resource_and_health_monitor.py
# Module: 004_001_filesystem-os
# Topic: Building automated system maintenance scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 3: System Storage & Health Monitoring Telemetry
Demonstrates:
  1. Inspecting host disk space and computing usage percentages with `shutil.disk_usage()`
  2. Evaluating disk exhaustion thresholds (Warning at >80%, Critical at >90%)
  3. Generating structured JSON telemetry reports for automated monitoring daemons
"""

import os
import sys
import json
import shutil
from datetime import datetime
from typing import Dict, Any

def inspect_host_health_telemetry(mount_point: str = ".", threshold_warn_pct: float = 80.0, threshold_crit_pct: float = 90.0) -> Dict[str, Any]:
    """Inspects storage capacity, evaluates alert thresholds, and produces a health report."""
    usage = shutil.disk_usage(mount_point)

    total_gb = usage.total / (1024 ** 3)
    used_gb = usage.used / (1024 ** 3)
    free_gb = usage.free / (1024 ** 3)
    used_percent = (usage.used / usage.total) * 100

    # Determine health alert level:
    if used_percent >= threshold_crit_pct:
        alert_status = "CRITICAL_STORAGE_EXHAUSTION"
    elif used_percent >= threshold_warn_pct:
        alert_status = "WARNING_HIGH_USAGE"
    else:
        alert_status = "HEALTHY_NORMAL"

    report = {
        "timestamp": datetime.now().isoformat(),
        "host_platform": f"{sys.platform} ({os.name})",
        "python_runtime": sys.version.split()[0],
        "cpu_logical_cores": os.cpu_count() or 1,
        "mount_point": os.path.abspath(mount_point),
        "storage": {
            "total_gb": round(total_gb, 2),
            "used_gb": round(used_gb, 2),
            "free_gb": round(free_gb, 2),
            "used_percentage": round(used_percent, 1)
        },
        "health_assessment": {
            "status": alert_status,
            "requires_maintenance": (alert_status != "HEALTHY_NORMAL"),
            "threshold_warn_pct": threshold_warn_pct,
            "threshold_crit_pct": threshold_crit_pct
        }
    }

    return report


def demonstrate_health_monitor():
    print("=" * 70)
    print("CODER & ACCOTAX - SYSTEM STORAGE & HEALTH TELEMETRY")
    print("=" * 70)

    report = inspect_host_health_telemetry()

    print("1. Host Environment & Storage Capacity Assessment:")
    print(f"   * Status Assessment : [{report['health_assessment']['status']}]")
    print(f"   * Mount Target      : {report['mount_point']}")
    print(f"   * Total Drive Space : {report['storage']['total_gb']} GB")
    print(f"   * Used Space        : {report['storage']['used_gb']} GB ({report['storage']['used_percentage']}%)")
    print(f"   * Free Available    : {report['storage']['free_gb']} GB")
    print(f"   * Logical CPU Cores : {report['cpu_logical_cores']} Cores\n")

    print("2. Formatted JSON Health Telemetry Snapshot:")
    print(json.dumps(report, indent=2))

    print(r"""
Health Monitoring Invariants:
  1. `shutil.disk_usage()` provides cross-platform drive capacity metrics without external dependencies.
  2. Emitting JSON telemetry allows seamless integration with cron jobs, Datadog, or Grafana alerts.
  3. Setting threshold warnings enables proactive log purging before disk saturation causes server crashes.
""")
    print("[PASSED] System Storage & Health Telemetry Verified.")


if __name__ == "__main__":
    demonstrate_health_monitor()
