/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 8: Generic Base DAO Interface - GenericDao<T, ID>
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public class GenericBaseDaoInterfaceDemo {

    // 1. Standard Generic DAO Interface (Spring Data / Hibernate style):
    public interface GenericDao<T, ID extends Serializable> {
        Optional<T> findById(ID id);
        List<T> findAll();
        T save(T entity);
        void update(T entity);
        boolean deleteById(ID id);
        long count();
    }

    // 2. Specific Entity Domain Model:
    public record Student(Integer id, String name, String center) {}

    // 3. Entity-specific DAO Interface inheriting standard CRUD:
    public interface StudentDao extends GenericDao<Student, Integer> {
        // Additional domain-specific query methods:
        List<Student> findByCenter(String center);
        List<Student> findTopScorers(int limit);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: GENERIC BASE DAO INTERFACE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE POWER OF GENERICDAO<T, ID>:");
        System.out.println("  1. Standardizes CRUD contracts across all application entities (Student, Teacher, Course, Invoice).");
        System.out.println("  2. Type Safety : Generics guarantee strong compile-time types for IDs and Return values.");
        System.out.println("  3. Extensibility: Entity DAOs inherit 6 CRUD methods and only declare custom domain queries!");

        System.out.println("\n==========================================================================");
    }
}
