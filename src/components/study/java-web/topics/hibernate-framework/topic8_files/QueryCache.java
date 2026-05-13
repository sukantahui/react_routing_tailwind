// QueryCache.java
import org.hibernate.Session;
import org.hibernate.query.Query;
import java.util.List;

public class QueryCacheDemo {
    public void demo(Session session) {
        // Enable query cache (requires second-level cache enabled)
        Query<Student> query = session.createQuery("FROM Student s WHERE s.city = :city", Student.class);
        query.setParameter("city", "Barrackpore");
        query.setCacheable(true);  // cache this query
        query.setCacheRegion("student.byCity"); // optional named region
        List<Student> result = query.list();
        
        // Second execution with same parameters
        Query<Student> query2 = session.createQuery("FROM Student s WHERE s.city = :city", Student.class);
        query2.setParameter("city", "Barrackpore");
        query2.setCacheable(true);
        List<Student> result2 = query2.list(); // From query cache (IDs), then entities from 2LC
    }
}