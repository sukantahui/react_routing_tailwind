// CriteriaDynamicFilters.java – Conditional WHERE clauses
package com.school.criteria;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class CriteriaDynamicFilters {
    
    public static List<Student> searchStudents(String name, String city, Integer minAge) {
        EntityManager em = HibernateUtil.getEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Student> cq = cb.createQuery(Student.class);
        Root<Student> student = cq.from(Student.class);
        
        List<Predicate> predicates = new ArrayList<>();
        if (name != null && !name.isEmpty()) {
            predicates.add(cb.like(student.get("name"), "%" + name + "%"));
        }
        if (city != null && !city.isEmpty()) {
            predicates.add(cb.equal(student.get("city"), city));
        }
        if (minAge != null) {
            predicates.add(cb.ge(student.get("age"), minAge));
        }
        
        cq.select(student).where(predicates.toArray(new Predicate[0]));
        
        List<Student> results = em.createQuery(cq).getResultList();
        em.close();
        return results;
    }
}