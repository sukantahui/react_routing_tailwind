# ====================================================================
# Topic 10: Union, Intersection, Difference Deep Dive
# File: difference_deep_dive.py
# Description: In-depth exploration of set.difference() and '-' operator
# ====================================================================

job_requirements = {"Python", "FastAPI", "React", "PostgreSQL", "Docker", "Git"}
candidate_skills = {"Python", "React", "PostgreSQL"}

# 1. Missing skills calculation (Requirements - Candidate)
missing_skills = job_requirements - candidate_skills
print("Job Requirements:", job_requirements)
print("Candidate Skills:", candidate_skills)
print("\nMissing Skills Required for Hiring (A - B):", missing_skills)

# 2. Non-commutative nature: B - A != A - B
extra_skills = candidate_skills - job_requirements
print("Extra Skills not required (B - A):", extra_skills)

# 3. Multi-set difference: A - B - C
backend_basics = {"Python", "Git"}
advanced_missing = job_requirements - candidate_skills - backend_basics
print("\nAdvanced Skills Missing (A - B - C):", advanced_missing)

# 4. In-Place Difference Mutation using '-='
editable_requirements = job_requirements.copy()
editable_requirements -= {"Docker", "Git"}
print("\nAfter In-Place Difference (-=):", editable_requirements)
