// JoinsHql.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import java.util.List;

public class JoinsHql {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        // INNER JOIN (students with their courses)
        List<Object[]> result = session.createQuery(
            "SELECT s.name, c.courseName FROM Student s JOIN s.courses c", Object[].class).list();
        
        // LEFT JOIN (include students with no courses)
        List<Student> studentsWithCourses = session.createQuery(
            "SELECT DISTINCT s FROM Student s LEFT JOIN s.courses c", Student.class).list();
        
        // JOIN FETCH – solves N+1 problem (loads courses immediately)
        List<Student> studentsWithCoursesFetched = session.createQuery(
            "FROM Student s JOIN FETCH s.courses c", Student.class).list();
        // Now courses are already loaded, no additional queries when accessed.
        
        // Fetch multiple associations? Use only one fetch join per query to avoid cartesian product.
        session.close();
        factory.close();
    }
}