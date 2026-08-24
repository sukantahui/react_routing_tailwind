# ====================================================================
# Topic 2: Unique Nature of Sets
# File: voter_deduplication.py
# Description: Real-World Electoral & Candidate Verification in Barrackpore & Kolkata
# ====================================================================

# Raw voter registration logs from polling station booths in Barrackpore
raw_voter_logs = [
    {"voter_id": "WB-BP-1001", "name": "Debangshu Mukherjee", "ward": 14},
    {"voter_id": "WB-BP-1002", "name": "Susmita Roy", "ward": 14},
    {"voter_id": "WB-BP-1001", "name": "Debangshu Mukherjee", "ward": 14},  # Duplicate submission
    {"voter_id": "WB-BP-1003", "name": "Mamata Banerjee", "ward": 15},
    {"voter_id": "WB-BP-1002", "name": "Susmita Roy", "ward": 14},          # Duplicate submission
    {"voter_id": "WB-BP-1004", "name": "Abhronila Das", "ward": 16},
]

print(f"Total raw voter submissions logged: {len(raw_voter_logs)}")

# Extract unique voter IDs using a set comprehension
unique_voter_ids = {entry["voter_id"] for entry in raw_voter_logs}
print(f"Verified unique registered voters: {len(unique_voter_ids)}")
print("Unique Voter IDs Set:", unique_voter_ids)

# Calculating election logistics budget in Indian Rupees (₹)
# Standard administrative allowance of ₹150 per unique voter
budget_per_voter = 150
total_election_grant = len(unique_voter_ids) * budget_per_voter
print(f"\nTotal Polling Station Logistics Grant: ₹{total_election_grant}")
