// CreateExample.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class CreateExample {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        
        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();
        
        // Create new entity
        Student student = new Student("Swadeep Sarkar", "Barrackpore");
        
        // Save (INSERT)
        Long generatedId = (Long) session.save(student);  // returns generated ID
        // Or JPA style: session.persist(student); // returns void
        
        tx.commit();
        System.out.println("Student saved with ID: " + generatedId);
        
        session.close();
        factory.close();
    }
}