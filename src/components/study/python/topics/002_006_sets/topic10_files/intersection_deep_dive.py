# ====================================================================
# Topic 10: Union, Intersection, Difference Deep Dive
# File: intersection_deep_dive.py
# Description: In-depth exploration of set.intersection() and '&' operator
# ====================================================================

# Skill requirements for a Full-Stack Python Architect in Kolkata
job_requirements = {"Python", "FastAPI", "React", "PostgreSQL", "Docker", "Git"}

# Candidate skills profiles
candidate_susmita = {"Python", "React", "PostgreSQL", "Git", "Tailwind"}
candidate_debangshu = {"Python", "FastAPI", "PostgreSQL", "Docker", "Git", "React", "AWS"}

# 1. Non-mutating Intersection with '&' operator
matched_susmita = job_requirements & candidate_susmita
print("Matched Skills for Susmita:", matched_susmita)
print(f"Match Count: {len(matched_susmita)} / {len(job_requirements)}")

matched_debangshu = job_requirements & candidate_debangshu
print("\nMatched Skills for Debangshu:", matched_debangshu)
print(f"Match Count: {len(matched_debangshu)} / {len(job_requirements)}")

# 2. Multi-Candidate Common Skills (Chained Intersection)
universal_skills = candidate_susmita & candidate_debangshu & job_requirements
print("\nSkills Mastered by Both Candidates:", universal_skills)

# 3. In-Place Intersection Mutation using '&='
scratch_set = candidate_susmita.copy()
scratch_set &= {"Python", "Rust", "Go"}
print("\nAfter In-Place Intersection (&=):", scratch_set)
