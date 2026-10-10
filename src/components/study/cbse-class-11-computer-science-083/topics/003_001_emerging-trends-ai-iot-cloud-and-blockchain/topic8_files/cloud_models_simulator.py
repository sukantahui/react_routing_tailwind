"""
Module 003: Emerging Trends in Computing
Topic 8: Cloud Computing Paradigm & Delivery Models (IaaS, PaaS, SaaS)
Pure Python Simulation of Shared Responsibility Matrix, On-Demand Elastic Scaling, and Cost Estimation.
"""

from typing import Dict, List, Any

class CloudComputingEngine:
    def __init__(self):
        # Service Delivery Models & Shared Responsibility
        self.delivery_models = {
            "IaaS": {
                "name": "Infrastructure as a Service (IaaS)",
                "managed_by_vendor": ["Physical Datacenter", "Power & Cooling", "Physical Network", "Hypervisor & Virtualization"],
                "managed_by_client": ["Operating System (OS)", "Middleware", "Runtime", "Data Storage", "Applications"],
                "real_world_examples": ["Amazon AWS EC2", "Microsoft Azure VMs", "Google Compute Engine (GCE)"]
            },
            "PaaS": {
                "name": "Platform as a Service (PaaS)",
                "managed_by_vendor": ["Datacenter & Hardware", "Virtualization", "Operating System (OS)", "Middleware", "Database & Language Runtimes"],
                "managed_by_client": ["Application Code & Logic", "User Data"],
                "real_world_examples": ["AWS Elastic Beanstalk", "Google App Engine", "Heroku", "Firebase"]
            },
            "SaaS": {
                "name": "Software as a Service (SaaS)",
                "managed_by_vendor": ["Everything (Infrastructure, OS, Middleware, Code, Patches, Backups, High Availability)"],
                "managed_by_client": ["User Settings / Configurations", "Access Credentials"],
                "real_world_examples": ["Google Workspace (Gmail, Docs)", "Microsoft Office 365", "Zoom", "Dropbox"]
            }
        }

    def simulate_elastic_scaling(self, user_traffic_req_per_sec: int) -> Dict[str, Any]:
        """Simulates rapid elasticity by auto-scaling virtual server instances."""
        instance_capacity = 2500 # 2500 req/sec per VM
        required_vms = max(1, -(-user_traffic_req_per_sec // instance_capacity)) # ceiling division
        cost_per_vm_hour = 0.08 # $0.08 per hour
        total_hourly_cost = required_vms * cost_per_vm_hour

        return {
            "traffic_load": f"{user_traffic_req_per_sec:,} requests/sec",
            "auto_scaled_instances": required_vms,
            "resource_utilization": f"{round((user_traffic_req_per_sec / (required_vms * instance_capacity)) * 100, 1)}%",
            "elasticity_status": "Scaled Up Dynamically" if required_vms > 2 else "Baseline Fleet",
            "hourly_cost_usd": f"${total_hourly_cost:.2f}",
            "monthly_cost_usd": f"${(total_hourly_cost * 24 * 30):.2f}"
        }

    def get_responsibility_matrix(self, model: str) -> Dict[str, Any]:
        """Returns the shared security and management responsibility breakdown."""
        model_key = model.upper()
        if model_key in self.delivery_models:
            return self.delivery_models[model_key]
        return {"error": "Invalid Model. Choose IaaS, PaaS, or SaaS."}

if __name__ == "__main__":
    cloud = CloudComputingEngine()
    print("=" * 65)
    print("Cloud Computing Delivery Models (IaaS vs PaaS vs SaaS)")
    print("=" * 65)

    for m in ["IaaS", "PaaS", "SaaS"]:
        info = cloud.get_responsibility_matrix(m)
        print(f"\nModel: {info['name']}")
        print(f"  Vendor Manages : {', '.join(info['managed_by_vendor'])}")
        print(f"  Client Manages : {', '.join(info['managed_by_client'])}")
        print(f"  Examples       : {', '.join(info['real_world_examples'])}")

    print("\n" + "=" * 65)
    print("Rapid Elasticity & Auto-Scaling Simulation")
    print("=" * 65)
    print("Traffic 1,500 req/s :", cloud.simulate_elastic_scaling(1500))
    print("Traffic 18,000 req/s:", cloud.simulate_elastic_scaling(18000))
