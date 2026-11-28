"""
CBSE Class 12 Computer Science (083)
Unit II: Computer Networks - Module 3 Master Simulation Suite
Covers: Protocols (TCP/IP, HTTP/S, SMTP/IMAP, FTP, SSH), DNS, Malware & Firewall ACLs
Author: Sukanta Hui (Senior CS Educator, Coder & AccoTax)
"""

def simulate_tcp_handshake(client_syn=1000):
    server_syn = 5000
    print("[1. TCP 3-WAY HANDSHAKE]")
    print(f"  Step 1: Client -> Server: SYN (Seq={client_syn})")
    print(f"  Step 2: Server -> Client: SYN-ACK (Seq={server_syn}, Ack={client_syn + 1})")
    print(f"  Step 3: Client -> Server: ACK (Ack={server_syn + 1})")
    print("  -> Session ESTABLISHED on bidirectional reliable socket.\n")

def simulate_email_flow():
    print("[2. EMAIL DUAL-PROTOCOL WORKFLOW]")
    print("  Sender -> [SMTP Push / Port 587] -> Outgoing Mail Server")
    print("  Outgoing Server -> [SMTP Relay / Port 25] -> Recipient Server")
    print("  Recipient -> [IMAP Pull / Port 993] -> Multi-Device Synchronized Inbox\n")

def simulate_firewall_inspection(packet):
    proto, port, ip = packet
    print(f"[3. FIREWALL PACKET INSPECTION]: {proto}:{port} from {ip}")
    allowed_ports = {80: "HTTP Allowed", 443: "HTTPS Allowed", 22: "SSH Allowed (Admin)"}
    blocked_ports = {23: "Telnet BLOCKED (Insecure)", 21: "FTP BLOCKED (Plaintext)"}

    if port in allowed_ports:
        return f"PERMIT: {allowed_ports[port]}"
    elif port in blocked_ports:
        return f"DENY: {blocked_ports[port]}"
    return "DENY: Implicit Default Block"

if __name__ == "__main__":
    print("==================================================")
    print(" CBSE CLASS 12 COMPUTER SCIENCE - MODULE 3 MASTER LAB")
    print("==================================================\n")

    simulate_tcp_handshake()
    simulate_email_flow()

    print("Testing Firewall Rules:")
    test_packets = [("TCP", 443, "157.240.22.35"), ("TCP", 23, "198.51.100.2"), ("TCP", 8080, "10.0.0.5")]
    for p in test_packets:
        print("  Result:", simulate_firewall_inspection(p))

    print("\nMaster Simulation Suite Finished.")
