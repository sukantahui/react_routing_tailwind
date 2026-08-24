# ====================================================================
# Topic 11: Symmetric Difference Deep Dive
# File: symmetric_difference_update_demo.py
# Description: Demonstrating set.symmetric_difference_update() and '^=' operator
# ====================================================================

# Active feature flags on Production Server in Kolkata
production_flags = {"DARK_MODE", "BETA_PAYMENTS", "ANALYTICS_V2", "SSO_LOGIN"}
print("Initial Production Flags:", production_flags)

# Staging Environment Feature Flags
staging_flags = {"BETA_PAYMENTS", "ANALYTICS_V2", "NEW_UI_SIDEBAR", "AI_TUTOR"}
print("Staging Environment Flags:", staging_flags)

# 1. In-Place Symmetric Difference Mutation using '^=' operator
# Mutates production_flags to hold only flags that DIFFER between Prod and Staging
divergent_flags = production_flags.copy()
divergent_flags ^= staging_flags
print("\n--- After In-Place '^=' Mutation ---")
print("Divergent Feature Flags:", divergent_flags)

# 2. Named method equivalent: .symmetric_difference_update()
alt_flags = {"A", "B", "C"}
alt_flags.symmetric_difference_update({"B", "C", "D"})
print("\nAfter .symmetric_difference_update():", alt_flags)  # {'A', 'D'}
