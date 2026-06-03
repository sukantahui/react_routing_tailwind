// HqlSubquery.java – Subqueries in WHERE / SELECT
package com.school.hql;

import jakarta.persistence.*;

public class HqlSubquery {
    public static void findStudentsAboveAverageAge() {
        EntityManager em = HibernateUtil.getEntityManager();
        // Subquery in WHERE
        String hql = "SELECT s FROM Student s WHERE s.age > (SELECT AVG(age) FROM Student)";
        List<Student> aboveAvg = em.createQuery(hql, Student.class).getResultList();
        
        // Subquery in SELECT (scalar)
        String hql2 = "SELECT s.name, (SELECT COUNT(c) FROM Course c WHERE c.studentId = s.id) FROM Student s";
        List<Object[]> result = em.createQuery(hql2, Object[].class).getResultList();
        em.close();
    }
}