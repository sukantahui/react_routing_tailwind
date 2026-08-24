# ====================================================================
# Topic 18: Real-World Use Cases (Unique Users, Tags, Permissions)
# File: tag_filtering_engine.py
# Description: E-Commerce Product Multi-Tag Search & Filtering Engine in ₹
# ====================================================================

# Product Catalog in Barrackpore & Kolkata Institute
courses_catalog = [
    {
        "id": "CRS-101",
        "title": "Python for Beginners",
        "fee_inr": 4500,
        "tags": {"python", "beginner", "backend", "online"}
    },
    {
        "id": "CRS-102",
        "title": "FastAPI & Microservices Mastery",
        "fee_inr": 7500,
        "tags": {"python", "advanced", "backend", "fastapi", "docker"}
    },
    {
        "id": "CRS-103",
        "title": "React & Tailwind Frontend Bootcamp",
        "fee_inr": 5500,
        "tags": {"javascript", "frontend", "react", "tailwind", "online"}
    },
    {
        "id": "CRS-104",
        "title": "Fullstack AI Engineer Pro",
        "fee_inr": 12500,
        "tags": {"python", "advanced", "ai", "machine-learning", "backend", "docker"}
    }
]

def search_courses_all_tags(required_tags: set):
    """AND Query: Returns courses containing ALL searched tags (Subset logic)."""
    return [c for c in courses_catalog if required_tags <= c["tags"]]

def search_courses_any_tag(search_tags: set):
    """OR Query: Returns courses containing ANY searched tag (Intersection logic)."""
    return [c for c in courses_catalog if not search_tags.isdisjoint(c["tags"])]


# 1. User searches for courses with BOTH "python" AND "backend" (AND match)
query_and = {"python", "backend"}
matched_and = search_courses_all_tags(query_and)
print(f"--- Courses with ALL tags {query_and} (AND Match) ---")
for c in matched_and:
    print(f"  • {c['title']} (₹{c['fee_inr']:,})")

# 2. User searches for courses with EITHER "react" OR "ai" (OR match)
query_or = {"react", "ai"}
matched_or = search_courses_any_tag(query_or)
print(f"\n--- Courses with ANY tag {query_or} (OR Match) ---")
for c in matched_or:
    print(f"  • {c['title']} (₹{c['fee_inr']:,})")
