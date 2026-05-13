// HqlAggregation.java – GROUP BY, COUNT, AVG
package com.school.hql;

import jakarta.persistence.*;

public class HqlAggregation {
    public static void countStudentsByCity() {
        EntityManager em = HibernateUtil.getEntityManager();
        String hql = "SELECT s.city, COUNT(s), AVG(s.age) FROM Student s GROUP BY s.city";
        TypedQuery<Object[]> query = em.createQuery(hql, Object[].class);
        List<Object[]> results = query.getResultList();
        for (Object[] row : results) {
            String city = (String) row[0];
            Long count = (Long) row[1];
            Double avgAge = (Double) row[2];
            System.out.printf("City: %s, students: %d, average age: %.1f%n", city, count, avgAge);
        }
        em.close();
    }
}