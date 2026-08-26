/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 7: Decoupling Business Logic - Service vs DAO Separation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.util.List;
import java.util.Optional;

public class DecouplingBusinessLogicDemo {

    public record Student(int id, String name, double score, String center) {}

    // 1. Clean DAO Contract (Zero java.sql imports!):
    public interface StudentDao {
        Optional<Student> findById(int id);
        List<Student> findByCenter(String center);
        void save(Student student);
    }

    // 2. Pure Business Service Layer:
    public static class StudentScholarshipService {
        private final StudentDao studentDao;

        public StudentScholarshipService(StudentDao studentDao) {
            this.studentDao = studentDao; // Dependency Injection!
        }

        public double calculateScholarshipBonus(int studentId) {
            // Pure domain business logic:
            return studentDao.findById(studentId)
                .map(s -> s.score() >= 90.0 ? 5000.0 : 1000.0)
                .orElse(0.0);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: DECOUPLING BUSINESS LOGIC & DAO SEPARATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CLEAN SEPARATION RULE:");
        System.out.println("  - Service Layer : Contains business rules, validations, calculations, and transaction orchestration.");
        System.out.println("  - DAO Layer     : Contains SQL strings, PreparedStatement binding, and ResultSet mapping.");
        System.out.println("  - Result        : Business logic contains 0 lines of SQL and 0 java.sql imports!");

        System.out.println("\n==========================================================================");
    }
}
