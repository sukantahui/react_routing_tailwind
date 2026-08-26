/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 4: Passing 'this' as an Argument in Method Calls (Callback / Observer Pattern)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class PassingThisInMethodCallDemo {

    // Notification Service (Receives Student reference)
    public static class NotificationHub {
        public static void registerForSmsAlerts(StudentTrainee student) {
            System.out.printf("  [SMS SERVICE] Registered phone alerts for student: %s (ID: %d)\n",
                    student.getName(), student.getId());
        }

        public static void generateIdCard(StudentTrainee student) {
            System.out.printf("  [ID CARD SERVICE] Printed plastic smartcard for: %s\n", student.getName());
        }
    }

    // Domain Class: StudentTrainee (Passes 'this' to external services)
    public static class StudentTrainee {
        private final int id;
        private final String name;

        public StudentTrainee(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public int getId() { return id; }
        public String getName() { return name; }

        public void enrollInServices() {
            System.out.println("  [STUDENT] Enrolling current instance in campus services...");
            // Passing 'this' (current object instance) as method argument
            NotificationHub.registerForSmsAlerts(this);
            NotificationHub.generateIdCard(this);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PASSING 'this' AS METHOD ARGUMENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentTrainee swadeep = new StudentTrainee(101, "Swadeep Paul");
        swadeep.enrollInServices();

        System.out.println("\n==========================================================================");
    }
}