"""
Module 003: Emerging Trends in Computing
Topic 9: Cloud Deployment Models Simulation
Pure Python Comparison Engine of Public, Private, Community, and Hybrid Cloud Architectures.
"""

from typing import Dict, List, Any

class CloudDeploymentEngine:
    def __init__(self):
        self.deployment_models = {
            "PUBLIC": {
                "name": "Public Cloud",
                "ownership": "Third-party commercial cloud provider (AWS, Azure, Google Cloud)",
                "accessibility": "Open for general public / enterprise multi-tenant access over the public internet",
                "cost_profile": "Lowest upfront cost, pure pay-as-you-go OPEX, zero datacenter maintenance",
                "security_level": "Multi-tenant logical isolation, shared hardware infrastructure",
                "best_for": "Startups, web apps, public SaaS services, e-commerce, test environments"
            },
            "PRIVATE": {
                "name": "Private Cloud (Internal / Dedicated)",
                "ownership": "Single enterprise organization or dedicated private datacenter provider",
                "accessibility": "Exclusively accessible by a single organization over private VPN/WAN",
                "cost_profile": "Highest capital cost (CAPEX), dedicated physical hardware maintenance",
                "security_level": "Maximum governance, strict regulatory compliance, physical tenant isolation",
                "best_for": "Defense agencies, national intelligence, central banking, top-secret R&D"
            },
            "COMMUNITY": {
                "name": "Community Cloud",
                "ownership": "Shared jointly by several organizations with common compliance/industry missions",
                "accessibility": "Restricted to member organizations within the consortium/alliance",
                "cost_profile": "Shared capital and operational costs among consortium members",
                "security_level": "High, customized to common industry compliance standards (HIPAA, RBI)",
                "best_for": "All commercial banks in a country, university research consortiums, healthcare networks"
            },
            "HYBRID": {
                "name": "Hybrid Cloud",
                "ownership": "Composition of two or more distinct clouds (e.g., Private + Public) bound by standardized tech",
                "accessibility": "Encrypted secure orchestration and data portability across private and public tiers",
                "cost_profile": "Optimized: Sensitive workloads stay private; peak bursts scale to public cloud (Cloud Bursting)",
                "security_level": "Flexible: High security for core databases, scalable security for web tier",
                "best_for": "Financial institutions, enterprises experiencing seasonal traffic surges (Cloud Bursting)"
            }
        }

    def simulate_cloud_bursting(self, base_traffic: int, spike_traffic: int) -> Dict[str, Any]:
        """Simulates Hybrid Cloud Bursting where peak traffic overflows from Private to Public cloud."""
        private_capacity = 5000 # Max requests/sec handled on private on-premise hardware
        
        if spike_traffic <= private_capacity:
            private_load = spike_traffic
            public_burst_load = 0
            burst_status = "Handled 100% on Private Cloud Infrastructure."
        else:
            private_load = private_capacity
            public_burst_load = spike_traffic - private_capacity
            burst_status = f"⚡ CLOUD BURSTING ACTIVE: {public_burst_load:,} req/sec overflowing to Public Cloud."

        return {
            "total_traffic": f"{spike_traffic:,} req/sec",
            "private_cloud_load": f"{private_load:,} req/sec (Capacity: {private_capacity:,})",
            "public_cloud_burst": f"{public_burst_load:,} req/sec",
            "burst_status": burst_status
        }

if __name__ == "__main__":
    engine = CloudDeploymentEngine()
    print("=" * 65)
    print("Cloud Deployment Models (Public vs Private vs Community vs Hybrid)")
    print("=" * 65)

    for key, model in engine.deployment_models.items():
        print(f"\n[{model['name'].upper()}]")
        print(f"  Ownership     : {model['ownership']}")
        print(f"  Accessibility : {model['accessibility']}")
        print(f"  Cost Profile  : {model['cost_profile']}")
        print(f"  Security      : {model['security_level']}")
        print(f"  Ideal For     : {model['best_for']}")

    print("\n" + "=" * 65)
    print("Hybrid Cloud Bursting Simulation")
    print("=" * 65)
    print("Normal Day:", engine.simulate_cloud_bursting(3000, 4200))
    print("Diwali Flash Sale Surge:", engine.simulate_cloud_bursting(3000, 14500))
