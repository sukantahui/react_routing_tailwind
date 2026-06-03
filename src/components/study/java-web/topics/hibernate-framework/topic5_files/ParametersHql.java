// ParametersHql.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import java.util.List;

public class ParametersHql {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        // Named parameters (recommended)
        Query<Student> query1 = session.createQuery(
            "FROM Student s WHERE s.city = :city AND s.age > :minAge", Student.class);
        query1.setParameter("city", "Barrackpore");
        query1.setParameter("minAge", 18);
        List<Student> result1 = query1.list();
        
        // Positional parameters (legacy, order matters)
        Query<Student> query2 = session.createQuery(
            "FROM Student s WHERE s.city = ?1 AND s.age > ?2", Student.class);
        query2.setParameter(1, "Shyamnagar");
        query2.setParameter(2, 20);
        List<Student> result2 = query2.list();
        
        // Parameter list for IN clause
        Query<Student> query3 = session.createQuery(
            "FROM Student s WHERE s.city IN :cities", Student.class);
        query3.setParameterList("cities", List.of("Barrackpore", "Ichapur"));
        List<Student> result3 = query3.list();
        
        session.close();
        factory.close();
    }
}