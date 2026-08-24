# ====================================================================
# Topic 8: Set Length and Basic Operations
# File: min_max_sum_operations.py
# Description: Built-in aggregate operations: min(), max(), sum(), any(), all()
# ====================================================================

# Monthly student test scores in Barrackpore Computer Science Center
test_scores = {78, 92, 85, 99, 64, 88}

print("Distinct Test Scores:", test_scores)
print(f"Number of distinct scores (len): {len(test_scores)}")
print(f"Lowest Score (min): {min(test_scores)}")
print(f"Highest Score (max): {max(test_scores)}")
print(f"Sum of Distinct Scores (sum): {sum(test_scores)}")
print(f"Average Distinct Score: {sum(test_scores) / len(test_scores):.2f}")

# Using all() and any() predicates
all_passed = all(score >= 40 for score in test_scores)
has_distinction = any(score >= 90 for score in test_scores)

print(f"\nDid all distinct scores pass (>= 40)? -> {all_passed}")
print(f"Is there any distinction score (>= 90)? -> {has_distinction}")
