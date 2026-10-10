"""
Module 003: Emerging Trends in Computing
Topic 4: Immersive Experiences (AR, VR, MR) Simulation
Pure Python Model of 6-DoF Tracking, Spatial Audio, and Reality-Virtuality Continuum.
"""

from typing import Dict, Tuple

class RealityContinuumSimulator:
    """Simulates Milgram's Reality-Virtuality Continuum and spatial tracking."""

    def __init__(self):
        self.tracking_modes = ["3-DoF (Rotational)", "6-DoF (Rotational + Positional)"]
        self.device_profiles = {
            "AR": {
                "name": "Augmented Reality (AR)",
                "immersion_level": "Overlay on Real World",
                "display": "Transparent Glass / Smartphone Camera Screen",
                "environment": "Physical World with Digital Overlays",
                "hardware_examples": ["Google Glass", "Apple ARKit", "Pokémon GO"]
            },
            "VR": {
                "name": "Virtual Reality (VR)",
                "immersion_level": "100% Synthetic Immersion",
                "display": "Opaque Head-Mounted Display (HMD)",
                "environment": "Fully Artificial Computer-Generated World",
                "hardware_examples": ["Meta Quest 3", "HTC Vive", "PlayStation VR"]
            },
            "MR": {
                "name": "Mixed Reality (MR / Extended Reality - XR)",
                "immersion_level": "Interactive Hybrid Co-existence",
                "display": "Passthrough Spatial Headset with Depth Sensors",
                "environment": "Digital & Physical Objects Interact in Real-Time",
                "hardware_examples": ["Microsoft HoloLens 2", "Apple Vision Pro", "Magic Leap 2"]
            }
        }

    def compute_spatial_pose(
        self,
        yaw: float,
        pitch: float,
        roll: float,
        pos_x: float,
        pos_y: float,
        pos_z: float,
        mode: str = "6-DoF"
    ) -> Dict[str, any]:
        """Calculates spatial tracking coordinates for VR/AR headsets."""
        if mode == "3-DoF":
            return {
                "mode": "3 Degrees of Freedom (Orientation Only)",
                "rotation": {"yaw": yaw, "pitch": pitch, "roll": roll},
                "position": {"x": 0.0, "y": 0.0, "z": 0.0},
                "note": "User can look around (head rotation) but cannot walk around the space."
            }
        else:
            return {
                "mode": "6 Degrees of Freedom (Orientation + Translation)",
                "rotation": {"yaw": yaw, "pitch": pitch, "roll": roll},
                "position": {"x": pos_x, "y": pos_y, "z": pos_z},
                "note": "Full room-scale tracking: user can look around AND walk physically in 3D space."
            }

    def simulate_interaction(self, tech_type: str, user_action: str) -> str:
        """Simulates how physical actions translate across AR, VR, and MR environments."""
        tech = self.device_profiles.get(tech_type.upper(), self.device_profiles["AR"])
        if tech_type.upper() == "AR":
            return f"[{tech['name']}] The smartphone overlays a virtual 3D sofa into your physical living room. Action: {user_action}"
        elif tech_type.upper() == "VR":
            return f"[{tech['name']}] The HMD renders an alien planetary landscape, blocking all real-world vision. Action: {user_action}"
        elif tech_type.upper() == "MR":
            return f"[{tech['name']}] A virtual bouncing ball detects the physical wooden table in your room and realistically bounces off its surface! Action: {user_action}"
        return "Unknown Technology"

if __name__ == "__main__":
    sim = RealityContinuumSimulator()
    
    print("=" * 65)
    print("Immersive Experiences: AR vs VR vs MR Reality Continuum")
    print("=" * 65)
    
    for tech, info in sim.device_profiles.items():
        print(f"\nTechnology: {info['name']}")
        print(f"  - Immersion  : {info['immersion_level']}")
        print(f"  - Display    : {info['display']}")
        print(f"  - Environment: {info['environment']}")
        print(f"  - Examples   : {', '.join(info['hardware_examples'])}")

    print("\n" + "=" * 65)
    print("Spatial 6-DoF vs 3-DoF Headset Tracking Pose")
    print("=" * 65)
    pose_3dof = sim.compute_spatial_pose(yaw=45.0, pitch=10.0, roll=0.0, pos_x=1.2, pos_y=0.0, pos_z=-0.5, mode="3-DoF")
    pose_6dof = sim.compute_spatial_pose(yaw=45.0, pitch=10.0, roll=0.0, pos_x=1.2, pos_y=1.7, pos_z=-0.5, mode="6-DoF")
    print(f"3-DoF Output: {pose_3dof}")
    print(f"6-DoF Output: {pose_6dof}")

    print("\n" + "=" * 65)
    print("Interaction Simulator")
    print("=" * 65)
    print(sim.simulate_interaction("AR", "User places sofa"))
    print(sim.simulate_interaction("VR", "User explores spaceship flight deck"))
    print(sim.simulate_interaction("MR", "User throws virtual ball on real desk"))
