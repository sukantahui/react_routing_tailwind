// MainApp.java - demonstrates CRUD using SessionFactory from properties
package com.school.hibernate;

import org.hibernate.Session;
import org.hibernate.Transaction;

// Assume an entity class Student exists with id, name, city
// import com.school.entity.Student;

public class MainApp {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            // Create a new Student instance
            // Student student = new Student("Debangshu", "Barrackpore");
            // session.persist(student);

            // Retrieve and print
            // Student found = session.get(Student.class, 1L);
            // System.out.println(found);

            tx.commit();
            System.out.println("Operation successful using properties config!");
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
            HibernateUtil.shutdown();
        }
    }
}