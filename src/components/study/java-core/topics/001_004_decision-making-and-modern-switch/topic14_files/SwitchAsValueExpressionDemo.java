/**
 * File: SwitchAsValueExpressionDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 14)
 * Description: Demonstrates Java Switch as a Value-Returning Expression (JLS §15.28),
 *              compile-time exhaustiveness guarantees, poly-expression type inference,
 *              embedding switch inside method arguments and return statements,
 *              and student scholarship tuition rebates in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class SwitchAsValueExpressionDemo {

    public enum StudentCategory {
        GENERAL, MERIT_SCHOLAR, BPL_EWS, CORPORATE_SPONSORED
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 14 SWITCH AS A VALUE-RETURNING EXPRESSION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Direct Assignment to 'final' Variable (Enforcing Immutability)
        System.out.println("--- 1. DIRECT IMMUTABLE ASSIGNMENT ---");
        StudentCategory category = StudentCategory.MERIT_SCHOLAR;
        double baseFee = 20000.0;

        // Switch expression returns discount percentage directly:
        final double discountRate = switch (category) {
            case MERIT_SCHOLAR       -> 0.50; // 50% Tuition Waiver
            case BPL_EWS             -> 0.75; // 75% Social Welfare Subsidy
            case CORPORATE_SPONSORED -> 0.20; // 20% Corporate Partner Concession
            case GENERAL             -> 0.00; // Standard Fee
        };

        double finalFee = baseFee * (1.0 - discountRate);
        System.out.printf("Category: %s | Base Fee: ₹%,.2f | Discount: %.0f%% | Final Payable: ₹%,.2f%n%n",
                category, baseFee, discountRate * 100, finalFee);

        // 2. Embedded in Method Arguments
        System.out.println("--- 2. EMBEDDED DIRECTLY IN METHOD ARGUMENTS ---");
        printStudentBadge("Swadeep", StudentCategory.MERIT_SCHOLAR);
        printStudentBadge("Tuhina", StudentCategory.BPL_EWS);
        printStudentBadge("Debangshu", StudentCategory.GENERAL);

        // 3. Directly Returned from Methods
        System.out.println("\n--- 3. DIRECTLY RETURNED FROM METHODS ---");
        System.out.printf("Java Core Base Fee: ₹%,d%n", getCourseBaseFee("JAVA"));
        System.out.printf("Spring Boot Base Fee: ₹%,d%n", getCourseBaseFee("SPRING"));
        System.out.printf("AccoTax GST Base Fee: ₹%,d%n", getCourseBaseFee("TAX"));

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Switch expressions yield a value to assignment targets, method calls, or return statements.");
        System.out.println("2. The compiler strictly enforces EXHAUSTIVENESS (every input must produce a value).");
        System.out.println("3. When switching on an enum with all constants covered, 'default' is not required.");
        System.out.println("4. Always initialize 'final' variables with switch expressions for clean immutability.");
        System.out.println("================================================================================");
    }

    private static void printStudentBadge(String name, StudentCategory category) {
        // Switch expression passed directly as argument to printf:
        System.out.printf("Student: %-10s | Badge: [%s]%n",
                name,
                switch (category) {
                    case MERIT_SCHOLAR       -> "⭐ Honors Scholar (Barrackpore)";
                    case BPL_EWS             -> "🤝 Opportunity Fellow";
                    case CORPORATE_SPONSORED -> "🏢 Tech Partner Delegate";
                    case GENERAL             -> "📚 Enrolled Student";
                }
        );
    }

    private static int getCourseBaseFee(String courseKey) {
        // Direct return of switch expression:
        return switch (courseKey.toUpperCase()) {
            case "JAVA"   -> 15000;
            case "SPRING" -> 22000;
            case "PYTHON" -> 14000;
            case "TAX"    -> 12000;
            default       -> 10000;
        };
    }
}
