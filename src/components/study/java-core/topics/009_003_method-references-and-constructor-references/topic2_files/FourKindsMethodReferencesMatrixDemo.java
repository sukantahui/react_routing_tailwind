/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 2: The 4 Kinds of Method References in Java: Complete Taxonomy Matrix
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

public class FourKindsMethodReferencesMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE 4 KINDS OF METHOD REFERENCES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+----+---------------------------------------------------+-----------------------+-------------------------------+");
        System.out.println("| Kind| Classification                                    | Syntax Format         | Practical Java Example        |");
        System.out.println("+----+---------------------------------------------------+-----------------------+-------------------------------+");
        System.out.println("| 1. | Static Method Reference                           | ClassName::staticMethod| Math::max, Integer::parseInt  |");
        System.out.println("| 2. | Bound Instance Method (Particular Object)         | objRef::instanceMethod| System.out::println, myObj::calc|");
        System.out.println("| 3. | Unbound Instance Method (Arbitrary Object of Type)| ClassName::instMethod | String::toUpperCase, User::getId|");
        System.out.println("| 4. | Constructor Reference                             | ClassName::new        | ArrayList::new, String[]::new |");
        System.out.println("+----+---------------------------------------------------+-----------------------+-------------------------------+");
        System.out.println();
        System.out.println(">>> THE CORE DISTINCTION:");
        System.out.println("  - Kinds 1, 2, and 4 are straightforward 1:1 parameter matches.");
        System.out.println("  - Kind 3 (Unbound) uses the FIRST parameter of the functional interface as the TARGET OBJECT invocation receiver!");

        System.out.println("\n==========================================================================");
    }
}