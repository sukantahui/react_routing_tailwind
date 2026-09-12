/**
 * ============================================================================
 * ICSE CLASS X - TOP 10 EXAMINER TRAPS & PREVENTION DEMO
 * ============================================================================
 * Educator: Sukanta Hui | Barrackpore, Kolkata
 * Institute: Coder & AccoTax
 * 
 * This class isolates and contrasts the 10 most lethal traps that cost ICSE
 * students marks every year in Section A snippets and Section B programs:
 * 
 * TRAP 1: Integer division truncation (e.g. 5/9 = 0 instead of 5.0/9)
 * TRAP 2: String comparison with == vs .equals()
 * TRAP 3: Math function return types (Math.ceil/floor returns double)
 * TRAP 4: Scanner buffer newline trap
 * TRAP 5: Off-by-one errors in String extraction
 * TRAP 6: Destructive digit extraction losing the original number
 * TRAP 7: Switch-case fall-through missing break
 * TRAP 8: Array length property vs String length() method
 * ============================================================================
 */

import java.util.Scanner;

public class ExaminerTrapsPreventionDemo {

    // TRAP 1: FAHRENHEIT TO CELSIUS (Integer Division)
    public static void demonstrateTrap1() {
        double f = 98.6;
        // FLAWED: (5 / 9) evaluates to 0 in integer arithmetic!
        double flawedC = (5 / 9) * (f - 32); 

        // CORRECT: (5.0 / 9.0) ensures double floating-point division
        double correctC = (5.0 / 9.0) * (f - 32);

        System.out.println("--- TRAP 1: INTEGER DIVISION ---");
        System.out.println("Flawed result (5/9)*(f-32)   : " + flawedC + " (Zero!)");
        System.out.printf("Correct result (5.0/9)*(f-32): %.2f °C\n", correctC);
    }

    // TRAP 2: STRING EQUALITY (== vs .equals)
    public static void demonstrateTrap2() {
        String s1 = "KOLKATA";
        String s2 = new String("KOLKATA");

        System.out.println("\n--- TRAP 2: STRING EQUALITY ---");
        System.out.println("s1 == s2      : " + (s1 == s2) + " (Compares memory references!)");
        System.out.println("s1.equals(s2) : " + s1.equals(s2) + " (Compares actual characters!)");
    }

    // TRAP 3: MATH FUNCTION RETURN TYPES
    public static void demonstrateTrap3() {
        System.out.println("\n--- TRAP 3: MATH FUNCTION RETURN TYPES ---");
        // Math.ceil and Math.floor always return double, NOT int!
        double ceilVal = Math.ceil(4.2);
        double floorVal = Math.floor(4.8);
        System.out.println("Math.ceil(4.2)  : " + ceilVal + " (Type: double, NOT 5)");
        System.out.println("Math.floor(4.8) : " + floorVal + " (Type: double, NOT 4)");
        // Math.round returns long (for double) or int (for float)
        long roundVal = Math.round(4.8);
        System.out.println("Math.round(4.8) : " + roundVal + " (Type: long/int)");
    }

    // TRAP 4: DESTRUCTIVE DIGIT EXTRACTION
    public static void demonstrateTrap4(int num) {
        System.out.println("\n--- TRAP 4: PRESERVING ORIGINAL NUMBER ---");
        // FLAWED: Modifying num directly leaves it at 0
        int temp = num; // CORRECT: Always work on a copy!
        int digitSum = 0;
        while (temp > 0) {
            digitSum += temp % 10;
            temp /= 10;
        }
        System.out.println("Original Number (preserved) : " + num);
        System.out.println("Sum of Digits               : " + digitSum);
    }

    // TRAP 5: ARRAY LENGTH VS STRING LENGTH()
    public static void demonstrateTrap5() {
        System.out.println("\n--- TRAP 5: LENGTH PROPERTY VS METHOD ---");
        int[] arr = { 10, 20, 30, 40 };
        String str = "BARRACKPORE";

        System.out.println("Array length (no parentheses)  : arr.length = " + arr.length);
        System.out.println("String length (has parentheses): str.length() = " + str.length());
    }

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println(" ICSE EXAMINER TRAP PREVENTION DEMONSTRATION     ");
        System.out.println("==================================================");

        demonstrateTrap1();
        demonstrateTrap2();
        demonstrateTrap3();
        demonstrateTrap4(458);
        demonstrateTrap5();

        System.out.println("==================================================");
    }
}
