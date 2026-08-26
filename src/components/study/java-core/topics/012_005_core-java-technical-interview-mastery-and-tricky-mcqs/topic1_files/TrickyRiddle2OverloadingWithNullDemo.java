/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 1: Tricky Riddle 2 - Method Overloading Resolution with null
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

public class TrickyRiddle2OverloadingWithNullDemo {

    public static void display(Object obj) {
        System.out.println("Called display(Object)");
    }

    public static void display(String str) {
        System.out.println("Called display(String) - Most specific subtype!");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 2: OVERLOADING RESOLUTION WITH NULL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("Calling display(null):");
        display(null); // String is subtype of Object -> Compiler chooses most specific!

        System.out.println("
RULE: If two sibling classes exist at the same hierarchy level (e.g. String & Integer),");
        System.out.println("calling display(null) causes: 'reference to display is ambiguous' COMPILE ERROR!");

        System.out.println("\n==========================================================================");
    }
}
