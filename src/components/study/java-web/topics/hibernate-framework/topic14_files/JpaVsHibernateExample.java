// JpaVsHibernateExample.java - Shows code using JPA vs Hibernate API side by side
package com.school.comparison;

// JPA way (portable)
import jakarta.persistence.*;

// Hibernate way (vendor-specific)
// import org.hibernate.Session;
// import org.hibernate.SessionFactory;

public class JpaVsHibernateExample {

    // Using JPA EntityManager
    public void jpaUpdate(EntityManager em, Long id, String newName) {
        Student student = em.find(Student.class, id);
        if (student != null) {
            student.setName(newName);
            // no explicit update needed – automatic dirty checking
        }
    }

    // Using Hibernate Session (native)
    /*
    public void hibernateUpdate(Session session, Long id, String newName) {
        Student student = session.get(Student.class, id);
        if (student != null) {
            student.setName(newName);
            session.update(student); // optional, but often explicit
        }
    }
    */

    // Note: Hibernate's Session interface extends JPA's EntityManager,
    // so you can cast when you need Hibernate-specific methods.
}