/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 5: Generic Constructors: Parameterizing Constructors Independently
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

// Non-generic class containing a GENERIC CONSTRUCTOR:
class StudentEntryRecord {
    private final String description;

    // Generic Constructor: Declares '<T>' independently for constructor arguments:
    public <T> StudentEntryRecord(T inputData) {
        this.description = "Entry [" + inputData.getClass().getSimpleName() + "]: " + inputData.toString();
    }

    public String getDescription() { return description; }
}

public class GenericConstructorIndependenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: GENERIC CONSTRUCTORS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Initializing using String:
        StudentEntryRecord rec1 = new StudentEntryRecord("Swadeep Paul (Barrackpore)");

        // 2. Initializing using Integer:
        StudentEntryRecord rec2 = new StudentEntryRecord(101);

        // 3. Initializing using Double:
        StudentEntryRecord rec3 = new StudentEntryRecord(9850.75);

        System.out.println(">>> Initialized Records via Generic Constructor:");
        System.out.println("  Record 1: " + rec1.getDescription());
        System.out.println("  Record 2: " + rec2.getDescription());
        System.out.println("  Record 3: " + rec3.getDescription());

        System.out.println("\n>>> SYNTAX RULES FOR GENERIC CONSTRUCTORS:");
        System.out.println("  1. The type parameter '<T>' appears immediately before the constructor name.");
        System.out.println("  2. Allowed in both generic and non-generic classes.");
        System.out.println("  3. Explicit witness syntax: 'new <String>StudentEntryRecord("Data")'.");

        System.out.println("\n==========================================================================");
    }
}