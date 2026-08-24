// src/components/study/python/topics/002_006_sets/topic18_files/topic18_questions.js
// 30 Comprehensive Master Review Questions for Topic 18: Real-World Use Cases (Unique Users, Tags, Permissions)

const questions = [
  {
    question: "How can Python sets be used to track Daily Active Users (DAU) in real-time?",
    shortAnswer: "Collect unique user IDs in a set (dau_set.add(user_id)); len(dau_set) gives the instant real-time count of unique active users.",
    explanation: "Because sets automatically collapse duplicate session logins from the same user, len(dau_set) provides an accurate, deduplicated active user metric.",
    hint: "Use a set to collect user IDs and check len(dau_set).",
    level: "basic",
    codeExample: "dau = set()\ndef on_user_login(user_id):\n    dau.add(user_id)\nprint(\"Current DAU:\", len(dau))"
  },
  {
    question: "How do you calculate User Churn between Day 1 and Day 2 using set operations?",
    shortAnswer: "churned_users = day1_users - day2_users.",
    explanation: "Set difference isolates users who were active on Day 1 but failed to log in on Day 2.",
    hint: "Subtract Day 2 active users from Day 1 active users.",
    level: "basic",
    codeExample: "d1 = {\"U1\", \"U2\", \"U3\"}\nd2 = {\"U2\", \"U4\"}\nchurned = d1 - d2\nprint(\"Churned:\", churned)  # {'U1', 'U3'}"
  },
  {
    question: "How do you calculate New User Acquisition between Day 1 and Day 2 using set operations?",
    shortAnswer: "new_users = day2_users - day1_users.",
    explanation: "Subtracting Day 1 users from Day 2 users isolates first-time users seen on Day 2.",
    hint: "Subtract Day 1 users from Day 2 users.",
    level: "basic",
    codeExample: "d1 = {\"U1\", \"U2\"}\nd2 = {\"U1\", \"U2\", \"U3\"}\nnew_users = d2 - d1\nprint(\"New:\", new_users)  # {'U3'}"
  },
  {
    question: "How do you calculate User Retention (returning users) across two consecutive days?",
    shortAnswer: "returning_users = day1_users & day2_users.",
    explanation: "Set intersection extracts users who logged in on both Day 1 and Day 2.",
    hint: "Use set intersection &.",
    level: "basic",
    codeExample: "d1 = {\"U1\", \"U2\", \"U3\"}\nd2 = {\"U2\", \"U3\", \"U4\"}\nretained = d1 & d2\nprint(\"Retained:\", retained)  # {'U2', 'U3'}"
  },
  {
    question: "How do you implement an 'AND' multi-tag search filter (find items matching ALL query tags)?",
    shortAnswer: "search_tags <= item['tags'] (Subset check).",
    explanation: "Checking if search_tags is a subset of item['tags'] asserts that every search keyword is present on the item.",
    hint: "Subset <= tests that all required tags are present.",
    level: "moderate",
    codeExample: "search_tags = {\"python\", \"fastapi\"}\nitem_tags = {\"python\", \"fastapi\", \"docker\"}\nmatches = search_tags <= item_tags  # True"
  },
  {
    question: "How do you implement an 'OR' multi-tag search filter (find items matching ANY query tag)?",
    shortAnswer: "not search_tags.isdisjoint(item['tags']).",
    explanation: "If the search tags and item tags are not disjoint, they share at least one common tag.",
    hint: "Use not isdisjoint() for fast short-circuit OR matching.",
    level: "moderate",
    codeExample: "query = {\"react\", \"vue\"}\nitem_tags = {\"python\", \"react\"}\nmatches = not query.isdisjoint(item_tags)  # True"
  },
  {
    question: "How do you implement a 'NOT' multi-tag exclusion filter (exclude items with banned tags)?",
    shortAnswer: "banned_tags.isdisjoint(item['tags']).",
    explanation: "If the banned tags and item tags are disjoint, the item contains zero banned tags and is safe to include.",
    hint: "isdisjoint() confirms zero overlap with banned tags.",
    level: "basic",
    codeExample: "banned = {\"out_of_stock\", \"discontinued\"}\nitem_tags = {\"in_stock\", \"sale\"}\nis_valid = banned.isdisjoint(item_tags)  # True"
  },
  {
    question: "How does Role-Based Access Control (RBAC) resolve effective permissions for a user with multiple roles?",
    shortAnswer: "effective_permissions = set().union(*(ROLE_PERMS[r] for r in user_roles)).",
    explanation: "Set union combines all permissions granted by each assigned role into a single deduplicated permission set.",
    hint: "Unite permissions across all assigned user roles.",
    level: "expert",
    codeExample: "ROLES = {\n    \"EDITOR\": {\"READ\", \"WRITE\"},\n    \"ADMIN\": {\"DELETE\", \"MANAGE\"}\n}\nuser_roles = [\"EDITOR\", \"ADMIN\"]\neffective = set().union(*(ROLES[r] for r in user_roles))\nprint(effective)  # {'READ', 'WRITE', 'DELETE', 'MANAGE'}"
  },
  {
    question: "How do you find mutual friends between two users in a social network using sets?",
    shortAnswer: "user1_friends & user2_friends (Set intersection).",
    explanation: "Intersection extracts friends that both users share in common in O(min(len(u1), len(u2))) time.",
    hint: "Intersect both friend sets.",
    level: "basic",
    codeExample: "u1_friends = {\"Susmita\", \"Debangshu\", \"Mamata\"}\nu2_friends = {\"Mamata\", \"Debangshu\", \"Rohan\"}\nmutuals = u1_friends & u2_friends\nprint(mutuals)  # {'Debangshu', 'Mamata'}"
  },
  {
    question: "How do you generate candidate friend recommendations ('People You May Know') using set operations?",
    shortAnswer: "candidates = (friends_of_friend - user_friends) - {target_user}.",
    explanation: "Subtracting the user's current friends and the user themselves from friends-of-friends leaves second-degree non-connected contacts.",
    hint: "Subtract current friends and the user from friends-of-friends.",
    level: "expert",
    codeExample: "user_friends = {\"Debangshu\"}\nfriend_of_friend = {\"Susmita\", \"Debangshu\", \"Mamata\"}\ncandidates = friend_of_friend - user_friends - {\"Me\"}\nprint(candidates)  # {'Susmita', 'Mamata'}"
  },
  {
    question: "Why should RBAC role permission definitions be stored as frozenset rather than standard set in production?",
    shortAnswer: "To prevent accidental mutation or tampering with security permissions at runtime.",
    explanation: "frozensets are immutable, guaranteeing that helper functions cannot execute perms.add('SUPER_ADMIN').",
    hint: "frozenset makes security role definitions tamper-proof.",
    level: "moderate",
    codeExample: "ROLE_PERMS = {\"STUDENT\": frozenset({\"READ_LESSON\", \"TAKE_QUIZ\"})}"
  },
  {
    question: "How do sets enable high-speed web crawler visited-URL tracking?",
    shortAnswer: "By storing visited URLs in a set, allowing O(1) membership checks before crawling each hyperlink.",
    explanation: "This prevents circular crawling loops and redundant page downloads in search engines.",
    hint: "Visited URLs in a set prevent redundant crawls in O(1).",
    level: "basic",
    codeExample: "visited = set()\ndef scrape(url):\n    if url in visited: return\n    visited.add(url)"
  },
  {
    question: "How do sets optimize multi-channel notification dispatch systems?",
    shortAnswer: "By uniting recipient sets across email, SMS, and push notification groups (all_recipients = email_set | sms_set | push_set).",
    explanation: "Deduplicates users who belong to multiple notification categories, sending exactly one message per user.",
    hint: "Unite notification recipient sets.",
    level: "basic",
    codeExample: "all_targets = email_users | sms_users | push_users"
  },
  {
    question: "How do sets identify duplicate IP address fraud in voting systems?",
    shortAnswer: "if ip_address in registered_ips: reject_vote() else: registered_ips.add(ip_address).",
    explanation: "Maintains an in-memory set of voting IPs to prevent multiple ballot submissions from the same terminal.",
    hint: "Store voting IPs in a set.",
    level: "basic",
    codeExample: "voted_ips = set()\ndef vote(ip):\n    if ip in voted_ips: return \"Already voted!\"\n    voted_ips.add(ip)"
  },
  {
    question: "How do sets solve the Jaccard Similarity index calculation between two documents?",
    shortAnswer: "similarity = len(set_a & set_b) / len(set_a | set_b).",
    explanation: "The Jaccard Index is mathematically defined as the size of the intersection divided by the size of the union.",
    hint: "len(A & B) / len(A | B).",
    level: "expert",
    codeExample: "def jaccard(words1, words2):\n    s1, s2 = set(words1), set(words2)\n    return len(s1 & s2) / len(s1 | s2)"
  },
  {
    question: "How do sets detect configuration drift between Kubernetes microservice pods?",
    shortAnswer: "drift = pod1_env_vars ^ pod2_env_vars (Symmetric Difference).",
    explanation: "Symmetric difference highlights environment variables set on one pod but missing from another.",
    hint: "Use symmetric difference ^ for drift detection.",
    level: "moderate",
    codeExample: "p1 = {\"ENV=PROD\", \"PORT=8080\"}\np2 = {\"ENV=PROD\", \"PORT=9000\"}\nprint(p1 ^ p2)  # {'PORT=8080', 'PORT=9000'}"
  },
  {
    question: "How do sets optimize spell checkers and anagram finders?",
    shortAnswer: "Converting words to sorted character tuples or frozensets allows grouping anagrams into hash table buckets.",
    explanation: "Words with identical character sets or letter histograms map to the same dictionary key.",
    hint: "Anagrams share identical character sets/signatures.",
    level: "moderate",
    codeExample: "def are_anagrams(w1, w2):\n    return sorted(w1) == sorted(w2)"
  },
  {
    question: "How can sets prevent circular dependency deadlocks in package managers?",
    shortAnswer: "Track package installation dependencies in a visiting = set() during depth-first search (DFS).",
    explanation: "If a package is encountered that is already present in visiting, a circular dependency cycle is detected.",
    hint: "Use a visiting set in DFS to detect dependency cycles.",
    level: "expert",
    codeExample: "# If pkg in visiting_set: raise CircularDependencyError()"
  },
  {
    question: "How do sets validate incoming API JSON request payloads?",
    shortAnswer: "missing_fields = required_fields - set(request_json.keys()).",
    explanation: "Set difference isolates all required fields that the client omitted from the JSON request.",
    hint: "Subtract payload keys from required fields.",
    level: "basic",
    codeExample: "required = {\"username\", \"email\", \"password\"}\npayload = {\"username\": \"susmita\"}\nmissing = required - set(payload.keys())\nprint(\"Missing fields:\", missing)  # {'email', 'password'}"
  },
  {
    question: "How do sets find shared interest tags between two dating app profiles?",
    shortAnswer: "shared_interests = user1_tags & user2_tags.",
    explanation: "Intersection extracts common hobbies in O(min(len(u1), len(u2))) time.",
    hint: "Intersect interest tag sets.",
    level: "basic",
    codeExample: "u1 = {\"coding\", \"music\", \"hiking\"}\nu2 = {\"music\", \"reading\", \"hiking\"}\nprint(u1 & u2)  # {'music', 'hiking'}"
  },
  {
    question: "How do sets compute the vocabulary size of a text corpus in Natural Language Processing (NLP)?",
    shortAnswer: "vocab_size = len({word.lower() for line in corpus for word in line.split()}).",
    explanation: "Set comprehension normalizes words to lowercase and collapses duplicates into unique lexicon vocabulary.",
    hint: "Set comprehension of lowercase words gives vocab size.",
    level: "moderate",
    codeExample: "text = \"Python is great and Python is fast\"\nvocab = {w.lower() for w in text.split()}\nprint(len(vocab))  # 5"
  },
  {
    question: "How do sets assist in financial anti-money laundering (AML) detection?",
    shortAnswer: "By checking transaction counterparties against a global sanctions watchlist set in O(1) time.",
    explanation: "Instantly flags transactions involving sanctioned entities without slowing down high-volume payment processing.",
    hint: "O(1) checks against sanctioned entity sets.",
    level: "moderate",
    codeExample: "SANCTIONED = {\"ACCT-999\", \"ACCT-888\"}\nif beneficiary in SANCTIONED: flag_for_review()"
  },
  {
    question: "How do sets optimize database migration schema diffs?",
    shortAnswer: "added_tables = new_db_tables - old_db_tables; dropped_tables = old_db_tables - new_db_tables.",
    explanation: "Set difference pinpoints created and dropped tables between two database schema snapshots.",
    hint: "Set differences find added and dropped tables.",
    level: "basic",
    codeExample: "old_tables = {\"users\", \"orders\"}\nnew_tables = {\"users\", \"orders\", \"invoices\"}\nprint(\"Added:\", new_tables - old_tables)  # {'invoices'}"
  },
  {
    question: "How do sets enforce uniqueness in distributed event streaming architectures (e.g. Apache Kafka consumer)?",
    shortAnswer: "By deduplicating event IDs using an in-memory set (or Redis set) to ensure exactly-once processing semantics.",
    explanation: "Protects consumer microservices against duplicate message deliveries.",
    hint: "Deduplicates message IDs for exactly-once processing.",
    level: "expert",
    codeExample: "processed = set()\ndef process_event(event_id):\n    if event_id in processed: return\n    processed.add(event_id)"
  },
  {
    question: "How do sets track inventory SKU availability across multiple warehouse locations?",
    shortAnswer: "all_available_skus = warehouse_a_skus | warehouse_b_skus | warehouse_c_skus.",
    explanation: "Set union provides the aggregated catalog of unique available items across all fulfillment centers.",
    hint: "Unite warehouse SKU sets.",
    level: "basic",
    codeExample: "w1, w2 = {\"SKU1\", \"SKU2\"}, {\"SKU2\", \"SKU3\"}\nprint(w1 | w2)  # {'SKU1', 'SKU2', 'SKU3'}"
  },
  {
    question: "How do sets find missing student course submissions in educational ERP systems?",
    shortAnswer: "missing_submissions = enrolled_students - submitted_students.",
    explanation: "Set difference isolates students who have enrolled but not yet submitted the assignment.",
    hint: "Subtract submitted students from enrolled students.",
    level: "basic",
    codeExample: "enrolled = {\"Susmita\", \"Debangshu\", \"Mamata\"}\nsubmitted = {\"Susmita\", \"Mamata\"}\nprint(\"Missing:\", enrolled - submitted)  # {'Debangshu'}"
  },
  {
    question: "How do sets identify user permission violations in cloud IAM policies?",
    shortAnswer: "unauthorized_perms = user_perms - allowed_policy_perms.",
    explanation: "If unauthorized_perms is non-empty, the user possesses privileges exceeding their authorized policy baseline.",
    hint: "Subtract allowed permissions from user permissions.",
    level: "moderate",
    codeExample: "user_perms = {\"READ\", \"WRITE\", \"ADMIN\"}\npolicy = {\"READ\", \"WRITE\"}\nprint(\"Violations:\", user_perms - policy)  # {'ADMIN'}"
  },
  {
    question: "How do sets optimize Sudoku puzzle solvers and constraint satisfaction algorithms?",
    shortAnswer: "Represent remaining possible numbers for each cell as a set of {1..9}, subtracting row, column, and 3x3 box numbers.",
    explanation: "Eliminates illegal candidates through set difference: possible = {1..9} - (row_nums | col_nums | box_nums).",
    hint: "Subtract existing numbers from {1..9}.",
    level: "expert",
    codeExample: "possibles = set(range(1, 10)) - (row_set | col_set | box_set)"
  },
  {
    question: "How do sets manage unique active Bluetooth device discovery in IoT networks?",
    shortAnswer: "Add discovered MAC addresses to an active_devices set; expired devices are removed via set difference.",
    explanation: "Provides real-time, deduplicated hardware device tracking across RF scan cycles.",
    hint: "Track discovered MAC addresses in a set.",
    level: "basic",
    codeExample: "active_beacons = set()\ndef on_ble_advertisement(mac):\n    active_beacons.add(mac)"
  },
  {
    question: "What is the key overarching takeaway for software engineers regarding Python sets in real-world systems?",
    shortAnswer: "Sets are the foundational data structure for uniqueness, access control, relational filtering, and graph algorithms, delivering O(1) performance across modern backend systems.",
    explanation: "From cybersecurity to search engines and e-commerce, mastering Python sets elevates software from naive loops to industrial-grade architectures.",
    hint: "Sets power Uniqueness, Permissions, Tag Filtering, and Graph Connections.",
    level: "basic",
    codeExample: "# Summary Blueprint:\n# 1. Active Users / DAU: set(logins)\n# 2. Tag Filters:        query <= item_tags\n# 3. RBAC Permissions:   role_a | role_b\n# 4. Social Graphs:      user1 & user2"
  }
];

export default questions;
