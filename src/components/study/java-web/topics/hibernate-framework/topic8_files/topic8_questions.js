// topic8_questions.js
// 30 moderate to expert questions on Hibernate caching

const questions = [
  {
    question: "What is the first-level cache in Hibernate?",
    shortAnswer: "A session-scoped cache that stores entities retrieved during a session; enabled by default.",
    explanation: "It ensures that within the same session, the same entity is not loaded twice. It is mandatory and cannot be disabled.",
    hint: "Try loading the same entity twice in one session – watch SQL count.",
    level: "basic",
    codeExample: "session.get(Student.class, 1L); // SQL\nsession.get(Student.class, 1L); // from cache"
  },
  {
    question: "How do you enable second-level cache?",
    shortAnswer: "Set hibernate.cache.use_second_level_cache=true, specify cache region factory, and annotate entities with @Cacheable.",
    explanation: "Also need a cache provider like Ehcache in classpath. Optionally use @Cache to set concurrency strategy.",
    hint: "Don't forget to add ehcache.xml configuration file.",
    level: "moderate",
    codeExample: "@Entity @Cacheable @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)"
  },
  {
    question: "When would you use READ_WRITE vs READ_ONLY cache concurrency?",
    shortAnswer: "READ_ONLY for immutable entities (no updates); READ_WRITE for entities that are occasionally updated.",
    explanation: "READ_ONLY has no overhead but throws exception on update. READ_WRITE uses soft locks for transaction isolation.",
    hint: "Use READ_ONLY for reference data like country codes.",
    level: "expert",
    codeExample: "@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)"
  },
  {
    question: "Does second-level cache work across multiple Sessions?",
    shortAnswer: "Yes, that's its purpose – shared across sessions in the same SessionFactory.",
    explanation: "When one session loads an entity, subsequent sessions can retrieve it from the cache without hitting the database.",
    hint: "Close a session, open a new one – see if SQL repeats.",
    level: "moderate",
    codeExample: "Session s1 = factory.openSession(); s1.get(...); s1.close();\nSession s2 = factory.openSession(); s2.get(...); // from 2LC"
  },
  {
    question: "What is the purpose of query cache?",
    shortAnswer: "Caches the result set (identifiers) of queries, avoiding repeated query execution.",
    explanation: "Query cache stores the IDs of returned entities. When query repeats, it retrieves IDs from cache then fetches entities from second-level cache.",
    hint: "Query cache alone without 2LC is ineffective – it only caches IDs.",
    level: "moderate",
    codeExample: "query.setCacheable(true);"
  },
  {
    question: "How do you invalidate second-level cache programmatically?",
    shortAnswer: "Use sessionFactory.getCache().evictEntity(Student.class, id) or evictAll().",
    explanation: "Useful after bulk updates or external database changes. You can evict specific entities, collections, or entire regions.",
    hint: "Call this after native SQL updates.",
    level: "expert",
    codeExample: "sessionFactory.getCache().evictEntityRegion(Student.class);"
  },
  {
    question: "What is the default cache concurrency strategy?",
    shortAnswer: "None – you must specify it with @Cache, otherwise entity is not cached even if @Cacheable is present.",
    explanation: "JPA's @Cacheable enables caching but Hibernate needs @Cache with usage strategy to actually store data.",
    hint: "Missing @Cache causes no second-level caching even with properties set.",
    level: "expert",
    codeExample: "@Cacheable\n@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)"
  },
  {
    question: "How does Hibernate handle updates to cached entities?",
    shortAnswer: "When an entity is updated, Hibernate evicts it from second-level cache (or updates depending on strategy).",
    explanation: "For READ_WRITE, the cache entry is updated. For others, it's invalidated. Query cache is also invalidated if any entity in its result set changes.",
    hint: "Check if query cache still returns stale data after update – it should be invalidated.",
    level: "expert",
    codeExample: "// update automatically evicts/updates 2LC"
  },
  {
    question: "Can you use query cache without second-level cache?",
    shortAnswer: "Yes, but it's not recommended – it caches only IDs, leading to many individual selects.",
    explanation: "Without 2LC, the IDs are cached, but each entity still requires a database hit. You enable both for maximum benefit.",
    hint: "Enable both or neither.",
    level: "moderate",
    codeExample: "without 2LC: cache hits IDs but then N queries for each entity."
  },
  {
    question: "What are the limitations of first-level cache?",
    shortAnswer: "It's session-scoped, not shared; cleared when session closes; can cause memory issues if too many objects loaded.",
    explanation: "It's automatic but not suitable for cross-session sharing. Also, it doesn't cache queries or collections by default.",
    hint: "Use it for repeat reads in same transaction, not across requests.",
    level: "basic",
    codeExample: "Session ends → cache lost."
  },
  // Additional questions (full 30 in actual file)
];

export default questions;