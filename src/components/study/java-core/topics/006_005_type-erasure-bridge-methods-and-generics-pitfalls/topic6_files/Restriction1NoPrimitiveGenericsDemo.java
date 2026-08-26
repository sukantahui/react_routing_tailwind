/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 6: Restriction 1: No Primitive Type Arguments (Why List<int> is Illegal)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class Restriction1NoPrimitiveGenericsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: RESTRICTION 1 - NO PRIMITIVE GENERICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // ILLEGAL SYNTAX (Will NOT compile):
        // List<int> primitiveList = new ArrayList<int>(); // COMPILE ERROR: Unexpected type, found int, required reference!
        // List<double> doubleList = new ArrayList<double>(); // COMPILE ERROR!

        // LEGAL SYNTAX: Using Boxed Wrapper Classes:
        List<Integer> boxedIntegerList = new ArrayList<>();
        boxedIntegerList.add(101); // Auto-boxed to Integer.valueOf(101)
        boxedIntegerList.add(102);

        List<Double> boxedDoubleList = new ArrayList<>();
        boxedDoubleList.add(8500.50); // Auto-boxed to Double.valueOf(8500.50)

        System.out.println(">>> 1. Populated Boxed Generic Lists:");
        System.out.println("  Boxed Integer List : " + boxedIntegerList);
        System.out.println("  Boxed Double List  : " + boxedDoubleList);

        System.out.println("\n>>> WHY PRIMITIVES ARE DISALLOWED:");
        System.out.println("  1. Type Erasure erases type parameters to 'java.lang.Object'.");
        System.out.println("  2. Primitive types (int, double, boolean) DO NOT inherit from java.lang.Object and cannot be converted to Object reference pointers.");
        System.out.println("  3. Modern Project Valhalla is working on Value Types to allow primitive generics in future Java releases!");

        System.out.println("\n==========================================================================");
    }
}