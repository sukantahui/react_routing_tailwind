/**
 * File: DivisionTruncationVsFloatDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 2)
 * Description: Demonstrates integer division truncation, floating-point division,
 *              truncation vs floor vs ceil vs round, Java 8 Math.floorDiv(),
 *              and student examination percentage calculations in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class DivisionTruncationVsFloatDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 DIVISION TRUNCATION VS FLOAT DIVISION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Integer Division Truncation (The Classic Beginner Trap)
        System.out.println("--- 1. INTEGER DIVISION TRUNCATION VS FLOATING-POINT DIVISION ---");
        int num1 = 7;
        int num2 = 2;

        int intResult = num1 / num2; // 7 / 2 evaluates to integer 3 (0.5 truncated!)
        double buggyDouble = num1 / num2; // 7 / 2 produces 3, which is then assigned to double as 3.0!
        double correctDouble1 = (double) num1 / num2; // 7.0 / 2 = 3.5
        double correctDouble2 = num1 / (double) num2; // 7 / 2.0 = 3.5
        double correctDouble3 = num1 / 2.0;           // 7 / 2.0 = 3.5

        System.out.printf("Integer division (7 / 2)              : %d%n", intResult);
        System.out.printf("Buggy double assignment (double d = 7/2): %.2f (Truncation already occurred!)%n", buggyDouble);
        System.out.printf("Correct casting ((double) 7 / 2)       : %.2f%n", correctDouble1);
        System.out.printf("Correct literal (7 / 2.0)              : %.2f%n%n", correctDouble3);

        // 2. Negative Number Division: Truncation vs Floor (Math.floorDiv)
        System.out.println("--- 2. TRUNCATION VS FLOOR DIVISION WITH NEGATIVE NUMBERS ---");
        // Standard Java '/' truncates towards ZERO:
        int stdNegDivision = -7 / 2; // -3.5 truncated towards zero becomes -3
        // Java 8+ Math.floorDiv() rounds DOWN towards negative infinity:
        int mathFloorDiv = Math.floorDiv(-7, 2); // -3.5 floored becomes -4

        System.out.printf("Standard Java Division (-7 / 2)   : %d (Truncates towards zero)%n", stdNegDivision);
        System.out.printf("Java 8 Math.floorDiv(-7, 2)       : %d (Floors towards negative infinity)%n%n", mathFloorDiv);

        // 3. Mathematical Rounding Functions in java.lang.Math
        System.out.println("--- 3. MATH ROUNDING UTILITIES (FLOOR, CEIL, ROUND) ---");
        double val = 3.75;
        double negVal = -3.75;

        System.out.printf("Value: %.2f -> Math.floor(): %.0f | Math.ceil(): %.0f | Math.round(): %d%n",
                val, Math.floor(val), Math.ceil(val), Math.round(val));
        System.out.printf("Value: %.2f -> Math.floor(): %.0f | Math.ceil(): %.0f | Math.round(): %d%n%n",
                negVal, Math.floor(negVal), Math.ceil(negVal), Math.round(negVal));

        // 4. Real-World Student Exam Average & Fee Per Hour Calculator
        System.out.println("--- 4. BARRACKPORE STUDENT PERFORMANCE & HOURLY TUITION RATE ---");
        calculateStudentMetrics("Swadeep", 85, 90, 82, 15000.0, 48);
        calculateStudentMetrics("Tuhina", 92, 95, 89, 22000.0, 60);
        calculateStudentMetrics("Abhronila", 78, 84, 80, 18000.0, 50);
        calculateStudentMetrics("Debangshu", 90, 94, 91, 25000.0, 64);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. When both operands are int, '/' truncates decimals towards zero.");
        System.out.println("2. 'double d = a / b;' is buggy if a and b are integers—cast at least one to double!");
        System.out.println("3. Use Math.floorDiv() when mathematical floor rounding is required for negative numbers.");
        System.out.println("4. Always use 3.0 (floating-point literal) when computing averages of 3 subjects.");
        System.out.println("================================================================================");
    }

    private static void calculateStudentMetrics(String name, int m1, int m2, int m3, double courseFee, int totalHours) {
        // Correct average calculation: dividing by 3.0 (floating-point literal)
        double correctAverage = (m1 + m2 + m3) / 3.0;

        // Buggy demonstration:
        int truncatedAverage = (m1 + m2 + m3) / 3;

        // Hourly fee calculation:
        double hourlyRate = courseFee / totalHours;

        System.out.printf("Student: %-10s | Total: %3d | Correct Avg: %5.2f%% | Buggy Truncated: %2d%% | Hourly Rate: ₹%,.2f/hr%n",
                name, (m1 + m2 + m3), correctAverage, truncatedAverage, hourlyRate);
    }
}
