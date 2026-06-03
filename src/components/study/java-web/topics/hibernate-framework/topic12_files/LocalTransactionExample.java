// LocalTransactionExample.java
// Demonstrates typical local transaction management using Hibernate Session
package com.school.hibernate;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class LocalTransactionExample {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();

            // Perform multiple operations
            Student student = new Student("Tuhina", "Shyamnagar");
            session.persist(student);

            // Another operation
            student.setCity("Ichapur");
            session.update(student);

            // If all successful, commit
            tx.commit();
            System.out.println("Transaction committed successfully.");
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
                System.out.println("Transaction rolled back due to exception: " + e.getMessage());
            }
        } finally {
            session.close();
        }
    }
}