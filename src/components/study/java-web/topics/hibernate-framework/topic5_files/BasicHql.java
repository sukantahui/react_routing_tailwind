// BasicHql.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import java.util.List;

public class BasicHql {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        // 1. Simple FROM (returns all students)
        List<Student> students = session.createQuery("FROM Student", Student.class).list();
        
        // 2. With alias
        List<Student> students2 = session.createQuery("FROM Student s", Student.class).list();
        
        // 3. SELECT specific fields (projection) – returns Object[]
        List<Object[]> namesAndCities = session.createQuery(
            "SELECT s.name, s.city FROM Student s", Object[].class).list();
        
        // 4. ORDER BY
        List<Student> sorted = session.createQuery(
            "FROM Student s ORDER BY s.name DESC", Student.class).list();
        
        // 5. DISTINCT
        List<String> distinctCities = session.createQuery(
            "SELECT DISTINCT s.city FROM Student s", String.class).list();
        
        session.close();
        factory.close();
    }
}