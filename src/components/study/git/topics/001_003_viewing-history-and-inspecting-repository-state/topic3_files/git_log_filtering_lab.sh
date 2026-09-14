#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_03: Limiting & Filtering History (Count, Dates, Author)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Log Filtering Sandbox..."
echo "--------------------------------------------------------"

LAB_DIR="git_log_filtering_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Commit 1 (Author: Debangshu, Date: 10 days ago)
GIT_AUTHOR_NAME="Debangshu Technical" \
GIT_AUTHOR_EMAIL="debangshu@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-04 10:00:00 +0530" \
GIT_COMMITTER_NAME="Sukanta Hui" \
GIT_COMMITTER_EMAIL="sukanta@barrackpore-devs.org" \
GIT_COMMITTER_DATE="2026-09-04 10:00:00 +0530" \
git commit --allow-empty -m "feat(core): initialize billing database schema"

# Commit 2 (Author: Susmita, Date: 5 days ago)
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-09 14:00:00 +0530" \
GIT_COMMITTER_NAME="Sukanta Hui" \
GIT_COMMITTER_EMAIL="sukanta@barrackpore-devs.org" \
GIT_COMMITTER_DATE="2026-09-09 14:00:00 +0530" \
git commit --allow-empty -m "feat(tax): implement CGST and SGST calculation splits"

# Commit 3 (Author: Swadeep, Date: 2 days ago)
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-12 16:30:00 +0530" \
GIT_COMMITTER_NAME="Sukanta Hui" \
GIT_COMMITTER_EMAIL="sukanta@barrackpore-devs.org" \
GIT_COMMITTER_DATE="2026-09-12 16:30:00 +0530" \
git commit --allow-empty -m "fix(auth): fix session token timeout bug"

# Commit 4 (Author: Debangshu, Date: Today)
GIT_AUTHOR_NAME="Debangshu Technical" \
GIT_AUTHOR_EMAIL="debangshu@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-14 09:15:00 +0530" \
GIT_COMMITTER_NAME="Sukanta Hui" \
GIT_COMMITTER_EMAIL="sukanta@barrackpore-devs.org" \
GIT_COMMITTER_DATE="2026-09-14 09:15:00 +0530" \
git commit --allow-empty -m "docs(api): update REST endpoints documentation"

echo ""
echo "=== 1. Limiting by Count: Latest 2 Commits ==="
git log -n 2 --oneline

echo ""
echo "=== 2. Filtering by Author: Debangshu Only ==="
git log --author="Debangshu" --oneline

echo ""
echo "=== 3. Filtering by Date Range: Commits since 2026-09-08 ==="
git log --since="2026-09-08" --oneline

echo ""
echo "=== 4. Combined Filter: Susmita's commits in last 7 days ==="
git log --author="Susmita" --since="7 days ago" --oneline

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
