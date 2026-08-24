# ====================================================================
# Topic 15: Removing Duplicates Using Sets
# File: order_preserving_deduplication.py
# Description: Preserving exact insertion order while deduplicating in O(N) time
# ====================================================================

# Timeline stream of course fee payments in Kolkata Center
payment_stream = [
    "TXN-101 (Susmita)",
    "TXN-102 (Debangshu)",
    "TXN-101 (Susmita)",     # Duplicate webhook retry
    "TXN-103 (Mamata)",
    "TXN-102 (Debangshu)",   # Duplicate webhook retry
    "TXN-104 (Abhronila)"
]

print("Original Timeline Sequence:")
for p in payment_stream:
    print(" ", p)

# METHOD 1: list(set(data)) -> Deduplicates but scrambles order
scrambled_order = list(set(payment_stream))
print("\nMethod 1: list(set()) - Scrambled Timeline Order:")
for p in scrambled_order:
    print(" ", p)

# METHOD 2: list(dict.fromkeys(data)) -> Deduplicates AND preserves exact timeline!
ordered_dedup = list(dict.fromkeys(payment_stream))
print("\nMethod 2: list(dict.fromkeys()) - PRESERVES Exact Timeline Sequence:")
for p in ordered_dedup:
    print(" ", p)

# METHOD 3: Using a 'seen' set with list comprehension (Generator pattern)
def deduplicate_stream(iterable):
    seen = set()
    for item in iterable:
        if item not in seen:
            seen.add(item)
            yield item

generator_dedup = list(deduplicate_stream(payment_stream))
print("\nMethod 3: 'seen' Set Generator -> Order Matches dict.fromkeys:", generator_dedup == ordered_dedup)
