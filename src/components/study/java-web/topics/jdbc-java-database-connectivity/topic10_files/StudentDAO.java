import java.util.List;

// DAO interface – defines all database operations for Student
public interface StudentDAO {
    void save(Student student);
    void update(Student student);
    void delete(int id);
    Student getById(int id);
    List<Student> getAll();
}