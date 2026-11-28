"""
CBSE Class 12 CS - Topic 6 Simulation: Telnet Cleartext vs SSH Encrypted Terminal
Demonstrates packet payload capture of Telnet login vs SSH cryptographic obfuscation.
"""

def simulate_remote_login(protocol, username, password):
    print(f"\n=== SIMULATING REMOTE LOGIN VIA {protocol.upper()} ===")
    if protocol.lower() == "telnet":
        print("[NETWORK PACKET CAPTURE ON TCP PORT 23 (TELNET)]")
        print(f"  Frame #101: Client -> Server: USER {username}")
        print(f"  Frame #103: Client -> Server: PASS {password}")
        print("  Frame #105: Client -> Server: cat /etc/passwd")
        print(f"CRITICAL VULNERABILITY: Cleartext credentials exposed to all network sniffers!")
    elif protocol.lower() == "ssh":
        print("[NETWORK PACKET CAPTURE ON TCP PORT 22 (SSH-2 / AES-256-GCM)]")
        print("  1. Handshake: Exchanged Diffie-Hellman Key & Verified Host Key")
        print("  2. Client Authentication: Authenticated via Ed25519 Public Key")
        print("  Encrypted Packet Payload Stream:")
        print("    [0x9E 0x3F 0xAA 0x1B 0x77 0xD4 0x01 0xBC 0x58 0x3A 0xFF 0x12]")
        print("    [0x44 0x81 0x22 0x9C 0x6E 0x10 0x88 0xEF 0x33 0xA2 0x5C 0x07]")
        print("RESULT: Eavesdropper captures pure pseudorandom cipher noise. Complete privacy guaranteed.")

if __name__ == "__main__":
    simulate_remote_login("telnet", "admin_cbse", "SuperSecretRootPassword2026")
    simulate_remote_login("ssh", "admin_cbse", "SuperSecretRootPassword2026")
