"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 1: MAC Address Parser, OUI Vendor Decomposition & Validator Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import re

class MACAddressAnalyzer:
    # Common manufacturer OUIs for laboratory simulation
    KNOWN_OUIS = {
        "00:1A:2B": "Ayecom Technology Co.",
        "00:50:56": "VMware, Inc.",
        "00:0C:29": "VMware, Inc.",
        "00:14:22": "Dell Inc.",
        "00:1C:B3": "Apple, Inc.",
        "08:00:27": "Oracle VirtualBox",
        "B8:27:EB": "Raspberry Pi Foundation",
        "DC:A6:32": "Raspberry Pi Trading"
    }

    @staticmethod
    def validate_and_parse(mac_str: str) -> dict:
        """Validates a 48-bit MAC address and separates OUI from device identifier."""
        clean_mac = mac_str.strip().replace("-", ":").upper()
        pattern = r"^([0-9A-F]{2}:){5}[0-9A-F]{2}$"

        if not re.match(pattern, clean_mac):
            return {
                "mac": mac_str,
                "is_valid": False,
                "error": "Invalid format! MAC must be 12 hex digits separated by colons or hyphens."
            }

        octets = clean_mac.split(":")
        oui_part = ":".join(octets[0:3])
        device_part = ":".join(octets[3:6])
        vendor = MACAddressAnalyzer.KNOWN_OUIS.get(oui_part, "Unknown / Other Manufacturer")

        # First byte analysis: I/G (Individual/Group) and U/L (Universal/Local)
        first_byte_int = int(octets[0], 16)
        is_multicast = (first_byte_int & 0x01) == 1
        is_locally_administered = (first_byte_int & 0x02) == 2

        return {
            "mac": clean_mac,
            "is_valid": True,
            "total_bits": 48,
            "total_bytes": 6,
            "oui_prefix": oui_part,
            "device_suffix": device_part,
            "manufacturer": vendor,
            "cast_type": "Multicast / Broadcast" if is_multicast else "Unicast (Individual)",
            "administration": "Locally Administered" if is_locally_administered else "Universally Administered (IEEE)"
        }

def run_nic_lab():
    print("=" * 70)
    print("NIC ETHERNET CARD & MAC ADDRESS ANALYZER - CBSE CS 083")
    print("=" * 70)

    test_macs = [
        "00:1C:B3:7A:49:12",   # Apple
        "B8-27-EB-01-A4-5F",   # Raspberry Pi
        "00:14:22:8C:3D:10",   # Dell
        "01:00:5E:00:00:01",   # IPv4 Multicast MAC
        "00:1A:2B:3C:4D:GG"    # Invalid hex
    ]

    for mac in test_macs:
        res = MACAddressAnalyzer.validate_and_parse(mac)
        print(f"\nInput MAC Address: {mac}")
        if not res["is_valid"]:
            print(f"  [ERROR] {res['error']}")
        else:
            print(f"  - Clean Format:       {res['mac']}")
            print(f"  - Bit Length:         {res['total_bits']} bits ({res['total_bytes']} bytes)")
            print(f"  - OUI (Vendor Part):  {res['oui_prefix']} -> {res['manufacturer']}")
            print(f"  - Device Identifier:  {res['device_suffix']}")
            print(f"  - Cast Type:          {res['cast_type']}")

if __name__ == "__main__":
    run_nic_lab()