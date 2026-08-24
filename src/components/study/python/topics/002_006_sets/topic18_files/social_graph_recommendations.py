# ====================================================================
# Topic 18: Real-World Use Cases (Unique Users, Tags, Permissions)
# File: social_graph_recommendations.py
# Description: Mutual Friend Detection & Friend Recommendation Engine
# ====================================================================

# Social Network connection graph across Barrackpore, Kolkata & Jadavpur
friend_graph = {
    "Susmita":   {"Debangshu", "Mamata", "Abhronila"},
    "Debangshu": {"Susmita", "Mamata", "Rohan", "Pooja"},
    "Mamata":    {"Susmita", "Debangshu", "Rohan"},
    "Abhronila": {"Susmita", "Tanmay"},
    "Rohan":     {"Debangshu", "Mamata", "Tanmay"},
    "Pooja":     {"Debangshu"},
    "Tanmay":    {"Abhronila", "Rohan"}
}

def find_mutual_friends(user1: str, user2: str) -> set:
    """Finds common mutual connections via Set Intersection."""
    return friend_graph.get(user1, set()) & friend_graph.get(user2, set())

def recommend_friends(target_user: str) -> dict:
    """Recommends new friends based on highest mutual connection count."""
    user_friends = friend_graph.get(target_user, set())
    candidate_scores = {}

    for friend in user_friends:
        friends_of_friend = friend_graph.get(friend, set())
        # Candidates are friends-of-friends who are NOT the user and NOT already direct friends
        potential_candidates = friends_of_friend - user_friends - {target_user}

        for candidate in potential_candidates:
            mutuals = find_mutual_friends(target_user, candidate)
            candidate_scores[candidate] = len(mutuals)

    return dict(sorted(candidate_scores.items(), key=lambda x: x[1], reverse=True))


# 1. Mutual Friends between Susmita and Rohan
print("Mutual Friends between Susmita & Rohan:", find_mutual_friends("Susmita", "Rohan"))

# 2. Friend Recommendations for Susmita
recs = recommend_friends("Susmita")
print("\n--- Friend Recommendations for Susmita ---")
for person, count in recs.items():
    mutual_names = find_mutual_friends("Susmita", person)
    print(f"  • Recommend {person} ({count} mutual friends: {mutual_names})")
