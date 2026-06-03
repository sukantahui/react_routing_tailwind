// LazyLoadingDemo.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class LazyLoadingDemo {
    public static void main(String[] args) {
        SessionFactory factory = SessionFactoryProvider.getFactory();
        Session session = factory.openSession();
        
        Student student = session.get(Student.class, 1L);
        // At this point, courses are NOT loaded (proxy)
        
        System.out.println(student.getName());  // already loaded, no SQL for courses
        
        // Accessing lazy collection triggers SQL
        List<Course> courses = student.getCourses();  // SELECT courses...
        System.out.println(courses.size());
        
        session.close();
    }
}