# ====================================================================
# Topic 3: Unordered and Unindexed Collections
# File: ordered_alternatives.py
# Description: Preserving order while deduplicating using dict.fromkeys() & ordered sets
# ====================================================================

# Stream of incoming student admission payments in Barrackpore & Kolkata center
raw_transactions = [
    ("TXN-101", "Susmita Roy", 4500),
    ("TXN-102", "Debangshu Mukherjee", 6500),
    ("TXN-101", "Susmita Roy", 4500),         # Duplicate payment webhook
    ("TXN-103", "Mamata Banerjee", 4500),
    ("TXN-102", "Debangshu Mukherjee", 6500),   # Duplicate payment webhook
    ("TXN-104", "Abhronila Das", 5000),
]

print(f"Total raw payment events received: {len(raw_transactions)}")

# Method 1: Using set() -> Deduplicates but SCRAMBLES original timeline order
scrambled_set = set(raw_transactions)
print("\nMethod 1 (Set) - Deduplicated but timeline order is scrambled:")
for txn in scrambled_set:
    print(" ", txn)

# Method 2: Using dict.fromkeys() -> Deduplicates AND PRESERVES exact timeline order!
ordered_unique = list(dict.fromkeys(raw_transactions))
print("\nMethod 2 (dict.fromkeys) - Deduplicated with EXACT timeline order:")
for txn in ordered_unique:
    print(" ", txn)

# Revenue summary in Indian Rupees (₹)
total_clean_revenue = sum(item[2] for item in ordered_unique)
print(f"\nTotal Verified Course Fees Collected: ₹{total_clean_revenue}")
