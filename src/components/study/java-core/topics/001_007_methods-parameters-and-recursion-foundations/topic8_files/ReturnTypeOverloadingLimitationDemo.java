/**
 * File: ReturnTypeOverloadingLimitationDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 8)
 * Description: Explains why return type alone cannot overload a method in Java (JLS §8.4.2, §15.12):
 *              1. Call site invocation ambiguity when return value is discarded: computeFee(101);
 *              2. JLS method signature definition (Name + Parameter Types only)
 *              3. Clean architectural solution: Intention-revealing method names (getFeeAsInt, getFeeAsDouble)
 *              for student fee inquiries in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class ReturnTypeOverloadingLimitationDemo {

    // =========================================================================
    // WHY THE FOLLOWING WOULD FAIL TO COMPILE (ILLEGAL IN JAVA):
    // =========================================================================
    // public static int computeFee(int studentId) { return 15000; }
    // public static double computeFee(int studentId) { return 15000.50; }
    // -> COMPILE ERROR: method computeFee(int) is already defined in class!

    // =========================================================================
    // THE CLEAN ARCHITECTURAL SOLUTION: DISTINCT INTENTION-REVEALING NAMES
    // =========================================================================

    /**
     * Retrieves fee as a rounded integer (for cash receipts)
     */
    public static int getFeeAsInteger(int studentId) {
        double fee = queryDatabaseFee(studentId);
        return (int) Math.round(fee);
    }

    /**
     * Retrieves fee as high-precision double (for banking ledger)
     */
    public static double getFeeAsDouble(int studentId) {
        return queryDatabaseFee(studentId);
    }

    /**
     * Retrieves fee formatted with currency symbol and 2 decimals
     */
    public static String getFeeAsFormattedString(int studentId) {
        double fee = queryDatabaseFee(studentId);
        return String.format("₹%,.2f", fee);
    }

    // Helper database simulator
    private static double queryDatabaseFee(int studentId) {
        return switch (studentId) {
            case 101 -> 18000.75; // Swadeep
            case 102 -> 15500.50; // Tuhina
            case 103 -> 12000.00; // Abhronila
            default  -> 10000.00; // Debangshu
        };
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 8 RETURN TYPE OVERLOADING LIMITATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- WHY RETURN TYPE CANNOT DISAMBIGUATE METHOD INVOCATIONS ---\n");

        int swadeepId = 101;
        int tuhinaId = 102;

        // 1. Invoking Integer Return:
        int intFee = getFeeAsInteger(swadeepId);
        System.out.printf("  [Integer Method]       getFeeAsInteger(101)          : ₹%,d%n", intFee);

        // 2. Invoking Double Return:
        double dblFee = getFeeAsDouble(swadeepId);
        System.out.printf("  [Double Method]        getFeeAsDouble(101)           : ₹%,.2f%n", dblFee);

        // 3. Invoking Formatted String Return:
        String strFee = getFeeAsFormattedString(swadeepId);
        System.out.printf("  [String Method]        getFeeAsFormattedString(101)  : %s%n%n", strFee);

        System.out.println("--- DEMONSTRATING THE CALL-SITE AMBIGUITY PROBLEM ---");
        System.out.println("Imagine if Java allowed: int query(int id) AND double query(int id)");
        System.out.println("When a caller executes: query(102); (discarding return value for side effects)");
        System.out.println("The compiler CANNOT determine whether to call the int or double version!");
        System.out.printf("Tuhina (ID 102) Fee: %s%n%n", getFeeAsFormattedString(tuhinaId));

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Method Signature = Method Name + Parameter Types (Return type is NOT included).");
        System.out.println("2. If return type alone distinguished methods, calls like 'doStuff();' would be ambiguous.");
        System.out.println("3. Always use descriptive names like 'getFeeAsInteger()' or 'getFeeAsDouble()'.");
        System.out.println("4. Method overloading requires different parameter lists, never just return types.");
        System.out.println("================================================================================");
    }
}
