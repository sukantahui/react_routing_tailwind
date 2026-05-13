// HibernateOrmExample.java
// Using Hibernate (ORM) to achieve the same result with minimal code.
// Entity class Student is mapped to the database table.

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import java.util.List;

public class HibernateOrmExample {
    public static void main(String[] args) {
        // 1. Build SessionFactory (once per application)
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Student.class)
                .buildSessionFactory();

        // 2. Open session
        Session session = factory.getCurrentSession();

        try {
            // 3. Start transaction
            session.beginTransaction();

            // 4. Execute HQL query – no SQL strings!
            List<Student> students = session.createQuery("from Student", Student.class).getResultList();

            // 5. Process results – already mapped to Java objects
            for (Student s : students) {
                System.out.println("Student: " + s.getId() + ", " + s.getName() + ", " + s.getAge());
            }

            // 6. Commit transaction
            session.getTransaction().commit();
        } finally {
            factory.close();
        }
    }
}

// Entity class (simplified)
// @Entity
// @Table(name = "student")
// class Student {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "id")
//     private int id;
//     
//     @Column(name = "name")
//     private String name;
//     
//     @Column(name = "age")
//     private int age;
//     
//     // getters & setters ...
// }