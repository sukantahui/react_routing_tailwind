// ManyToOne.java - Many side (Student)
import javax.persistence.*;

@Entity
public class Student {
    @Id @GeneratedValue
    private Long id;
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;
    
    // getters/setters
}