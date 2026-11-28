"""
CBSE Class 12 CS - Topic 5 Simulation: VoIP Digitization, Packetization & Jitter Buffer
Simulates analog voice sampling, packet loss, and jitter buffer smoothing.
"""

import random

class VoIPStreamSimulator:
    def __init__(self, num_packets=10):
        self.num_packets = num_packets

    def run_simulation(self):
        print("=== VOIP VOICE PACKET TRANSMISSION SIMULATOR ===")
        print("1. [ANALOG TO DIGITAL] Sampled analog audio at 8 kHz (G.711 Codec)")
        print("2. [PACKETIZATION] Chunked into 20ms RTP packets over UDP Port 5060/RTP")

        sent_packets = []
        for seq in range(1, self.num_packets + 1):
            sent_packets.append({"seq": seq, "timestamp": seq * 20, "payload": f"Voice_Data_Chunk_{seq}"})

        print(f"\n3. [NETWORK TRANSIT] Transmitting {self.num_packets} packets across IP network...")
        received_packets = []
        for p in sent_packets:
            if random.random() < 0.15:  # 15% simulated packet loss
                print(f"  [PACKET DROP] Packet #{p['seq']} lost due to router buffer congestion!")
            else:
                transit_jitter = random.randint(15, 65)  # variable transit delay
                received_packets.append((transit_jitter, p))
                print(f"  [RECEIVED] Packet #{p['seq']} arrived (Latency: {transit_jitter} ms)")

        print("\n4. [RECEIVER JITTER BUFFER & DAC PLAYBACK]")
        # Sort by sequence number to reconstruct audio
        received_packets.sort(key=lambda x: x[1]['seq'])
        for transit_time, p in received_packets:
            print(f"  Playing back Packet #{p['seq']} (Timestamp: {p['timestamp']}ms) -> DAC Speaker")
        print(f"\nSummary: Played {len(received_packets)} of {self.num_packets} packets. Audio smooth.")

if __name__ == "__main__":
    sim = VoIPStreamSimulator(num_packets=8)
    sim.run_simulation()
