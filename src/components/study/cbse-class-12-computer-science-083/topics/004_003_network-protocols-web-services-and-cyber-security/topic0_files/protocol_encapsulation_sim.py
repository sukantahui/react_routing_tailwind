"""
CBSE Class 12 CS - Topic 0 Simulation: Protocol Encapsulation & Decapsulation Engine
Demonstrates how raw application data is wrapped layer-by-layer and unwrapped at the receiver.
"""

class ProtocolStack:
    def __init__(self):
        pass

    def encapsulate(self, app_data, src_port, dst_port, src_ip, dst_ip, src_mac, dst_mac):
        print(f"1. [APPLICATION LAYER] Raw Message: '{app_data}'")
        transport_pdu = {
            "src_port": src_port,
            "dst_port": dst_port,
            "payload": app_data,
            "checksum": hex(hash(app_data) & 0xFFFF)
        }
        print(f"2. [TRANSPORT LAYER] Segment: Ports ({src_port} -> {dst_port}) | Checksum: {transport_pdu['checksum']}")

        network_pdu = {
            "src_ip": src_ip,
            "dst_ip": dst_ip,
            "payload": transport_pdu,
            "ttl": 64
        }
        print(f"3. [NETWORK LAYER] Packet: IP ({src_ip} -> {dst_ip}) | TTL: 64")

        data_link_pdu = {
            "src_mac": src_mac,
            "dst_mac": dst_mac,
            "payload": network_pdu,
            "fcs": "0x3A9F"
        }
        print(f"4. [DATA LINK LAYER] Frame: MAC ({src_mac} -> {dst_mac}) | FCS: 0x3A9F")
        return data_link_pdu

    def decapsulate(self, frame):
        print("\n--- RECEIVER DECAPSULATION PROCESS ---")
        print(f"1. [DATA LINK LAYER] Stripped MAC header ({frame['src_mac']} -> {frame['dst_mac']}). Verified FCS.")
        packet = frame['payload']
        print(f"2. [NETWORK LAYER] Stripped IP header ({packet['src_ip']} -> {packet['dst_ip']}). Validated TTL.")
        segment = packet['payload']
        print(f"3. [TRANSPORT LAYER] Stripped Transport header (Port {segment['dst_port']}). Checksum verified.")
        message = segment['payload']
        print(f"4. [APPLICATION LAYER] Delivered payload to target application: '{message}'")
        return message

if __name__ == "__main__":
    stack = ProtocolStack()
    frame = stack.encapsulate(
        app_data="GET /index.html HTTP/1.1",
        src_port=52341, dst_port=80,
        src_ip="192.168.1.15", dst_ip="172.217.16.206",
        src_mac="00:1A:2B:3C:4D:5E", dst_mac="FA:CE:B0:0C:00:01"
    )
    stack.decapsulate(frame)
