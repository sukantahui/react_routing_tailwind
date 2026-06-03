// CriteriaBasicExample.java – Simple Criteria query
package com.school.criteria;

import jakarta.persistence.*;
import com.school.entity.Student;

public class CriteriaBasicExample {
    public static void findStudentsOlderThan(int minAge) {
        EntityManager em = HibernateUtil.getEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Student> cq = cb.createQuery(Student.class);
        Root<Student> student = cq.from(Student.class);
        
        cq.select(student).where(cb.gt(student.get("age"), minAge));
        
        List<Student> results = em.createQuery(cq).getResultList();
        results.forEach(s -> System.out.println(s.getName()));
        em.close();
    }
}