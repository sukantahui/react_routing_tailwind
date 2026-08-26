/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 6: Chaining & Composing Functional Interfaces: The Modular Assembly Line Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

public class FunctionalCompositionOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: FUNCTIONAL COMPOSITION & CHAINING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE POWER OF FUNCTIONAL COMPOSITION:");
        System.out.println("  - Instead of writing huge, monolithic, unmaintainable methods,");
        System.out.println("    Functional Programming builds complex systems by COMBINING small, pure, single-purpose functions!");
        System.out.println();
        System.out.println("+----+-------------------+-------------------------------+-----------------------------------+");
        System.out.println("| #  | Interface Family  | Composition Methods           | Logical Operation                 |");
        System.out.println("+----+-------------------+-------------------------------+-----------------------------------+");
        System.out.println("| 1. | Predicate<T>      | and(), or(), negate()         | Logical AND, OR, NOT operations   |");
        System.out.println("| 2. | Function<T, R>    | andThen(), compose()          | Forward & Reverse function pipes  |");
        System.out.println("| 3. | Consumer<T>       | andThen()                     | Sequential side-effect pipeline   |");
        System.out.println("+----+-------------------+-------------------------------+-----------------------------------+");
        System.out.println();
        System.out.println(">>> THE ASSEMBLY LINE PHILOSOPHY:");
        System.out.println("  - Like Lego blocks, small functions snap together seamlessly using default methods on functional interfaces.");

        System.out.println("\n==========================================================================");
    }
}