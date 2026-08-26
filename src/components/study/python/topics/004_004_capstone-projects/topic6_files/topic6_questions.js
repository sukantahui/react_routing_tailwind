// src/components/study/python/topics/004_004_capstone-projects/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: System design basics for Python backends

const questions = [
  {
    question: "What is the fundamental difference between Vertical Scaling and Horizontal Scaling?",
    shortAnswer: "Vertical Scaling (Scale-Up) increases CPU, RAM, or disk capacity on a single machine (limited by hardware ceilings and single-point-of-failure); Horizontal Scaling (Scale-Out) adds multiple commodity server instances behind a load balancer, providing near-infinite elastic scale and high availability.",
    explanation: "Scaling paradigms in distributed backend systems.",
    hint: "Vertical = bigger machine; Horizontal = more machines behind a load balancer.",
    level: "basic",
    codeExample: "# Vertical: upgrade from 8GB to 64GB RAM\n# Horizontal: run 10 stateless Gunicorn instances behind NGINX"
  },
  {
    question: "Why must Python web backend instances be 'Stateless' to achieve horizontal scalability?",
    shortAnswer: "Stateless servers do not store client session data or state in local process memory, allowing any random incoming request to be routed to any backend server instance without session loss; user sessions and state are externalized into shared distributed stores like Redis or Memcached.",
    explanation: "Statelessness as the foundation of elastic scaling.",
    hint: "Allows any server to handle any request by storing sessions externally in Redis.",
    level: "basic",
    codeExample: "# Sessions stored in Redis key-value store, not server RAM"
  },
  {
    question: "How does the 'Cache-Aside' (Lazy Loading) pattern work?",
    shortAnswer: "The application first checks the cache for the requested key; on a cache hit, it returns data immediately; on a cache miss, it queries the database, writes the result to the cache with a TTL, and returns the response to the client.",
    explanation: "The standard Cache-Aside lazy loading pattern.",
    hint: "Check cache -> on miss, read DB -> populate cache -> return data.",
    level: "basic",
    codeExample: "val = cache.get(key)\nif not val:\n    val = db.fetch(key)\n    cache.set(key, val, ttl=300)"
  },
  {
    question: "What is a 'Cache Stampede' (Thundering Herd) and how is it prevented?",
    shortAnswer: "A Cache Stampede occurs when a high-traffic cache key expires, causing hundreds of concurrent requests to experience a cache miss simultaneously and hammer the underlying database; it is prevented using distributed mutex locks, probabilistic early expiration (XFetch), or background cache warmers.",
    explanation: "Cache stampede mitigation in high-traffic backends.",
    hint: "Simultaneous DB hit on cache expiration; prevented via mutex locks or background pre-refresh.",
    level: "complex",
    codeExample: "# Acquire distributed lock to allow only 1 process to regenerate cache"
  },
  {
    question: "How does the 'Token Bucket' rate limiting algorithm operate?",
    shortAnswer: "A bucket holds a maximum capacity of tokens, refilled at a constant rate per second; each incoming request consumes one token; if tokens are available, the request is allowed; if empty, the request is rejected with HTTP 429 Too Many Requests. It accommodates burst traffic smoothly.",
    explanation: "Token bucket rate limiting mechanics.",
    hint: "Tokens refill at constant rate; requests consume tokens; allows controlled bursts up to capacity.",
    level: "moderate",
    codeExample: "if bucket.consume(1): process_request()\nelse: return 429 # Rate limited"
  },
  {
    question: "What are Database Read Replicas and how do they scale database operations?",
    shortAnswer: "Read Replicas are synchronized read-only copies of the primary database; write operations (INSERT/UPDATE/DELETE) go to the primary master, while read queries (SELECT) are distributed across read replicas, removing read bottlenecks from the master.",
    explanation: "Primary-replica database scaling topology.",
    hint: "Master handles writes, read-only replicas handle high-volume SELECT queries.",
    level: "basic",
    codeExample: "# Master DB: Writes (Transfers, Admissions)\n# Replica DBs: Reads (Transcripts, Student search)"
  },
  {
    question: "What is Database Connection Pooling (e.g. SQLAlchemy Pool / PgBouncer) and why is it essential?",
    shortAnswer: "Opening TCP connections and authenticating with a database for every incoming HTTP request is slow and memory-intensive; connection pooling maintains a warm pool of pre-established reusable database connections, slashing request latency and preventing DB connection exhaustion.",
    explanation: "Connection pooling latency reduction and resource defense.",
    hint: "Maintains a pool of reusable connections to avoid TCP handshake overhead on every request.",
    level: "basic",
    codeExample: "engine = create_engine('postgresql://...', pool_size=20, max_overflow=10)"
  },
  {
    question: "What is an Asynchronous Background Task Queue (e.g. Celery + Redis / RabbitMQ)?",
    shortAnswer: "A distributed job queue that offloads slow, compute-heavy, or non-blocking operations (such as generating PDF invoices, sending bulk admission emails, or encoding video) away from the HTTP request-response cycle to background worker processes.",
    explanation: "Asynchronous task offloading via message queues.",
    hint: "Offloads slow tasks (PDF generation, emails) to background workers so HTTP endpoints return instantly.",
    level: "basic",
    codeExample: "@celery.task\ndef send_admission_email(sid): ...\nsend_admission_email.delay('STU_01')"
  },
  {
    question: "What are the core tradeoffs stated by the CAP Theorem in distributed databases?",
    shortAnswer: "The CAP Theorem states that in the event of a network Partition (P), a distributed system can guarantee either Consistency (C - all nodes see the same data simultaneously) OR Availability (A - every non-failing node returns a response, though possibly stale), but never both simultaneously.",
    explanation: "CAP theorem consistency vs availability tradeoffs under partition.",
    hint: "Under network partition (P), you must choose between Consistency (C) and Availability (A).",
    level: "moderate",
    codeExample: "# CP System: Bank ledgers (reject write if partition occurs)\n# AP System: Social feeds (return stale feed during partition)"
  },
  {
    question: "What is 'Consistent Hashing' and why is it used in distributed caching (e.g. Memcached / Cassandra)?",
    shortAnswer: "Consistent Hashing maps both keys and server nodes onto a virtual 360-degree hash ring; when a node is added or removed, only K/N keys need to be remapped on average (compared to traditional modulo hashing where nearly all keys are invalidated).",
    explanation: "Consistent hashing for minimal key remapping during cluster resizing.",
    hint: "Maps nodes & keys onto a hash ring so adding/removing nodes remaps minimal keys.",
    level: "complex",
    codeExample: "# Consistent Hashing: Minimizes cache misses when cache servers scale up/down"
  },
  {
    question: "What is an 'API Gateway' (e.g. Kong, NGINX, Traefik)?",
    shortAnswer: "A reverse proxy entry point sitting between external clients and internal microservices that handles cross-cutting concerns: SSL termination, authentication/JWT validation, rate limiting, request routing, and load balancing.",
    explanation: "API Gateway pattern and centralized cross-cutting concerns.",
    hint: "Centralized entrypoint handling SSL, auth, rate limiting, and reverse proxy routing.",
    level: "basic",
    codeExample: "# Client -> API Gateway (Auth & Rate Limit) -> Python Backend Services"
  },
  {
    question: "What is the difference between Write-Through and Write-Behind (Write-Back) caching?",
    shortAnswer: "Write-Through updates the cache and database synchronously (high consistency, higher write latency); Write-Behind updates the cache immediately and enqueues the database write asynchronously in the background (ultra-fast writes, risk of data loss on sudden power failure).",
    explanation: "Write-through vs write-behind caching strategies.",
    hint: "Write-Through updates DB synchronously; Write-Behind updates cache first and DB asynchronously.",
    level: "moderate",
    codeExample: "# Write-Through: Safe & consistent | Write-Behind: Maximum write throughput"
  },
  {
    question: "What is 'Database Sharding' (Horizontal Partitioning)?",
    shortAnswer: "Database Sharding splits large database tables across multiple independent physical database instances based on a shard key (e.g. student ID hash or geographical campus region), scaling storage and write throughput beyond single-machine limits.",
    explanation: "Horizontal database partitioning via shard keys.",
    hint: "Splitting data across multiple physical databases using a shard key.",
    level: "moderate",
    codeExample: "# Shard 1: Barrackpore & Kolkata (North) | Shard 2: Jadavpur (South)"
  },
  {
    question: "What is the 'Circuit Breaker' pattern in distributed microservices?",
    shortAnswer: "A stability pattern that wraps remote service calls; if downstream failures exceed a threshold, the circuit 'trips open' immediately failing subsequent requests without calling the dead dependency, preventing cascading cascading failures and allowing the downstream service to recover.",
    explanation: "Cascading failure prevention via Circuit Breaker.",
    hint: "Trips open when downstream service fails, returning fallback errors and preventing cascading crashes.",
    level: "moderate",
    codeExample: "# Closed (Normal) -> Open (Fast Fail) -> Half-Open (Testing Recovery)"
  },
  {
    question: "What is 'Idempotency' in REST APIs and why is it critical for payment and admission endpoints?",
    shortAnswer: "An operation is idempotent if performing it multiple times produces the exact same system state as performing it once; using unique 'Idempotency-Key' headers ensures that accidental duplicate form submissions or network retries do not charge a student's card twice.",
    explanation: "Idempotent API design for reliable transactions.",
    hint: "Guarantees that repeated requests (e.g. retried payments) produce the exact same outcome.",
    level: "moderate",
    codeExample: "# Header: Idempotency-Key: req_bp_2026_042 (Replay returns cached receipt)"
  },
  {
    question: "What is 'Content Delivery Network' (CDN) caching?",
    shortAnswer: "A geographically distributed network of proxy edge servers that caches static assets (images, CSS, JS, video) close to end users, reducing latency and offloading up to 90% of traffic from backend origin servers.",
    explanation: "Edge caching and latency reduction via CDNs.",
    hint: "Caches static assets at edge locations close to users, reducing origin server load.",
    level: "basic",
    codeExample: "# Cloudflare / CloudFront caching static images and JS bundles"
  },
  {
    question: "What is the difference between Load Balancing algorithms: Round Robin vs Least Connections?",
    shortAnswer: "Round Robin distributes requests sequentially across servers in order (best when requests have uniform processing time); Least Connections routes requests to the server currently handling the fewest active connections (best for long-lived WebSocket or variable compute requests).",
    explanation: "Load balancing scheduling algorithms.",
    hint: "Round Robin rotates sequentially; Least Connections picks the least busy server.",
    level: "basic",
    codeExample: "# Round Robin: Server 1 -> 2 -> 3 -> 1 | Least Connections: server with min active load"
  },
  {
    question: "How do you handle Distributed Transactions across independent microservices?",
    shortAnswer: "Using the Saga Pattern (orchestrated or choreographed series of local transactions with compensating rollback actions) or Eventual Consistency via message brokers, avoiding heavyweight 2-Phase Commit (2PC) bottlenecks.",
    explanation: "Distributed transaction patterns (Sagas & compensating actions).",
    hint: "Use Saga Pattern with compensating rollback transactions instead of 2-Phase Commit.",
    level: "complex",
    codeExample: "# Saga: EnrollStudent -> DeductBalance (Fail) -> Compensate: UnenrollStudent"
  },
  {
    question: "What is 'Database Indexing' and what are the trade-offs of adding too many indexes?",
    shortAnswer: "Indexes (B-Trees / Hash) dramatically accelerate SELECT query filtering and joins from O(n) table scans to O(log n); however, every index slows down INSERT, UPDATE, and DELETE operations because all index trees must be synchronously updated on every mutation.",
    explanation: "B-Tree indexing speedups vs write amplification trade-off.",
    hint: "Accelerates SELECT queries to O(log n), but adds write overhead to INSERTs/UPDATEs.",
    level: "basic",
    codeExample: "CREATE INDEX idx_student_campus ON students(campus);"
  },
  {
    question: "What is the ultimate golden rule of backend system design in Python?",
    shortAnswer: "Keep application servers stateless behind load balancers, cache aggressively with Cache-Aside + TTLs, offload slow I/O to background task queues (Celery/Redis), rate-limit incoming endpoints, and use connection pooling for persistent databases.",
    explanation: "The complete enterprise Python backend system design standard.",
    hint: "Stateless app tier + Redis caching + Celery task queues + DB connection pooling + Rate limiting.",
    level: "basic",
    codeExample: "# Enterprise Python Backend System Design Standard"
  }
];

export default questions;
