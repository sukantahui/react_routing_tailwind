// ReadExample.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class ReadExample {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        // Method 1: get() - immediate SQL, returns null if not found
        Student student = session.get(Student.class, 1L);
        if (student != null) {
            System.out.println("Found: " + student.getName());
        }
        
        // Method 2: load() - returns proxy, lazy loading
        Student proxy = session.load(Student.class, 1L);
        System.out.println("Proxy ID: " + proxy.getId()); // no SELECT
        System.out.println("Proxy name: " + proxy.getName()); // SELECT now
        
        // Method 3: HQL query
        List<Student> students = session.createQuery("from Student", Student.class).list();
        
        session.close();
        factory.close();
    }
}