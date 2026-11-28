"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 7: Gateway Protocol Translation & Format Conversion Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import json

class ProtocolGatewaySimulator:
    @staticmethod
    def voip_to_pstn_translation(sip_voip_packet: dict) -> dict:
        """
        Translates a modern VoIP SIP digital packet into a legacy PSTN analog voice frame.
        Simulates full Layer 4-7 protocol conversion.
        """
        # Step 1: Decode incoming IP/SIP packet
        caller_sip = sip_voip_packet.get("from_sip", "")
        callee_sip = sip_voip_packet.get("to_sip", "")
        audio_codec = sip_voip_packet.get("codec", "G.711")
        payload = sip_voip_packet.get("audio_samples", [])

        # Step 2: Protocol Conversion (SIP URI -> PSTN E.164 Telephone Number)
        # e.g., 'sip:+919830012345@voip.com' -> '+919830012345'
        caller_phone = caller_sip.split("@")[0].replace("sip:", "")
        callee_phone = callee_sip.split("@")[0].replace("sip:", "")

        # Step 3: Re-encode into analog TDM / SS7 circuit-switched signaling
        pstn_frame = {
            "signaling_system": "SS7 / ISDN PRI (Circuit Switched)",
            "calling_party": caller_phone,
            "called_party": callee_phone,
            "analog_pcm_samples": len(payload),
            "translated_by": "Enterprise VoIP Gateway (Protocol Converter)"
        }
        return pstn_frame

def run_gateway_lab():
    print("=" * 70)
    print("GATEWAY DISSIMILAR PROTOCOL TRANSLATOR LAB - CBSE CS 083")
    print("=" * 70)

    # Incoming VoIP SIP Packet
    voip_packet = {
        "protocol": "SIP / RTP over UDP/IP",
        "from_sip": "sip:+919830012345@telecom.org",
        "to_sip": "sip:+913325921111@telecom.org",
        "codec": "G.711u",
        "audio_samples": [128, 140, 155, 170, 182, 190, 185, 172]
    }

    print("\n[1. Incoming Packet on Network A (TCP/IP VoIP Network)]")
    print(f"  * Protocol:    {voip_packet['protocol']}")
    print(f"  * Caller SIP:  {voip_packet['from_sip']}")
    print(f"  * Callee SIP:  {voip_packet['to_sip']}")

    # Translation by Gateway
    pstn_result = ProtocolGatewaySimulator.voip_to_pstn_translation(voip_packet)
    print("\n[2. Protocol Translation by Gateway to Network B (Legacy PSTN Phone Line)]")
    print(f"  * Signaling:   {pstn_result['signaling_system']}")
    print(f"  * Calling No:  {pstn_result['calling_party']}")
    print(f"  * Called No:   {pstn_result['called_party']}")
    print(f"  * Result:      Successfully translated between completely dissimilar architectures!")

if __name__ == "__main__":
    run_gateway_lab()