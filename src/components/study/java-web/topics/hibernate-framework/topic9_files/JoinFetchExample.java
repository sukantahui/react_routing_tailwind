// JoinFetchExample.java
import org.hibernate.Session;
import org.hibernate.query.Query;
import java.util.List;

public class JoinFetchExample {
    public List<Student> getStudentsWithCourses() {
        Session session = factory.openSession();
        try {
            Query<Student> query = session.createQuery(
                "SELECT DISTINCT s FROM Student s JOIN FETCH s.courses", Student.class);
            return query.list();  // courses loaded in same query
        } finally {
            session.close();
        }
        // No LazyInitializationException when accessing courses outside session
    }
}