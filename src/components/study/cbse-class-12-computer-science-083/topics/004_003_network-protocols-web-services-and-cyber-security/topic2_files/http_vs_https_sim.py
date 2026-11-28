"""
CBSE Class 12 CS - Topic 2 Simulation: HTTP vs HTTPS Packet Sniffer Simulation
Demonstrates the difference between intercepting cleartext HTTP vs encrypted HTTPS payloads.
"""

def simulate_interception(protocol, data):
    print(f"\n--- Simulating Packet Sniffing on {protocol.upper()} ---")
    if protocol.lower() == "http":
        print("[UNENCRYPTED HTTP PACKET CAPTURED OVER PORT 80]")
        print("Packet Header: GET /login.php?user=sukanta_hui&pass=SecretPass123 HTTP/1.1")
        print("Host: examportal.cbse.nic.in")
        print("User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
        print(f"CRITICAL VULNERABILITY: Intercepted credentials in cleartext -> '{data}'")
    elif protocol.lower() == "https":
        print("[ENCRYPTED HTTPS PACKET CAPTURED OVER PORT 443 (TLS v1.3)]")
        print("Encrypted Application Data:")
        print("  0x4A 0x8F 0xB2 0x90 0x11 0xCC 0x7E 0x05 0xAA 0x99 0x4D 0x33")
        print("  0xDE 0xAD 0xBE 0xEF 0x12 0x34 0x56 0x78 0x9A 0xBC 0xDE 0xF0")
        print("RESULT: Intercepted payload is mathematically unreadable without TLS session key.")

if __name__ == "__main__":
    user_payload = "User: sukanta_teacher | Password: BarrackporeSafePassword2026"
    simulate_interception("http", user_payload)
    simulate_interception("https", user_payload)
