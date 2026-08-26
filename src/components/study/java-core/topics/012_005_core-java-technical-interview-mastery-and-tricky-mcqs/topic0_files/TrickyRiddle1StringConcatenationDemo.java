/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 0: Tricky Riddle 1 - String Concatenation vs Arithmetic Precedence
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

public class TrickyRiddle1StringConcatenationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 1: STRING CONCATENATION VS ARITHMETIC - BARRACKPORE");
        System.out.println(" EDUCATOR: SUKANTA HUI");
        System.out.println("==========================================================================\n");

        System.out.println("Riddle A: System.out.println(10 + 20 + "Hello" + 10 + 20);");
        System.out.print("  Output -> ");
        System.out.println(10 + 20 + "Hello" + 10 + 20); // Produces "30Hello1020"

        System.out.println("
Riddle B: System.out.println(10 + 20 + "Hello" + (10 + 20));");
        System.out.print("  Output -> ");
        System.out.println(10 + 20 + "Hello" + (10 + 20)); // Produces "30Hello30"

        System.out.println("
Riddle C: System.out.println('A' + 'B' + "C");");
        System.out.print("  Output -> ");
        System.out.println('A' + 'B' + "C"); // 'A'=65, 'B'=66 -> 131 + "C" = "131C"

        System.out.println("\n==========================================================================");
    }
}
