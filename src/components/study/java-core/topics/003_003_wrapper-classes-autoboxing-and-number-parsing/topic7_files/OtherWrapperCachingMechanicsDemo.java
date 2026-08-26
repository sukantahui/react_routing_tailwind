/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 7: Caching in Other Wrappers: Byte, Short, Long, Character & Boolean
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class OtherWrapperCachingMechanicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CACHING IN OTHER WRAPPER CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Summary of Caching Across All 8 Wrapper Types:");
        System.out.println("+---------------+-------------------------------+-------------------------+");
        System.out.println("| Wrapper Class | Cached Value Range            | Cache Mechanism         |");
        System.out.println("+---------------+-------------------------------+-------------------------+");
        System.out.println("| Boolean       | TRUE and FALSE (All 2 values) | Static Constants        |");
        System.out.println("| Byte          | -128 to 127 (All 256 values!) | ByteCache Pool          |");
        System.out.println("| Character     | 0 to 127 (ASCII standard)     | CharacterCache Pool     |");
        System.out.println("| Short         | -128 to 127                   | ShortCache Pool         |");
        System.out.println("| Integer       | -128 to 127 (Tunable max)     | IntegerCache Pool       |");
        System.out.println("| Long          | -128 to 127                   | LongCache Pool          |");
        System.out.println("| Float         | NO CACHING                    | N/A (Infinite fractions)|");
        System.out.println("| Double        | NO CACHING                    | N/A (Infinite fractions)|");
        System.out.println("+---------------+-------------------------------+-------------------------+");

        // Demonstration of Boolean and Character Caching:
        Boolean b1 = true;
        Boolean b2 = true;
        Character c1 = 'A'; // ASCII 65
        Character c2 = 'A';

        System.out.println("\n>>> Verification of Boolean & Character caching:");
        System.out.println("  Boolean 'true == true'   : " + (b1 == b2) + " (TRUE: Boolean.TRUE singleton)");
        System.out.println("  Character 'A' == 'A'     : " + (c1 == c2) + " (TRUE: Within ASCII 0-127)");

        System.out.println("\n==========================================================================");
    }
}