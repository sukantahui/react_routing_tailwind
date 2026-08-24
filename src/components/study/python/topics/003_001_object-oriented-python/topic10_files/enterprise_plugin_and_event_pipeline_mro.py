# topic10_files/enterprise_plugin_and_event_pipeline_mro.py
# Module: 003_001_object-oriented-python
# Topic: Method Resolution Order (MRO)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 4: Enterprise Event Middleware & Plugin Pipeline via MRO (Case Study)
Demonstrates:
  1. Using MRO to determine the deterministic execution order of middleware plugins
  2. Composing RateLimiting, Authentication, ResponseCaching, and AuditLogging
  3. Tracing request and response lifecycle through cooperative `super()` MRO traversal
"""

import time
from typing import Dict, Any

class BaseMiddleware:
    """Terminal root of the middleware pipeline."""
    def handle_request(self, context: Dict[str, Any]) -> str:
        print("  [BASE PIPELINE] Executing core database transaction for request...")
        return f"SUCCESS: Action '{context.get('action')}' executed for User '{context.get('user')}'"


class RateLimitPlugin(BaseMiddleware):
    """Plugin 1: Enforces rate limits."""
    def handle_request(self, context: Dict[str, Any]) -> str:
        print("  [1. RATE LIMIT] Verifying request quota (OK: 42/1000 requests used)...")
        context["rate_checked"] = True
        return super().handle_request(context)


class JWTAuthenticationPlugin(BaseMiddleware):
    """Plugin 2: Validates cryptographic user tokens."""
    def handle_request(self, context: Dict[str, Any]) -> str:
        print(f"  [2. AUTHENTICATION] Validating JWT for user '{context.get('user')}' (OK)...")
        context["authenticated"] = True
        return super().handle_request(context)


class AuditTelemetryPlugin(BaseMiddleware):
    """Plugin 3: Records forensic audit trail."""
    def handle_request(self, context: Dict[str, Any]) -> str:
        print("  [3. AUDIT TELEMETRY] Logging request context to immutable ledger...")
        result = super().handle_request(context)
        print("  [3. AUDIT TELEMETRY] Logged response code: 200 OK")
        return result


class ProductionApiEndpoint(RateLimitPlugin, JWTAuthenticationPlugin, AuditTelemetryPlugin):
    """Production Endpoint composed using 3 middleware plugins ordered by MRO."""
    pass


def run_middleware_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE MIDDLEWARE MRO PIPELINE")
    print("=" * 70)

    # 1. Print Middleware Execution Order determined by MRO:
    print("MRO Middleware Execution Hierarchy:")
    for idx, plugin in enumerate(ProductionApiEndpoint.__mro__):
        print(f"  Stage [{idx}]: {plugin.__name__}")

    # 2. Dispatch Request through MRO Pipeline:
    endpoint = ProductionApiEndpoint()
    req_context = {
        "user": "Abhishek Karmakar",
        "action": "PAYMENT_INSTALLMENT",
        "amount": 5000.0
    }

    print("\nDispatching API Request:")
    response = endpoint.handle_request(req_context)

    print(f"\nFinal Client Response: {response}")
    print("\n[PASSED] Enterprise Middleware MRO Suite Completed Successfully.")


if __name__ == "__main__":
    run_middleware_case_study()
