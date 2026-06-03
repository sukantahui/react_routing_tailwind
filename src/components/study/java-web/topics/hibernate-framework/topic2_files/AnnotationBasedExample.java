// AnnotationBasedExample.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import com.school.model.Student;  // annotated class

public class AnnotationBasedExample {
    public static void main(String[] args) {
        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");
        // Add annotated class (or via <mapping class="..."/> in cfg.xml)
        cfg.addAnnotatedClass(Student.class);
        
        SessionFactory factory = cfg.buildSessionFactory();
        Session session = factory.openSession();
        session.beginTransaction();
        
        Student student = new Student("Abhronila Sen", "Naihati");
        session.save(student);   // INSERT using annotation metadata
        
        session.getTransaction().commit();
        session.close();
        factory.close();
    }
}