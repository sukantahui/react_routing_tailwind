/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 10: Static Imports: Benefits and Cautions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

// 1. Static imports of Math utilities
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
import static java.lang.Math.pow;

public class StaticImportsDemonstrationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: STATIC IMPORTS IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double radius = 7.0;

        // Using static imports directly without 'Math.' prefix
        double circleArea = PI * pow(radius, 2);
        double hypotenuse = sqrt(pow(3, 2) + pow(4, 2));

        System.out.printf("  Radius: %.1f | Circle Area: %.4f (using direct PI & pow)\n", radius, circleArea);
        System.out.printf("  Hypotenuse of (3, 4): %.1f (using direct sqrt & pow)\n", hypotenuse);

        System.out.println("\n>>> Best Practice Warning:");
        System.out.println("  - Use static imports sparingly (e.g. Math, Assertions in JUnit tests).");
        System.out.println("  - Overusing static wildcard imports ('import static ...*') pollutes namespace!");

        System.out.println("\n==========================================================================");
    }
}