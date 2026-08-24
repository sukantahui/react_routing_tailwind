# topic9_files/cooperative_multiple_inheritance_and_super.py
# Module: 003_001_object-oriented-python
# Topic: Method Overriding & super() function
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 2: Cooperative Multiple Inheritance & Diamond Problem Resolution
Demonstrates:
  1. The True Meaning of `super()`: Delegates to the NEXT class in the MRO list
  2. Cooperative Multiple Inheritance in Diamond Hierarchies (A -> B, C -> D)
  3. Why cooperative `super()` guarantees every ancestor is visited exactly ONCE!
"""

class BaseHandler:
    """Root Handler (Top of the Diamond)."""
    def process_request(self, payload: dict):
        print("  [BASE HANDLER] Reached root processor: Storing payload in database.")
        payload["processed_by_base"] = True


class AuthenticationHandler(BaseHandler):
    """Left branch of Diamond."""
    def process_request(self, payload: dict):
        print("  [AUTH HANDLER] Step 1: Validating user authorization token...")
        payload["authenticated"] = True
        # super() calls the NEXT class in MRO (which will be EncryptionHandler in Child D!)
        super().process_request(payload)


class EncryptionHandler(BaseHandler):
    """Right branch of Diamond."""
    def process_request(self, payload: dict):
        print("  [ENCRYPTION HANDLER] Step 2: Encrypting sensitive payload fields...")
        payload["encrypted"] = True
        super().process_request(payload)


class SecureApiGateway(AuthenticationHandler, EncryptionHandler):
    """Bottom of the Diamond (Multiple Inheritance: B, C)."""
    def process_request(self, payload: dict):
        print("  [API GATEWAY] Starting full cooperative security pipeline:")
        super().process_request(payload)
        print("  [API GATEWAY] Pipeline execution completed successfully!")


def demonstrate_cooperative_super():
    print("=" * 70)
    print("CODER & ACCOTAX - COOPERATIVE super() IN DIAMOND HIERARCHY")
    print("=" * 70)

    # 1. Print MRO Linearization
    print("Method Resolution Order (MRO) for SecureApiGateway:")
    for idx, cls in enumerate(SecureApiGateway.__mro__):
        print(f"  [{idx}] {cls.__name__}")

    print(r"""
Notice the MRO Chain:
  SecureApiGateway -> AuthenticationHandler -> EncryptionHandler -> BaseHandler -> object
""")

    # 2. Execute Request through Pipeline
    gateway = SecureApiGateway()
    data_packet = {"account": "ACC-2026", "action": "FEE_TRANSFER"}

    print("Executing `gateway.process_request(data_packet)`:")
    gateway.process_request(data_packet)

    print("\nResulting Transformed Packet:")
    print(f"  {data_packet}")

    print(r"""
Insight:
  In `AuthenticationHandler`, `super().process_request()` did NOT jump to `BaseHandler`.
  Instead, it cooperatively passed execution to `EncryptionHandler` because it was
  next in the MRO chain! Every class in the diamond was called exactly ONCE.
""")
    print("[PASSED] Cooperative Multiple Inheritance Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_cooperative_super()
