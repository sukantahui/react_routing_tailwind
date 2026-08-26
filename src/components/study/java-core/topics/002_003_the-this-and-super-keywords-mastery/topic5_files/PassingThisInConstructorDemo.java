/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 5: Passing 'this' as an Argument in Constructor Calls (Bi-directional Association)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class PassingThisInConstructorDemo {

    // Helper / Child Component
    public static class StudentFeeLedger {
        private final StudentProfile student; // Holds reference back to parent
        private double totalDue = 5000.0;

        // Constructor accepting parent 'this'
        public StudentFeeLedger(StudentProfile student) {
            this.student = student;
            System.out.printf("  [LEDGER CREATED] Bound ledger to student: %s (Roll: %d)\n",
                    this.student.getName(), this.student.getRoll());
        }

        public void printLedger() {
            System.out.printf("  -> Ledger for %s | Balance Due: ₹%.2f\n", student.getName(), totalDue);
        }
    }

    // Parent Domain Entity
    public static class StudentProfile {
        private final int roll;
        private final String name;
        private final StudentFeeLedger ledger;

        public StudentProfile(int roll, String name) {
            this.roll = roll;
            this.name = name;
            // Passing 'this' (current instance) into the constructor of another class
            this.ledger = new StudentFeeLedger(this);
        }

        public int getRoll() { return roll; }
        public String getName() { return name; }
        public StudentFeeLedger getLedger() { return ledger; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: PASSING 'this' IN CONSTRUCTOR CALLS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentProfile s1 = new StudentProfile(101, "Swadeep Paul");
        s1.getLedger().printLedger();

        System.out.println("\n==========================================================================");
    }
}