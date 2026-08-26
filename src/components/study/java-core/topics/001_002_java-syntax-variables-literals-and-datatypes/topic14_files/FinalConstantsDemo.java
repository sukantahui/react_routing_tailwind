/**
 * File: FinalConstantsDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 14)
 * Description: Demonstrates immutable constants using the 'final' keyword,
 *              compile-time constants, blank final variables, constructor initialization,
 *              reference immutability vs object state mutability, and Indian Rupee (₹) GST calculations.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

public class FinalConstantsDemo {

    // 1. Compile-Time Global Constants (UPPER_SNAKE_CASE)
    public static final String INSTITUTE_NAME = "Coder & AccoTax";
    public static final String LOCATION = "Barrackpore, West Bengal";
    public static final double STANDARD_GST_RATE = 0.18; // 18% GST in India
    public static final int MAX_BATCH_CAPACITY = 30;

    // 2. Blank Static Final Variable (Initialized in static block)
    public static final long INSTITUTION_REGISTRATION_ID;
    static {
        INSTITUTION_REGISTRATION_ID = 2026_08_7003756860L;
    }

    // 3. Blank Instance Final Variable (Initialized in constructor)
    private final int studentId;
    private final String studentName;

    public FinalConstantsDemo(int id, String name) {
        this.studentId = id;       // Exactly one assignment allowed
        this.studentName = name;   // Immutable once assigned
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 14 IMMUTABLE CONSTANTS WITH 'FINAL'");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Accessing Global Constants
        System.out.println("--- 1. GLOBAL COMPILE-TIME CONSTANTS ---");
        System.out.printf("Institute Name         : %s%n", INSTITUTE_NAME);
        System.out.printf("Center Location        : %s%n", LOCATION);
        System.out.printf("Standard GST Rate      : %.0f%%%n", (STANDARD_GST_RATE * 100));
        System.out.printf("Maximum Batch Size     : %d Students%n", MAX_BATCH_CAPACITY);
        System.out.printf("Govt Registration ID   : %d%n%n", INSTITUTION_REGISTRATION_ID);

        // 2. Local Final Variables & Fee Calculation
        System.out.println("--- 2. LOCAL FINAL VARIABLES & INVOICE CALCULATIONS ---");
        final double baseCourseFee = 15000.00; // Base Fee in Indian Rupees (₹)
        final double gstAmount = baseCourseFee * STANDARD_GST_RATE;
        final double totalPayable = baseCourseFee + gstAmount;

        // Reassignment Attempt (Forbidden by Java Compiler):
        // baseCourseFee = 18000.0; // COMPILATION ERROR: Cannot assign a value to final variable baseCourseFee!

        System.out.printf("Base Course Fee        : ₹%,.2f%n", baseCourseFee);
        System.out.printf("GST (18%%)              : ₹%,.2f%n", gstAmount);
        System.out.printf("Total Payable Invoice  : ₹%,.2f%n%n", totalPayable);

        // 3. Blank Final Local Variables (Deferred Single Assignment)
        System.out.println("--- 3. BLANK FINAL LOCAL VARIABLES ---");
        final String academicGrade;
        int examScore = 92;

        if (examScore >= 90) {
            academicGrade = "Distinction (O)";
        } else if (examScore >= 75) {
            academicGrade = "First Class (A+)";
        } else {
            academicGrade = "Standard Pass (B)";
        }
        // academicGrade = "Modified"; // COMPILATION ERROR! Already assigned in branching logic

        System.out.printf("Student Exam Score     : %d%n", examScore);
        System.out.printf("Assigned Grade (Final) : %s%n%n", academicGrade);

        // 4. Critical Nuance: Final Reference vs Object State Mutability
        System.out.println("--- 4. FINAL REFERENCE VS OBJECT MUTABILITY ---");
        final int[] studentMarks = {85, 90, 78};

        // Allowed: Modifying the contents/elements of the referenced array:
        studentMarks[0] = 95; // Legal! The array object's internal state is mutated.

        // Forbidden: Reassigning the reference variable to a new array object:
        // studentMarks = new int[]{100, 100, 100}; // COMPILER ERROR: Cannot assign a value to final variable!

        System.out.printf("Updated First Mark     : %d (Array element mutation is allowed)%n", studentMarks[0]);
        System.out.println("Rule: 'final' protects the REFERENCE binding, NOT the internal state of mutable objects!\n");

        // 5. Instantiating Objects with Final Instance Fields
        System.out.println("--- 5. IMMUTABLE INSTANCE FIELDS ---");
        FinalConstantsDemo student1 = new FinalConstantsDemo(101, "Swadeep");
        FinalConstantsDemo student2 = new FinalConstantsDemo(102, "Tuhina");

        System.out.printf("Student 1: ID=%d, Name=%s%n", student1.studentId, student1.studentName);
        System.out.printf("Student 2: ID=%d, Name=%s%n%n", student2.studentId, student2.studentName);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'final' variables can be assigned ONCE and only once.");
        System.out.println("2. Global constants should be 'public static final' in UPPER_SNAKE_CASE.");
        System.out.println("3. Blank finals must be initialized before reading (in constructors/blocks).");
        System.out.println("4. Final references cannot be reassigned, but the underlying object may still be mutable.");
        System.out.println("================================================================================");
    }
}
