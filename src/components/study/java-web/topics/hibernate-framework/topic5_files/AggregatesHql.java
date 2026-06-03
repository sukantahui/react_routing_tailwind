// AggregatesHql.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class AggregatesHql {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        // COUNT
        Long studentCount = session.createQuery(
            "SELECT COUNT(s) FROM Student s", Long.class).uniqueResult();
        
        // SUM (assuming marks field exists)
        Double totalMarks = session.createQuery(
            "SELECT SUM(m.marks) FROM Student s JOIN s.marks m WHERE s.id = 1", Double.class).uniqueResult();
        
        // AVG
        Double avgAge = session.createQuery(
            "SELECT AVG(s.age) FROM Student s", Double.class).uniqueResult();
        
        // MIN / MAX
        Integer minAge = session.createQuery(
            "SELECT MIN(s.age) FROM Student s", Integer.class).uniqueResult();
        Integer maxAge = session.createQuery(
            "SELECT MAX(s.age) FROM Student s", Integer.class).uniqueResult();
        
        // GROUP BY and HAVING
        Object[] cityStats = (Object[]) session.createQuery(
            "SELECT s.city, COUNT(s) FROM Student s GROUP BY s.city HAVING COUNT(s) > 1", Object[].class).uniqueResult();
        
        session.close();
        factory.close();
    }
}