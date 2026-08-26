/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 2: Type Parameter Placement: Compiler Symbol Resolution Order
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class TypeParameterPlacementSymbolDemo {

    // Notice: <E> is declared BEFORE E[] and E:
    public static <E> E pickFirst(E[] array) {
        if (array == null || array.length == 0) return null;
        return array[0];
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: TYPE PARAMETER PLACEMENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String[] branchNames = {"Barrackpore", "Naihati", "Shyamnagar", "Ichapur"};
        Integer[] rollNumbers = {101, 102, 103, 104};

        String firstBranch = pickFirst(branchNames);
        Integer firstRoll = pickFirst(rollNumbers);

        System.out.println(">>> 1. Pick First Element Results:");
        System.out.println("  First Branch : " + firstBranch);
        System.out.println("  First Roll   : " + firstRoll);

        System.out.println("\n>>> WHY COMPILERS REQUIRE <T> BEFORE RETURN TYPE:");
        System.out.println("  1. Symbol Declaration: The compiler reads left-to-right.");
        System.out.println("  2. When it encounters the return type 'E', it must already know that 'E' is a generic type parameter, not a missing class named 'E'!");
        System.out.println("  3. Placing '<E>' first registers the symbol into the compiler's symbol table for that method.");

        System.out.println("\n==========================================================================");
    }
}