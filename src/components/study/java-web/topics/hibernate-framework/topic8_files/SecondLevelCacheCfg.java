// SecondLevelCacheCfg.java
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.*;

@Entity
@Cacheable  // JPA annotation to indicate entity is cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE) // Hibernate specific
public class Student {
    @Id @GeneratedValue
    private Long id;
    private String name;
    // ...
}

// Usage in code: second-level caches across sessions
Session session1 = factory.openSession();
Student s1 = session1.get(Student.class, 1L); // SQL
session1.close();

Session session2 = factory.openSession();
Student s2 = session2.get(Student.class, 1L); // From cache, no SQL
session2.close();