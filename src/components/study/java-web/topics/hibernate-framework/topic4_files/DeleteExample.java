// DeleteExample.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class DeleteExample {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();
        
        // Method 1: Delete managed entity
        Student student = session.get(Student.class, 3L);
        session.delete(student);  // schedules DELETE
        
        // Method 2: Delete with HQL (bulk)
        int deletedCount = session.createQuery("delete from Student where city = 'Ichapur'")
                                  .executeUpdate();
        
        // Method 3: Delete detached entity (must have @Version or same ID)
        Student detached = new Student();
        detached.setId(5L);
        session.delete(detached);
        
        tx.commit();
        session.close();
        factory.close();
    }
}