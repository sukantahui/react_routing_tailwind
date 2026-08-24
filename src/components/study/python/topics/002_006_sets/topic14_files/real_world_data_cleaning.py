# ====================================================================
# Topic 14: Set Comprehension
# File: real_world_data_cleaning.py
# Description: Real-World Webhook Payment Normalization & Revenue Audit in ₹
# ====================================================================

# Raw incoming webhook payloads with messy casing, whitespace, and duplicates
raw_payment_webhooks = [
    {"txn_id": " txn-101 ", "student": "susmita roy", "amount_inr": 4500, "status": "COMPLETED"},
    {"txn_id": "TXN-102", "student": "Debangshu MUKHERJEE", "amount_inr": 6500, "status": "COMPLETED"},
    {"txn_id": "TXN-101", "student": "Susmita Roy", "amount_inr": 4500, "status": "COMPLETED"}, # Duplicate retry
    {"txn_id": "TXN-103", "student": "mamata banerjee", "amount_inr": 4500, "status": "FAILED"}, # Failed
    {"txn_id": "TXN-104", "student": "abhronila das", "amount_inr": 5000, "status": "COMPLETED"},
]

# Set Comprehension: Clean and extract distinct successful student names in Title Case
verified_paid_students = {
    txn["student"].strip().title()
    for txn in raw_payment_webhooks
    if txn["status"] == "COMPLETED"
}

print("--- Clean Verified Paid Students Set ---")
print(f"Total Unique Paid Students: {len(verified_paid_students)}")
for student in sorted(verified_paid_students):
    print(f"  ✓ {student}")

# Set Comprehension: Distinct cleaned Transaction IDs
clean_txn_ids = {txn["txn_id"].strip().upper() for txn in raw_payment_webhooks if txn["status"] == "COMPLETED"}
print("\nUnique Completed Transaction IDs:", clean_txn_ids)
