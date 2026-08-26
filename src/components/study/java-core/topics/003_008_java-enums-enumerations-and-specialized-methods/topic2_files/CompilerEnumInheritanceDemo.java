/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 2: How the Compiler Compiles Enums: Implicit java.lang.Enum Inheritance & Final Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class CompilerEnumInheritanceDemo {

    public enum StudentGrade {
        A_PLUS, A, B, C, F
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: HOW THE COMPILER COMPILES ENUMS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> What the 'javac' Compiler Generates Under the Hood for 'StudentGrade':");
        System.out.println();
        System.out.println("  public final class StudentGrade extends java.lang.Enum<StudentGrade> {");
        System.out.println("      public static final StudentGrade A_PLUS = new StudentGrade("A_PLUS", 0);");
        System.out.println("      public static final StudentGrade A      = new StudentGrade("A", 1);");
        System.out.println("      public static final StudentGrade B      = new StudentGrade("B", 2);");
        System.out.println("      public static final StudentGrade C      = new StudentGrade("C", 3);");
        System.out.println("      public static final StudentGrade F      = new StudentGrade("F", 4);");
        System.out.println("      private StudentGrade(String name, int ordinal) { super(name, ordinal); }");
        System.out.println("      public static StudentGrade[] values() { ... }");
        System.out.println("      public static StudentGrade valueOf(String name) { ... }");
        System.out.println("  }");

        System.out.println("\n>>> 3 CRITICAL ARCHITECTURAL CONSEQUENCES:");
        System.out.println("  1. Enums CANNOT extend another class (since Java lacks multiple class inheritance).");
        System.out.println("  2. Enum classes are implicitly 'final' (they cannot be subclassed).");
        System.out.println("  3. Enums CAN implement multiple interfaces!");

        System.out.println("\n==========================================================================");
    }
}