/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 4: When does compiler NOT generate a default constructor?
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class CompilerNoArgOmissionRulesDemo {

    // Domain Class: EnrolledStudent
    // Declares an explicit 2-argument constructor.
    // The compiler SUPPRESSES default no-arg constructor generation!
    public static class EnrolledStudent {
        private final int rollNumber;
        private final String studentName;
        private final String batchHub;

        // Explicit Parameterized Constructor
        public EnrolledStudent(int rollNumber, String studentName, String batchHub) {
            this.rollNumber = rollNumber;
            this.studentName = studentName;
            this.batchHub = batchHub;
            System.out.printf("  [CONSTRUCTOR] EnrolledStudent %s (Roll: %d) registered for %s hub.\n",
                    studentName, rollNumber, batchHub);
        }

        public void display() {
            System.out.printf("  -> Student: %s | Roll: %d | Hub: %s\n", studentName, rollNumber, batchHub);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: COMPILER NO-ARG OMISSION RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating instance using valid parameterized constructor:");
        EnrolledStudent s1 = new EnrolledStudent(101, "Swadeep Paul", "Barrackpore");
        s1.display();

        EnrolledStudent s2 = new EnrolledStudent(102, "Tuhina Das", "Naihati");
        s2.display();

        System.out.println("\n>>> 2. Demonstration of Compiler Rule:");
        System.out.println("  Executing 'new EnrolledStudent()' causes a COMPILE-TIME ERROR:");
        System.out.println("  'constructor EnrolledStudent in class EnrolledStudent cannot be applied to given types;'");
        System.out.println("  'required: int, String, String; found: no arguments'");

        System.out.println("\n==========================================================================");
    }
}