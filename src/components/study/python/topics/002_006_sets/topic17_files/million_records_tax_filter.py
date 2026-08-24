# ====================================================================
# Topic 17: Performance Benefits of Sets
# File: million_records_tax_filter.py
# Description: Real-World High-Performance Tax Exemption Audit in Barrackpore (₹)
# ====================================================================

import time

# 10,000 Tax-Exempt NGO PAN Numbers in West Bengal
exempt_pan_set = {f"WB-EXEMPT-PAN-{i:05d}" for i in range(10000)}

# Stream of 250,000 Financial Transactions in Indian Rupees (₹)
sample_txns = [
    {
        "txn_id": f"TXN-{i:07d}",
        "pan": f"WB-EXEMPT-PAN-{i % 25000:05d}",
        "amount_inr": (i % 10 + 1) * 2500
    }
    for i in range(250000)
]

print(f"Auditing {len(sample_txns):,} Financial Transactions against {len(exempt_pan_set):,} Exempt PANs...")

start = time.perf_counter()
exempt_txns = [
    txn for txn in sample_txns
    if txn["pan"] in exempt_pan_set  # O(1) Set Hash Lookup!
]
audit_time = time.perf_counter() - start

total_exempt_amount = sum(t["amount_inr"] for t in exempt_txns)

print(f"\n--- Audit Summary (Barrackpore Regional Tax Division) ---")
print(f"Total Transactions Processed: {len(sample_txns):,}")
print(f"Tax-Exempt Transactions Found: {len(exempt_txns):,}")
print(f"Total Exempt Value Calculated: ₹{total_exempt_amount:,}")
print(f"Audit Processing Time:         {audit_time:.4f} seconds (Blazing fast!)")
