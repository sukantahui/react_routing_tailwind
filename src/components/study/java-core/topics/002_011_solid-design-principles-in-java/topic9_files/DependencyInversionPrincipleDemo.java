/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 9: D - Dependency Inversion Principle (DIP): Inverting Architectural Dependencies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class DependencyInversionPrincipleDemo {

    // 1. ABSTRACTION (Both High-Level & Low-Level Modules Depend on this!):
    public interface DatabaseDriver {
        void executeQuery(String sql);
    }

    // 2. LOW-LEVEL MODULE (Implements Abstraction)
    public static class MySqlDatabaseDriver implements DatabaseDriver {
        public void executeQuery(String sql) {
            System.out.println("  [MYSQL DRIVER] Executing on Port 3306: " + sql);
        }
    }

    // 3. LOW-LEVEL MODULE (Alternative)
    public static class PostgresDatabaseDriver implements DatabaseDriver {
        public void executeQuery(String sql) {
            System.out.println("  [POSTGRES DRIVER] Executing on Port 5432: " + sql);
        }
    }

    // 4. HIGH-LEVEL MODULE (Depends ONLY on DatabaseDriver abstraction via Constructor Injection!):
    public static class TraineeRecordService {
        private final DatabaseDriver db; // Abstraction, not concrete MySqlDatabaseDriver!

        public TraineeRecordService(DatabaseDriver driver) {
            this.db = driver;
        }

        public void enrollTrainee(String name) {
            System.out.println(">>> Enrolling Trainee: " + name);
            db.executeQuery("INSERT INTO trainees(name, hub) VALUES('" + name + "', 'Barrackpore');");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: DEPENDENCY INVERSION PRINCIPLE (DIP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Injected MySQL Provider into High-Level Service:");
        TraineeRecordService svc1 = new TraineeRecordService(new MySqlDatabaseDriver());
        svc1.enrollTrainee("Swadeep Paul");

        System.out.println("\n>>> 2. Swapped to Postgres Provider without modifying Service code:");
        TraineeRecordService svc2 = new TraineeRecordService(new PostgresDatabaseDriver());
        svc2.enrollTrainee("Tuhina Das");

        System.out.println("\n>>> DIP Rule: High-level business logic must not depend on low-level database details.");

        System.out.println("\n==========================================================================");
    }
}