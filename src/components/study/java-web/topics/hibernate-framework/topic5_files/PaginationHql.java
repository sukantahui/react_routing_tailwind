// PaginationHql.java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import java.util.List;

public class PaginationHql {
    public static void main(String[] args) {
        SessionFactory factory = new Configuration().configure().buildSessionFactory();
        Session session = factory.openSession();
        
        int pageNumber = 2;     // 0-indexed (0 = first page)
        int pageSize = 10;
        
        Query<Student> query = session.createQuery("FROM Student s ORDER BY s.id", Student.class);
        query.setFirstResult(pageNumber * pageSize);  // offset
        query.setMaxResults(pageSize);               // limit
        
        List<Student> page = query.list();
        
        // Get total count for pagination UI
        Long totalCount = session.createQuery("SELECT COUNT(*) FROM Student", Long.class).uniqueResult();
        int totalPages = (int) Math.ceil((double) totalCount / pageSize);
        
        System.out.println("Page " + (pageNumber+1) + " of " + totalPages);
        
        session.close();
        factory.close();
    }
}