// MappedSuperclass.java
import javax.persistence.*;

@MappedSuperclass
public abstract class BaseEntity {
    @Id @GeneratedValue
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}

@Entity
public class Student extends BaseEntity {
    private String name;
    // inherits id, createdAt, updatedAt fields in student table
}