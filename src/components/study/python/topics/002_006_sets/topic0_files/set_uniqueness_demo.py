# ====================================================================
# Topic 0: Introduction to Sets in Python
# File: set_uniqueness_demo.py
# Description: Demonstrating instant deduplication from raw data lists
# ====================================================================

# Raw list of candidate registration numbers from Barrackpore test center
raw_registrations = [
    "REG-701", "REG-702", "REG-701", "REG-705",
    "REG-703", "REG-702", "REG-708", "REG-701",
    "REG-705", "REG-709", "REG-703"
]

print(f"Total raw registration logs: {len(raw_registrations)}")

# Instant deduplication using set() constructor
unique_registrations = set(raw_registrations)
print(f"Total verified unique candidates: {len(unique_registrations)}")
print("Unique Registration IDs:", unique_registrations)

# Practical fee calculation (₹500 per unique candidate)
fee_per_candidate = 500
total_collection = len(unique_registrations) * fee_per_candidate
print(f"\nTotal Exam Fee Collected: ₹{total_collection}")

# Converting back to a sorted list for administrative reporting
sorted_candidates = sorted(unique_registrations)
print("Sorted Candidate Register:", sorted_candidates)
