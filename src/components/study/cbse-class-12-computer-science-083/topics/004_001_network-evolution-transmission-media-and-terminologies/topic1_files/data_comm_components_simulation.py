"""
CBSE Class 12 Computer Science - Computer Networks
Topic 1: Simulation of Data Communication System Components (Sender, Receiver, Protocol)
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

import hashlib
import time

class Packet:
    def __init__(self, sender, receiver, message, protocol="TCP/IP"):
        self.sender = sender
        self.receiver = receiver
        self.message = message
        self.protocol = protocol
        self.timestamp = time.strftime("%H:%M:%S")
        self.checksum = self._calculate_checksum()

    def _calculate_checksum(self):
        return hashlib.md5(self.message.encode()).hexdigest()[:8]

class CommunicationChannel:
    def __init__(self, medium_type="Optical Fiber", noise_rate=0.0):
        self.medium_type = medium_type
        self.noise_rate = noise_rate

    def transmit(self, packet):
        print(f"\n--- TRANSMITTING OVER MEDIUM: {self.medium_type} ---")
        print(f"Sender   : {packet.sender}")
        print(f"Receiver : {packet.receiver}")
        print(f"Payload  : '{packet.message}'")
        print(f"Protocol : {packet.protocol} | Checksum: {packet.checksum}")
        print(f"Signal traveling across {self.medium_type}...")
        return packet

def receiver_verify(packet):
    print("\n--- RECEIVER VERIFICATION (SINK) ---")
    current_checksum = hashlib.md5(packet.message.encode()).hexdigest()[:8]
    if current_checksum == packet.checksum:
        print(f"SUCCESS: Integrity Verified! Protocol '{packet.protocol}' accepted message: '{packet.message}'")
    else:
        print("ERROR: Packet corrupted during transmission!")

if __name__ == "__main__":
    pkt = Packet(sender="Workstation-A (192.168.1.10)",
                 receiver="Database-Server (192.168.1.200)",
                 message="STUDENT_SCORE_SUBMISSION_BATCH_1")
    channel = CommunicationChannel(medium_type="Shielded Twisted Pair (Cat-6)")
    delivered_pkt = channel.transmit(pkt)
    receiver_verify(delivered_pkt)