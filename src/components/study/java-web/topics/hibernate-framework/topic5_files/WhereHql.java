// WhereHql.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import java.util.List;

public class WhereHql {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        // Simple condition
        List<Student> fromBarrackpore = session.createQuery(
            "FROM Student s WHERE s.city = 'Barrackpore'", Student.class).list();
        
        // Multiple conditions (AND, OR)
        List<Student> fromIchapur = session.createQuery(
            "FROM Student s WHERE s.city = 'Ichapur' AND s.age > 18", Student.class).list();
        
        // LIKE operator
        List<Student> nameStartingS = session.createQuery(
            "FROM Student s WHERE s.name LIKE 'S%'", Student.class).list();
        
        // BETWEEN
        List<Student> ageRange = session.createQuery(
            "FROM Student s WHERE s.age BETWEEN 10 AND 15", Student.class).list();
        
        // IN clause
        List<Student> inCities = session.createQuery(
            "FROM Student s WHERE s.city IN ('Barrackpore', 'Shyamnagar', 'Naihati')", Student.class).list();
        
        // IS NULL
        List<Student> missingCity = session.createQuery(
            "FROM Student s WHERE s.city IS NULL", Student.class).list();
        
        session.close();
        factory.close();
    }
}