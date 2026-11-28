"""
CBSE Class 12 CS - Topic 1 Simulation: TCP 3-Way Handshake & Sequence Number Simulator
Demonstrates socket connection establishment and reliable packet ordering.
"""

class TCPSocket:
    def __init__(self, name, ip, port):
        self.name = name
        self.ip = ip
        self.port = port
        self.state = "CLOSED"
        self.seq_num = 1000

    def initiate_handshake(self, server):
        print(f"[{self.name}] Initiating 3-Way Handshake to {server.ip}:{server.port}...")
        syn_seq = self.seq_num
        print(f"  Step 1: [{self.name} -> {server.name}] SYN (Seq={syn_seq})")

        syn_ack_seq, ack_for_syn = server.handle_syn(syn_seq)
        print(f"  Step 2: [{server.name} -> {self.name}] SYN-ACK (Seq={syn_ack_seq}, Ack={ack_for_syn})")

        final_ack = syn_ack_seq + 1
        print(f"  Step 3: [{self.name} -> {server.name}] ACK (Ack={final_ack})")
        self.state = "ESTABLISHED"
        server.state = "ESTABLISHED"
        print(f"\nResult: Virtual connection ESTABLISHED between {self.ip}:{self.port} <-> {server.ip}:{server.port}")

    def handle_syn(self, client_seq):
        server_seq = 5000
        ack_to_client = client_seq + 1
        return server_seq, ack_to_client

if __name__ == "__main__":
    client = TCPSocket("Client_Browser", "192.168.1.100", 54321)
    server = TCPSocket("CBSE_Web_Server", "164.100.107.45", 80)
    client.initiate_handshake(server)
