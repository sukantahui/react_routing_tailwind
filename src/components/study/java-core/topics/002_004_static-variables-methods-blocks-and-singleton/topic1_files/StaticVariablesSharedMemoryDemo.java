/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 1: Static Variables (Class Variables): Single Shared Copy in Metaspace
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticVariablesSharedMemoryDemo {

    public static class EnrollmentTracker {
        // STATIC COUNTER: Incremented on every object instantiation
        public static int totalEnrolledStudents = 0;

        private int studentId;
        private String studentName;

        public EnrollmentTracker(String studentName) {
            // Static variable is shared; modifying it impacts the global counter
            totalEnrolledStudents++;
            this.studentId = totalEnrolledStudents;
            this.studentName = studentName;
        }

        public void printStatus() {
            System.out.printf("  -> Student: %-15s | ID: %-4d | Global Count: %d\n",
                    studentName, studentId, totalEnrolledStudents);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: STATIC VARIABLES SHARED MEMORY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Enrolling students sequentially:");
        EnrollmentTracker s1 = new EnrollmentTracker("Swadeep Paul");
        s1.printStatus();

        EnrollmentTracker s2 = new EnrollmentTracker("Tuhina Das");
        s2.printStatus();

        EnrollmentTracker s3 = new EnrollmentTracker("Debangshu Mukherjee");
        s3.printStatus();

        System.out.println("\n>>> Final Total Count via ClassName: " + EnrollmentTracker.totalEnrolledStudents);

        System.out.println("\n==========================================================================");
    }
}