/**
 * File: JavaCommonBugsDebuggingChallengeDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 9)
 * Description: Interactive master debugging suite identifying and resolving 10 Common Compilation & Logical Bugs:
 *              1. String Equality: == vs .equals()
 *              2. NullPointerException: Missing null guards & uninitialized references
 *              3. Off-By-One & Array Bounds: i <= arr.length vs i < arr.length
 *              4. Integer Division Truncation: 5 / 2 == 2 vs 5.0 / 2 == 2.5
 *              5. 32-Bit Integer Overflow before assignment to long
 *              6. Accidental Semicolon after loops & conditionals: for(...);
 *              7. Variable Shadowing without 'this' keyword
 *              8. Switch Fall-Through due to missing break statements
 *              9. Missing Base Case in Recursion (StackOverflowError)
 *              10. Collection Mutation during enhanced for-each loop (ConcurrentModificationException)
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class JavaCommonBugsDebuggingChallengeDemo {

    // =========================================================================
    // BUG 1: String Equality (== vs .equals())
    // =========================================================================
    public static boolean fixBug1_StringEquality(String a, String b) {
        // BUG: return a == b; (Compares memory addresses, not characters!)
        // FIX:
        return (a == null) ? (b == null) : a.equals(b);
    }

    // =========================================================================
    // BUG 2: NullPointerException (Safe Navigation & Guards)
    // =========================================================================
    public static int fixBug2_NullSafety(String text) {
        // BUG: return text.length(); (Throws NPE if text is null!)
        // FIX:
        return (text == null) ? 0 : text.length();
    }

    // =========================================================================
    // BUG 3: Off-By-One Array Bounds
    // =========================================================================
    public static int fixBug3_ArrayBounds(int[] arr) {
        int sum = 0;
        // BUG: for (int i = 0; i <= arr.length; i++) -> Throws ArrayIndexOutOfBoundsException
        // FIX:
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    // =========================================================================
    // BUG 4: Integer Division Truncation
    // =========================================================================
    public static double fixBug4_IntegerDivision(int totalMarks, int subjectCount) {
        // BUG: double avg = totalMarks / subjectCount; (Truncates to integer first!)
        // FIX:
        return (double) totalMarks / subjectCount;
    }

    // =========================================================================
    // BUG 5: Integer Overflow Before Long Assignment
    // =========================================================================
    public static long fixBug5_IntegerOverflow(int pricePerUnit, int quantity) {
        // BUG: long total = pricePerUnit * quantity; (Multiplies as 32-bit int first!)
        // FIX:
        return (long) pricePerUnit * quantity;
    }

    // =========================================================================
    // BUG 6: Accidental Semicolon on Loop Header
    // =========================================================================
    public static int fixBug6_AccidentalSemicolon(int n) {
        int count = 0;
        // BUG: for (int i = 0; i < n; i++); count++; (Semicolon creates empty loop body!)
        // FIX:
        for (int i = 0; i < n; i++) {
            count++;
        }
        return count;
    }

    // =========================================================================
    // BUG 7: Variable Shadowing in Field Assignment
    // =========================================================================
    static class StudentRecord {
        String name;
        int roll;

        public StudentRecord(String name, int roll) {
            // BUG: name = name; roll = roll; (Assigns parameter to itself!)
            // FIX:
            this.name = name;
            this.roll = roll;
        }
    }

    // =========================================================================
    // BUG 8: Switch Fall-Through
    // =========================================================================
    public static String fixBug8_SwitchFallThrough(int day) {
        // BUG: switch(day) { case 1: return ... missing break causes fallthrough }
        // FIX (Modern Java 14+ Switch Expression):
        return switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other Day";
        };
    }

    // =========================================================================
    // BUG 9: Missing Base Case in Recursion
    // =========================================================================
    public static int fixBug9_RecursionBaseCase(int n) {
        // BUG: return n + fixBug9(n - 1); (Runs forever -> StackOverflowError)
        // FIX:
        if (n <= 0) return 0; // Base Case
        return n + fixBug9_RecursionBaseCase(n - 1);
    }

    // =========================================================================
    // BUG 10: Modifying List During Iteration (ConcurrentModificationException)
    // =========================================================================
    public static void fixBug10_ConcurrentModification(List<String> list, String target) {
        // BUG: for (String s : list) { if (s.equals(target)) list.remove(s); }
        // FIX (Iterator.remove() or list.removeIf()):
        list.removeIf(s -> s.equals(target));
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 DEBUGGING 10 COMMON BUGS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- RESOLVING THE 10 CLASSIC JAVA BUGS ---\n");

        // 1. String Equality
        String str1 = new String("Barrackpore");
        String str2 = new String("Barrackpore");
        System.out.printf("Bug 1 Fix (String .equals())   : %s%n", fixBug1_StringEquality(str1, str2) ? "PASSED (true)" : "FAILED");

        // 2. Null Safety
        System.out.printf("Bug 2 Fix (Null Guard)        : Length = %d%n", fixBug2_NullSafety(null));

        // 3. Array Bounds
        int[] sampleArr = {10, 20, 30};
        System.out.printf("Bug 3 Fix (Array Bounds)      : Sum = %d%n", fixBug3_ArrayBounds(sampleArr));

        // 4. Integer Division
        System.out.printf("Bug 4 Fix (Double Cast Div)   : Avg = %.2f%n", fixBug4_IntegerDivision(95, 2));

        // 5. Long Overflow
        System.out.printf("Bug 5 Fix (Long Cast Multiply): ₹%,d%n", fixBug5_IntegerOverflow(1_000_000, 3000));

        // 6. Semicolon Header
        System.out.printf("Bug 6 Fix (No Extra Semicolon): Count = %d%n", fixBug6_AccidentalSemicolon(5));

        // 7. Variable Shadowing
        StudentRecord s = new StudentRecord("Swadeep", 101);
        System.out.printf("Bug 7 Fix (this.name field)   : Student %s, Roll %d%n", s.name, s.roll);

        // 8. Switch Fall-Through
        System.out.printf("Bug 8 Fix (Switch Expression) : %s%n", fixBug8_SwitchFallThrough(1));

        // 9. Recursion Base Case
        System.out.printf("Bug 9 Fix (Base Case Sum)     : Sum(5) = %d%n", fixBug9_RecursionBaseCase(5));

        // 10. Concurrent Modification
        List<String> students = new ArrayList<>(List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu"));
        fixBug10_ConcurrentModification(students, "Tuhina");
        System.out.printf("Bug 10 Fix (removeIf Safe)    : Remaining = %s%n%n", students);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Always use .equals() for String content comparison, never ==.");
        System.out.println("2. Cast to (double) or (long) before arithmetic operations to prevent truncation/overflow.");
        System.out.println("3. Beware of accidental semicolons after for/while/if headers.");
        System.out.println("4. Use Collection.removeIf() or Iterator.remove() to avoid ConcurrentModificationException.");
        System.out.println("================================================================================");
    }
}
