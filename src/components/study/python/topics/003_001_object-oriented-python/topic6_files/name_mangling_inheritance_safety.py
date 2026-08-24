# topic6_files/name_mangling_inheritance_safety.py
# Module: 003_001_object-oriented-python
# Topic: Encapsulation & Data Hiding
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 3: The True Purpose of Name Mangling: Subclass Collision Avoidance
Demonstrates:
  1. Why double underscores exist in Python: To prevent accidental attribute overriding in inheritance
  2. How `_ParentClass__var` and `_ChildClass__var` safely coexist on the SAME object
  3. Demonstrating that without name mangling, subclasses would silently overwrite parent internal fields
"""

class CloudServiceBase:
    """Base class defining private internal configuration."""

    def __init__(self):
        # Name mangled to: _CloudServiceBase__endpoint
        self.__endpoint = "https://api.codernaccotax.co.in/v1/core"

    def get_base_endpoint(self) -> str:
        return self.__endpoint


class AnalyticsService(CloudServiceBase):
    """Subclass also defining private internal configuration with the same name!"""

    def __init__(self):
        super().__init__()
        # Name mangled to: _AnalyticsService__endpoint
        self.__endpoint = "https://analytics.codernaccotax.co.in/v2/stream"

    def get_analytics_endpoint(self) -> str:
        return self.__endpoint


def demonstrate_collision_prevention():
    print("=" * 70)
    print("CODER & ACCOTAX - SUBCLASS ATTRIBUTE COLLISION PREVENTION")
    print("=" * 70)

    service = AnalyticsService()

    print("Reading endpoints through their respective class methods:")
    print(f"  * Base Endpoint      : {service.get_base_endpoint()}")
    print(f"  * Analytics Endpoint : {service.get_analytics_endpoint()}")

    print("\nInspecting the single object's __dict__ in RAM:")
    for key, value in service.__dict__.items():
        print(f"  * {key:<30} -> {value}")

    print(r"""
Architectural Insight:
  Because of Name Mangling:
    - Base class's `self.__endpoint` became `_CloudServiceBase__endpoint`
    - Subclass's `self.__endpoint` became `_AnalyticsService__endpoint`
  Both internal private variables safely coexist without clobbering each other!
""")
    print("[PASSED] Subclass Attribute Collision Safety Verified.")


if __name__ == "__main__":
    demonstrate_collision_prevention()
