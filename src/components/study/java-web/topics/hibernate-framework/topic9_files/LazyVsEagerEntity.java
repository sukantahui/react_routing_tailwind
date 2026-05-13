// LazyVsEagerEntity.java
import javax.persistence.*;
import java.util.List;

@Entity
public class Student {
    @Id @GeneratedValue
    private Long id;
    private String name;
    
    // LAZY is default for @OneToMany
    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private List<Course> courses;  // Default LAZY
    
    // EAGER override – use with caution
    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    private List<Address> addresses;  // Always loads with student
}

@Entity
public class Course {
    @Id @GeneratedValue
    private Long id;
    
    // @ManyToOne defaults to EAGER
    @ManyToOne(fetch = FetchType.LAZY)  // Override to LAZY
    private Student student;
}