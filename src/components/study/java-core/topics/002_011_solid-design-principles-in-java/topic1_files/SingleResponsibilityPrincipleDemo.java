/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 1: S - Single Responsibility Principle (SRP): 'One Reason to Change'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class SingleResponsibilityPrincipleDemo {

    // ANTI-PATTERN: 'God Class' violating SRP (Mixes Model + DB persistence + Email notifications + PDF export!)
    public static class MonolithicStudentManager {
        public void calculateGpa() { /* Reason 1: Academic Grading change */ }
        public void saveToDatabase() { /* Reason 2: Database schema change */ }
        public void sendWelcomeEmail() { /* Reason 3: SMTP provider change */ }
    }

    // SRP COMPLIANT: Each class has EXACTLY ONE reason to change!
    // 1. Domain Model: State only
    public static class Trainee {
        private String name;
        private double score;
        public Trainee(String name, double score) { this.name = name; this.score = score; }
        public String getName() { return name; }
        public double getScore() { return score; }
    }

    // 2. Persistence Layer: Database operations only
    public static class TraineeRepository {
        public void save(Trainee t) {
            System.out.printf("  [DATABASE] Saved trainee '%s' to MySQL (Barrackpore DB).\n", t.getName());
        }
    }

    // 3. Notification Layer: Communication only
    public static class TraineeEmailService {
        public void sendWelcomeMail(Trainee t) {
            System.out.printf("  [EMAIL] Dispatched welcome email to: %s\n", t.getName());
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: SINGLE RESPONSIBILITY PRINCIPLE (SRP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Trainee swadeep = new Trainee("Swadeep Paul", 95.5);
        TraineeRepository repo = new TraineeRepository();
        TraineeEmailService emailService = new TraineeEmailService();

        repo.save(swadeep);
        emailService.sendWelcomeMail(swadeep);

        System.out.println("\n>>> SRP Rule: A class should have one, and only one, reason to change.");

        System.out.println("\n==========================================================================");
    }
}