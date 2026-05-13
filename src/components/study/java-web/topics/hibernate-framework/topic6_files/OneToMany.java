// OneToMany.java - One side (Classroom)
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Classroom {
    @Id @GeneratedValue
    private Long id;
    private String name;
    
    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Student> students = new ArrayList<>();
    
    // helper method to maintain both sides
    public void addStudent(Student student) {
        students.add(student);
        student.setClassroom(this);
    }
}