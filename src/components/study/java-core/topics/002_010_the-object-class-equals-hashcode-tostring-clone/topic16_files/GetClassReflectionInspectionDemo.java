/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 16: The 'getClass()' Method: Inspecting Runtime Class Reflection Metadata
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class GetClassReflectionInspectionDemo {

    public static class BaseAcademyMember {}
    public static class FullStackTrainee extends BaseAcademyMember {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: The getClass() METHOD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BaseAcademyMember member = new FullStackTrainee(); // Upcasted reference

        // 1. Inspecting runtime class metadata via getClass():
        Class<?> runtimeClass = member.getClass();

        System.out.println(">>> Runtime Reflection Metadata:");
        System.out.println("  Simple Class Name   : " + runtimeClass.getSimpleName());
        System.out.println("  Full Binary Name    : " + runtimeClass.getName());
        System.out.println("  Canonical Name      : " + runtimeClass.getCanonicalName());
        System.out.println("  Superclass Name     : " + runtimeClass.getSuperclass().getSimpleName());
        System.out.println("  Is Interface?       : " + runtimeClass.isInterface());
        System.out.println("  Is Array?           : " + runtimeClass.isArray());

        System.out.println("\n>>> 'getClass()' vs 'instanceof' in equals() methods:");
        System.out.println("  - 'getClass() == other.getClass()' -> Requires EXACT same concrete class (Strict).");
        System.out.println("  - 'instanceof'                   -> Allows subclasses (Permissive, risks symmetry breach).");

        System.out.println("\n==========================================================================");
    }
}