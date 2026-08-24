# ====================================================================
# Topic 12: Set Comparison: Subset, Superset, Disjoint Sets
# File: subset_superset_demo.py
# Description: Demonstrating issubset(), issuperset(), and comparison operators
# ====================================================================

# Required prerequisite tech stack for Advanced AI track
core_prerequisites = {"Python", "SQL"}

# Student mastered skills profiles
susmita_skills   = {"Python", "SQL", "FastAPI", "React"}
debangshu_skills = {"Python", "SQL"}
mamata_skills    = {"Python", "HTML", "CSS"}

# 1. issubset() and '<=' operator
# Checks if every element of set A is present in set B
print(f"Is Debangshu ready for AI Track? (subset check): {debangshu_skills <= core_prerequisites}")
print(f"Is Susmita ready for AI Track? (subset check): {core_prerequisites.issubset(susmita_skills)}")
print(f"Is Mamata ready for AI Track? (subset check): {core_prerequisites.issubset(mamata_skills)}")

# 2. issuperset() and '>=' operator
# Checks if set A contains every element of set B
print(f"\nDoes Susmita possess all core prerequisites? (superset check): {susmita_skills >= core_prerequisites}")
print(f"Does Mamata possess all core prerequisites? (superset check): {mamata_skills.issuperset(core_prerequisites)}")

# 3. Method flexibility with non-set iterables (lists, tuples)
print(f"\nChecking tuple with issubset(): {core_prerequisites.issubset(('Python', 'SQL', 'Docker'))}")
