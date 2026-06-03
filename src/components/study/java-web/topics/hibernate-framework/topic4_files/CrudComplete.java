// CrudComplete.java
// Complete service class for Student entity
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import java.util.List;

public class StudentService {
    private SessionFactory factory;
    
    public StudentService(SessionFactory factory) {
        this.factory = factory;
    }
    
    // CREATE
    public Long saveStudent(Student student) {
        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();
        Long id = (Long) session.save(student);
        tx.commit();
        session.close();
        return id;
    }
    
    // READ by ID
    public Student getStudent(Long id) {
        Session session = factory.openSession();
        Student student = session.get(Student.class, id);
        session.close();
        return student;
    }
    
    // READ all
    public List<Student> getAllStudents() {
        Session session = factory.openSession();
        List<Student> list = session.createQuery("from Student", Student.class).list();
        session.close();
        return list;
    }
    
    // UPDATE - using merge for detached
    public void updateStudent(Student student) {
        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();
        session.merge(student);  // copies state to managed instance
        tx.commit();
        session.close();
    }
    
    // DELETE
    public void deleteStudent(Long id) {
        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();
        Student student = session.get(Student.class, id);
        if (student != null) {
            session.delete(student);
        }
        tx.commit();
        session.close();
    }
}