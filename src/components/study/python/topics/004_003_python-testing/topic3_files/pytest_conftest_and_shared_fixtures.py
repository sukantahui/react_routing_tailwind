"""
# Module: 004_003_python-testing
# Topic 3: Modern testing with PyTest: test discovery, assert statements, fixtures
# File: pytest_conftest_and_shared_fixtures.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating conftest.py shared fixture discovery and composition
#              across multi-campus candidate records (Barrackpore, Kolkata, Ichapur).
"""

# Simulated conftest.py shared fixture provider
def conftest_campus_roster_fixture():
    """Simulates conftest.py root fixture providing mock campus data."""
    return {
        "Barrackpore": [
            {"name": "Mamata", "course": "Python Pro", "score": 96.0},
            {"name": "Debangshu", "course": "Data AI", "score": 88.0}
        ],
        "Kolkata": [
            {"name": "Mahima", "course": "Python Pro", "score": 92.0},
            {"name": "Susmita", "course": "Cloud DevOps", "score": 85.0}
        ],
        "Ichapur": [
            {"name": "Abhronila", "course": "Python Pro", "score": 94.0}
        ]
    }

def conftest_top_performers_fixture(campus_roster):
    """Simulates composed fixture filtering top performers (Score >= 90)."""
    top_students = []
    for campus, students in campus_roster.items():
        for s in students:
            if s["score"] >= 90.0:
                top_students.append((s["name"], campus, s["score"]))
    return top_students

# ------------------------------------------------------------------------------
# TESTS
# ------------------------------------------------------------------------------
def test_campus_roster_distribution(roster):
    assert "Barrackpore" in roster
    assert "Kolkata" in roster
    assert "Ichapur" in roster
    assert len(roster["Barrackpore"]) == 2
    print("   [PASS] test_campus_roster_distribution (All campuses present)")

def test_top_performers_count(top_performers):
    # Mamata (BP: 96.0), Mahima (CC: 92.0), Abhronila (IC: 94.0) -> Exactly 3 students!
    assert len(top_performers) == 3
    names = [s[0] for s in top_performers]
    assert "Mamata" in names
    assert "Mahima" in names
    assert "Abhronila" in names
    print("   [PASS] test_top_performers_count (Top 3 candidates verified)")

def main():
    print("=" * 75)
    print("[PYTEST CONFTEST.PY & COMPOSITION] Shared Multi-Campus Fixtures")
    print("=" * 75)

    # Resolve shared conftest fixtures
    roster = conftest_campus_roster_fixture()
    top_performers = conftest_top_performers_fixture(roster)

    test_campus_roster_distribution(roster)
    test_top_performers_count(top_performers)

    print("=" * 75)
    print("[TAKEAWAY] conftest.py allows sharing fixtures project-wide without imports,")
    print("           enabling clean modular test suites and effortless test composition.")
    print("=" * 75)

if __name__ == "__main__":
    main()
