/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 5: Mocking Dependencies with Mockito - Pure Unit Isolation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class MockingDependenciesMockitoDemo {

    public interface StudentRepository {
        String findStudentEmail(int studentId);
    }

    public interface NotificationService {
        void sendEmail(String email, String message);
    }

    public static class EnrollmentService {
        private final StudentRepository repo;
        private final NotificationService notifier;

        public EnrollmentService(StudentRepository repo, NotificationService notifier) {
            this.repo = repo;
            this.notifier = notifier;
        }

        public boolean enrollStudent(int studentId, String courseName) {
            String email = repo.findStudentEmail(studentId);
            if (email == null) return false;
            notifier.sendEmail(email, "Enrolled in " + courseName);
            return true;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: MOCKING DEPENDENCIES WITH MOCKITO - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY MOCKING IS MANDATORY IN UNIT TESTING:");
        System.out.println("  1. Determinism   : Tests never fail due to network, DB downtime, or flaky API.");
        System.out.println("  2. Speed         : Runs in RAM in sub-milliseconds without disk/network I/O.");
        System.out.println("  3. Isolation     : Tests ONLY the EnrollmentService business logic.");
        System.out.println("  4. Edge Triggers : Easily simulate rare DB timeouts, 500 errors, or null responses.");

        System.out.println("\n==========================================================================");
    }
}
