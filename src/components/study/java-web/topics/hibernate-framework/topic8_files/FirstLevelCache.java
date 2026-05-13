// FirstLevelCache.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class FirstLevelCache {
    public static void main(String[] args) {
        SessionFactory factory = SessionFactoryProvider.getFactory();
        Session session = factory.openSession();
        
        // First get() executes SQL
        Student s1 = session.get(Student.class, 1L);
        
        // Second get() within same session – no SQL, cached
        Student s2 = session.get(Student.class, 1L);
        
        System.out.println(s1 == s2); // true (same object identity)
        
        // Clear the cache
        session.clear(); // or session.evict(s1)
        Student s3 = session.get(Student.class, 1L); // SQL again
        
        session.close();
    }
}