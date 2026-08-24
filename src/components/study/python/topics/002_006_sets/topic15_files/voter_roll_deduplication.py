# ====================================================================
# Topic 15: Removing Duplicates Using Sets
# File: voter_roll_deduplication.py
# Description: Real-World Voter Electoral Roll Deduplication & Fee Audit in ₹
# ====================================================================

# Raw voter registry list across Barrackpore polling stations
voter_registry = [
    {"voter_id": "WB-BP-1001", "name": "Susmita Roy", "booth": "Barrackpore-01"},
    {"voter_id": "WB-BP-1002", "name": "Debangshu Mukherjee", "booth": "Barrackpore-02"},
    {"voter_id": "WB-BP-1001", "name": "Susmita Roy", "booth": "Barrackpore-01"}, # Duplicate record
    {"voter_id": "WB-BP-1003", "name": "Mamata Banerjee", "booth": "Barrackpore-03"},
    {"voter_id": "WB-BP-1004", "name": "Abhronila Das", "booth": "Barrackpore-01"},
    {"voter_id": "WB-BP-1002", "name": "Debangshu Mukherjee", "booth": "Barrackpore-02"}, # Duplicate record
]

print(f"Total Raw Electoral Roll Entries: {len(voter_registry)}")

# Order-Preserved Deduplication based on 'voter_id' key
seen_ids = set()
clean_voter_roll = []

for voter in voter_registry:
    vid = voter["voter_id"]
    if vid not in seen_ids:
        seen_ids.add(vid)
        clean_voter_roll.append(voter)

print(f"Total Verified Clean Unique Voters: {len(clean_voter_roll)}\n")
for v in clean_voter_roll:
    print(f"  Voter ID: {v['voter_id']} | Name: {v['name']:20} | Polling Booth: {v['booth']}")
