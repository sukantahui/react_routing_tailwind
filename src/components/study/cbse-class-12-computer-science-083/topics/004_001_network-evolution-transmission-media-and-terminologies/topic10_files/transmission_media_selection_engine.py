"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 10: CBSE Board Examination Transmission Media Selection Engine
Author: Sukanta Hui, Coder & AccoTax
"""

class MediaRecommender:
    @staticmethod
    def recommend(distance_m: float, terrain: str, budget: str, high_emi: bool = False, secure_room_only: bool = False) -> dict:
        """
        Decision engine implementing CBSE Code 083 case-study scoring criteria.
        terrain: 'indoor', 'campus', 'city_roadway', 'mountain_valley', 'remote_island'
        budget: 'low', 'medium', 'high'
        """
        if secure_room_only and distance_m <= 10:
            return {
                "media": "Infrared Transmission",
                "category": "Unguided (Optical)",
                "cbse_rationale": "Infrared is strictly confined within one room by solid walls, preventing external eavesdropping and cross-room interference."
            }
            
        if distance_m <= 100 and terrain in ['indoor', 'campus']:
            if high_emi:
                return {
                    "media": "Shielded Twisted Pair (Cat-6 STP)",
                    "category": "Guided (Copper)",
                    "cbse_rationale": "Under 100m segment limit; metallic foil shielding blocks intense electromagnetic noise from motors/machinery."
                }
            return {
                "media": "Unshielded Twisted Pair (Cat-6 UTP with RJ-45)",
                "category": "Guided (Copper)",
                "cbse_rationale": "Distance is <= 100m. Most economical, flexible, and standard medium for local building interconnects."
            }

        if terrain == 'remote_island' or distance_m > 50000:
            return {
                "media": "Satellite Link (VSAT)",
                "category": "Unguided (Space)",
                "cbse_rationale": "Laying physical cables across oceans or vast remote distances is cost-prohibitive. Satellite provides ubiquitous coverage."
            }

        if terrain in ['mountain_valley', 'city_roadway'] and distance_m <= 45000:
            return {
                "media": "Terrestrial Microwave Link",
                "category": "Unguided (Terrestrial RF)",
                "cbse_rationale": "Physical cable trenching across highways/rocky valleys is prohibited. Microwave provides direct line-of-sight connectivity under 50 km."
            }

        if distance_m > 100:
            return {
                "media": "Optical Fiber Cable (Single-Mode / Multi-Mode)",
                "category": "Guided (Glass)",
                "cbse_rationale": "Exceeds copper's 100m limit. Provides multi-gigabit throughput, low attenuation, and 100% immunity to outdoor lightning and EMI."
            }

def run_recommender_lab():
    print("=" * 70)
    print("CBSE TRANSMISSION MEDIA SELECTION ENGINE - CASE STUDY DRILL")
    print("=" * 70)

    test_cases = [
        ("Lab A to Lab B in same school building", 45, 'indoor', 'low', False, False),
        ("Block 1 to Block 2 across university campus", 850, 'campus', 'high', False, False),
        ("Industrial factory floor with heavy welding machinery", 80, 'indoor', 'medium', True, False),
        ("Head office to Branch office across a wide river", 15000, 'mountain_valley', 'medium', False, False),
        ("Main campus to Mining outpost in remote desert", 85000, 'remote_island', 'high', False, False),
        ("Conference room presentation remote control", 4, 'indoor', 'low', False, True)
    ]

    for title, dist, terr, bud, emi, sec in test_cases:
        res = MediaRecommender.recommend(dist, terr, bud, emi, sec)
        print(f"\nScenario: {title}")
        print(f"  - Distance: {dist}m | Terrain: {terr}")
        print(f"  - Recommended Media: {res['media']} ({res['category']})")
        print(f"  - CBSE Board Justification: {res['cbse_rationale']}")

if __name__ == "__main__":
    run_recommender_lab()