/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 6: Constructor Overloading: Multiple Constructors with Distinct Parameter Lists
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class ConstructorOverloadingPolymorphismDemo {

    public static class CourseBatch {
        private final String batchCode;
        private final String subjectName;
        private final String instructor;
        private final int maxCapacity;
        private final String locationHub;

        // Overloaded Constructor 1: Bare Minimum (Fast Track)
        public CourseBatch(String batchCode, String subjectName) {
            this.batchCode = batchCode;
            this.subjectName = subjectName;
            this.instructor = "Sukanta Hui";
            this.maxCapacity = 30;
            this.locationHub = "Barrackpore Central";
            System.out.println("  [CONSTRUCTOR 1 - Fast Track] Initialized: " + batchCode);
        }

        // Overloaded Constructor 2: Standard Custom Hub
        public CourseBatch(String batchCode, String subjectName, String locationHub) {
            this.batchCode = batchCode;
            this.subjectName = subjectName;
            this.instructor = "Sukanta Hui";
            this.maxCapacity = 25;
            this.locationHub = locationHub;
            System.out.println("  [CONSTRUCTOR 2 - Regional Hub] Initialized: " + batchCode + " at " + locationHub);
        }

        // Overloaded Constructor 3: Complete Custom Configuration
        public CourseBatch(String batchCode, String subjectName, String instructor, int maxCapacity, String locationHub) {
            this.batchCode = batchCode;
            this.subjectName = subjectName;
            this.instructor = instructor;
            this.maxCapacity = maxCapacity;
            this.locationHub = locationHub;
            System.out.println("  [CONSTRUCTOR 3 - Enterprise Custom] Initialized: " + batchCode);
        }

        public void printBatchDetails() {
            System.out.printf("  -> [%s] %s | Instructor: %s | Cap: %d | Hub: %s\n",
                    batchCode, subjectName, instructor, maxCapacity, locationHub);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: CONSTRUCTOR OVERLOADING DEMONSTRATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating batch using 2-argument constructor:");
        CourseBatch b1 = new CourseBatch("JAVA-001", "Core Java Foundations");
        b1.printBatchDetails();

        System.out.println("\n>>> 2. Creating batch using 3-argument constructor for Naihati hub:");
        CourseBatch b2 = new CourseBatch("JAVA-002", "Advanced Concurrency", "Naihati Hub");
        b2.printBatchDetails();

        System.out.println("\n>>> 3. Creating batch using full 5-argument constructor:");
        CourseBatch b3 = new CourseBatch("JAVA-003", "Spring Boot Microservices", "Sukanta Hui", 40, "Shyamnagar Hub");
        b3.printBatchDetails();

        System.out.println("\n==========================================================================");
    }
}