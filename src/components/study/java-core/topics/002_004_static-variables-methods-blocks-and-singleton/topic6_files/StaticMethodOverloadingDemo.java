/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 6: Can Static Methods Be Overloaded? (Yes, Compile-Time Polymorphism)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticMethodOverloadingDemo {

    public static class FormatToolkit {
        // Overloaded static method 1: Formats student name
        public static String formatInfo(String studentName) {
            return "Trainee: " + studentName.toUpperCase();
        }

        // Overloaded static method 2: Formats name + roll
        public static String formatInfo(String studentName, int roll) {
            return String.format("Trainee: %s [Roll #%d]", studentName, roll);
        }

        // Overloaded static method 3: Formats name + roll + hub
        public static String formatInfo(String studentName, int roll, String hub) {
            return String.format("Trainee: %s [Roll #%d] @ %s Hub", studentName, roll, hub);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: STATIC METHOD OVERLOADING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(FormatToolkit.formatInfo("Swadeep Paul"));
        System.out.println(FormatToolkit.formatInfo("Tuhina Das", 102));
        System.out.println(FormatToolkit.formatInfo("Debangshu Mukherjee", 103, "Barrackpore"));

        System.out.println("\n==========================================================================");
    }
}