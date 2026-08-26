/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 1: The 8 Wrapper Classes Corresponding to 8 Primitives
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class EightWrapperClassesMappingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 8 WRAPPER CLASSES MAPPING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+-------------+---------------------+------------+----------------------+");
        System.out.println("| Primitive   | Wrapper Class       | Size (RAM) | Default Value        |");
        System.out.println("+-------------+---------------------+------------+----------------------+");
        System.out.println("| byte        | java.lang.Byte      | 8 bits     | (byte) 0             |");
        System.out.println("| short       | java.lang.Short     | 16 bits    | (short) 0            |");
        System.out.println("| int         | java.lang.Integer   | 32 bits    | 0                    |");
        System.out.println("| long        | java.lang.Long      | 64 bits    | 0L                   |");
        System.out.println("| float       | java.lang.Float     | 32 bits    | 0.0f                 |");
        System.out.println("| double      | java.lang.Double    | 64 bits    | 0.0d                 |");
        System.out.println("| char        | java.lang.Character | 16 bits    | '\\u0000'             |");
        System.out.println("| boolean     | java.lang.Boolean   | 1 bit JVM  | false                |");
        System.out.println("+-------------+---------------------+------------+----------------------+");

        System.out.println("\n>>> Notice the exact naming spelling difference:");
        System.out.println("  - 'int'  -> 'Integer'   (NOT 'Int')");
        System.out.println("  - 'char' -> 'Character' (NOT 'Char')");
        System.out.println("  - All 8 Wrapper classes are IMMUTABLE and marked FINAL!");

        System.out.println("\n==========================================================================");
    }
}