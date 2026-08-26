// topic4_files/topic4_questions.js
// Module 005_003_interview-prep-and-cheat-sheet
// Topic 4: Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR)

const questions = [
  {
    "question": "What is the key technical insight required to excel in Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR)?",
    "shortAnswer": "It requires combining relational theory (ACID, normal forms), query algorithmic patterns (Window Functions, CTEs), and MySQL internal mechanics (InnoDB, B-Trees, MVCC).",
    "explanation": "Top-tier database interviews test both theoretical correctness and practical query performance under real-world edge cases.",
    "hint": "Focus on query efficiency, edge-case safety, and underlying storage engine mechanics.",
    "level": "basic",
    "codeExample": "-- Interview Question Milestone: Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR)\n-- Standardized SQL Evaluation Template."
  },
  {
    "question": "How do Mamata and Susmita solve the core problem of Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) during technical screenings in Barrackpore?",
    "shortAnswer": "They structure their solutions using modern Common Table Expressions (CTEs), verify NULL safety, and validate execution efficiency using EXPLAIN.",
    "explanation": "Barrackpore software engineers demonstrate structured problem solving by stating assumptions and testing boundary conditions.",
    "hint": "Think about CTE readability, NULL handling, and EXPLAIN plan defense.",
    "level": "intermediate",
    "codeExample": "-- Barrackpore Interview Query Strategy:\nWITH ValidData AS (SELECT * FROM table_4 WHERE col IS NOT NULL) SELECT * FROM ValidData;"
  },
  {
    "question": "In Abhronila and Debangshu's Kolkata technical panel, how does Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) separate senior engineers from junior developers?",
    "shortAnswer": "Senior engineers analyze index fan-out, explain lock escalation risks, handle tie-breaking in ranking queries, and propose scalable caching topologies.",
    "explanation": "Distinguishing between subquery performance and window function streaming proves deep relational engine mastery.",
    "hint": "Consider index utilization, locking contention, and scaling trade-offs.",
    "level": "moderate",
    "codeExample": "-- Kolkata Technical Panel Benchmark:\nEXPLAIN FORMAT=TREE SELECT * FROM ledger_4 ORDER BY created_at DESC;"
  },
  {
    "question": "What common trap or edge case in Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) frequently disqualifies candidates in coding rounds?",
    "shortAnswer": "Failing to account for NULL values in NOT IN queries, ignoring ties in salary rankings, or proposing O(N^2) correlated subqueries for high-volume datasets.",
    "explanation": "Understanding SQL three-valued logic and choosing DENSE_RANK() over RANK() prevents disqualifying query bugs.",
    "hint": "Think about NOT IN (NULL) traps and duplicate ranking ties.",
    "level": "expert",
    "codeExample": "-- Trap Elimination Pattern:\nSELECT * FROM t1 WHERE NOT EXISTS (SELECT 1 FROM t2 WHERE t2.id = t1.id);"
  },
  {
    "question": "Question 5: How would you explain and solve interview problem #5 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 5: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "basic",
    "codeExample": "-- Interview Scenario #5 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 6: How would you explain and solve interview problem #6 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 6: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "basic",
    "codeExample": "-- Interview Scenario #6 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 7: How would you explain and solve interview problem #7 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 7: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "basic",
    "codeExample": "-- Interview Scenario #7 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 8: How would you explain and solve interview problem #8 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 8: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "basic",
    "codeExample": "-- Interview Scenario #8 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 9: How would you explain and solve interview problem #9 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 9: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "basic",
    "codeExample": "-- Interview Scenario #9 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 10: How would you explain and solve interview problem #10 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 10: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "basic",
    "codeExample": "-- Interview Scenario #10 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 11: How would you explain and solve interview problem #11 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 11: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #11 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 12: How would you explain and solve interview problem #12 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 12: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #12 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 13: How would you explain and solve interview problem #13 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 13: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #13 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 14: How would you explain and solve interview problem #14 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 14: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #14 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 15: How would you explain and solve interview problem #15 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 15: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #15 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 16: How would you explain and solve interview problem #16 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 16: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #16 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 17: How would you explain and solve interview problem #17 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 17: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #17 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 18: How would you explain and solve interview problem #18 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 18: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #18 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 19: How would you explain and solve interview problem #19 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 19: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #19 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 20: How would you explain and solve interview problem #20 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 20: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "intermediate",
    "codeExample": "-- Interview Scenario #20 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 21: How would you explain and solve interview problem #21 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 21: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "moderate",
    "codeExample": "-- Interview Scenario #21 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 22: How would you explain and solve interview problem #22 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 22: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "moderate",
    "codeExample": "-- Interview Scenario #22 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 23: How would you explain and solve interview problem #23 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 23: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "moderate",
    "codeExample": "-- Interview Scenario #23 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 24: How would you explain and solve interview problem #24 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 24: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "moderate",
    "codeExample": "-- Interview Scenario #24 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 25: How would you explain and solve interview problem #25 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 25: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "moderate",
    "codeExample": "-- Interview Scenario #25 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 26: How would you explain and solve interview problem #26 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 26: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "moderate",
    "codeExample": "-- Interview Scenario #26 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 27: How would you explain and solve interview problem #27 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 27: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "expert",
    "codeExample": "-- Interview Scenario #27 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 28: How would you explain and solve interview problem #28 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 28: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "expert",
    "codeExample": "-- Interview Scenario #28 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 29: How would you explain and solve interview problem #29 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 29: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "expert",
    "codeExample": "-- Interview Scenario #29 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  },
  {
    "question": "Question 30: How would you explain and solve interview problem #30 related to Top 15 DBA, Concurrency & High Availability Questions (Isolation Levels, Deadlocks, Replication Lag, Backup/PITR) in a high-stakes technical interview?",
    "shortAnswer": "By clarifying boundary requirements, selecting the optimal O(N) SQL pattern (CTE/Window Function), accounting for NULL values, and explaining the EXPLAIN execution plan.",
    "explanation": "Detailed walkthrough of interview challenge 30: ensures clean code, handles edge cases, and satisfies the interviewer's performance criteria.",
    "hint": "Recall structured problem-solving steps: Clarify -> Model -> Query -> Optimize.",
    "level": "expert",
    "codeExample": "-- Interview Scenario #30 Solution:\nSELECT id, DENSE_RANK() OVER (ORDER BY score DESC) AS rnk FROM candidates_4;"
  }
];

export default questions;
