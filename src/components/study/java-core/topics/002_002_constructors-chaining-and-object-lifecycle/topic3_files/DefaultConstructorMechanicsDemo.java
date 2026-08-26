/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 3: Default Constructor: Compiler-Generated vs User-Defined
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class DefaultConstructorMechanicsDemo {

    // 1. Implicit Default Constructor: Zero constructors written
    // The compiler automatically injects:
    // public StudentProfileAuto() { super(); }
    public static class StudentProfileAuto {
        private String studentName; // Defaults to null
        private int rollNumber;     // Defaults to 0
        private double feeDue;       // Defaults to 0.0
        private boolean isEnrolled; // Defaults to false

        public void printState() {
            System.out.printf("  [AUTO DEFAULT] Name: %s, Roll: %d, Due: ₹%.2f, Enrolled: %b\n",
                    studentName, rollNumber, feeDue, isEnrolled);
        }
    }

    // 2. Explicit User-Defined No-Arg Constructor
    // Developer provides custom default initial state
    public static class StudentProfileExplicit {
        private String studentName;
        private int rollNumber;
        private double feeDue;
        private boolean isEnrolled;
        private String campusHub;

        public StudentProfileExplicit() {
            // Explicit default initialization values
            this.studentName = "Trainee Candidate";
            this.rollNumber = 9999;
            this.feeDue = 0.0;
            this.isEnrolled = true;
            this.campusHub = "Barrackpore Central Hub";
            System.out.println("  [EXPLICIT CONSTRUCTOR] Initialized with standard baseline values.");
        }

        public void printState() {
            System.out.printf("  [EXPLICIT DEFAULT] Name: %s, Roll: %d, Hub: %s, Enrolled: %b\n",
                    studentName, rollNumber, campusHub, isEnrolled);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: DEFAULT CONSTRUCTOR MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating instance of class with compiler-generated constructor:");
        StudentProfileAuto auto = new StudentProfileAuto();
        auto.printState();

        System.out.println("\n>>> 2. Creating instance of class with user-defined default constructor:");
        StudentProfileExplicit explicitObj = new StudentProfileExplicit();
        explicitObj.printState();

        System.out.println("\n==========================================================================");
    }
}