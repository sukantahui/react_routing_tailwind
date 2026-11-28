"""
CBSE Class 12 CS - Topic 7 Simulation: Remote Branch WAN Link Selector
Recommends WAN technology based on geographic distance, terrain, and latency requirements.
"""

def evaluate_wan_link(source_city, dest_city, distance_km, terrain_type):
    print(f"\n[WAN LINK QUERY]: {source_city} <=======> {dest_city}")
    print(f"  Distance: {distance_km} km | Terrain: {terrain_type.upper()}")

    if terrain_type.lower() == "hilly":
        wan_tech = "RADIO WAVE / MICROWAVE (Line-of-Sight) or SATELLITE LINK (VSAT)"
        category = "MAN / WAN"
        reason = "Hilly/mountainous terrain makes trenching physical cables prone to landslides and cost-prohibitive."
    elif distance_km <= 50:
        wan_tech = "METROPOLITAN FIBER OPTIC / LEASED LINE"
        category = "MAN (Metropolitan Area Network)"
        reason = "Short metropolitan distance ideal for high-speed fiber or point-to-point microwave."
    elif distance_km <= 1500:
        wan_tech = "TELECOM LEASED LINE (MPLS) / SITE-TO-SITE IPSEC VPN"
        category = "WAN (Wide Area Network)"
        reason = "Inter-state distance connecting enterprise branches via dedicated carrier circuits."
    else:
        wan_tech = "TRANSOCEANIC SUBMARINE FIBER / SATELLITE COMMUNICATION"
        category = "GLOBAL WAN"
        reason = "Intercontinental distances spanning oceans require leased submarine bandwidth or satellite."

    print(f"  -> NETWORK CLASSIFICATION: {category}")
    print(f"  -> RECOMMENDED TECHNOLOGY: {wan_tech}")
    print(f"  -> TECHNICAL JUSTIFICATION: {reason}")
    return wan_tech

if __name__ == "__main__":
    print("=== REMOTE BRANCH CONNECTIVITY SIMULATOR ===")
    evaluate_wan_link("Delhi HQ", "Shimla Branch", 350, "hilly")
    evaluate_wan_link("Mumbai HQ", "Navi Mumbai Branch", 25, "urban")
    evaluate_wan_link("Delhi HQ", "Kolkata Branch", 1450, "plains")
    evaluate_wan_link("Delhi HQ", "London Office", 6700, "transoceanic")
