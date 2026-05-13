// JpaCriteriaBuilder – Group by, having, order by
package com.school.criteria;

import jakarta.persistence.*;

public class JpaCriteriaBuilder {
    public static void groupByHaving() {
        EntityManager em = HibernateUtil.getEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);
        Root<Student> student = cq.from(Student.class);
        
        cq.multiselect(student.get("city"), cb.count(student), cb.avg(student.get("age")))
          .groupBy(student.get("city"))
          .having(cb.gt(cb.count(student), 2))
          .orderBy(cb.desc(cb.avg(student.get("age"))));
        
        List<Object[]> results = em.createQuery(cq).getResultList();
        em.close();
    }
}