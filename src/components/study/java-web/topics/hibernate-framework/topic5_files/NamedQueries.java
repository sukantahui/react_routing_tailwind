// NamedQueries.java
import javax.persistence.*;

// Define named queries on entity class
@NamedQueries({
    @NamedQuery(name = "Student.findByCity", query = "FROM Student s WHERE s.city = :city"),
    @NamedQuery(name = "Student.countByCity", query = "SELECT COUNT(s) FROM Student s WHERE s.city = :city")
})
@Entity
public class Student {
    // fields...
}

// Usage in DAO
public class StudentDAO {
    public List<Student> getStudentsByCity(String city) {
        Session session = sessionFactory.getCurrentSession();
        Query<Student> query = session.createNamedQuery("Student.findByCity", Student.class);
        query.setParameter("city", city);
        return query.list();
    }
}

// Also possible in XML (META-INF/orm.xml)
// <named-query name="Student.findByCity">
//   <query>FROM Student s WHERE s.city = :city</query>
// </named-query>