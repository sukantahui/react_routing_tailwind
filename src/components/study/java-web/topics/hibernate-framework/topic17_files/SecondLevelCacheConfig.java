// SecondLevelCacheConfig.java - Example configuration snippet (not executable)
// In hibernate.properties:
// hibernate.cache.use_second_level_cache=true
// hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
// hibernate.cache.use_query_cache=true (only if needed)
// hibernate.cache.default_cache_concurrency_strategy=read-write

// In entity:
// import org.hibernate.annotations.Cache;
// import org.hibernate.annotations.CacheConcurrencyStrategy;
// 
// @Entity
// @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
// public class ReferenceData { ... }