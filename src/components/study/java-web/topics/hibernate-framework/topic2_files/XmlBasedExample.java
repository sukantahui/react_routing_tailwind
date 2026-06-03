// XmlBasedExample.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class XmlBasedExample {
    public static void main(String[] args) {
        // Load configuration from hibernate.cfg.xml
        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");  // looks in classpath root
        
        // Build SessionFactory (XML mappings are automatically read via <mapping resource> entries)
        SessionFactory factory = cfg.buildSessionFactory();
        
        Session session = factory.openSession();
        session.beginTransaction();
        
        // Use the entity mapped via XML (Student.hbm.xml)
        Student student = new Student("Tuhina Das", "Ichapur");
        session.save(student);   // INSERT using XML mapping
        
        session.getTransaction().commit();
        session.close();
        factory.close();
    }
}