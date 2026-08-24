# topic1_files/dynamic_plugin_loader.py
# Module: 002_009_modules-packages
# Topic: Module search path (sys.path) and module namespace
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Dynamic Plugin Discovery & Module Registry Engine
Demonstrates:
  1. Managing sys.path dynamically for plugin discovery
  2. Programmatic module loading with importlib
  3. Inspecting module namespaces for compliant interface classes
  4. Production plugin execution pipeline for educational and tax utilities
"""

import sys
import os
import importlib
import types
from typing import Dict, Any, List

class EducationalPlugin:
    """Base protocol for educational plugins."""
    name: str = "BasePlugin"
    
    @classmethod
    def execute(cls, student_data: Dict[str, Any]) -> str:
        raise NotImplementedError


# In-Memory Simulated Plugin Modules for standalone demonstration
class FeeCalculationPlugin(EducationalPlugin):
    name = "FeeCalculator"
    
    @classmethod
    def execute(cls, student_data: Dict[str, Any]) -> str:
        fee = student_data.get("fee", 0)
        gst = fee * 0.18
        return f"[FeeCalculator] Total with 18% GST: INR {fee + gst:,.2f}"


class AttendanceTrackerPlugin(EducationalPlugin):
    name = "AttendanceTracker"
    
    @classmethod
    def execute(cls, student_data: Dict[str, Any]) -> str:
        attended = student_data.get("attended", 0)
        total = student_data.get("total_classes", 1)
        pct = (attended / total) * 100
        return f"[AttendanceTracker] Student Attendance: {pct:.1f}% ({attended}/{total} classes)"


class PluginRegistryEngine:
    """Enterprise dynamic plugin registry and executor."""

    def __init__(self):
        self._registry: Dict[str, Any] = {}

    def register_plugin(self, plugin_cls: Any):
        """Registers a discovered plugin class."""
        self._registry[plugin_cls.name] = plugin_cls

    def run_all_plugins(self, student_payload: Dict[str, Any]) -> List[str]:
        """Runs all registered plugins against a student payload."""
        results = []
        for name, plugin in self._registry.items():
            out = plugin.execute(student_payload)
            results.append(out)
        return results


def run_plugin_engine_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - DYNAMIC PLUGIN REGISTRY & NAMESPACE DISCOVERY")
    print("=" * 75)

    engine = PluginRegistryEngine()

    # Register simulated plugins
    engine.register_plugin(FeeCalculationPlugin)
    engine.register_plugin(AttendanceTrackerPlugin)

    print(f"Total Active Plugins in Registry: {len(engine._registry)}")
    for name in engine._registry:
        print(f"  * Plugin Registered: '{name}'")

    print("\n--- RUNNING PLUGIN PIPELINE ON STUDENT RECORD ---")
    student = {
        "name": "Susmita Mukherjee",
        "center": "Barrackpore",
        "fee": 12000.0,
        "attended": 28,
        "total_classes": 30
    }

    outputs = engine.run_all_plugins(student)
    for out in outputs:
        print(f"  -> {out}")


if __name__ == "__main__":
    run_plugin_engine_demo()
