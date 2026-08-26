/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 5: StringBuilder Methods: append, insert, delete, reverse, replace, setCharAt
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class StringBuilderMethodsMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: StringBuilder CORE METHODS MASTERY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StringBuilder sb = new StringBuilder("Hello Barrackpore");

        // 1. append() -> Adds to the end:
        sb.append(" Hub");
        System.out.println("  1. append()      : "" + sb + """);

        // 2. insert(offset, text) -> Inserts at exact index:
        sb.insert(6, "Academy @ ");
        System.out.println("  2. insert()      : "" + sb + """);

        // 3. replace(start, end, text) -> Replaces range:
        sb.replace(0, 5, "Welcome to");
        System.out.println("  3. replace()     : "" + sb + """);

        // 4. delete(start, end) & deleteCharAt(index):
        sb.delete(0, 11); // Removes "Welcome to "
        System.out.println("  4. delete()      : "" + sb + """);

        // 5. setCharAt(index, ch):
        sb.setCharAt(0, 'a');
        System.out.println("  5. setCharAt()   : "" + sb + """);

        // 6. reverse() -> In-place reversal (Great for Palindrome checks!):
        StringBuilder pal = new StringBuilder("MADAM");
        pal.reverse();
        System.out.println("  6. reverse()     : "" + pal + "" (MADAM reversed is MADAM!)");

        System.out.println("\n==========================================================================");
    }
}