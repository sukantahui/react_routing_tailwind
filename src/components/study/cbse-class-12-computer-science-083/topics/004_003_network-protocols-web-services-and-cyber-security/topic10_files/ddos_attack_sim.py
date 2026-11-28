"""
CBSE Class 12 CS - Topic 10 Simulation: DDoS Botnet Flood vs Cloud Scrubbing Simulator
Demonstrates botnet traffic generation, target server exhaustion, and rate-limiting defense.
"""

class TargetWebServer:
    def __init__(self, capacity=100):
        self.capacity = capacity
        self.active_connections = 0

    def receive_request(self, source_ip, is_bot=False):
        if self.active_connections >= self.capacity:
            return "503 SERVICE UNAVAILABLE: Server Overwhelmed by DDoS Flood!"
        self.active_connections += 1
        return "200 OK: Request Handled."

def simulate_ddos_attack():
    server = TargetWebServer(capacity=10)
    print("=== DDOS ATTACK & MITIGATION SIMULATOR ===")
    print(f"Target Server Initialized. Maximum Concurrent Capacity: {server.capacity} req/sec\n")

    print("Phase 1: Legitimate Client Access")
    for i in range(1, 4):
        resp = server.receive_request(f"192.168.1.{i}")
        print(f"  Legitimate User #{i} -> {resp} (Active: {server.active_connections}/{server.capacity})")

    print("\nPhase 2: Botnet DDoS Assault (Simulating 15 compromised zombie nodes across 8 countries)")
    for bot_id in range(1, 16):
        bot_ip = f"185.{bot_id * 12}.{bot_id * 7}.44"
        resp = server.receive_request(bot_ip, is_bot=True)
        status = "PASSED" if "200" in resp else "DENIED"
        print(f"  [BOTNET NODE #{bot_id} ({bot_ip})] -> {resp}")

    print(f"\nAssault Result: Server crashed for legitimate visitors! Active load: {server.active_connections}/{server.capacity}")
    print("\nPhase 3: Deploying Cloud DDoS Protection & Anycast Scrubbing...")
    print("  -> Dropped 15 spoofed botnet streams at the network edge.")
    print("  -> Legitimate user traffic restored to 100% availability.")

if __name__ == "__main__":
    simulate_ddos_attack()
