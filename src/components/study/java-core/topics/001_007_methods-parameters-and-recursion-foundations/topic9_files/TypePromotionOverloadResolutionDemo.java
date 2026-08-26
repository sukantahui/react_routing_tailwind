/**
 * File: TypePromotionOverloadResolutionDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 9)
 * Description: Demonstrates Automatic Type Promotion & Resolution Hierarchy in Method Overloading (JLS §15.12.2):
 *              1. Exact Type Match (Priority 1)
 *              2. Primitive Widening Promotion: byte -> short -> int -> long -> float -> double (Priority 2)
 *              3. Autoboxing/Unboxing: int -> Integer (Priority 3)
 *              4. Varargs Fallback: int... (Priority 4)
 *              5. Ambiguous Invocation resolution conflicts
 *              for student tuition ledger processing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class TypePromotionOverloadResolutionDemo {

    // =========================================================================
    // OVERLOAD RESOLUTION HIERARCHY TEST SUITE
    // =========================================================================

    // Overload A: Primitive int (Exact match for int literals)
    public static void processFee(int fee) {
        System.out.printf("  [EXACT MATCH: processFee(int)]       Processing fee: ₹%,d%n", fee);
    }

    // Overload B: Primitive long (Widening match if int is not present)
    public static void processFee(long fee) {
        System.out.printf("  [WIDENING MATCH: processFee(long)]   Processing fee: ₹%,d%n", fee);
    }

    // Overload C: Primitive double (Widening match for floating-point/integers)
    public static void processFee(double fee) {
        System.out.printf("  [WIDENING MATCH: processFee(double)] Processing fee: ₹%,.2f%n", fee);
    }

    // Overload D: Wrapper class (Autoboxing match)
    public static void processFee(Integer fee) {
        System.out.printf("  [AUTOBOXING: processFee(Integer)]    Processing fee: ₹%,d%n", fee);
    }

    // Overload E: Varargs (Lowest priority fallback)
    public static void processFee(int... fees) {
        System.out.printf("  [VARARGS: processFee(int...)]        Processing count: %d fees%n", fees.length);
    }

    // =========================================================================
    // WIDENING BEATS AUTOBOXING DEMO SUITE
    // =========================================================================
    public static void evaluatePriority(long value) {
        System.out.println("  -> [PRIORITY WINNER: evaluatePriority(long)] (Widening won over Autoboxing!)");
    }

    public static void evaluatePriority(Integer value) {
        System.out.println("  -> [PRIORITY RUNNER-UP: evaluatePriority(Integer)] (Autoboxing)");
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 TYPE PROMOTION IN OVERLOADING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. DEMONSTRATING EXACT MATCH VS WIDENING PROMOTION ---\n");

        // 1. Passing byte (byte 50 promoted to int):
        byte token = 50;
        System.out.print("Calling processFee(byte 50): ");
        processFee(token); // Promoted: byte -> short -> int

        // 2. Passing short (short 4000 promoted to int):
        short shortFee = 4000;
        System.out.print("Calling processFee(short 4000): ");
        processFee(shortFee); // Promoted: short -> int

        // 3. Passing char (char 'A' = 65 promoted to int):
        char code = 'A';
        System.out.print("Calling processFee(char 'A'): ");
        processFee(code); // Promoted: char -> int (65)

        // 4. Passing float (float promoted to double):
        float floatFee = 12500.50f;
        System.out.print("Calling processFee(float 12500.50f): ");
        processFee(floatFee); // Promoted: float -> double

        System.out.println("\n--- 2. DEMONSTRATING WIDENING BEATS AUTOBOXING RULE ---\n");

        int swadeepScore = 100;
        System.out.print("Evaluating int 100 between (long) and (Integer):");
        // JLS Rule: Primitive widening (int -> long) ALWAYS beats Autoboxing (int -> Integer)!
        evaluatePriority(swadeepScore);

        System.out.println("\n--- 3. DEMONSTRATING VARARGS AS LOWEST PRIORITY FALLBACK ---\n");

        System.out.print("Calling processFee(1000, 2000, 3000): ");
        processFee(1000, 2000, 3000); // Only matches varargs

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Resolution Hierarchy: Exact Match > Widening Promotion > Autoboxing > Varargs.");
        System.out.println("2. Primitive Widening ALWAYS takes precedence over Autoboxing wrapper types.");
        System.out.println("3. byte, short, and char automatically widen to int during method resolution.");
        System.out.println("4. Varargs is evaluated last as the ultimate fallback if no fixed arity matches.");
        System.out.println("================================================================================");
    }
}
