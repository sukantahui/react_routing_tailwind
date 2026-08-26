/**
 * File: BooleanDataTypeDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 13)
 * Description: Demonstrates Java boolean primitive type, true and false literals,
 *              non-convertibility to/from integers, prevention of the classic C assignment bug,
 *              short-circuit (&&, ||) vs eager (&, |) evaluation, and student scholarship eligibility.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

public class BooleanDataTypeDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 13 BOOLEAN PRIMITIVE & LOGICAL EVALUATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Boolean Literals & Default Value
        System.out.println("--- 1. BOOLEAN LITERALS & VARIABLES ---");
        boolean isEnrolled = true;
        boolean hasPaidFees = false;
        boolean defaultState = new StudentRecord().defaultFlag; // Defaults to false

        System.out.printf("isEnrolled (true literal)  : %b%n", isEnrolled);
        System.out.printf("hasPaidFees (false literal): %b%n", hasPaidFees);
        System.out.printf("Default uninitialized flag : %b%n%n", defaultState);

        // 2. Strict Type Safety: No Integer-to-Boolean Conversion
        System.out.println("--- 2. JAVA TYPE SAFETY VS C/C++ CONVERSION ---");
        // In C/C++: 1 == true, 0 == false. In Java, this is strictly illegal:
        // boolean invalid1 = 1;         // COMPILATION ERROR!
        // int invalid2 = (int) true;    // COMPILATION ERROR!
        // int x = 0; if (x = 1) { }     // COMPILATION ERROR! (Prevents accidental assignment bug)

        int examScore = 85;
        boolean hasPassed = (examScore >= 40); // Relational expressions return boolean
        System.out.printf("Exam Score: %d -> Has Passed? %b%n", examScore, hasPassed);

        // Explicit conversion between boolean and integer (if required for legacy protocols):
        int intFromBoolean = hasPassed ? 1 : 0;
        boolean booleanFromInt = (intFromBoolean != 0);
        System.out.printf("Manual conversion: boolean -> int: %d | int -> boolean: %b%n%n",
                intFromBoolean, booleanFromInt);

        // 3. Short-Circuit (&&, ||) vs Eager Non-Short-Circuit (&, |) Evaluation
        System.out.println("--- 3. SHORT-CIRCUIT (&&, ||) VS EAGER (&, |) LOGIC ---");
        // Short-circuit && skips the right operand if the left operand is false:
        String studentName = null;

        // SAFE: Short-circuit && avoids NullPointerException because studentName != null is false:
        if (studentName != null && studentName.length() > 3) {
            System.out.println("Valid Student Name");
        } else {
            System.out.println("Short-circuit protected against NullPointerException when studentName is null!");
        }

        // Eager evaluation demonstration:
        int counter = 0;
        boolean eagerResult = (false & (++counter > 0)); // Right side ALWAYS executes
        System.out.printf("Eager '&' evaluation counter: %d (Right side evaluated)%n", counter);

        counter = 0;
        boolean shortCircuitResult = (false && (++counter > 0)); // Right side SKIPPED
        System.out.printf("Short-circuit '&&' counter  : %d (Right side skipped)%n%n", counter);

        // 4. Classroom Scholarship Eligibility Engine (Barrackpore Center)
        System.out.println("--- 4. BARRACKPORE SCHOLARSHIP ELIGIBILITY LOGIC ---");
        evaluateScholarship("Swadeep", 92, 18000.0, true);
        evaluateScholarship("Tuhina", 88, 22000.0, false);
        evaluateScholarship("Abhronila", 74, 15000.0, true);
        evaluateScholarship("Debangshu", 96, 25000.0, true);

        // 5. Logical XOR (^) and NOT (!) Operators
        System.out.println("\n--- 5. BOOLEAN XOR (^) AND INVERSION (!) ---");
        boolean hasIdCard = true;
        boolean hasBiometricThumb = false;
        // XOR (^) returns true if and only if EXACTLY ONE operand is true:
        boolean singleFactorAuth = hasIdCard ^ hasBiometricThumb;
        boolean doubleFactorAuth = hasIdCard && hasBiometricThumb;

        System.out.printf("Single-Factor Access (XOR ^): %b (Only one credential present)%n", singleFactorAuth);
        System.out.printf("Double-Factor Access (AND &&): %b (Both required)%n", doubleFactorAuth);
        System.out.printf("Inversion (!hasPaidFees)     : %b%n%n", !hasPaidFees);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'boolean' has only 2 literals: 'true' and 'false' (all lowercase keywords).");
        System.out.println("2. Booleans CANNOT be cast or converted to int (unlike C/C++).");
        System.out.println("3. Always use short-circuit '&&' and '||' for null checks and safe guard conditions.");
        System.out.println("4. Default value of boolean instance/static fields is 'false'.");
        System.out.println("================================================================================");
    }

    private static void evaluateScholarship(String name, int marks, double monthlyFee, boolean attendanceOk) {
        // Eligibility Rule: Marks >= 85 AND Attendance >= 80% (attendanceOk)
        boolean isEligible = (marks >= 85) && attendanceOk;
        double discount = isEligible ? (monthlyFee * 0.25) : 0.0;
        double finalFee = monthlyFee - discount;

        System.out.printf("Student: %-10s | Marks: %2d | Fee: ₹%,.2f | Eligible: %-5b | Final Fee: ₹%,.2f%n",
                name, marks, monthlyFee, isEligible, finalFee);
    }

    static class StudentRecord {
        boolean defaultFlag; // Defaults to false
    }
}
