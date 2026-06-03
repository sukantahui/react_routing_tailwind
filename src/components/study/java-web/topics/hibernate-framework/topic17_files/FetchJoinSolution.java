// FetchJoinSolution.java - Prevents N+1 with JOIN FETCH
package com.school.perf;

import org.hibernate.Session;

public class FetchJoinSolution {
    public static void goodWithJoinFetch() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // Single query with JOIN FETCH loads students and their courses together
            List<Student> students = session.createQuery(
                "SELECT DISTINCT s FROM Student s LEFT JOIN FETCH s.courses", Student.class
            ).list();
            
            for (Student student : students) {
                // courses already loaded, no extra queries
                System.out.println(student.getName() + " courses: " + student.getCourses().size());
            }
        }
    }
}