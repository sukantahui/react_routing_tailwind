// UpdateExample.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class UpdateExample {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();
        
        // Method 1: Dirty checking (for managed entity)
        Student student = session.get(Student.class, 1L);
        student.setCity("Shyamnagar");  // Auto UPDATE on flush/commit
        // No need to call session.update()
        
        // Method 2: update() for detached entity
        Student detachedStudent = new Student("Tuhina Das", "Ichapur");
        detachedStudent.setId(2L);  // assume exists
        session.update(detachedStudent);
        
        // Method 3: merge() for merging detached state
        Student merged = (Student) session.merge(detachedStudent);
        
        tx.commit();
        session.close();
        factory.close();
    }
}