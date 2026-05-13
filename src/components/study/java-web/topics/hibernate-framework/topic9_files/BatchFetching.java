// BatchFetching.java
import org.hibernate.annotations.BatchSize;
import javax.persistence.*;
import java.util.List;

@Entity
public class Student {
    @Id @GeneratedValue
    private Long id;
    
    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    @BatchSize(size = 10)  // Load up to 10 collections in one query
    private List<Course> courses;
}

// With @BatchSize, loading 20 students' courses may execute only 2 queries instead of 20.