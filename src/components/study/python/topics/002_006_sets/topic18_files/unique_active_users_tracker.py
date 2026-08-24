# ====================================================================
# Topic 18: Real-World Use Cases (Unique Users, Tags, Permissions)
# File: unique_active_users_tracker.py
# Description: Real-time unique active user tracking and DAU analytics
# ====================================================================

# Simulated user session stream (User IDs logging into Kolkata Educational Portal)
daily_login_events = [
    "USR-BP-101", "USR-KOL-202", "USR-BP-101", "USR-ICH-303",
    "USR-KOL-202", "USR-JAD-404", "USR-BP-101", "USR-KOL-505"
]

print(f"Total Login Events Received Today: {len(daily_login_events)}")

# 1. Real-time unique active user tracking via Set
daily_active_users = set(daily_login_events)

print(f"\n--- Daily Active Users (DAU) Summary ---")
print(f"Total Unique Users Logged In: {len(daily_active_users)}")
for uid in sorted(daily_active_users):
    print(f"  ✓ User ID: {uid}")

# 2. Tracking Daily Returning vs New Users across two days
day1_users = {"USR-BP-101", "USR-KOL-202", "USR-ICH-303"}
day2_users = {"USR-BP-101", "USR-KOL-202", "USR-JAD-404", "USR-KOL-505"}

returning_users = day1_users & day2_users
new_users = day2_users - day1_users
churned_users = day1_users - day2_users

print(f"\n--- Cohort Retention Metrics ---")
print(f"Returning Users (Day 1 ∩ Day 2): {returning_users}")
print(f"New Users Acquired (Day 2 - Day 1): {new_users}")
print(f"Churned / Inactive Users (Day 1 - Day 2): {churned_users}")
