// LazyInitializationException.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class LazyInitializationExceptionDemo {
    public static void main(String[] args) {
        SessionFactory factory = SessionFactoryProvider.getFactory();
        Student student;
        
        Session session = factory.openSession();
        student = session.get(Student.class, 1L);
        session.close();  // session closed
        
        // LazyInitializationException thrown here
        List<Course> courses = student.getCourses();  // 💥 Exception!
        // Cannot access lazy association outside session
    }
}