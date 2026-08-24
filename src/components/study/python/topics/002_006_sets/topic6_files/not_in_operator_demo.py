# ====================================================================
# Topic 6: Membership Testing Using 'in' and 'not in'
# File: not_in_operator_demo.py
# Description: Demonstrating 'not in' filtering & security blocklists
# ====================================================================

# Active blacklist of suspicious IP addresses or banned voter IDs
banned_voter_ids = {"WB-BP-999", "WB-BP-888", "WB-BP-777"}

# Incoming voter check queue
voter_queue = ["WB-BP-1001", "WB-BP-999", "WB-BP-1002", "WB-BP-888", "WB-BP-1003"]

allowed_voters = []
for voter in voter_queue:
    # 'not in' check executes in O(1) time
    if voter not in banned_voter_ids:
        allowed_voters.append(voter)
    else:
        print(f"[SECURITY ALERT]: Banned voter '{voter}' flagged and blocked!")

print("\nAllowed Voters Queue:", allowed_voters)
