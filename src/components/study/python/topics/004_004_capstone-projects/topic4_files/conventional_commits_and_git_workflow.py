"""
# Module: 004_004_capstone-projects
# Topic 4: Publishing projects to GitHub with Git commits, issues, and releases
# File: conventional_commits_and_git_workflow.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Conventional Commit validation, SemVer bumping, and Git workflows.
"""

import re
from dataclasses import dataclass

@dataclass
class ConventionalCommit:
    commit_type: str
    scope: str | None
    description: str
    is_breaking: bool = False

    @classmethod
    def parse(cls, message: str) -> "ConventionalCommit":
        pattern = r"^(?P<type>feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\((?P<scope>[a-zA-Z0-9_-]+)\))?(?P<breaking>!)?: (?P<desc>.+)$"
        match = re.match(pattern, message.strip())
        if not match:
            raise ValueError(f"Invalid Conventional Commit message: '{message}'")
        
        return cls(
            commit_type=match.group("type"),
            scope=match.group("scope"),
            description=match.group("desc"),
            is_breaking=bool(match.group("breaking"))
        )

def bump_semver(current_version: str, commits: list[ConventionalCommit]) -> str:
    """Calculates next semantic version (MAJOR.MINOR.PATCH) based on commit history."""
    major, minor, patch = map(int, current_version.lstrip("v").split("."))

    has_breaking = any(c.is_breaking for c in commits)
    has_feat = any(c.commit_type == "feat" for c in commits)
    has_fix = any(c.commit_type == "fix" for c in commits)

    if has_breaking:
        return f"v{major + 1}.0.0"
    elif has_feat:
        return f"v{major}.{minor + 1}.0"
    elif has_fix:
        return f"v{major}.{minor}.{patch + 1}"
    return f"v{major}.{minor}.{patch}"

def test_conventional_commits():
    print("   [...] Testing Conventional Commit Parsing & SemVer Engine...")

    # 1. Parse valid commits
    c1 = ConventionalCommit.parse("feat(admission): add Barrackpore regional merit grant")
    assert c1.commit_type == "feat" and c1.scope == "admission"
    print("   [PASS] 1. Feature commit parsed cleanly")

    c2 = ConventionalCommit.parse("fix(ledger): correct tuition tax rounding bug")
    assert c2.commit_type == "fix" and c2.scope == "ledger"
    print("   [PASS] 2. Bug fix commit parsed cleanly")

    # 2. Test Invalid Commit Rejection
    try:
        ConventionalCommit.parse("updated some files and fixed stuff")
        assert False, "Expected ValueError on non-conventional commit"
    except ValueError as e:
        print("   [PASS] 3. Non-conventional commit message rejected safely")

    # 3. SemVer Bump: v1.0.0 -> v1.1.0 (Feature added)
    next_ver = bump_semver("v1.0.0", [c1, c2])
    assert next_ver == "v1.1.0"
    print(f"   [PASS] 4. SemVer bumped: v1.0.0 -> {next_ver} (Minor version bump on 'feat')")

def main():
    print("=" * 75)
    print("[CONVENTIONAL COMMITS] Standardized Commit Parsing & SemVer Engine")
    print("=" * 75)

    test_conventional_commits()

    print("=" * 75)
    print("[TAKEAWAY] Adhering to Conventional Commits enables automated release tools")
    print("           to bump semantic versions and generate changelogs with zero manual effort.")
    print("=" * 75)

if __name__ == "__main__":
    main()
