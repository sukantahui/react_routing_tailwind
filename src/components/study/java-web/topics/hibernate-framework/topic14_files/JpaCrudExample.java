// JpaCrudExample.java - Using JPA's EntityManager for CRUD operations
package com.school.jpa;

import jakarta.persistence.*;
import com.school.entity.Student;

public class JpaCrudExample {
    public static void main(String[] args) {
        // Obtain EntityManagerFactory from persistence unit
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("schoolPU");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();

        try {
            tx.begin();

            // CREATE
            Student student = new Student("Tuhina", "tuhina@school.edu", "Shyamnagar");
            em.persist(student);
            System.out.println("Student persisted with ID: " + student.getId());

            // READ
            Student found = em.find(Student.class, student.getId());
            System.out.println("Found: " + found.getName());

            // UPDATE
            found.setCity("Ichapur");
            em.merge(found);

            // DELETE
            em.remove(found);

            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            e.printStackTrace();
        } finally {
            em.close();
            emf.close();
        }
    }
}