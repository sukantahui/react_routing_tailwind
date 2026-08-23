"""
SOCKS5 Circuit-Level Gateway & Handshake Relay Simulator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 3)
"""

import socket
import threading
import select
from dataclasses import dataclass
from typing import Dict, Optional, Tuple

@dataclass
class CircuitSession:
    session_id: int
    client_endpoint: str
    target_endpoint: str
    auth_user: Optional[str]
    bytes_relayed: int
    status: str  # "HANDSHAKE_INIT", "AUTHENTICATED", "CIRCUIT_ESTABLISHED", "TERMINATED"

class SOCKS5CircuitGateway:
    def __init__(self, bind_ip: str = "127.0.0.1", bind_port: int = 1080):
        self.bind_ip = bind_ip
        self.bind_port = bind_port
        self.active_circuits: Dict[int, CircuitSession] = {}
        self.session_counter = 1000
        self.authorized_users = {"teller_mamata": "SecureBankPass#2026", "admin_mahima": "MasterKey#2026"}

    def validate_handshake(self, client_sock: socket.socket) -> bool:
        """SOCKS5 Method Negotiation & Authentication (RFC 1928)."""
        # Step 1: Read SOCKS version and methods
        header = client_sock.recv(2)
        if not header or header[0] != 0x05:
            return False  # Not SOCKS5

        num_methods = header[1]
        methods = client_sock.recv(num_methods)

        # Require Username/Password Authentication (Method 0x02)
        if 0x02 not in methods:
            client_sock.sendall(b"\x05\xFF")  # No acceptable methods
            return False

        client_sock.sendall(b"\x05\x02")  # Accept Username/Password Method

        # Step 2: Username/Password Subnegotiation (RFC 1929)
        auth_version = client_sock.recv(1)
        if not auth_version or auth_version[0] != 0x01:
            return False

        user_len = client_sock.recv(1)[0]
        username = client_sock.recv(user_len).decode("utf-8", errors="ignore")
        pass_len = client_sock.recv(1)[0]
        password = client_sock.recv(pass_len).decode("utf-8", errors="ignore")

        if username in self.authorized_users and self.authorized_users[username] == password:
            client_sock.sendall(b"\x01\x00")  # Authentication SUCCESS (Status 0x00)
            return True
        else:
            client_sock.sendall(b"\x01\x01")  # Authentication FAILURE (Status 0x01)
            return False

    def establish_circuit(self, client_sock: socket.socket, client_addr: Tuple[str, int]) -> Optional[socket.socket]:
        """Reads client connect request and establishes Circuit 2 to target server."""
        # Request format: VER (0x05), CMD (0x01 = CONNECT), RSV (0x00), ATYP (0x01=IPv4, 0x03=Domain)
        req = client_sock.recv(4)
        if not req or req[0] != 0x05 or req[1] != 0x01:
            return None  # Only CONNECT command supported

        atyp = req[3]
        if atyp == 0x01:  # IPv4
            dest_ip = socket.inet_ntoa(client_sock.recv(4))
        elif atyp == 0x03:  # Domain Name
            domain_len = client_sock.recv(1)[0]
            dest_ip = client_sock.recv(domain_len).decode("utf-8")
        else:
            return None

        dest_port = int.from_bytes(client_sock.recv(2), "big")

        # Step 3: Establish Secondary Handshake (Circuit 2) to Destination Server
        try:
            target_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            target_sock.settimeout(5.0)
            target_sock.connect((dest_ip, dest_port))

            # Send SOCKS5 Success Response to Client: VER=5, REP=0(Success), RSV=0, ATYP=1, Bind IP/Port
            client_sock.sendall(b"\x05\x00\x00\x01\x00\x00\x00\x00\x00\x00")
            return target_sock
        except Exception as e:
            # Send SOCKS5 Host Unreachable: REP=0x04
            client_sock.sendall(b"\x05\x04\x00\x01\x00\x00\x00\x00\x00\x00")
            return None

    def relay_traffic(self, client_sock: socket.socket, target_sock: socket.socket):
        """Copies raw byte buffers bi-directionally between Circuit 1 and Circuit 2."""
        sockets = [client_sock, target_sock]
        while True:
            readable, _, exceptional = select.select(sockets, [], sockets, 60.0)
            if exceptional or not readable:
                break

            for s in readable:
                other_sock = target_sock if s is client_sock else client_sock
                try:
                    data = s.recv(4096)
                    if not data:
                        return
                    other_sock.sendall(data)
                except Exception:
                    return

# Interactive Testing Simulation Harness
if __name__ == "__main__":
    gateway = SOCKS5CircuitGateway()
    print("=== SOCKS5 Circuit-Level Gateway Simulation ===")
    print(f"Gateway initialized on {gateway.bind_ip}:{gateway.bind_port}")
    print("Dual Handshake Pipeline: [Client] <== Circuit 1 ==> [Gateway] <== Circuit 2 ==> [Destination]")
    print("Ready to authenticate users: teller_mamata, admin_mahima")
