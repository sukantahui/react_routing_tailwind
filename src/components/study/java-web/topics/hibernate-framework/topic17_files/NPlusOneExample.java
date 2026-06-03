// NPlusOneExample.java - Demonstrates the N+1 query problem
package com.school.perf;

import org.hibernate.Session;
import com.school.entity.Student; // assumed has @OneToMany List<Course> courses

public class NPlusOneExample {
    public static void badNPlusOne() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // 1 query to load all students
            List<Student> students = session.createQuery("FROM Student", Student.class).list();
            
            // N queries to load courses for each student
            for (Student student : students) {
                // This triggers a new SQL query for each student (if courses are lazy)
                System.out.println(student.getName() + " has " + student.getCourses().size() + " courses");
            }
        }
    }
}