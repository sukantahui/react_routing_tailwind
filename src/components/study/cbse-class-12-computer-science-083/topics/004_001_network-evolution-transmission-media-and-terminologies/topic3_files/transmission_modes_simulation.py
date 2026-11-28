"""
CBSE Class 12 Computer Science - Computer Networks
Topic 3: Simulation of Transmission Modes (Simplex, Half-Duplex, Full-Duplex)
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

import time

def simulate_simplex():
    print("--- 1. SIMPLEX MODE (STRICTLY UNIDIRECTIONAL) ---")
    print("Broadcaster (Sender) -> [Antenna Cable] -> Television (Receiver)")
    print("Transmitting Live News Broadcast...")
    print("Receiver accepts signal. Receiver CANNOT send any data back!")
    print("Channel Capacity: 100% dedicated to outbound stream.\n")

def simulate_half_duplex():
    print("--- 2. HALF-DUPLEX MODE (BIDIRECTIONAL, ALTERNATE) ---")
    print("Officer A: 'Target in sight. Moving in. OVER.'")
    print("  [Officer B must wait. Channel locked by Officer A]")
    time.sleep(0.5)
    print("Officer B: 'Copy that. Backup en route. OVER.'")
    print("Channel Capacity: 100% used in turns.\n")

def simulate_full_duplex():
    print("--- 3. FULL-DUPLEX MODE (BIDIRECTIONAL, SIMULTANEOUS) ---")
    print("Caller A: 'Hello, can you hear me clearly?'")
    print("Caller B: 'Yes, I can hear you while speaking right now!'")
    print("Both parties transmit and receive concurrently in real time.")
    print("Channel Capacity: Divided into dual upstream/downstream channels.")

if __name__ == "__main__":
    simulate_simplex()
    simulate_half_duplex()
    simulate_full_duplex()